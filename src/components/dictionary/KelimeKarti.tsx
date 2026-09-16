'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { KaynakItem } from '@/types/dictionary';

export interface KelimeItem {
  id: string;
  kelime: string;
  madde?: string;
  anlam?: string;
  ilkAnlam?: string;
  anlamlar?: string[];
  kaynaklar?: KaynakItem[];
  lehce?: string;
}

export interface KelimeKartiProps {
  data: KelimeItem;
  onClick?: () => void;
}

const decodeHtmlEntities = (str: string): string => {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getAnlamMetin = (data: KelimeItem): string => {
  const rawAnlam = data.ilkAnlam || data.anlamlar?.[0] || data.anlam;
  if (!rawAnlam) return '—';
  if (typeof rawAnlam === 'string') return decodeHtmlEntities(rawAnlam);
  return '—';
};

const getLehceBadgeClass = (lehce?: string): string => {
  if (!lehce) return 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
  const code = lehce.toUpperCase().trim();
  switch (code) {
    case 'ADY':
    case 'ADIGE':
    case 'BATU':
      return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    case 'KBD':
    case 'KABARDEY':
    case 'DOGU':
      return 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    default:
      return 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700';
  }
};

const formatKaynakDetayi = (kaynakItem: unknown): string => {
  if (!kaynakItem) return '';
  if (typeof kaynakItem === 'string') return kaynakItem;
  if (typeof kaynakItem === 'object') {
    const itemObj = kaynakItem as Record<string, unknown>;
    const sourceObj = (itemObj.kaynak || itemObj) as Record<string, unknown>;
    const title = String(sourceObj.title || sourceObj.sözlük || sourceObj.kaynak || sourceObj.dictionaryName || sourceObj.name || '');
    const author = String(sourceObj.author || sourceObj.yazar || '');
    const year = String(sourceObj.year || sourceObj.yil || '');
    const totalWordsRaw = sourceObj.total_words ?? sourceObj.totalWords ?? sourceObj.kelimeSayisi;
    const formattedTotalWords = totalWordsRaw
      ? `${typeof totalWordsRaw === 'number' ? totalWordsRaw.toLocaleString('tr-TR') : totalWordsRaw} kelime`
      : '';
    const detaylar = [title, author, year, formattedTotalWords].filter(Boolean);
    return detaylar.join(' | ') || 'Bilinmeyen Kaynak';
  }
  return 'Bilinmeyen Kaynak';
};

export const KelimeKarti: React.FC<KelimeKartiProps> = ({ data, onClick }) => {
  if (!data) return null;

  const ilkAnlamMetin = getAnlamMetin(data);
  const kaynaklar = data.kaynaklar || [];
  const ilkKaynak = kaynaklar[0];
  const kalanKaynakSayisi = kaynaklar.length - 1;
  const karsilikSayisi = new Set(
    (data.anlamlar || []).map((anlam) => anlam.trim().toLocaleLowerCase('tr-TR')).filter(Boolean),
  ).size;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all hover:border-amber-500 dark:hover:border-amber-500 group flex items-start justify-between gap-3"
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-bold text-amber-600 dark:text-orange-500 group-hover:text-amber-700 dark:group-hover:text-orange-400 transition-colors truncate">
            {data.kelime}
          </h3>
          {data.lehce && (
            <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border shrink-0 ${getLehceBadgeClass(data.lehce)}`}>
              {data.lehce}
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-800 dark:text-zinc-200 line-clamp-1 leading-snug font-medium">
          {ilkAnlamMetin}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold">
          <span className="rounded-md bg-orange-100 px-2 py-1 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">Kavram</span>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {karsilikSayisi || (ilkAnlamMetin !== '—' ? 1 : 0)} karşılık
          </span>
          <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            {kaynaklar.length} kaynak
          </span>
        </div>
        {ilkKaynak && (
          <div className="flex items-center gap-1.5 pt-0.5 min-w-0 text-xs">
            <div className="flex min-w-0 flex-1 items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <span className="truncate font-normal">{formatKaynakDetayi(ilkKaynak)}</span>
              {kalanKaynakSayisi > 0 && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium shrink-0">
                    +{kalanKaynakSayisi} kaynak
                  </span>
                </>
              )}
            </div>
            <span className="shrink-0 font-semibold text-amber-700 transition-colors group-hover:text-amber-500 dark:text-amber-400">
              Detay →
            </span>
          </div>
        )}
      </div>
      <ChevronRight size={18} className="text-zinc-300 dark:text-zinc-700 flex-shrink-0 group-hover:text-amber-500 transition-colors mt-1" />
    </button>
  );
};

export default KelimeKarti;