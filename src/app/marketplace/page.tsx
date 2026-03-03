'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import { Grid, List, SlidersHorizontal, Sparkles, SortDesc, X, ShoppingCart, User, Star, Download, CheckCircle2, Heart } from "lucide-react"
import { ProductCard } from "@/components/product/ProductCard"
import { cn } from "@/utils/cn"
import { WorkspaceInspector } from "@/components/layout/WorkspaceInspector"
import { motion, AnimatePresence } from "framer-motion"

export default function MarketplacePage() {
    const supabase = createClient()

    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('All')
    const [sort, setSort] = useState('quality')
    const [expandedProductId, setExpandedProductId] = useState<string | null>(null)

    const categories = ['All', 'Models', 'Datasets', 'LUTs', 'Presets', 'Effects', 'Bundles']

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true)
            let query = supabase
                .from('products')
                .select('*, seller_profile:profiles(full_name, avatar_url, bio, student_count, follower_count)')
                .eq('status', 'active')

            if (category !== 'All') {
                // Map display categories to product_type in DB
                const typeMap: Record<string, string> = {
                    'Models': 'model',
                    'Datasets': 'dataset',
                    'LUTs': 'lut',
                    'Presets': 'preset',
                    'Effects': 'effect',
                    'Bundles': 'bundle'
                }
                query = query.eq('product_type', typeMap[category])
            }

            if (sort === 'newest') query = query.order('created_at', { ascending: false })
            else if (sort === 'top_rated') query = query.order('avg_rating', { ascending: false })
            else query = query.order('quality_score', { ascending: false })

            const { data } = await query
            setProducts(data || [])
            setLoading(false)
        }
        fetchProducts()
    }, [category, sort])

    const expandedProduct = products.find(p => p.id === expandedProductId)

    return (
        <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-indigo-400 mb-4">
                        <Grid className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em]">Asset Exchange</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-4">
                        The AI <span className="indigo-gradient">Creator</span> Marketplace
                    </h1>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                            category === cat
                                ? "bg-white text-black border-white"
                                : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            className={cn(
                                "relative",
                                expandedProductId === product.id ? "col-span-1 sm:col-span-2 xl:col-span-2 2xl:col-span-2 row-span-2" : ""
                            )}
                        >
                            {expandedProductId === product.id ? (
                                <ExpandedCard
                                    product={product}
                                    onClose={() => setExpandedProductId(null)}
                                />
                            ) : (
                                <ProductCard
                                    product={product}
                                    onClick={() => setExpandedProductId(product.id)}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Marketplace Inspector Integration */}
            <WorkspaceInspector>
                <AnimatePresence mode="wait">
                    {expandedProduct ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-8"
                        >
                            <section>
                                <h3 className="inspector-label mb-6">Purchase Options</h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-indigo-500/20">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black uppercase text-indigo-400">Personal License</span>
                                            <span className="text-xl font-black">${expandedProduct.price || 0}</span>
                                        </div>
                                        <button className="accent-button w-full py-3 flex items-center justify-center gap-2">
                                            <ShoppingCart className="w-4 h-4" />
                                            Buy Now
                                        </button>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black uppercase text-white/40 group-hover:text-white/60">Commercial License</span>
                                            <span className="text-sm font-bold text-white/40">${(expandedProduct.price * 2).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="inspector-label mb-6">Creator Info</h3>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-white/5 overflow-hidden">
                                        {expandedProduct.seller_profile?.avatar_url && (
                                            <img src={expandedProduct.seller_profile.avatar_url} alt="" className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">{expandedProduct.seller_profile?.full_name}</p>
                                        <p className="text-[10px] text-white/30 uppercase font-black tracking-widest leading-none mt-1">
                                            {expandedProduct.seller_profile?.follower_count || 0} Followers
                                        </p>
                                    </div>
                                    <button className="ml-auto p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors">
                                        <User className="w-4 h-4" />
                                    </button>
                                </div>
                            </section>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
                            <Sparkles className="w-12 h-12 mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Select an asset<br />to inspect details</p>
                        </div>
                    )}
                </AnimatePresence>
            </WorkspaceInspector>
        </div>
    )
}

function ExpandedCard({ product, onClose }: { product: any, onClose: () => void }) {
    const [activeImage, setActiveImage] = useState(0)
    const images = product.preview_urls || []

    return (
        <div className="bg-[#0A0A0A] border border-indigo-500/30 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] h-full flex flex-col">
            {/* Top Bar */}
            <div className="p-4 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest">
                        {product.product_type || product.category}
                    </span>
                    <h3 className="text-sm font-black text-white/90 truncate max-w-[200px]">{product.title}</h3>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-4 h-4 text-white/40" />
                </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                {/* Gallery Left */}
                <div className="lg:w-3/5 p-6 space-y-4">
                    <div className="aspect-video rounded-2xl bg-black border border-white/5 overflow-hidden relative">
                        {images[activeImage] && (
                            <img src={images[activeImage]} className="w-full h-full object-cover" alt="" />
                        )}
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {images.map((img: string, i: number) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={cn(
                                    "w-20 aspect-square rounded-lg border-2 transition-all overflow-hidden shrink-0",
                                    activeImage === i ? "border-indigo-500" : "border-transparent opacity-40 hover:opacity-100"
                                )}
                            >
                                <img src={img} className="w-full h-full object-cover" alt="" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Details Right */}
                <div className="flex-1 p-6 border-l border-white/5 overflow-y-auto max-h-[500px] lg:max-h-none">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-4">Description</h4>
                            <p className="text-sm text-white/60 leading-relaxed italic">
                                {product.metadata?.description || "High-performance creative asset optimized for professional workflows."}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-3">Model</h4>
                                <p className="text-xs font-bold text-white/80">{product.metadata?.base_model || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-3">Release</h4>
                                <p className="text-xs font-bold text-white/80">v1.0.4</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-3">Quality Score</h4>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                                    <span className="text-xs font-black text-indigo-300">{product.quality_score}</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-3">Downloads</h4>
                                <div className="flex items-center gap-1.5">
                                    <Download className="w-3.5 h-3.5 text-white/40" />
                                    <span className="text-xs font-black text-white/40">{product.download_count || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-4">Trigger Word</h4>
                            <code className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                                {product.metadata?.trigger_words?.[0] || 'automatic'}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
