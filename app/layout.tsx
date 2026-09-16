import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Çerkesçe Sözlük',
  description: 'Çerkesçe - Türkçe Sözlük Platformu',
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico',
  },
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
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200 antialiased"
      >
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}