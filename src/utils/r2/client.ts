import { S3Client } from '@aws-sdk/client-s3'

let r2: S3Client | null = null

export function getR2Client() {
    if (!r2) {
        r2 = new S3Client({
            region: 'auto',
            endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID || 'mock',
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'mock',
            },
        })
    }
    return r2
}

export const PUBLIC_BUCKET = process.env.R2_PUBLIC_BUCKET_NAME || ''
export const PRIVATE_BUCKET = process.env.R2_PRIVATE_BUCKET_NAME || ''
