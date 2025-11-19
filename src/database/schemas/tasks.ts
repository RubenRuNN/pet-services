import { pgTable, uuid, text, timestamp, varchar, jsonb, boolean } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { appointments } from './appointments';
import type { ServiceType, TaskStatus } from '@/config/constants';

/**
 * TaskTemplates table - Predefined task templates for services
 */
export const taskTemplates = pgTable('task_templates', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  serviceType: varchar('service_type', { length: 50 })
    .notNull()
    .$type<ServiceType>(),
  checklist: jsonb('checklist').$type<
    Array<{
      id: string;
      label: string;
      required: boolean;
      order: number;
    }>
  >().default([]),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

/**
 * Tasks table - Task instances linked to appointments
 */
export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  appointmentId: uuid('appointment_id')
    .notNull()
    .references(() => appointments.id, { onDelete: 'cascade' }),
  templateId: uuid('template_id'), // Optional reference to template
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 })
    .notNull()
    .$type<TaskStatus>()
    .default('PENDING'),
  completedAt: timestamp('completed_at'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type TaskTemplate = typeof taskTemplates.$inferSelect;
export type NewTaskTemplate = typeof taskTemplates.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

