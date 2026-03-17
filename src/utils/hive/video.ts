/**
 * Generates a thumbnail from a video file at a specific second
 */
export async function generateVideoThumbnail(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.src = URL.createObjectURL(file)
        video.muted = true
        video.playsInline = true

        video.onloadedmetadata = () => {
            // Seek to 1 second (or 0 if video is very short)
            video.currentTime = Math.min(video.duration, 1)
        }

        video.onseeked = () => {
            try {
                const canvas = document.createElement('canvas')
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                const ctx = canvas.getContext('2d')
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
                resolve(dataUrl)
                URL.revokeObjectURL(video.src)
            } catch (e) {
                reject(e)
            }
        }

        video.onerror = (e) => reject(e)
    })
}
