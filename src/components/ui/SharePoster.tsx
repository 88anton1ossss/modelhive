'use client'

import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, Instagram, Twitter, Sparkles, Zap } from 'lucide-react'

interface SharePosterProps {
    product: any
    isOpen: boolean
    onClose: () => void
}

export function SharePoster({ product, isOpen, onClose }: SharePosterProps) {
    const posterRef = useRef<HTMLDivElement>(null)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100]"
                    />
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#0F0F0F] rounded-[40px] border border-white/10 overflow-hidden"
                        >
                            {/* Left: The Poster Preview */}
                            <div className="p-8 md:p-12 bg-black flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 canvas-dot-bg opacity-30" />

                                <div
                                    ref={posterRef}
                                    className="relative aspect-[4/5] w-full max-w-[320px] bg-[#0A0A0A] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl flex flex-col group"
                                >
                                    {/* Image Area */}
                                    <div className="flex-1 overflow-hidden relative">
                                        <img src={product.preview_urls?.[0]} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                            <Zap className="w-3 h-3 text-indigo-500" fill="currentColor" />
                                            <span>NEW ASSET</span>
                                        </div>
                                    </div>

                                    {/* Info Area */}
                                    <div className="p-8 pt-0 flex flex-col gap-4 relative">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-2xl font-black tracking-tight text-white leading-tight">{product.title}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{product.category}</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase text-white/20 tracking-tighter">Verified File</span>
                                                <span className="text-xl font-black text-indigo-500">${product.price}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                                <Sparkles className="w-5 h-5 text-white/20" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ModelHive Branding Overlay */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
                                        <div className="w-4 h-4 rounded bg-indigo-500 flex items-center justify-center">
                                            <Zap className="w-2 h-2 text-white" fill="white" />
                                        </div>
                                        <span className="text-[10px] font-bold text-white tracking-tighter">ModelHive.co</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Controls */}
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-2xl font-black mb-2">Share Poster</h3>
                                        <p className="text-sm text-white/40 max-w-[240px]">Download this premium graphic to market your asset on social platforms.</p>
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                                        <X className="w-6 h-6 text-white/20" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Format Selection</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button className="p-4 rounded-2xl bg-white/5 border border-indigo-500/50 text-xs font-black uppercase text-indigo-400">Instagram / 4:5</button>
                                            <button className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-black uppercase text-white/20 hover:text-white transition-all">Twitter / 16:9</button>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-white/5">
                                        <button className="w-full py-5 rounded-[20px] bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                            <Download className="w-4 h-4" />
                                            Download PNG
                                        </button>
                                        <button className="w-full py-5 rounded-[20px] bg-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-400 transition-all flex items-center justify-center gap-3">
                                            <Share2 className="w-4 h-4" />
                                            Share Directly
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-center gap-8">
                                    <Instagram className="w-5 h-5 text-white/10 hover:text-pink-500 cursor-pointer transition-colors" />
                                    <Twitter className="w-5 h-5 text-white/10 hover:text-blue-400 cursor-pointer transition-colors" />
                                    <Share2 className="w-5 h-5 text-white/10 hover:text-green-400 cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
