import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('MIDDLEWARE RUNNING:', pathname);

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    
    console.log('token:', adminToken);
    console.log('expected:', process.env.ADMIN_SECRET_KEY);

    if (adminToken !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  return response;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],  // add /admin without the slash
};