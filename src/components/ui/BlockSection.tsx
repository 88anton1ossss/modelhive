'use client'

import React from 'react'
import { cn } from '@/utils/cn'

interface BlockSectionProps {
    title: string
    children: React.ReactNode
    className?: string
    icon?: React.ReactNode
}

export function BlockSection({ title, children, className, icon }: BlockSectionProps) {
    return (
        <section className={cn("py-8 border-b border-white/5 last:border-0", className)}>
            <div className="flex items-center gap-2 mb-4">
                {icon && <div className="text-indigo-400">{icon}</div>}
                <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white/50">{title}</h3>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-white/40 leading-relaxed font-normal">
                {children}
            </div>
        </section>
    )
}
