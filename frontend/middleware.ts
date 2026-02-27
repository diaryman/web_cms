import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || '';
    const url = request.nextUrl.clone();

    // Check if the request is for the PDPA site (port 3004 or pdpa domain)
    const isPDPASite = host.includes(':3004') || host.includes('pdpa');

    // Check if the request is for the DataGOV site (port 3002 or main domain)
    const isDataGovSite = host.includes(':3002') || (!isPDPASite && host.includes('localhost'));

    // 1. If accessing DataGOV (3002) and trying to access /pdpa anything
    if (isDataGovSite && url.pathname.startsWith('/pdpa')) {
        // Redirect to DataGOV home
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // 2. If accessing PDPA (3004)
    if (isPDPASite) {
        // If they access the raw /pdpa path directly, redirect to remove /pdpa from URL
        if (url.pathname === '/pdpa') {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
        if (url.pathname.startsWith('/pdpa/')) {
            url.pathname = url.pathname.replace('/pdpa', '');
            return NextResponse.redirect(url);
        }

        // --- Rewrites for clean URLs ---

        // Root path rewrites to /pdpa
        if (url.pathname === '/') {
            url.pathname = '/pdpa';
            return NextResponse.rewrite(url);
        }

        // Documents and Contact belong to PDPA specific pages
        if (url.pathname.startsWith('/documents')) {
            url.pathname = url.pathname.replace('/documents', '/pdpa/documents');
            return NextResponse.rewrite(url);
        }

        if (url.pathname.startsWith('/contact')) {
            url.pathname = url.pathname.replace('/contact', '/pdpa/contact');
            return NextResponse.rewrite(url);
        }

        // Set site query param for shared pages like /news without needing ?site=pdpa explicitly
        if (!url.searchParams.has('site') && !url.pathname.startsWith('/admin') && !url.pathname.match(/\.(.*)$/)) {
            url.searchParams.set('site', 'pdpa');
            return NextResponse.rewrite(url);
        }
    } else if (isDataGovSite) {
        // For DataGOV, explicitly set site param for consistency
        if (!url.searchParams.has('site') && !url.pathname.startsWith('/admin') && !url.pathname.match(/\.(.*)$/)) {
            url.searchParams.set('site', 'main');
            return NextResponse.rewrite(url);
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
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
