'use client';

import React, { useState } from 'react';
import { Search, Layers, GitMerge } from 'lucide-react';
import { SyntaxTree } from '@/components/morphology/SyntaxTree';

export default function MorphologyPage() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">MORFOLOJİ & SENTAKS</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Morfoloji ve Sentaks Analizi</h1>
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
            placeholder="Kelime veya cümle girin (örn: сиунэ, цӀыхуныгъэ, щӀалэм унэшхуэр ищӀащ)..."
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

        {result && (
          <div className="space-y-6">

            {/* A. ÇOKLU KELİME (ÖBEK / SENTAKS) ANALİZİ */}
            {result.isMultiWord ? (
              <div className="space-y-6">
                
                {/* Sentaks Ağacı (Syntax Tree) */}
                {result.syntax && (
                  <SyntaxTree 
                    sentence={result.syntax.sentence || result.word} 
                    structurePattern={result.syntax.structurePattern} 
                    tokens={result.syntax.tokens} 
                  />
                )}

                {/* Sentaks Kelime Rolleri Kartları */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" /> Cümle / Öbek Kelime Analiz Dizilimi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.syntax?.tokens?.map((token: any, idx: number) => (
                      <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
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
                    <div className="text-2xl font-bold text-white">{result.prefixCount || 0}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">Önek Sayısı</div>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center min-w-[130px]">
                    <div className="text-2xl font-bold text-emerald-400">{result.root || '-'}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">Gerçek Kök Formu</div>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-white">{result.morphemes?.filter((m:any) => m.type === 'suffix').length || 0}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">Sonek Sayısı</div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">ANALİZ EDİLEN KELİME</span>
                    <h2 className="text-3xl font-black text-white tracking-wide">{result.word}</h2>
                    
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs text-slate-400 font-medium mr-2">MORFOLOJİ:</span>
                      {result.morphemes?.map((m: any, idx: number) => (
                        <React.Fragment key={idx}>
                          <span className={`px-3 py-1.5 rounded-lg font-mono text-sm font-semibold shadow-sm ${
                            m.type === 'root' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' :
                            m.type === 'prefix' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                            'bg-amber-950 text-amber-300 border border-amber-500/40'
                          }`}>
                            {m.type === 'root' ? `[${m.morpheme}]` : m.morpheme}
                          </span>
                          {idx < result.morphemes.length - 1 && <span className="text-slate-600 font-bold">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Gerçek Kök Formu</div>
                      <div className="text-xl font-bold text-white mt-0.5">{result.root}</div>
                    </div>
                    <div className="flex justify-between items-end border-t border-slate-800 pt-3">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Kelime Türü</div>
                        <div className="text-sm font-bold text-slate-200">{result.lemmaPos || 'NOUN/LEMMA'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 font-medium">Güven Oranı</div>
                        <div className="text-sm font-bold text-emerald-400">%{Math.round((result.confidence || 0.95) * 100)}</div>
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