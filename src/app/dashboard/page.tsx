import { createClient } from "@/utils/supabase/server"
import { Wallet, Package, TrendingUp, Clock, ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return <div>Unauthorized</div>

    // Fetch Stats
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    const { data: products } = await supabase.from('products').select('*').eq('seller_id', user.id)
    const { data: royalties } = await supabase.from('royalties').select('*').eq('seller_id', user.id)

    const totalEarnings = profile?.earnings_total || 0
    const activeProducts = products?.filter(p => p.status === 'active').length || 0
    const pendingPayout = royalties?.reduce((acc, curr) => acc + (curr.total_earned || 0), 0) || 0

    return (
        <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Seller <span className="gold-gradient">Vault</span></h1>
                    <p className="text-white/40">Manage your assets and track your creative royalties.</p>
                </div>
                <Link href="/sell" className="gold-button flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    List New Asset
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={<Wallet className="w-6 h-6 text-yellow-400" />}
                    label="Total Earnings"
                    value={`$${totalEarnings.toLocaleString()}`}
                    sub="Lifetime creative revenue"
                />
                <StatCard
                    icon={<Clock className="w-6 h-6 text-amber-500" />}
                    label="Pending Payout"
                    value={`$${pendingPayout.toLocaleString()}`}
                    sub="Next payout: Friday"
                />
                <StatCard
                    icon={<Package className="w-6 h-6 text-yellow-500" />}
                    label="Active Assets"
                    value={activeProducts.toString()}
                    sub="Live in the marketplace"
                />
            </div>

            {/* Products Table */}
            <div className="glass-card overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <h2 className="font-bold text-xl">Your Vaulted Assets</h2>
                    <button className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest font-bold">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/2 text-[10px] uppercase tracking-widest text-white/30">
                                <th className="px-6 py-4 font-medium">Asset</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Score</th>
                                <th className="px-6 py-4 font-medium">Sales</th>
                                <th className="px-6 py-4 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products?.map((product) => (
                                <tr key={product.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden">
                                                <img src={product.preview_urls[0]} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-medium group-hover:text-yellow-400 transition-colors">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white/50 capitalize">{product.category.replace('_', ' ')}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">${product.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-yellow-500">
                                            {product.quality_score}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white/50">0</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-bold text-green-500 uppercase tracking-tighter">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
    return (
        <div className="glass-card flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-white/40">{label}</p>
                <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
                <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">{sub}</p>
            </div>
        </div>
    )
}
