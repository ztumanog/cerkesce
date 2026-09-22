'use client';

import React from 'react';

export type LanguageFilterValue =
  | 'ALL'
  | 'CIRC'
  | 'TR'
  | 'EN'
  | 'RU'
  | 'AR'
  | 'MULTI';

export interface LanguageFilterProps {
  value: LanguageFilterValue;
  onChange: (value: LanguageFilterValue) => void;
  counts?: Record<LanguageFilterValue, number>;
}

export function LanguageFilter({
  value,
  onChange,
  counts,
}: LanguageFilterProps) {
  const options: Array<{
    id: LanguageFilterValue;
    label: string;
  }> = [
    { id: 'ALL', label: 'Tümü' },
    { id: 'CIRC', label: 'Çerkesçe' },
    { id: 'TR', label: 'Türkçe' },
    { id: 'EN', label: 'English' },
    { id: 'RU', label: 'Русский' },
    { id: 'AR', label: 'العربية' },
    { id: 'MULTI', label: 'Çok Dilli (Ru-En)' },
  ];

  // Sadece "Tümü" + sayısı > 0 olanları göster
  const visibleOptions = options.filter(
    (opt) => opt.id === 'ALL' || (counts?.[opt.id] ?? 0) > 0
  );

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="language-filter"
        className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 shrink-0"
      >
        Dil:
      </label>
      <select
        id="language-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageFilterValue)}
        className="flex-1 max-w-[220px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors cursor-pointer"
      >
        {visibleOptions.map((opt) => {
          const count = counts?.[opt.id];
          return (
            <option key={opt.id} value={opt.id}>
              {opt.label}
              {typeof count === 'number' ? ` (${count})` : ''}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default LanguageFilter;