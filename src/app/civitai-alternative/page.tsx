import { ArrowRight, Check, TrendingUp, Users, Star, Zap, Shield } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: "Best Civitai Alternative — Earn 75–90% Selling AI Models | ModelHive",
    description: "ModelHive is the #1 Civitai alternative where you actually earn money. Keep 75–90% of every sale. Sell LoRAs, checkpoints, datasets, and prompts.",
    keywords: ["civitai alternative", "civitai vs modelhive", "sell ai models and get paid", "best civitai replacement"],
}

const COMPARISON = [
    { feature: "Creator Revenue", civitai: "0%", mh: "75–90%", mhWins: true },
    { feature: "Weekly Automatic Payouts", civitai: "No", mh: "Yes", mhWins: true },
    { feature: "NSFW Content (with controls)", civitai: "Yes", mh: "Yes (age-gated)", mhWins: false },
    { feature: "AI Quality Score Badge", civitai: "No", mh: "Yes — OpenAI Vision", mhWins: true },
    { feature: "Watermarked Preview System", civitai: "No", mh: "Yes — auto-generated", mhWins: true },
    { feature: "Signed URL Download Protection", civitai: "No", mh: "Yes — 24hr expiry", mhWins: true },
    { feature: "Import from Civitai", civitai: "N/A", mh: "Yes — 1-click import", mhWins: true },
    { feature: "Subscription Tiers", civitai: "No (flat)", mh: "Free / Pro / Studio", mhWins: true },
]

export default function CivitaiAlternativePage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-5xl mx-auto px-6 py-24">
                {/* Hero */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                        <TrendingUp className="w-3.5 h-3.5" />
                        The Civitai Alternative That Actually Pays You
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Done Getting <span style={{ color: "rgba(255,100,100,0.7)" }}>Paid $0</span> on Civitai?
                        <br />
                        <span className="indigo-gradient">Join ModelHive</span>
                    </h1>
                    <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Civitai is great for sharing — but you'll never see a dollar. ModelHive was built for creators who want to earn from their AI models, LoRAs, datasets, and presets.
                    </p>
                    <Link href="/sell?import=civitai" className="accent-button text-base px-8 py-4">
                        Import My Civitai Profile Free
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                {/* Comparison Table */}
                <div className="glass-card overflow-hidden mb-20">
                    <div className="px-8 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <h2 className="text-2xl font-bold">ModelHive vs Civitai</h2>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <th className="px-8 py-4 text-left text-white/40 text-xs uppercase tracking-widest font-medium">Feature</th>
                                <th className="px-8 py-4 text-center text-white/40 text-xs uppercase tracking-widest font-medium">Civitai</th>
                                <th className="px-8 py-4 text-center text-xs uppercase tracking-widest font-medium" style={{ color: "#6366f1" }}>ModelHive</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON.map((row, i) => (
                                <tr key={row.feature} style={{ borderBottom: i < COMPARISON.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }} className="hover:bg-white/2 transition-colors">
                                    <td className="px-8 py-4 text-white/70 font-medium">{row.feature}</td>
                                    <td className="px-8 py-4 text-center text-red-400/70 font-medium">{row.civitai}</td>
                                    <td className="px-8 py-4 text-center font-bold" style={{ color: row.mhWins ? "#a5b4fc" : "rgba(255,255,255,0.5)" }}>
                                        {row.mhWins && <Check className="w-4 h-4 inline mr-1.5" style={{ color: "#6366f1" }} />}
                                        {row.mh}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Why Switch */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        { icon: <Zap className="w-6 h-6" style={{ color: "#6366f1" }} />, title: "1-Click Import", desc: "Paste your Civitai profile URL and we auto-fill your entire catalog. Live in minutes, not hours." },
                        { icon: <TrendingUp className="w-6 h-6" style={{ color: "#6366f1" }} />, title: "Real Earnings", desc: "Keep 75–90% of every sale. Civitai keeps 100%. The math isn't complicated." },
                        { icon: <Shield className="w-6 h-6" style={{ color: "#6366f1" }} />, title: "File Protection", desc: "Watermarked previews publicly. Signed private URLs for paying customers only." },
                    ].map(card => (
                        <div key={card.title} className="glass-card">
                            <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>{card.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="glass-card text-center py-16">
                    <h2 className="text-3xl font-bold mb-4">Ready to actually get paid?</h2>
                    <p className="text-white/40 mb-8">Start for free — no credit card required.</p>
                    <Link href="/sell?import=civitai" className="accent-button text-base px-8 py-4">
                        Switch to ModelHive Today
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
