import { ArrowRight, TrendingUp, Check, Zap, Wallet } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: "Earn Money From Your AI Models — ModelHive Creator Economy",
    description: "Turn your AI models, LoRAs, and photo datasets into passive income. Keep 75–90% of every sale. Weekly payouts. Start free.",
    keywords: ["earn from ai models", "monetize ai models", "sell lora models", "ai model income", "passive income ai creator"],
}

export default function EarnFromAIModelsPage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Turn Your AI Models Into
                        <br />
                        <span className="indigo-gradient">Passive Income</span>
                    </h1>
                    <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Your LoRAs, photo datasets, presets, and prompts are assets. ModelHive is the marketplace that pays you for them — automatically, weekly, forever.
                    </p>
                    <Link href="/sell" className="accent-button text-base px-8 py-4">
                        Start Earning Today <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                {/* How it works */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-center mb-12">How earning works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Upload", desc: "Upload your model or dataset. Our AI scores it for quality automatically." },
                            { step: "02", title: "List", desc: "Set your price. We generate watermarked previews. Your listing goes live." },
                            { step: "03", title: "Sell", desc: "Buyers discover you via AI-curated feeds, search, and SEO." },
                            { step: "04", title: "Get Paid", desc: "Every Friday, Stripe sends your earnings directly to your bank." },
                        ].map((s) => (
                            <div key={s.step} className="glass-card text-center">
                                <div className="text-3xl font-black indigo-gradient mb-3">{s.step}</div>
                                <h3 className="font-bold mb-2">{s.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Earnings Illustration */}
                <div className="glass-card overflow-hidden mb-20">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-2">What could you earn?</h2>
                        <p className="text-white/40 text-sm mb-8">Estimated monthly earnings based on sales volume and plan:</p>
                        <div className="space-y-6">
                            {[
                                { label: "10 sales/mo × $10", plan: "Free (75%)", monthly: "$75", yearly: "$900" },
                                { label: "50 sales/mo × $25", plan: "Pro (85%)", monthly: "$1,063", yearly: "$12,750" },
                                { label: "200 sales/mo × $50", plan: "Studio (90%)", monthly: "$9,000", yearly: "$108,000" },
                            ].map(row => (
                                <div key={row.label} className="flex items-center gap-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div className="flex-grow">
                                        <p className="font-medium text-sm">{row.label}</p>
                                        <p className="text-xs text-white/30 mt-1">{row.plan}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black indigo-gradient">{row.monthly}<span className="text-white/30 text-sm font-normal">/mo</span></div>
                                        <div className="text-xs text-white/30">{row.yearly}/yr</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="glass-card text-center py-16">
                    <Wallet className="w-14 h-14 mx-auto mb-6" style={{ color: "#6366f1" }} />
                    <h2 className="text-3xl font-bold mb-4">Your work has value. Start collecting.</h2>
                    <p className="text-white/40 mb-8">Free plan. No card required. Upgrade anytime.</p>
                    <Link href="/sell" className="accent-button text-base px-8 py-4">
                        Upload Your First Asset <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
