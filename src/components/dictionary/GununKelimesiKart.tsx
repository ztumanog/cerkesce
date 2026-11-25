'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

import {
  selectDailyWord,
  selectMultipleDailyWords,
  getTodayDateString,
} from '@/utils/dailyWordEngine';
import { gununKelimesiHavuzuYukle } from '@/lib/gununKelimesi/kaynak';
import { cleanHtml } from '@/lib/paylasimGorseli';
import PaylasimGorseliModal from '@/components/dictionary/PaylasimGorseliModal';
import BildirimAyar from '@/components/dictionary/BildirimAyar';
import { useKaydedilenler } from '@/hooks/useKaydedilenler';
import type { GununKelimesi } from '@/types/dictionary';
import type { RawDictionaryEntry } from '@/utils/dailyWordEngine';

interface GununKelimesiKartProps {
  veri?: GununKelimesi;
  className?: string;
}



export default function GununKelimesiKart({
  veri,
  className = '',
}: GununKelimesiKartProps) {
  const [bugunKelimesi, setBugunKelimesi] = useState<GununKelimesi | null>(null);
  const [digerKelimeler, setDigerKelimeler] = useState<GununKelimesi[]>([]);
  const [acikKelimeId, setAcikKelimeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { kayitliMi, kayitToggle } = useKaydedilenler();
  const saved = bugunKelimesi ? kayitliMi(bugunKelimesi.id) : false;
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
      let kelimeler: RawDictionaryEntry[] = [];
      try {
        // Gunun-Kelimesi-001: build-time havuz (SSOT + Abaze İbrahim)
        kelimeler = await gununKelimesiHavuzuYukle();
      } catch (error) {
        console.warn('Günün kelimesi havuzu yüklenemedi, yedek liste kullanılacak:', error);
      }

      // Son çare: havuz dosyası hiç yoksa bile kart boş kalmasın
      if (kelimeler.length === 0) {
        kelimeler = [
          { id: 'y1', lemma: 'СиIэшIу', translation: 'Tatlım, canım', dialect: 'Adigece', ornekler: ['СиIэшIу, уэ дахэ?'] },
          { id: 'y2', lemma: 'адыгэ', translation: 'Çerkes, Adıgeli', dialect: 'Adigece', ornekler: ['Адыгэ адыгабзэ ихьэу.'] },
          { id: 'y3', lemma: 'адыгабзэ', translation: 'Adıgece dili', dialect: 'Adigece', ornekler: ['Адыгабзэ щIалэ.'] },
        ];
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


  const handleShare = useCallback(async () => {
    if (!bugunKelimesi) return;
    setShareLoading(true);

    const ornekMetni =
      bugunKelimesi.ornekCiftleri && bugunKelimesi.ornekCiftleri.length > 0
        ? bugunKelimesi.ornekCiftleri
            .map(
              (c) =>
                `  • ${cleanHtml(c.metin)}${c.ceviri ? `\n    (${cleanHtml(c.ceviri)})` : ''}`
            )
            .join('\n')
        : bugunKelimesi.ornekler && bugunKelimesi.ornekler.length > 0
          ? bugunKelimesi.ornekler.map((o) => `  • ${cleanHtml(o)}`).join('\n')
          : '';

    const metin = [
      '🎓 Açık Mektep Çerkesçe Sözlük — Günün Kelimesi',
      '',
      `📖 Kelime: ${cleanHtml(bugunKelimesi.kelime)}`,
      `🇹🇷 Anlam: ${cleanHtml(bugunKelimesi.anlam || '—')}`,
      ornekMetni ? `💬 Örnek:\n${ornekMetni}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      // 1. Android/iOS: Capacitor Share
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title: 'Açık Mektep Çerkesçe Sözlük',
          text: metin,
          url: 'https://acikmektep.com',
          dialogTitle: 'Paylaş',
        });
        toast.success('Paylaşıldı');
      }
      // 2. Web: Web Share API
      else if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Açık Mektep Çerkesçe Sözlük',
          text: metin,
          url: 'https://acikmektep.com',
        });
        toast.success('Paylaşıldı');
      }
      // 3. Fallback: Panoya kopyala
      else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(metin);
        toast.success('Metin panoya kopyalandı');
      } else {
        toast.error('Paylaşım veya kopyalama desteklenmiyor');
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error('Paylaşım hatası:', err);
        try {
          if (typeof navigator !== 'undefined' && navigator.clipboard) {
            await navigator.clipboard.writeText(metin);
            toast.success('Metin panoya kopyalandı');
          }
        } catch (copyErr) {
          toast.error('Paylaşım yapılırken bir hata oluştu');
        }
      }
    } finally {
      setShareLoading(false);
    }
  }, [bugunKelimesi]);

  const handleSave = useCallback(() => {
    if (!bugunKelimesi) return;
    const eklendi = kayitToggle({
      id: bugunKelimesi.id,
      kelime: bugunKelimesi.kelime,
      anlam: bugunKelimesi.anlam,
      lehce: bugunKelimesi.lehce,
      ornekler: bugunKelimesi.ornekler || [],
      ornek: bugunKelimesi.meta?.notlar || '',
      tarih: bugunKelimesi.tarih,
    });
    toast.success(eklendi ? 'Kelime kaydedildi' : 'Kayıttan çıkarıldı');
  }, [bugunKelimesi, kayitToggle]);

  if (loading || !bugunKelimesi) {
    return (
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 animate-pulse">
        <div className="h-8 bg-indigo-200 dark:bg-indigo-800 rounded w-1/3 mb-4" />
        <div className="h-6 bg-indigo-100 dark:bg-indigo-900 rounded w-2/3" />
      </div>
    );
  }

  const { kelime, anlam, lehce, meta, ornekler, ornekCiftleri } = bugunKelimesi;

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
          {/* ÖRNEK KULLANIM — Gunun-Kelimesi-001: çevirili iki katmanlı gösterim */}
          {ornekCiftleri && ornekCiftleri.length > 0 ? (
            <div className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo-200 dark:border-indigo-800">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 mb-2">
                💬 Örnek Kullanım
              </div>
              <ul className="space-y-2">
                {ornekCiftleri.map((cift, idx) => (
                  <li key={idx} className="pl-3 border-l-2 border-indigo-300 dark:border-indigo-700">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {cift.metin}
                    </p>
                    {cift.ceviri && (
                      <p className="text-xs italic text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                        {cift.ceviri}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : ornekler && ornekler.length > 0 ? (
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
          ) : null}

          {/* Yedek: meta.notlar */}
          {(!ornekler || ornekler.length === 0) && meta?.notlar && (
            <figure className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-900/30 p-3 rounded-xl">
              <blockquote className="text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                &ldquo;{meta.notlar}&rdquo;
              </blockquote>
            </figure>
          )}

          {/* BUTONLAR */}
          <div className="mt-4 pt-3 border-t border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setGorselModalAcik(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>📤</span>
              <span>Paylaş</span>
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

          {/* DİĞER KELİMELER */}
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
                        {kelimeItem.ornekCiftleri && kelimeItem.ornekCiftleri.length > 0 ? (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                              💬 Örnek
                            </div>
                            <ul className="space-y-1.5">
                              {kelimeItem.ornekCiftleri.map((cift, idx) => (
                                <li
                                  key={idx}
                                  className="pl-2 border-l-2 border-indigo-300 dark:border-indigo-700"
                                >
                                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    {cift.metin}
                                  </p>
                                  {cift.ceviri && (
                                    <p className="text-[10px] italic text-slate-500 dark:text-slate-400">
                                      {cift.ceviri}
                                    </p>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : kelimeItem.ornekler && kelimeItem.ornekler.length > 0 ? (
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

          {/* BİLDİRİM AYARI */}
          <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
            <BildirimAyar
              gununKelimesi={{
                kelime: bugunKelimesi.kelime || '',
                anlam: bugunKelimesi.anlam || '',
              }}
            />
          </div>
        </div>
      </details>

      {/* PAYLAŞIM GÖRSELİ MODAL */}
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
    </>
  );
}