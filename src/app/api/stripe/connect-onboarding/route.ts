import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/utils/stripe/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Check if user already has a Stripe Connect account
        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_connect_id')
            .eq('id', user.id)
            .single()

        let accountId = profile?.stripe_connect_id

        const stripe = getStripe()
        if (!accountId) {
            // Create new Stripe Connect Express account
            const account = await stripe.accounts.create({
                type: 'express',
                email: user.email!,
                metadata: { supabase_user_id: user.id },
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            })
            accountId = account.id

            // Save to Supabase
            await supabase
                .from('profiles')
                .update({ stripe_connect_id: accountId })
                .eq('id', user.id)
        }

        // Create onboarding link
        const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            type: 'account_onboarding',
            refresh_url: `${appUrl}/dashboard/payouts?refresh=true`,
            return_url: `${appUrl}/dashboard/payouts?success=true`,
        })

        return NextResponse.json({ url: accountLink.url })
    } catch (err: any) {
        console.error('Stripe Connect onboarding error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
