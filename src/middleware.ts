import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) return NextResponse.next();

  if (pathname === '/') return NextResponse.next();

  return NextResponse.redirect(new URL('/', request.url));
}
