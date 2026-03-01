import type { NextConfig } from "next";

// ── HTTP Security Headers (DGA Website Standard v3.0 / NCSA / OWASP) ─────────
const securityHeaders = [
  {
    // Prevent clickjacking — OWASP A05
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Prevent MIME type sniffing — OWASP A05
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Control referrer information — Privacy
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Limit browser features — Privacy + Security
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Force HTTPS (set lower max-age for dev, increase for production)
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Legacy XSS protection for older browsers
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  compress: true,
  productionBrowserSourceMaps: false,

  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

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
