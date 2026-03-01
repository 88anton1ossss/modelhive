import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getStripe } from '@/utils/stripe/server'
import { generateSignedDownloadUrl } from '@/utils/r2/download'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get('session_id')
    if (!sessionId) return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })

    const supabase = await createClient()

    try {
        const stripe = getStripe()
        // 1. Verify payment with Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if (session.payment_status !== 'paid') {
            return NextResponse.json({ error: 'Unpaid session' }, { status: 403 })
        }

        // 2. Get product path from session metadata or database
        const productId = session.metadata?.productId
        const { data: product } = await supabase
            .from('products')
            .select('master_file_path')
            .eq('id', productId)
            .single()

        if (!product) throw new Error('Product not found')

        // 3. Generate signed URL
        const url = await generateSignedDownloadUrl(product.master_file_path)

        return NextResponse.json({ url })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
