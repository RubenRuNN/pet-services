# Plan: Multi-Tenant Pet Services Management Platform

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Shadcn/ui
- **Styling**: TailwindCSS
- **Email**: Resend
- **Internationalization**: next-intl (English, Portuguese)
- **Code Quality**: Biome (linting & formatting)
- **Additional Services**: Twilio (SMS), Meta WhatsApp Cloud API (optional)

---

## 1. Project Foundation & Infrastructure Setup

### Next.js Configuration
- Update Next.js 16 configuration to support Server Actions (remove `output: 'export'` to enable dynamic rendering)
- Configure App Router structure with proper route organization
- Set up environment variable validation schema using Zod
- Configure image optimization and domains for external assets

### Development Tools
- Install and configure Biome for linting and formatting
- Set up TypeScript strict mode
- Configure path aliases (`@/` for cleaner imports)
- Set up pre-commit hooks (optional: Husky + lint-staged)

### Database Setup
- Install and configure Drizzle ORM with PostgreSQL adapter
- Set up database connection pooling
- Configure Drizzle migrations directory structure
- Create database connection utility with proper error handling
- Set up database connection string management (local, staging, production)

### UI Framework Setup
- Install and configure Shadcn/ui component library
- Set up TailwindCSS with custom theme configuration
- Configure CSS variables for theming (light/dark mode support)
- Create component library structure and custom components

### Third-Party Services
- Install Resend SDK for email notifications
- Install Twilio SDK for SMS notifications (optional)
- Install Meta WhatsApp Cloud API SDK for WhatsApp notifications (optional)
- Create environment variables configuration for all services
- Set up service abstraction layers for easy switching

---

## 2. Database Schema & Data Models

### Core Multi-Tenancy Tables
- **Tenants** table (business accounts with subscription status, settings, branding)
- **Users** table (staff, admin, customer portal users with role-based access and tenant_id)
- **Subscriptions** table (tenant subscription plans, billing cycles, status)

### Business Domain Tables
- **Customers** table (pet owners) with address, communication preferences, tenant_id
- **Pets** table (owned by customers) with vaccination status, allergies, medical notes, tenant_id
- **Services** table (grooming, walking, daycare/boarding service definitions with pricing, tenant_id)
- **Appointments** table (links pets, services, staff, time slots, status, tenant_id)
- **Staff** table (groomers, walkers with availability, capacity, tenant_id)
- **TaskTemplates** table (predefined checklists for different service types, tenant_id)
- **Tasks** table (task instances linked to appointments with completion status)
- **NotificationLogs** table (track sent notifications for compliance, tenant_id)
- **AuditLogs** table (track important actions for compliance and debugging, tenant_id)

### Supporting Tables
- **Files/Attachments** table (pet photos, documents with tenant_id and storage references)
- **Settings** table (tenant-specific configuration, tenant_id)
- **PaymentMethods** table (stored payment methods per tenant, tenant_id)

### Database Features
- Add all necessary indexes for performance (tenant_id, foreign keys, frequently queried fields)
- Set up foreign key constraints with proper cascade rules
- Implement Row Level Security (RLS) policies for multi-tenancy at database level
- Add soft delete support (deleted_at timestamps) for data retention
- Create database functions for common queries (if needed for performance)

---

## 3. Authentication & Authorization Layer

### NextAuth.js Setup
- Install and configure NextAuth.js v5 with PostgreSQL adapter (Drizzle)
- Set up authentication providers (email/password, OAuth options)
- Configure session management and JWT tokens
- Set up database schema for NextAuth tables (users, accounts, sessions, verification tokens)

### Multi-Tenancy Context
- Create tenant context provider to isolate data per business
- Implement tenant resolution middleware (from subdomain, custom domain, or session)
- Build tenant switching utilities (for super-admin scenarios)
- Create tenant isolation utilities for all database queries

### Role-Based Access Control (RBAC)
- Define roles: Super Admin, Tenant Admin, Staff Member, Customer
- Implement role-based permissions system
- Create authorization utilities to verify tenant ownership on all requests
- Build role-based UI component visibility controls
- Set up protected API routes using NextAuth middleware

