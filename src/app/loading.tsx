"use client"

import { Sparkles } from "lucide-react"

export default function Loading() {
    return (
        <div className="min-h-screen py-28 px-6 max-w-7xl mx-auto">
            {/* Hero skeleton */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="h-4 w-48 rounded-full bg-white/5 animate-pulse" />
                <div className="h-12 w-[600px] max-w-full rounded-xl bg-white/5 animate-pulse" />
                <div className="h-5 w-96 max-w-full rounded-lg bg-white/[0.03] animate-pulse" />
            </div>

            {/* Tabs skeleton */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-28 rounded-lg bg-white/5 animate-pulse" />
                ))}
            </div>

            {/* Product grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {/* Image skeleton */}
                        <div className="aspect-[4/3] bg-white/[0.04] animate-pulse" />
                        {/* Info skeleton */}
                        <div className="p-4 space-y-3">
                            <div className="h-2.5 w-16 rounded-full bg-white/5 animate-pulse" />
                            <div className="h-4 w-3/4 rounded-lg bg-white/5 animate-pulse" />
                            <div className="h-3 w-1/3 rounded-lg bg-white/[0.03] animate-pulse" />
                            <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                                <div className="h-5 w-12 rounded-lg bg-white/5 animate-pulse" />
                                <div className="h-3 w-10 rounded-lg bg-white/[0.03] animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
