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
        const {
            product_id,
            buyer_id,
            seller_id,
            platform_fee_amount,
            seller_share_amount
        } = session.metadata

        const supabase = await createClient()

        // 1. Log the Sale to 'sales' table
        const { error: saleError } = await supabase.from('sales').insert({
            product_id,
            buyer_id,
            seller_id,
            amount_total: session.amount_total / 100,
            platform_share: parseFloat(platform_fee_amount) / 100,
            seller_share: parseFloat(seller_share_amount) / 100,
            stripe_session_id: session.id
        })

        if (saleError) console.error('Sale Log Error:', saleError)

        // 2. Update Royalties Table
        const sellerEarnings = parseFloat(seller_share_amount) / 100

        // Check if royalty record exists for this product/seller
        const { data: existingRoyalty } = await supabase
            .from('royalties')
            .select('*')
            .eq('seller_id', seller_id)
            .eq('product_id', product_id)
            .single()

        if (existingRoyalty) {
            await supabase.from('royalties').update({
                total_earned: Number(existingRoyalty.total_earned) + sellerEarnings,
                purchase_count: existingRoyalty.purchase_count + 1
            }).eq('id', existingRoyalty.id)
        } else {
            await supabase.from('royalties').insert({
                seller_id,
                product_id,
                total_earned: sellerEarnings,
                purchase_count: 1
            })
        }

        // 3. Update Seller total earnings in profile
        const { error: profileError } = await supabase.rpc('increment_seller_earnings', {
            seller_uuid: seller_id,
            amount_to_add: sellerEarnings
        })

        if (profileError) console.error('Profile Earnings Update Error:', profileError)
    }

    return NextResponse.json({ received: true })
}
