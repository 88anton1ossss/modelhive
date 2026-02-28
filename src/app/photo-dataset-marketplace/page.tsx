import { ArrowRight, Camera, Check, Shield, Star } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: "Photo Dataset Marketplace — Sell & Buy Training Data | ModelHive",
    description: "The top marketplace to buy and sell curated photo datasets for AI training. Portrait datasets, landscape datasets, and more — AI quality verified.",
    keywords: ["photo dataset marketplace", "buy photo datasets", "sell photo datasets", "AI training data", "portrait dataset", "landscape dataset"],
}

export default function PhotoDatasetMarketplacePage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                        <Camera className="w-3.5 h-3.5" />
                        Ethically Licensed. AI Verified.
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        The <span className="indigo-gradient">Photo Dataset</span> Marketplace
                    </h1>
                    <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Buy curated, licensed, AI-quality-scored photo datasets for training your models.
                        Portrait, landscape, street, product — all categories available.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link href="/marketplace?category=photo_dataset" className="accent-button text-base px-8 py-4">
                            Browse Datasets <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="/sell" className="px-8 py-4 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 border transition-all"
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                            Sell Your Dataset
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        { icon: <Star className="w-6 h-6" style={{ color: "#6366f1" }} />, title: "AI Quality Verified", desc: "Every dataset is scored by OpenAI Vision on upload. Buy with confidence." },
                        { icon: <Shield className="w-6 h-6" style={{ color: "#6366f1" }} />, title: "Ethically Licensed", desc: "All datasets include explicit license information (CC0, CC-BY, Commercial)." },
                        { icon: <Camera className="w-6 h-6" style={{ color: "#6366f1" }} />, title: "10 Free Previews", desc: "Watermarked sample images available for every dataset before purchase." },
                    ].map(c => (
                        <div key={c.title} className="glass-card">
                            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>{c.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{c.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="glass-card text-center py-16">
                    <h2 className="text-3xl font-bold mb-4">Have 90K photos sitting idle?</h2>
                    <p className="text-white/40 mb-8">List them in minutes. Start earning passive royalties.</p>
                    <Link href="/sell" className="accent-button text-base px-8 py-4">
                        Upload My Dataset Free <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
