'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { DropZone } from './DropZone'
import { ScanAnimation } from './ScanAnimation'
import { VerificationCard } from './VerificationCard'
import { HiveAnalysisResult } from '@/types/hive'
import { generateVideoThumbnail } from '@/utils/hive/video'

type Phase = 'idle' | 'scanning' | 'complete' | 'error'

export function HiveVerifier() {
    const [phase, setPhase] = useState<Phase>('idle')
    const [result, setResult] = useState<HiveAnalysisResult | null>(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [error, setError] = useState('')

    const handleFile = useCallback(async (file: File) => {
        const isVideo = file.type.startsWith('video/')
        
        if (isVideo) {
            try {
                const thumb = await generateVideoThumbnail(file)
                setPreviewUrl(thumb)
            } catch (e) {
                setPreviewUrl('/placeholder-video.png') // Fallback
            }
        } else {
            setPreviewUrl(URL.createObjectURL(file))
        }

        setPhase('scanning')
        setResult(null)
        setError('')

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/hive/verify', { method: 'POST', body: formData })
            if (!res.ok) throw new Error('Verification failed')

            const data: HiveAnalysisResult = await res.json()
            setResult(data)
        } catch (e: any) {
            setError(e.message || 'Something went wrong')
            setPhase('error')
        }
    }, [])

    const handleScanComplete = useCallback(() => setPhase('complete'), [])

    const handleReset = useCallback(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setPhase('idle')
        setResult(null)
        setPreviewUrl('')
        setError('')
    }, [previewUrl])

    return (
        <div className="w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                {phase === 'idle' && <DropZone key="drop" onFile={handleFile} />}
                {phase === 'scanning' && (
                    <ScanAnimation
                        key="scan"
                        previewUrl={previewUrl}
                        result={result}
                        onComplete={handleScanComplete}
                    />
                )}
                {phase === 'complete' && result && (
                    <VerificationCard
                        key="result"
                        result={result}
                        previewUrl={previewUrl}
                        onReset={handleReset}
                    />
                )}
                {phase === 'error' && (
                    <div key="error" className="text-center py-20">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button onClick={handleReset} className="accent-button px-6 py-3 rounded-xl text-sm">
                            Try Again
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
