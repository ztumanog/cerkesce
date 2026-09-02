'use client';

import React, { useState, useMemo } from 'react';
import SearchBox from '@/components/dictionary/SearchBox';
import rawData from '@/data/dictionaryData.json';
import { DictionaryItem } from '@/types/dictionary';

export const SozlukEkrani: React.FC = () => {
  const [aramaMetni, setAramaMetni] = useState('');
  const entries = rawData as DictionaryItem[];

  const filtrelenmis = useMemo(() => {
    const q = aramaMetni.toLowerCase().trim();
    if (!q) return entries;
    return entries.filter(
      (item) =>
        item.word?.toLowerCase().includes(q) ||
        item.translation?.toLowerCase().includes(q)
    );
  }, [entries, aramaMetni]);

  return (
    <div className="space-y-6">
      <SearchBox aramaMetni={aramaMetni} onAramaDegis={setAramaMetni} />

      <div className="text-xs text-stone-400">
        Toplam Kayıt: <strong className="text-amber-500">{filtrelenmis.length}</strong>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtrelenmis.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg bg-stone-900 border border-stone-800 space-y-2 hover:border-amber-500/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-amber-500">{item.word}</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 uppercase">
                {item.dialect || 'Genel'}
              </span>
            </div>
            <p className="text-stone-200 text-base">{item.translation}</p>
            <div className="text-xs text-stone-500 italic pt-2 border-t border-stone-800">
              Kaynak: {item.dictionaryName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SozlukEkrani;