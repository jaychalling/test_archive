import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';

    // Handle 2026puritytest.com redirection
    if (host.includes('2026puritytest.com')) {
        // Redirect to the rice-purity test if not already there and not an internal Next.js request
        if (!pathname.startsWith('/test/rice-purity') && !pathname.startsWith('/_next') && !pathname.includes('favicon.ico')) {
            const url = request.nextUrl.clone();
            url.pathname = '/test/rice-purity';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
