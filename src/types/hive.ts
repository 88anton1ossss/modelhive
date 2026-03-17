/**
 * HiveMark — Media Verification Types
 */

export type HiveVerdict = 'authentic' | 'ai_generated' | 'inconclusive'

export interface HiveIndicator {
    id: string
    label: string
    detail: string
    type: 'authentic' | 'ai_signal' | 'neutral'
    icon: string
}

export interface HiveAnalysisResult {
    id: string
    verdict: HiveVerdict
    confidence: number
    filename: string
    fileType: 'image' | 'video'
    fileSizeBytes: number
    dimensions: { width: number; height: number } | null
    camera: {
        make: string | null
        model: string | null
        lens: string | null
        focalLength: string | null
        aperture: string | null
        iso: number | null
        shutterSpeed: string | null
    }
    capture: {
        date: string | null
        gps: { lat: number; lng: number } | null
        software: string | null
    }
    technical: {
        dpi: number | null
        colorSpace: string | null
        hasIccProfile: boolean
        hasExif: boolean
    }
    indicators: HiveIndicator[]
    timestamp: string
}
