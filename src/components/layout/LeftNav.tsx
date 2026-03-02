'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    ShoppingBag,
    Layout,
    Library,
    Zap,
    Search,
    Settings,
    CircleUser
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

const navItems = [
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace' },
    { icon: Layout, label: 'My Studio', href: '/dashboard' },
    { icon: Library, label: 'Library', href: '/dashboard/buyer' },
]

export function LeftNav() {
    const pathname = usePathname()

    return (
        <aside className="app-sidebar w-[80px] border-r border-white/5 bg-black/20 backdrop-blur-3xl flex flex-col items-center py-8 gap-10">
            {/* Logo */}
            <Link href="/" className="group relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-transform group-hover:scale-110">
                    <Zap className="w-6 h-6 text-white" fill="white" />
                </div>
            </Link>

            {/* Main Nav */}
            <nav className="flex flex-col gap-6 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group"
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                                isActive
                                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                                    : "text-white/30 hover:text-white hover:bg-white/5"
                            )}>
                                <item.icon className="w-5 h-5" />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white text-black text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-50">
                                {item.label}
                            </div>

                            {/* Active Indicator Line */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeSideNav"
                                    className="absolute -left-4 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-full"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer Nav */}
            <div className="flex flex-col gap-6 pb-4">
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all">
                    <Settings className="w-5 h-5" />
                </button>
                <Link href="/profile" className="w-12 h-12 rounded-full overflow-hidden border border-white/10 p-0.5 hover:border-indigo-500/50 transition-all">
                    <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                        <CircleUser className="w-full h-full text-white/20" />
                    </div>
                </Link>
            </div>
        </aside>
    )
}
