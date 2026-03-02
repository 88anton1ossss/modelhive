import { NextRequest, NextResponse } from 'next/server'
import { getStripe, FEE_TIERS, SubscriptionTier } from '@/utils/stripe/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { productId, licenseType = 'personal' } = await req.json()

        // Fetch product details + seller profile (for Stripe Connect ID and subscription tier)
        const { data: product, error } = await supabase
            .from('products')
            .select('*, profiles!products_seller_id_fkey(stripe_connect_id, subscription_tier)')
            .eq('id', productId)
            .single()

        if (error || !product) throw new Error('Product not found')

        // Determine fee based on seller's subscription tier
        const tier = (product.profiles?.subscription_tier as SubscriptionTier) || 'free'
        const fees = FEE_TIERS[tier] ?? FEE_TIERS.free
        const platformFeeAmount = Math.round(product.price * 100 * fees.platform)

        const stripe = getStripe()
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title,
                            images: product.preview_urls?.slice(0, 1) ?? [],
                            metadata: { category: product.category, license: licenseType },
                        },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/marketplace`,
            payment_intent_data: {
                application_fee_amount: platformFeeAmount,
                transfer_data: {
                    destination: product.profiles.stripe_connect_id,
                },
            },
            metadata: {
                product_id: product.id,
                license_type: licenseType,
                seller_id: product.seller_id,
                buyer_id: user.id,
                seller_tier: tier,
                platform_fee_amount: platformFeeAmount.toString(),
                seller_share_amount: Math.round(product.price * 100 * fees.seller).toString(),
            },
        })

        return NextResponse.json({ sessionId: session.id })
    } catch (err: any) {
        console.error('Checkout Error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
