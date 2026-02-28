import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any,
    appInfo: {
        name: 'ModelHive',
        url: 'https://modelhive.co',
        version: '0.2.0',
    },
})

// Fee tiers based on subscription plan
export const FEE_TIERS = {
    free: { platform: 0.25, seller: 0.75 },
    pro: { platform: 0.15, seller: 0.85 },
    studio: { platform: 0.10, seller: 0.90 },
} as const

export type SubscriptionTier = keyof typeof FEE_TIERS
