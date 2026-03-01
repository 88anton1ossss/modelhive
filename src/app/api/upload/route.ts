import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { uploadToR2, generateWatermarkedPreviews } from '@/utils/r2/utils'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const file = formData.get('file') as File
        const title = formData.get('title') as string
        const category = formData.get('category') as string
        const price = formData.get('price') as string
        const metadataStr = formData.get('metadata') as string
        const metadata = JSON.parse(metadataStr || '{}')

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())

        // 1. Generate Previews (Public R2)
        const previewUrls = await generateWatermarkedPreviews(buffer, file.name)

        // 2. Upload Master File (Private R2)
        const masterFileKey = `products/${user.id}/${Date.now()}-${file.name}`
        await uploadToR2(buffer, masterFileKey, false)

        // 3. AI Quality Score (OpenAI Vision)
        // We send the first preview for scoring
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this product image for a digital marketplace. Provide a quality score from 1-100 based on composition, resolution, and aesthetic appeal. Return ONLY the number." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": previewUrls[0],
                            },
                        },
                    ],
                },
            ],
        })

        const qualityScore = parseInt(response.choices[0].message.content || "50")

        // 4. Save to Database
        const { data: product, error } = await supabase.from('products').insert({
            seller_id: user.id,
            title,
            category,
            price: parseFloat(price),
            metadata,
            master_file_path: masterFileKey,
            preview_urls: previewUrls,
            quality_score: qualityScore,
            status: 'active' // For demo, normally 'pending_approval'
        }).select().single()

        if (error) throw error

        return NextResponse.json({ success: true, product })

    } catch (error: any) {
        console.error('Upload Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