### Authentication Flows
- Implement tenant sign-up flow (business owner registration with subscription)
- Implement staff/admin sign-in flow
- Implement customer portal authentication (email verification or magic link)
- Create password reset flow
- Build email verification flow for new accounts
- Implement session management and refresh tokens

### Security
- Add rate limiting for authentication endpoints
- Implement CSRF protection
- Set up secure cookie configuration
- Add IP-based security measures (optional)

---

## 4. Core UI Shell & Navigation

### Layout Components
- Create main app layout with responsive navigation
- Build admin/staff dashboard layout with sidebar navigation
- Create customer-facing portal layout (separate from admin)
- Implement tenant branding support (logos, colors, custom domain)

### Navigation & UI Components
- Build responsive sidebar navigation with role-based menu items
- Create responsive mobile menu with drawer component
- Implement breadcrumb navigation
- Set up toast notification system (using Sonner or Shadcn/ui toast)
- Create loading states and skeletons for better UX
- Build error boundary components

### Theming
- Implement theme support with dark/light modes
- Create theme toggle component
- Set up CSS variables for consistent theming
- Support tenant-specific color schemes (optional)

### Responsive Design
- Ensure mobile-first responsive design
- Test and optimize for tablet and desktop views
- Implement touch-friendly interactions for mobile

---

## 5. Customer & Pet Management Module

### Customer Management
- Build customer profile creation/edit form with validation
- Create customer list view with search, filtering, and pagination
- Implement customer detail view with appointment history
- Build customer communication preferences interface (SMS, WhatsApp, Email)
- Create customer address management
- Implement customer notes and tags system
- Build customer import/export functionality (CSV)

### Pet Management
- Build pet profile creation form (name, chip ID, breed, age, weight, gender)
- Create pet photo upload with image optimization (consider cloud storage: S3, Cloudinary, or Vercel Blob)
- Build vaccination status tracking interface with expiration dates
- Create allergy and medical notes section
- Implement pet behavior notes and special instructions
- Build pet list view with search, filtering, and grouping by customer
- Create pet detail view with full history
- Implement delete/archive functionality (soft delete)
- Add pet breed database/autocomplete

### Data Validation
- Create Zod schemas for all forms
- Implement client-side and server-side validation
- Build validation error display components
- Add form field validation feedback

---

## 6. Service & Appointment Management Module

### Service Catalog
- Build service catalog management interface (CRUD)
- Create service categories and types (grooming, walking, daycare, boarding)
- Implement service pricing management (fixed, hourly, custom)
- Add service duration configuration
- Create service description and image management
- Build service availability rules (time slots, days of week)

### Appointment Booking
- Create appointment booking form with date/time picker (using Shadcn/ui calendar)
- Implement time-slot availability checker based on staff capacity
- Build conflict detection and prevention
- Create appointment booking from customer portal
- Implement appointment booking from admin dashboard
- Add appointment notes and special instructions

### Appointment Management
- Build calendar view (day/week/month views) showing all appointments
- Create appointment list view with filtering and sorting
- Implement appointment status management (scheduled, confirmed, in-progress, completed, cancelled, no-show)
- Build appointment detail view with full information
- Create appointment edit/reschedule functionality
- Implement appointment cancellation with reason tracking
- Build recurring appointment scheduling interface
- Add appointment waitlist functionality

### Staff Assignment
- Build staff assignment interface for appointments
- Create automatic staff assignment based on availability and skills
- Implement manual staff reassignment
- Add staff conflict detection

---

## 7. Staff & Resource Scheduling Module

### Staff Management
- Build staff profile management interface
- Create staff role and permission assignment
- Implement staff skill/certification tracking
- Build staff performance metrics dashboard
- Create staff notes and evaluation system

### Availability & Scheduling
- Create staff availability calendar (set working hours and days off)
- Implement recurring availability patterns
- Build one-time availability overrides
- Create shift scheduling interface
- Implement capacity management (e.g., max 3 simultaneous grooming sessions per staff)
- Build staff workload visualization

### Performance Tracking
- Implement staff performance tracking (appointments completed, no-shows handled, customer ratings)
- Create staff productivity reports
- Build staff utilization metrics
- Add staff commission/tip tracking (if applicable)

---

## 8. Task & Workflow Templates Module

