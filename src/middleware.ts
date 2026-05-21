import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sadece /admin rotalarını koru
  if (pathname.startsWith('/admin')) {
    // Eğer zaten login sayfasındaysa, yönlendirme yapma
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // "admin_token" çerezini kontrol et
    const adminToken = request.cookies.get('admin_token')?.value;
    
    // Doğru token yoksa login sayfasına at
    if (adminToken !== process.env.ADMIN_PASSWORD) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
