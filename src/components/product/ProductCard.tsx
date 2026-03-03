'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Download, CheckCircle2, ShoppingBag, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ProductCardProps {
    product: any
    className?: string
    onClick?: () => void
}

export function ProductCard({ product, className, onClick }: ProductCardProps) {
    const metadata = product.metadata || {}

    // Random gradient for each card for some visual flair on hover or fallback
    const gradients = [
        "from-pink-500/20 to-purple-500/20",
        "from-purple-500/20 to-indigo-500/20",
        "from-blue-500/20 to-cyan-500/20",
        "from-indigo-500/20 to-violet-500/20",
    ]
    const gradient = gradients[parseInt(product.id.slice(-1), 16) % gradients.length] || gradients[0]

    return (
        <motion.div
            whileHover={{ y: -6 }}
            onClick={onClick}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
                "group relative flex flex-col bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/40 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer",
                className
            )}
        >
            {/* 1. Image Container (4:5 Aspect Ratio) */}
            <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.02]">
                {product.preview_urls?.[0] ? (
                    <img
                        src={product.preview_urls[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10">
                        <ShoppingBag className="w-12 h-12" />
                    </div>
                )}

                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Subtle Branding Glow on Hover */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-overlay", gradient)} />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/80 backdrop-blur-xl text-[9px] font-black uppercase tracking-[0.15em] text-white">
                        {product.product_type || product.category || 'Asset'}
                    </span>
                    {metadata.base_model && (
                        <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[9px] font-black uppercase tracking-[0.15em] text-white">
                            {metadata.base_model}
                        </span>
                    )}
                </div>

                {/* Quality Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white">
                    <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-black">{product.quality_score || 'N/A'}</span>
                </div>

                {/* Hover "Discover" Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                        View Asset →
                    </div>
                </div>

                {/* Rating (Bottom Corner) */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-black text-white">{product.avg_rating || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                        <Download className="w-3 h-3 text-white/60" />
                        <span className="text-[10px] font-black text-white/60">{product.download_count || 0}</span>
                    </div>
                </div>

                {/* Heart Icon (Favorite) */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 transition-colors">
                        <Heart className="w-3.5 h-3.5 text-white" />
                    </button>
                </div>
            </div>

            {/* 2. Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                        {product.product_type || product.category?.replace('_', ' ') || 'Asset'}
                    </span>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:indigo-gradient transition-all duration-300 line-clamp-2 leading-tight mb-3">
                        {product.title}
                    </h3>
                </div>

                {/* 3. Footer / Price / Creator */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/20 uppercase tracking-widest font-black">Investment</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm text-white/40 font-bold">from</span>
                            <span className="text-2xl font-black text-white leading-none">${product.price}</span>
                            {metadata.pwyw && <span className="text-[10px] font-black text-indigo-400">+</span>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 group/creator">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden shadow-inner">
                            {product.seller_profile?.avatar_url ? (
                                <img src={product.seller_profile.avatar_url} className="w-full h-full object-cover" />
                            ) : (
                                <div className={cn("w-full h-full bg-gradient-to-br text-[10px] flex items-center justify-center font-black text-white/40", gradient)}>
                                    {product.seller_profile?.full_name?.[0] || '?'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
