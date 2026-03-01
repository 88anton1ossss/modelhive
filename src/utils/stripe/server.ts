import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export function getStripe() {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            // During build time, return a mock or handle gracefully
            // but we shouldn't call it during build.
            return null as unknown as Stripe
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16' as any,
            appInfo: {
                name: 'ModelHive',
                url: 'https://modelhive.co',
                version: '0.2.0',
            },
        })
    }
    return stripeInstance
}

// Fee tiers based on subscription plan
export const FEE_TIERS = {
    free: { platform: 0.25, seller: 0.75 },
    pro: { platform: 0.15, seller: 0.85 },
    studio: { platform: 0.10, seller: 0.90 },
} as const

export type SubscriptionTier = keyof typeof FEE_TIERS
