import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '../db';

export const auth = betterAuth({
    baseURL: process.env.APP_URL!,
    trustedOrigins: [process.env.MOBILE_APP_URL!],
    secret: process.env.AUTH_SECRET!,

    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },

    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'user'
            }
        }
    }
})