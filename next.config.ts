import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Recompile next-auth with the app compiler so Webpack dev does not break SWC helper interop
  // (fixes "_interop_require_wildcard._ is not a function" / invalid element type in browser).
  transpilePackages: ["next-auth"],
  // Next.js 16: explicit empty turbopack root config (see dev script)
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sitemap",
        destination: "/site-map",
        permanent: true,
      },
    ];
  },
  // Quality gate: `package.json` `build` runs `npm run check` (eslint + tsc) then `next build`.
  // `next build` runs TypeScript again — keep ignoreBuildErrors false so bad types fail deploys.
  typescript: {
    ignoreBuildErrors: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Mark packages that should be external (not bundled) to avoid ESM issues
  serverExternalPackages: ['jsdom', 'parse5', 'isomorphic-dompurify', 'dompurify'],
  experimental: {},
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

    // Exclude langgraph_env from being watched/compiled
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: '**/langgraph_env/**',
    };

    return config;
  },
  images: {
    // Next.js 16: local `next/image` src must match a pattern. Include all of `public/`:
    // `/images/**` plus root-level assets (e.g. /google-cloud-premier-partner-1.webp).
    // Omit `search` on patterns so `?v=*` cache bust still works under /images/industries/.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/*" }],
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Prod: long-lived optimizer cache (CDN-friendly). Dev: no minimum TTL so replaced files
    // in `public/` show up without clearing `.next/cache/images` (headers() is already dev-only).
    minimumCacheTTL: isProd ? 31536000 : 0,
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
  // Custom Cache-Control on /_next/static breaks Next.js dev (HMR). Apply only in production.
  headers: async () => {
    if (!isProd) {
      return [];
    }
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Same path can be overwritten when regenerating marketing JPEGs — avoid immutable.
      {
        source: "/images/industries/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
