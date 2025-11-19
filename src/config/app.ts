import { env } from './env';

/**
 * Helper to safely check server-side env vars
 * Only works on server-side, returns false on client
 * This prevents accessing server-side env vars on the client (which @t3-oss/env-nextjs blocks)
 */
function hasServerEnvVar(key: string): boolean {
  // Always return false on client-side to prevent accessing server env vars
  if (typeof window !== 'undefined') {
    return false;
  }
  
  // Server-side: safely check if env var exists
  // We access process.env directly to avoid @t3-oss/env-nextjs client-side protection
  try {
    const value = process.env[key];
    return !!value && value !== '';
  } catch {
    // If env var is not accessible, return false
    return false;
  }
}

/**
 * Application Configuration
 * Centralized app settings and feature flags
 * Note: Feature flags that depend on server-side env vars are only accurate on the server
 */

export const appConfig = {
  name: env.NEXT_PUBLIC_APP_NAME || 'Pet Services',
  url: env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '0.1.0',

  // Feature Flags
  // Note: Server-side feature flags (SMS, WhatsApp, Stripe, File Uploads)
  // will return false on the client side for security
  features: {
    // Enable/disable features for gradual rollout
    customerPortal: true,
    // Server-side only: These check server env vars safely
    smsNotifications: hasServerEnvVar('TWILIO_ACCOUNT_SID'),
    whatsappNotifications: hasServerEnvVar('WHATSAPP_ACCESS_TOKEN'),
    stripeBilling: hasServerEnvVar('STRIPE_SECRET_KEY'),
    fileUploads: hasServerEnvVar('BLOB_STORAGE_KEY'),
    // Client-safe features
    analytics: true,
    recurringAppointments: true,
    taskTemplates: true,
  },

  // Multi-tenancy Configuration
  multiTenancy: {
    // Tenant resolution strategies
    // 'subdomain' - tenant.example.com
    // 'domain' - tenant.com (custom domain)
    // 'path' - example.com/tenant
    // 'header' - X-Tenant-ID header
    resolutionStrategy: 'subdomain' as 'subdomain' | 'domain' | 'path' | 'header',
    defaultTenantId: null as string | null,
  },

  // Pagination
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },

  // Rate Limiting
  rateLimit: {
    enabled: true,
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // per window
  },

  // Session Configuration
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // File Upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedDocumentTypes: ['application/pdf'],
  },

  // Notification Settings
  notifications: {
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    batchSize: 10,
  },

  // Business Logic
  business: {
    defaultTimeZone: 'UTC',
    appointmentReminderHours: [24, 2], // 24 hours and 2 hours before
    defaultAppointmentDuration: 60, // minutes
    maxRecurringAppointments: 52, // weeks
  },

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'] as const,
    localeNames: {
      en: 'English',
      pt: 'Português',
    },
  },
} as const;

export type AppConfig = typeof appConfig;

