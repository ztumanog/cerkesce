/**
 * File: app/layout.tsx
 * Layer: UI
 */
import "@radix-ui/themes/styles.css";
import type { Metadata } from 'next';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { ThemeSync } from '@/components/ThemeSync';
import { FooterWrapper } from '@/components/layout/FooterWrapper';
import { Toaster } from 'sonner';
import BildirimBaslatici from '@/components/features/BildirimBaslatici';
import SWRegister from './SWRegister';
import { TercihProvider } from '@/contexts/TercihContext';
import { TemaBaslatici } from '@/components/features/TemaBaslatici';
import './globals.css';

export const metadata: Metadata = {
  title: 'Çerkesçe Sözlük',
  description: 'Çerkesçe - Türkçe - İngilizce - Rusça - Arapça Sözlük Platformu',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Çerkesçe',
  },
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#d97706" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Çerkesçe" />
        <link rel="apple-touch-icon" href="/icons/favicon.svg" />
      </head>
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200 antialiased"
      >
        {/* RADIX THEME SARMALAYICISI BURADA BAŞLIYOR (Parti 3-B: ThemeSync, html.dark'ı izler) */}
        <ThemeSync>
          <TemaBaslatici />
          <TercihProvider>
            <SWRegister />
            <BildirimBaslatici />
            {/* Birleşik üst çubuk (Parti 2-C): menü + erişilebilirlik tek bileşende */}
            <UnifiedHeader />
            <main className="flex-1 w-full">{children}</main>
            <FooterWrapper />
            <Toaster richColors position="bottom-right" />
          </TercihProvider>
        </ThemeSync>
        {/* RADIX THEME SARMALAYICISI BURADA BİTİYOR */}
      </body>
    </html>
  );
}