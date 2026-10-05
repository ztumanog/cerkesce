'use client';

import { useState, useEffect } from 'react';
import { Search, Volume2, BookOpen, Zap } from 'lucide-react';

interface Lexeme {
  id: string;
  form: string;
  ipa?: string;
  literalMeaning?: string;
  partOfSpeech?: string;
  dialectVariants?: { adyghe?: string; kabardian?: string };
  wordFamilyId?: string;
  notes?: string;
  rootIds?: string[];
  conceptId?: string | null;
  corpusFrequency?: number;
  derivation?: { rootIds?: string[]; rule?: string } | null;
}

interface SearchResult {
  lexeme: Lexeme;
  confidence?: number;
}

export default function SozlukPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const search = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/sozluk/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: term }),
      });
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
            <div
              key={i}
              onClick={() => setSelected(r)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6 border-l-4 border-emerald-500"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{r.lexeme.form}</h2>
                  {r.lexeme.ipa && (
                    <p className="text-gray-500 text-sm">{r.lexeme.ipa}</p>
                  )}
                </div>
                <button className="p-2 hover:bg-emerald-100 rounded-full transition">
                  <Volume2 size={20} className="text-emerald-600" />
                </button>
              </div>

              {r.lexeme.literalMeaning && r.lexeme.literalMeaning !== '?' && (
                <div className="bg-emerald-50 rounded p-3 mb-4">
                  <p className="text-lg text-gray-700 font-semibold">{r.lexeme.literalMeaning}</p>
                </div>
              )}

              {r.lexeme.partOfSpeech && (
                <div className="text-sm">
                  <span className="text-gray-500">Sözcük Türü:</span>
                  <p className="font-semibold text-gray-800">{r.lexeme.partOfSpeech}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selected && (
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-emerald-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Zap size={24} className="text-emerald-600" />
              Detaylı Analiz
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kök Bilgisi */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Kök Bilgisi</h4>
                {selected.lexeme.rootIds && selected.lexeme.rootIds.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selected.lexeme.rootIds.map((rootId: string) => (
                      <span
                        key={rootId}
                        className="px-2 py-1 bg-emerald-200 text-emerald-800 rounded text-sm font-mono"
                      >
                        {rootId}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Kök bilgisi yok</p>
                )}
              </div>

              {/* Word Family */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Word Family</h4>
                {selected.lexeme.wordFamilyId ? (
                  <p className="text-gray-600 font-mono">{selected.lexeme.wordFamilyId}</p>
                ) : (
                  <p className="text-gray-500">Aile bilgisi yok</p>
                )}
              </div>

              {/* Concept */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Kavram</h4>
                {selected.lexeme.conceptId ? (
                  <p className="text-gray-600 font-mono">{selected.lexeme.conceptId}</p>
                ) : (
                  <p className="text-gray-500">Kavram bilgisi yok</p>
                )}
              </div>

              {/* Sıklık */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Kullanım Sıklığı</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {selected.lexeme.corpusFrequency ?? 0}
                </p>
              </div>

              {/* Lehçe Karşılıkları */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 md:col-span-2">
                <h4 className="font-semibold text-gray-700 mb-3">Lehçe Karşılıkları</h4>
                {selected.lexeme.dialectVariants ? (
                  <>
                    {selected.lexeme.dialectVariants.adyghe && (
                      <p className="text-gray-600">Adigece: {selected.lexeme.dialectVariants.adyghe}</p>
                    )}
                    {selected.lexeme.dialectVariants.kabardian && (
                      <p className="text-gray-600">Kabardeyce: {selected.lexeme.dialectVariants.kabardian}</p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">Lehçe bilgisi yok</p>
                )}
              </div>

              {/* Kaynak */}
              {selected.lexeme.notes && (
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 md:col-span-2">
                  <h4 className="font-semibold text-gray-700 mb-3">Kaynak</h4>
                  <p className="text-gray-600 text-sm">{selected.lexeme.notes}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Kapat
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12">
        <p>Çerkesçe Sözlük © 2026 | Morfolojik Analiz Sistemi</p>
      </footer>
    </div>
  );
}