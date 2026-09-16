/**
 * File: src/components/dictionary/SozlukEkrani.tsx
 * Generated: 2026-09-16
 * Layer: UI
 */

'use client';

import React, { useState, useCallback } from 'react';
import KelimeDetayDrawer from '@/components/ui/KelimeDetayDrawer';
import type { DictionaryEntry } from '@/types/dictionary';
import { Search, Sparkles, BookOpen, Loader2 } from 'lucide-react';

/* Alt UI Bileşenleri (Modül bulunamadı hatalarını TS2307 engellemek için tip güvenli iç bileşenler) */

interface SearchBoxProps {
  onSearch: (metin: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

function SearchBox({ onSearch, isLoading, placeholder }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder={placeholder || 'Arama yapın...'}
        className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
      />
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
      </div>
    </form>
  );
}

interface GununKelimesiKartProps {
  onSelectWord: (entry: DictionaryEntry) => void;
}

function GununKelimesiKart({ onSelectWord }: GununKelimesiKartProps) {
  const ornekGununKelimesi: DictionaryEntry = {
    id: 'gunun-kelimesi-1',
    word: 'Дахэ',
    meaning: 'Güzel, hoş, alımlı',
    meanings: ['Güzel, hoş, alımlı'],
  };

  return (
    <div
      onClick={() => onSelectWord(ornekGununKelimesi)}
      className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 cursor-pointer hover:border-orange-500/40 transition-all"
    >
      <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
        <Sparkles size={14} />
        <span>Günün Kelimesi</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
        {ornekGununKelimesi.word}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {ornekGununKelimesi.meaning}
      </p>
    </div>
  );
}

interface KelimeKartiProps {
  entry: DictionaryEntry;
  onSec: () => void;
}

function KelimeKarti({ entry, onSec }: KelimeKartiProps) {
  return (
    <div
      onClick={onSec}
      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-500/50 cursor-pointer transition-all shadow-sm flex flex-col justify-between"
    >
      <div>
        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
          {entry.word}
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
          {entry.meaning}
        </p>
      </div>
      <div className="mt-3 flex items-center text-xs font-medium text-orange-500">
        <BookOpen size={13} className="mr-1" />
        <span>Detayları gör</span>
      </div>
    </div>
  );
}

/* Ana Sözlük Ekranı */

export default function SozlukEkrani() {
  const [seciliKelime, setSeciliKelime] = useState<DictionaryEntry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [sonuclar, setSonuclar] = useState<DictionaryEntry[]>([]);
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);

  const handleArama = useCallback(async (metin: string) => {
    if (!metin.trim()) {
      setSonuclar([]);
      return;
    }
    setYukleniyor(true);
    try {
      const res = await fetch(`/api/dictionary/search?q=${encodeURIComponent(metin)}`);
      if (res.ok) {
        const data: DictionaryEntry[] = await res.json();
        setSonuclar(data);
      }
    } catch (error) {
      console.error('Arama hatası:', error);
    } finally {
      setYukleniyor(false);
    }
  }, []);

  const handleKelimeSec = useCallback((entry: DictionaryEntry) => {
    setSeciliKelime(entry);
    setIsDrawerOpen(true);
  }, []);

  const handleWordSelect = useCallback(
    (word: string) => {
      handleArama(word);
    },
    [handleArama]
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <SearchBox
        onSearch={handleArama}
        isLoading={yukleniyor}
        placeholder="Kelime veya anlam ara..."
      />

      <GununKelimesiKart onSelectWord={handleKelimeSec} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sonuclar.map((item: DictionaryEntry, index: number) => (
          <KelimeKarti
            key={item.id || index}
            entry={item}
            onSec={() => handleKelimeSec(item)}
          />
        ))}
      </div>

      <KelimeDetayDrawer
        seciliKelime={seciliKelime}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectWord={(word: string) => handleWordSelect(word)}
      />
    </div>
  );
}