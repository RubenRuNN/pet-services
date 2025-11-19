import { pgTable, uuid, text, timestamp, varchar, jsonb, boolean, integer } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import type { NotificationChannel } from '@/config/constants';

/**
 * NotificationLogs table - Track sent notifications for compliance
 */
export const notificationLogs = pgTable('notification_logs', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  channel: varchar('channel', { length: 50 })
    .notNull()
    .$type<NotificationChannel>(),
  recipient: varchar('recipient', { length: 255 }).notNull(), // Email, phone, etc.
  template: varchar('template', { length: 100 }).notNull(),
  subject: varchar('subject', { length: 500 }),
  content: text('content'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  sentAt: timestamp('sent_at').defaultNow().notNull(),
  delivered: boolean('delivered').default(false).notNull(),
  deliveredAt: timestamp('delivered_at'),
  error: text('error'),
  retryCount: integer('retry_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type NotificationLog = typeof notificationLogs.$inferSelect;
export type NewNotificationLog = typeof notificationLogs.$inferInsert;

