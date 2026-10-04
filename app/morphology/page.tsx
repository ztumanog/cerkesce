'use client';

import { useState } from 'react';

const METHOD_TR: Record<string, string> = {
  dictionary: 'Sözlük',
  exact: 'Tam',
  partial: 'Kısmi',
  fallback: 'Yedek',
  morpheme: 'Morfem',
  corpus: 'Korpüs',
  split: 'Bölme',
};

interface MorphologyResult {
  word: string;
  prefixes: Array<{ slot: string; form: string; position: number }>;
  root: string;
  prefixCount: number;
  method: string;
  confidence: number;
  source?: string;
  rootExtractor?: any;
  nounCase?: any;
  morphemes?: any;
  lexeme?: any;
  wordFamily?: any[];
  lemma?: string;
  lemmaPos?: string;
  lemmaConfidence?: number;
  personArguments?: any[];
  lemmaPrefixes?: any[];
  lemmaSuffixes?: any[];
  rootMatches?: any[];
  frequency?: { kabardian: number; adyghe: number };
}

export default function MorphologyPage() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState<MorphologyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/morphology/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Hata');
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Morfoloji Analizi</h1>
      <p className="text-gray-600 mb-6">Çerkesçe kelimeyi eklerine ayır</p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && analyze()}
          placeholder="Örn: дэхьащхын"
          className="flex-1 px-4 py-2 border rounded-lg"
          suppressHydrationWarning
        />
        <button
          onClick={analyze}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '...' : 'Ayrıştır'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800 mb-4">
          Hata: {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* KELIME OZETI */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">Kelime: {result.word}</h2>
            {result.lexeme?.ipa && (
              <p className="text-sm text-gray-600">IPA: {result.lexeme.ipa}</p>
            )}
            {result.lexeme?.literalMeaning && result.lexeme.literalMeaning !== '?' && (
              <p className="text-sm text-gray-600">Anlam: {result.lexeme.literalMeaning}</p>
            )}
            {result.lexeme?.partOfSpeech && (
              <p className="text-sm text-gray-600">Tür: {result.lexeme.partOfSpeech}</p>
            )}
          </div>

          {/* FREKANS */}
          {result.frequency && (result.frequency.kabardian > 0 || result.frequency.adyghe > 0) && (
            <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <h3 className="font-semibold mb-3">Korpüs Frekansı</h3>
              <div className="flex gap-6 text-sm">
                {result.frequency.kabardian > 0 && (
                  <div>
                    <span className="text-gray-500">Kabardeyce:</span>
                    <p className="font-semibold text-lg">{result.frequency.kabardian.toLocaleString()}</p>
                  </div>
                )}
                {result.frequency.adyghe > 0 && (
                  <div>
                    <span className="text-gray-500">Adigece:</span>
                    <p className="font-semibold text-lg">{result.frequency.adyghe.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LEMMA */}
          {result.lemma && (
            <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <h3 className="font-semibold mb-2">Lemma: {result.lemma}</h3>
              {result.lemmaPos && (
                <p className="text-sm text-gray-600">Tür: {result.lemmaPos}</p>
              )}
              {result.lemmaConfidence !== undefined && (
                <p className="text-sm text-gray-600">Güven: {(result.lemmaConfidence * 100).toFixed(0)}%</p>
              )}
            </div>
          )}

          {/* KISI EKLERI */}
          {result.personArguments && result.personArguments.length > 0 && (
            <div className="p-4 bg-cyan-50 rounded-lg border-2 border-cyan-200">
              <h3 className="font-semibold mb-3">Kişi Ekleri ({result.personArguments.length})</h3>
              <div className="space-y-2">
                {result.personArguments.map((p: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-bold">{p.morpheme}</span>
                    <span className="text-gray-600">{p.code}</span>
                    <span className="text-gray-500">— {p.gloss}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ONEKLER */}
          {result.lemmaPrefixes && result.lemmaPrefixes.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold mb-3">Önekler ({result.lemmaPrefixes.length})</h3>
              <div className="space-y-2">
                {result.lemmaPrefixes.map((p: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-bold">{p.morpheme}</span>
                    <span className="text-gray-600">{p.slot}</span>
                    {p.gloss && <span className="text-gray-500">— {p.gloss}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SONEKLER */}
          {result.lemmaSuffixes && result.lemmaSuffixes.length > 0 && (
            <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <h3 className="font-semibold mb-3">Sonekler ({result.lemmaSuffixes.length})</h3>
              <div className="space-y-2">
                {result.lemmaSuffixes.map((s: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-bold">{s.morpheme ?? s.suffix ?? '—'}</span>
                    {s.code && <span className="text-gray-600">{s.code}</span>}
                    {s.case && <span className="text-gray-600">{s.case}</span>}
                    {s.gloss && <span className="text-gray-500">— {s.gloss}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KOK ESLESMELERI */}
          {result.rootMatches && result.rootMatches.length > 0 && (
            <div className="p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
              <h3 className="font-semibold mb-3">Kök Eşleşmeleri ({result.rootMatches.length})</h3>
              <div className="space-y-2">
                {result.rootMatches.map((m: any, i: number) => (
                  <div key={i} className="text-sm">
                    <span className="font-semibold">{m.matchType}</span>
                    <span className="text-gray-600"> — {m.matchedItem}</span>
                    {m.meaning && <span className="text-gray-500"> = {m.meaning}</span>}
                    {m.meaningPrimary && <span className="text-gray-500"> = {m.meaningPrimary}</span>}
                    {m.detectedSubroots && m.detectedSubroots.length > 0 && (
                      <div className="ml-4 mt-1 text-gray-500">
                        {m.detectedSubroots.map((s: any, j: number) => (
                          <span key={j} className="inline-block mr-2">
                            {s.root} ({s.meaning})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEHCE KARSILIKLARI */}
          <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
            <h3 className="font-semibold mb-3">Lehçe Karşılıkları</h3>
            {result.lexeme?.dialectVariants?.adyghe || result.lexeme?.dialectVariants?.kabardian ? (
              <div className="space-y-1 text-sm">
                {result.lexeme.dialectVariants.adyghe && (
                  <p><strong>Adigece:</strong> <span className="font-mono">{result.lexeme.dialectVariants.adyghe}</span></p>
                )}
                {result.lexeme.dialectVariants.kabardian && (
                  <p><strong>Kabardeyce:</strong> <span className="font-mono">{result.lexeme.dialectVariants.kabardian}</span></p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Bu kelime için lehçe bilgisi henüz eklenmemiş.</p>
            )}
          </div>

          {/* KELIME AILESI */}
          {result.wordFamily && result.wordFamily.length > 0 && (
            <div className="p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
              <h3 className="font-semibold mb-3">Kelime Ailesi ({result.wordFamily.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {result.wordFamily.map((w: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-bold">{w.form}</span>
                    {w.literalMeaning && (
                      <span className="text-gray-600">— {w.literalMeaning}</span>
                    )}
                    {w.rule && (
                      <span className="text-xs text-gray-500">({w.rule})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
