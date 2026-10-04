import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  staticPageGenerationTimeout: 1000,
  serverExternalPackages: ['fs', 'path'],

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
