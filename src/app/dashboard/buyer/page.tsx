'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import {
    Download,
    Star,
    Package,
    ShoppingBag,
    ExternalLink,
    Search,
    Grid,
    List,
    History,
    TrendingUp,
    CreditCard,
    Gift
} from "lucide-react"
import Link from "next/link"
import { WorkspaceInspector } from "@/components/layout/WorkspaceInspector"

export default function BuyerDashboardPage() {
    const supabase = createClient()
    const router = useRouter()

    const [purchases, setPurchases] = useState<any[]>([])
    const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) { router.push('/login'); return }

            const [salesRes, reviewsRes] = await Promise.all([
                supabase
                    .from('sales')
                    .select('*, products(id, title, category, preview_urls, price, quality_score)')
                    .eq('buyer_id', user.id)
                    .order('created_at', { ascending: false }),
                supabase
                    .from('reviews')
                    .select('product_id')
                    .eq('reviewer_id', user.id)
            ])

            setPurchases(salesRes.data || [])
            setReviewedIds(new Set(reviewsRes.data?.map(r => r.product_id) || []))
            setLoading(false)
        }
        load()
    }, [])

    if (loading) return null

    const totalSpent = purchases.reduce((acc, curr) => acc + (curr.amount || 0), 0)

    return (
        <div className="flex flex-col gap-10">
            {/* Header / Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 uppercase tracking-widest">My Library</h1>
                    <p className="text-sm text-white/30">Your collection of premium AI assets and datasets.</p>
                </div>

                <div className="relative group w-full md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search library..."
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/10"
                    />
                </div>
            </div>

            {/* Grid of Purchases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases && purchases.length > 0 ? purchases.map((sale) => {
                    const product = sale.products
                    if (!product) return null
                    const hasReviewed = reviewedIds.has(product.id)

                    return (
                        <div key={sale.id} className="group glass-card !p-0 overflow-hidden flex flex-col hover:border-indigo-500/30 transition-all duration-500">
                            {/* Card Image */}
                            <div className="aspect-[16/10] overflow-hidden bg-white/5 relative">
                                {product.preview_urls?.[0] ? (
                                    <img src={product.preview_urls[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/5">
                                        <Package className="w-10 h-10" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                                    <div className="bg-green-500/80 backdrop-blur-xl border border-white/10 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-white">
                                        Owner
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/60">
                                        {product.product_type || product.category}
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors mb-1 truncate uppercase tracking-tight">{product.title}</h3>
                                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black leading-none">{product.category} &bull; v1.0</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
                                        <Star className="w-3.5 h-3.5 text-indigo-400/50" />
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
                                    <a
                                        href={`/api/download?session_id=${sale.stripe_session_id}`}
                                        target="_blank"
                                        rel="noopener"
                                        className="flex-1 py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest text-center hover:bg-indigo-400 hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-xl"
                                    >
                                        <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                                        Access Files
                                    </a>

                                    <Link
                                        href={`/products/${product.id}#reviews`}
                                        className={`px-5 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${hasReviewed ? 'border-indigo-500/10 bg-indigo-500/10 text-indigo-400 opacity-60' : 'border-white/10 hover:border-white/30 text-white/40'}`}
                                    >
                                        {hasReviewed ? "Rated" : "Review"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }) : (
                    <div className="col-span-full py-40 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8">
                            <ShoppingBag className="w-10 h-10 text-white/5" />
                        </div>
                        <h3 className="text-xl font-black mb-3 text-white/40 uppercase tracking-[0.2em]">Library Empty</h3>
                        <p className="text-sm text-white/10 max-w-xs mb-10 font-medium">Discover premium LoRAs, Datasets, and Effects to power your creative AI workflow.</p>
                        <Link href="/marketplace" className="accent-button !py-4 !px-12 text-[10px] font-black uppercase tracking-[0.3em]">Explore Marketplace</Link>
                    </div>
                )}
            </div>

            {/* BUYER INSPECTOR PORTAL */}
            <WorkspaceInspector>
                <section>
                    <h3 className="inspector-label mb-6">Library Stats</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Collection Value</p>
                            <h4 className="text-3xl font-black text-white">${totalSpent.toLocaleString()}</h4>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-indigo-400">
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>Verified Ownership</span>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Total Assets</p>
                            <h4 className="text-3xl font-black text-white">{purchases.length}</h4>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-white/40">
                                <History className="w-3.5 h-3.5" />
                                <span>Last purchase {purchases[0] ? new Date(purchases[0].created_at).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="inspector-label mb-6">Rewards & Perks</h3>
                    <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
                                <Gift className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[11px] font-black text-indigo-300">Hive Member</p>
                                <p className="text-[10px] font-bold text-indigo-400/60">0 Loyalty Points</p>
                            </div>
                        </div>
                        <p className="text-[10px] text-white/30 leading-relaxed font-medium">Coming Soon: Earn points for every review left. Redeem for exclusive LoRAs and datasets.</p>
                    </div>
                </section>
            </WorkspaceInspector>
        </div>
    )
}
