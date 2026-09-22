'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  selectDailyWord,
  selectMultipleDailyWords,
  getTodayDateString,
} from '@/utils/dailyWordEngine';
import PaylasimGorseliModal from '@/components/dictionary/PaylasimGorseliModal';
import type { GununKelimesi } from '@/types/dictionary';
import type { RawDictionaryEntry } from '@/utils/dailyWordEngine';

interface GununKelimesiKartProps {
  veri?: GununKelimesi;
  className?: string;
}

const KAYIT_KEY = 'acikmektep_kayitli_kelimeler';

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
      const ham = htmlMetniniCikar(item.full_definition_in_html);

      const parcalar = ham.split('◊');
      const anlam = parcalar[0].trim().replace(/[,;]\s*$/, '');
      const ornekler = parcalar
        .slice(1)
        .map((p) => p.trim().replace(/^[-–—]\s*/, ''))
        .filter((p) => p.length > 0);

      return {
        id,
        lemma: item.spelling || id,
        translation: anlam,
        ornekler: ornekler.length > 0 ? ornekler : undefined,
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
  const [digerKelimeler, setDigerKelimeler] = useState<GununKelimesi[]>([]);
  const [acikKelimeId, setAcikKelimeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [gorselModalAcik, setGorselModalAcik] = useState(false);

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
        setBugunKelimesi(selected);
      }

      const digerleri = selectMultipleDailyWords(kelimeler, 6, today)
        .filter((k) => k.id !== selected?.id)
        .slice(0, 4);
      setDigerKelimeler(digerleri);

      setLoading(false);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [veri]);

  const isSavedInStorage = useCallback((kelimeId: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const raw = localStorage.getItem(KAYIT_KEY);
      if (!raw) return false;
      const list = JSON.parse(raw);
      return Array.isArray(list) && list.some((k: any) => k.id === kelimeId);
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (bugunKelimesi) {
      setSaved(isSavedInStorage(bugunKelimesi.id));
    }
  }, [bugunKelimesi, isSavedInStorage]);

  const handleShare = useCallback(async () => {
    if (!bugunKelimesi) return;
    setShareLoading(true);

    const metin = [
      '🎓 Açık Mektep Çerkesçe Sözlük — Günün Kelimesi',
      '',
      `📖 Kelime: ${bugunKelimesi.kelime}`,
      `🇹🇷 Anlam: ${bugunKelimesi.anlam || '—'}`,
      bugunKelimesi.ornekler && bugunKelimesi.ornekler.length > 0
        ? `💬 Örnek:\n${bugunKelimesi.ornekler.map((o) => `  • ${o}`).join('\n')}`
        : bugunKelimesi.meta?.notlar
          ? `💬 Örnek: ${bugunKelimesi.meta.notlar}`
          : '',
      '',
      '🔗 https://acikmektep.com',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Açık Mektep Çerkesçe Sözlük',
          text: metin,
          url: 'https://acikmektep.com',
        });
        toast.success('Paylaşıldı');
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(metin);
        toast.success('Bağlantı panoya kopyalandı');
      } else {
        toast.error('Paylaşım desteklenmiyor');
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error('Paylaşım hatası:', err);
        toast.error('Paylaşım başarısız');
      }
    } finally {
      setShareLoading(false);
    }
  }, [bugunKelimesi]);

  const handleSave = useCallback(() => {
    if (!bugunKelimesi) return;

    try {
      const raw = localStorage.getItem(KAYIT_KEY);
      const list: any[] = raw ? JSON.parse(raw) : [];

      if (saved) {
        const yeniListe = list.filter((k: any) => k.id !== bugunKelimesi.id);
        localStorage.setItem(KAYIT_KEY, JSON.stringify(yeniListe));
        setSaved(false);
        toast.success('Kayıttan çıkarıldı');
      } else {
        const yeniKayit = {
          id: bugunKelimesi.id,
          kelime: bugunKelimesi.kelime,
          anlam: bugunKelimesi.anlam,
          ornekler: bugunKelimesi.ornekler || [],
          ornek: bugunKelimesi.meta?.notlar || '',
          tarih: bugunKelimesi.tarih,
          kaydedilmeTarihi: new Date().toISOString(),
        };
        list.push(yeniKayit);
        localStorage.setItem(KAYIT_KEY, JSON.stringify(list));
        setSaved(true);
        toast.success('Kelime kaydedildi');
      }
    } catch (err) {
      console.error('Kaydetme hatası:', err);
      toast.error('Kaydedilemedi');
    }
  }, [bugunKelimesi, saved]);

  if (loading || !bugunKelimesi) {
    return (
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 animate-pulse">
        <div className="h-8 bg-indigo-200 dark:bg-indigo-800 rounded w-1/3 mb-4" />
        <div className="h-6 bg-indigo-100 dark:bg-indigo-900 rounded w-2/3" />
      </div>
    );
  }

  const { kelime, anlam, lehce, meta, ornekler } = bugunKelimesi;

  return (
    <>
      <details
        className={`group rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800 shadow-sm transition-all hover:shadow-md ${className}`}
      >
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
          {ornekler && ornekler.length > 0 && (
            <div className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo-200 dark:border-indigo-800">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 mb-2">
                💬 Örnek Kullanım
              </div>
              <ul className="space-y-1.5">
                {ornekler.map((ornek, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-3 border-l-2 border-indigo-300 dark:border-indigo-700"
                  >
                    {ornek}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(!ornekler || ornekler.length === 0) && meta?.notlar && (
            <figure className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-900/30 p-3 rounded-xl">
              <blockquote className="text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                &ldquo;{meta.notlar}&rdquo;
              </blockquote>
            </figure>
          )}

          <div className="mt-4 pt-3 border-t border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              disabled={shareLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>📤</span>
              <span>{shareLoading ? 'Paylaşılıyor...' : 'Paylaş'}</span>
            </button>

            <button
              type="button"
              onClick={() => setGorselModalAcik(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span>📷</span>
              <span>Görsel</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                saved
                  ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <span>{saved ? '✅' : '💾'}</span>
              <span>{saved ? 'Kaydedildi' : 'Kaydet'}</span>
            </button>

            <Link
              href="/kaydedilenler"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white border border-indigo-600 hover:bg-indigo-700 transition-colors ml-auto"
            >
              <span>📚</span>
              <span>Kaydedilenler</span>
            </Link>
          </div>

          {digerKelimeler.length > 0 && (
            <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 mb-3">
                🌟 Diğer Kelimeler
              </div>
              <div className="space-y-2">
                {digerKelimeler.map((kelimeItem) => (
                  <div
                    key={kelimeItem.id}
                    className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white/60 dark:bg-slate-900/40 overflow-hidden transition-all hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setAcikKelimeId(
                          acikKelimeId === kelimeItem.id ? null : kelimeItem.id
                        )
                      }
                      className="w-full text-left p-3 flex items-center justify-between gap-2 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-indigo-900 dark:text-indigo-100 truncate">
                            {kelimeItem.kelime}
                          </span>
                          {kelimeItem.lehce && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 shrink-0">
                              {kelimeItem.lehce}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                          {kelimeItem.anlam}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] text-indigo-500 transition-transform ${
                          acikKelimeId === kelimeItem.id ? 'rotate-90' : ''
                        }`}
                      >
                        ▶
                      </span>
                    </button>

                    {acikKelimeId === kelimeItem.id && (
                      <div className="px-3 pb-3 space-y-2 border-t border-indigo-100 dark:border-indigo-900/50 pt-2">
                        {kelimeItem.ornekler && kelimeItem.ornekler.length > 0 ? (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                              💬 Örnek
                            </div>
                            <ul className="space-y-1">
                              {kelimeItem.ornekler.map((ornekItem, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-slate-700 dark:text-slate-300 pl-2 border-l-2 border-indigo-300 dark:border-indigo-700"
                                >
                                  {ornekItem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                            Örnek yok
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </details>

      {/* ⭐ PAYLAŞIM GÖRSELİ MODAL */}
      {bugunKelimesi && (
        <PaylasimGorseliModal
          isOpen={gorselModalAcik}
          onClose={() => setGorselModalAcik(false)}
          kelime={{
            kelime: bugunKelimesi.kelime || '',
            anlam: bugunKelimesi.anlam || '',
            ornekler: bugunKelimesi.ornekler,
            lehce: bugunKelimesi.lehce,
          }}
        />
      )}
    </>
  );
}