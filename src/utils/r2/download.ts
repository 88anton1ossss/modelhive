import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PRIVATE_BUCKET, getR2Client } from './client'

export async function generateSignedDownloadUrl(masterFilePath: string) {
    const command = new GetObjectCommand({
        Bucket: PRIVATE_BUCKET,
        Key: masterFilePath,
    })

    // 24 Hour Expiry as requested
    return await getSignedUrl(getR2Client(), command, { expiresIn: 86400 })
}
