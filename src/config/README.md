# Configuration Directory

This directory contains all application configuration files, organized by concern.

## Files Overview

### `env.ts`
Environment variable validation and configuration using Zod. Ensures all required environment variables are present and valid at startup.

**Usage:**
```typescript
import { env } from '@/config/env';

// Access validated environment variables
const dbUrl = env.DATABASE_URL;
const appUrl = env.NEXT_PUBLIC_APP_URL;
```

### `routes.ts`
Centralized route definitions for consistent navigation and routing throughout the application.

**Usage:**
```typescript
import { routes } from '@/config/routes';

// Use route constants
const customerUrl = routes.dashboard.customers;
const detailUrl = routes.dashboard.customerDetail('123');
```

### `constants.ts`
Application-wide constants including:
- User roles and permissions
- Status enums (appointments, tasks, subscriptions)
- Service types
- Notification channels
- File upload limits
- Date formats
- Business hours defaults

**Usage:**
```typescript
import { USER_ROLES, APPOINTMENT_STATUS, PERMISSIONS } from '@/config/constants';

if (user.role === USER_ROLES.ADMIN) {
  // ...
}
```

### `database.ts`
Database connection configuration using Drizzle ORM and PostgreSQL.

**Usage:**
```typescript
import { db } from '@/config/database';

// Use db for queries
const customers = await db.select().from(customersTable);
```

### `app.ts`
Application-wide settings and feature flags.

**Usage:**
```typescript
import { appConfig } from '@/config/app';

if (appConfig.features.smsNotifications) {
  // Enable SMS features
}
```

### `api.ts`
API configuration including error codes, response types, and helper functions for standardized API responses.

**Usage:**
```typescript
import { createSuccessResponse, createErrorResponse } from '@/config/api';

return createSuccessResponse(data, { page: 1, total: 100 });
```

### `index.ts`
Barrel export for convenient imports from the config directory.

**Usage:**
```typescript
import { env, routes, constants, db, appConfig } from '@/config';
```

## Best Practices

1. **Always use config files** - Don't hardcode values, use these centralized configs
2. **Type safety** - All configs are fully typed for better IDE support
3. **Environment validation** - Environment variables are validated at startup
4. **Single source of truth** - Routes, constants, and settings are defined once here
5. **Feature flags** - Use `appConfig.features` to enable/disable features

## Adding New Configuration

1. Create a new file in this directory (e.g., `new-config.ts`)
2. Export your configuration with proper TypeScript types
3. Add to `index.ts` for barrel export
4. Document usage in this README

