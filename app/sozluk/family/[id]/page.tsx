'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function FamilyDetailPage() {
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/sozluk/family/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error('Aile verisi yüklenemedi:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-10 text-center text-slate-500">
        Kelime ailesi yükleniyor...
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="max-w-5xl mx-auto p-10 text-center">
        <p className="text-red-500 font-semibold mb-4">
          {data?.error || 'Kelime ailesi bulunamadı.'}
        </p>
        <Link href="/sozluk" className="text-emerald-600 underline text-sm">
          ← Sözlüğe Dön
        </Link>
      </div>
    );
  }

  const root = data.root || null;
  const members = data.members || [];
  const concepts = Array.from(
    new Set(members.map((m: any) => m.conceptId).filter(Boolean))
  ) as string[];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Hiyerarşik Gezinme Çubuğu: Sözlük › Kök › Kelime Ailesi */}
      <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <Link href="/sozluk" className="hover:text-emerald-600 transition">
          Sözlük
        </Link>
        <span>›</span>
        {root ? (
          <>
            <Link
              href={`/sozluk/root/${encodeURIComponent(root.id)}`}
              className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 transition"
            >
              🌱 Kök: {root.form || root.id}
            </Link>
            <span>›</span>
          </>
        ) : (
          <>
            <span className="text-slate-400">Kök Bağlantısı Yok</span>
            <span>›</span>
          </>
        )}
        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold">
          🌿 Aile: {data.familyId}
        </span>
      </nav>

      {/* Başlık Kartı */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            Kelime Ailesi (Word Family)
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span>{data.headword || data.familyId}</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {data.familyId}
            </span>
          </h1>
          {data.glossTr && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Temel Anlam: <strong>{data.glossTr}</strong>
            </p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Bu ailede toplam <strong>{members.length}</strong> türev madde kayıtlı.
          </p>
        </div>

        <Link
          href="/sozluk"
          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition"
        >
          ← Sözlüğe Dön
        </Link>
      </div>

      {/* Bağlı Kavramlar */}
      {concepts.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mr-1">
            🏷️ İlişkili Kavramlar:
          </span>
          {concepts.map((c) => (
            <Link
              key={c}
              href={`/kavram/${c.toLowerCase()}`}
              className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition"
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {/* Aile Üyeleri (Salt-Okunur Sözlük Görünümü) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m: any) => (
          <div
            key={m.id}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 transition-all"
          >
            <div className="flex justify-between items-start gap-2">
              <Link
                href={`/lexeme/${encodeURIComponent(m.id)}`}
                className="font-bold text-lg text-slate-900 dark:text-white hover:text-indigo-600 transition"
              >
                {m.form}
              </Link>
              {m.dialect && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  {m.dialect}
                </span>
              )}
            </div>

            {m.ipa && (
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                /{m.ipa}/
              </div>
            )}

            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 line-clamp-2">
              {m.translations?.tr || m.translations?.en || '—'}
            </p>

            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              {m.conceptId ? (
                <Link
                  href={`/kavram/${m.conceptId.toLowerCase()}`}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
                >
                  🏷️ {m.conceptId}
                </Link>
              ) : (
                <span className="text-slate-400">Kavram atanmamış</span>
              )}

              <Link
                href={`/lexeme/${encodeURIComponent(m.id)}`}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Detay →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
