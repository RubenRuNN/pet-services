import { env } from './env';

/**
 * Application Configuration
 * Centralized app settings and feature flags
 */

export const appConfig = {
  name: env.NEXT_PUBLIC_APP_NAME || 'Pet Services',
  url: env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  environment: env.NODE_ENV,
  version: '0.1.0',

  // Feature Flags
  features: {
    // Enable/disable features for gradual rollout
    customerPortal: true,
    smsNotifications: !!env.TWILIO_ACCOUNT_SID,
    whatsappNotifications: !!env.WHATSAPP_ACCESS_TOKEN,
    stripeBilling: !!env.STRIPE_SECRET_KEY,
    fileUploads: !!env.BLOB_STORAGE_KEY,
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
} as const;

export type AppConfig = typeof appConfig;

