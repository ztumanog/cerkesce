/**
 * File: src/app/layout.tsx
 * Generated: 2026-09-19
 * Layer: UI
 */
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import BildirimBaslatici from '@/components/features/BildirimBaslatici';
import SWRegister from './SWRegister';
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
  };

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var fontSize = localStorage.getItem('font-size');

      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      if (fontSize) {
        var size = parseInt(fontSize, 10);
        if (!isNaN(size) && size >= 12 && size <= 22) {
          document.documentElement.style.setProperty('--font-size-base', size + 'px');
        }
      }
    } catch (e) {}
  })();
`;

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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />
              </head>
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200 antialiased"
      >
               <SWRegister />
        <BildirimBaslatici />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}