import { pgTable, uuid, text, timestamp, varchar, jsonb } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import type { NotificationChannel } from '@/config/constants';

/**
 * Customers table - Pet owners
 */
export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  address: jsonb('address').$type<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>(),
  communicationPreferences: jsonb('communication_preferences')
    .$type<{
      email: boolean;
      sms: boolean;
      whatsapp: boolean;
      preferredChannel: NotificationChannel;
    }>()
    .default({
      email: true,
      sms: false,
      whatsapp: false,
      preferredChannel: 'EMAIL',
    }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

