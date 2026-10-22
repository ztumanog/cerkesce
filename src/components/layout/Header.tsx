'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useTercih } from '@/contexts/TercihContext';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { font, setFont, line, setLine, letter, setLetter, contrast, setContrast } = useTercih();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);
  }, [mounted]);

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

  // Klavye kısayolları
  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      const fontSizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        const idx = fontSizes.indexOf(font);
        setFont(fontSizes[Math.min(idx + 1, 3)]);
      }
      if (e.key === '-') {
        e.preventDefault();
        const idx = fontSizes.indexOf(font);
        setFont(fontSizes[Math.max(idx - 1, 0)]);
      }
      if (e.key === '0') {
        e.preventDefault();
        setFont('md');
      }
      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setContrast(contrast === 'high' ? 'normal' : 'high');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [font, contrast, mounted, setFont, setContrast]);

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
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Image
              src="/logo/logo.svg"
              alt="Çerkesçe Sözlük Logosu"
              fill
              className="object-contain p-1"
              priority
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent) parent.textContent = '📚';
              }}
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate transition-colors duration-300" title="Çerkesçe Sözlük">
              Çerkesçe Sözlük
            </h1>
            <p className="hidden sm:block text-xs text-slate-600 dark:text-slate-300 transition-colors duration-300">
              Адыгэбзэ Псалъалъэ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#131b2e] p-1 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 transition-colors duration-300">
          <div className="flex items-center">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFont(size)}
                className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
                  font === size
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title={`Yazı boyutu: ${size === 'sm' ? 'Küçük' : size === 'md' ? 'Normal' : size === 'lg' ? 'Büyük' : 'Çok Büyük'}`}
              >
                A
              </button>
            ))}
          </div>

          <select
            value={line}
            onChange={(e) => setLine(e.target.value as 'tight' | 'normal' | 'loose')}
            className="px-2 py-1 text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200 bg-transparent border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            title="Satır aralığı"
          >
            <option value="tight">Sıkı</option>
            <option value="normal">Normal</option>
            <option value="loose">Geniş</option>
          </select>

          <button
            onClick={() => setLetter(letter === 'wide' ? 'normal' : 'wide')}
            className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
              letter === 'wide'
                ? 'bg-sky-500 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title={`Harf aralığı: ${letter === 'wide' ? 'Geniş' : 'Normal'}`}
          >
            Harf
          </button>

          <button
            onClick={() => setContrast(contrast === 'high' ? 'normal' : 'high')}
            className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
              contrast === 'high'
                ? 'bg-purple-500 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title={`Kontrast modu (Ctrl + C) - Şu an: ${contrast === 'high' ? 'Yüksek' : 'Normal'}`}
          >
            🌓
          </button>

          <Link
            href="/sozluk/favoriler"
            className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-semibold text-yellow-700 dark:text-yellow-300 hover:bg-yellow-500/20 rounded-lg transition-all duration-200"
            title="Favoriler"
          >
            <Star size={14} className="text-yellow-500" fill="currentColor" />
          </Link>

          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className="px-2 py-1 text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 rounded-lg transition-all duration-200"
            title={`Tema: ${theme === 'dark' ? 'Karanlık' : 'Aydınlık'}`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
