'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import {
    Wallet,
    Package,
    TrendingUp,
    Clock,
    Plus,
    Star,
    ArrowUpRight,
    MoreVertical,
    Edit3,
    Eye,
    Copy,
    Share2,
    DownloadCloud,
    ChevronRight,
    Filter
} from "lucide-react"
import Link from "next/link"
import { WorkspaceInspector } from "@/components/layout/WorkspaceInspector"

export default function DashboardPage() {
    const supabase = createClient()
    const router = useRouter()

    const [profile, setProfile] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [royalties, setRoyalties] = useState<any[]>([])
    const [sales, setSales] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) { router.push('/login'); return }

            const [pRes, prodRes, royRes, salesRes] = await Promise.all([
                supabase.from('profiles').select('*').eq('id', user.id).single(),
                supabase.from('products').select('*').eq('seller_id', user.id).order('created_at', { ascending: false }),
                supabase.from('royalties').select('*').eq('seller_id', user.id),
                supabase.from('sales').select('product_id').eq('seller_id', user.id)
            ])

            setProfile(pRes.data)
            setProducts(prodRes.data || [])
            setRoyalties(royRes.data || [])
            setSales(salesRes.data || [])
            setLoading(false)
        }
        load()
    }, [])

    if (loading) return null

    const totalEarnings = profile?.earnings_total || 0
    const activeProducts = products?.filter(p => p.status === 'active').length || 0
    const pendingPayout = royalties?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0
    const totalSales = sales?.length || 0

    return (
        <div className="flex flex-col gap-10">
            {/* 1. Header Area */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 uppercase tracking-widest">My Studio</h1>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white/30">
                            <Package className="w-3.5 h-3.5" />
                            <span>{products.length} Assets</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white/30">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{totalSales} Sales</span>
                        </div>
                    </div>
                </div>

                <Link href="/sell" className="accent-button !py-3 !px-6 text-[10px] uppercase tracking-widest font-black flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    List New Model
                </Link>
            </div>

            {/* 2. Assets Table (Workspace Style) */}
            <div className="rounded-2xl border border-white/5 bg-[#0F0F0F] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/40">
                        <Filter className="w-3 h-3 text-indigo-500" />
                        <span>All Assets</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Connected to R2</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/20 font-black">Asset Details</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/20 font-black">Price</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/20 font-black">Sales</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/20 font-black">Quality</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/20 font-black text-right">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/[0.01] transition-all group cursor-pointer">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden border border-white/5 shadow-inner">
                                                {product.preview_urls?.[0] ? (
                                                    <img src={product.preview_urls[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/10">
                                                        <Package className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{product.title}</span>
                                                <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">{product.category} &bull; v1.0</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-black text-white/60">${product.price}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5">
                                            <TrendingUp className="w-3 h-3 text-indigo-500" />
                                            <span className="text-sm font-black text-white/80">{product.sales_count || 0}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        {product.quality_score > 0 ? (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/10 w-fit">
                                                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                                                <span className="text-[10px] font-black text-indigo-300">{product.quality_score}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-white/10">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tight ${product.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/30 border border-white/10'}`}>
                                            {product.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 hover:bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <MoreVertical className="w-4 h-4 text-white/30" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <div className="py-24 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-white/10" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Ready to start selling?</h3>
                        <p className="text-sm text-white/20 max-w-xs mb-8">Upload your first AI model or photo dataset to the hive.</p>
                        <Link href="/sell" className="accent-button !py-3 !px-8 text-xs font-black uppercase">Create First Asset</Link>
                    </div>
                )}
            </div>

            {/* DASHBOARD INSPECTOR PORTAL */}
            <WorkspaceInspector>
                <section>
                    <h3 className="inspector-label mb-6">Real-time Analytics</h3>
                    <div className="flex flex-col gap-4">
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Wallet className="w-20 h-20 text-white" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Total Volume</p>
                            <h4 className="text-4xl font-black text-white mb-2">${totalEarnings.toLocaleString()}</h4>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg w-fit">
                                <TrendingUp className="w-3 h-3" />
                                <span>+12.4% this week</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Payouts</p>
                                <p className="text-xl font-black text-white">${pendingPayout.toLocaleString()}</p>
                                <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-2/3" />
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Followers</p>
                                <p className="text-xl font-black text-white">{profile?.follower_count || 0}</p>
                                <p className="text-[9px] font-black text-indigo-400 mt-2 uppercase tracking-tighter">Engagement High</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="inspector-label mb-6">Quick Actions</h3>
                    <div className="flex flex-col gap-2">
                        <ActionButton icon={<Edit3 className="w-4 h-4" />} label="Edit Profile" />
                        <ActionButton icon={<DownloadCloud className="w-4 h-4" />} label="Import Civitai" href="/sell?import=civitai" />
                        <ActionButton icon={<Share2 className="w-4 h-4" />} label="Copy Shop URL" />
                        <ActionButton icon={<Clock className="w-4 h-4" />} label="Payout Settings" />
                    </div>
                </section>
            </WorkspaceInspector>
        </div>
    )
}

function ActionButton({ icon, label, href }: { icon: React.ReactNode, label: string, href?: string }) {
    const content = (
        <div className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 flex items-center gap-4 transition-all group">
            <div className="text-white/30 group-hover:text-indigo-400 transition-colors">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">{label}</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/10 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
        </div>
    )

    if (href) return <Link href={href}>{content}</Link>
    return <button className="w-full text-left">{content}</button>
}
