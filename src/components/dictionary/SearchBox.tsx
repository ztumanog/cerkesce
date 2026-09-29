'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AkilliKlavye } from '@/components/features/AkilliKlavye';
import { SmartSuggestionService } from '@/domain/discovery/services/SmartSuggestionService';
import { SmartSuggestion } from '@/domain/discovery/dto/SmartSuggestionDTO';

export interface SearchBoxProps {
  onSearch?: (query: string, mode?: string) => void;
  placeholder?: string;
  filterSlot?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  klavyeAcik?: boolean;
  setKlavyeAcik?: (v: boolean) => void;
}

export function SearchBox({
  onSearch,
  placeholder = 'Cerkesce, Turkce, Ingilizce, Rusca veya Arapca ara...',
  filterSlot,
  inputRef: externalRef,
  klavyeAcik: externalKlavyeAcik,
  setKlavyeAcik: externalSetKlavyeAcik,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('baslayan');
  const [internalKlavyeAcik, setInternalKlavyeAcik] = useState(false);
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false);

  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef ?? internalRef;
  const klavyeAcik = externalKlavyeAcik ?? internalKlavyeAcik;
  const setKlavyeAcik = externalSetKlavyeAcik ?? setInternalKlavyeAcik;
  const serviceRef = useRef<SmartSuggestionService | null>(null);

  // 1. Service'i baslat ve lexemes.json'u yukle
  useEffect(() => {
    if (!serviceRef.current) {
      serviceRef.current = new SmartSuggestionService();
    }

    fetch('/data/linguistic/lexemes.json')
      .then((r) => r.json())
      .then((lexemes) => {
        serviceRef.current?.loadLexemes(lexemes);
        setSuggestionsLoaded(true);
      })
      .catch((e) => {
        console.warn('SmartSuggestionService: lexemes yuklenemedi', e);
      });
  }, []);

  // 2. Query degistiginde onerileri guncelle
  useEffect(() => {
    if (!suggestionsLoaded || !serviceRef.current) {
      setSuggestions([]);
      return;
    }

    const trimmed = query.trim();

    // 2 karakterden az ise oneri yok
    if (trimmed.length < 2) {
      setSuggestions([]);
      return;
    }

    const result = serviceRef.current.suggest(trimmed, 5);
    setSuggestions(result.suggestions);
  }, [query, suggestionsLoaded]);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSearch?.('', mode);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query, mode);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (word: string) => {
    setQuery(word);
    setSuggestions([]);
    onSearch?.(word, mode);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleKlavyeToggle = () => {
    setKlavyeAcik(!klavyeAcik);
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

      {/* ONERILER - "Bunu mu demek istediniz?" */}
      {suggestions.length > 0 && (
        <div className="w-full px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
            Bunu mu demek istediniz?
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s.word}
                type="button"
                onClick={() => handleSuggestionClick(s.word)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 transition-colors"
                title={s.meaningTr || s.meaningEn || s.meaningRu || ''}
              >
                <span className="font-medium">{s.word}</span>
                {s.meaningTr && (
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                    {s.meaningTr}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ARAMA MODU + FILTRE SLOTU + KLAVYE TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Arama Modu:
          </span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="text-xs px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            <option value="baslayan">Baslayan</option>
            <option value="iceren">Iceren</option>
            <option value="tam">Tam</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {filterSlot}

          <button
            type="button"
            onClick={handleKlavyeToggle}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
          >
            {klavyeAcik ? 'Klavye Kapat' : 'Klavye'}
          </button>
        </div>
      </div>

      {/* AKILLI KLAVYE */}
      {klavyeAcik && (
        <AkilliKlavye
          onKeyPress={(char) => setQuery((q) => q + char)}
          onBackspace={() => setQuery((q) => q.slice(0, -1))}
          onClear={() => setQuery('')}
        />
      )}
    </div>
  );
}


export default SearchBox;
