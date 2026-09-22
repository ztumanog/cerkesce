'use client';

import React, { useState, useRef } from 'react';
import { AkilliKlavye } from '@/components/features/AkilliKlavye';

export interface SearchBoxProps {
  onSearch?: (query: string, mode?: string) => void;
  placeholder?: string;
  filterSlot?: React.ReactNode;
}

export function SearchBox({
  onSearch,
  placeholder = 'Çerkesçe, Türkçe, İngilizce, Rusça veya Arapça ara…',
  filterSlot,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('baslayan');
  const [klavyeAcik, setKlavyeAcik] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setQuery('');
    onSearch?.('', mode);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query, mode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* ARAMA INPUT */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-5 py-4 pl-12 pr-24 text-base sm:text-lg rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md transition-all"
        />

        <div className="absolute left-4 text-slate-400 pointer-events-none text-xl">
          🔍
        </div>

        <div className="absolute right-3 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            >
              ✕
            </button>
          )}

          <button
            type="button"
            onClick={handleSearch}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl text-sm transition-colors"
          >
            Ara
          </button>
        </div>
      </div>

      {/* ARAMA MODU + FİLTRE SLOTU + KLAVYE TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Arama Modu:
          </span>
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              if (query.trim()) onSearch?.(query, e.target.value);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:border-amber-500 transition-colors focus:outline-none"
          >
            <option value="baslayan">📍 Başlayan</option>
            <option value="tam">🎯 Tam Eşleşme</option>
            <option value="iceren">🔍 İçinde</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {filterSlot}

          <button
            type="button"
            onClick={() => setKlavyeAcik((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              klavyeAcik
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-amber-500'
            }`}
          >
            <span>⌨️ Klavye</span>
            <span className={`transition-transform text-[10px] ${klavyeAcik ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>
      </div>

      {/* AKILLI KLAVYE */}
      {klavyeAcik && (
        <div className="mt-1">
          <AkilliKlavye
            sorgu={query}
            setSorgu={setQuery}
            inputRef={inputRef}
            onBackspace={() => setQuery((q) => q.slice(0, -1))}
            onSpace={() => setQuery((q) => q + ' ')}
            onClear={() => setQuery('')}
            onSubmit={handleSearch}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBox;