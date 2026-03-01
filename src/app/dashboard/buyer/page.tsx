import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Download, Star, Package, ShoppingBag, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function BuyerDashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // Fetch all purchases with product info
    const { data: purchases } = await supabase
        .from('sales')
        .select('*, products(id, title, category, preview_urls, price, quality_score)')
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false })

    // Get IDs of products user has reviewed
    const { data: userReviews } = await supabase
        .from('reviews')
        .select('product_id')
        .eq('reviewer_id', user.id)
    const reviewedIds = new Set(userReviews?.map(r => r.product_id) || [])

    return (
        <div className="min-h-screen py-12 px-6 max-w-5xl mx-auto space-y-10">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight">My <span className="indigo-gradient">Purchases</span></h1>
                <p className="text-white/40 mt-1">Download your assets and leave reviews.</p>
            </div>

            {purchases && purchases.length > 0 ? (
                <div className="space-y-4">
                    {purchases.map((sale) => {
                        const product = sale.products
                        if (!product) return null
                        const thumbUrl = product.preview_urls?.[0] ?? null
                        const hasReviewed = reviewedIds.has(product.id)

                        return (
                            <div key={sale.id} className="glass-card flex flex-col md:flex-row gap-5">
                                {/* Thumbnail */}
                                <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden shrink-0" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    {thumbUrl ? (
                                        <img src={thumbUrl} alt={product.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/10">
                                            <Package className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#6366f1" }}>
                                            {product.category?.replace('_', ' ')}
                                        </span>
                                        <h3 className="font-bold text-lg mt-0.5">
                                            <Link href={`/products/${product.id}`} className="hover:text-indigo-300 transition-colors">{product.title}</Link>
                                        </h3>
                                        <p className="text-xs text-white/30 mt-1">
                                            Purchased {new Date(sale.created_at).toLocaleDateString()} &middot; ${sale.amount}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4">
                                        {/* Download Button */}
                                        <DownloadButton sessionId={sale.stripe_session_id} productTitle={product.title} />

                                        {/* Review Button */}
                                        {hasReviewed ? (
                                            <span className="flex items-center gap-1.5 text-xs text-green-400">
                                                <Star className="w-3.5 h-3.5 fill-green-400" /> Reviewed
                                            </span>
                                        ) : (
                                            <Link href={`/products/${product.id}#reviews`}
                                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
                                                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                                                <Star className="w-3.5 h-3.5" /> Leave Review
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="glass-card text-center py-20">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-white/10" />
                    <p className="text-white/30 mb-6">You haven't purchased anything yet.</p>
                    <Link href="/marketplace" className="accent-button text-sm">Browse Marketplace</Link>
                </div>
            )}
        </div>
    )
}

// Client component for download
function DownloadButton({ sessionId, productTitle }: { sessionId: string; productTitle: string }) {
    'use client'
    return (
        <a href={`/api/download?session_id=${sessionId}`} target="_blank" rel="noopener"
            className="accent-button !py-2 !px-4 text-xs flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Download
        </a>
    )
}
