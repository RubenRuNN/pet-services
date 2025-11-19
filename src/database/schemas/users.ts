import { pgTable, uuid, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import type { UserRole } from '@/config/constants';

/**
 * Users table - NextAuth users with multi-tenant support
 * This extends NextAuth's user schema with tenant_id and role
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('email_verified'),
  image: varchar('image', { length: 500 }),
  role: varchar('role', { length: 50 })
    .notNull()
    .$type<UserRole>()
    .default('CUSTOMER'),
  tenantId: uuid('tenant_id'), // Reference to tenants.id (defined separately to avoid circular dependency)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

/**
 * NextAuth accounts table - OAuth provider accounts (Google, GitHub, etc.)
 * 
 * NOTE: This table is only needed if you plan to use OAuth providers.
 * For Credentials and Email providers, this table is not used.
 * 
 * If you're not planning to use OAuth, you can remove this table entirely.
 * Must match @auth/drizzle-adapter expected schema exactly if used.
 * Note: This table does not include createdAt/updatedAt as they're not part of NextAuth's standard schema
 */
export const accounts = pgTable(
  'accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: timestamp('expires_at'),
    tokenType: varchar('token_type', { length: 255 }),
    scope: text('scope'),
    idToken: text('id_token'),
    sessionState: text('session_state'),
  },
  (table) => ({
    compoundKey: { primaryKey: { columns: [table.provider, table.providerAccountId] } },
  }),
);

/**
 * NextAuth sessions table
 */
export const sessions = pgTable('sessions', {
  sessionToken: varchar('session_token', { length: 255 }).primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * NextAuth verification tokens table
 */
export const verificationTokens = pgTable('verification_tokens', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  pk: { primaryKey: { columns: [table.identifier, table.token] } },
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

