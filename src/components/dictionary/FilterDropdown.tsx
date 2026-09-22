'use client';

import React, { useState, useRef, useEffect } from 'react';
import FilterPanel, {
  type FilterPanelProps,
} from '@/components/dictionary/FilterPanel';

export interface FilterDropdownProps extends FilterPanelProps {
  activeCount?: number;
}

export function FilterDropdown({
  activeCount = 0,
  ...panelProps
}: FilterDropdownProps) {
  const [acik, setAcik] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!acik) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setAcik(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAcik(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [acik]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setAcik((v) => !v)}
        aria-expanded={acik}
        aria-label="Filtreleri aç/kapat"
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
          acik || activeCount > 0
            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600'
        }`}
      >
        <span className="text-sm">⚙️</span>
        <span className="hidden sm:inline">Filtreler</span>
        {activeCount > 0 && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/25 text-white font-bold">
            {activeCount}
          </span>
        )}
        <span className="text-[10px]">{acik ? '▲' : '▼'}</span>
      </button>

      {acik && (
        <div className="absolute top-full right-0 mt-2 z-50 w-[min(90vw,640px)] animate-in fade-in slide-in-from-top-2 duration-150">
          <FilterPanel {...panelProps} />
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
