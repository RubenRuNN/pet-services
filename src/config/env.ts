import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Environment variable schema validation using @t3-oss/env-nextjs
 * This ensures all required environment variables are present and valid
 * and properly handles Next.js edge runtime and client-side access
 */
export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    // Node Environment
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),

    // Database
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes('YOUR_DATABASE_URL_HERE'),
        'You forgot to change the default DATABASE_URL',
      ),

    // NextAuth
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string().min(32, 'Auth secret must be at least 32 characters')
        : z
            .string()
            .min(32, 'Auth secret must be at least 32 characters')
            .optional(),
    AUTH_URL: z.string().url().optional(),

    // Resend (Email)
    RESEND_API_KEY: z.string().min(1, 'Resend API key is required'),
    RESEND_FROM_EMAIL: z.string().email().default('noreply@example.com'),

    // Twilio (SMS) - Optional
    TWILIO_ACCOUNT_SID: z.string().optional(),
    TWILIO_AUTH_TOKEN: z.string().optional(),
    TWILIO_PHONE_NUMBER: z.string().optional(),

    // WhatsApp (Meta Cloud API) - Optional
    WHATSAPP_ACCESS_TOKEN: z.string().optional(),
    WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
    WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().optional(),

    // File Storage - Optional
    BLOB_STORAGE_KEY: z.string().optional(),
    BLOB_STORAGE_URL: z.string().url().optional(),

    // Stripe (Billing) - Optional for MVP
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_APP_NAME: z.string().default('Pet Services'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes
   * (e.g. middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    BLOB_STORAGE_KEY: process.env.BLOB_STORAGE_KEY,
    BLOB_STORAGE_URL: process.env.BLOB_STORAGE_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

/**
 * Type export for environment variables
 */
export type Env = typeof env;

