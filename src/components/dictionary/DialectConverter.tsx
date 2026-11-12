'use client';

import { useState, useMemo, useRef } from 'react';
import { convertAdyToKbd, convertKbdToAdy } from '@/lib/dialectConverter';
import { VERIFIED_PAIRS } from '@/domain/linguistic/DialectConverter';
import { resolveDialectVariantDisplay } from '@/lib/linguistic/dialectVariantsHelper';
import { AkilliKlavye } from '@/components/features/AkilliKlavye';

const SAMPLE_PHRASES: ReadonlyArray<{ label: string; ady: string; kbd: string }> = [
  { label: 'Cümle (Gitmek)', ady: 'Тэ тыкӀуэщт мафэм', kbd: 'Дэ дыкӀуэнщ махуэм' },
  { label: 'Özgürlük', ady: 'шъхьэхуитыныгъэ', kbd: 'щхьэхуитыныгъэ' },
  { label: 'Gözyaşı', ady: 'нэпсы', kbd: 'нэпс' },
  { label: 'Tren', ady: 'машӀокушъо', kbd: 'мафӀэгу' },
  { label: 'Uçak', ady: 'къухьэлъат', kbd: 'кхъухьлъатэ' },
  { label: 'Sıcak gün', ady: 'мафэ фабэ', kbd: 'махуэ хуабэ' },
  { label: 'At yarışı', ady: 'шыгъажэ', kbd: 'шыгъажэ' },
];

function convertTextWithPreservedPunctuation(
  text: string,
  direction: 'W2E' | 'E2W'
): string {
  const trimmed = text.trim();
  if (!trimmed) return '';

  if (!trimmed.includes('\n') && trimmed.split(/\s+/).length <= 2) {
    const direct =
      direction === 'W2E'
        ? convertAdyToKbd(trimmed)
        : convertKbdToAdy(trimmed);
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
          ? convertAdyToKbd(token)
          : convertKbdToAdy(token);
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
  const [input, setInput] = useState('Тэ тыкӀуэщт мафэм');
  const [direction, setDirection] = useState<'W2E' | 'E2W'>('W2E');
  const [copied, setCopied] = useState(false);
  const [klavyeAcik, setKlavyeAcik] = useState(true);
  const [pairSearch, setPairSearch] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const output = useMemo(() => {
    return convertTextWithPreservedPunctuation(input, direction);
  }, [input, direction]);

  const tokenBreakdown = useMemo(() => {
    const words = input
      .split(/[\s.,!?;:"()«»—–-]+/)
      .map((w) => w.trim())
      .filter(Boolean);
    const uniqueWords = Array.from(new Set(words)).slice(0, 12);
    return uniqueWords.map((w) => {
      const display = resolveDialectVariantDisplay({
        form: w,
        dialect: direction === 'W2E' ? 'western' : 'dogu',
      });
      return { token: w, display };
    });
  }, [input, direction]);

  const filteredPairs = useMemo(() => {
    const q = pairSearch.trim().toLowerCase();
    if (!q) return VERIFIED_PAIRS;
    return VERIFIED_PAIRS.filter(
      ([ady, kbd]) => ady.toLowerCase().includes(q) || kbd.toLowerCase().includes(q)
    );
  }, [pairSearch]);

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
              Adıgece ↔ Kabardeyce • Huvaj &amp; 16 Akademik Sözlük Doğrulamalı Dönüşüm Motoru
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setKlavyeAcik((v) => !v)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                klavyeAcik
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-emerald-500'
              }`}
            >
              ⌨️ Akıllı Klavye
            </button>
            <button
              type="button"
              onClick={toggleDirection}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              ⇄ Yön: {sourceLabel} → {targetLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Hızlı Örnekler */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hızlı Örnekler:</span>
          {SAMPLE_PHRASES.map((sample) => (
            <button
              key={sample.label}
              type="button"
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
              ref={textareaRef}
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
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm hover:bg-slate-200 dark:hover:bg-slate-600"
              >
                {copied ? '✓ Kopyalandı' : 'Kopyala'}
              </button>
              <button
                type="button"
                onClick={() => setInput('')}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Temizle
              </button>
            </div>
          </div>
        </div>

        {/* Mevcut AkilliKlavye Bileşeni */}
        {klavyeAcik && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
            <AkilliKlavye
              inputRef={textareaRef}
              sorgu={input}
              setSorgu={setInput}
              selectedLang="circassian"
              onClear={() => setInput('')}
            />
          </div>
        )}

        {/* Kelime Bazlı Diyalekt Analizi */}
        {tokenBreakdown.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Kelime Bazlı Karşılaştırma</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">{tokenBreakdown.length} birim çözümlendi</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {tokenBreakdown.map(({ token, display }) => (
                <div
                  key={token}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-2.5 text-xs space-y-1"
                >
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-100">{token}</div>
                  {display && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 font-mono">
                        ADY: {display.adyghePrimary}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 font-mono">
                        KBD: {display.kabardianPrimary}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doğrulanmış Çiftler */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">Temel Referans Çiftleri ({filteredPairs.length} / {VERIFIED_PAIRS.length})</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Huvaj 4.865 kayıtlık paralel sözlük + 16 akademik sözlük kural motoru ile desteklenmektedir
              </p>
            </div>
            <input
              type="text"
              value={pairSearch}
              onChange={(e) => setPairSearch(e.target.value)}
              placeholder="Referans çiftlerinde ara..."
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
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
                {filteredPairs.map(([ady, kbd]) => (
                  <tr key={ady + kbd} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-2 font-mono">{ady}</td>
                    <td className="px-4 py-2 font-mono text-emerald-600 dark:text-emerald-400">{kbd}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setDirection('W2E');
                          setInput(ady);
                        }}
                        className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        ADY→KBD
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setDirection('E2W');
                          setInput(kbd);
                        }}
                        className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        KBD→ADY
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