'use client';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RootDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = decodeURIComponent((params?.id as string) || '');

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/sozluk/root/${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Kök verisi yüklenemedi:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const filteredMembers = useMemo(() => {
    const list = data?.members || [];
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter((m: any) =>
      (m.form || '').toLowerCase().includes(q) ||
      (m.translations?.tr || m.literalMeaning || '').toLowerCase().includes(q) ||
      (m.id || '').toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto p-5 space-y-6">
      {/* Üst Geri ve Kaynak */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          ← Geri
        </button>
        <span className="text-xs text-slate-500">API: /api/sozluk/root/{id}</span>
      </div>

      {/* Hiyerarşi Şeridi: ROOT > FAMILY > CONCEPT */}
      <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white">🌱 ROOT: {id}</span>
          <span>›</span>
          <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200">
            🌿 {data?.families?.length ?? 0} Kelime Ailesi (Family)
          </span>
          <span>›</span>
          <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
            🏷️ {data?.concepts?.length ?? 0} Kavram (Concept)
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {data?.root?.form || data?.root?.headword || id}
          </h1>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {id}
          </span>
          {data?.root?.meaning && (
            <span className="text-sm text-slate-700 dark:text-slate-300">— {data.root.meaning}</span>
          )}
          <span className="text-sm text-slate-500">· {data?.count ?? 0} türev kelime</span>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">Kök ağacı yükleniyor...</div>
      ) : (
        <>
          {/* 2. Katman: Bu Kökten Türeyen Kelime Aileleri (Family) */}
          {data?.families?.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                🌿 Türeyen Kelime Aileleri (Family)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.families.map((fam: any) => (
                  <Link
                    key={fam.id}
                    href={`/sozluk/family/${encodeURIComponent(fam.id)}`}
                    className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 hover:border-indigo-500 transition shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-indigo-700 dark:text-indigo-300">{fam.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200">
                        {fam.count} üye
                      </span>
                    </div>
                    {fam.sampleForms?.length > 0 && (
                      <div className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 truncate">
                        {fam.sampleForms.join(', ')}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 3. Katman: Bağlı Kavramlar (Concept) */}
          {data?.concepts?.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                🏷️ Bağlı Kavramlar (Concept)
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.concepts.map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/kavram/${c.id.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 text-xs font-semibold transition"
                  >
                    <span>🏷️ {c.id}</span>
                    {c.labelTr && <span className="text-slate-500">({c.labelTr})</span>}
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-[11px]">{c.count}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 4. Katman: Köke Bağlı Tüm Kelimeler */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                📖 Köke Bağlı Kelimeler ({filteredMembers.length})
              </h2>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Köke bağlı kelimelerde ara..."
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm w-64"
              />
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
              {filteredMembers.map((m: any) => (
                <div key={m.id} className="p-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <div>
                    <Link href={`/lexeme/${encodeURIComponent(m.id)}`} className="font-bold text-base text-slate-900 dark:text-white hover:text-emerald-600">
                      {m.form}
                    </Link>
                    {m.ipa && <span className="ml-2 text-xs font-mono text-slate-400">/{m.ipa}/</span>}
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {m.translations?.tr || m.literalMeaning || '—'}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {m.wordFamilyId && (
                      <Link
                        href={`/sozluk/family/${encodeURIComponent(m.wordFamilyId)}`}
                        className="text-[11px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-medium"
                      >
                        🌿 {m.wordFamilyId}
                      </Link>
                    )}
                    {m.conceptId && (
                      <Link
                        href={`/kavram/${m.conceptId.toLowerCase()}`}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-medium"
                      >
                        🏷️ {m.conceptId}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
