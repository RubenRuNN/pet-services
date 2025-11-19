import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from './env';
import * as schema from '@/database/schemas';

/**
 * Database connection configuration
 */
const connectionString = env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// Create postgres client with connection pooling
const client = postgres(connectionString, {
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // Close idle clients after 20 seconds
  connect_timeout: 10, // Connection timeout in seconds
});

/**
 * Drizzle ORM instance
 * Use this for all database operations
 */
export const db = drizzle(client, { schema });

/**
 * Database connection utilities
 */
export const database = {
  /**
   * Test database connection
   */
  async testConnection(): Promise<boolean> {
    try {
      await client`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  },

  /**
   * Close database connection
   * Useful for cleanup in tests or graceful shutdown
   */
  async close(): Promise<void> {
    await client.end();
  },
};

export default db;

