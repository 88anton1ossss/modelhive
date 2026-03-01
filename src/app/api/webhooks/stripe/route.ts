import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/utils/stripe/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event
    const stripe = getStripe()
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any
        const { productId, buyerId, sellerId } = session.metadata

        const supabase = await createClient()

        // 1. Log the Sale
        const { error: saleError } = await supabase.from('purchases').insert({
            product_id: productId,
            buyer_id: buyerId,
            seller_id: sellerId,
            amount: session.amount_total / 100,
            platform_fee: (session.amount_total / 100) * 0.25,
            seller_earnings: (session.amount_total / 100) * 0.75,
            stripe_session_id: session.id,
            status: 'completed'
        })

        if (saleError) console.error('Purchase Log Error:', saleError)

        // 2. Update Royalties Table
        const { data: existingRoyalty } = await supabase
            .from('royalties')
            .select('*')
            .eq('seller_id', sellerId)
            .single()

        const earnings = (session.amount_total / 100) * 0.75

        if (existingRoyalty) {
            await supabase.from('royalties').update({
                amount: existingRoyalty.amount + earnings
            }).eq('id', existingRoyalty.id)
        } else {
            await supabase.from('royalties').insert({
                seller_id: sellerId,
                amount: earnings,
                status: 'pending'
            })
        }

        // 3. Update Seller total earnings
        await supabase.rpc('increment_seller_earnings', {
            seller_uuid: sellerId,
            amount: earnings
        })
    }

    return NextResponse.json({ received: true })
}
