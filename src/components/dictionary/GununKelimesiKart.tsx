'use client';

import React, { useEffect, useState } from 'react';
import type { GununKelimesi } from '@/types/dictionary';

interface GununKelimesiKartProps {
  veri?: GununKelimesi;
  className?: string;
}

export default function GununKelimesiKart({
  veri,
  className = '',
}: GununKelimesiKartProps) {
  const [bugunKelimesi, setBugunKelimesi] = useState<GununKelimesi | null>(null);
  const [loading, setLoading] = useState(true);

  // GÜNÜN KELİMESİ VERİLERİ
  const kelimeler: GununKelimesi[] = [
    {
      id: '1',
      kelime: 'СиIэшIу',
      anlam: 'Tatlım, canım',
      lehce: 'Adigece',
      tarih: new Date().toISOString(),
      meta: {
        etimoloji: 'Adıgece kökenli',
        ornekCumle: 'СиIэшIу, уэ дахэ?',
        ornekCumleCeviri: 'Tatlım, nasılsın?',
      },
    },
    {
      id: '2',
      kelime: 'адыгэ',
      anlam: 'Çerkes, Adıgeli',
      lehce: 'Adigece',
      tarih: new Date().toISOString(),
      meta: {
        etimoloji: 'Proto-Kafkas kökünden',
        ornekCumle: 'Адыгэ адыгабзэ ихьэу.',
        ornekCumleCeviri: 'Çerkesçe konuşuyorum.',
      },
    },
    {
      id: '3',
      kelime: 'адыгабзэ',
      anlam: 'Adıgece dili',
      lehce: 'Adigece',
      tarih: new Date().toISOString(),
      meta: {
        etimoloji: 'Adıgece + dil anlamında',
      },
    },
    {
      id: '4',
      kelime: 'нарт',
      anlam: 'Kahraman, efsanevi figür',
      lehce: 'Kabardeyce',
      tarih: new Date().toISOString(),
      meta: {
        etimoloji: 'Eski Kafkas mitolojisinden',
      },
    },
    {
      id: '5',
      kelime: 'къэбэрдей',
      anlam: 'Kabarday, Kabardeyce',
      lehce: 'Kabardeyce',
      tarih: new Date().toISOString(),
    },
    {
      id: '6',
      kelime: 'адыгэ хабзэ',
      anlam: 'Adıgece geleneği, adab-ı muaşeret',
      lehce: 'Adigece',
      tarih: new Date().toISOString(),
      meta: {
        etimoloji: 'Adıgece + gelenek',
      },
    },
    {
      id: '7',
      kelime: 'къэбэрдей хабзэ',
      anlam: 'Kabarday geleneği',
      lehce: 'Kabardeyce',
      tarih: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    // Eğer veri gönderildiyse onu kullan
    if (veri) {
      setBugunKelimesi(veri);
      setLoading(false);
      return;
    }

    // Yoksa rastgele seç
    const rastgeleIndex = Math.floor(Math.random() * kelimeler.length);
    const secilen = kelimeler[rastgeleIndex];
    
    console.log('🎲 Rastgele kelime seçildi:', secilen.kelime);
    
    setBugunKelimesi(secilen);
    setLoading(false);
  }, []); // ← BOŞA BAĞLA (sadece mount'da çalış)

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
    <article
      className={`p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800 shadow-sm transition-all hover:shadow-md ${className}`}
    >
      {/* HEADER */}
      <header className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700">
          ✨ Günün Kelimesi
        </span>
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
          {lehce || 'Bilinmeyen'}
        </span>
      </header>

      {/* KELİME VE ANLAM */}
      <div className="space-y-2 mb-4">
        <h3 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
          {kelime}
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {anlam}
        </p>
      </div>

      {/* ÖRNEK CUMLE */}
      {meta?.ornekCumle && (
        <figure className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-900/30 p-3 rounded-xl">
          <blockquote className="text-sm font-medium text-slate-800 dark:text-slate-200 italic">
            &ldquo;{meta.ornekCumle}&rdquo;
          </blockquote>
          {meta.ornekCumleCeviri && (
            <figcaption className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {meta.ornekCumleCeviri}
            </figcaption>
          )}
        </figure>
      )}

      {/* ETİMOLOJİ */}
      {meta?.etimoloji && (
        <footer className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          <span>📖 Etimoloji: </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {meta.etimoloji}
          </span>
        </footer>
      )}

      {/* KÖK KELİME */}
      {meta?.kokKelime && (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          <span>🌳 Kök Kelime: </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {meta.kokKelime}
          </span>
        </div>
      )}
    </article>
  );
}
