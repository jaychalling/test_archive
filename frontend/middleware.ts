import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';

    // Handle 2026puritytest.com redirection
    if (host.includes('2026puritytest.com')) {
        // If they are not already on the destination page, redirect them to the main domain's test page
        if (!pathname.startsWith('/test/rice-purity') && !pathname.startsWith('/_next') && !pathname.includes('favicon.ico')) {
            return NextResponse.redirect('https://www.test-archive.com/test/rice-purity', 307);
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
