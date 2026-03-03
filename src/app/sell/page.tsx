"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle2, AlertCircle, Camera, Layers, Zap, Code, ChevronRight, Loader2, ExternalLink, Info, Plus, Trash2, DollarSign, ToggleLeft, ToggleRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/utils/cn"

const INPUT_STYLE = "w-full bg-white/5 border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm"
const BORDER = { borderColor: "rgba(255,255,255,0.08)" }

const CATEGORY_META: Record<string, any> = {
    model: {
        title: "AI Model", icon: <Layers className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "base_model", label: "Base Model", type: "select", options: ["Flux.1 [dev]", "Flux.1 [schnell]", "SDXL 1.0", "SD 1.5", "SD 3.5 Large", "Other"] },
            { name: "trigger_word", label: "Trigger Word", type: "text", placeholder: "e.g. ohwx, style-xyz" },
            { name: "recommended_settings", label: "Recommended Settings", type: "text", placeholder: "e.g. CFG 3.5, Steps 20, Guidance 3.0" },
        ]
    },
    dataset: {
        title: "Dataset", icon: <Camera className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "image_count", label: "Image Count", type: "number", placeholder: "e.g. 500" },
            { name: "max_resolution", label: "Max Resolution", type: "text", placeholder: "e.g. 4K, 1024x1024" },
            { name: "contains_faces", label: "Contains Faces", type: "checkbox" },
            { name: "model_releases", label: "Model Releases Included", type: "checkbox" },
        ]
    },
    lut: {
        title: "LUT", icon: <ChevronRight className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "format", label: "Format", type: "select", options: [".CUBE", ".3DL", ".LOOK", "Other"] },
            { name: "software", label: "Compatible Software", type: "text", placeholder: "e.g. Premiere, Resolve, FCP" },
        ]
    },
    preset: {
        title: "Preset", icon: <Zap className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "app", label: "App", type: "select", options: ["Lightroom", "Capture One", "Photoshop", "Other"] },
            { name: "preset_count", label: "Number of Presets", type: "number", placeholder: "1" },
        ]
    },
    effect: {
        title: "Effect", icon: <Plus className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "effect_type", label: "Effect Type", type: "text", placeholder: "e.g. Grain, Light Leak, Texture" },
        ]
    },
    bundle: {
        title: "Bundle", icon: <Layers className="w-5 h-5" style={{ color: "#6366f1" }} />,
        fields: [
            { name: "contents", label: "Bundle Contents", type: "text", placeholder: "e.g. 10 Models, 5 Datasets" },
        ]
    }
}

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

    // Licensing Pricing
    const [prices, setPrices] = useState({
        personal: "",
        commercial: "",
        extended: "",
        exclusive: ""
    })

    const [isPWYW, setIsPWYW] = useState(false)
    const [prefill, setPrefill] = useState<Record<string, any>>({})

    const router = useRouter()
    const catMeta = category ? CATEGORY_META[category] : null

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
            if (data.models && data.models.length > 0) setCivitaiModels(data.models)
            else { setCivitaiModels([]); setStep(1); }
        } catch { setStep(1) }
        finally { setCivitaiLoading(false) }
    }

    const selectCivitaiModel = (model: any) => {
        setPrefill({ title: model.title, description: model.description, ...model.metadata })
        setCategory('model')
        setNsfw(model.nsfw)
        setStep(2)
    }

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !category) return
        if (nsfw && !nsfwAgeConfirmed) return

        setLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('file', file)
        formData.append('product_type', category)
        formData.append('category', category) // redundant but keeps compat

        // Ensure price is at least Personal
        const mainPrice = prices.personal || "0"
        formData.append('price', mainPrice)

        const metadata: Record<string, any> = {
            description: formData.get('description'),
            licensing: prices,
            pwyw: isPWYW
        }

        catMeta?.fields.forEach((f: any) => {
            if (f.type === 'checkbox') {
                metadata[f.name] = formData.get(f.name) === 'on'
            } else {
                metadata[f.name] = formData.get(f.name)
            }
        })

        if (isPWYW) metadata.min_price = formData.get('min_price')
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
                    <h1 className="text-4xl font-extrabold indigo-gradient mb-2 tracking-tighter">
                        {step === 0 ? 'Import Content' : step === 1 ? 'Choose Asset Type' : `New ${catMeta?.title}`}
                    </h1>
                    <p className="text-white/40 font-medium">List your assets for the next generation of creative AI.</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 0: Civitai Import */}
                    {step === 0 && (
                        <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="glass-card space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60">Civitai Profile URL</label>
                                    <div className="flex gap-3">
                                        <input className={`flex-1 ${INPUT_STYLE}`} style={BORDER}
                                            placeholder="https://civitai.com/user/YourUsername"
                                            value={civitaiUrl} onChange={e => setCivitaiUrl(e.target.value)} />
                                        <button onClick={handleCivitaiImport} disabled={civitaiLoading || !civitaiUrl} className="accent-button !px-5 text-sm">
                                            {civitaiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch Models'}
                                        </button>
                                    </div>
                                </div>
                                {civitaiModels.length > 0 && (
                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                        {civitaiModels.map((m, i) => (
                                            <button key={i} onClick={() => selectCivitaiModel(m)}
                                                className="w-full text-left glass-card !p-3 flex items-center gap-4 hover:!border-indigo-500/40 transition-all">
                                                <div className="flex-grow min-w-0">
                                                    <p className="font-bold text-sm truncate">{m.title}</p>
                                                    <p className="text-[10px] text-white/30">{m.metadata?.base_model}</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-white/20" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <button onClick={() => setStep(1)} className="w-full py-3 text-sm text-white/30 hover:text-white/60 transition-colors">Skip to manual listing</button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 1: Category Selection */}
                    {step === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(CATEGORY_META).map(([id, cat]) => (
                                <div key={id} onClick={() => { setCategory(id); setStep(2) }}
                                    className="glass-card flex flex-col items-center text-center gap-4 cursor-pointer group hover:!border-indigo-500/50 transition-all p-8">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all">
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-black uppercase tracking-widest text-[11px] text-white/60 group-hover:text-white transition-colors">
                                        {cat.title}
                                    </h3>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Step 2: Full Form */}
                    {step === 2 && catMeta && (
                        <motion.form key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleUpload} className="glass-card space-y-10">

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">General Information</h3>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/60">Product Title</label>
                                        <input name="title" required defaultValue={prefill.title || ''} className={INPUT_STYLE} style={BORDER} placeholder="e.g. Cinematic Portraits v2" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/60">Detailed Description</label>
                                        <textarea name="description" defaultValue={prefill.description || ''} className={`${INPUT_STYLE} min-h-[120px] resize-none`} style={BORDER} placeholder="What makes this asset special?" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> License Pricing (USD)
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Personal</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                            <input type="number" step="0.01" min="0" required value={prices.personal} onChange={e => setPrices({ ...prices, personal: e.target.value })} className={`${INPUT_STYLE} pl-10`} style={BORDER} placeholder="9.99" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-indigo-400/60 uppercase tracking-widest">Commercial</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-indigo-400/20" />
                                            <input type="number" step="0.01" min="0" required value={prices.commercial} onChange={e => setPrices({ ...prices, commercial: e.target.value })} className={`${INPUT_STYLE} pl-10 border-indigo-500/10`} style={BORDER} placeholder="24.99" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Extended</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                            <input type="number" step="0.01" min="0" required value={prices.extended} onChange={e => setPrices({ ...prices, extended: e.target.value })} className={`${INPUT_STYLE} pl-10`} style={BORDER} placeholder="99.99" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Exclusive</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                            <input type="number" step="0.01" min="0" required value={prices.exclusive} onChange={e => setPrices({ ...prices, exclusive: e.target.value })} className={`${INPUT_STYLE} pl-10`} style={BORDER} placeholder="499.99" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div>
                                        <p className="text-sm font-bold">Pay What You Want (PWYW)</p>
                                        <p className="text-[10px] text-white/20 uppercase font-black mt-1">Allow tips & higher payments</p>
                                    </div>
                                    <button type="button" onClick={() => setIsPWYW(!isPWYW)}>
                                        {isPWYW ? <ToggleRight className="w-10 h-10 text-indigo-500" /> : <ToggleLeft className="w-10 h-10 text-white/10" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">{catMeta.title} Specifications</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {catMeta.fields.map((field: any) => (
                                        <div key={field.name} className={cn("space-y-2", field.type === 'checkbox' ? "flex items-center gap-3 pt-6" : "")}>
                                            {field.type === 'checkbox' ? (
                                                <>
                                                    <input name={field.name} type="checkbox" id={field.name} className="w-5 h-5 accent-indigo-500" />
                                                    <label htmlFor={field.name} className="text-sm font-medium text-white/60 cursor-pointer">{field.label}</label>
                                                </>
                                            ) : (
                                                <>
                                                    <label className="text-sm font-medium text-white/60">{field.label}</label>
                                                    {field.type === 'select' ? (
                                                        <select name={field.name} defaultValue={prefill[field.name] || ''} className={`${INPUT_STYLE} bg-neutral-900 border-white/10`} style={BORDER}>
                                                            {field.options.map((o: string) => <option key={o} value={o}>{o}</option>)}
                                                        </select>
                                                    ) : (
                                                        <input name={field.name} type={field.type} defaultValue={prefill[field.name] || ''} className={INPUT_STYLE} style={BORDER} placeholder={field.placeholder} />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">Master Asset File</h3>
                                <div className="relative group/drag h-40 rounded-2xl bg-white/[0.03] border-2 border-dashed border-white/10 hover:border-indigo-500/50 transition-all flex flex-col items-center justify-center">
                                    {file ? (
                                        <div className="flex flex-col items-center">
                                            <CheckCircle2 className="w-8 h-8 text-indigo-500 mb-2" />
                                            <p className="text-sm font-bold text-white">{file.name}</p>
                                            <button type="button" onClick={() => setFile(null)} className="text-[10px] uppercase font-black text-red-400/50 hover:text-red-400 mt-2">Replace File</button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-white/10 mb-2 group-hover/drag:text-indigo-500/50 transition-colors" />
                                            <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Drag & Drop master zip/ckpt</p>
                                            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setStep(1)} className="px-8 py-4 rounded-2xl bg-white/5 text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Back</button>
                                <button disabled={loading || !file} type="submit" className="accent-button flex-1 py-4 text-[11px] uppercase tracking-widest font-black">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Release to Marketplace'}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
