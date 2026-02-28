"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle2, AlertCircle, Camera, Layers, Zap, Code, ChevronRight, Loader2, ExternalLink, Info } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const CATEGORY_META: Record<string, any> = {
    photo_dataset: {
        title: "Photo Dataset",
        icon: <Camera className="w-5 h-5" style={{ color: "#6366f1" }} />,
        color: "#6366f1",
        fields: [
            { name: "photo_count", label: "Photo Count", type: "number", placeholder: "e.g. 500" },
            { name: "resolution", label: "Resolution", type: "text", placeholder: "e.g. 1024×1024" },
            { name: "license_type", label: "License Type", type: "select", options: ["CC0", "CC-BY", "CC-BY-SA", "Commercial", "Custom"] },
            { name: "exif_included", label: "EXIF Data Included", type: "select", options: ["Yes", "No"] },
        ]
    },
    ai_model: {
        title: "AI Model / LoRA",
        icon: <Layers className="w-5 h-5" style={{ color: "#6366f1" }} />,
        color: "#6366f1",
        fields: [
            { name: "base_model", label: "Base Model", type: "select", options: ["Flux Dev", "Flux Schnell", "SDXL", "SD 3.5", "SD 1.5", "Pony Diffusion", "Other"] },
            { name: "trigger_word", label: "Trigger Word", type: "text", placeholder: "e.g. ohwx person" },
            { name: "recommended_settings", label: "Recommended Settings", type: "text", placeholder: "e.g. CFG 7, Steps 30, Sampler DPM++" },
            { name: "license_type", label: "License Type", type: "select", options: ["CC0", "CC-BY", "CC-BY-SA", "Commercial", "Custom"] },
            { name: "nsfw_flag", label: "Contains NSFW Content", type: "select", options: ["No", "Mild", "Explicit"] },
        ]
    },
    preset: {
        title: "Preset Pack",
        icon: <Zap className="w-5 h-5" style={{ color: "#6366f1" }} />,
        color: "#6366f1",
        fields: [
            { name: "compatible_app", label: "Compatible App", type: "select", options: ["Lightroom", "Capture One", "Darktable", "Photoshop", "Other"] },
            { name: "style_tags", label: "Style Tags", type: "text", placeholder: "e.g. cinematic, moody, portrait" },
            { name: "preset_count", label: "Preset Count", type: "number", placeholder: "e.g. 20" },
        ]
    },
    prompt: {
        title: "AI Prompt",
        icon: <Code className="w-5 h-5" style={{ color: "#6366f1" }} />,
        color: "#6366f1",
        fields: [
            { name: "ai_tool", label: "AI Tool", type: "select", options: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Sora", "GPT-4", "Claude", "Other"] },
            { name: "style", label: "Style / Theme", type: "text", placeholder: "e.g. photorealistic, anime, illustration" },
            { name: "example_outputs", label: "Example Output URLs", type: "text", placeholder: "Comma-separated image URLs" },
        ]
    },
}

