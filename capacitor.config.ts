import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.adigece.sozluk',
  appName: 'Adigece Sozluk',
  webDir: 'out',
  server: {
    url: 'https://cerkescesozluk.vercel.app',
    cleartext: false,
    androidScheme: 'https',
  },
};

export default config;