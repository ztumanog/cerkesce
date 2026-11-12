'use client';

import { useState, useMemo } from 'react';
import { DialectConverter, VERIFIED_PAIRS } from '@/domain/linguistic/DialectConverter';

const SAMPLE_PHRASES: ReadonlyArray<{ label: string; ady: string; kbd: string }> = [
  { label: 'Cümle (Gitmek)', ady: 'Тэ тыкӀуэщт мафэм', kbd: 'Дэ дыкӀуэнщ махуэм' },
  { label: 'Özgürlük', ady: 'шъхьэхуитыныгъэ', kbd: 'щхьэхуитыныгъэ' },
  { label: 'Gözyaşı', ady: 'нэпсы', kbd: 'нэпс' },
  { label: 'Tren', ady: 'машӀокушъо', kbd: 'мафӀэгу' },
  { label: 'Uçak', ady: 'къухьэлъатэ', kbd: 'кхъухьлъатэ' },
  { label: 'Sıcak gün', ady: 'мафэ фабэ', kbd: 'махуэ хуабэ' },
];

function convertTextWithPreservedPunctuation(
  text: string,
  direction: 'W2E' | 'E2W',
  converter: DialectConverter
): string {
  const trimmed = text.trim();
  if (!trimmed) return '';

  // Tek ifadede tam eslesme varsa (orn. "адэ къуэш") dogrudan donustur
  if (!trimmed.includes('\n') && trimmed.split(/\s+/).length <= 2) {
    const direct =
      direction === 'W2E'
        ? converter.convertWord(trimmed)
        : converter.convertWordReverse(trimmed);
    if (direct.toLowerCase() !== trimmed.toLowerCase()) {
      return direct;
    }
  }

  return text
    .split(/(\s+|[.,!?;:"()«»—–-]+)/)
    .map((token) => {
      if (!token || /^(\s+|[.,!?;:"()«»—–-]+)$/.test(token)) return token;
      const converted =
        direction === 'W2E'
          ? converter.convertWord(token)
          : converter.convertWordReverse(token);
      const isCapitalized =
        token[0] === token[0].toUpperCase() && token[0] !== token[0].toLowerCase();
      if (isCapitalized && converted.length > 0) {
        return converted[0].toUpperCase() + converted.slice(1);
      }
      return converted;
    })
    .join('');
}

export function DialectConverterComponent() {
  const converter = useMemo(() => new DialectConverter(), []);
  const [input, setInput] = useState('Тэ тыкӀуэщт мафэм');
  const [direction, setDirection] = useState<'W2E' | 'E2W'>('W2E');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    return convertTextWithPreservedPunctuation(input, direction, converter);
  }, [input, direction, converter]);

  const toggleDirection = () => {
    setDirection((d) => (d === 'W2E' ? 'E2W' : 'W2E'));
    if (output) setInput(output);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const sourceLabel = direction === 'W2E' ? 'Adıgece (Batı)' : 'Kabardeyce (Doğu)';
  const targetLabel = direction === 'W2E' ? 'Kabardeyce (Doğu)' : 'Adıgece (Batı)';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold">Lehçe Dönüştürücü</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adıgece ↔ Kabardeyce • Kelime ve cümle düzeyinde sesbilimsel + sözlüksel dönüşüm
            </p>
          </div>
          <button
            onClick={toggleDirection}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            ⇄ Yön: {sourceLabel} → {targetLabel}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Hızlı Örnekler */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hızlı Örnekler:</span>
          {SAMPLE_PHRASES.map((sample) => (
            <button
              key={sample.label}
              onClick={() => {
                setDirection('W2E');
                setInput(sample.ady);
              }}
              className="px-2.5 py-1 rounded-md text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors"
            >
              {sample.label}: <span className="font-mono text-emerald-700 dark:text-emerald-400">{sample.ady}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Girdi */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {sourceLabel}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={direction === 'W2E' ? 'Адыгэ псалъэ е гущыӀэухыгъэ...' : 'Къэбэрдей псалъэ е псалъэуха...'}
              className="mt-2 w-full h-40 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              spellCheck={false}
            />
          </div>

          {/* Çıktı */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {targetLabel}
            </label>
            <div className="mt-2 w-full h-40 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 text-xl font-mono text-emerald-700 dark:text-emerald-300 overflow-auto whitespace-pre-wrap">
              {output || <span className="text-slate-400 text-base">Çeviri burada belirecek...</span>}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm hover:bg-slate-200 dark:hover:bg-slate-600"
              >
                {copied ? '✓ Kopyalandı' : 'Kopyala'}
              </button>
              <button
                onClick={() => setInput('')}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Temizle
              </button>
            </div>
          </div>
        </div>

        {/* Doğrulanmış Çiftler */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold">Temel Referans Çiftleri ({VERIFIED_PAIRS.length})</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Huvaj 4.865 kayıtlık paralel sözlük + sesbilimsel kural motoru ile desteklenmektedir
            </p>
          </div>
          <div className="max-h-96 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-xs uppercase text-slate-500">Adıgece</th>
                  <th className="text-left px-4 py-2 font-medium text-xs uppercase text-slate-500">Kabardeyce</th>
                  <th className="text-left px-4 py-2 font-medium text-xs uppercase text-slate-500">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {VERIFIED_PAIRS.map(([ady, kbd]) => (
                  <tr key={ady + kbd} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-2 font-mono">{ady}</td>
                    <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{kbd}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setDirection('W2E');
                          setInput(ady);
                        }}
                        className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        Dönüştür
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DialectConverterComponent;