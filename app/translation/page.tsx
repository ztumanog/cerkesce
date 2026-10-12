// app/translation/page.tsx
'use client';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationTable } from '@/components/features/TranslationTable';

export default function TranslationPage() {
  const [query, setQuery] = useState('');
  const { results, loading, error } = useTranslation(query);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Translation Platform
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Kelime ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {loading && <div className="text-center py-8"><p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p></div>}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-800 dark:text-red-200">Hata: {error}</p>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{results.length} sonuç bulundu</p>
            <TranslationTable rows={results.map((entry) => ({
              kavram: entry.word,
              'Türkçe': entry.meaning,
              detaylar: entry.meanings?.map((m) => ({
                tanim: m.text,
                kaynak_sozluk: entry.groupName,
              })) || [],
            }))} />
          </div>
        )}

        {!loading && !error && results.length === 0 && query && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">"{query}" için sonuç bulunamadı</p>
          </div>
        )}

        {!loading && !error && results.length === 0 && !query && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Arama yapmak için yukarıdaki kutuya bir kelime yazın</p>
          </div>
        )}
      </div>
    </div>
  );
}


