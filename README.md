# Pet Services - Multi-Tenant SaaS Platform

A comprehensive multi-tenant SaaS platform for pet services businesses (grooming, walking, daycare, boarding).

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Shadcn/ui
- **Styling**: TailwindCSS
- **Email**: Resend
- **Code Quality**: Biome (linting & formatting)
- **Additional Services**: Twilio (SMS), Meta WhatsApp Cloud API (optional)

## 📁 Project Structure

This project follows a well-organized structure with centralized configuration. See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation.

### Key Features

- ✅ **Multi-tenant Architecture**: Isolated data per business
- ✅ **Role-Based Access Control**: Admin, Staff, and Customer roles
- ✅ **Comprehensive Configuration**: Centralized config files in `/src/config`
- ✅ **Type Safety**: Full TypeScript support with strict mode
- ✅ **Modern Stack**: Next.js 16, Server Actions, App Router
- ✅ **Beautiful UI**: Shadcn/ui components with TailwindCSS

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pet-services
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Database connection string
- NextAuth secret (generate a secure random string)
- Resend API key
- Other service API keys (optional)

4. Set up the database:
```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Biome
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:push` - Push schema changes to database

## 📚 Configuration

All configuration is centralized in `/src/config`:

- **`env.ts`**: Environment variable validation
- **`routes.ts`**: Route definitions and navigation
- **`constants.ts`**: Roles, permissions, statuses, enums
- **`database.ts`**: Database connection setup
- **`app.ts`**: App settings and feature flags
- **`api.ts`**: API configuration

See [src/config/README.md](./src/config/README.md) for detailed documentation.

## 🏗️ Architecture

### Multi-Tenancy

The platform supports multiple pet service businesses, each with:
- Isolated data (customers, pets, appointments)
- Custom branding and settings
- Subscription-based access
- Role-based permissions

### Authentication & Authorization

- NextAuth.js v5 for authentication
- Role-based access control (RBAC)
- Tenant isolation middleware
- Protected routes and API endpoints

### Database

- PostgreSQL with Drizzle ORM
- Row-level security for multi-tenancy
- Migrations managed with Drizzle Kit
- Type-safe queries

## 📖 Documentation

- [Project Plan](./plan.md) - Detailed implementation plan
- [Project Structure](./PROJECT_STRUCTURE.md) - Directory structure and organization
- [Configuration Guide](./src/config/README.md) - Config files documentation

## 🚧 Development Status

This project is in active development. See [plan.md](./plan.md) for the implementation roadmap.

## 📝 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]
