import { HiveAnalysisResult, HiveIndicator, HiveVerdict } from '@/types/hive'

const AI_SOFTWARE = [
    'stable diffusion', 'automatic1111', 'comfyui', 'midjourney',
    'dall-e', 'dalle', 'novelai', 'invoke ai', 'dream studio',
    'runway', 'pika', 'sora', 'kling', 'ideogram', 'flux', 'leonardo',
]

const CAMERA_BRANDS = [
    'canon', 'nikon', 'sony', 'fujifilm', 'panasonic', 'olympus',
    'leica', 'hasselblad', 'pentax', 'ricoh', 'gopro', 'dji',
    'apple', 'samsung', 'google', 'xiaomi', 'huawei', 'oneplus',
]

const AI_RESOLUTIONS = [
    [512, 512], [512, 768], [768, 768], [768, 1024],
    [1024, 1024], [1024, 1536], [1536, 1024], [2048, 2048],
    [1344, 768], [768, 1344],
]

interface AnalysisInput {
    exifData: any
    sharpMeta: any
    fileName: string
    fileType: 'image' | 'video'
    fileSize: number
}

export function analyzeMedia(input: AnalysisInput): HiveAnalysisResult {
    const { exifData, sharpMeta, fileName, fileType, fileSize } = input
    const indicators: HiveIndicator[] = []
    let score = 50

    const hasExif = !!exifData && Object.keys(exifData).length > 3
    const cameraMake = exifData?.Make || exifData?.make || null
    const cameraModel = exifData?.Model || exifData?.model || null
    const lens = exifData?.LensModel || exifData?.lensModel || null
    const software = exifData?.Software || exifData?.software || null
    const dateOriginal = exifData?.DateTimeOriginal || exifData?.CreateDate || null
    const gps = (exifData?.latitude && exifData?.longitude)
        ? { lat: exifData.latitude, lng: exifData.longitude } : null
    const focalLength = exifData?.FocalLength || exifData?.focalLength
    const aperture = exifData?.FNumber || exifData?.fNumber
    const iso = exifData?.ISO || exifData?.iso
    const shutterSpeed = exifData?.ExposureTime || exifData?.exposureTime
    const width = sharpMeta?.width || exifData?.ImageWidth || null
    const height = sharpMeta?.height || exifData?.ImageHeight || null
    const dpi = sharpMeta?.density || null
    const hasProfile = sharpMeta?.hasProfile || false
    const colorSpace = sharpMeta?.space || null

    // Direct AI Markers (Strong evidence) - If found, these are heavy weight
    const directAiMarkers: string[] = []
    
    // Check for Adobe Firefly / Sensei specifically
    if (software) {
        const s = software.toLowerCase()
        if (s.includes('firefly') || s.includes('sensei') || s.includes('generative fill')) {
            score -= 50
            directAiMarkers.push('Adobe Generative AI Signature')
            indicators.push({ id: 'firefly', label: 'Adobe Firefly', detail: 'Generative AI tags found', type: 'ai_signal', icon: 'Bot' })
        }
    }

    // 1. Camera
    if (cameraMake) {
        const m = cameraMake.toLowerCase()
        if (CAMERA_BRANDS.some((b: string) => m.includes(b))) {
            score += 30
            indicators.push({ id: 'camera', label: 'Device Identified', detail: `${cameraMake} ${cameraModel || ''}`.trim(), type: 'authentic', icon: 'Camera' })
        }
    } else {
        // Missing data is suspicious but not a crime
        score -= 10 
        indicators.push({ id: 'no_camera', label: 'No Device Info', detail: 'Typical for shared/web media', type: 'neutral', icon: 'CameraOff' })
    }

    // 2. EXIF
    if (hasExif) {
        score += 15
        indicators.push({ id: 'exif', label: 'Metadata Presence', detail: `${Object.keys(exifData).length} fields`, type: 'authentic', icon: 'FileText' })
    } else {
        score -= 10
        indicators.push({ id: 'no_exif', label: 'No Metadata', detail: 'Commonly stripped by apps', type: 'neutral', icon: 'FileX' })
    }

    // 3. GPS
    if (gps) {
        score += 25
        indicators.push({ id: 'gps', label: 'Geo Location', detail: 'Authentic GPS point', type: 'authentic', icon: 'MapPin' })
    }

    // 4. Software Check (Other than common AI)
    if (software && !directAiMarkers.length) {
        const s = software.toLowerCase()
        if (AI_SOFTWARE.some((p: string) => s.includes(p))) {
            score -= 35
            directAiMarkers.push('AI Software match')
            indicators.push({ id: 'ai_sw', label: 'Synthetic Engine', detail: software, type: 'ai_signal', icon: 'Bot' })
        }
    }

    // 5. Resolution / Framing
    if (width && height && !cameraMake) {
        const isAiRes = AI_RESOLUTIONS.some(([w, h]) => (width === w && height === h) || (width === h && height === w))
        if (isAiRes) {
            score -= 10
            indicators.push({ id: 'ai_geometry', label: 'AI Resolution Pattern', detail: `${width}×${height}`, type: 'ai_signal', icon: 'Grid3X3' })
        }
    }

    // Adjust for Video (Videos are naturally cleaner)
    if (fileType === 'video') {
        score += 10 // Be more lenient with videos
    }

    score = Math.max(0, Math.min(100, score))

    let verdict: HiveVerdict
    let confidence = 0

    // NEW LOGIC: If no direct AI markers were found, we CANNOT be sure it's AI
    if (score < 40 && directAiMarkers.length === 0) {
        verdict = 'inconclusive'
        confidence = Math.round(55 + (40 - score) * 0.5) // Low confidence
    } else if (score >= 70) {
        verdict = 'authentic'
        confidence = Math.round(60 + (score - 70) * 1.3)
    } else if (score <= 30) {
        verdict = 'ai_generated'
        confidence = Math.round(70 + (30 - score) * 1) // High confidence only if we have direct markers
    } else {
        verdict = 'inconclusive'
        confidence = 50
    }

    confidence = Math.min(99, Math.max(25, confidence))



    return {
        id: crypto.randomUUID(),
        verdict,
        confidence,
        filename: fileName,
        fileType,
        fileSizeBytes: fileSize,
        dimensions: width && height ? { width, height } : null,
        camera: {
            make: cameraMake, model: cameraModel, lens: lens || null,
            focalLength: focalLength ? `${focalLength}mm` : null,
            aperture: aperture ? `f/${aperture}` : null,
            iso: iso || null,
            shutterSpeed: shutterSpeed ? `1/${Math.round(1 / shutterSpeed)}s` : null,
        },
        capture: {
            date: dateOriginal ? (dateOriginal instanceof Date ? dateOriginal.toISOString() : String(dateOriginal)) : null,
            gps, software: software || null,
        },
        technical: { dpi, colorSpace, hasIccProfile: hasProfile, hasExif },
        indicators,
        timestamp: new Date().toISOString(),
    }
}