export default function SellPage() {
    const searchParams = useSearchParams()
    const isImportMode = searchParams.get('import') === 'civitai'
    const [step, setStep] = useState(isImportMode ? 0 : 1) // 0 = Civitai import
    const [civitaiUrl, setCivitaiUrl] = useState("")
    const [civitaiLoading, setCivitaiLoading] = useState(false)
    const [category, setCategory] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [nsfw, setNsfw] = useState(false)
    const [nsfwAgeConfirmed, setNsfwAgeConfirmed] = useState(false)
    const router = useRouter()

    const catMeta = category ? CATEGORY_META[category] : null

    const handleCivitaiImport = async () => {
        if (!civitaiUrl) return
        setCivitaiLoading(true)
        await new Promise(r => setTimeout(r, 1500)) // Simulated API call
        setCivitaiLoading(false)
        setStep(1)
    }

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !category) return
        if (nsfw && !nsfwAgeConfirmed) return

        setLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('file', file)
        formData.append('category', category)
        const metadata: Record<string, any> = {}
        catMeta?.fields.forEach((f: any) => { metadata[f.name] = formData.get(f.name) })
        formData.append('metadata', JSON.stringify(metadata))

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData })
            const data = await res.json()
            if (data.success) {
                setStatus('success')
                setTimeout(() => router.push('/dashboard'), 2000)
            } else setStatus('error')
        } catch { setStatus('error') }
        finally { setLoading(false) }
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center py-20 px-6">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold indigo-gradient mb-2">
                        {step === 0 ? 'Import from Civitai' : step === 1 ? 'Choose Asset Type' : `Upload ${catMeta?.title}`}
                    </h1>
                    <p className="text-white/40">Securely list your AI assets. Keep up to 90% of every sale.</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 0: Civitai Import */}
                    {step === 0 && (
                        <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="glass-card space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
                                    <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-indigo-300 mb-1">Earn 75% here vs 0% on Civitai</p>
                                        <p className="text-xs text-white/40">Paste your Civitai profile URL and we'll auto-fill your model metadata (title, description, tags, trigger words) so you can list in seconds.</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60">Your Civitai Profile or Model URL</label>
                                    <div className="flex gap-3">
                                        <input
                                            className="flex-1 bg-white/5 border rounded-xl px-4 py-3 focus:outline-none transition-all text-sm"
                                            style={{ borderColor: "rgba(255,255,255,0.08)" }}
                                            placeholder="https://civitai.com/models/123456"
                                            value={civitaiUrl}
                                            onChange={(e) => setCivitaiUrl(e.target.value)}
                                        />
                                        <button onClick={handleCivitaiImport} disabled={civitaiLoading || !civitaiUrl} className="accent-button !px-5 text-sm">
                                            {civitaiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Import'}
                                        </button>
                                    </div>
                                    <a href="https://civitai.com" target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs text-white/20 hover:text-white/40 transition-colors">
                                        <ExternalLink className="w-3 h-3" />
                                        What is Civitai?
                                    </a>
                                </div>
                                <button onClick={() => setStep(1)} className="w-full py-3 text-sm text-white/30 hover:text-white/60 transition-colors">
                                    Skip · List manually instead
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 1: Category */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(CATEGORY_META).map(([id, cat]) => (
                                <div key={id} onClick={() => { setCategory(id); setStep(2) }}
                                    className="glass-card flex items-center gap-4 cursor-pointer group hover:!border-indigo-500/50 transition-all">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                                        style={{ background: "rgba(99,102,241,0.1)" }}>
                                        {cat.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg">{cat.title}</h3>
                                        <p className="text-xs text-white/30">{cat.fields.length} required fields</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Step 2: Upload Form */}
                    {step === 2 && catMeta && (
                        <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleUpload} className="glass-card space-y-8">

                            {/* Base fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60">Title</label>
                                    <input name="title" required className="w-full bg-white/5 border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm"
                                        style={{ borderColor: "rgba(255,255,255,0.08)" }} placeholder="e.g. Cinematic Portrait LoRA v2" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60">Price (USD)</label>
                                    <input name="price" type="number" step="0.01" min="0" required className="w-full bg-white/5 border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm"
                                        style={{ borderColor: "rgba(255,255,255,0.08)" }} placeholder="e.g. 9.99" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-white/60">Description</label>
                                    <textarea name="description" rows={3} className="w-full bg-white/5 border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                                        style={{ borderColor: "rgba(255,255,255,0.08)" }} placeholder="Describe your asset..." />
                                </div>
                            </div>

                            {/* Category-specific fields */}
                            <div className="pt-4 space-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">{catMeta.title} Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {catMeta.fields.map((field: any) => (
                                        <div key={field.name} className="space-y-2">
                                            <label className="text-sm font-medium text-white/60 capitalize">{field.label}</label>
                                            {field.type === 'select' ? (
                                                <select name={field.name} className="w-full bg-white/5 border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm"
                                                    style={{ borderColor: "rgba(255,255,255,0.08)", background: "#1a1a1a" }}
                                                    onChange={field.name === 'nsfw_flag' ? (e) => setNsfw(e.target.value !== 'No') : undefined}>
                                                    {field.options.map((o: string) => <option key={o} value={o} className="bg-neutral-900">{o}</option>)}
                                                </select>
                                            ) : (
                                                <input name={field.name} type={field.type} className="w-full bg-white/5 border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm"
                                                    style={{ borderColor: "rgba(255,255,255,0.08)" }} placeholder={field.placeholder} />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* NSFW Age Gate */}
                                {nsfw && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
                                        <input type="checkbox" id="ageGate" checked={nsfwAgeConfirmed} onChange={(e) => setNsfwAgeConfirmed(e.target.checked)} className="w-4 h-4 accent-[#6366f1] cursor-pointer" />
                                        <label htmlFor="ageGate" className="text-xs text-red-300 cursor-pointer">
                                            I confirm this content is intended for adults (18+) only and complies with ModelHive's content policy.
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* File Drop Zone */}
                            <div className="relative rounded-2xl transition-all cursor-pointer" style={{ border: file ? "2px solid rgba(99,102,241,0.5)" : "2px dashed rgba(255,255,255,0.08)" }}>
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    {file ? (
                                        <div>
                                            <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: "#6366f1" }} />
                                            <p className="font-bold">{file.name}</p>
                                            <p className="text-xs text-white/30 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                            <button type="button" onClick={() => setFile(null)} className="mt-3 text-xs text-red-400 hover:underline">Remove</button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 text-white/15 mb-4" />
                                            <p className="font-bold text-sm">Drop your master file here</p>
                                            <p className="text-xs text-white/25 mt-1">ZIP, safetensors, ckpt, jpg, png — Max 2GB</p>
                                            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 items-center">
                                <button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border text-sm font-medium hover:bg-white/5 transition-all"
                                    style={{ borderColor: "rgba(255,255,255,0.1)" }}>← Back</button>
                                <button disabled={loading || !file || (nsfw && !nsfwAgeConfirmed)} type="submit" className="accent-button flex-grow">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit to Hive'}
                                </button>
                            </div>

                            {status === 'success' && (
                                <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                                    <CheckCircle2 className="w-5 h-5" /><span>Asset listed! AI quality scoring in progress…</span>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                                    <AlertCircle className="w-5 h-5" /><span>Upload failed. Check your connection and try again.</span>
                                </div>
                            )}
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
