import type { Metadata } from 'next'
import { HiveVerifier } from '@/components/hive/HiveVerifier'
import { Shield, Zap, Lock, Eye } from 'lucide-react'

export const metadata: Metadata = {
    title: 'HiveMark — Verify Any Image or Video | ModelHive',
    description: 'Instantly verify if an image or video is authentic or AI-generated. Free, fast, and cryptographically proven. The blue checkmark for content.',
    openGraph: {
        title: 'HiveMark — Is it Real or AI?',
        description: 'Drop any image or video to instantly verify its authenticity. Powered by ModelHive.',
        url: 'https://modelhive.co/hive',
    },
}

const TRUST_STATS = [
    { icon: Shield, label: 'Files Verified', value: '128K+' },
    { icon: Eye, label: 'AI Detected', value: '47K' },
    { icon: Lock, label: 'ZK Proofs', value: '12K' },
    { icon: Zap, label: 'Avg Speed', value: '<2s' },
]

export default function HivePage() {
    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Hero */}
            <section className="relative w-full pt-24 pb-12 px-6 flex flex-col items-center text-center">
                {/* Background effects */}
                <div className="absolute top-0 inset-x-0 h-[600px] -z-10 canvas-dot-bg opacity-30" />
                <div className="absolute top-0 inset-x-0 h-[600px] -z-10 bg-gradient-to-b from-violet-500/8 via-transparent to-transparent" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/40 mb-8">
                    <Shield className="w-3 h-3 text-violet-400" />
                    <span>Media Verification by ModelHive</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.95] max-w-4xl">
                    Is it <span className="indigo-gradient">Real</span> or <span className="indigo-gradient">AI</span>?
                </h1>

                <p className="text-lg text-white/35 max-w-xl mb-16 leading-relaxed">
                    Drop any image or video. Get an instant forensic analysis with cryptographic proof. Free. No signup.
                </p>
            </section>

            {/* Verifier */}
            <section className="w-full max-w-3xl px-6 pb-16">
                <HiveVerifier />
            </section>

            {/* Trust Stats */}
            <section className="w-full max-w-4xl px-6 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {TRUST_STATS.map(stat => (
                        <div key={stat.label} className="glass-card p-6 text-center">
                            <stat.icon className="w-5 h-5 text-violet-400 mx-auto mb-3" />
                            <div className="text-2xl font-black mb-1">{stat.value}</div>
                            <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/20">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="w-full max-w-4xl px-6 pb-24">
                <h2 className="text-2xl font-bold text-center mb-12">How HiveMark Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            step: '01',
                            title: 'Drop Your File',
                            desc: 'Upload any image or video. We support JPG, PNG, WEBP, HEIC, MP4, and MOV.',
                        },
                        {
                            step: '02',
                            title: 'Forensic Analysis',
                            desc: 'We scan EXIF data, camera signatures, AI patterns, and metadata fingerprints.',
                        },
                        {
                            step: '03',
                            title: 'Get Your HiveMark',
                            desc: 'Receive a verified seal with confidence score. Share it anywhere.',
                        },
                    ].map(item => (
                        <div key={item.step} className="glass-card p-8 relative overflow-hidden group">
                            <span className="absolute -top-4 -right-2 text-[80px] font-black text-white/[0.02] group-hover:text-white/[0.04] transition-colors">
                                {item.step}
                            </span>
                            <div className="relative z-10">
                                <div className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-3">Step {item.step}</div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-white/30 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
