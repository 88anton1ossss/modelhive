'use client'

import React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
    const links = {
        Platform: [
            { label: "Browse Marketplace", href: "/marketplace" },
            { label: "Sell Your Assets", href: "/sell" },
            { label: "Pricing Plans", href: "/pricing" },
        ],
        Resources: [
            { label: "Civitai Alternative", href: "/civitai-alternative" },
            { label: "LoRA Marketplace", href: "/lora-marketplace" },
            { label: "Photo Datasets", href: "/photo-dataset-marketplace" },
        ],
        Company: [
            { label: "About ModelHive", href: "/about" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
    }

    return (
        <footer className="border-t px-6 py-20 bg-[#0A0A0A] border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                            <Zap className="w-4 h-4 text-white" fill="white" />
                        </div>
                        <span className="text-xl font-bold indigo-gradient leading-none">ModelHive</span>
                    </div>
                    <p className="text-white/30 text-xs leading-relaxed max-w-[240px]">
                        The workspace for the AI creator economy. High-performance models, curated datasets, and effortless monetization.
                    </p>
                </div>

                {Object.entries(links).map(([section, items]) => (
                    <div key={section}>
                        <h4 className="font-bold mb-6 text-[10px] text-white/30 uppercase tracking-[0.2em]">{section}</h4>
                        <ul className="space-y-4">
                            {items.map(item => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-sm text-white/40 hover:text-white transition-all duration-200">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-20 pt-10 text-center text-[10px] text-white/10 uppercase tracking-[0.3em] font-medium border-t border-white/[0.03]">
                &copy; {new Date().getFullYear()} ModelHive &bull; Designed for Creators
            </div>
        </footer>
    )
}
