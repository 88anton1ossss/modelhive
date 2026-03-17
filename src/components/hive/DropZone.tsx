'use client'

import { useCallback, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'

interface DropZoneProps {
    onFile: (file: File) => void
}

export function DropZone({ onFile }: DropZoneProps) {
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback(() => setIsDragging(false), [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            onFile(file)
        }
    }, [onFile])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) onFile(file)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative cursor-pointer group rounded-3xl border-2 border-dashed transition-all duration-500 overflow-hidden ${isDragging
                    ? 'border-violet-400 bg-violet-500/10 scale-[1.02]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
            >
                {/* Glow */}
                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-violet-500/20 blur-xl" />
                </div>

                {/* Hex pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                <div className="relative z-10 flex flex-col items-center justify-center py-24 px-8">
                    <motion.div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${isDragging
                            ? 'bg-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.3)]'
                            : 'bg-white/5 group-hover:bg-white/10'
                            }`}
                        animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <Upload className={`w-8 h-8 transition-colors ${isDragging ? 'text-violet-400' : 'text-white/40'}`} />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2 text-white/90">
                        {isDragging ? 'Release to Verify' : 'Drop your media here'}
                    </h3>
                    <p className="text-sm text-white/30 mb-8 text-center max-w-sm">
                        Instantly verify if an image or video is authentic or AI-generated
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {['JPG', 'PNG', 'WEBP', 'HEIC', 'MP4', 'MOV'].map(f => (
                            <span key={f} className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/20">{f}</span>
                        ))}
                    </div>

                    <p className="text-xs text-white/20">
                        or <span className="text-violet-400">browse files</span>
                    </p>
                </div>

                <input ref={inputRef} type="file" accept="image/*,video/*" onChange={handleChange} className="hidden" />
            </div>
        </motion.div>
    )
}
