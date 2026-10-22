/**
 * File: app/layout.tsx
 * Layer: UI
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
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
        <TemaBaslatici />
        <TercihProvider>
          {/* Yeni Üst Menü */}
          <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex flex-wrap gap-6 items-center text-sm font-medium">
              <Link href="/sozluk" className="font-bold text-lg hover:text-emerald-400 transition-colors mr-4">
                Çerkesçe Sözlük
              </Link>
              <Link href="/sozluk" className="hover:text-emerald-400 transition-colors">Sözlük</Link>
              <Link href="/sozluk/morphology" className="hover:text-emerald-400 transition-colors">Morfoloji</Link>
              <Link href="/sozluk/converter" className="hover:text-emerald-400 transition-colors">Converter</Link>
              <Link href="/sozluk/favoriler" className="hover:text-emerald-400 transition-colors">Favoriler</Link>
              <Link href="/yonetim" className="hover:text-emerald-400 transition-colors">Yönetim</Link>
            </div>
          </nav>
          
          <SWRegister />
          <BildirimBaslatici />
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <FooterWrapper />
          <Toaster richColors position="bottom-right" />
        </TercihProvider>
      </body>
    </html>
  );
}
