import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host');

    // Handle 2026puritytest.com redirection
    if (host === '2026puritytest.com' || host === 'www.2026puritytest.com') {
        // Redirect to the rice-purity test if not already there
        if (!url.pathname.startsWith('/test/rice-purity')) {
            url.pathname = '/test/rice-purity';
            // Use permanent redirect (308) to match previous behavior if desired, 
            // but 307 is safer while debugging. Let's use 307 for now.
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
