'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { Badge, Button, Flex, Heading, Text } from '@radix-ui/themes';
import { Share2, BookmarkPlus, BookmarkCheck, Library } from 'lucide-react';

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
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo1 to-indigo2 border border-indigo5 motion-safe:animate-pulse">
        <div className="h-8 bg-indigo3 rounded w-1/3 mb-4" />
        <div className="h-6 bg-indigo2 rounded w-2/3" />
      </div>
    );
  }

  const { kelime, anlam, lehce, meta, ornekler, ornekCiftleri } = bugunKelimesi;

  return (
    <>
      <details
        className={`group rounded-2xl bg-gradient-to-br from-indigo1 to-indigo2 border border-indigo5 shadow-sm transition-all hover:shadow-md ${className}`}
      >
        <summary className="list-none cursor-pointer p-4 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo8 focus-visible:ring-inset">
          <Flex justify="between" align="center" wrap="wrap" gap="2" className="mb-2 sm:mb-4">
            <Badge color="indigo" variant="soft" size="2" highContrast>
              ✨ Günün Kelimesi
            </Badge>
            <Badge color="gray" variant="soft" size="1" highContrast>
              {lehce || 'Bilinmeyen'}
            </Badge>
          </Flex>

          <div className="space-y-1 sm:space-y-2">
            <Heading as="h3" size="7" className="text-indigo11">
              {kelime}
            </Heading>
            <Text as="p" size="3" className="text-slate12 leading-relaxed">
              {anlam}
            </Text>
          </div>
        </summary>

        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          {/* ÖRNEK KULLANIM — Gunun-Kelimesi-001: çevirili iki katmanlı gösterim */}
          {ornekCiftleri && ornekCiftleri.length > 0 ? (
            <div className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo5">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo11 mb-2">
                💬 Örnek Kullanım
              </div>
              <ul className="space-y-2">
                {ornekCiftleri.map((cift, idx) => (
                  <li key={idx} className="pl-3 border-l-2 border-indigo6">
                    <Text as="p" size="2" weight="medium" className="text-slate12 leading-relaxed">
                      {cift.metin}
                    </Text>
                    {cift.ceviri && (
                      <Text as="p" size="1" className="italic text-slate11 leading-snug mt-0.5">
                        {cift.ceviri}
                      </Text>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : ornekler && ornekler.length > 0 ? (
            <div className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo5">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo11 mb-2">
                💬 Örnek Kullanım
              </div>
              <ul className="space-y-1.5">
                {ornekler.map((ornek, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate12 leading-relaxed pl-3 border-l-2 border-indigo6"
                  >
                    {ornek}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Yedek: meta.notlar */}
          {(!ornekler || ornekler.length === 0) && meta?.notlar && (
            <figure className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo5 bg-indigo1 p-3 rounded-xl">
              <blockquote className="text-sm font-medium text-slate12 italic">
                &ldquo;{meta.notlar}&rdquo;
              </blockquote>
            </figure>
          )}

          {/* BUTONLAR — Radix Theme (odak halkaları ve kontrast yerleşik) */}
          <Flex gap="2" wrap="wrap" align="center" className="mt-4 pt-3 border-t border-indigo5">
            <Button
              variant="soft"
              size="2"
              onClick={() => setGorselModalAcik(true)}
              aria-label="Günün kelimesini paylaş"
            >
              <Share2 size={14} aria-hidden />
              Paylaş
            </Button>

            <Button
              variant={saved ? 'soft' : 'surface'}
              color={saved ? 'grass' : 'gray'}
              size="2"
              onClick={handleSave}
            >
              {saved ? <BookmarkCheck size={14} aria-hidden /> : <BookmarkPlus size={14} aria-hidden />}
              {saved ? 'Kaydedildi' : 'Kaydet'}
            </Button>

            <Button asChild variant="soft" color="indigo" size="2" className="ml-auto">
              <Link href="/kaydedilenler">
                <Library size={14} aria-hidden />
                Kaydedilenler
              </Link>
            </Button>
          </Flex>

          {/* DİĞER KELİMELER */}
          {digerKelimeler.length > 0 && (
            <div className="mt-4 pt-4 border-t border-indigo5">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo11 mb-3">
                🌟 Diğer Kelimeler
              </div>
              <div className="space-y-2">
                {digerKelimeler.map((kelimeItem) => (
                  <div
                    key={kelimeItem.id}
                    className="rounded-lg border border-indigo5 bg-indigo1 overflow-hidden transition-all hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setAcikKelimeId(
                          acikKelimeId === kelimeItem.id ? null : kelimeItem.id
                        )
                      }
                      className="w-full text-left p-3 flex items-center justify-between gap-2 hover:bg-indigo2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo8 min-h-[44px]"
                    >
                      <div className="flex-1 min-w-0">
                        <Flex align="center" gap="2">
                          <Text size="2" weight="bold" className="text-indigo12 truncate">
                            {kelimeItem.kelime}
                          </Text>
                          {kelimeItem.lehce && (
                            <Badge color="indigo" variant="soft" size="1" highContrast className="shrink-0">
                              {kelimeItem.lehce}
                            </Badge>
                          )}
                        </Flex>
                        <Text as="p" size="1" className="text-slate11 truncate mt-0.5">
                          {kelimeItem.anlam}
                        </Text>
                      </div>
                      <span
                        className={`text-[10px] text-indigo9 transition-transform ${
                          acikKelimeId === kelimeItem.id ? 'rotate-90' : ''
                        }`}
                      aria-hidden
                      >
                        ▶
                      </span>
                    </button>

                    {acikKelimeId === kelimeItem.id && (
                      <div className="px-3 pb-3 space-y-2 border-t border-indigo5 pt-2">
                        {kelimeItem.ornekCiftleri && kelimeItem.ornekCiftleri.length > 0 ? (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo11 mb-1">
                              💬 Örnek
                            </div>
                            <ul className="space-y-1.5">
                              {kelimeItem.ornekCiftleri.map((cift, idx) => (
                                <li
                                  key={idx}
                                  className="pl-2 border-l-2 border-indigo6"
                                >
                                  <Text as="p" size="1" weight="medium" className="text-slate12">
                                    {cift.metin}
                                  </Text>
                                  {cift.ceviri && (
                                    <Text as="p" size="1" className="italic text-slate11">
                                      {cift.ceviri}
                                    </Text>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : kelimeItem.ornekler && kelimeItem.ornekler.length > 0 ? (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo11 mb-1">
                              💬 Örnek
                            </div>
                            <ul className="space-y-1">
                              {kelimeItem.ornekler.map((ornekItem, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-slate12 pl-2 border-l-2 border-indigo6"
                                >
                                  {ornekItem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-xs text-slate11 italic">
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
          <div className="mt-4 pt-4 border-t border-indigo5">
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