import { createClient } from "@/utils/supabase/server"
import { Star, ShieldCheck, Download, ShoppingCart, User, Calendar } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { data: product } = await supabase
        .from('products')
        .select('*, profiles(full_name, avatar_url), reviews(*, profiles(full_name))')
        .eq('id', params.id)
        .single()

    if (!product) notFound()

    return (
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Gallery & Previews */}
            <div className="lg:col-span-2 space-y-6">
                <div className="glass-card p-2 rounded-3xl overflow-hidden aspect-video bg-white/2 flex items-center justify-center">
                    <img src={product.preview_urls[0]} alt={product.title} className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                    {product.preview_urls.map((url: string, i: number) => (
                        <div key={i} className="aspect-square glass-card p-1 rounded-xl cursor-pointer hover:border-yellow-500/50 transition-all">
                            <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                    ))}
                </div>

                {/* Reviews Section */}
                <div className="pt-12 space-y-8">
                    <h2 className="text-2xl font-bold">Buyer Reviews</h2>
                    <div className="space-y-6">
                        {product.reviews?.length > 0 ? product.reviews.map((review: any) => (
                            <div key={review.id} className="glass-card !p-4 flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-sm">{review.profiles?.full_name}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/50">{review.comment}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-white/20 italic text-sm">No reviews yet. Be the first to rate!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Sidebar Purchase */}
            <div className="space-y-6">
                <div className="glass-card sticky top-32 space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">{product.category.replace('_', ' ')}</span>
                            <h1 className="text-3xl font-bold mt-1">{product.title}</h1>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-xl flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-black text-yellow-400">{product.quality_score}</span>
                        </div>
                    </div>

                    <p className="text-white/40 text-sm leading-relaxed">{product.description || "No description provided."}</p>

                    <div className="space-y-3 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-white/30" />
                            <span className="text-sm text-white/60">Seller: <span className="font-bold text-white">{product.profiles?.full_name}</span></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-white/30" />
                            <span className="text-sm text-white/60">Released: {new Date(product.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="pt-8 space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-white/40 text-sm">Asset Valuation</span>
                            <span className="text-4xl font-black text-white">${product.price}</span>
                        </div>
                        <button className="gold-button w-full flex items-center gap-2 py-4">
                            <ShoppingCart className="w-5 h-5" />
                            Acquire from Vault
                        </button>
                        <p className="text-[10px] text-center text-white/20 uppercase tracking-widest">Secure 256-bit Encrypted Transaction</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
