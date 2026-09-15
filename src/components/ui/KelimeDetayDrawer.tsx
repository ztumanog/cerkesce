'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  X,
  Copy,
  Share2,
  Check,
  BookOpen,
  Volume2,
  Link2,
  MessageSquare,
  Languages,
} from 'lucide-react';
import { metneCevir, kaynagiDuzenle } from '@/utils/helpers';
import type { KelimeItem, KaynakItem } from '@/types/dictionary';

export interface DictionaryMeta {
  file: string;
  title: string;
  originalTitle?: string;
  author?: string;
  editor?: string;
  publisher?: string;
  year?: number | string;
  dialect?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export type GenisletilmisKaynakItem = KaynakItem & {
  editor?: string;
  publisher?: string;
  basim_evi?: string;
  author?: string;
  yazar?: string;
  year?: number | string;
  yil?: number | string;
};

export type GenisletilmisKelimeItem = Omit<KelimeItem, 'anlam'> & {
  anlam?: string;
  lehce?: string;
  cerkesce?: string;
  ilkAnlam?: string;
  anlamlar?: string[];
  ornekler?: string[];
  iliskiliKelimeler?: string[];
};

interface KelimeDetayDrawerProps {
  seciliKelime: GenisletilmisKelimeItem | null;
  isOpen: boolean;
  onClose: () => void;
  metinBoyutu?: number;
  onSelectWord?: (word: string) => void;
}

/**
 * HTML taglarını ve tehlikeli karakterleri temizle
 * XSS saldırılarına karşı koruma sağlar
 */
const stripHtmlTags = (html: string): string => {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

const getLehceBadgeClass = (lehce?: string): string => {
  if (!lehce)
    return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  const code = lehce.toUpperCase().trim();
  switch (code) {
    case 'ADY':
    case 'ADIGE':
    case 'BATU':
      return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    case 'KBD':
    case 'KABARDEY':
    case 'DOGU':
      return 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800';
    case 'ABZ':
    case 'ABHAZ':
    case 'ABAZA':
      return 'bg-violet-100 dark:bg-violet-950/80 text-violet-800 dark:text-violet-300 border-violet-300 dark:border-violet-800';
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
  }
};

export default function KelimeDetayDrawer({
  seciliKelime,
  isOpen,
  onClose,
  metinBoyutu = 16,
  onSelectWord,
}: KelimeDetayDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const kapatBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dictionaryMapRef = useRef<Map<string, DictionaryMeta>>(new Map());
  const [copied, setCopied] = useState<boolean>(false);
  const [dictionaryMap, setDictionaryMap] = useState<Map<string, DictionaryMeta>>(new Map());

  // Sözlükleri yükle (SSR-safe, component scope'ta)
  useEffect(() => {
    if (dictionaryMapRef.current.size > 0) {
      setDictionaryMap(dictionaryMapRef.current);
      return;
    }

    const loadDictionaries = async () => {
      try {
        let res = await fetch('/data/dictionaries.json');
        if (!res.ok) {
          res = await fetch('/dictionaries.json');
        }
        if (res.ok) {
          const data: DictionaryMeta[] = await res.json();
          const map = new Map<string, DictionaryMeta>();

          data.forEach((item) => {
            if (item.file) {
              map.set(item.file, item);
              map.set(item.file.toLowerCase().trim(), item);
            }
            if (item.title) {
              map.set(item.title, item);
              map.set(item.title.toLowerCase().trim(), item);
            }
            if (item.originalTitle) {
              map.set(item.originalTitle, item);
              map.set(item.originalTitle.toLowerCase().trim(), item);
            }
          });

          dictionaryMapRef.current = map;
          setDictionaryMap(map);
        }
      } catch (error) {
        console.warn('Sözlük verileri yüklenemedi:', error);
      }
    };

    loadDictionaries();
  }, []);

  // Keyboard event handler (useCallback ile optimize)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const odaklanabilir = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (odaklanabilir.length === 0) return;
        const ilk = odaklanabilir[0];
        const son = odaklanabilir[odaklanabilir.length - 1];
        if (e.shiftKey && document.activeElement === ilk) {
          e.preventDefault();
          son.focus();
        } else if (!e.shiftKey && document.activeElement === son) {
          e.preventDefault();
          ilk.focus();
        }
      }
    },
    [onClose]
  );

  // Drawer açılış/kapanış yönetimi (focus trap + scroll kilidi)
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => kapatBtnRef.current?.focus(), 50);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !seciliKelime) return null;

  // Kaynak listesi (fallback mantığı iyileştirildi)
  const kaynakListesi: GenisletilmisKaynakItem[] =
    seciliKelime.kaynaklar && Array.isArray(seciliKelime.kaynaklar) && seciliKelime.kaynaklar.length > 0
      ? (seciliKelime.kaynaklar as GenisletilmisKaynakItem[])
      : seciliKelime.anlamlar && Array.isArray(seciliKelime.anlamlar) && seciliKelime.anlamlar.length > 0
        ? seciliKelime.anlamlar.map((anlam) => ({
            tanim: typeof anlam === 'string' ? anlam : '',
          }))
        : [];

  const kelimeBaslik = metneCevir(seciliKelime.kelime);
  const ozetAnlam =
    seciliKelime.ilkAnlam ||
    seciliKelime.anlam ||
    (seciliKelime.anlamlar && seciliKelime.anlamlar.length > 0 ? seciliKelime.anlamlar[0] : undefined);

  const handleCopy = async () => {
    try {
      const tanimlar = kaynakListesi
        .map((k) => {
          const rawText = k.tanim || k.anlam || k.meaning || k.full_definition_in_html || '';
          return stripHtmlTags(metneCevir(rawText));
        })
        .filter(Boolean)
        .join('; ');
      await navigator.clipboard.writeText(`${kelimeBaslik}: ${tanimlar}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.warn('Panoya kopyalama başarısız:', error);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: kelimeBaslik,
          text: `${kelimeBaslik} - ${ozetAnlam || ''}`,
          url: window.location.href,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.warn('Paylaşım hatası:', error);
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-[9999] flex justify-end"
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div
        ref={drawerRef}
        style={{ fontSize: `${metinBoyutu}px` }}
        className="relative z-10 w-full max-w-[520px] h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-slate-800"
      >
        {/* BAŞLIK VE LEHÇE ROZETİ */}
        <div className="p-4 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <h2
              id="drawer-title"
              className="text-xl sm:text-2xl font-bold text-orange-500 tracking-tight truncate"
            >
              {kelimeBaslik}
            </h2>
            {seciliKelime.lehce && (
              <span
                className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-md border shrink-0 ${getLehceBadgeClass(
                  seciliKelime.lehce
                )}`}
              >
                {seciliKelime.lehce}
              </span>
            )}
          </div>

          <button
            ref={kapatBtnRef}
            onClick={onClose}
            aria-label="Detay panelini kapat"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* İÇERİK BÖLÜMÜ */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* ANLAM / ÖZET */}
          {ozetAnlam && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Anlam
              </span>
              <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                {stripHtmlTags(metneCevir(ozetAnlam))}
              </p>
            </div>
          )}

          {/* ÇERKESÇE KARŞILIK */}
          {seciliKelime.cerkesce && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <Languages size={13} />
                <span>Çerkesçe Karşılık</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400 tracking-wide">
                {seciliKelime.cerkesce}
              </p>
            </div>
          )}

          {/* ÖRNEKLER */}
          {seciliKelime.ornekler && seciliKelime.ornekler.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <MessageSquare size={13} />
                <span>Örnekler</span>
              </div>
              <ul className="space-y-1.5">
                {seciliKelime.ornekler.map((ornek: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{stripHtmlTags(ornek)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* İLİŞKİLİ KELİMELER */}
          {seciliKelime.iliskiliKelimeler && seciliKelime.iliskiliKelimeler.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <Link2 size={13} />
                <span>İlişkili Kelimeler</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {seciliKelime.iliskiliKelimeler.map((item: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectWord?.(item)}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AKADEMİK KAYNAKLAR */}
          {kaynakListesi.length > 0 ? (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <BookOpen size={13} />
                <span>Kaynaklar ({kaynakListesi.length})</span>
              </div>
              <div className="space-y-3">
                {kaynakListesi.map((kaynak, idx) => {
                  const rawFileKey = kaynak.file;
                  const rawTitleKey =
                    kaynak.kaynak_sozluk ||
                    kaynak.kaynak ||
                    (kaynak as any).sözlük ||
                    kaynak.dictionaryName ||
                    kaynak.title;

                  let meta: DictionaryMeta | null = null;
                  if (rawFileKey && typeof rawFileKey === 'string') {
                    meta =
                      dictionaryMap.get(rawFileKey) ||
                      dictionaryMap.get(rawFileKey.toLowerCase().trim()) ||
                      null;
                  }
                  if (!meta && rawTitleKey && typeof rawTitleKey === 'string') {
                    const titleStr = metneCevir(rawTitleKey);
                    meta =
                      dictionaryMap.get(titleStr) ||
                      dictionaryMap.get(titleStr.toLowerCase().trim()) ||
                      null;
                  }

                  const eserAdi =
                    meta?.title ||
                    (rawTitleKey && typeof rawTitleKey === 'string' ? metneCevir(rawTitleKey) : null) ||
                    (rawFileKey && typeof rawFileKey === 'string' ? kaynagiDuzenle(metneCevir(rawFileKey)) : 'Sözlük Kaynağı');

                  const orijinalAd = meta?.originalTitle;
                  const yazar = meta?.author || kaynak.author || (kaynak as any).yazar;
                  const editor = meta?.editor || kaynak.editor;
                  const basimEvi = meta?.publisher || kaynak.publisher || (kaynak as any).basim_evi;
                  const yil = meta?.year || kaynak.year || (kaynak as any).yil;

                  const kunyeMetni = [yazar, editor ? `Ed: ${editor}` : null, basimEvi, yil]
                    .filter(Boolean)
                    .join(', ');

                  const tanim = stripHtmlTags(
                    metneCevir(
                      kaynak.tanim ||
                        kaynak.anlam ||
                        kaynak.meaning ||
                        kaynak.full_definition_in_html ||
                        ''
                    )
                  );

                  return (
                    <div
                      key={`${rawFileKey || rawTitleKey || 'kaynak'}-${idx}`}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5"
                    >
                      {tanim && (
                        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-normal font-normal">
                          {tanim}
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
                          <BookOpen size={13} className="shrink-0" />
                          <span>{eserAdi}</span>
                          {orijinalAd && (
                            <span className="opacity-75 font-normal text-[11px]">({orijinalAd})</span>
                          )}
                        </div>

                        {kunyeMetni ? (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pl-4.5 leading-tight">
                            {kunyeMetni}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-center py-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">Kaynak bulunamadı</p>
            </div>
          )}
        </div>

        {/* ALT AKSİYON ÇUBUĞU */}
        <div className="p-2.5 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-around gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {copied ? (
              <Check size={15} className="text-emerald-500" />
            ) : (
              <Copy size={15} />
            )}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          <button
            type="button"
            disabled
            title="Sesli telaffuz yakında eklenecek"
            className="flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
          >
            <Volume2 size={15} />
            <span>Dinle</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-2 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <Share2 size={15} />
            <span>Paylaş</span>
          </button>
        </div>
      </div>
    </div>
  );
}