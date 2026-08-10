import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '../db';

export const auth = betterAuth({
    baseURL: process.env.APP_URL!,
    trustedOrigins: [
    process.env.MOBILE_APP_URL!,
        "http://localhost:3000",
        "http://localhost:8080",
    ],
    secret: process.env.AUTH_SECRET!,

    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },

    plugins: [
        bearer()
    ],

    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'user'
            },
            accountType: {
                type: 'string',
                required: true,
                input: true
            }
        }
    }
})