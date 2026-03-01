"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle2, AlertCircle, Camera, Layers, Zap, Code, ChevronRight, Loader2, ExternalLink, Info, Plus, Trash2, DollarSign, ToggleLeft, ToggleRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const INPUT_STYLE = "w-full bg-white/5 border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm"
const BORDER = { borderColor: "rgba(255,255,255,0.08)" }

const CATEGORY_META: Record<string, any> = {
    photo_dataset: {
        title: "Photo Dataset", icon: <Camera className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "photo_count", label: "Photo Count", type: "number", placeholder: "e.g. 500" },
            { name: "resolution", label: "Resolution", type: "text", placeholder: "e.g. 1024×1024" },
            { name: "license_type", label: "License Type", type: "select", options: ["CC0", "CC-BY", "CC-BY-SA", "Commercial", "Custom"] },
            { name: "exif_included", label: "EXIF Data Included", type: "select", options: ["Yes", "No"] },
        ]
    },
    ai_model: {
        title: "AI Model / LoRA", icon: <Layers className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "base_model", label: "Base Model", type: "select", options: ["Flux Dev", "Flux Schnell", "SDXL", "SD 3.5", "SD 1.5", "Pony Diffusion", "Other"] },
            { name: "trigger_word", label: "Trigger Word", type: "text", placeholder: "e.g. ohwx person" },
            { name: "recommended_settings", label: "Recommended Settings", type: "text", placeholder: "e.g. CFG 7, Steps 30, Sampler DPM++" },
            { name: "license_type", label: "License Type", type: "select", options: ["CC0", "CC-BY", "CC-BY-SA", "Commercial", "Custom"] },
            { name: "nsfw_flag", label: "Contains NSFW Content", type: "select", options: ["No", "Mild", "Explicit"] },
        ]
    },
    preset: {
        title: "Preset Pack", icon: <Zap className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "compatible_app", label: "Compatible App", type: "select", options: ["Lightroom", "Capture One", "Darktable", "Photoshop", "Other"] },
            { name: "style_tags", label: "Style Tags", type: "text", placeholder: "e.g. cinematic, moody, portrait" },
            { name: "preset_count", label: "Preset Count", type: "number", placeholder: "e.g. 20" },
        ]
    },
    prompt: {
        title: "AI Prompt", icon: <Code className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "ai_tool", label: "AI Tool", type: "select", options: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Sora", "GPT-4", "Claude", "Other"] },
            { name: "style", label: "Style / Theme", type: "text", placeholder: "e.g. photorealistic, anime, illustration" },
            { name: "example_outputs", label: "Example Output URLs", type: "text", placeholder: "Comma-separated image URLs" },
        ]
    },
}

type Tier = { name: string; price: string }

