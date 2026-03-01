"use client"

import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, User, Store, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Role = 'buyer' | 'seller' | 'both'

export default function SignupPage() {
    const supabase = createClient()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPw, setShowPw] = useState(false)
    const [role, setRole] = useState<Role>('buyer')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const { data, error: signupErr } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { role },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            }
        })

        if (signupErr) { setError(signupErr.message); setLoading(false); return }

        // If seller or both, redirect to Stripe Connect onboarding after confirm
        if (role === 'seller' || role === 'both') {
            setSuccess(true)
            setLoading(false)
            return
        }

        setSuccess(true)
        setLoading(false)
    }

    const handleGoogleSignup = async () => {
        setGoogleLoading(true)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        })
    }

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="max-w-md text-center space-y-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto" style={{ background: "rgba(34,197,94,0.1)" }}>
                        <Mail className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold">Check your email</h1>
                    <p className="text-white/40 text-sm">We sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to activate your account.</p>
                    {(role === 'seller' || role === 'both') && (
                        <div className="glass-card text-left space-y-3">
                            <h3 className="font-bold text-sm flex items-center gap-2"><Store className="w-4 h-4 text-indigo-400" /> Seller Setup</h3>
                            <p className="text-xs text-white/40">After confirming your email, you'll be guided through Stripe Connect onboarding so you can receive payouts.</p>
                        </div>
                    )}
                    <Link href="/login" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">← Back to Login</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold indigo-gradient">Create your account</h1>
                    <p className="text-white/40 mt-2 text-sm">Join 10,000+ creators on ModelHive</p>
                </div>

                {/* Google */}
                <button onClick={handleGoogleSignup} disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-medium text-sm transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </>
                    )}
                </button>

                <div className="flex items-center gap-4">
                    <div className="flex-grow h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">or email</span>
                    <div className="flex-grow h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>

                {/* Role Selector */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-white/50">I want to</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { id: 'buyer' as Role, icon: <User className="w-5 h-5" />, label: 'Buy' },
                            { id: 'seller' as Role, icon: <Store className="w-5 h-5" />, label: 'Sell' },
                            { id: 'both' as Role, icon: <Users className="w-5 h-5" />, label: 'Both' },
                        ].map(r => (
                            <button key={r.id} type="button" onClick={() => setRole(r.id)}
                                className="flex flex-col items-center gap-2 py-4 rounded-xl text-sm font-medium transition-all"
                                style={{
                                    background: role === r.id ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${role === r.id ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.06)"}`,
                                    color: role === r.id ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                                }}>
                                {r.icon}
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Seller prompt */}
                {(role === 'seller' || role === 'both') && (
                    <div className="flex items-start gap-3 p-4 rounded-xl text-xs" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                        <Store className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <p className="text-white/50">
                            As a seller, you'll set up <strong className="text-white">Stripe Connect</strong> after email confirmation. This lets us send your earnings directly to your bank — weekly, automatically.
                        </p>
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/50">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                className="w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500 transition-all"
                                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                                placeholder="you@example.com" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/50">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                                className="w-full bg-white/5 border rounded-xl pl-11 pr-12 py-3 text-sm outline-none focus:border-indigo-500 transition-all"
                                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                                placeholder="At least 6 characters" />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-xs">{error}</p>}

                    <button type="submit" disabled={loading} className="accent-button w-full py-3.5">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="ml-2 w-4 h-4" /></>}
                    </button>
                </form>

                <p className="text-center text-sm text-white/30">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign in</Link>
                </p>
            </div>
        </div>
    )
}
