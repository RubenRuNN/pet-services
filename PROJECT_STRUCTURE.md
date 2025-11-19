# Project Structure

This document outlines the well-organized structure of the Pet Services SaaS platform.

## Directory Structure

```
pet-services/
├── .next/                    # Next.js build output (gitignored)
├── drizzle/                  # Drizzle migrations (gitignored)
├── node_modules/             # Dependencies (gitignored)
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router pages and layouts
│   │   ├── (auth)/           # Auth route group
│   │   ├── (dashboard)/      # Dashboard route group
│   │   ├── (portal)/         # Customer portal route group
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   ├── forms/            # Form components
│   │   └── features/         # Feature-specific components
│   ├── config/               # Configuration files ⭐
│   │   ├── env.ts            # Environment variables
│   │   ├── routes.ts         # Route definitions
│   │   ├── constants.ts      # App-wide constants
│   │   ├── database.ts       # Database config
│   │   ├── app.ts            # App settings & feature flags
│   │   ├── api.ts            # API configuration
│   │   ├── index.ts          # Barrel export
│   │   └── README.md         # Config documentation
│   ├── database/             # Database layer
│   │   ├── schemas/          # Drizzle schemas
│   │   │   ├── tenants.ts
│   │   │   ├── users.ts
│   │   │   ├── customers.ts
│   │   │   ├── pets.ts
│   │   │   └── index.ts
│   │   └── migrations/       # Database migrations
│   ├── lib/                  # Utility libraries
│   │   ├── auth/             # Auth utilities
│   │   ├── db/               # Database utilities
│   │   ├── utils/            # General utilities
│   │   └── validations/      # Zod schemas
│   ├── hooks/                # React hooks
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── actions/              # Server Actions
│   │   ├── customers/
│   │   ├── pets/
│   │   ├── appointments/
│   │   └── ...
│   └── middleware.ts         # Next.js middleware
├── .env.local                # Environment variables (gitignored)
├── .env.example              # Example env file
├── .gitignore
├── biome.json                # Biome linter/formatter config
├── drizzle.config.ts         # Drizzle ORM config
├── next.config.js            # Next.js config
├── package.json
├── postcss.config.js
├── tailwind.config.ts        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── plan.md                   # Project plan
├── PROJECT_STRUCTURE.md      # This file
└── README.md
```

## Key Directories

### `/src/config` ⭐
**Purpose**: Centralized configuration management

Contains all application configuration files:
- **env.ts**: Environment variable validation
- **routes.ts**: Route definitions and navigation
- **constants.ts**: Roles, permissions, statuses, enums
- **database.ts**: Database connection setup
- **app.ts**: App settings and feature flags
- **api.ts**: API configuration and response helpers

**Why**: Single source of truth for all configuration, making the codebase maintainable and consistent.

### `/src/app`
**Purpose**: Next.js App Router pages and API routes

Follows Next.js 16 App Router conventions:
- Route groups: `(auth)`, `(dashboard)`, `(portal)`
- API routes: `/api/*`
- Layouts: Shared layouts per route group

### `/src/components`
**Purpose**: Reusable React components

Organized by concern:
- **ui/**: Shadcn/ui base components
- **layout/**: Layout components (sidebar, header, etc.)
- **forms/**: Form components
- **features/**: Feature-specific components

### `/src/database`
**Purpose**: Database layer

- **schemas/**: Drizzle ORM table definitions
- **migrations/**: Database migration files

### `/src/actions`
**Purpose**: Server Actions

Organized by domain (customers, pets, appointments, etc.). Each domain has its own directory with related Server Actions.

### `/src/lib`
**Purpose**: Utility libraries and helpers

- **auth/**: Authentication utilities
- **db/**: Database query helpers
- **utils/**: General utilities
- **validations/**: Zod validation schemas

## Configuration Files

### Root Level Configs
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration with path aliases
- `next.config.js`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS theming
- `biome.json`: Linting and formatting rules
- `drizzle.config.ts`: Database ORM configuration

### Environment Variables
- `.env.local`: Local development variables (gitignored)
- `.env.example`: Example environment variables template

## Path Aliases

Configured in `tsconfig.json` for cleaner imports:

```typescript
import { env } from '@/config/env';
import { routes } from '@/config/routes';
import { db } from '@/config/database';
import { Button } from '@/components/ui/button';
```

Available aliases:
- `@/*` → `./src/*`
- `@/config/*` → `./src/config/*`
- `@/lib/*` → `./src/lib/*`
- `@/components/*` → `./src/components/*`
- `@/app/*` → `./src/app/*`
- `@/types/*` → `./src/types/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/utils/*` → `./src/utils/*`

## Best Practices

1. **Use Config Files**: Always import from `@/config` instead of hardcoding values
2. **Type Safety**: Leverage TypeScript types from config files
3. **Consistent Imports**: Use path aliases for all imports
4. **Organized Components**: Group components by feature/concern
5. **Server Actions**: Keep Server Actions close to their domain
6. **Database Schemas**: One schema file per domain entity

## Next Steps

1. Set up database schemas in `/src/database/schemas`
2. Create authentication setup in `/src/lib/auth`
3. Build UI components in `/src/components`
4. Implement Server Actions in `/src/actions`
5. Create pages in `/src/app`

