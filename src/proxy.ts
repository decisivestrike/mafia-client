import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/settings', '/games', '/game', '/logout'];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get('hasToken')?.value === 'true';
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAuthenticated(request)) {
    const gameId = request.cookies.get('gameId')?.value;

    if (gameId !== undefined && !pathname.startsWith(`/game/${gameId}`)) {
      return NextResponse.redirect(new URL(`/game/${gameId}`, request.url));
    }

    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/logout', request.url));
    }

    return NextResponse.next();
  }

  if (isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
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
