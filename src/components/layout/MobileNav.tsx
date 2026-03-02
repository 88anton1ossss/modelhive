'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    ShoppingBag,
    Layout,
    Library,
    Search,
    CircleUser
} from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
    { icon: ShoppingBag, label: 'Shop', href: '/marketplace' },
    { icon: Layout, label: 'Studio', href: '/dashboard' },
    { icon: Library, label: 'Library', href: '/dashboard/buyer' },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="mobile-nav-visible fixed bottom-0 left-0 right-0 h-[70px] bg-black/80 backdrop-blur-3xl border-t border-white/5 items-center justify-around px-4 z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <div className={cn(
                            "p-2 rounded-xl transition-all duration-300",
                            isActive ? "text-indigo-400 bg-indigo-500/10" : "text-white/30"
                        )}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest",
                            isActive ? "text-white" : "text-white/20"
                        )}>
                            {item.label}
                        </span>
                    </Link>
                )
            })}

            <Link href="/profile" className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full border border-white/10 p-0.5 mt-1">
                    <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                        <CircleUser className="w-4 h-4 text-white/20" />
                    </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Profile</span>
            </Link>
        </nav>
    )
}
