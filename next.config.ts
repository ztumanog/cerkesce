import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static files
  staticPageGenerationTimeout: 1000,
  
  // Headers
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
};

export default nextConfig;
