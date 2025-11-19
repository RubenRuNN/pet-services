import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/config';
import { routes, requiresAuth } from '@/config/routes';
import { appConfig } from '@/config/app';

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  locales: appConfig.i18n.locales,
  defaultLocale: appConfig.i18n.defaultLocale,
  localePrefix: 'as-needed', // Only show locale prefix when not default
});

/**
 * Proxy for Next.js 16
 * Handles:
 * - Internationalization (next-intl)
 * - Authentication checks
 * - Tenant resolution
 * - Route protection
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip i18n middleware for API routes
  if (pathname.startsWith('/api/')) {
    // API routes don't need i18n processing
    return NextResponse.next();
  }

  // Handle internationalization for page routes
  const response = intlMiddleware(request);

  // Public routes that don't require authentication
  const publicRoutes = [
    routes.home,
    routes.signIn,
    routes.signUp,
    routes.forgotPassword,
    routes.resetPassword,
  ];

  // Check if route is public (excluding locale prefix)
  const pathWithoutLocale = pathname.replace(/^\/(en|pt)/, '') || pathname;
  const isPublicRoute = publicRoutes.some((route) => pathWithoutLocale.startsWith(route));

  // Allow public routes
  if (isPublicRoute) {
    return response;
  }

  // Check authentication for protected routes
  const session = await auth();

  if (!session) {
    // Redirect to sign-in if not authenticated
    const locale = pathname.split('/')[1] || appConfig.i18n.defaultLocale;
    const signInUrl = new URL(`/${locale}${routes.signIn}`, request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // TODO: Add tenant resolution logic here
  // For now, just allow authenticated users

  return response;
}

// Matcher configuration for Next.js 16 proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
