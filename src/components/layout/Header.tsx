'use client';

import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

function CircassianFlagIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="18" cy="46" r="2.5" fill="#FACC15" />
      <circle cx="22" cy="36" r="2.5" fill="#FACC15" />
      <circle cx="28" cy="27" r="2.5" fill="#FACC15" />
      <circle cx="38" cy="20" r="2.5" fill="#FACC15" />
      <circle cx="50" cy="17" r="2.5" fill="#FACC15" />
      <circle cx="62" cy="20" r="2.5" fill="#FACC15" />
      <circle cx="72" cy="27" r="2.5" fill="#FACC15" />
      <circle cx="78" cy="36" r="2.5" fill="#FACC15" />
      <circle cx="82" cy="46" r="2.5" fill="#FACC15" />

      <circle cx="36" cy="35" r="2.5" fill="#FACC15" />
      <circle cx="50" cy="31" r="2.5" fill="#FACC15" />
      <circle cx="64" cy="35" r="2.5" fill="#FACC15" />

      <path d="M50 82 L50 44" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M50 38 L45 48 H55 Z" fill="#FACC15" />

      <path d="M28 46 L72 78" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M23 42 L34 44 L28 53 Z" fill="#FACC15" />

      <path d="M72 46 L28 78" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M77 42 L72 53 L66 44 Z" fill="#FACC15" />
    </svg>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState<number>(14);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#006A3B] flex items-center justify-center shadow-md shrink-0 border border-emerald-600">
            <CircassianFlagIcon className="w-9 h-9" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              Çerkesçe Sözlük
            </h1>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Адыгэбзэ Псалъалъэ
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 p-1">
            <button
              onClick={decreaseFontSize}
              className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 transition-colors"
              title="Yazıyı Küçült"
            >
              <span className="text-xs font-bold">-A</span>
            </button>
            <div className="px-2 text-xs font-semibold border-x border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              {fontSize}px
            </div>
            <button
              onClick={increaseFontSize}
              className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 transition-colors"
              title="Yazıyı Büyüt"
            >
              <span className="text-sm font-bold">+A</span>
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={theme === 'dark' ? 'Aydınlık Temaya Geç' : 'Karanlık Temaya Geç'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-xs font-medium">Aydınlık</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-medium">Karanlık</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
