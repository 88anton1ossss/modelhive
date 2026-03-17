'use client'

import { motion } from 'framer-motion'
import { Shield, ShieldCheck, ShieldAlert, ShieldQuestion, Camera, MapPin, Calendar, Aperture, RotateCcw, Share2, Twitter, Copy } from 'lucide-react'
import { HiveAnalysisResult, HiveVerdict } from '@/types/hive'
import { useState, useEffect } from 'react'

const VERDICT_CONFIG: Record<HiveVerdict, { label: string; sub: string; color: string; glow: string; bg: string; icon: typeof ShieldCheck }> = {
    authentic: {
        label: 'Authentic',
        sub: 'This media appears to be captured by a real device',
        color: 'text-emerald-400',
        glow: 'shadow-[0_0_60px_rgba(16,185,129,0.2)]',
        bg: 'from-emerald-500/10 to-emerald-500/5',
        icon: ShieldCheck,
    },
    ai_generated: {
        label: 'AI Generated',
        sub: 'This media shows signs of AI generation',
        color: 'text-violet-400',
        glow: 'shadow-[0_0_60px_rgba(139,92,246,0.2)]',
        bg: 'from-violet-500/10 to-violet-500/5',
        icon: ShieldAlert,
    },
    inconclusive: {
        label: 'Inconclusive',
        sub: 'Not enough data to determine origin',
        color: 'text-amber-400',
        glow: 'shadow-[0_0_60px_rgba(245,158,11,0.2)]',
        bg: 'from-amber-500/10 to-amber-500/5',
        icon: ShieldQuestion,
    },
}

interface Props {
    result: HiveAnalysisResult
    previewUrl: string
    onReset: () => void
}

export function VerificationCard({ result, previewUrl, onReset }: Props) {
    const v = VERDICT_CONFIG[result.verdict]
    const VerdictIcon = v.icon
    const [copied, setCopied] = useState(false)

    // Confetti for authentic
    useEffect(() => {
        if (result.verdict === 'authentic') {
            import('canvas-confetti').then(mod => {
                const fire = mod.default
                fire({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#34d399', '#6ee7b7'] })
            }).catch(() => { })
        }
    }, [result.verdict])

    const shareText = `${result.verdict === 'authentic' ? '✅' : '🟣'} HiveMark: ${result.filename} — ${v.label} (${result.confidence}% confidence)\n\nVerify yours at modelhive.co/hive`

    const handleCopy = () => {
        navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleTweet = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="py-8"
        >
            <div className={`glass-card overflow-hidden ${v.glow}`}>
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${v.bg} p-8 md:p-10 border-b border-white/5`}>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Preview */}
                        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/10 flex-shrink-0">
                            <img src={previewUrl} alt="" className="w-full h-full object-cover" />
                        </div>

                        {/* Verdict */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <VerdictIcon className={`w-7 h-7 ${v.color}`} />
                                <h2 className={`text-3xl font-black ${v.color}`}>{v.label}</h2>
                            </div>
                            <p className="text-sm text-white/40">{v.sub}</p>
                        </div>

                        {/* Confidence */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-20 h-20">
                                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                                    <motion.circle
                                        cx="40" cy="40" r="34" fill="none"
                                        stroke={result.verdict === 'authentic' ? '#10b981' : result.verdict === 'ai_generated' ? '#8b5cf6' : '#f59e0b'}
                                        strokeWidth="6" strokeLinecap="round"
                                        strokeDasharray={`${2 * Math.PI * 34}`}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - result.confidence / 100) }}
                                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-white">{result.confidence}%</span>
                                </div>
                            </div>
                            <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold mt-1">Confidence</span>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 md:p-10">
                    {/* Quick Info Chips */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {result.camera.make && (
                            <Chip icon={<Camera className="w-3.5 h-3.5" />} label={`${result.camera.make} ${result.camera.model || ''}`} />
                        )}
                        {result.capture.date && (
                            <Chip icon={<Calendar className="w-3.5 h-3.5" />} label={new Date(result.capture.date).toLocaleDateString()} />
                        )}
                        {result.capture.gps && (
                            <Chip icon={<MapPin className="w-3.5 h-3.5" />} label={`${result.capture.gps.lat.toFixed(2)}, ${result.capture.gps.lng.toFixed(2)}`} />
                        )}
                        {result.camera.lens && (
                            <Chip icon={<Aperture className="w-3.5 h-3.5" />} label={result.camera.lens} />
                        )}
                        {result.dimensions && (
                            <Chip icon={<span className="text-[10px] font-bold">RES</span>} label={`${result.dimensions.width}×${result.dimensions.height}`} />
                        )}
                    </div>

                    {/* Indicators */}
                    <div className="mb-8">
                        <h4 className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-4">Analysis Details</h4>
                        <div className="space-y-2">
                            {result.indicators.map(ind => (
                                <div key={ind.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ind.type === 'authentic' ? 'bg-emerald-400'
                                        : ind.type === 'ai_signal' ? 'bg-violet-400' : 'bg-white/20'
                                        }`} />
                                    <span className="text-sm font-medium text-white/70">{ind.label}</span>
                                    <span className="text-xs text-white/30 ml-auto">{ind.detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleTweet}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-bold text-white/60 hover:text-white"
                        >
                            <Twitter className="w-4 h-4" /> Share on X
                        </button>
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-bold text-white/60 hover:text-white"
                        >
                            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Result'}
                        </button>
                        <button
                            onClick={onReset}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl accent-button text-sm"
                        >
                            <RotateCcw className="w-4 h-4" /> Verify Another
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 md:px-10 py-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">
                        HiveMark ID: {result.id.slice(0, 8)}
                    </span>
                    <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">
                        {new Date(result.timestamp).toLocaleString()}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white/40">{icon}</span>
            <span className="text-xs font-medium text-white/60">{label}</span>
        </div>
    )
}
