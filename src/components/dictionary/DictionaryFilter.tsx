'use client';

import React, { useMemo } from 'react';

export type DictionaryFilterValue = string; // 'ALL' veya kaynak adi

export interface DictionaryFilterGroup {
  group: string;      // "TÜRKÇE", "İNGİLİZCE", vs.
  items: string[];    // ["Huvaj (2007)", "Hilmi (2013)", ...]
}

export interface DictionaryFilterProps {
  value: DictionaryFilterValue;
  onChange: (value: DictionaryFilterValue) => void;
  options: DictionaryFilterGroup[];
  counts?: Record<string, number>;
}

export function DictionaryFilter({
  value,
  onChange,
  options,
  counts,
}: DictionaryFilterProps) {
  // Sadece "sayisi > 0" olanlari goster
  const visibleGroups = useMemo(() => {
    return options
      .map((g) => ({
        group: g.group,
        items: g.items.filter((opt) => (counts?.[opt] ?? 0) > 0),
      }))
      .filter((g) => g.items.length > 0);
  }, [options, counts]);

  if (visibleGroups.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="dictionary-filter"
        className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 shrink-0"
      >
        Sözlük:
      </label>
      <select
        id="dictionary-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 max-w-[320px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors cursor-pointer"
      >
        <option value="ALL">
          Tümü
          {typeof counts?.ALL === 'number' ? ` (${counts.ALL})` : ''}
        </option>
        {visibleGroups.map((g) => (
          <optgroup key={g.group} label={g.group}>
            {g.items.map((opt) => (
              <option key={opt} value={opt} title={opt}>
                {opt}
                {typeof counts?.[opt] === 'number' ? ` (${counts[opt]})` : ''}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default DictionaryFilter;
