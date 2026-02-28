import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/utils/stripe/server'
import { createClient } from '@/utils/supabase/server' // Note: Webhook needs Service Role for some updates

export async function POST(req: NextRequest) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any
        const { productId, buyerId, sellerId } = session.metadata

        const supabase = await createClient() // Use service role for internal updates

        // 1. Log the Sale
        const { error: saleError } = await supabase.from('sales').insert({
            product_id: productId,
            buyer_id: buyerId,
            seller_id: sellerId,
            amount_total: session.amount_total / 100,
            seller_share: (session.amount_total / 100) * 0.75,
            platform_share: (session.amount_total / 100) * 0.25,
            stripe_session_id: session.id
        })

        if (saleError) console.error('Sale Log Error:', saleError)

        // 2. Update Royalties Table
        const { data: existingRoyalty } = await supabase
            .from('royalties')
            .select('*')
            .eq('product_id', productId)
            .single()

        const earnings = (session.amount_total / 100) * 0.75

        if (existingRoyalty) {
            await supabase.from('royalties').update({
                total_earned: existingRoyalty.total_earned + earnings,
                purchase_count: existingRoyalty.purchase_count + 1
            }).eq('id', existingRoyalty.id)
        } else {
            await supabase.from('royalties').insert({
                seller_id,
                product_id: productId,
                total_earned: earnings,
                purchase_count: 1
            })
        }

        // 3. Update Seller's Profile total earnings
        await supabase.rpc('increment_seller_earnings', {
            seller_uuid: sellerId,
            amount: earnings
        })
    }

    return NextResponse.json({ received: true })
}
