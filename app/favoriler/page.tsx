'use client';

import { useFavoriler } from '@/hooks/useFavoriler';
import KelimeKarti from '@/components/dictionary/KelimeKarti';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function FavorilerPage() {
  const { favoriler, loading, favoriCikar } = useFavoriler();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-slate-500">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      <header className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Star size={22} className="text-yellow-500" fill="currentColor" />
          Favoriler
        </h1>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {favoriler.length} kelime
        </span>
      </header>

      {favoriler.length === 0 ? (
        <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-stone-200/60 dark:border-slate-800">
          <div className="text-4xl mb-3">⭐</div>
          <h3 className="text-base font-semibold text-stone-800 dark:text-slate-200 mb-1">
            Henüz favori kelimen yok
          </h3>
          <p className="text-sm text-stone-500 dark:text-slate-400 mb-4">
            Arama sonuçlarındaki yıldıza tıklayarak kelimeleri favorilere ekleyebilirsin.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition-colors"
          >
            🔍 Aramaya Dön
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {favoriler.map((favori) => (
            <KelimeKarti
              key={favori.id}
              data={{
                id: favori.id,
                kelime: favori.kelime,
                anlam: favori.anlam,
                ilkAnlam: favori.anlam,
                lehce: favori.lehce,
              }}
              favoriMi={true}
              onFavoriToggle={() => favoriCikar(favori.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}