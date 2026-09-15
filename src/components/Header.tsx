'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fontSize, setFontSize] = useState<number>(17);

  // Sayfa yüklendiğinde hafızadaki tercihleri oku
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(Number(savedFontSize));
    }
  }, []);

  // Tema değişimi ve localStorage senkronizasyonu
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Font boyutu değişimi ve localStorage senkronizasyonu
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const decreaseFont = () => {
    setFontSize((prev) => Math.max(13, prev - 1));
  };

  const increaseFont = () => {
    setFontSize((prev) => Math.min(23, prev + 1));
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 px-4 py-4 sm:px-8 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Logo ve Başlık */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500/30 dark:border-emerald-600/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-xl shrink-0">
            ❊
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Çerkesçe Sözlük
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Адыгэбзэ Псалъалъэ
            </p>
          </div>
        </div>

        {/* Font Boyutu ve Tema Kontrolleri */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#131b2e] p-1.5 rounded-xl border border-slate-300 dark:border-slate-700">
          <div className="flex items-center text-sm font-mono text-slate-700 dark:text-slate-200 px-1">
            <button
              onClick={decreaseFont}
              className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-bold whitespace-nowrap active:scale-95"
              title="Metni Küçült"
              aria-label="Yazı boyutunu küçült"
            >
              -A
            </button>
            <span className="px-2 py-1 text-slate-600 dark:text-slate-300 border-x border-slate-300 dark:border-slate-700 mx-1 font-semibold min-w-[48px] text-center">
              {fontSize}px
            </span>
            <button
              onClick={increaseFont}
              className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-bold whitespace-nowrap active:scale-95"
              title="Metni Büyüt"
              aria-label="Yazı boyutunu büyüt"
            >
              +A
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors border border-amber-500/30 whitespace-nowrap"
            aria-label="Temayı değiştir"
          >
            <span>{theme === 'dark' ? '☀' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Aydınlık' : 'Karanlık'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}