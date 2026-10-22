'use client';

import { useState, useMemo } from 'react';
import { DialectConverter, VERIFIED_PAIRS } from '@/domain/linguistic/DialectConverter';

export function DialectConverterComponent() {
  const converter = useMemo(() => new DialectConverter(), []);
  const [input, setInput] = useState('дышъэ');
  const [direction, setDirection] = useState<'W2E' | 'E2W'>('W2E');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return direction === 'W2E'
      ? converter.convertWord(input)
      : converter.convertWordReverse(input);
  }, [input, direction, converter]);

  const toggleDirection = () => {
    setDirection(d => (d === 'W2E' ? 'E2W' : 'W2E'));
    setInput(output);
  };

  const sourceLabel = direction === 'W2E' ? 'Adıgece (Batı)' : 'Kabardeyce (Doğu)';
  const targetLabel = direction === 'W2E' ? 'Kabardeyce (Doğu)' : 'Adıgece (Batı)';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Lehçe Dönüştürücü</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adıgece ↔ Kabardeyce • {VERIFIED_PAIRS.length} doğrulanmış çift
            </p>
          </div>
          <button
            onClick={toggleDirection}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
          >
            ⇄ Yön: {sourceLabel} → {targetLabel}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Girdi */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {sourceLabel}
            </label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={direction === 'W2E' ? 'Адыгэ псалъэ...' : 'Къэбэрдей псалъэ...'}
              className="mt-2 w-full h-40 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              spellCheck={false}
            />
          </div>

          {/* Çıktı */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {targetLabel}
            </label>
            <div className="mt-2 w-full h-40 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 text-xl font-mono text-emerald-700 dark:text-emerald-300 overflow-auto">
              {output || <span className="text-slate-400 text-base">Çeviri burada belirecek...</span>}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm hover:bg-slate-200 dark:hover:bg-slate-600"
              >
                Kopyala
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
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold">Doğrulanmış Çiftler ({VERIFIED_PAIRS.length})</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Huvaj, AP, Ara, AIG, Ru&En, En_Adam, ThreeVolumes, Tharkaho, Jonty, 1960, Sukunov
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
