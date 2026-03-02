'use client'

import React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-500 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-xl font-bold tracking-tight indigo-gradient">ModelHive</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/40">
                <Link href="/marketplace" className="hover:text-white transition-colors">Browse</Link>
                <Link href="/sell" className="hover:text-white transition-colors">Sell</Link>
                <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="/civitai-alternative" className="text-indigo-400/80 hover:text-indigo-400 transition-colors font-semibold">vs Civitai</Link>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-white/40 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5 transition-all">Log in</Link>
                <Link href="/signup" className="accent-button !py-2 !px-4 text-[10px] uppercase tracking-widest font-black">Start Earning</Link>
            </div>
        </nav>
    )
}
