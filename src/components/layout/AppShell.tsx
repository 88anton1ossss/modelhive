'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '../navigation/Sidebar'
import {
    ChevronRight,
    Menu,
    Search,
    Bell,
    SlidersHorizontal,
    Command,
    HelpCircle
} from 'lucide-react'

import { Navbar } from '../navigation/Navbar'
import { Footer } from '../navigation/Footer'
import { CommandPalette } from '../ui/CommandPalette'

interface AppShellProps {
    children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname()
    const [isInspectorOpen, setIsInspectorOpen] = useState(true)

    // Marketing/Auth pages that don't use the workspace layout
    const isWorkspace = pathname.startsWith('/marketplace') ||
        pathname.startsWith('/products') ||
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/u/')

    // SEO/Marketing pages shouldn't use the workspace shell
    const isMarketingPage = !isWorkspace ||
        pathname === '/' ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/pricing')

    if (isMarketingPage) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                {!pathname.startsWith('/login') && !pathname.startsWith('/signup') && <Footer />}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex">
            {/* 1. Left Sidebar */}
            <Sidebar />

            {/* 2. Main content wrapper (Flex-1) */}
            <div className="flex-1 flex flex-col ml-0 md:ml-[72px] transition-all duration-300">
                {/* Workspace Header */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                            <span>ModelHive</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white">
                                {pathname.split('/').filter(Boolean).map(segment => segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')).join(' / ') || 'Workspace'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/30 cursor-pointer hover:bg-white/10 transition-colors">
                            <Search className="w-4 h-4" />
                            <span className="text-xs font-bold whitespace-nowrap">Search (⌘K)</span>
                        </div>
                        <div className="h-8 w-px bg-white/5 hidden md:block" />
                        <div className="flex items-center gap-4">
                            <Bell className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
                            <HelpCircle className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>
                </header>

                {/* Dynamic content area with optional Inspector */}
                <div className="flex flex-1 relative overflow-hidden">
                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto px-8 py-10 canvas-dot-bg">
                        <div className="max-w-6xl mx-auto">
                            {children}
                        </div>
                    </main>

                    {/* 3. Right Inspector Column */}
                    <aside
                        className={`hidden lg:flex flex-col border-l border-white/5 bg-[#0F0F0F] transition-all duration-300 transform shadow-2xl overflow-hidden ${isInspectorOpen ? 'w-[320px] translate-x-0' : 'w-0 translate-x-full'
                            }`}
                    >
                        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
                            <h3 className="inspector-label">Inspector</h3>
                            <button
                                onClick={() => setIsInspectorOpen(false)}
                                className="p-1.5 hover:bg-white/5 rounded-lg transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6" id="inspector-content">
                            <div className="flex flex-col gap-10 text-center py-20 opacity-20 capitalize">
                                <div className="flex flex-col items-center gap-4">
                                    <SlidersHorizontal className="w-8 h-8" />
                                    <span className="text-xs font-bold tracking-widest">No Selection</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Inspector Toggle Tip */}
                    {!isInspectorOpen && (
                        <button
                            onClick={() => setIsInspectorOpen(true)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-20 bg-[#0F0F0F] border-l border-y border-white/5 rounded-l-2xl hidden lg:flex items-center justify-center hover:bg-white/5 transition-all z-10 group"
                        >
                            <div className="w-1 h-8 bg-white/10 rounded-full group-hover:bg-indigo-500 transition-colors" />
                        </button>
                    )}
                </div>
            </div>
            <CommandPalette />
        </div>
    )
}
