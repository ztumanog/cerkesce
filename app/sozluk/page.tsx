'use client';

import { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import KelimeKarti from '@/components/dictionary/KelimeKarti';
import KelimeDetayDrawer from '@/components/ui/KelimeDetayDrawer';
import type { DictionaryEntry } from '@/types/dictionary';

export default function SozlukPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [seciliKelime, setSeciliKelime] = useState<DictionaryEntry | null>(null);
  const [drawerAcik, setDrawerAcik] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}&mode=baslayan`);
      const data = await res.json();
      setResults(data.results ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => search(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={32} />
            <h1 className="text-4xl font-bold">Çerkesçe Sözlük</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-emerald-100" size={20} />
            <input
              type="text"
              placeholder="Kelime ara... (адыгэ)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {loading && <p className="text-gray-500 mb-4">Aranıyor...</p>}

        {!loading && searchTerm && results.length === 0 && (
          <p className="text-gray-500 mb-4">Sonuç bulunamadı: "{searchTerm}"</p>
        )}

        <div className="grid grid-cols-1 gap-4 mb-8">
          {results.map((r, i) => (
            <KelimeKarti
              key={i}
              data={r}
              onClick={() => {
                setSeciliKelime(r as DictionaryEntry);
                setDrawerAcik(true);
              }}
            />
          ))}
        </div>
      </main>

      <KelimeDetayDrawer
        isOpen={drawerAcik}
        onClose={() => setDrawerAcik(false)}
        seciliKelime={seciliKelime}
      />

      <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12">
        <p>Çerkesçe Sözlük © 2026 | Morfolojik Analiz Sistemi</p>
      </footer>
    </div>
  );
}
