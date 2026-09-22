'use client';

import React from 'react';

export type DialectFilterValue = 'ALL' | 'ADY' | 'KBD';

export interface DialectFilterProps {
  value: DialectFilterValue;
  onChange: (value: DialectFilterValue) => void;
  counts?: Record<DialectFilterValue, number>;
}

export function DialectFilter({ value, onChange, counts }: DialectFilterProps) {
  const options: Array<{ id: DialectFilterValue; label: string; short: string }> = [
    { id: 'ALL', label: 'Tümü', short: 'Tümü' },
    { id: 'ADY', label: 'Batı', short: 'Batı' },
    { id: 'KBD', label: 'Doğu', short: 'Doğu' },
  ];

  return (
    <div role="tablist" aria-label="Lehçe Filtresi" className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
        Lehçe:
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600'
            }`}
          >
            <span className="hidden sm:inline">{opt.label}</span>
            <span className="sm:hidden">{opt.short}</span>
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

export default DialectFilter;
