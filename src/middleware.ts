import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/config';
import { routes } from '@/config/routes';

/**
 * Middleware for:
 * - Authentication checks
 * - Tenant resolution
 * - Route protection
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    routes.home,
    routes.signIn,
    routes.signUp,
    routes.forgotPassword,
    routes.resetPassword,
  ];

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Allow public routes and API auth routes
  if (isPublicRoute || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const session = await auth();

  if (!session) {
    // Redirect to sign-in if not authenticated
    const signInUrl = new URL(routes.signIn, request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // TODO: Add tenant resolution logic here
  // For now, just allow authenticated users

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

