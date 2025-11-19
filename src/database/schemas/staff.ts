import { pgTable, uuid, timestamp, varchar, integer, jsonb } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { users } from './users';

/**
 * Staff table - Staff members (groomers, walkers, etc.)
 */
export const staff = pgTable('staff', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 100 }).notNull(), // Groomer, Walker, etc.
  skills: jsonb('skills').$type<string[]>().default([]),
  maxCapacity: integer('max_capacity').default(1).notNull(), // Max simultaneous appointments
  availability: jsonb('availability').$type<{
    monday: { start: string; end: string; closed: boolean } | null;
    tuesday: { start: string; end: string; closed: boolean } | null;
    wednesday: { start: string; end: string; closed: boolean } | null;
    thursday: { start: string; end: string; closed: boolean } | null;
    friday: { start: string; end: string; closed: boolean } | null;
    saturday: { start: string; end: string; closed: boolean } | null;
    sunday: { start: string; end: string; closed: boolean } | null;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type Staff = typeof staff.$inferSelect;
export type NewStaff = typeof staff.$inferInsert;

