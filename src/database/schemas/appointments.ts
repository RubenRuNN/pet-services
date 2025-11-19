import { pgTable, uuid, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { customers } from './customers';
import { pets } from './pets';
import { services } from './services';
import { staff } from './staff';
import type { AppointmentStatus } from '@/config/constants';

/**
 * Appointments table - Scheduled appointments
 */
export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id, { onDelete: 'cascade' }),
  petId: uuid('pet_id')
    .notNull()
    .references(() => pets.id, { onDelete: 'cascade' }),
  serviceId: uuid('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'restrict' }),
  staffId: uuid('staff_id').references(() => staff.id, { onDelete: 'set null' }),
  scheduledAt: timestamp('scheduled_at').notNull(),
  duration: integer('duration').notNull(), // Duration in minutes
  status: varchar('status', { length: 50 })
    .notNull()
    .$type<AppointmentStatus>()
    .default('SCHEDULED'),
  notes: text('notes'),
  cancellationReason: text('cancellation_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;

