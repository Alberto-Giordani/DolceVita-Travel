import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { db } from './db/index.js'
import { user, session, account, verification } from './db/schema.js'

const secret = process.env.BETTER_AUTH_SECRET
const baseURL = process.env.BETTER_AUTH_URL
const clientURL = process.env.CLIENT_URL

if (!secret || !baseURL || !clientURL) {
    throw new Error(
        'Missing authentication environment variables. Check server/.env.'
    )
}

export const auth = betterAuth({
    appName: 'DolceVita Travel',

    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),

    secret,
    baseURL,

    trustedOrigins: [clientURL],

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },

    advanced: {
        defaultCookieAttributes: {
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        },
    },
})