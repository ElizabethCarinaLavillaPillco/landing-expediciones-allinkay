import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // Supported locales
    locales: ['es', 'en', 'pt'],

    // Default locale
    defaultLocale: 'es',

    // Locale detection
    localeDetection: true,
});

export const config = {
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /images (static files)
    matcher: ['/((?!api|_next|_vercel|images|videos|favicon.ico).*)'],
};
