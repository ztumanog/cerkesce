'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { GruplanmisKelime, KaynakItem } from '@/types/dictionary';

interface KelimeKartiProps {
  data: GruplanmisKelime;
  onClick?: () => void;
}

const getAnlamMetin = (data: GruplanmisKelime): string => {
  const rawAnlam = data.ilkAnlam || data.anlamlar?.[0];
  if (!rawAnlam) return '—';
  if (typeof rawAnlam === 'string') return rawAnlam;
  return '—';
};

const formatKaynakDetayi = (kaynakItem: unknown): string => {
  if (!kaynakItem) return '';
  if (typeof kaynakItem === 'string') return kaynakItem;

  if (typeof kaynakItem === 'object') {
    const itemObj = kaynakItem as Record<string, unknown>;
    const sourceObj = (itemObj.kaynak || itemObj) as Record<string, unknown>;

    const title = String(
      sourceObj.title ||
        sourceObj.sözlük ||
        sourceObj.kaynak ||
        sourceObj.dictionaryName ||
        sourceObj.name ||
        ''
    );
    const author = String(sourceObj.author || sourceObj.yazar || '');
    const year = String(sourceObj.year || sourceObj.yil || '');

    const totalWordsRaw =
      sourceObj.total_words ??
      sourceObj.totalWords ??
      sourceObj.kelimeSayisi;
    const formattedTotalWords = totalWordsRaw
      ? `${typeof totalWordsRaw === 'number' ? totalWordsRaw.toLocaleString('tr-TR') : totalWordsRaw} kelime`
      : '';

    const detaylar = [title, author, year, formattedTotalWords].filter(
      Boolean
    );
    return detaylar.join(' | ') || 'Bilinmeyen Kaynak';
  }

  return 'Bilinmeyen Kaynak';
};

export const KelimeKarti: React.FC<KelimeKartiProps> = ({
  data,
  onClick,
}) => {
  if (!data) return null;

  const ilkAnlamMetin = getAnlamMetin(data);
  const kaynaklar = data.kaynaklar || [];
  const ilkKaynak = kaynaklar[0];
  const kalanKaynakSayisi = kaynaklar.length - 1;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all hover:border-[#FF4030] dark:hover:border-[#FF4030] group flex items-start justify-between gap-3"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-[#FF4030] truncate">
          {data.kelime}
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-1">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal mr-1">
            İlk anlam:
          </span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
            {ilkAnlamMetin}
          </span>
        </p>

        {ilkKaynak && (
          <div className="mt-2.5 text-xs text-zinc-600 dark:text-zinc-400">
            <p className="text-zinc-700 dark:text-zinc-300 truncate font-medium">
              {formatKaynakDetayi(ilkKaynak)}
            </p>
            {kalanKaynakSayisi > 0 && (
              <p className="text-zinc-500 dark:text-zinc-500 mt-0.5 font-normal">
                +{kalanKaynakSayisi} kaynak daha...
              </p>
            )}
          </div>
        )}
      </div>

      <ChevronRight
        size={20}
        className="text-zinc-300 dark:text-zinc-700 flex-shrink-0 group-hover:text-[#FF4030] transition-colors mt-1"
      />
    </button>
  );
};

export default KelimeKarti;
