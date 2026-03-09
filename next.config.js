// next.config.js
const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.travelagency.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  // Enable compression
  compress: true,

  // Optimize fonts
  optimizeFonts: true,

  // Experimental features
  experimental: {
    optimizeCss: true,
  },
};

module.exports = withNextIntl(nextConfig);