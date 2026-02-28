import { createClient } from "@/utils/supabase/server"
import { ArrowRight, Zap, Shield, Sparkles, TrendingUp, Clock, Star, Filter, ChevronDown } from "lucide-react"
import Link from "next/link"

const CATEGORIES = ['All', 'AI Model', 'Photo Dataset', 'Preset', 'Prompt']
const BASE_MODELS = ['All', 'Flux', 'SDXL', 'SD3.5', 'Pony', 'Other']

export default async function Home({ searchParams }: { searchParams: { tab?: string; category?: string; base_model?: string } }) {
  const supabase = await createClient()
  const tab = searchParams.tab || 'latest'

  let query = supabase.from('products').select('*, profiles(full_name)').eq('status', 'active').limit(24)

  if (searchParams.category && searchParams.category !== 'all') {
    query = query.eq('category', searchParams.category)
  }
  if (searchParams.base_model && searchParams.base_model !== 'all') {
    query = query.contains('metadata', { base_model: searchParams.base_model })
  }

  if (tab === 'trending') query = query.order('review_count', { ascending: false })
  else if (tab === 'top_rated') query = query.order('avg_rating', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  const { data: products } = await query

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

        {/* Civitai Migration Banner */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc" }}>
          <Zap className="w-3.5 h-3.5" />
          <span>Earn <span className="text-white font-bold">75%</span> here vs <span className="line-through opacity-60">0%</span> on Civitai</span>
          <span className="ml-1 px-2 py-0.5 bg-indigo-500 text-white text-[10px] rounded-full">Switch Now →</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-[1.08]">
          The Creator Marketplace
          <br />
          <span className="indigo-gradient">for AI Models & Data</span>
        </h1>

        <p className="text-white/40 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          Sell LoRAs, photo datasets, presets, and prompts. Keep <strong className="text-white">75–90%</strong> of every sale. Weekly payouts. AI quality verified.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-20">
          <Link href="/sell" className="accent-button text-base px-8 py-4">
            Start Selling Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="/marketplace" className="px-8 py-4 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 border transition-all"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            Browse Marketplace
          </Link>
        </div>

        {/* Trust numbers */}
        <div className="flex gap-12 text-center">
          {[
            { num: "10K+", label: "Creators" },
            { num: "75–90%", label: "Royalty Rate" },
            { num: "$1.2M+", label: "Creator Earnings" },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-2xl font-black indigo-gradient">{stat.num}</div>
              <div className="text-xs text-white/30 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Feed */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { id: 'latest', label: 'Latest', icon: <Clock className="w-4 h-4" /> },
              { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'top_rated', label: 'Top Rated', icon: <Star className="w-4 h-4" /> },
            ].map(t => (
              <Link key={t.id} href={`/?tab=${t.id}`}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                style={tab === t.id ? { background: "#6366f1", boxShadow: "0 0 16px rgba(99,102,241,0.3)" } : {}}>
                {t.icon}{t.label}
              </Link>
            ))}
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => {
              const val = cat.toLowerCase().replace(' ', '_')
              const isActive = (searchParams.category || 'all') === val
              return (
                <Link key={cat} href={`/?tab=${tab}&category=${val}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isActive ? 'text-indigo-300 border-indigo-500/40 bg-indigo-500/10' : 'text-white/40 border-white/8 hover:text-white/60 hover:border-white/15'}`}>
                  {cat}
                </Link>
              )
            })}
          </div>

          {/* Base model filter */}
          <div className="ml-auto flex items-center gap-2 text-sm text-white/40 cursor-pointer hover:text-white/70 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Model:</span>
            <select defaultValue={searchParams.base_model || 'All'}
              className="bg-transparent border-none outline-none text-white/60 cursor-pointer text-sm">
              {BASE_MODELS.map(m => <option key={m} value={m.toLowerCase()} className="bg-neutral-900">{m}</option>)}
            </select>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products && products.length > 0 ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : (
            <div className="col-span-4 text-center py-32 text-white/20">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">The hive is waiting for its first models.</p>
              <Link href="/sell" className="accent-button mt-6 text-sm">List Your First Asset</Link>
            </div>
          )}
        </div>
      </section>

      {/* Civitai Migration CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="glass-card !p-0 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 flex flex-col justify-center">
            <div className="score-badge mb-6 w-fit text-[10px]">Migration Special</div>
            <h2 className="text-3xl font-extrabold mb-4">Coming from Civitai?</h2>
            <p className="text-white/40 mb-8 leading-relaxed">
              Import your entire Civitai profile in 30 seconds. We auto-fill all your metadata, model descriptions, and tags. Start earning on your existing work immediately.
            </p>
            <Link href="/sell?import=civitai" className="accent-button w-fit">
              Import from Civitai
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="p-12 flex flex-col gap-4 justify-center"
            style={{ background: "rgba(99,102,241,0.04)", borderLeft: "1px solid rgba(99,102,241,0.1)" }}>
            {[
              { platform: "Civitai", pct: "0%", note: "Donates revenue to Civitai" },
              { platform: "ModelHive Free", pct: "75%", note: "No setup required" },
              { platform: "ModelHive Pro", pct: "85%", note: "$19/mo, unlimited uploads" },
              { platform: "ModelHive Studio", pct: "90%", note: "$49/mo, team features" },
            ].map((row, i) => (
              <div key={row.platform} className="flex items-center justify-between gap-4 py-3"
                style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <span className="text-sm font-medium" style={{ color: i === 0 ? "rgba(255,255,255,0.3)" : "white" }}>{row.platform}</span>
                <div className="flex-1 h-1.5 rounded-full mx-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded-full" style={{ width: row.pct === "0%" ? "2%" : row.pct, background: i === 0 ? "rgba(255,80,80,0.4)" : "#6366f1" }} />
                </div>
                <span className={`font-black text-sm ${i === 0 ? "text-red-400" : "text-indigo-400"}`}>{row.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const metadata = product.metadata || {}
  return (
    <Link href={`/products/${product.id}`} className="group glass-card !p-0 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
        {product.preview_urls?.[0] ? (
          <img src={product.preview_urls[0]} alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10">
            <Sparkles className="w-12 h-12" />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {metadata.base_model && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur text-indigo-300 border border-indigo-500/20">
              {metadata.base_model}
            </span>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {product.quality_score > 0 && (
            <span className="score-badge !text-[10px]">AI {product.quality_score}</span>
          )}
          {product.avg_rating > 0 && (
            <span className="score-badge !text-[10px]">
              <Star className="w-2.5 h-2.5 fill-current" />{product.avg_rating}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#6366f1" }}>
          {product.category?.replace('_', ' ')}
        </p>
        <h3 className="font-bold mb-1 leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">{product.title}</h3>
        <p className="text-[10px] text-white/30 mt-1">{product.profiles?.full_name || 'Anonymous'}</p>

        <div className="mt-auto pt-4 flex justify-between items-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-xl font-black">${product.price}</span>
          <span className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">View →</span>
        </div>
      </div>
    </Link>
  )
}
