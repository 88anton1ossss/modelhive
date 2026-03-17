'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileSearch, Camera, MapPin, Fingerprint, Shield, Check, Loader2 } from 'lucide-react'
import { HiveAnalysisResult } from '@/types/hive'

const STEPS = [
    { id: 'read', label: 'Reading file structure', icon: FileSearch },
    { id: 'exif', label: 'Extracting metadata', icon: Camera },
    { id: 'geo', label: 'Analyzing geolocation', icon: MapPin },
    { id: 'sig', label: 'Checking AI signatures', icon: Fingerprint },
    { id: 'seal', label: 'Generating HiveMark', icon: Shield },
]

interface Props {
    previewUrl: string
    result: HiveAnalysisResult | null
    onComplete: () => void
}

export function ScanAnimation({ previewUrl, result, onComplete }: Props) {
    const [active, setActive] = useState(0)
    const [done, setDone] = useState<Set<number>>(new Set())
    const calledComplete = useRef(false)

    useEffect(() => {
        const delay = result ? 250 : 700
        const timers: ReturnType<typeof setTimeout>[] = []

        STEPS.forEach((_, i) => {
            timers.push(setTimeout(() => setActive(i), i * delay))
            timers.push(setTimeout(() => setDone(prev => new Set([...prev, i])), i * delay + delay * 0.7))
        })

        timers.push(setTimeout(() => {
            const check = () => {
                if (result && !calledComplete.current) {
                    calledComplete.current = true
                    onComplete()
                } else if (!result) {
                    timers.push(setTimeout(check, 150))
                }
            }
            check()
        }, STEPS.length * delay + 400))

        return () => timers.forEach(clearTimeout)
    }, [result, onComplete])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-8"
        >
            <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                {/* Scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />

                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    {/* Preview */}
                    <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden border border-white/10 relative flex-shrink-0">
                        {previewUrl && <img src={previewUrl} alt="" className="w-full h-full object-cover" />}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-transparent"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="flex-1 space-y-3 w-full">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-white/90">Analyzing Media</h3>
                            <p className="text-xs text-white/30 mt-1">Running forensic analysis…</p>
                        </div>

                        {STEPS.map((step, i) => {
                            const isActive = active === i && !done.has(i)
                            const isDone = done.has(i)
                            const isPending = i > active

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.3 }}
                                    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-violet-500/10 border border-violet-500/20' : isDone ? 'bg-white/[0.02]' : ''
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-emerald-500/20 text-emerald-400' : isActive ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-white/20'
                                        }`}>
                                        {isDone ? <Check className="w-4 h-4" /> : isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : <step.icon className="w-4 h-4" />}
                                    </div>
                                    <span className={`text-sm font-medium ${isDone ? 'text-white/60' : isActive ? 'text-white' : 'text-white/20'}`}>
                                        {step.label}
                                    </span>
                                    {isDone && <span className="ml-auto text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Done</span>}
                                    {isActive && <span className="ml-auto text-[10px] font-bold text-violet-400 uppercase tracking-widest animate-pulse">Scanning</span>}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
