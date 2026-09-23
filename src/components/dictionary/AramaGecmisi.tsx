'use client';

import React from 'react';
import { Clock, Trash2, X } from 'lucide-react';

interface AramaGecmisiProps {
  gecmis: string[];
  onSec: (sorgu: string) => void;
  onSil: (sorgu: string) => void;
  onTemizle: () => void;
}

export default function AramaGecmisi({
  gecmis,
  onSec,
  onSil,
  onTemizle,
}: AramaGecmisiProps) {
  if (gecmis.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Clock size={12} />
          <span>Son Aramalar</span>
        </div>
        <button
          type="button"
          onClick={onTemizle}
          aria-label="Geçmişi temizle"
          className="text-[10px] text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-0.5"
        >
          <Trash2 size={10} />
          Temizle
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {gecmis.map((sorgu, idx) => (
          <div
            key={`${sorgu}-${idx}`}
            className="group flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors"
          >
            <button
              type="button"
              onClick={() => onSec(sorgu)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {sorgu}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSil(sorgu);
              }}
              aria-label={`${sorgu} aramasını sil`}
              className="p-1 mr-0.5 rounded text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}