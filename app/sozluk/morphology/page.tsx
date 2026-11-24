'use client';

import React, { useState } from 'react';
import { Search, Layers, BookOpen, Sparkles } from 'lucide-react';
import { SyntaxTree } from '@/components/morphology/SyntaxTree';

export default function MorphologyPage() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // --- Fiil Çekimi Üret (P4-B5: linguistic/InflectionHandler üretim akışına bağlandı) ---
  const [verb, setVerb] = useState('');
  const [tense, setTense] = useState('present');
  const [dialect, setDialect] = useState('kabardian');
  const [negative, setNegative] = useState(false);
  const [causative, setCausative] = useState(false);
  const [inflectResult, setInflectResult] = useState<any>(null);
  const [inflectLoading, setInflectLoading] = useState(false);
  const [inflectError, setInflectError] = useState('');

  const TENSE_LABELS: Record<string, string> = {
    infinitive: 'Mastar (-mak/-mek)',
    present: 'Şimdiki zaman',
    past: 'Geçmiş zaman',
    future: 'Gelecek zaman',
    imperative: 'Emir',
    conditional: 'Koşul',
    gerund: 'Zarf-fiil (-arak/-erek)',
  };

  const handleInflect = async () => {
    if (!verb.trim()) return;
    setInflectLoading(true);
    setInflectError('');
    try {
      const res = await fetch('/api/morphology/inflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verb: verb.trim(), tenseOrMood: tense, dialect, negative, causative }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Çekim üretilemedi');
      setInflectResult(data);
    } catch (err: any) {
      setInflectError(err.message);
      setInflectResult(null);
    } finally {
      setInflectLoading(false);
    }
  };

  const handleAnalyze = async (targetWord?: string) => {
    const query = targetWord || word;
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/morphology/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: query }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const innerResult = result?.result ?? result;
  const morphemes = result?.morphemes?.length ? result.morphemes : (innerResult?.morphemes ?? []);
  const rootIndex = morphemes.findIndex((m: any) => m.type === 'root');
  const displayRoot =
    (rootIndex >= 0 ? morphemes[rootIndex].morpheme : null) ||
    innerResult?.root ||
    result?.root ||
    '-';
  const prefixCount =
    rootIndex >= 0
      ? rootIndex
      : (result?.prefixCount ?? innerResult?.prefixCount ?? 0);
  const suffixCount =
    rootIndex >= 0
      ? morphemes.slice(rootIndex + 1).filter((m: any) => m.type !== 'root').length
      : (result?.suffixCount ?? innerResult?.suffixCount ?? 0);
  const wordPos =
    result?.lemmaPos ||
    (innerResult?.source ? String(innerResult.source).toUpperCase() : 'NOUN/LEMMA');
  const confidence = result?.confidence ?? innerResult?.confidence ?? 0.95;
  const dictionaryEntry = result?.dictionaryEntry ?? innerResult?.dictionaryEntry;

  const formatMorpheme = (m: any, idx: number) => {
    if (m.type === 'root') return `[${m.morpheme}]`;
    if (rootIndex >= 0 && idx < rootIndex) return `${m.morpheme}-`;
    if (rootIndex >= 0 && idx > rootIndex) return `-${m.morpheme}`;
    return m.morpheme;
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            MORFOLOJİ & SENTAKS
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Morfoloji ve Sentaks Analizi
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Tekil sözcük morfolojisi, tamlama öbekleri ve cümle sentaks dizilimini (Özne-Nesne-Yüklem) otomatik çözümleyin.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center bg-slate-900/80 border border-slate-700/60 rounded-2xl p-2 shadow-2xl backdrop-blur-md">
          <Search className="w-5 h-5 text-slate-400 ml-3" />
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Kelime veya cümle girin (örn: сиунэ, цӀыхуныгъэ, тепӏэн, щӀалэм унэшхуэр ищӀащ)..."
            className="w-full bg-transparent px-4 py-3 text-lg text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-7 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {loading ? 'Çözümleniyor...' : 'Çözümle'}
          </button>
        </div>

        {/* Fiil Çekimi Üret — linguistic/InflectionHandler (üretici) ilk kez UI'a bağlandı (P4-B5) */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200">Fiil Çekimi Üret</h3>
          </div>
          <p className="text-xs text-slate-400">
            Bir fiil yazın (mastar ya da gövde, örn: <span className="font-mono text-slate-300">кӀуэн</span>), zaman/kip ve lehçeyi seçin — çekimli biçimi üretilir.
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <label htmlFor="inflect-verb" className="block text-[11px] font-semibold text-slate-400 mb-1">Fiil</label>
              <input
                id="inflect-verb"
                type="text"
                value={verb}
                onChange={(e) => setVerb(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInflect()}
                placeholder="örn: кӀуэн (gitmek)"
                className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
            <div>
              <label htmlFor="inflect-tense" className="block text-[11px] font-semibold text-slate-400 mb-1">Zaman / Kip</label>
              <select
                id="inflect-tense"
                value={tense}
                onChange={(e) => setTense(e.target.value)}
                className="bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500/60"
              >
                {Object.entries(TENSE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="inflect-dialect" className="block text-[11px] font-semibold text-slate-400 mb-1">Lehçe</label>
              <select
                id="inflect-dialect"
                value={dialect}
                onChange={(e) => setDialect(e.target.value)}
                className="bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500/60"
              >
                <option value="kabardian">Kabardeyce (Doğu)</option>
                <option value="adyghe">Adıgece (Batı)</option>
              </select>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none pb-2.5">
              <input type="checkbox" checked={negative} onChange={(e) => setNegative(e.target.checked)} className="accent-amber-500" />
              Olumsuz
            </label>
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none pb-2.5">
              <input type="checkbox" checked={causative} onChange={(e) => setCausative(e.target.checked)} className="accent-amber-500" />
              Ettirgen (yaptırmak)
            </label>
            <button
              onClick={handleInflect}
              disabled={inflectLoading || !verb.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {inflectLoading ? 'Üretiliyor...' : 'Çek'}
            </button>
          </div>

          {inflectError && (
            <div className="text-sm text-rose-300 bg-rose-950/40 border border-rose-800/50 rounded-lg px-3 py-2">{inflectError}</div>
          )}

          {inflectResult && (
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="text-2xl font-black text-white tracking-wide">{inflectResult.form}</div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {inflectResult.components?.map((c: string, i: number) => (
                  <React.Fragment key={i}>
                    <span className="px-2 py-1 rounded-lg font-mono bg-amber-950 text-amber-300 border border-amber-500/40">{c}</span>
                    {i < inflectResult.components.length - 1 && <span className="text-slate-600 font-bold">+</span>}
                  </React.Fragment>
                ))}
                <span className="text-slate-400 ml-2">
                  {TENSE_LABELS[inflectResult.tenseOrMood] || inflectResult.tenseOrMood}
                  {inflectResult.negative ? ' · olumsuz' : ''} · {inflectResult.dialect === 'adyghe' ? 'Adıgece' : 'Kabardeyce'}
                </span>
              </div>
              {inflectResult.causative && (
                <div className="text-sm text-emerald-300 border-t border-slate-800 pt-2">
                  Ettirgen biçim: <strong className="text-white">{inflectResult.causative.form}</strong>
                  <span className="text-slate-500 text-xs ml-2">({inflectResult.causative.components?.join(' + ')})</span>
                </div>
              )}
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-6">
            {/* A. ÇOKLU KELİME (ÖBEK / SENTAKS) ANALİZİ */}
            {result.isMultiWord ? (
              <div className="space-y-6">
                {result.syntax && (
                  <SyntaxTree
                    sentence={result.syntax.sentence || result.word}
                    structurePattern={result.syntax.structurePattern}
                    tokens={result.syntax.tokens}
                  />
                )}

                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" /> Cümle / Öbek Kelime Analiz Dizilimi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.syntax?.tokens?.map((token: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                          <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                            {token.role}
                          </span>
                        </div>
                        <div className="text-xl font-bold text-white">{token.word}</div>
                        <div className="text-xs text-emerald-400 font-medium">{token.roleTr}</div>
                        <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                          Kök: <b className="text-slate-200">{token.analysis?.root || '-'}</b>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* B. TEK KELİME MORFOLOJİ ANALİZİ */
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-white">{prefixCount}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">Önek Sayısı</div>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center min-w-[130px]">
                    <div className="text-2xl font-bold text-emerald-400">{displayRoot}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">Gerçek Kök Formu</div>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-white">{suffixCount}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">Sonek Sayısı</div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                      ANALİZ EDİLEN KELİME
                    </span>
                    <h2 className="text-3xl font-black text-white tracking-wide">{result.word}</h2>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs text-slate-400 font-medium mr-2">MORFOLOJİ:</span>
                      {morphemes.map((m: any, idx: number) => {
                        const isPrefix = rootIndex >= 0 && idx < rootIndex;
                        return (
                          <React.Fragment key={idx}>
                            <span
                              title={m.glossTr || m.meaningTr || m.type}
                              className={`px-3 py-1.5 rounded-lg font-mono text-sm font-semibold shadow-sm inline-flex flex-col items-center ${
                                m.type === 'root'
                                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                                  : isPrefix
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                              }`}
                            >
                              <span>{formatMorpheme(m, idx)}</span>
                              {(m.glossTr || m.type === 'root') && (
                                <span className="text-[10px] font-sans font-normal opacity-75 mt-0.5">
                                  {m.type === 'root' ? 'Kök' : m.glossTr}
                                </span>
                              )}
                            </span>
                            {idx < morphemes.length - 1 && (
                              <span className="text-slate-600 font-bold">+</span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {dictionaryEntry?.meaningTr && (
                      <div className="inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/50 border border-emerald-800/50 px-3 py-1.5 rounded-lg">
                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Sözlük: <strong>{dictionaryEntry.meaningTr}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Gerçek Kök Formu</div>
                      <div className="text-xl font-bold text-white mt-0.5">{displayRoot}</div>
                    </div>
                    <div className="flex justify-between items-end border-t border-slate-800 pt-3">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Kelime Türü</div>
                        <div className="text-sm font-bold text-slate-200">{wordPos}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 font-medium">Güven Oranı</div>
                        <div className="text-sm font-bold text-emerald-400">
                          %{Math.round(confidence * 100)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

