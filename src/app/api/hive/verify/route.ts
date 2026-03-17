import { NextRequest, NextResponse } from 'next/server'
import { analyzeMedia } from '@/utils/hive/analyze'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const isImage = file.type.startsWith('image/')
        const isVideo = file.type.startsWith('video/')

        if (!isImage && !isVideo) {
            return NextResponse.json({ error: 'Unsupported file type. Use images or videos.' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())

        let exifData = null
        let sharpMeta = null

        // Extract EXIF
        try {
            const exifr = (await import('exifr')).default
            exifData = await exifr.parse(buffer, {
                tiff: true, xmp: true, icc: true, iptc: true, gps: true,
                translateKeys: true, translateValues: true, reviveValues: true,
            })
        } catch { /* no EXIF — itself an indicator */ }

        // Sharp metadata for images
        if (isImage) {
            try {
                const sharp = (await import('sharp')).default
                sharpMeta = await sharp(buffer).metadata()
            } catch { /* sharp failed */ }
        }

        const result = analyzeMedia({
            exifData, sharpMeta,
            fileName: file.name,
            fileType: isImage ? 'image' : 'video',
            fileSize: file.size,
        })

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('HiveMark verification error:', error)
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
    }
}
