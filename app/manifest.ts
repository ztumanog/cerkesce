import type { MetadataRoute } from 'next/types';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Çerkesçe Sözlük',
    short_name: 'Çerkesçe',
    description: 'Çerkesçe - Türkçe - İngilizce - Rusça - Arapça Sözlük',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf8fb',
    theme_color: '#d97706',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}