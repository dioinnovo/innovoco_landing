import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Mark packages that should be external (not bundled) to avoid ESM issues
  serverExternalPackages: ['jsdom', 'parse5', 'isomorphic-dompurify', 'dompurify'],
  experimental: {
    scrollRestoration: true,
  },
  // Configure webpack to handle ESM modules properly
  webpack: (config, { isServer }) => {
    // Handle ESM packages in server-side
    if (isServer) {
      config.externals = config.externals || [];
      // Make problematic packages external on the server
      if (Array.isArray(config.externals)) {
        config.externals.push({
          'isomorphic-dompurify': 'commonjs isomorphic-dompurify',
          'jsdom': 'commonjs jsdom',
          'parse5': 'commonjs parse5',
        });
      }
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  headers: async () => {
    return [
      {
        // All Next.js static assets with immutable cache
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Images and other static media
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Fonts
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // All other static files (fallback)
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
