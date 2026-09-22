
# Düzeltilmiş dosyaları gösterelim

files = {
    "app/layout.tsx": """import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/Hero';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Çerkesçe Sözlük',
  description: 'Çerkesce dilinin kapsamlı sözlüğü',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <ThemeProviderWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}""",

    "app/page.tsx": """'use client';

import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
      {/* Diğer bileşenler buraya gelecek */}
    </div>
  );
}""",

    "components/layout/Header.tsx": """'use client';

import React from 'react';
import { useTheme } from '@/components/Hero';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      className={`w-full py-4 px-4 transition-colors duration-300 ${
        isDark
          ? 'bg-slate-900 border-b border-slate-800'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">📚</span>
          <h1
            className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Çerkesçe Sözlük
          </h1>
        </div>

        {/* Tema Seçici */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label="Tema değiştir"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}""",

    "components/layout/Footer.tsx": """'use client';

import React from 'react';
import { useTheme } from '@/components/Hero';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`w-full py-8 px-4 transition-colors duration-300 ${
        isDark
          ? 'bg-slate-900 border-t border-slate-800'
          : 'bg-slate-50 border-t border-slate-200'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Hakkında */}
          <div>
            <h3
              className={`font-bold mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Hakkında
            </h3>
            <p
              className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Çerkesce dilinin kapsamlı ve açık kaynak sözlüğü.
            </p>
          </div>

          {/* Bağlantılar */}
          <div>
            <h3
              className={`font-bold mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Bağlantılar
            </h3>
            <ul
              className={`text-sm space-y-2 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <li><a href="#" className="hover:text-blue-600">Ana Sayfa</a></li>
              <li><a href="#" className="hover:text-blue-600">Hakkında</a></li>
              <li><a href="#" className="hover:text-blue-600">İletişim</a></li>
            </ul>
          </div>

          {/* Sosyal */}
          <div>
            <h3
              className={`font-bold mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Sosyal Medya
            </h3>
            <p
              className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Bizi takip edin
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`border-t pt-4 text-center text-sm ${
            isDark
              ? 'border-slate-800 text-slate-400'
              : 'border-slate-200 text-slate-600'
          }`}
        >
          © 2024 Çerkesçe Sözlük. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}"""
}

for filename, content in files.items():
    print(f"\n{'='*60}")
    print(f"📄 {filename}")
    print(f"{'='*60}")
    print(content)
