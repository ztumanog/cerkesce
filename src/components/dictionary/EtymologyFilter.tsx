'use client';

import React from 'react';

export type EtymologyFilterValue = 'ALL' | 'native' | 'loanword' | 'proper_noun' | 'affix';

export interface EtymologyFilterProps {
  value: EtymologyFilterValue;
  onChange: (value: EtymologyFilterValue) => void;
  counts?: Partial<Record<EtymologyFilterValue, number>>;
}

export function EtymologyFilter({ value, onChange, counts }: EtymologyFilterProps) {
  const options: Array<{ id: EtymologyFilterValue; label: string }> = [
    { id: 'ALL', label: 'Tümü' },
    { id: 'native', label: 'Öz Çerkesçe' },
    { id: 'loanword', label: 'Alıntı' },
    { id: 'proper_noun', label: 'Özel İsim' },
    { id: 'affix', label: 'Ek' },
  ];

  return (
    <div role="tablist" aria-label="Köken Filtresi" className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
        Köken:
      </span>
      {options.map((opt) => {
        const isActive = value === opt.id;
        const count = counts?.[opt.id];

        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600'
            }`}
          >
            <span>{opt.label}</span>
            {typeof count === 'number' && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default EtymologyFilter;
