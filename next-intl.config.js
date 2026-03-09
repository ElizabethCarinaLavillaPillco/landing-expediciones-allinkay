// next-intl.config.js
module.exports = {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    localeDetection: {
        enabled: true,
        fallbackLocale: 'es',
        cookieName: 'next-intl-locale'
    }
};