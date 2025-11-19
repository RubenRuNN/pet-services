/**
 * Application Routes Configuration
 * Centralized route definitions for consistent navigation and routing
 */

export const routes = {
  // Public Routes
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',

  // Admin/Staff Dashboard Routes
  dashboard: {
    root: '/dashboard',
    overview: '/dashboard',
    customers: '/dashboard/customers',
    customerDetail: (id: string) => `/dashboard/customers/${id}`,
    customerNew: '/dashboard/customers/new',
    pets: '/dashboard/pets',
    petDetail: (id: string) => `/dashboard/pets/${id}`,
    petNew: '/dashboard/pets/new',
    appointments: '/dashboard/appointments',
    appointmentDetail: (id: string) => `/dashboard/appointments/${id}`,
    appointmentNew: '/dashboard/appointments/new',
    calendar: '/dashboard/calendar',
    services: '/dashboard/services',
    serviceDetail: (id: string) => `/dashboard/services/${id}`,
    serviceNew: '/dashboard/services/new',
    staff: '/dashboard/staff',
    staffDetail: (id: string) => `/dashboard/staff/${id}`,
    staffNew: '/dashboard/staff/new',
    tasks: '/dashboard/tasks',
    taskTemplates: '/dashboard/tasks/templates',
    analytics: '/dashboard/analytics',
    settings: '/dashboard/settings',
    subscription: '/dashboard/subscription',
    notifications: '/dashboard/notifications',
  },

  // Customer Portal Routes
  portal: {
    root: '/portal',
    dashboard: '/portal',
    appointments: '/portal/appointments',
    appointmentDetail: (id: string) => `/portal/appointments/${id}`,
    appointmentNew: '/portal/appointments/new',
    pets: '/portal/pets',
    petDetail: (id: string) => `/portal/pets/${id}`,
    petNew: '/portal/pets/new',
    profile: '/portal/profile',
    settings: '/portal/settings',
    invoices: '/portal/invoices',
    invoiceDetail: (id: string) => `/portal/invoices/${id}`,
  },

  // API Routes
  api: {
    auth: {
      signIn: '/api/auth/signin',
      signOut: '/api/auth/signout',
      callback: '/api/auth/callback',
      session: '/api/auth/session',
    },
    customers: '/api/customers',
    pets: '/api/pets',
    appointments: '/api/appointments',
    services: '/api/services',
    staff: '/api/staff',
    tasks: '/api/tasks',
    notifications: '/api/notifications',
    upload: '/api/upload',
    analytics: '/api/analytics',
  },
} as const;

/**
 * Route groups for navigation and access control
 */
export const routeGroups = {
  public: [routes.home, routes.signIn, routes.signUp, routes.forgotPassword, routes.resetPassword],
  admin: [
    routes.dashboard.root,
    routes.dashboard.customers,
    routes.dashboard.pets,
    routes.dashboard.appointments,
    routes.dashboard.services,
    routes.dashboard.staff,
    routes.dashboard.tasks,
    routes.dashboard.analytics,
    routes.dashboard.settings,
    routes.dashboard.subscription,
  ],
  staff: [
    routes.dashboard.root,
    routes.dashboard.appointments,
    routes.dashboard.calendar,
    routes.dashboard.tasks,
  ],
  customer: [
    routes.portal.root,
    routes.portal.appointments,
    routes.portal.pets,
    routes.portal.profile,
    routes.portal.settings,
  ],
} as const;

/**
 * Check if a route requires authentication
 */
export function requiresAuth(pathname: string): boolean {
  return !routeGroups.public.includes(pathname as any);
}

/**
 * Get route metadata for breadcrumbs and navigation
 */
export const routeMetadata: Record<string, { label: string; parent?: string }> = {
  [routes.dashboard.root]: { label: 'Dashboard' },
  [routes.dashboard.customers]: { label: 'Customers', parent: routes.dashboard.root },
  [routes.dashboard.pets]: { label: 'Pets', parent: routes.dashboard.root },
  [routes.dashboard.appointments]: { label: 'Appointments', parent: routes.dashboard.root },
  [routes.dashboard.services]: { label: 'Services', parent: routes.dashboard.root },
  [routes.dashboard.staff]: { label: 'Staff', parent: routes.dashboard.root },
  [routes.dashboard.tasks]: { label: 'Tasks', parent: routes.dashboard.root },
  [routes.dashboard.analytics]: { label: 'Analytics', parent: routes.dashboard.root },
  [routes.dashboard.settings]: { label: 'Settings', parent: routes.dashboard.root },
};

