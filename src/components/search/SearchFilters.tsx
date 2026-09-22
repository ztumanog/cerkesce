/**
 * @file src/components/search/CollapsibleSources.tsx
 * @description Çok sayıda sözlük kaynağını daraltılabilir (collapsible) kutu içinde listeleyen bileşen.
 */

'use client';

import React, { useState } from 'react';

export interface SourceItem {
  id: string;        // Eşleşme için benzersiz kimlik (örn: 'Hilmi', 'Jonty')
  label: string;     // Butonda görünecek ad
  fullTitle?: string;// Hover yapıldığında görünecek tam başlık
  count?: number;    // İsteğe bağlı sonuç veya kelime sayısı
}

interface CollapsibleSourcesProps {
  sources: SourceItem[];
  selected: string[];
  onToggle: (sourceId: string) => void;
  onClear: () => void;
  defaultOpen?: boolean;
}

export const CollapsibleSources: React.FC<CollapsibleSourcesProps> = ({
  sources,
  selected,
  onToggle,
  onClear,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const totalSources = sources.length;
  const selectedCount = selected.length;

  return (
    <div className="w-full flex flex-col gap-1.5 select-none">
      {/* BAŞLIK VE AÇ-KAPA BUTONU */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Sözlük Kaynakları
        </span>

        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300">
              {selectedCount} seçili
            </span>
          )}
          <span className="text-[11px] text-slate-400">
            {totalSources} kaynak
          </span>
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {/* AÇILIR LİSTE KUTUSU */}
      {isOpen && (
        <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-2 flex flex-wrap gap-1.5">
          {/* HEPSİNİ TEMİZLE / TÜMÜ BUTONU */}
          <button
            type="button"
            onClick={onClear}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedCount === 0
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Tümü
          </button>

          {/* KAYNAK BUTONLARI */}
          {sources.map((src) => {
            const isActive = selected.includes(src.id);
            return (
              <button
                key={src.id}
                type="button"
                title={src.fullTitle || src.label}
                onClick={() => onToggle(src.id)}
                className={`max-w-[200px] truncate rounded-md px-2.5 py-1 text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="truncate">{src.label}</span>
                {src.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {src.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};