import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

/**
 * Passwords table - Store hashed passwords separately for security
 * This allows us to keep password data separate from user data
 */
export const passwords = pgTable('passwords', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  hash: text('hash').notNull(), // bcrypt hashed password
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Password = typeof passwords.$inferSelect;
export type NewPassword = typeof passwords.$inferInsert;

