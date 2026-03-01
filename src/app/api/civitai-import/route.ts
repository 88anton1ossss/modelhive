import { NextRequest, NextResponse } from 'next/server'

const CIVITAI_API = 'https://civitai.com/api/v1'

// Map Civitai model types to ModelHive categories
const TYPE_MAP: Record<string, string> = {
    Checkpoint: 'ai_model',
    LORA: 'ai_model',
    LoCon: 'ai_model',
    TextualInversion: 'ai_model',
    Hypernetwork: 'ai_model',
    AestheticGradient: 'ai_model',
    Controlnet: 'ai_model',
    Poses: 'preset',
    Wildcards: 'prompt',
    Other: 'ai_model',
}

function extractUsername(url: string): string | null {
    // Handles: https://civitai.com/user/USERNAME or https://civitai.com/user/USERNAME/models
    const match = url.match(/civitai\.com\/user\/([^\/\?#]+)/)
    return match ? match[1] : null
}

export async function POST(req: NextRequest) {
    try {
        const { civitai_profile_url } = await req.json()

        if (!civitai_profile_url) {
            return NextResponse.json({ error: 'Missing civitai_profile_url' }, { status: 400 })
        }

        const username = extractUsername(civitai_profile_url)
        if (!username) {
            return NextResponse.json({ error: 'Could not extract username from URL. Use format: https://civitai.com/user/USERNAME' }, { status: 400 })
        }

        // Fetch models from Civitai API
        const res = await fetch(`${CIVITAI_API}/models?username=${encodeURIComponent(username)}&limit=20&sort=Newest`, {
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 0 },
        })

        if (!res.ok) {
            return NextResponse.json({ error: `Civitai API returned ${res.status}` }, { status: 502 })
        }

        const data = await res.json()

        // Map Civitai models to ModelHive listing format
        const models = (data.items || []).map((model: any) => {
            const latestVersion = model.modelVersions?.[0]
            const trainedWords = latestVersion?.trainedWords || []
            const baseModel = latestVersion?.baseModel || ''
            const images = latestVersion?.images?.map((img: any) => img.url) || []

            return {
                title: model.name,
                description: model.description?.replace(/<[^>]*>/g, '').slice(0, 500) || '',
                category: TYPE_MAP[model.type] || 'ai_model',
                tags: (model.tags || []).join(', '),
                nsfw: model.nsfw || false,
                metadata: {
                    base_model: baseModel,
                    trigger_word: trainedWords.join(', '),
                    civitai_id: model.id,
                    civitai_type: model.type,
                    recommended_settings: latestVersion?.description?.replace(/<[^>]*>/g, '').slice(0, 200) || '',
                    license_type: model.allowCommercialUse === 'None' ? 'CC-BY-SA' : 'Commercial',
                    nsfw_flag: model.nsfw ? 'Mild' : 'No',
                },
                preview_images: images.slice(0, 5),
                stats: {
                    downloads: model.stats?.downloadCount || 0,
                    favorites: model.stats?.favoriteCount || 0,
                    rating: model.stats?.rating || 0,
                },
            }
        })

        return NextResponse.json({
            username,
            count: models.length,
            models,
        })
    } catch (err: any) {
        console.error('Civitai import error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
