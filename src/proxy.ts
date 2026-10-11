import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/settings', '/games', '/game'];
const authRoutes = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAuthenticated(request)) {
    const isAuthRoute = authRoutes.some(
      route => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (isAuthRoute) {
      const logoutUrl = new URL('/logout', request.url);
      return NextResponse.redirect(logoutUrl);
    }

    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtected) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons/ (app icons)
     * - manifest.json (web app manifest)
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.json).*)',
  ],
};

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get('hasToken')?.value === 'true';
}
