import { createClient } from "@/utils/supabase/server"
import { ArrowRight, Zap, Sparkles, TrendingUp, Cpu, Image as ImageIcon, CheckCircle2, Trophy, Globe, Lock } from "lucide-react"
import Link from "next/link"
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid"

export default async function Home() {
  const supabase = await createClient()

  // Fetch a few featured products for the bento highlights
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, profiles(full_name)')
    .eq('status', 'active')
    .order('quality_score', { ascending: false })
    .limit(4)

  return (
    <div className="flex flex-col gap-24 pb-32 overflow-hidden">
      {/* 1. Hero / Introduction */}
      <section className="relative pt-24 pb-12 px-6 flex flex-col items-center text-center">
        <div className="absolute top-0 inset-x-0 h-[500px] -z-10 canvas-dot-bg opacity-50" />
        <div className="absolute top-0 inset-x-0 h-[500px] -z-10 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/40 mb-8 animate-fade-in">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>The Elite Workspace for AI Creators</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] max-w-5xl">
          The Hub for <span className="indigo-gradient">Models</span> <br className="hidden md:block" />
          & Digital Assets
        </h1>

        <p className="text-lg md:text-xl text-white/40 max-w-2xl mb-12 leading-relaxed">
          ModelHive is the workspace where high-end AI creators host, monetize, and scale their work. Keep <strong className="text-white">75–90%</strong> of every sale.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/sell" className="accent-button text-base px-10 py-5">
            Start Selling Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="/marketplace" className="px-10 py-5 rounded-2xl font-bold bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
            Explore Marketplace
          </Link>
        </div>
      </section>

      {/* 2. Bento Grid */}
      <section className="px-6">
        <BentoGrid>
          {/* Main Block: Trending */}
          <BentoCard className="md:col-span-4 lg:col-span-4 min-h-[400px]">
            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Top Earning This Week</h3>
                  <p className="text-xs text-white/30 uppercase tracking-widest font-black">Creator Spotlights</p>
                </div>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {featuredProducts?.slice(0, 2).map((p, i) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4 group/item hover:bg-indigo-500/5 transition-all">
                    <div className="aspect-video rounded-xl bg-white/5 overflow-hidden">
                      <img src={p.preview_urls?.[0]} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" alt="" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{p.title}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-white/30">{p.profiles?.full_name}</span>
                        <span className="text-xs font-black text-indigo-400">$2.4k+ earned</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Block: Civitai Import */}
          <BentoCard className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border-indigo-500/20">
            <div className="p-8 h-full flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 shadow-2xl">
                <DownloadCloud className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black mb-4">Coming from Civitai?</h3>
              <p className="text-sm text-white/60 mb-8 leading-relaxed">
                Import your entire portfolio in one click. We auto-fill everything.
              </p>
              <Link href="/sell?import=civitai" className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-white/90 transition-all text-sm">
                Switch Now
              </Link>
            </div>
          </BentoCard>

          {/* Block: Photographers */}
          <BentoCard className="md:col-span-2 lg:col-span-2">
            <div className="p-8 h-full flex flex-col">
              <ImageIcon className="w-6 h-6 text-blue-400 mb-6" />
              <h3 className="text-lg font-bold mb-2 leading-tight">For Photographers</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                License your high-res datasets for AI training. Secure, private storage + automatic watermarking.
              </p>
              <div className="mt-auto pt-6 flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20" />
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20" />
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20" />
              </div>
            </div>
          </BentoCard>

          {/* Block: AI Artists */}
          <BentoCard className="md:col-span-2 lg:col-span-2">
            <div className="p-8 h-full flex flex-col">
              <Cpu className="w-6 h-6 text-purple-400 mb-6" />
              <h3 className="text-lg font-bold mb-2 leading-tight">For AI Artists</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Sell your fine-tuned LoRAs and Checkpoints. Version control, prompt guides, and usage tips built-in.
              </p>
              <div className="mt-auto pt-6 flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-black" />
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-black" />
                <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-black" />
              </div>
            </div>
          </BentoCard>

          {/* Block: Why Us */}
          <BentoCard className="md:col-span-2 lg:col-span-2 border-white/10">
            <div className="p-8 h-full flex flex-col">
              <h3 className="text-lg font-bold mb-4">Why ModelHive?</h3>
              <div className="space-y-4">
                {[
                  { icon: Lock, text: "Private R2 Master Files" },
                  { icon: Globe, text: "Global Edge SEO" },
                  { icon: CheckCircle2, text: "AI Quality Verified" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* 3. Global Social Proof / Stats */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-12">
        {[
          { label: "Total Volume", value: "$4.2M+" },
          { label: "Active Creators", value: "12,400" },
          { label: "Average Royalty", value: "85%" },
          { label: "Assets Verified", value: "82K" },
        ].map(stat => (
          <div key={stat.label}>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* 4. Comparison Table (Compact) */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="glass-card flex flex-col gap-8 p-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Fair Monetization</h2>
            <p className="text-sm text-white/30">Why creators are choosing ModelHive over Civitai.</p>
          </div>

          <div className="space-y-4">
            <ComparisonRow label="Base Royalty" hive="75–90%" civ="0%" positive />
            <ComparisonRow label="Master File Security" hive="Private Storage" civ="Public Access" positive />
            <ComparisonRow label="Payout Frequency" hive="Weekly" civ="N/A" positive />
            <ComparisonRow label="SEO Optimization" hive="Enterprise" civ="Limited" positive />
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 px-6 text-center bg-indigo-500/5 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
        <h2 className="text-4xl md:text-5xl font-black mb-8 relative">Ready to own your work?</h2>
        <Link href="/sell" className="accent-button text-lg px-12 py-6 relative">
          Start Your Hive Now
        </Link>
      </section>
    </div>
  )
}

function ComparisonRow({ label, hive, civ, positive }: any) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors px-4 rounded-lg">
      <span className="text-xs font-bold text-white/50">{label}</span>
      <div className="flex gap-12 text-sm font-black">
        <span className="text-indigo-400 min-w-[120px] text-right">{hive}</span>
        <span className="text-white/20 min-w-[120px] text-right">{civ}</span>
      </div>
    </div>
  )
}

function DownloadCloud(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m8 17 4 4 4-4" />
    </svg>
  )
}
