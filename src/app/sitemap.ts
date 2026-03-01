import { createClient } from "@/utils/supabase/server"
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://modelhive.co'

const STATIC_ROUTES = [
    '/',
    '/marketplace',
    '/pricing',
    '/civitai-alternative',
    '/lora-marketplace',
    '/photo-dataset-marketplace',
    '/earn-from-ai-models',
    '/login',
    '/signup',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient()

    // Static pages
    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(route => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/' ? 'daily' : 'weekly',
        priority: route === '/' ? 1 : 0.8,
    }))

    // Dynamic product pages
    const { data: products } = await supabase
        .from('products')
        .select('id, updated_at')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(500)

    const productEntries: MetadataRoute.Sitemap = (products || []).map(p => ({
        url: `${BASE_URL}/products/${p.id}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...staticEntries, ...productEntries]
}
