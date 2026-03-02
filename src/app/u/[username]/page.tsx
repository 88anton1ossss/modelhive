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
    CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"

export default function ProfilePage({ params }: { params: { username: string } }) {
    const supabase = createClient()
    const [profile, setProfile] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            // Since we don't have a username column yet, we'll try to match by ID 
            // OR we fetch by full_name (slugified comparison - simplified here for the demo)
            const { data: prof } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', params.username) // Assuming username is the ID for now
                .single()

            if (prof) {
                setProfile(prof)
                const { data: prods } = await supabase
                    .from('products')
                    .select('*')
                    .eq('seller_id', prof.id)
                    .eq('status', 'active')
                    .order('quality_score', { ascending: false })
                setProducts(prods || [])
            }
            setLoading(false)
        }
        load()
    }, [params.username])

    if (loading) return null
    if (!profile) return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-white/20 font-black uppercase tracking-widest">Creator not found</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            {/* 1. Profile Header / Bio */}
            <header className="max-w-2xl mx-auto pt-20 px-6 pb-12 flex flex-col items-center text-center">
                <div className="relative mb-8">
                    <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-indigo-600 to-purple-600 p-1 shadow-2xl">
                        <div className="w-full h-full rounded-[38px] bg-black flex items-center justify-center overflow-hidden border border-white/10">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />
                            ) : (
                                <span className="text-4xl font-black text-white/20">{profile.full_name?.[0]}</span>
                            )}
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-indigo-500 rounded-full p-2 border-4 border-[#0A0A0A] shadow-xl">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-black tracking-tight mb-2">{profile.full_name}</h1>
                <p className="text-sm text-white/40 mb-8 max-w-sm leading-relaxed">
                    AI Research Artist & Photographer. Creating high-performance LoRAs and datasets for Flux and SDXL.
                </p>

                {/* Social Links / Link-in-bio style */}
                <div className="flex flex-col w-full gap-3 mb-12">
                    <SocialLink icon={<Twitter className="w-4 h-4" />} label="Follow on X" href="#" />
                    <SocialLink icon={<Instagram className="w-4 h-4" />} label="Instagram Portfolio" href="#" />
                    <SocialLink icon={<Globe className="w-4 h-4" />} label="Personal Website" href="#" />
                </div>

                <div className="flex items-center gap-8 text-[10px] uppercase font-black tracking-widest text-white/20">
                    <div className="flex flex-col">
                        <span className="text-white text-lg">{products.length}</span>
                        <span>Assets</span>
                    </div>
                    <div className="h-8 w-px bg-white/5" />
                    <div className="flex flex-col">
                        <span className="text-white text-lg">{profile.follower_count || 0}</span>
                        <span>Collectors</span>
                    </div>
                    <div className="h-8 w-px bg-white/5" />
                    <div className="flex flex-col">
                        <span className="text-white text-lg">9.4</span>
                        <span>Avg Score</span>
                    </div>
                </div>
            </header>

            {/* 2. Shop Grid */}
            <main className="max-w-5xl mx-auto px-6 pb-32">
                <div className="flex items-center gap-2 mb-10 border-b border-white/5 pb-4">
                    <ShoppingBag className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Available For Collection</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="py-20 text-center text-white/10 uppercase tracking-widest font-black text-xs">
                        No active listings
                    </div>
                )}
            </main>

            {/* Branding Footer */}
            <div className="py-12 flex flex-col items-center gap-4 bg-white/[0.02] border-t border-white/5">
                <Link href="/" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-white" fill="white" />
                    </div>
                    <span className="text-sm font-bold indigo-gradient tracking-tight">ModelHive</span>
                </Link>
                <p className="text-[10px] text-white/10 font-black uppercase tracking-widest">Create your own shop in seconds</p>
            </div>
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
