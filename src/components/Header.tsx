'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fontSize, setFontSize] = useState<number>(17);
  const [mounted, setMounted] = useState(false);

  // ===== HYDRATION FIX =====
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sayfa yüklendiğinde hafızadaki tercihleri oku
  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      const size = Number(savedFontSize);
      // Güvenlik: 14-20px aralığında tut
      if (size >= 14 && size <= 20) {
        setFontSize(size);
      }
    }
  }, [mounted]);

  // Tema değişimi ve localStorage senkronizasyonu
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Font boyutu değişimi ve localStorage senkronizasyonu
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const decreaseFont = () => {
    setFontSize((prev) => Math.max(14, prev - 1));
  };

  const increaseFont = () => {
    setFontSize((prev) => Math.min(20, prev + 1));
  };

  // Hydration sırasında render etme
  if (!mounted) {
    return (
      <header className="border-b border-slate-200 dark:border-slate-800 px-3 py-2.5 sm:px-8 sm:py-4 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 px-3 py-2.5 sm:px-8 sm:py-4 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo ve Başlık */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Image
              src="/logo/logo.svg"
              alt="Çerkesçe Sözlük Logosu"
              fill
              className="object-contain p-1"
              priority
              onError={(e) => {
                // Logo yüklenemezse fallback
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent) {
                  parent.textContent = '📚';
                }
              }}
            />
          </div>
          <div className="min-w-0">
            <h1 
              className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate transition-colors duration-300"
              title="Çerkesçe Sözlük"
            >
              Çerkesçe Sözlük
            </h1>
            <p className="hidden sm:block text-xs text-slate-600 dark:text-slate-300 transition-colors duration-300">
              Адыгэбзэ Псалъалъэ
            </p>
          </div>
        </div>

        {/* Font Boyutu ve Tema Kontrolleri */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#131b2e] p-1 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 transition-colors duration-300">
          
          {/* FONT BOYUTU KONTROL */}
          <div className="flex items-center text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-200 px-0.5 sm:px-1">
            <button
              onClick={decreaseFont}
              disabled={fontSize <= 14}
              className="px-1.5 sm:px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-bold whitespace-nowrap active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Metni Küçült (En az 14px)"
              aria-label="Yazı boyutunu küçült"
            >
              −A
            </button>
            <span 
              className="px-2 py-1 text-slate-600 dark:text-slate-300 border-x border-slate-300 dark:border-slate-700 mx-1 font-semibold min-w-[48px] text-center transition-colors duration-300"
              aria-live="polite"
            >
              {fontSize}px
            </span>
            <button
              onClick={increaseFont}
              disabled={fontSize >= 20}
              className="px-1.5 sm:px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-bold whitespace-nowrap active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Metni Büyüt (En fazla 20px)"
              aria-label="Yazı boyutunu büyüt"
            >
              +A
            </button>
          </div>

          {/* TEMA TOGGLE */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 dark:hover:bg-amber-500/30 rounded-lg transition-all duration-300 border border-amber-500/30 whitespace-nowrap"
            aria-label={`Temayı değiştir (Şu an: ${theme === 'dark' ? 'Karanlık' : 'Aydınlık'})`}
            title={`Temayı değiştir (Şu an: ${theme === 'dark' ? 'Karanlık' : 'Aydınlık'})`}
          >
            <span className="transition-transform duration-300 inline-block">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
            <span className="hidden sm:inline">
              {theme === 'dark' ? 'Aydınlık' : 'Karanlık'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}