"use client"

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import { Star, ShieldCheck, User, Calendar, ShoppingCart, ChevronLeft, Loader2, Check, UserPlus, UserCheck, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Tier = { name: string; price: string }

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const supabase = createClient()
    const router = useRouter()

    const [product, setProduct] = useState<any>(null)
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
                const { data: sale } = await supabase.from('purchases').select('id').eq('product_id', params.id).eq('buyer_id', u.id).limit(1).maybeSingle()
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

    const handleReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !product) return
        setSubmittingReview(true)
        try {
            await supabase.from('reviews').insert({ product_id: product.id, reviewer_id: user.id, rating, comment })
            const { data: revs } = await supabase.from('reviews').select('*, profiles(full_name)').eq('product_id', params.id).order('created_at', { ascending: false })
            setReviews(revs || [])
            setReviewSubmitted(true)
        } catch (err) { console.error(err) }
        finally { setSubmittingReview(false) }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-400" /></div>
    if (!product) return null

    const previews: string[] = product.preview_urls || []
    const metadata = product.metadata || {}
    const tiers: Tier[] = metadata.tiers || []
    const isPWYW = metadata.pwyw === true
    const displayPrice = selectedTier ? selectedTier.price : product.price
    const displayMeta = Object.entries(metadata).filter(([k]) => !['tiers', 'pwyw', 'min_price', 'civitai_id'].includes(k))

    return (
        <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto">
            <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors mb-8">
                <ChevronLeft className="w-4 h-4" /> Back to Marketplace
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-4">
                    <div className="glass-card !p-2 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                        {previews[activePreview] ? (
                            <img src={previews[activePreview]} alt={product.title} className="w-full h-full object-contain rounded-xl" loading="lazy" width={800} height={600} />
                        ) : (
                            <div className="text-white/10 text-lg">No preview available</div>
                        )}
                    </div>

                    {previews.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {previews.map((url: string, i: number) => (
                                <button key={i} onClick={() => setActivePreview(i)} className="shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all"
                                    style={{ border: i === activePreview ? "2px solid #6366f1" : "2px solid rgba(255,255,255,0.06)", opacity: i === activePreview ? 1 : 0.5 }}>
                                    <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" loading="lazy" width={64} height={64} />
                                </button>
                            ))}
                        </div>
                    )}

                    <div id="reviews" className="pt-8 space-y-6">
                        <h2 className="text-xl font-bold">Reviews ({reviews.length})</h2>
                        {reviews.length > 0 ? (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review.id} className="glass-card !p-4 flex gap-4">
                                        <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                                            <User className="w-4 h-4 text-indigo-400" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-sm">{review.profiles?.full_name || 'Anonymous'}</span>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-indigo-400 fill-indigo-400' : 'text-white/10'}`} />)}
                                                </div>
                                            </div>
                                            <p className="text-sm text-white/50 leading-relaxed">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-white/20 text-sm italic">No reviews yet. Be the first!</p>}

                        {hasPurchased && !reviewSubmitted && (
                            <form onSubmit={handleReview} className="glass-card space-y-4">
                                <h3 className="font-bold text-sm">Leave a Review</h3>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button key={s} type="button" onClick={() => setRating(s)}>
                                            <Star className={`w-6 h-6 cursor-pointer transition-colors ${s <= rating ? 'text-indigo-400 fill-indigo-400' : 'text-white/15 hover:text-white/30'}`} />
                                        </button>
                                    ))}
                                </div>
                                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3}
                                    className="w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-all resize-none"
                                    style={{ borderColor: "rgba(255,255,255,0.08)" }} placeholder="Share your experience..." />
                                <button type="submit" disabled={submittingReview || !comment.trim()} className="accent-button text-sm">
                                    {submittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Review'}
                                </button>
                            </form>
                        )}
                        {reviewSubmitted && hasPurchased && <div className="flex items-center gap-2 text-sm text-green-400"><Check className="w-4 h-4" /> Review submitted!</div>}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="glass-card sticky top-28 space-y-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6366f1" }}>{product.category?.replace('_', ' ')}</span>
                            <h1 className="text-2xl font-bold mt-1 leading-snug">{product.title}</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            {product.quality_score > 0 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-black text-indigo-300">{product.quality_score}</span>
                                    <span className="text-[10px] text-white/30 ml-0.5">AI Score</span>
                                </div>
                            )}
                            {product.avg_rating > 0 && (
                                <div className="flex items-center gap-1 text-sm text-white/50">
                                    <Star className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                                    <span className="font-bold text-white">{product.avg_rating?.toFixed(1)}</span>
                                    <span>({product.review_count})</span>
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-white/40 leading-relaxed">{product.description || "No description provided."}</p>

                        {displayMeta.length > 0 && (
                            <div className="space-y-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                {displayMeta.map(([key, val]) => (
                                    <div key={key} className="flex justify-between text-sm">
                                        <span className="text-white/30 capitalize">{key.replace(/_/g, ' ')}</span>
                                        <span className="text-white/70 font-medium">{String(val)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-4 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                                        <User className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">by {product.profiles?.full_name || 'Anonymous'}</p>
                                        <p className="text-[10px] text-white/30 flex items-center gap-1">
                                            <Users className="w-3 h-3" /> {followerCount} followers
                                        </p>
                                    </div>
                                </div>
                                <button onClick={handleFollow} disabled={followLoading}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                    style={{
                                        background: isFollowing ? "rgba(99,102,241,0.1)" : "transparent",
                                        border: `1px solid ${isFollowing ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)"}`,
                                        color: isFollowing ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                                    }}>
                                    {followLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : isFollowing ? <><UserCheck className="w-3.5 h-3.5" /> Following</> : <><UserPlus className="w-3.5 h-3.5" /> Follow</>}
                                </button>
                            </div>
                            <p className="text-[10px] text-white/20">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Listed {new Date(product.created_at).toLocaleDateString()}
                            </p>
                        </div>

                        {tiers.length > 0 && (
                            <div className="pt-4 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Choose License</p>
                                <div className="space-y-2">
                                    {tiers.map((tier, i) => (
                                        <button key={i} type="button" onClick={() => setSelectedTier(tier)}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all"
                                            style={{
                                                background: selectedTier?.name === tier.name ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.02)",
                                                border: `1px solid ${selectedTier?.name === tier.name ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.06)"}`,
                                            }}>
                                            <span className={selectedTier?.name === tier.name ? "text-indigo-300 font-bold" : "text-white/50"}>{tier.name}</span>
                                            <span className="font-black">${tier.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="flex justify-between items-end">
                                <span className="text-white/30 text-sm">
                                    {isPWYW ? 'Suggested price' : tiers.length > 0 && selectedTier ? selectedTier.name : 'Price'}
                                </span>
                                <span className="text-4xl font-black">${displayPrice}</span>
                            </div>
                            {isPWYW && <p className="text-xs text-white/20">Minimum: ${metadata.min_price || '0'}</p>}
                            <button onClick={handleBuy} disabled={buying} className="accent-button w-full py-4 text-base">
                                {buying ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5 mr-2" /> Buy Now</>}
                            </button>
                            <p className="text-[10px] text-center text-white/15 uppercase tracking-widest">Secure 256-bit Encrypted • Instant Delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
