"use client"

import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { Star, ShieldCheck, User, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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

    // Review form state
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [submittingReview, setSubmittingReview] = useState(false)
    const [reviewSubmitted, setReviewSubmitted] = useState(false)

    useEffect(() => {
        async function load() {
            // Fetch product + seller profile
            const { data: prod } = await supabase
                .from('products')
                .select('*, profiles(full_name, avatar_url)')
                .eq('id', params.id)
                .single()

            if (!prod) { router.push('/marketplace'); return }
            setProduct(prod)

            // Fetch reviews with reviewer names
            const { data: revs } = await supabase
                .from('reviews')
                .select('*, profiles(full_name)')
                .eq('product_id', params.id)
                .order('created_at', { ascending: false })
            setReviews(revs || [])

            // Check auth + purchase status
            const { data: { user: u } } = await supabase.auth.getUser()
            setUser(u)
            if (u) {
                const { data: sale } = await supabase
                    .from('sales')
                    .select('id')
                    .eq('product_id', params.id)
                    .eq('buyer_id', u.id)
                    .limit(1)
                    .maybeSingle()
                setHasPurchased(!!sale)

                // Check if already reviewed
                const { data: existingReview } = await supabase
                    .from('reviews')
                    .select('id')
                    .eq('product_id', params.id)
                    .eq('reviewer_id', u.id)
                    .maybeSingle()
                if (existingReview) setReviewSubmitted(true)
            }

            setLoading(false)
        }
        load()
    }, [params.id])

    const handleBuy = async () => {
        if (!user) { router.push('/login'); return }
        setBuying(true)
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id }),
            })
            const data = await res.json()
            if (data.sessionId) {
                const { loadStripe } = await import('@stripe/stripe-js')
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
                await stripe?.redirectToCheckout({ sessionId: data.sessionId })
            }
        } catch (err) { console.error(err) }
        finally { setBuying(false) }
    }

    const handleReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !product) return
        setSubmittingReview(true)
        try {
            await supabase.from('reviews').insert({
                product_id: product.id,
                reviewer_id: user.id,
                rating,
                comment,
            })
            // Re-fetch reviews
            const { data: revs } = await supabase
                .from('reviews')
                .select('*, profiles(full_name)')
                .eq('product_id', params.id)
                .order('created_at', { ascending: false })
            setReviews(revs || [])
            setReviewSubmitted(true)
        } catch (err) { console.error(err) }
        finally { setSubmittingReview(false) }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            </div>
        )
    }

    if (!product) return null

    const previews: string[] = product.preview_urls || []
    const metadata = product.metadata || {}

    return (
        <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto">
            <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors mb-8">
                <ChevronLeft className="w-4 h-4" /> Back to Marketplace
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Left: Gallery (3 cols) */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Main preview */}
                    <div className="glass-card !p-2 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                        {previews[activePreview] ? (
                            <img src={previews[activePreview]} alt={product.title} className="w-full h-full object-contain rounded-xl" />
                        ) : (
                            <div className="text-white/10 text-lg">No preview available</div>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {previews.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {previews.map((url: string, i: number) => (
                                <button key={i} onClick={() => setActivePreview(i)}
                                    className="shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all"
                                    style={{
                                        border: i === activePreview ? "2px solid #6366f1" : "2px solid rgba(255,255,255,0.06)",
                                        opacity: i === activePreview ? 1 : 0.5,
                                    }}>
                                    <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Reviews Section */}
                    <div className="pt-8 space-y-6">
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
                                                    {[1, 2, 3, 4, 5].map(s => (
                                                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-indigo-400 fill-indigo-400' : 'text-white/10'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-white/50 leading-relaxed">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white/20 text-sm italic">No reviews yet. Be the first!</p>
                        )}

                        {/* Leave a review form — only for buyers who purchased */}
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
                                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                                    placeholder="Share your experience with this asset..." />
                                <button type="submit" disabled={submittingReview || !comment.trim()} className="accent-button text-sm">
                                    {submittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Review'}
                                </button>
                            </form>
                        )}
                        {reviewSubmitted && hasPurchased && (
                            <div className="flex items-center gap-2 text-sm text-green-400">
                                <Check className="w-4 h-4" /> Your review has been submitted!
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Purchase sidebar (2 cols) */}
                <div className="lg:col-span-2">
                    <div className="glass-card sticky top-28 space-y-6">
                        {/* Category + Title */}
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6366f1" }}>
                                {product.category?.replace('_', ' ')}
                            </span>
                            <h1 className="text-2xl font-bold mt-1 leading-snug">{product.title}</h1>
                        </div>

                        {/* Quality + Rating badges */}
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

                        {/* Description */}
                        <p className="text-sm text-white/40 leading-relaxed">{product.description || "No description provided."}</p>

                        {/* Metadata details */}
                        {Object.keys(metadata).length > 0 && (
                            <div className="space-y-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                {Object.entries(metadata).map(([key, val]) => (
                                    <div key={key} className="flex justify-between text-sm">
                                        <span className="text-white/30 capitalize">{key.replace(/_/g, ' ')}</span>
                                        <span className="text-white/70 font-medium">{String(val)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Seller */}
                        <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                                <User className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">by {product.profiles?.full_name || 'Anonymous'}</p>
                                <p className="text-[10px] text-white/30">
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    Listed {new Date(product.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Price + Buy */}
                        <div className="space-y-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="flex justify-between items-end">
                                <span className="text-white/30 text-sm">Price</span>
                                <span className="text-4xl font-black">${product.price}</span>
                            </div>
                            <button onClick={handleBuy} disabled={buying}
                                className="accent-button w-full py-4 text-base">
                                {buying ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <><ShoppingCart className="w-5 h-5 mr-2" /> Buy Now</>
                                )}
                            </button>
                            <p className="text-[10px] text-center text-white/15 uppercase tracking-widest">Secure 256-bit Encrypted • Instant Delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
