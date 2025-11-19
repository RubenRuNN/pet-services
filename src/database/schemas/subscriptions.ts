import { pgTable, uuid, timestamp, varchar, boolean, integer } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import type { SubscriptionPlan, SubscriptionStatus } from '@/config/constants';

/**
 * Subscriptions table - Tenant subscription management
 */
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  plan: varchar('plan', { length: 50 })
    .notNull()
    .$type<SubscriptionPlan>(),
  status: varchar('status', { length: 50 })
    .notNull()
    .$type<SubscriptionStatus>(),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripePriceId: varchar('stripe_price_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

