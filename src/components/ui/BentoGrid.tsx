'use client'

import React from 'react'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

export function BentoGrid({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto", className)}>
            {children}
        </div>
    )
}

export function BentoCard({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode
    className?: string
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "glass-card !p-0 overflow-hidden group flex flex-col",
                className
            )}
        >
            {children}
        </motion.div>
    )
}
