'use client';

import React from 'react';
import DialectFilter, {
  type DialectFilterValue,
} from '@/components/dictionary/DialectFilter';
import LanguageFilter, {
  type LanguageFilterValue,
} from '@/components/dictionary/LanguageFilter';

export interface FilterPanelProps {
  dialectFilter: DialectFilterValue;
  onDialectChange: (v: DialectFilterValue) => void;
  dialectCounts?: Record<DialectFilterValue, number>;

  languageFilter: LanguageFilterValue;
  onLanguageChange: (v: LanguageFilterValue) => void;
  languageCounts?: Record<LanguageFilterValue, number>;
}

export function FilterPanel({
  dialectFilter,
  onDialectChange,
  dialectCounts,
  languageFilter,
  onLanguageChange,
  languageCounts,
}: FilterPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 shadow-lg space-y-3">
      <div>
        <span className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Lehçe
        </span>
        <DialectFilter
          value={dialectFilter}
          onChange={onDialectChange}
          counts={dialectCounts}
        />
      </div>

      <div className="border-t border-slate-200/60 dark:border-slate-800/60" />

      <LanguageFilter
        value={languageFilter}
        onChange={onLanguageChange}
        counts={languageCounts}
      />
    </div>
  );
}

export default FilterPanel;