import 'dotenv/config'
import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey?.startsWith('sk_test_')) {
    throw new Error(
        'STRIPE_SECRET_KEY must contain a Stripe test secret key.'
    )
}

export const stripe = new Stripe(secretKey)