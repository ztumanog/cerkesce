'use client';

import { useState } from 'react';

// Onek slot cevirileri
const SLOT_TR: Record<string, string> = {
  person: 'Kişi',
  reflexive: 'Dönüşlü',
  directional: 'Yönelme',
  version: 'Versiyon',
  comitative: 'Birliktelik',
  locative: 'Yersel',
  causative: 'Ettirgen',
  factitive: 'Faktitif',
};

// Sonek kod cevirileri
const SUFFIX_CODE_TR: Record<string, string> = {
  FUTURE_NEGATION: 'Olumsuz Gelecek',
  IMPERFECT_NEGATION: 'Olumsuz Geniş/Geçmiş',
  FINITE_NEGATION: 'Olumsuzluk',
  PRETERITE_DECLARATIVE: 'Belirli Geçmiş Bildirme',
  ANTERIOR_PLUPERFECT: 'Uzak Geçmiş Anterior',
  PLUPERFECT: 'Uzak Geçmiş',
  PAST_ANTERIOR: 'Geçmiş Anterior',
  PRETERITE: 'Belirli Geçmiş',
  IMPERFECT_DYN: 'Şimdiki Hikaye',
  IMPERFECT: 'Geçmiş Süreklilik',
  FACTUAL_FUTURE: 'Kesin Gelecek',
  FUTURE_BASE: 'Gelecek Tabanı',
  CATEGORICAL_FUTURE: 'Kategorik Gelecek',
  REPETITIVE: 'Tekrar',
  POTENTIAL: 'Yeterlilik',
  TOTALITIVE: 'Tamamen',
  CONDITIONAL: 'Şart',
  CONDITIONAL_SHORT: 'Şart (Kısa)',
  INDICATIVE: 'Bildirme',
};

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
  suffixes?: Array<{ morpheme?: string; code?: string; gloss?: string }>;
  rootMatches?: any[];
  frequency?: { kabardian: number; adyghe: number };
  allMeanings?: Array<{
    id: string;
    literalMeaning: string;
    partOfSpeech: string;
    ipa?: string;
    notes?: string;
  }>;
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
          placeholder="Örn: хъун"
          className="flex-1 px-4 py-2 border rounded-lg"
          suppressHydrationWarning
        />
        <button
          onClick={analyze}
          disabledf={loading}
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
          {/* TUM ANLAMLAR */}
          {result.allMeanings && result.allMeanings.length > 0 && (
            <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <h3 className="font-semibold mb-3">Tüm Anlamlar ({result.allMeanings.length})</h3>
              <div className="space-y-2">
                {result.allMeanings.map((m: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-semibold">{m.literalMeaning}</span>
                      <span className="text-gray-500 ml-2">({m.partOfSpeech})</span>
                      {m.notes && <div className="text-xs text-gray-400 mt-1">{m.notes}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KELIME OZETI */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">Kelime: {result.word}</h2>
            {result.lexeme?.ipa && (
              <p className="text-sm text-gray-600">IPA: {result.lexeme.ipa}</p>
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

          {/* ONEKLER */}
          {result.lemmaPrefixes && result.lemmaPrefixes.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold mb-3">Önekler ({result.lemmaPrefixes.length})</h3>
              <div className="space-y-2">
                {result.lemmaPrefixes.map((p: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-bold">{p.morpheme ?? p.form ?? '—'}-</span>
                    <span className="text-gray-600">{SLOT_TR[p.slot] ?? p.slot}</span>
                    {p.gloss && <span className="text-gray-500">— {p.gloss}</span>}
                  </div>
                ))}
              </div>
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

          {/* SONEKLER */}
          {result.lemmaSuffixes && result.lemmaSuffixes.length > 0 && (
            <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <h3 className="font-semibold mb-3">Sonekler ({result.lemmaSuffixes.length})</h3>
              <div className="space-y-2">
                {result.lemmaSuffixes.map((s: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                   <span className="font-mono font-bold">{s.morpheme ?? s.suffix ?? '—'}</span>
{s.gloss ? (
  <span className="text-gray-500">— {s.gloss}</span>
) : s.code ? (
  <span className="text-gray-600">{SUFFIX_CODE_TR[s.code] ?? s.code}</span>
) : null}
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