export default function SellPage() {
    const searchParams = useSearchParams()
    const isImportMode = searchParams.get('import') === 'civitai'
    const [step, setStep] = useState(isImportMode ? 0 : 1)
    const [civitaiUrl, setCivitaiUrl] = useState("")
    const [civitaiLoading, setCivitaiLoading] = useState(false)
    const [civitaiModels, setCivitaiModels] = useState<any[]>([])
    const [category, setCategory] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [nsfw, setNsfw] = useState(false)
    const [nsfwAgeConfirmed, setNsfwAgeConfirmed] = useState(false)

    // PWYW state
    const [isPWYW, setIsPWYW] = useState(false)

    // License tiers state
    const [tiers, setTiers] = useState<Tier[]>([])

    // Prefilled from Civitai
    const [prefill, setPrefill] = useState<Record<string, any>>({})

    const router = useRouter()
    const catMeta = category ? CATEGORY_META[category] : null

    // Real Civitai API import
    const handleCivitaiImport = async () => {
        if (!civitaiUrl) return
        setCivitaiLoading(true)
        try {
            const res = await fetch('/api/civitai-import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ civitai_profile_url: civitaiUrl }),
            })
            const data = await res.json()
            if (data.models && data.models.length > 0) {
                setCivitaiModels(data.models)
            } else {
                setCivitaiModels([])
                setStep(1)
            }
        } catch { setStep(1) }
        finally { setCivitaiLoading(false) }
    }

    const selectCivitaiModel = (model: any) => {
        setPrefill({
            title: model.title,
            description: model.description,
            ...model.metadata,
        })
        setCategory(model.category)
        setNsfw(model.nsfw)
        setStep(2)
    }

    const addTier = () => setTiers([...tiers, { name: '', price: '' }])
    const removeTier = (i: number) => setTiers(tiers.filter((_, idx) => idx !== i))
    const updateTier = (i: number, field: keyof Tier, val: string) => {
        const copy = [...tiers]
        copy[i] = { ...copy[i], [field]: val }
        setTiers(copy)
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
        metadata.pwyw = isPWYW
        if (isPWYW) metadata.min_price = formData.get('min_price')
        if (tiers.length > 0) metadata.tiers = tiers.filter(t => t.name && t.price)
        formData.append('metadata', JSON.stringify(metadata))

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData })
            const data = await res.json()
            if (data.success) { setStatus('success'); setTimeout(() => router.push('/dashboard'), 2000) }
            else setStatus('error')
        } catch { setStatus('error') }
        finally { setLoading(false) }
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center py-20 px-6">
            <div className="max-w-3xl w-full">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold indigo-gradient mb-2">
                        {step === 0 ? 'Import from Civitai' : step === 1 ? 'Choose Asset Type' : `Upload ${catMeta?.title}`}
                    </h1>
                    <p className="text-white/40">Securely list your AI assets. Keep up to 90% of every sale.</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 0: Civitai Import */}
                    {step === 0 && (
                        <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="glass-card space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
                                    <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-indigo-300 mb-1">Earn 75% here vs 0% on Civitai</p>
                                        <p className="text-xs text-white/40">Paste your Civitai profile URL and we'll fetch your models automatically.</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60">Civitai Profile or Model URL</label>
                                    <div className="flex gap-3">
                                        <input className={`flex-1 ${INPUT_STYLE}`} style={BORDER}
                                            placeholder="https://civitai.com/user/YourUsername"
                                            value={civitaiUrl} onChange={e => setCivitaiUrl(e.target.value)} />
                                        <button onClick={handleCivitaiImport} disabled={civitaiLoading || !civitaiUrl} className="accent-button !px-5 text-sm">
                                            {civitaiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Import'}
                                        </button>
                                    </div>
                                </div>

                                {/* Civitai results */}
                                {civitaiModels.length > 0 && (
                                    <div className="space-y-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                        <h3 className="text-sm font-bold text-white/50">Found {civitaiModels.length} models — select one to list:</h3>
                                        {civitaiModels.map((m, i) => (
                                            <button key={i} onClick={() => selectCivitaiModel(m)}
                                                className="w-full text-left glass-card !p-3 flex items-center gap-4 hover:!border-indigo-500/40 transition-all">
                                                {m.preview_images?.[0] && (
                                                    <img src={m.preview_images[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                                                )}
                                                <div className="flex-grow min-w-0">
                                                    <p className="font-bold text-sm truncate">{m.title}</p>
                                                    <p className="text-[10px] text-white/30">{m.metadata?.base_model} · {m.stats?.downloads} downloads</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <button onClick={() => setStep(1)} className="w-full py-3 text-sm text-white/30 hover:text-white/60 transition-colors">
                                    Skip · List manually instead
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 1: Category */}
                    {step === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(CATEGORY_META).map(([id, cat]) => (
                                <div key={id} onClick={() => { setCategory(id); setStep(2) }}
                                    className="glass-card flex items-center gap-4 cursor-pointer group hover:!border-indigo-500/50 transition-all">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: "rgba(99,102,241,0.1)" }}>
                                        {cat.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg">{cat.title}</h3>
                                        <p className="text-xs text-white/30">{cat.fields.length} fields</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Step 2: Upload Form */}
                    {step === 2 && catMeta && (
                        <motion.form key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleUpload} className="glass-card space-y-8">

                            {/* Base fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60">Title</label>
                                    <input name="title" required defaultValue={prefill.title || ''} className={INPUT_STYLE} style={BORDER} placeholder="e.g. Cinematic Portrait LoRA v2" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60">Description</label>
                                    <input name="description" defaultValue={prefill.description || ''} className={INPUT_STYLE} style={BORDER} placeholder="Describe your asset..." />
                                </div>
                            </div>

                            {/* Pricing Section */}
                            <div className="pt-4 space-y-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> Pricing
                                </h3>

                                {/* PWYW Toggle */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Pay What You Want</p>
                                        <p className="text-xs text-white/30">Let buyers choose their own price above a minimum</p>
                                    </div>
                                    <button type="button" onClick={() => setIsPWYW(!isPWYW)} className="text-indigo-400">
                                        {isPWYW ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-white/20" />}
                                    </button>
                                </div>

                                {isPWYW ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-white/50">Minimum Price (USD)</label>
                                            <input name="min_price" type="number" step="0.01" min="0" required className={INPUT_STYLE} style={BORDER} placeholder="0.00" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-white/50">Suggested Price (USD)</label>
                                            <input name="price" type="number" step="0.01" min="0" required className={INPUT_STYLE} style={BORDER} placeholder="9.99" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-white/50">Fixed Price (USD)</label>
                                        <input name="price" type="number" step="0.01" min="0" required className={INPUT_STYLE} style={BORDER} placeholder="9.99" />
                                    </div>
                                )}

                                {/* License Tiers */}
                                <div className="space-y-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">License Tiers</p>
                                            <p className="text-xs text-white/30">Offer different usage rights at different prices</p>
                                        </div>
                                        <button type="button" onClick={addTier} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                                            <Plus className="w-3.5 h-3.5" /> Add Tier
                                        </button>
                                    </div>
                                    {tiers.map((tier, i) => (
                                        <div key={i} className="flex gap-3 items-center">
                                            <select value={tier.name} onChange={e => updateTier(i, 'name', e.target.value)}
                                                className={`flex-1 ${INPUT_STYLE}`} style={{ ...BORDER, background: "#1a1a1a" }}>
                                                <option value="" className="bg-neutral-900">Select tier…</option>
                                                <option value="Personal" className="bg-neutral-900">Personal Use</option>
                                                <option value="Commercial" className="bg-neutral-900">Commercial Use</option>
                                                <option value="Extended" className="bg-neutral-900">Extended License</option>
                                            </select>
                                            <input type="number" step="0.01" min="0" placeholder="$" value={tier.price}
                                                onChange={e => updateTier(i, 'price', e.target.value)}
                                                className={`w-28 ${INPUT_STYLE}`} style={BORDER} />
                                            <button type="button" onClick={() => removeTier(i)} className="text-red-400/50 hover:text-red-400 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Category-specific fields */}
                            <div className="pt-4 space-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">{catMeta.title} Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {catMeta.fields.map((field: any) => (
                                        <div key={field.name} className="space-y-2">
                                            <label className="text-sm font-medium text-white/60">{field.label}</label>
                                            {field.type === 'select' ? (
                                                <select name={field.name} defaultValue={prefill[field.name] || ''} className={INPUT_STYLE}
                                                    style={{ ...BORDER, background: "#1a1a1a" }}
                                                    onChange={field.name === 'nsfw_flag' ? (e) => setNsfw(e.target.value !== 'No') : undefined}>
                                                    {field.options.map((o: string) => <option key={o} value={o} className="bg-neutral-900">{o}</option>)}
                                                </select>
                                            ) : (
                                                <input name={field.name} type={field.type} defaultValue={prefill[field.name] || ''} className={INPUT_STYLE}
                                                    style={BORDER} placeholder={field.placeholder} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {nsfw && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
                                        <input type="checkbox" id="ageGate" checked={nsfwAgeConfirmed} onChange={e => setNsfwAgeConfirmed(e.target.checked)} className="w-4 h-4 accent-[#6366f1] cursor-pointer" />
                                        <label htmlFor="ageGate" className="text-xs text-red-300 cursor-pointer">
                                            I confirm this content is intended for adults (18+) only and complies with ModelHive's content policy.
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* File Drop */}
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
                                            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
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
