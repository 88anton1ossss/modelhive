"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Download, ExternalLink, Loader2, PartyPopper } from "lucide-react"
import confetti from "canvas-confetti"

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (sessionId) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#EAB308', '#FACC15', '#FFFFFF']
            })

            // Fetch the download link
            fetch(`/api/download?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.url) setDownloadUrl(data.url)
                })
                .finally(() => setLoading(false))
        }
    }, [sessionId])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="glass-card max-w-lg w-full space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto border border-yellow-500/20">
                    <PartyPopper className="w-10 h-10 text-yellow-500" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">Vault Access Granted</h1>
                    <p className="text-white/40 text-sm italic">You have successfully acquired a PixelVault asset.</p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center gap-2 text-white/40 italic">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating your secure link...
                    </div>
                ) : (
                    <div className="space-y-4">
                        {downloadUrl ? (
                            <a
                                href={downloadUrl}
                                className="gold-button w-full flex items-center gap-2 py-4"
                            >
                                <Download className="w-5 h-5" />
                                Download Master File
                            </a>
                        ) : (
                            <p className="text-red-400 text-sm">Failed to generate link. Please contact support.</p>
                        )}
                        <p className="text-[10px] text-white/20 uppercase tracking-widest">Signed Link Expires in 24 Hours</p>
                    </div>
                )}

                <div className="pt-6 border-t border-white/5">
                    <a href="/marketplace" className="text-xs text-white/40 hover:text-white transition-colors flex items-center justify-center gap-1">
                        Browse More Assets
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    )
}
