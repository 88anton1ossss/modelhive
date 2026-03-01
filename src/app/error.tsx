"use client"

import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="text-2xl font-bold">Something went wrong</h1>
                <p className="text-white/40 text-sm leading-relaxed">
                    We hit an unexpected error. This is usually temporary — try refreshing or head back to the marketplace.
                </p>
                <div className="flex justify-center gap-3">
                    <button onClick={reset}
                        className="accent-button !py-2.5 !px-5 text-sm flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    <Link href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                        style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Home className="w-4 h-4" /> Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
