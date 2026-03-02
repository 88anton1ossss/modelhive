'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, ShoppingBag, Layout, User, TrendingUp, Plus, X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const router = useRouter()

    const toggle = useCallback(() => setIsOpen(open => !open), [])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [toggle])

    const actions = [
        { icon: <Layout className="w-4 h-4" />, label: "Community Feed", href: "/marketplace?sort=newest", shortcut: "G F" },
        { icon: <ShoppingBag className="w-4 h-4" />, label: "Marketplace", href: "/marketplace", shortcut: "G M" },
        { icon: <User className="w-4 h-4" />, label: "My Studio", href: "/dashboard", shortcut: "G S" },
        { icon: <TrendingUp className="w-4 h-4" />, label: "Earnings", href: "/dashboard/payouts", shortcut: "G E" },
        { icon: <Plus className="w-4 h-4 text-indigo-400" />, label: "List New Asset", href: "/sell", shortcut: "C N" },
    ]

    const filteredActions = actions.filter(a =>
        a.label.toLowerCase().includes(query.toLowerCase())
    )

    const handleNavigate = (href: string) => {
        router.push(href)
        setIsOpen(false)
        setQuery('')
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="w-full max-w-xl bg-[#141414] border border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                            <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
                                <Search className="w-5 h-5 text-white/20" />
                                <input
                                    autoFocus
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search characters, models, or actions..."
                                    className="flex-1 bg-transparent text-white outline-none placeholder:text-white/10 text-base font-medium"
                                />
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-black text-white/20 uppercase tracking-widest">
                                    <span>ESC</span>
                                </div>
                            </div>

                            <div className="p-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                                {filteredActions.length > 0 ? (
                                    <div className="space-y-1">
                                        <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Quick Navigation</p>
                                        {filteredActions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleNavigate(action.href)}
                                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl hover:bg-white/[0.03] transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="text-white/40 group-hover:text-indigo-400 transition-colors">{action.icon}</div>
                                                    <span className="text-sm font-bold text-white/60 group-hover:text-white/90 transition-colors">{action.label}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowRight className="w-3.5 h-3.5 text-white/20" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center text-center">
                                        <Search className="w-8 h-8 text-white/5 mb-4" />
                                        <p className="text-sm text-white/20 font-bold uppercase tracking-widest">No results found</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-black/40 px-6 py-3 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-[9px] font-black text-white/20 uppercase tracking-widest bg-white/[0.03] px-1.5 py-0.5 rounded">
                                        <Command className="w-3 h-3" />
                                        <span>K</span>
                                    </div>
                                    <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">Open Palette</span>
                                </div>
                                <span className="text-[9px] font-black text-indigo-500/50 uppercase tracking-widest">ModelHive Workspace V1.0</span>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
