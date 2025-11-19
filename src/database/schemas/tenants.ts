import { pgTable, uuid, timestamp, jsonb, varchar } from 'drizzle-orm/pg-core';
import type { SubscriptionPlan, SubscriptionStatus } from '@/config/constants';

/**
 * Tenants table - Multi-tenant business accounts
 */
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  subscriptionPlan: varchar('subscription_plan', { length: 50 })
    .notNull()
    .$type<SubscriptionPlan>()
    .default('FREE'),
  subscriptionStatus: varchar('subscription_status', { length: 50 })
    .notNull()
    .$type<SubscriptionStatus>()
    .default('TRIAL'),
  settings: jsonb('settings').$type<{
    businessName: string;
    businessEmail: string;
    businessPhone: string | null;
    businessAddress: string | null;
    timezone: string;
    locale: string;
    branding: {
      logo: string | null;
      primaryColor: string | null;
      secondaryColor: string | null;
    };
    notifications: {
      defaultChannel: string;
      emailEnabled: boolean;
      smsEnabled: boolean;
      whatsappEnabled: boolean;
    };
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;

