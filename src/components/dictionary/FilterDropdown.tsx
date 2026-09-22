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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  // Açıldığında panel konumunu hesapla
  useEffect(() => {
    if (!acik || !buttonRef.current) return;

    const updatePosition = () => {
      const btn = buttonRef.current?.getBoundingClientRect();
      if (!btn) return;

      const panelWidth = Math.min(window.innerWidth * 0.9, 640);
      const margin = 8;

      let left = btn.right - panelWidth;
      if (left < margin) left = margin;
      if (left + panelWidth > window.innerWidth - margin) {
        left = window.innerWidth - panelWidth - margin;
      }

      setPanelPos({
        top: btn.bottom + 8,
        left,
        width: panelWidth,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [acik]);

  // Dış tıklama + Escape
  useEffect(() => {
    if (!acik) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        wrapperRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setAcik(false);
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
    <div ref={wrapperRef} className="relative inline-block">
      <button
        ref={buttonRef}
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
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            top: `${panelPos.top}px`,
            left: `${panelPos.left}px`,
            width: `${panelPos.width}px`,
            maxHeight: `calc(100vh - ${panelPos.top + 16}px)`,
          }}
          className="z-[9999] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <FilterPanel {...panelProps} />
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;