import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  compress: true,
  productionBrowserSourceMaps: false,

  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
    optimizePackageImports: ['lucide-react', 'motion'],
  },

  images: {
    remotePatterns: [
      // Local Strapi backend (dev) — localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Local Strapi backend (dev) — 127.0.0.1 (Node resolves differently)
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Production Strapi (when deployed)
      {
        protocol: 'https',
        hostname: '*.admincourt.go.th',
        pathname: '/uploads/**',
      },
      // Allow any HTTPS source for URL-based images
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 128, 256],
  },
};

export default nextConfig;
