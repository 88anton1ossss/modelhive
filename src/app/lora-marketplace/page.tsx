import { ArrowRight, Layers, Check, Zap, Shield, Star } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: "LoRA Marketplace — Buy & Sell LoRA Models | ModelHive",
    description: "The best LoRA marketplace for Flux, SDXL, SD3.5 and Pony models. Sell your LoRAs and keep up to 90% of every sale. Quality AI-verified.",
    keywords: ["lora marketplace", "buy lora models", "sell lora models", "flux lora", "sdxl lora marketplace", "stable diffusion models"],
}

const BASE_MODELS = ["Flux Dev", "Flux Schnell", "SDXL", "SD 3.5", "Pony Diffusion", "SD 1.5"]

export default function LoraMarketplacePage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                        <Layers className="w-3.5 h-3.5" />
                        AI-Verified Quality Scores on Every Model
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        The Premier <span className="indigo-gradient">LoRA Marketplace</span>
                    </h1>
                    <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Buy curated LoRA, checkpoint, and fine-tuned models. Flux, SDXL, SD3.5, and more — all with AI-assigned quality scores and watermarked previews.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link href="/marketplace?category=ai_model" className="accent-button text-base px-8 py-4">
                            Browse LoRA Models <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="/sell" className="px-8 py-4 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 border transition-all"
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                            Sell Your Models
                        </Link>
                    </div>
                </div>

                {/* Base Model Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8">Browse by Base Model</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {BASE_MODELS.map(model => (
                            <Link key={model} href={`/marketplace?category=ai_model&base_model=${model.toLowerCase().replace(' ', '_')}`}
                                className="glass-card flex items-center gap-3 hover:!border-indigo-500/40 transition-all group cursor-pointer">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: "rgba(99,102,241,0.1)" }}>
                                    <Layers className="w-5 h-5" style={{ color: "#6366f1" }} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm group-hover:text-indigo-300 transition-colors">{model}</p>
                                    <p className="text-xs text-white/30">LoRAs & Models</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Seller Value */}
                <div className="glass-card overflow-hidden mb-20">
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Sell your LoRAs and actually get paid</h2>
                            <p className="text-white/40 text-sm leading-relaxed mb-6">
                                Most AI model platforms give creators nothing. ModelHive is different — you keep 75–90% of every sale, with automatic weekly payouts and full analytics.
                            </p>
                            <ul className="space-y-3">
                                {["Unlimited model listings", "AI quality score badge on every upload", "Watermarked previews auto-generated", "Signed download URLs — buyers only", "Weekly Stripe payouts"].map(f => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm">
                                        <Check className="w-4 h-4 shrink-0" style={{ color: "#6366f1" }} /><span className="text-white/70">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center gap-4">
                            {[{ label: "Creator keeps (Free)", pct: "75%", w: "75%" }, { label: "Creator keeps (Pro)", pct: "85%", w: "85%" }, { label: "Creator keeps (Studio)", pct: "90%", w: "90%" }].map(r => (
                                <div key={r.label}>
                                    <div className="flex justify-between text-sm mb-1.5"><span className="text-white/50">{r.label}</span><span className="font-black indigo-gradient">{r.pct}</span></div>
                                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                                        <div className="h-full rounded-full" style={{ width: r.w, background: "linear-gradient(90deg, #4f46e5, #6366f1)" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center glass-card py-16">
                    <h2 className="text-3xl font-bold mb-4">Start listing your LoRAs free</h2>
                    <p className="text-white/40 mb-8">No approval process. Upload in minutes.</p>
                    <Link href="/sell" className="accent-button text-base px-8 py-4">
                        List a Model Free <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
