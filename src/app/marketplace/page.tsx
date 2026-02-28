import { createClient } from "@/utils/supabase/server"
import { Star, ArrowUpRight, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"

export default async function MarketplacePage({
    searchParams,
}: {
    searchParams: { sort?: string; category?: string }
}) {
    const supabase = await createClient()

    let query = supabase
        .from('products')
        .select('*, profiles(full_name)')
        .eq('status', 'active')

    if (searchParams.category) {
        query = query.eq('category', searchParams.category)
    }

    // Sort by Quality Score or Rating
    if (searchParams.sort === 'top_rated') {
        query = query.order('avg_rating', { ascending: false })
    } else {
        query = query.order('quality_score', { ascending: false })
    }

    const { data: products } = await query

    return (
        <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2 tracking-tight">The <span className="gold-gradient">Vault</span> Feed</h1>
                    <p className="text-white/40">Exclusive digital assets verified by PixelVault AI.</p>
                </div>

                <div className="flex gap-4">
                    <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-yellow-500 transition-all">
                        <option value="quality">Sort: High Quality</option>
                        <option value="top_rated">Sort: Top Rated</option>
                        <option value="newest">Sort: Newest</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

function ProductCard({ product }: { product: any }) {
    return (
        <div className="group glass-card overflow-hidden flex flex-col hover:border-yellow-500/30 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                <img
                    src={product.preview_urls[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-1.5">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-yellow-400" />
                        <span className="text-[10px] font-bold text-yellow-400">{product.quality_score}</span>
                    </div>
                    {product.avg_rating > 0 && (
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[10px] font-bold text-white">{product.avg_rating}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-yellow-400 transition-colors line-clamp-1">{product.title}</h3>
                </div>
                <p className="text-xs text-white/40 mb-4 line-clamp-2">{product.description || `Premium ${product.category.replace('_', ' ')}`}</p>

                <div className="flex items-center gap-2 mb-6">
                    <div className="w-5 h-5 rounded-full bg-white/10" />
                    <span className="text-[10px] text-white/50">{product.profiles?.full_name || 'Anonymous Seller'}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xl font-black text-white">${product.price}</span>
                <button className="gold-button !py-1.5 !px-3 text-[10px] uppercase flex items-center gap-1 group/btn">
                    View Detail
                    <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
            </div>
        </div>
    )
}
