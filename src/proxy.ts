import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/settings', '/games', '/game'];

export function proxy(request: NextRequest) {
  if (!isAuthenticated(request)) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some(
      route => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (isProtected) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
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
