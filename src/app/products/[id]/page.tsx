'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import {
    Star,
    ShieldCheck,
    User,
    Calendar,
    ShoppingCart,
    ChevronLeft,
    Loader2,
    Check,
    UserPlus,
    UserCheck,
    Users,
    Info,
    History,
    FileText,
    MessageSquare,
    Share2,
    Heart,
    Sparkles,
    Cpu,
    SlidersHorizontal
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WorkspaceInspector } from "@/components/layout/WorkspaceInspector"
import { BlockSection } from "@/components/ui/BlockSection"
import { SharePoster } from "@/components/ui/SharePoster"

type Tier = { name: string; price: string }

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const supabase = createClient()
    const router = useRouter()

    const [product, setProduct] = useState<any>(null)
    const [isShareOpen, setIsShareOpen] = useState(false)
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [buying, setBuying] = useState(false)
    const [activePreview, setActivePreview] = useState(0)
    const [user, setUser] = useState<any>(null)
    const [hasPurchased, setHasPurchased] = useState(false)
    const [selectedTier, setSelectedTier] = useState<Tier | null>(null)

    const [isFollowing, setIsFollowing] = useState(false)
    const [followerCount, setFollowerCount] = useState(0)
    const [followLoading, setFollowLoading] = useState(false)

    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [submittingReview, setSubmittingReview] = useState(false)
    const [reviewSubmitted, setReviewSubmitted] = useState(false)

    useEffect(() => {
        async function load() {
            const { data: prod } = await supabase
                .from('products')
                .select('*, profiles(id, full_name, avatar_url, follower_count)')
                .eq('id', params.id)
                .single()

            if (!prod) { router.push('/marketplace'); return }
            setProduct(prod)
            setFollowerCount(prod.profiles?.follower_count || 0)

            const tiers: Tier[] = prod.metadata?.tiers || []
            if (tiers.length > 0) setSelectedTier(tiers[0])

            const { data: revs } = await supabase
                .from('reviews')
                .select('*, profiles(full_name)')
                .eq('product_id', params.id)
                .order('created_at', { ascending: false })
            setReviews(revs || [])

            const { data: { user: u } } = await supabase.auth.getUser()
            setUser(u)
            if (u) {
                const { data: sale } = await supabase.from('purchases').select('id').eq('product_id', params.id).eq('buyer_id', u.id).maybeSingle()
                setHasPurchased(!!sale)

                const { data: existingReview } = await supabase.from('reviews').select('id').eq('product_id', params.id).eq('reviewer_id', u.id).maybeSingle()
                if (existingReview) setReviewSubmitted(true)

                if (prod.profiles?.id) {
                    const { data: follow } = await supabase.from('follows').select('id').eq('follower_id', u.id).eq('creator_id', prod.profiles.id).maybeSingle()
                    setIsFollowing(!!follow)
                }
            }
            setLoading(false)
        }
        load()
    }, [params.id])

    const handleFollow = async () => {
        if (!user) { router.push('/login'); return }
        const creatorId = product?.profiles?.id
        if (!creatorId) return
        setFollowLoading(true)
        try {
            if (isFollowing) {
                await supabase.from('follows').delete().eq('follower_id', user.id).eq('creator_id', creatorId)
                setIsFollowing(false)
                setFollowerCount(c => Math.max(0, c - 1))
            } else {
                await supabase.from('follows').insert({ follower_id: user.id, creator_id: creatorId })
                setIsFollowing(true)
                setFollowerCount(c => c + 1)
            }
        } catch (err) { console.error(err) }
        finally { setFollowLoading(false) }
    }

    const handleBuy = async () => {
        if (!user) { router.push('/login'); return }
        setBuying(true)
        try {
            const body: any = { productId: product.id }
            if (selectedTier) body.tier = selectedTier
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else if (data.sessionId) {
                window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`
            }
        } catch (err) { console.error(err) }
        finally { setBuying(false) }
    }

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Loading Asset...</p>
        </div>
    )
    if (!product) return null

    const previews: string[] = product.preview_urls || []
    const metadata = product.metadata || {}
    const tiers: Tier[] = metadata.tiers || []
    const isPWYW = metadata.pwyw === true
    const displayPrice = selectedTier ? selectedTier.price : product.price
    const displayMeta = Object.entries(metadata).filter(([k]) => !['tiers', 'pwyw', 'min_price', 'civitai_id', 'base_model', 'trigger_word', 'recommended_settings'].includes(k))

    return (
        <div className="flex flex-col gap-12">
            {/* Header / Meta */}
            <div className="flex flex-col gap-4">
                <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all">
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to Library
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-black tracking-tight">{product.title}</h1>
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
                            <Share2 className="w-4 h-4 text-white/40" />
                        </button>
                        <button className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
                            <Heart className="w-4 h-4 text-white/40" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <section className="space-y-4">
                <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-white/[0.01] border border-white/5 relative group">
                    {previews[activePreview] ? (
                        <img
                            src={previews[activePreview]}
                            className="w-full h-full object-cover animate-fade-in"
                            alt={product.title}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                            <Sparkles className="w-20 h-20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {previews.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {previews.map((url, i) => (
                            <button
                                key={i}
                                onClick={() => setActivePreview(i)}
                                className={`shrink-0 w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${i === activePreview ? 'border-indigo-500 scale-105' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                            >
                                <img src={url} className="w-full h-full object-cover" alt="" />
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* Content Blocks (Notion Style) */}
            <div className="max-w-3xl flex flex-col pt-8">
                <BlockSection title="Overview" icon={<Info className="w-4 h-4" />}>
                    <p className="text-lg text-white/70 mb-6">{product.description || "A high-performance digital asset curated for professional AI workflows."}</p>
                </BlockSection>

                <BlockSection title="How it was trained" icon={<Cpu className="w-4 h-4" />}>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Base Model</p>
                                <p className="text-sm font-bold text-white/80">{metadata.base_model || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Trigger Word</p>
                                <p className="text-sm font-bold text-indigo-400 font-mono">{metadata.trigger_word || "None"}</p>
                            </div>
                        </div>
                    </div>
                </BlockSection>

                {metadata.recommended_settings && (
                    <BlockSection title="Recommended Settings" icon={<SlidersHorizontal className="w-4 h-4" />}>
                        <pre className="p-6 rounded-2xl bg-black text-xs font-mono text-white/60 border border-white/5 overflow-x-auto">
                            {metadata.recommended_settings}
                        </pre>
                    </BlockSection>
                )}

                <BlockSection title="Changelog" icon={<History className="w-4 h-4" />}>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                <span className="text-[10px] font-black">1.0</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white/80 mb-1">Initial Release</p>
                                <p className="text-xs text-white/30">{new Date(product.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </BlockSection>

                {/* Reviews Section */}
                <BlockSection title={`Reviews (${reviews.length})`} icon={<MessageSquare className="w-4 h-4" />}>
                    <div className="space-y-6">
                        {reviews.map((rev) => (
                            <div key={rev.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
                                    <User className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-sm text-white/80">{rev.profiles?.full_name}</span>
                                        <div className="flex text-indigo-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'opacity-20'}`} />)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/40">{rev.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </BlockSection>
            </div>

            {/* SIDEBAR PORTAL CONTENT */}
            <WorkspaceInspector>
                <section>
                    <h3 className="inspector-label mb-6">Transactions</h3>
                    <div className="p-6 rounded-2xl bg-[#141414] border border-white/5 flex flex-col gap-6 shadow-2xl">
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Ownership</p>
                            <p className="text-3xl font-black text-white">${displayPrice}</p>
                        </div>

                        {tiers.length > 0 && (
                            <div className="space-y-3">
                                {tiers.map((t, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedTier(t)}
                                        className={`w-full p-4 rounded-xl border text-left transition-all group ${selectedTier?.name === t.name ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`text-[11px] font-black uppercase tracking-widest ${selectedTier?.name === t.name ? 'text-indigo-400' : 'text-white/40'}`}>{t.name}</span>
                                            <span className="text-sm font-black text-white">${t.price}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={handleBuy}
                            disabled={buying}
                            className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-xl"
                        >
                            {buying ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    <ShoppingCart className="w-4 h-4" />
                                    Get Access
                                </>
                            )}
                        </button>

                        <p className="text-[10px] text-center text-white/20 font-bold tracking-tight">Instant access to private R2 storage</p>
                    </div>
                </section>

                <section>
                    <h3 className="inspector-label mb-6">The Creator</h3>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-lg">
                                <User className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black text-white/80">{product.profiles?.full_name || "Anonymous"}</p>
                                <p className="text-[10px] font-bold text-white/30">{followerCount} Studio Members</p>
                            </div>
                        </div>

                        <button
                            onClick={handleFollow}
                            disabled={followLoading}
                            className={`w-full py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${isFollowing ? 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400' : 'border-white/10 hover:border-white/30 text-white/60'}`}
                        >
                            {isFollowing ? "Member of Studio" : "Join the Studio"}
                        </button>
                    </div>
                </section>

                <section>
                    <h3 className="inspector-label mb-6">Verified Details</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-[11px]">
                            <span className="text-white/20 font-bold uppercase tracking-tight">Quality Score</span>
                            <div className="flex items-center gap-1.5 text-indigo-400 font-black">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                {product.quality_score}/100
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                            <span className="text-white/20 font-bold uppercase tracking-tight">Avg Rating</span>
                            <div className="flex items-center gap-1.5 text-white/60 font-black">
                                <Star className="w-3.5 h-3.5 fill-current text-indigo-500" />
                                {product.avg_rating || 0}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                            <span className="text-white/20 font-bold uppercase tracking-tight">Last Updated</span>
                            <span className="text-white/40 font-black">{new Date(product.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </section>
            </WorkspaceInspector>

            <SharePoster
                product={product}
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
            />
        </div>
    )
}
