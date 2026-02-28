import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2Client, PUBLIC_BUCKET, PRIVATE_BUCKET } from './client'
import sharp from 'sharp'

export async function uploadToR2(
    file: Buffer,
    key: string,
    isPublic: boolean = false
) {
    const bucket = isPublic ? PUBLIC_BUCKET : PRIVATE_BUCKET

    await r2Client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file,
            ContentType: 'image/jpeg', // Default or detect
        })
    )

    if (isPublic) {
        return `${process.env.R2_PUBLIC_DOMAIN}/${key}`
    }
    return key
}

export async function generateWatermarkedPreviews(file: Buffer, fileName: string) {
    const previewUrls: string[] = []

    // For simplicity, we create 1 preview first, 
    // but we can loop to 10 if we have a dataset.
    // We'll use sharp to resize to 200px and add text watermark.

    const watermark = Buffer.from(`
    <svg width="200" height="200">
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="rgba(255,255,255,0.3)" text-anchor="middle" transform="rotate(-45 100 100)">PREVIEW</text>
    </svg>
  `)

    const previewBuffer = await sharp(file)
        .resize(200, 200, { fit: 'inside' })
        .composite([{ input: watermark, gravity: 'center' }])
        .jpeg({ quality: 70 })
        .toBuffer()

    const key = `previews/${Date.now()}-${fileName}`
    const url = await uploadToR2(previewBuffer, key, true)
    previewUrls.push(url)

    return previewUrls
}
