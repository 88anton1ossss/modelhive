import Link from "next/link"
import { Check, Sparkles, Zap, Building2, ArrowRight } from "lucide-react"

const PLANS = [
    {
        id: "free",
        name: "Hive Free",
        price: "$0",
        period: "",
        fee: "25%",
        keepPct: "75%",
        color: "rgba(255,255,255,0.06)",
        accent: "rgba(255,255,255,0.3)",
        icon: <Sparkles className="w-5 h-5" />,
        popular: false,
        features: [
            "Up to 10 active listings",
            "Basic analytics",
            "Community support",
            "25% platform fee",
            "Weekly payouts",
        ],
        cta: "Get Started Free",
    },
    {
        id: "pro",
        name: "Pro Creator",
        price: "$19",
        period: "/mo",
        fee: "15%",
        keepPct: "85%",
        color: "rgba(99,102,241,0.08)",
        accent: "#6366f1",
        icon: <Zap className="w-5 h-5 text-indigo-400" />,
        popular: true,
        features: [
            "Unlimited listings",
            "Advanced analytics & royalty dashboard",
            "Priority AI quality scoring",
            "15% platform fee (keep 85%)",
            "Weekly payouts + breakdown emails",
            "'Pro' badge on profile",
        ],
        cta: "Start Pro — $19/mo",
    },
    {
        id: "studio",
        name: "Studio",
        price: "$49",
        period: "/mo",
        fee: "10%",
        keepPct: "90%",
        color: "rgba(16,16,40,0.8)",
        accent: "#818cf8",
        icon: <Building2 className="w-5 h-5 text-indigo-300" />,
        popular: false,
        features: [
            "Everything in Pro",
            "Team collaboration (3 seats)",
            "Custom storefront branding",
            "API access for bulk uploads",
            "10% platform fee (keep 90%)",
            "Dedicated account manager",
        ],
        cta: "Start Studio — $49/mo",
    },
]

export default function PricingPage() {
    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                        <Sparkles className="w-3.5 h-3.5" />
                        No hidden fees. Cancel anytime.
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-5">
                        Simple, <span className="indigo-gradient">Creator-First</span> Pricing
                    </h1>
                    <p className="text-white/40 text-xl max-w-xl mx-auto">
                        The more you grow, the more you keep. Start free and upgrade anytime.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLANS.map((plan) => (
                        <div key={plan.id} className="relative glass-card flex flex-col"
                            style={plan.popular ? { borderColor: "rgba(99,102,241,0.4)", boxShadow: "0 0 40px rgba(99,102,241,0.1)" } : {}}>
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1 rounded-full text-xs font-bold text-white"
                                        style={{ background: "#6366f1", boxShadow: "0 0 16px rgba(99,102,241,0.5)" }}>
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                                    {plan.icon}
                                </div>
                                <span className="font-bold text-lg">{plan.name}</span>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black">{plan.price}</span>
                                    <span className="text-white/40 text-sm">{plan.period}</span>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-4xl font-black indigo-gradient">{plan.keepPct}</span>
                                    <span className="text-sm text-white/40">you keep per sale</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm">
                                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.popular ? "#6366f1" : "rgba(255,255,255,0.4)" }} />
                                        <span className="text-white/70">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/api/billing/checkout" className="accent-button w-full"
                                style={!plan.popular ? { background: "rgba(255,255,255,0.06)", boxShadow: "none", color: "rgba(255,255,255,0.8)" } : {}}>
                                {plan.cta}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Fee Comparison Table */}
                <div className="mt-24 glass-card overflow-hidden">
                    <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <h2 className="text-2xl font-bold">Platform Fee Comparison</h2>
                        <p className="text-white/40 text-sm mt-1">See how much you keep on a $100 sale</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                                    <th className="px-8 py-4 text-left text-white/40 text-xs uppercase tracking-widest font-medium">Platform</th>
                                    <th className="px-8 py-4 text-center text-white/40 text-xs uppercase tracking-widest font-medium">Platform Fee</th>
                                    <th className="px-8 py-4 text-center text-white/40 text-xs uppercase tracking-widest font-medium">You Keep</th>
                                    <th className="px-8 py-4 text-center text-white/40 text-xs uppercase tracking-widest font-medium">On $100 Sale</th>
                                </tr>
                            </thead>
                            <tbody style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                {[
                                    { p: "Civitai", fee: "~100%", keep: "$0", on100: "$0", highlight: false },
                                    { p: "Gumroad", fee: "10% + $0.25", keep: "~90%", on100: "~$89", highlight: false },
                                    { p: "ModelHive Free", fee: "25%", keep: "75%", on100: "$75", highlight: true },
                                    { p: "ModelHive Pro", fee: "15%", keep: "85%", on100: "$85", highlight: true },
                                    { p: "ModelHive Studio", fee: "10%", keep: "90%", on100: "$90", highlight: true },
                                ].map((row, i) => (
                                    <tr key={row.p} className="transition-colors hover:bg-white/2"
                                        style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                                        <td className="px-8 py-4 font-medium" style={{ color: row.highlight ? "white" : "rgba(255,255,255,0.4)" }}>
                                            {row.p} {row.highlight && <span className="ml-2 score-badge">✓</span>}
                                        </td>
                                        <td className="px-8 py-4 text-center text-white/50">{row.fee}</td>
                                        <td className="px-8 py-4 text-center font-bold" style={{ color: row.highlight ? "#6366f1" : "rgba(255,255,255,0.3)" }}>{row.keep}</td>
                                        <td className="px-8 py-4 text-center font-black text-lg" style={{ color: row.highlight ? "#a5b4fc" : "rgba(255,100,100,0.6)" }}>{row.on100}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
