import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    
    // Temporary debug logs
    console.log('pathname:', pathname);
    console.log('cookie value:', adminToken);
    console.log('env key:', process.env.ADMIN_SECRET_KEY);
    console.log('match:', adminToken === process.env.ADMIN_SECRET_KEY);

    if (adminToken !== process.env.ADMIN_SECRET_KEY) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};