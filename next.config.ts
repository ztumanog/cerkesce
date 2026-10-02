import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  staticPageGenerationTimeout: 1000,

  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },

  async headers() {
    return [
      {
        source: '/data/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },

  // Phase 8.2: ADR-GOV-011 - API Gateway Strategy
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://express-api:3001'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
