import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Wallet, Package, TrendingUp, Clock, Plus, Star, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    const { data: products } = await supabase.from('products').select('*').eq('seller_id', user.id).order('created_at', { ascending: false })
    const { data: royalties } = await supabase.from('royalties').select('*').eq('seller_id', user.id)
    const { data: sales } = await supabase.from('sales').select('product_id').eq('seller_id', user.id)

    const totalEarnings = profile?.earnings_total || 0
    const activeProducts = products?.filter(p => p.status === 'active').length || 0
    const pendingPayout = royalties?.reduce((acc, curr) => acc + (curr.total_earned || 0), 0) || 0

    // Build a sales count map: { product_id: count }
    const salesCountMap: Record<string, number> = {}
    sales?.forEach(s => { salesCountMap[s.product_id] = (salesCountMap[s.product_id] || 0) + 1 })
    const totalSales = sales?.length || 0

    return (
        <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Creator <span className="indigo-gradient">Dashboard</span></h1>
                    <p className="text-white/40 mt-1">Manage your assets and track your royalties.</p>
                </div>
                <Link href="/sell" className="accent-button flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    List New Asset
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <StatCard icon={<Wallet className="w-6 h-6 text-indigo-400" />} label="Total Earnings" value={`$${totalEarnings.toLocaleString()}`} sub="Lifetime revenue" />
                <StatCard icon={<Clock className="w-6 h-6 text-indigo-300" />} label="Pending Payout" value={`$${pendingPayout.toLocaleString()}`} sub="Next payout: Friday" />
                <StatCard icon={<Package className="w-6 h-6 text-indigo-400" />} label="Active Assets" value={activeProducts.toString()} sub="Live in marketplace" />
                <StatCard icon={<TrendingUp className="w-6 h-6 text-indigo-300" />} label="Total Sales" value={totalSales.toString()} sub="All-time purchases" />
            </div>

            {/* Products Table */}
            <div className="glass-card !p-0 overflow-hidden">
                <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="font-bold text-xl">Your Listed Assets</h2>
                    <Link href="/sell" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest font-bold">+ New</Link>
                </div>

                {products && products.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                                    <th className="px-6 py-3 text-[10px] uppercase tracking-widest text-white/30 font-medium">Asset</th>
                                    <th className="px-6 py-3 text-[10px] uppercase tracking-widest text-white/30 font-medium">Category</th>
                                    <th className="px-6 py-3 text-[10px] uppercase tracking-widest text-white/30 font-medium">Price</th>
                                    <th className="px-6 py-3 text-[10px] uppercase tracking-widest text-white/30 font-medium">Score</th>
                                    <th className="px-6 py-3 text-[10px] uppercase tracking-widest text-white/30 font-medium">Sales</th>
                                    <th className="px-6 py-3 text-[10px] uppercase tracking-widest text-white/30 font-medium text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    const thumbUrl = product.preview_urls?.[0] ?? null
                                    const productSales = salesCountMap[product.id] || 0
                                    return (
                                        <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                            <td className="px-6 py-4">
                                                <Link href={`/products/${product.id}`} className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ background: "rgba(255,255,255,0.05)" }}>
                                                        {thumbUrl ? (
                                                            <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/10">
                                                                <Package className="w-4 h-4" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="font-medium group-hover:text-indigo-300 transition-colors">{product.title}</span>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-white/40 capitalize">{product.category?.replace('_', ' ')}</td>
                                            <td className="px-6 py-4 text-sm font-bold">${product.price}</td>
                                            <td className="px-6 py-4">
                                                {product.quality_score > 0 ? (
                                                    <span className="score-badge">{product.quality_score}</span>
                                                ) : (
                                                    <span className="text-xs text-white/20">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-white/50">{productSales}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-tighter"
                                                    style={{
                                                        background: product.status === 'active' ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)",
                                                        color: product.status === 'active' ? "#22c55e" : "rgba(255,255,255,0.3)",
                                                    }}>
                                                    {product.status || 'pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-16 text-center text-white/20">
                        <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No assets listed yet.</p>
                        <Link href="/sell" className="accent-button mt-4 text-sm inline-flex">List Your First Asset</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
    return (
        <div className="glass-card flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                {icon}
            </div>
            <div>
                <p className="text-xs font-medium text-white/40">{label}</p>
                <h3 className="text-3xl font-black tracking-tight">{value}</h3>
                <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">{sub}</p>
            </div>
        </div>
    )
}
