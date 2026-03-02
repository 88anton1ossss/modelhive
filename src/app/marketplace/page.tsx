import { createClient } from "@/utils/supabase/server"
import { Filter, Search, Grid, List, SlidersHorizontal, Sparkles, SortDesc } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { cn } from "@/utils/cn"

export default async function MarketplacePage({
    searchParams,
}: {
    searchParams: { sort?: string; category?: string; base_model?: string }
}) {
    const supabase = await createClient()

    let query = supabase
        .from('products')
        .select('*, seller_profile:profiles(full_name, avatar_url)')
        .eq('status', 'active')

    if (searchParams.category && searchParams.category !== 'all') {
        query = query.eq('category', searchParams.category)
    }

    if (searchParams.base_model && searchParams.base_model !== 'all') {
        query = query.contains('metadata', { base_model: searchParams.base_model })
    }

    // Sort logic
    if (searchParams.sort === 'top_rated') {
        query = query.order('avg_rating', { ascending: false })
    } else if (searchParams.sort === 'newest') {
        query = query.order('created_at', { ascending: false })
    } else {
        query = query.order('quality_score', { ascending: false })
    }

    const { data: products } = await query

    return (
        <div className="flex flex-col gap-12">
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-indigo-400 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
                        <Grid className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em]">Asset Exchange</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-4 animate-in fade-in slide-in-from-left-6 duration-1000">
                        The AI <span className="indigo-gradient">Creator</span> Marketplace
                    </h1>
                    <p className="text-sm text-white/30 max-w-xl leading-loose font-medium">
                        Secure high-performance models and curated datasets for your creative studio.
                        Every asset is verified for quality and integrity.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/5">
                        <button className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 group flex items-center gap-2 transition-all">
                            <Grid className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Grid</span>
                        </button>
                        <button className="px-4 py-2 rounded-xl hover:bg-white/5 text-white/30 transition-all flex items-center gap-2 group">
                            <List className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                            <span className="text-[10px] font-black uppercase tracking-widest">List</span>
                        </button>
                    </div>

                    <button className="flex lg:hidden items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Filters</span>
                    </button>
                </div>
            </div>

            {/* Sub-header Filter Shortcuts */}
            <div className="flex flex-wrap items-center gap-3">
                {['All Assets', 'Checkpoints', 'LoRAs', 'Datasets', 'Textual Inversions'].map((label, idx) => (
                    <button
                        key={label}
                        className={cn(
                            "px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                            idx === 0
                                ? "bg-white text-black border-white"
                                : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                        )}
                    >
                        {label}
                    </button>
                ))}
                <div className="h-4 w-px bg-white/5 mx-2" />
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-white/30 hover:text-white transition-all">
                    <SortDesc className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Popular First</span>
                </button>
            </div>

            {/* Results Grid - Responsive Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {products && products.length > 0 ? products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                )) : (
                    <div className="col-span-full py-48 flex flex-col items-center text-center canvas-dot-bg border border-dashed border-white/10 rounded-3xl">
                        <div className="w-20 h-20 rounded-full bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10 mb-8 shadow-2xl">
                            <Sparkles className="w-10 h-10 text-indigo-500/40" />
                        </div>
                        <h2 className="text-2xl font-black mb-3">The hive is quiet</h2>
                        <p className="text-sm text-white/30 max-w-xs leading-relaxed font-medium">
                            No assets match your current selection. Try broadening your criteria or search across all categories.
                        </p>
                        <Link href="/marketplace" className="accent-button mt-8 !px-10 !py-4 text-[11px] uppercase tracking-widest font-black">
                            Clear Active Filters
                        </Link>
                    </div>
                )}
            </div>

            {/* Loading / Pagination */}
            <div className="mt-16 flex justify-center pb-24">
                <button className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-black uppercase tracking-[0.2em] text-white/30 hover:bg-white/5 hover:text-white hover:border-white/10 transition-all group">
                    <span>Sync with Server</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-indigo-500 transition-colors" />
                    <span>Load More Assets</span>
                </button>
            </div>
        </div>
    )
}
