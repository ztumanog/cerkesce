'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface FamilySummary {
  id: string;
  headword: string;
  glossTr: string;
  rootId: string | null;
}

interface LexemeSummary {
  id: string;
  form: string;
  wordFamilyId: string;
  dialect: string | null;
  dialectVariants: { adyghe?: string; kabardian?: string } | null;
  tr: string;
}

export default function Client({
  initialFamilies,
  initialLexemes,
}: {
  initialFamilies: FamilySummary[];
  initialLexemes: LexemeSummary[];
}) {
  const [sel, setSel] = useState(initialFamilies[0]?.id || 'WF-1');
  const [q, setQ] = useState('');

  const membersByFamily = useMemo(() => {
    const map = new Map<string, LexemeSummary[]>();
    for (const l of initialLexemes) {
      const list = map.get(l.wordFamilyId);
      if (list) list.push(l);
      else map.set(l.wordFamilyId, [l]);
    }
    return map;
  }, [initialLexemes]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return initialFamilies.slice(0, 300);
    return initialFamilies
      .filter((f) => {
        if (f.id.toLowerCase().includes(s)) return true;
        if (f.headword.toLowerCase().includes(s)) return true;
        if (f.glossTr.toLowerCase().includes(s)) return true;
        const fMembers = membersByFamily.get(f.id) || [];
        return fMembers.some(
          (m) => m.form.toLowerCase().includes(s) || m.tr.toLowerCase().includes(s)
        );
      })
      .slice(0, 300);
  }, [initialFamilies, membersByFamily, q]);

  const selectedFamily = useMemo(
    () => initialFamilies.find((f) => f.id === sel) || null,
    [initialFamilies, sel]
  );

  const members = useMemo(
    () => (membersByFamily.get(sel) || []).slice(0, 200),
    [membersByFamily, sel]
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="w-full md:w-88 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-5 md:h-screen md:overflow-auto shrink-0">
        <Link href="/sozluk" className="text-xs text-slate-500 hover:text-emerald-600 transition">
          ← Sözlük
        </Link>
        <h2 className="font-black text-xl tracking-tight text-slate-900 dark:text-white mt-2">
          KELİME AİLELERİ
        </h2>
        <div className="text-xs text-slate-500 mt-0.5">
          {filtered.length} / {initialFamilies.length} aile
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="WF- kodu, kelime veya anlam ara..."
          className="mt-3 w-full px-3.5 py-2 text-sm rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
        />
        <div className="mt-3 flex flex-col gap-1.5">
          {filtered.map((f) => {
            const active = sel === f.id;
            const fMembers = membersByFamily.get(f.id) || [];
            const title = f.headword || fMembers[0]?.form || f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSel(f.id)}
                className={`text-left px-3.5 py-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${
                  active
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white border-slate-900 dark:border-indigo-600'
                    : 'bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate">{title}</div>
                  <div
                    className={`text-[11px] truncate ${
                      active ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {f.id} {f.glossTr ? `· ${f.glossTr}` : ''}
                  </div>
                </div>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {fMembers.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-6 md:overflow-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                {selectedFamily?.headword || members[0]?.form || sel}
              </h1>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {sel}
              </span>
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {selectedFamily?.glossTr ? `${selectedFamily.glossTr} · ` : ''}
              {members.length} türev kelime
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedFamily?.rootId && (
              <Link
                href={`/sozluk/root/${encodeURIComponent(selectedFamily.rootId)}`}
                className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium hover:bg-teal-100 transition"
              >
                🌱 Kök: {selectedFamily.rootId}
              </Link>
            )}
            <Link
              href={`/sozluk/family/${encodeURIComponent(sel)}`}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Aile Detay Sayfası →
            </Link>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {members.map((m) => {
            const ady = m.dialectVariants?.adyghe;
            const kbd = m.dialectVariants?.kabardian;
            const showPair = ady && kbd && ady !== kbd;

            return (
              <Link
                key={m.id}
                href={`/lexeme/${encodeURIComponent(m.id)}`}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition block"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{m.form}</span>
                  <span className="text-[11px] font-mono text-slate-400">{m.id}</span>
                </div>
                {showPair && (
                  <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                    <span className="px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
                      ADY: {ady}
                    </span>
                    <span className="text-slate-400">↔</span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                      KBD: {kbd}
                    </span>
                  </div>
                )}
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {m.tr || '—'}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
