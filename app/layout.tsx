import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/ThemeProvider';
//import Header from '@/components/layout/lHeader';
//import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Çerkesçe Sözlük',
  description: 'Çerkesce dilinin kapsamlı sözlüğü',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <ThemeProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
