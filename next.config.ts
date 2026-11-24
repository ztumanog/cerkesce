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

  // Yonetim panolari /admin/yonetim altinda tek merkezde birlestirildi
  // (Bas Mimar onayi, 2026-11-24). Eski acik adresler yonlendirilir - bos sayfa/404 yok.
  async redirects() {
    return [
      { source: '/executive', destination: '/admin/yonetim/executive', permanent: true },
      { source: '/governance', destination: '/admin/yonetim/governance', permanent: true },
      { source: '/intelligence', destination: '/admin/yonetim/intelligence', permanent: true },
      { source: '/operations', destination: '/admin/yonetim/operations', permanent: true },
      { source: '/intelligence/details', destination: '/admin/yonetim/intelligence/details', permanent: true },
      { source: '/operations/details', destination: '/admin/yonetim/operations/details', permanent: true },
      { source: '/admin/intelligence/details', destination: '/admin/yonetim/intelligence/details', permanent: true },
      { source: '/admin/operations/details', destination: '/admin/yonetim/operations/details', permanent: true },
      // Kurasyon Paneli ana sayfasi Yonetim Merkezi ile birlesti (alt moduller durur)
      { source: '/admin/curation', destination: '/admin/yonetim', permanent: true },
      // /yonetim agaci /admin/yonetim'e tasindi
      { source: '/yonetim', destination: '/admin/yonetim', permanent: true },
      { source: '/yonetim/:path*', destination: '/admin/yonetim/:path*', permanent: true },
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
