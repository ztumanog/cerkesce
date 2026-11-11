'use client';

import React, { useState } from 'react';
import { SyntaxTree } from '@/components/SyntaxTree';

export default function MorphologyPlayground() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/morphology/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: text }),
      });

      if (!res.ok) throw new Error(`Analiz hatası: ${res.statusText}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Analiz sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const getMorphemeBadgeColor = (type: string) => {
    if (type === 'root') return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50';
    return 'bg-amber-900/80 text-amber-200 border-amber-600/50';
  };

  // 100% GARANTİLİ KONUMSAL SAYIM MANTIĞI
  let displayPrefixCount = 0;
  let displaySuffixCount = 0;
  let displayRoot = result?.root || '-';

  if (result?.morphemes && Array.isArray(result.morphemes)) {
    // Köklerin (root) dizideki indekslerini bul
    const rootIndices = result.morphemes
      .map((m: any, i: number) => (m.type === 'root' ? i : -1))
      .filter((i: number) => i !== -1);

    if (rootIndices.length > 0) {
      const firstRootIndex = rootIndices[0];
      const lastRootIndex = rootIndices[rootIndices.length - 1];

      // İlk kökten öncekilerin tamamı önektir
      displayPrefixCount = firstRootIndex;
      
      // Son kökten sonrakilerin tamamı sonektir
      displaySuffixCount = result.morphemes.length - 1 - lastRootIndex;
      
      // Ekranda gösterilecek ana kök
      displayRoot = result.morphemes[firstRootIndex].morpheme;
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-100 font-serif">
          Morfoloji ve Sentaks Analizi
        </h1>
      </div>

      <form onSubmit={handleAnalyze} className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="псыхуэлIэм"
            className="w-full px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-serif text-lg shadow-inner"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl transition-colors shadow-lg min-w-[130px]"
        >
          {loading ? 'Çözümleniyor...' : 'Çözümle'}
        </button>
      </form>

      {result && !result.isMultiWord && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
              <span className="text-2xl font-black text-emerald-400 block">{displayPrefixCount}</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Önek Sayısı</span>
            </div>
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
              <span className="text-2xl font-black text-emerald-400 font-serif block">{displayRoot}</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gerçek Kök Formu</span>
            </div>
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
              <span className="text-2xl font-black text-emerald-400 block">{displaySuffixCount}</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sonek Sayısı</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">ANALİZ EDİLEN KELİME</span>
                <h2 className="text-3xl font-extrabold font-serif text-slate-100">{result.word || result.input}</h2>
              </div>
            </div>

            {result.morphemes && result.morphemes.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">MORFOLOJİ:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {result.morphemes.map((m: any, idx: number) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-slate-500 font-bold text-sm">+</span>}
                      <div className={`px-3.5 py-1.5 rounded-lg border font-mono text-sm shadow-sm flex items-center gap-1.5 ${getMorphemeBadgeColor(m.type)}`}>
                        <span className="font-bold">{m.type === 'root' ? `[${m.morpheme}]` : m.morpheme}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}