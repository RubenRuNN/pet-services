import { z } from 'zod';

/**
 * Environment variable schema validation
 * This ensures all required environment variables are present and valid
 */
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Next.js
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().default('Pet Services'),

  // Database
  DATABASE_URL: z.string().min(1, 'Database URL is required'),

  // NextAuth
  AUTH_SECRET: z.string().min(32, 'Auth secret must be at least 32 characters'),
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

  // File Storage
  BLOB_STORAGE_KEY: z.string().optional(),
  BLOB_STORAGE_URL: z.string().url().optional(),

  // Stripe (Billing) - Optional for MVP
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 * Throws error if validation fails
 */
function getEnv(): Env {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
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
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(
        `Invalid environment variables:\n${missingVars.join('\n')}\n\nPlease check your .env.local file.`,
      );
    }
    throw error;
  }
}

export const env = getEnv();

