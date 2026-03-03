'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import {
    Zap,
    MapPin,
    Link as LinkIcon,
    Twitter,
    Instagram,
    Github,
    Globe,
    ArrowUpRight,
    ShoppingBag,
    Star,
    ShieldCheck,
    CheckCircle2,
    Plus
} from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { cn } from "@/utils/cn"

export default function ProfilePage({ params }: { params: { username: string } }) {
    const supabase = createClient()
    const [profile, setProfile] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followerCount, setFollowerCount] = useState(0)

    useEffect(() => {
        async function load() {
            // 1. Try fetching by username
            let { data: prof, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('username', params.username)
                .maybeSingle()

            // 2. Fallback to ID if username not found (UUID check)
            if (!prof && params.username.length === 36) {
                const { data: profById } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', params.username)
                    .maybeSingle()
                prof = profById
            }

            if (prof) {
                setProfile(prof)
                setFollowerCount(prof.follower_count || 0)

                const { data: prods } = await supabase
                    .from('products')
                    .select('*, seller_profile:profiles(*)')
                    .eq('seller_id', prof.id)
                    .eq('status', 'active')
                    .order('quality_score', { ascending: false })
                setProducts(prods || [])

                // Check following status (only if user is logged in)
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    const { data: follow } = await supabase
                        .from('follows')
                        .select('*')
                        .eq('follower_id', user.id)
                        .eq('following_id', prof.id)
                        .maybeSingle()
                    setIsFollowing(!!follow)
                }
            }
            setLoading(false)
        }
        load()
    }, [params.username])

    const handleFollow = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return // Redirect to login in real app

        setIsFollowing(!isFollowing) // Optimistic UI
        setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1)

        try {
            if (isFollowing) {
                await supabase.from('follows').delete().eq('follower_id', user.id).eq('following_id', profile.id)
            } else {
                await supabase.from('follows').insert({ follower_id: user.id, following_id: profile.id })
            }
        } catch (e) {
            // Revert on error
            setIsFollowing(isFollowing)
            setFollowerCount(prev => isFollowing ? prev + 1 : prev - 1)
        }
    }

    if (loading) return null
    if (!profile) return (
        <div className="h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-indigo-500 animate-spin" />
                <p className="text-sm font-black uppercase tracking-[0.3em] text-white/20">Establishing connection...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#060606] text-white font-sans selection:bg-indigo-500/30">
            {/* 1. Header with Gradient Background */}
            <header className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

                <div className="max-w-2xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="relative mb-8 group">
                        <div className="w-36 h-36 rounded-[48px] p-1.5 bg-gradient-to-br from-white/10 to-transparent">
                            <div className="w-full h-full rounded-[42px] bg-black overflow-hidden relative border border-white/5 shadow-2xl">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                                        <span className="text-5xl font-black text-white/10 uppercase">{profile.full_name?.[0]}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {profile.role === 'seller' && (
                            <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-2 border-4 border-[#060606] shadow-xl">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl font-black tracking-tight mb-3 text-white">
                        {profile.full_name}
                    </h1>
                    <p className="text-sm text-indigo-400 font-bold tracking-[0.2em] uppercase mb-6">
                        @{profile.username || 'creator'}
                    </p>

                    <p className="text-base text-white/50 mb-10 max-w-md leading-relaxed font-medium">
                        {profile.bio || "Digital artist pushing the boundaries of generative AI and synthetic media. Explore my latest models and datasets."}
                    </p>

                    <div className="flex items-center gap-4 mb-12">
                        <button
                            onClick={handleFollow}
                            className={cn(
                                "px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                                isFollowing
                                    ? "bg-white/5 text-white/40 border border-white/5 hover:bg-white/10"
                                    : "bg-white text-black hover:bg-indigo-400 hover:text-white shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
                            )}
                        >
                            {isFollowing ? 'Following' : 'Follow Creator'}
                        </button>
                        <button className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-12 pt-8 border-t border-white/5 w-full justify-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-white">{products.length}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Assets</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-white">{followerCount}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Followers</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-white">{profile.quality_score || '9.2'}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Trust Score</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Link-in-Bio Social Section */}
            <section className="max-w-xl mx-auto px-6 mb-24 grid grid-cols-1 gap-3">
                <SocialLink icon={<Twitter className="w-4 h-4" />} label="X.COM / TWITTER" href="#" />
                <SocialLink icon={<Instagram className="w-4 h-4" />} label="INSTAGRAM REELS" href="#" />
                <SocialLink icon={<Globe className="w-4 h-4" />} label="PERSONAL LABORATORY" href="#" />
            </section>

            {/* 3. Assets Section */}
            <main className="max-w-6xl mx-auto px-6 pb-40">
                <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30">Creator Collections</h2>
                    </div>
                    <Link href="/marketplace" className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
                        View Marketplace →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="py-32 flex flex-col items-center gap-6 opacity-20">
                        <ShoppingBag className="w-12 h-12 stroke-[1]" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">No listings discovered yet</p>
                    </div>
                )}
            </main>

            {/* Premium Footer Branding */}
            <footer className="py-16 bg-white/[0.01] border-t border-white/5 flex flex-col items-center text-center px-6">
                <div className="flex items-center gap-3 mb-6 opacity-30">
                    <Zap className="w-5 h-5 text-white" fill="white" />
                    <span className="text-xl font-black tracking-tighter">ModelHive</span>
                </div>
                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] max-w-xs leading-loose">
                    The Decentralized Marketplace for Hyper-Realistic Synthetic Assets
                </p>
            </footer>
        </div>
    )
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 hover:bg-white/5 hover:border-white/20 transition-all group"
        >
            <div className="text-white/20 group-hover:text-indigo-400 transition-colors">{icon}</div>
            <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{label}</span>
            <ArrowUpRight className="w-4 h-4 ml-auto text-white/10 group-hover:text-white transition-all" />
        </a>
    )
}
