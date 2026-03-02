'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Zap,
    Layout,
    ShoppingBag,
    User,
    TrendingUp,
    DownloadCloud,
    Settings,
    HelpCircle,
    Plus
} from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
    { icon: Layout, label: 'Feed', href: '/feed' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace' },
    { icon: User, label: 'My Studio', href: '/dashboard' },
    { icon: DownloadCloud, label: 'Library', href: '/dashboard/buyer' },
    { icon: TrendingUp, label: 'Earnings', href: '/dashboard/payouts' },
    { icon: Zap, label: 'Imports', href: '/sell?import=civitai' },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-[72px] bg-[#0A0A0A] border-r border-white/5 flex flex-col items-center py-6 z-50 hidden md:flex">
                {/* Logo */}
                <Link href="/" className="mb-10 group">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform">
                        <Zap className="w-6 h-6 text-white" fill="white" />
                    </div>
                </Link>

                {/* Primary Nav */}
                <nav className="flex flex-col gap-4 flex-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <div key={item.href} className="relative group">
                                <Link
                                    href={item.href}
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive
                                            ? 'bg-indigo-500/10 text-indigo-400'
                                            : 'text-white/30 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute -left-3 w-1.5 h-6 bg-indigo-500 rounded-r-full"
                                        />
                                    )}
                                </Link>

                                {/* Tooltip */}
                                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-white text-black text-[10px] font-black uppercase tracking-widest opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl z-50">
                                    {item.label}
                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
                                </div>
                            </div>
                        )
                    })}

                    <div className="h-px w-8 bg-white/5 my-2 mx-auto" />

                    <Link
                        href="/sell"
                        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 text-white/30 hover:bg-indigo-500 hover:text-white transition-all duration-300 group relative"
                    >
                        <Plus className="w-5 h-5" />
                        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl">
                            List New Asset
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-indigo-500 rotate-45" />
                        </div>
                    </Link>
                </nav>

                {/* Bottom Nav */}
                <div className="flex flex-col gap-4">
                    <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/30 hover:bg-white/5 hover:text-white transition-all relative group">
                        <Settings className="w-5 h-5" />
                        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-white text-black text-[10px] font-black uppercase tracking-widest opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl">
                            Settings
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
                        </div>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-white/10 p-0.5 cursor-pointer">
                        <div className="w-full h-full rounded-full bg-black/20" />
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4 z-50">
                {navItems.slice(0, 4).map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`p-2 transition-colors ${isActive ? 'text-indigo-400' : 'text-white/30'}`}
                        >
                            <item.icon className="w-6 h-6" />
                        </Link>
                    )
                })}
                <Link
                    href="/dashboard"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5"
                >
                    <div className="w-full h-full rounded-full bg-black/20" />
                </Link>
            </nav>
        </>
    )
}
