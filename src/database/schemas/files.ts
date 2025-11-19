import { pgTable, uuid, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';

/**
 * Files table - Pet photos, documents, and other attachments
 */
export const files = pgTable('files', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  originalFileName: varchar('original_file_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  size: integer('size').notNull(), // Size in bytes
  url: varchar('url', { length: 500 }).notNull(), // Storage URL
  storageKey: varchar('storage_key', { length: 500 }), // Storage provider key
  entityType: varchar('entity_type', { length: 100 }), // pet, customer, appointment, etc.
  entityId: uuid('entity_id'), // Reference to the entity this file belongs to
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;

