'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { LeftNav } from './LeftNav'
import { MobileNav } from './MobileNav'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'
import { cn } from '@/utils/cn'

interface AppShellProps {
    children: React.ReactNode
    inspector?: React.ReactNode
}

export function AppShell({ children, inspector }: AppShellProps) {
    const pathname = usePathname()

    // Define routes that shouldn't use the full workspace layout
    const isMarketingPage = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup')

    if (isMarketingPage) {
        return (
            <div className="min-h-screen flex flex-col bg-black text-white">
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className={cn(
            "app-shell",
            inspector && "has-inspector"
        )}>
            {/* Sidebar: Grid Area 1 */}
            <LeftNav />

            {/* Main Content: Grid Area 2 */}
            <main className="app-main relative canvas-dot-bg">
                {children}
            </main>

            {/* Optional Inspector: Grid Area 3 */}
            <aside id="inspector-content" className="app-inspector border-l border-white/5 bg-black/40 backdrop-blur-3xl overflow-y-auto p-6 hidden lg:block">
                {inspector}
            </aside>

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    )
}
