import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/utils/stripe/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()

    // 1. Get all sellers with pending earnings
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, stripe_connect_id, earnings_total')
        .gt('earnings_total', 0)
        .not('stripe_connect_id', 'is', null)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const results = []

    for (const profile of profiles) {
        try {
            // 2. Trigger Stripe Payout (using Transfers if using Express/Custom accounts)
            // or simply mark as paid if Stripe handles it automatically.
            // Here we simulate the payout logic.

            const stripe = getStripe()
            const transfer = await stripe.transfers.create({
                amount: Math.round(Number(profile.earnings_total) * 100),
                currency: 'usd',
                destination: profile.stripe_connect_id!,
            })

            // 3. Reset earnings and update royalties
            await supabase.from('profiles').update({ earnings_total: 0 }).eq('id', profile.id)
            await supabase.from('royalties').update({ last_payout_date: new Date().toISOString() }).eq('seller_id', profile.id)

            results.push({ id: profile.id, success: true, transferId: transfer.id })
        } catch (err: any) {
            console.error(`Payout failed for ${profile.id}:`, err)
            results.push({ id: profile.id, success: false, error: err.message })
        }
    }

    return NextResponse.json({ results })
}
