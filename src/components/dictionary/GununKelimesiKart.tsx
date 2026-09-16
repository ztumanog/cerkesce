'use client';

import React, { useEffect, useState } from 'react';
import { selectDailyWord, getTodayDateString } from '@/utils/dailyWordEngine';
import type { GununKelimesi } from '@/types/dictionary';
import type { RawDictionaryEntry } from '@/utils/dailyWordEngine';

interface GununKelimesiKartProps {
  veri?: GununKelimesi;
  className?: string;
}

const KELIMELER_VERITABANI: RawDictionaryEntry[] = [
  {
    id: '1',
    lemma: 'СиIэшIу',
    translation: 'Tatlım, canım',
    dialect: 'Adigece',
    examples: [{ text: 'СиIэшIу, уэ дахэ?', translation: 'Tatlım, nasılsın?' }],
    etymology: 'Adıgece kökenli',
  },
  {
    id: '2',
    lemma: 'адыгэ',
    translation: 'Çerkes, Adıgeli',
    dialect: 'Adigece',
    examples: [{ text: 'Адыгэ адыгабзэ ихьэу.', translation: 'Çerkesçe konuşuyorum.' }],
    etymology: 'Proto-Kafkas kökünden',
  },
  {
    id: '3',
    lemma: 'адыгабзэ',
    translation: 'Adıgece dili',
    dialect: 'Adigece',
    examples: [{ text: 'Адыгабзэ щIалэ.', translation: 'Adıgece güzeldir.' }],
    etymology: 'Adıgece + dil anlamında',
  },
  {
    id: '4',
    lemma: 'нарт',
    translation: 'Kahraman, efsanevi figür',
    dialect: 'Kabardeyce',
    examples: [{ text: 'Нартхэр щIалэ.', translation: 'Nartlar efsanevi.' }],
    etymology: 'Eski Kafkas mitolojisinden',
  },
  {
    id: '5',
    lemma: 'къэбэрдей',
    translation: 'Kabarday, Kabardeyce',
    dialect: 'Kabardeyce',
    examples: [{ text: 'Къэбэрдей хабзэ.', translation: 'Kabarday geleneği.' }],
    etymology: 'Kafkas kökenli',
  },
  {
    id: '6',
    lemma: 'адыгэ хабзэ',
    translation: 'Adıgece geleneği, adab-ı muaşeret',
    dialect: 'Adigece',
    examples: [{ text: 'Адыгэ хабзэ щIалэ.', translation: 'Adıgece geleneği güzeldir.' }],
    etymology: 'Adıgece + gelenek',
  },
  {
    id: '7',
    lemma: 'къэбэрдей хабзэ',
    translation: 'Kabarday geleneği',
    dialect: 'Kabardeyce',
    examples: [{ text: 'Къэбэрдей хабзэ щIалэ.', translation: 'Kabarday geleneği güzeldir.' }],
    etymology: 'Kabarday + gelenek',
  },
];

const ABAZE_SOZLUK_DOSYASI = '/data/27.Tur-Ady_Abaze.json';

function htmlMetniniCikar(value: unknown): string {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function abazeSozlugunuYukle(): Promise<RawDictionaryEntry[]> {
  const response = await fetch(ABAZE_SOZLUK_DOSYASI);
  if (!response.ok) throw new Error(`Abaze sözlüğü yüklenemedi: ${response.status}`);

  const data = await response.json();
  const words = data?.words;
  if (!words || typeof words !== 'object') return [];

  return Object.entries(words)
    .map(([id, value]) => {
      const item = value as { spelling?: string; full_definition_in_html?: string };
      const translation = htmlMetniniCikar(item.full_definition_in_html);
      return {
        id,
        lemma: item.spelling || id,
        translation,
        dialect: 'Adigece',
      };
    })
    .filter((entry) => entry.lemma && entry.translation);
}

export default function GununKelimesiKart({
  veri,
  className = '',
}: GununKelimesiKartProps) {
  const [bugunKelimesi, setBugunKelimesi] = useState<GununKelimesi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (veri) {
      setBugunKelimesi(veri);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const load = async () => {
      let kelimeler = KELIMELER_VERITABANI;
      try {
        const abazeKelimeleri = await abazeSozlugunuYukle();
        if (abazeKelimeleri.length > 0) kelimeler = abazeKelimeleri;
      } catch (error) {
        console.warn('Abaze sözlüğü yüklenemedi, fallback liste kullanılacak:', error);
      }

      if (cancelled) return;

      const today = getTodayDateString();
      const selected = selectDailyWord(kelimeler, today);

      if (selected) {
        const kelime: GununKelimesi = {
          id: selected.id,
          kelime: selected.kelime,
          anlam: selected.anlam,
          lehce: selected.lehce,
          tarih: selected.tarih,
          meta: {
            seviye: 'Başlangıç',
            kategori: selected.meta?.kategori,
            notlar: selected.meta?.notlar,
          },
        };

        setBugunKelimesi(kelime);
        console.log('✅ Günün Kelimesi Seçildi:', kelime.kelime);
      } else {
        console.warn('⚠️ Kelime seçilemedi');
      }

      setLoading(false);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [veri]);

  if (loading || !bugunKelimesi) {
    return (
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 animate-pulse">
        <div className="h-8 bg-indigo-200 dark:bg-indigo-800 rounded w-1/3 mb-4" />
        <div className="h-6 bg-indigo-100 dark:bg-indigo-900 rounded w-2/3" />
      </div>
    );
  }

  const { kelime, anlam, lehce, meta } = bugunKelimesi;

  return (
    <details className={`group rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800 shadow-sm transition-all hover:shadow-md ${className}`}>
      <summary className="list-none cursor-pointer p-4 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset">
      <header className="flex justify-between items-center mb-2 sm:mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700">
          ✨ Günün Kelimesi
        </span>
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
          {lehce || 'Bilinmeyen'}
        </span>
      </header>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-indigo-100">
          {kelime}
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {anlam}
        </p>
      </div>

      </summary>

      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
      {meta?.notlar && (
        <figure className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-900/30 p-3 rounded-xl">
          <blockquote className="text-sm font-medium text-slate-800 dark:text-slate-200 italic">
            &ldquo;{meta.notlar}&rdquo;
          </blockquote>
        </figure>
      )}

      {meta?.kategori && (
        <footer className="mt-3 sm:mt-4 text-xs text-slate-500 dark:text-slate-400">
          <span>📖 Etymoloji: </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {meta.kategori}
          </span>
        </footer>
      )}

      {meta?.seviye && (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          <span>📚 Seviye: </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {meta.seviye}
          </span>
        </div>
      )}
      </div>
    </details>
  );
}