import { pgTable, uuid, text, timestamp, varchar, decimal, jsonb } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { customers } from './customers';

/**
 * Pets table - Pet information
 */
export const pets = pgTable('pets', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  species: varchar('species', { length: 100 }).notNull(), // Dog, Cat, etc.
  breed: varchar('breed', { length: 255 }),
  gender: varchar('gender', { length: 20 }).$type<'MALE' | 'FEMALE' | 'UNKNOWN'>(),
  dateOfBirth: timestamp('date_of_birth'),
  weight: decimal('weight', { precision: 5, scale: 2 }), // in kg or lbs
  chipId: varchar('chip_id', { length: 100 }),
  photo: varchar('photo', { length: 500 }), // URL to photo
  vaccinationStatus: jsonb('vaccination_status').$type<{
    rabies: { vaccinated: boolean; expirationDate: string | null };
    dhpp: { vaccinated: boolean; expirationDate: string | null };
    bordatella: { vaccinated: boolean; expirationDate: string | null };
    other: Array<{ name: string; vaccinated: boolean; expirationDate: string | null }>;
  }>(),
  allergies: jsonb('allergies').$type<string[]>().default([]),
  medicalNotes: text('medical_notes'),
  behaviorNotes: text('behavior_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type Pet = typeof pets.$inferSelect;
export type NewPet = typeof pets.$inferInsert;

