import { AUTH_COOKIE } from '@/app/(auth)/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(AUTH_COOKIE)?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};
