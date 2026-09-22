'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ArrowLeft, Search, Trash2, BookmarkX } from 'lucide-react';
import { useKaydedilenler } from '@/hooks/useKaydedilenler';

export default function KaydedilenlerPage() {
  const { kayitlilar, loading, sil, tumunuSil } = useKaydedilenler();
  const [arama, setArama] = useState('');

  const filtreli = useMemo(() => {
    if (!arama.trim()) return kayitlilar;
    const q = arama.toLowerCase();
    return kayitlilar.filter(
      (k) =>
        k.kelime.toLowerCase().includes(q) ||
        k.anlam.toLowerCase().includes(q)
    );
  }, [kayitlilar, arama]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf8ef] dark:bg-slate-950 flex items-center justify-center">
        <div className="text-slate-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf8ef] dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-3 py-4 space-y-4">
        {/* BAŞLIK */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Geri dön"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            💾 Kaydedilenler ({kayitlilar.length})
          </h1>
        </div>

        {/* ARAMA */}
        {kayitlilar.length > 0 && (
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              placeholder="Kelime veya anlam ara..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* LİSTE */}
        {filtreli.length === 0 ? (
          <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookmarkX
              size={48}
              className="mx-auto text-slate-300 dark:text-slate-700 mb-3"
            />
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {kayitlilar.length === 0
                ? 'Henüz kelime kaydetmediniz'
                : 'Arama sonucu bulunamadı'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {kayitlilar.length === 0
                ? 'Günün kelimesi kartından 💾 butonuyla kelime kaydedebilirsiniz.'
                : 'Farklı bir arama yapmayı deneyin.'}
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtreli.map((kelime) => (
              <div
                key={kelime.id}
                className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
                      {kelime.kelime}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {kelime.anlam}
                    </p>

                    {kelime.ornekler && kelime.ornekler.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-900/50">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                          💬 Örnekler
                        </div>
                        <ul className="space-y-1">
                          {kelime.ornekler.map((ornek, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-indigo-300 dark:border-indigo-700"
                            >
                              {ornek}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {kelime.ornek && !kelime.ornekler?.length && (
                      <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-900/50">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                          💬 Örnek
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-indigo-300 dark:border-indigo-700">
                          {kelime.ornek}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => sil(kelime.id)}
                    aria-label="Sil"
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {/* TÜMÜNÜ SİL */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Tüm kaydedilen kelimeler silinsin mi?')) {
                    tumunuSil();
                  }
                }}
                className="px-4 py-2 rounded-lg border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                🗑️ Tümünü Sil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}