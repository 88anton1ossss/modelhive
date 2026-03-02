'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Download, ShieldCheck, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ProductCardProps {
    product: any
    className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
    const metadata = product.metadata || {}

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={cn(
                "group flex flex-col bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5",
                className
            )}
        >
            {/* 1. Image Container */}
            <Link href={`/products/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
                {product.preview_urls?.[0] ? (
                    <img
                        src={product.preview_urls[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10">
                        <ShoppingBag className="w-12 h-12" />
                    </div>
                )}

                {/* Top-left Chips */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {metadata.base_model && (
                        <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                            {metadata.base_model}
                        </span>
                    )}
                    {product.nsfw_flag && (
                        <span className="px-2 py-1 rounded-lg bg-red-500/20 backdrop-blur-xl border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-400">
                            NSFW
                        </span>
                    )}
                </div>

                {/* Quality Score / Rating (Bottom Right Overlay) */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl shadow-2xl">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-500/20">
                        <ShieldCheck className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] font-black text-indigo-300">{product.quality_score || 0}</span>
                    </div>
                    {product.avg_rating > 0 && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/5">
                            <Star className="w-3 h-3 text-white/60 fill-white/20" />
                            <span className="text-[10px] font-black text-white/60">{product.avg_rating}</span>
                        </div>
                    )}
                </div>
            </Link>

            {/* 2. Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none">
                        {product.category?.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white/20">
                        <Download className="w-3 h-3" />
                        <span>{product.download_count || 0}</span>
                    </div>
                </div>

                <Link href={`/products/${product.id}`} className="flex-1">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight mb-2">
                        {product.title}
                    </h3>
                    <p className="text-[11px] text-white/40 line-clamp-2 mb-4">
                        {product.description || `Premium digital asset for AI creators.`}
                    </p>
                </Link>

                {/* 3. Footer / Price */}
                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Price</span>
                        <span className="text-xl font-black text-white leading-tight">${product.price}</span>
                    </div>

                    <Link href={`/products/${product.id}`} className="h-10 px-4 rounded-xl bg-indigo-500 text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-indigo-400 transition-all">
                        Details
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

function ShoppingBag(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}