### Task Templates
- Build task template management interface
- Create grooming task template with predefined checklist items
- Create pet walking task template with route tracking fields
- Build daycare/boarding task template with feeding and activity schedules
- Implement custom task template creation
- Add task template categories and organization

### Task Execution
- Create task assignment to appointments
- Implement in-progress task tracking with photo/note updates
- Build task completion workflow with verification
- Create task checklist interface (checkboxes, photo uploads, notes)
- Implement task template versioning
- Add task completion time tracking

---

## 9. Notification Integration Layer

### Service Integration
- Set up Resend integration for email notifications
- Set up Twilio integration for SMS notifications (optional)
- Set up Meta Cloud API integration for WhatsApp notifications (optional)
- Create notification service abstraction layer (choose channel based on customer preference)
- Implement notification channel fallback (email if SMS fails)

### Notification Flows
- Build appointment confirmation notification (immediate)
- Build 24-hour pre-appointment reminder
- Build same-day reminder (2 hours before)
- Build completion notification ("Your pet is ready!")
- Build review/feedback request notification (post-completion)
- Create custom notification templates per tenant
- Build notification preference management per customer

### Notification Infrastructure
- Create notification queue system (handle failures and retries)
- Implement notification rate limiting
- Build notification history/logs interface
- Create notification analytics (delivery rates, open rates for email)
- Add notification template management
- Implement notification batching for efficiency

---

## 10. Dashboard & Analytics Module

### Main Dashboard
- Create main dashboard with key metrics cards
- Build real-time appointment status overview
- Create today's schedule widget
- Build upcoming appointments list
- Add quick action buttons

### Analytics & Reporting
- Build appointment count widget with time period filtering (day, week, month, year, custom)
- Create repeat customer tracking with customer list and visit history
- Build popular services analytics chart (bar/pie charts)
- Create staff productivity dashboard (appointments completed per staff member)
- Build revenue summary (appointments completed by service type with totals)
- Create appointment completion rate chart
- Build no-show rate analytics
- Create customer acquisition metrics
- Add export functionality for reports (CSV, PDF)

### Data Visualization
- Use chart library (Recharts, Chart.js, or similar) for visualizations
- Create interactive date range filtering for all analytics
- Build comparison views (this month vs last month)
- Add drill-down capabilities for detailed analysis

---

## 11. Subscription & Billing Module (SaaS Critical)

### Subscription Management
- Create subscription plan definitions (Free, Basic, Pro, Enterprise)
- Implement subscription signup flow during tenant creation
- Build subscription management interface (upgrade/downgrade)
- Create subscription status tracking (active, trial, cancelled, expired)
- Implement trial period management
- Add subscription renewal handling

### Billing Integration
- Integrate payment processor (Stripe recommended)
- Create payment method management
- Build invoice generation and history
- Implement automatic billing and renewal
- Create billing portal for tenants
- Add usage-based billing tracking (if applicable)

### Tenant Limits
- Implement feature flags based on subscription tier
- Create usage limits enforcement (appointments per month, staff members, etc.)
- Build limit warning notifications
- Add upgrade prompts when limits are reached

---

## 12. Settings & Configuration Module

### Tenant Settings
- Build tenant profile/settings page (business name, contact info)
- Create branding settings (logo, colors, custom domain)
- Implement business hours configuration
- Build notification settings (default channels, templates)
- Create tax and pricing settings
- Add timezone and locale configuration

### User Settings
- Build user profile settings page
- Create password change functionality
- Implement notification preferences
- Add two-factor authentication (optional)

### System Settings
- Create admin settings for super-admin
- Build system-wide configuration
- Implement feature toggles
- Add maintenance mode

---

## 13. API Layer & Server Actions

### Server Actions Organization
- Create Server Actions for customer CRUD operations
- Create Server Actions for pet management
- Create Server Actions for appointment operations (create, update, cancel, reschedule)
- Create Server Actions for staff scheduling and management
- Create Server Actions for notification triggers
- Create Server Actions for task/template operations
- Create Server Actions for analytics and reporting
- Create Server Actions for file uploads
- Create Server Actions for subscription/billing operations

