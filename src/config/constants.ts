/**
 * Application-wide Constants
 * Centralized constants for roles, permissions, statuses, and other app-wide values
 */

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  TENANT_ADMIN: 'TENANT_ADMIN',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Role Hierarchy (for permission checks)
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [USER_ROLES.SUPER_ADMIN]: 4,
  [USER_ROLES.TENANT_ADMIN]: 3,
  [USER_ROLES.STAFF]: 2,
  [USER_ROLES.CUSTOMER]: 1,
};

// Permissions
export const PERMISSIONS = {
  // Customer Management
  CUSTOMER_VIEW: 'customer:view',
  CUSTOMER_CREATE: 'customer:create',
  CUSTOMER_UPDATE: 'customer:update',
  CUSTOMER_DELETE: 'customer:delete',

  // Pet Management
  PET_VIEW: 'pet:view',
  PET_CREATE: 'pet:create',
  PET_UPDATE: 'pet:update',
  PET_DELETE: 'pet:delete',

  // Appointment Management
  APPOINTMENT_VIEW: 'appointment:view',
  APPOINTMENT_CREATE: 'appointment:create',
  APPOINTMENT_UPDATE: 'appointment:update',
  APPOINTMENT_DELETE: 'appointment:delete',
  APPOINTMENT_CANCEL: 'appointment:cancel',

  // Service Management
  SERVICE_VIEW: 'service:view',
  SERVICE_CREATE: 'service:create',
  SERVICE_UPDATE: 'service:update',
  SERVICE_DELETE: 'service:delete',

  // Staff Management
  STAFF_VIEW: 'staff:view',
  STAFF_CREATE: 'staff:create',
  STAFF_UPDATE: 'staff:update',
  STAFF_DELETE: 'staff:delete',

  // Task Management
  TASK_VIEW: 'task:view',
  TASK_CREATE: 'task:create',
  TASK_UPDATE: 'task:update',
  TASK_COMPLETE: 'task:complete',

  // Analytics
  ANALYTICS_VIEW: 'analytics:view',

  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_UPDATE: 'settings:update',

  // Subscription
  SUBSCRIPTION_VIEW: 'subscription:view',
  SUBSCRIPTION_MANAGE: 'subscription:manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Role-Permission Mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.TENANT_ADMIN]: [
    PERMISSIONS.CUSTOMER_VIEW,
    PERMISSIONS.CUSTOMER_CREATE,
    PERMISSIONS.CUSTOMER_UPDATE,
    PERMISSIONS.CUSTOMER_DELETE,
    PERMISSIONS.PET_VIEW,
    PERMISSIONS.PET_CREATE,
    PERMISSIONS.PET_UPDATE,
    PERMISSIONS.PET_DELETE,
    PERMISSIONS.APPOINTMENT_VIEW,
    PERMISSIONS.APPOINTMENT_CREATE,
    PERMISSIONS.APPOINTMENT_UPDATE,
    PERMISSIONS.APPOINTMENT_DELETE,
    PERMISSIONS.APPOINTMENT_CANCEL,
    PERMISSIONS.SERVICE_VIEW,
    PERMISSIONS.SERVICE_CREATE,
    PERMISSIONS.SERVICE_UPDATE,
    PERMISSIONS.SERVICE_DELETE,
    PERMISSIONS.STAFF_VIEW,
    PERMISSIONS.STAFF_CREATE,
    PERMISSIONS.STAFF_UPDATE,
    PERMISSIONS.STAFF_DELETE,
    PERMISSIONS.TASK_VIEW,
    PERMISSIONS.TASK_CREATE,
    PERMISSIONS.TASK_UPDATE,
    PERMISSIONS.TASK_COMPLETE,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SETTINGS_UPDATE,
    PERMISSIONS.SUBSCRIPTION_VIEW,
    PERMISSIONS.SUBSCRIPTION_MANAGE,
  ],
  [USER_ROLES.STAFF]: [
    PERMISSIONS.CUSTOMER_VIEW,
    PERMISSIONS.PET_VIEW,
    PERMISSIONS.APPOINTMENT_VIEW,
    PERMISSIONS.APPOINTMENT_UPDATE,
    PERMISSIONS.SERVICE_VIEW,
    PERMISSIONS.TASK_VIEW,
    PERMISSIONS.TASK_UPDATE,
    PERMISSIONS.TASK_COMPLETE,
  ],
  [USER_ROLES.CUSTOMER]: [
    PERMISSIONS.PET_VIEW,
    PERMISSIONS.PET_CREATE,
    PERMISSIONS.PET_UPDATE,
    PERMISSIONS.APPOINTMENT_VIEW,
    PERMISSIONS.APPOINTMENT_CREATE,
    PERMISSIONS.APPOINTMENT_CANCEL,
  ],
};

// Appointment Statuses
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
} as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];

// Service Types
export const SERVICE_TYPES = {
  GROOMING: 'GROOMING',
  WALKING: 'WALKING',
  DAYCARE: 'DAYCARE',
  BOARDING: 'BOARDING',
  TRAINING: 'TRAINING',
  VETERINARY: 'VETERINARY',
  OTHER: 'OTHER',
} as const;

export type ServiceType = (typeof SERVICE_TYPES)[keyof typeof SERVICE_TYPES];

// Task Statuses
export const TASK_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED',
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

// Notification Channels
export const NOTIFICATION_CHANNELS = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
  PUSH: 'PUSH',
} as const;

export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[keyof typeof NOTIFICATION_CHANNELS];

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE',
} as const;

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS];

// Subscription Statuses
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',
  TRIAL: 'TRIAL',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  PAST_DUE: 'PAST_DUE',
} as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const;

// Date/Time Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy h:mm a',
  INPUT: 'yyyy-MM-dd',
  TIME: 'h:mm a',
  DATETIME: 'yyyy-MM-dd HH:mm',
} as const;

// Business Hours (default)
export const DEFAULT_BUSINESS_HOURS = {
  MONDAY: { open: '09:00', close: '17:00', closed: false },
  TUESDAY: { open: '09:00', close: '17:00', closed: false },
  WEDNESDAY: { open: '09:00', close: '17:00', closed: false },
  THURSDAY: { open: '09:00', close: '17:00', closed: false },
  FRIDAY: { open: '09:00', close: '17:00', closed: false },
  SATURDAY: { open: '09:00', close: '13:00', closed: false },
  SUNDAY: { open: '09:00', close: '17:00', closed: true },
} as const;

// Notification Templates
export const NOTIFICATION_TEMPLATES = {
  APPOINTMENT_CONFIRMATION: 'APPOINTMENT_CONFIRMATION',
  APPOINTMENT_REMINDER_24H: 'APPOINTMENT_REMINDER_24H',
  APPOINTMENT_REMINDER_2H: 'APPOINTMENT_REMINDER_2H',
  APPOINTMENT_COMPLETED: 'APPOINTMENT_COMPLETED',
  APPOINTMENT_CANCELLED: 'APPOINTMENT_CANCELLED',
  REVIEW_REQUEST: 'REVIEW_REQUEST',
} as const;

export type NotificationTemplate = (typeof NOTIFICATION_TEMPLATES)[keyof typeof NOTIFICATION_TEMPLATES];

