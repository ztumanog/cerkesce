'use client';

import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

function CircassianFlagIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="18" cy="46" r="2.5" fill="#FACC15" /><circle cx="22" cy="36" r="2.5" fill="#FACC15" />
      <circle cx="28" cy="27" r="2.5" fill="#FACC15" /><circle cx="38" cy="20" r="2.5" fill="#FACC15" />
      <circle cx="50" cy="17" r="2.5" fill="#FACC15" /><circle cx="62" cy="20" r="2.5" fill="#FACC15" />
      <circle cx="72" cy="27" r="2.5" fill="#FACC15" /><circle cx="78" cy="36" r="2.5" fill="#FACC15" />
      <circle cx="82" cy="46" r="2.5" fill="#FACC15" /><circle cx="36" cy="35" r="2.5" fill="#FACC15" />
      <circle cx="50" cy="31" r="2.5" fill="#FACC15" /><circle cx="64" cy="35" r="2.5" fill="#FACC15" />
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

  const applyFontSize = (size: number) => {
    setFontSize(size);
    document.documentElement.style.setProperty('--user-font-size', `${size}px`);
  };

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-0.5 px-3 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-1 h-7">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-[#006A3B] flex items-center justify-center shadow-sm shrink-0 border border-emerald-600">
            <CircassianFlagIcon className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-baseline gap-1">
            <h1 className="text-xs font-bold text-slate-900 dark:text-white leading-none">
              Çerkesçe Sözlük
            </h1>
            <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 hidden sm:inline">
              • Адыгэбзэ Псалъалъэ
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 px-1 text-[10px] h-5">
            <button
              onClick={() => applyFontSize(Math.max(fontSize - 2, 12))}
              className="px-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-bold text-slate-700 dark:text-slate-200"
            >
              -A
            </button>
            <span className="px-1 font-semibold text-slate-500 dark:text-slate-400 border-x border-slate-200 dark:border-slate-700 leading-none">
              {fontSize}px
            </span>
            <button
              onClick={() => applyFontSize(Math.min(fontSize + 2, 22))}
              className="px-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-bold text-slate-700 dark:text-slate-200"
            >
              +A
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="h-5 px-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1 text-[10px] font-medium transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3 h-3 text-yellow-400" />
                <span className="hidden sm:inline">Aydınlık</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                <span className="hidden sm:inline">Karanlık</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}