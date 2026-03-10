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
        hostname: 'api.expedicionesallinkay.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'otra-web-de-fotos.com',
      }
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