### Error Handling & Validation
- Implement consistent error handling across all Server Actions
- Add Zod validation schemas for all inputs
- Create custom error types and error handling utilities
- Build error logging and monitoring
- Implement user-friendly error messages

### Security & Performance
- Add proper logging for audit trails and debugging
- Implement rate limiting on Server Actions
- Add request validation and sanitization
- Create database transaction handling for complex operations
- Implement caching strategies where appropriate
- Add query optimization and indexing review

---

## 14. File Storage & Media Management

### File Upload System
- Set up file storage solution (Vercel Blob, AWS S3, Cloudinary, or similar)
- Create file upload Server Actions with validation
- Implement image optimization and resizing
- Build file management interface
- Add file deletion and cleanup utilities
- Create secure file access URLs

### Media Organization
- Organize files by tenant and type (pet photos, documents, etc.)
- Implement file size limits and type restrictions
- Create file preview functionality
- Add bulk file operations

---

## 15. Customer Portal (Public-Facing)

### Portal Features
- Create customer self-service portal (separate from admin)
- Build customer login/authentication (magic link or password)
- Implement appointment booking interface for customers
- Create customer appointment history view
- Build pet profile management for customers
- Add customer communication preferences management
- Create customer invoice/payment history view

### Portal Design
- Design customer-friendly, branded interface
- Implement mobile-responsive customer portal
- Add customer support/contact functionality
- Create customer feedback/review submission

---

## 16. Testing & Quality Assurance

### Code Quality
- Set up Biome for linting and formatting
- Configure TypeScript strict mode validation
- Create utility functions for common operations
- Build reusable component library
- Add code documentation and JSDoc comments

### Error Handling
- Build error boundaries for graceful error handling
- Create global error handling middleware
- Implement user-friendly error pages (404, 500, etc.)
- Add error reporting and monitoring (Sentry or similar)

### Testing Strategy
- Set up environment validation on app startup
- Create test database setup and teardown
- Write unit tests for critical utilities
- Create integration tests for Server Actions
- Build E2E tests for critical user flows (optional)

### Data Management
- Prepare Drizzle migration scripts
- Create seed data for testing and development
- Build database backup and restore procedures
- Create data export/import utilities

---

## 17. Deployment & DevOps

### Environment Setup
- Configure development, staging, and production environments
- Set up environment variable management
- Create deployment scripts and documentation
- Configure database migrations for production

### Deployment Strategy
- Choose hosting platform (Vercel recommended for Next.js)
- Set up CI/CD pipeline (GitHub Actions, GitLab CI, etc.)
- Configure database hosting (Vercel Postgres, Supabase, Railway, or AWS RDS)
- Set up monitoring and logging (Vercel Analytics, Sentry, etc.)
- Create deployment rollback procedures

### Performance & Scaling
- Implement database connection pooling
- Set up CDN for static assets
- Configure caching strategies
- Add performance monitoring
- Plan for horizontal scaling if needed

### Security
- Set up SSL/TLS certificates
- Configure security headers
- Implement database backup automation
- Create disaster recovery plan
- Add security scanning and dependency updates

---

## 18. Documentation & Onboarding

### User Documentation
- Create user guides for each role (admin, staff, customer)
- Build in-app help tooltips and guides
- Create video tutorials (optional)
- Write FAQ section

### Developer Documentation
- Document codebase structure
- Create API documentation
- Write deployment guides
- Document environment setup

### Tenant Onboarding
- Create tenant onboarding flow
- Build welcome emails and setup guides
- Implement onboarding checklist
- Add sample data import for new tenants

---

## Priority Implementation Order

### Phase 1: Foundation (Weeks 1-2)
1. Project setup and infrastructure
2. Database schema and migrations
3. Authentication and multi-tenancy
4. Basic UI shell

### Phase 2: Core Features (Weeks 3-5)
5. Customer and pet management
6. Service and appointment management
7. Staff scheduling
8. Basic notifications

### Phase 3: Advanced Features (Weeks 6-8)
9. Task templates and workflows
10. Dashboard and analytics
11. Customer portal
12. Subscription and billing

### Phase 4: Polish & Launch (Weeks 9-10)
13. Settings and configuration
14. Testing and bug fixes
15. Documentation
16. Deployment and launch