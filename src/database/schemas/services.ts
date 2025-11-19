import { pgTable, uuid, text, timestamp, varchar, decimal, integer, boolean } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import type { ServiceType } from '@/config/constants';

/**
 * Services table - Service catalog (grooming, walking, daycare, etc.)
 */
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 })
    .notNull()
    .$type<ServiceType>(),
  duration: integer('duration').notNull(), // Duration in minutes
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

