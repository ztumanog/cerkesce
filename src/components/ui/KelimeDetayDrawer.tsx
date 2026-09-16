'use client';

import React, { useRef, useEffect, useState } from 'react';
import { BookOpen, Check, Copy, Share2, X } from 'lucide-react';
import type { KelimeItem, KaynakItem } from '@/types/dictionary';

interface KelimeDetayDrawerProps {
  seciliKelime: KelimeItem | null;
  isOpen: boolean;
  onClose: () => void;
  metinBoyutu?: number;
}

export default function KelimeDetayDrawer({
  seciliKelime,
  isOpen,
  onClose,
  metinBoyutu = 16,
}: KelimeDetayDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const kapatBtnRef = useRef<HTMLButtonElement>(null);
  const [kopyalandi, setKopyalandi] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && drawerRef.current) {
        const els = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const t = setTimeout(() => kapatBtnRef.current?.focus(), 50);
      return () => { clearTimeout(t); window.removeEventListener('keydown', handleKeyDown); };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !seciliKelime) return null;

  const kaynaklar: KaynakItem[] = seciliKelime.kaynaklar || [];

  const getSozlukAdi = (k: KaynakItem): string => {
    const baslik = k.sözlük || k.title || k.kaynak || k.dictionaryName || k.name || 'Bilinmeyen Kaynak';
    return baslik;
  };

  const getKaynakMeta = (k: KaynakItem): string =>
    [k.author, k.year].filter(Boolean).map(String).join(' • ');

  const getAnlam = (k: KaynakItem): string =>
    k.anlam || k.tanim || k.meaning || k.full_definition_in_html || '';

  const temizleMetin = (metin: string): string =>
    metin
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

  const getLanguageName = (language?: string): string => {
    const names: Record<string, string> = {
      ady: 'Adıgece',
      ar: 'Arapça',
      en: 'İngilizce',
      kbd: 'Kabardeyce',
      ru: 'Rusça',
      tr: 'Türkçe',
    };
    return names[String(language || '').toLowerCase()] || language || 'Dil belirtilmemiş';
  };

  const getKavramAdi = (kaynak: KaynakItem): string => {
    const anlam = temizleMetin(getAnlam(kaynak));
    if (!anlam) return 'Tanım mevcut değil';

    return anlam
      .replace(/^(?:\d+\)\s*)?(?:\d+\.\s*)+/, '')
      .split(/[;~]/, 1)[0]
      .split(',', 1)[0]
      .split(/\s+\d+\)\s*/, 1)[0]
      .split(/\s+\d+\.\s*/, 1)[0]
      .replace(/[,:]$/, '')
      .replace(/^[\s•◊\-]+/, '')
      .replace(/\s*\([^)]*\)\s*$/, '')
      .trim() || 'Tanım mevcut değil';
  };

  const getCekirdekKarsilik = (kaynak: KaynakItem): string => {
    const kelime = kaynak.kelime?.trim();
    if (kelime) {
      return kelime
        .split(/[;,]/, 1)[0]
        .replace(/^[\s•◊\-]+/, '')
        .replace(/\s*\([^)]*\)\s*$/, '')
        .trim();
    }
    return getKavramAdi(kaynak);
  };

  const getAnlamListesi = (kaynak: KaynakItem): string[] => {
    const anlam = temizleMetin(getAnlam(kaynak));
    const numaraliAnlamlar = [...anlam.matchAll(/(?:^|\s)\d+\.\s*([^;~]+)/g)]
      .map((match) => match[1].replace(/^\d+\)\s*/, '').trim())
      .filter(Boolean);

    const adaylar = numaraliAnlamlar.length > 0
      ? numaraliAnlamlar
      : anlam.split(/[;~]/).map((parca) => parca.trim()).filter(Boolean);
    const kaynakKelimesi = kaynak.kelime?.trim() || '';
    const normalizeEt = (metin: string) => metin
      .replace(/^[-•◊\s]+/, '')
      .replace(/^\d+\)\s*/, '')
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, '')
      .toLocaleLowerCase('tr-TR');
    const kaynakAnahtari = normalizeEt(kaynakKelimesi);
    const gorunenAnlamlar: string[] = [];
    const gorunenAnahtarlar = new Set<string>();

    for (const aday of adaylar) {
      const temizAday = aday
        .replace(/^[-•◊\s]+/, '')
        .replace(/^\d+\)\s*/, '')
        .trim();
      const anahtar = normalizeEt(temizAday);
      if (!anahtar || anahtar === kaynakAnahtari || gorunenAnahtarlar.has(anahtar)) continue;
      gorunenAnahtarlar.add(anahtar);
      gorunenAnlamlar.push(temizAday);
    }

    return gorunenAnlamlar.length > 0 ? gorunenAnlamlar : [getKavramAdi(kaynak)];
  };

  const getIlgiliKelimeler = (kaynak: KaynakItem): string[] => {
    const anlam = temizleMetin(getAnlam(kaynak));
    const adaylar = [
      ...anlam.matchAll(/(?:^|[;])\s*[-~]\s*([^:;]+)/g),
      ...anlam.matchAll(/(?:^|[;])\s*([^:;]+?)\s*:/g),
    ]
      .map((match) => match[1].replace(/^\d+\)\s*/, '').trim())
      .filter((aday) => aday.length > 2 && !/^\d+\.?$/.test(aday));

    return Array.from(new Set(adaylar));
  };

  const getDeyimler = (kaynak: KaynakItem): string[] => {
    const anlam = temizleMetin(getAnlam(kaynak));
    return Array.from(
      new Set(
        anlam
          .split(/[;~]/)
          .map((parca) => parca.trim())
          .filter((parca) => /\b(saying|prov\.|deyim|atasözü|gibi)\b/i.test(parca)),
      ),
    );
  };

  const getEkMaddeler = (kaynak: KaynakItem): string[] => {
    const anlam = temizleMetin(getAnlam(kaynak));
    return Array.from(
      new Set(
        anlam
          .split(/\s*◊\s*/)
          .slice(1)
          .map((madde) => `◊ ${madde.trim()}`)
          .filter(Boolean),
      ),
    );
  };

  const getKaynakParcalari = (kaynak: KaynakItem): string[] => {
    const anlam = temizleMetin(getAnlam(kaynak));
    return anlam
      .split(/\s*◊\s*/)
      .map((parca) => parca.trim())
      .filter(Boolean);
  };

  const alternatifler = new Map<string, string>();
  const anlamlar = new Set<string>();
  const ilgiliKelimeler = new Set<string>();
  const deyimler = new Set<string>();
  const ekMaddeler = new Set<string>();

  for (const kaynak of kaynaklar) {
    const kaynakKelimesi = kaynak.kelime?.trim();
    const kaynakDili = getLanguageName(kaynak.sourceLanguage);
    const hedefDili = getLanguageName(kaynak.targetLanguage);

    if (kaynakKelimesi) {
      if (!alternatifler.has(kaynakDili)) {
        alternatifler.set(kaynakDili, getCekirdekKarsilik(kaynak));
      }
    }

    const hedefKarsilik = getKavramAdi(kaynak);
    if (hedefKarsilik !== 'Tanım mevcut değil' && hedefKarsilik !== kaynakKelimesi) {
      if (!alternatifler.has(hedefDili)) {
        alternatifler.set(hedefDili, hedefKarsilik);
      }
    }

    getAnlamListesi(kaynak).forEach((anlam) => anlamlar.add(anlam));
    getIlgiliKelimeler(kaynak).forEach((kelime) => ilgiliKelimeler.add(kelime));
    getDeyimler(kaynak).forEach((deyim) => deyimler.add(deyim));
    getEkMaddeler(kaynak).forEach((madde) => ekMaddeler.add(madde));
  }

  const temizAlternatifler = new Map(
    Array.from(alternatifler.entries()).filter(([, kelime]) =>
      kelime.toLocaleLowerCase('tr-TR') !== seciliKelime.kelime.toLocaleLowerCase('tr-TR'),
    ),
  );

  const kaynakAdlari = Array.from(new Set(kaynaklar.map(getSozlukAdi)));
  const alternatifSayisi = temizAlternatifler.size;
  const paylasimMetni = [
    seciliKelime.kelime,
    ...Array.from(temizAlternatifler.entries()).map(([dil, kelime]) => `${dil}: ${kelime}`),
    anlamlar.size > 0 ? `Anlamlar: ${Array.from(anlamlar).join('; ')}` : '',
  ].filter(Boolean).join('\n');

  const panoyaKopyala = async () => {
    try {
      await navigator.clipboard.writeText(paylasimMetni);
      setKopyalandi(true);
      window.setTimeout(() => setKopyalandi(false), 1800);
    } catch (error) {
      console.error('Metin panoya kopyalanamadı:', error);
    }
  };

  const paylas = async () => {
    if (navigator.share) {
      await navigator.share({
        title: seciliKelime.kelime,
        text: paylasimMetni,
      });
      return;
    }

    await panoyaKopyala();
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="drawer-title"
      className="fixed inset-0 z-[9999] flex justify-end">
      <div onClick={onClose} aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div ref={drawerRef} style={{ fontSize: `${metinBoyutu}px` }}
        className="relative z-10 w-full max-w-[520px] h-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col border-l border-slate-300 dark:border-slate-700">

        {/* BAŞLIK */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-300 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h2 id="drawer-title"
              className="text-2xl font-bold text-orange-500 truncate">
              {seciliKelime.kelime}
            </h2>
            {seciliKelime.lehce && (
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 shrink-0">
                {seciliKelime.lehce}
              </span>
            )}
          </div>
          <button ref={kapatBtnRef} onClick={onClose} aria-label="Kapat"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 shrink-0">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* İÇERİK */}
        <div className="flex-1 overflow-y-auto p-5 pb-24 sm:p-6 sm:pb-24 space-y-5">

          <div className="flex items-center gap-2 border-b border-slate-300 pb-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <span className="font-semibold text-orange-600 dark:text-orange-400">Kavram</span>
            <span aria-hidden="true">•</span>
            <span>{alternatifSayisi} karşılık</span>
            <span aria-hidden="true">•</span>
            <span>{kaynakAdlari.length} kaynak</span>
          </div>

          {alternatifSayisi > 0 && (
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Alternatif Karşılıklar</h3>
              <div className="overflow-hidden rounded-lg border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                {Array.from(temizAlternatifler.entries()).map(([dil, kelime]) => {
                  return (
                    <div key={dil} className="flex gap-4 border-b border-slate-200 px-4 py-3 last:border-b-0 dark:border-slate-700">
                      <span className="w-24 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">{dil}</span>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        {kelime}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {anlamlar.size > 0 && (
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Anlamlar</h3>
              <ul className="space-y-1.5 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                {Array.from(anlamlar).map((anlam) => (
                  <li key={anlam} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <span className="text-orange-500">•</span>
                    <span>{anlam}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {ilgiliKelimeler.size > 0 && (
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">İlgili Kelimeler</h3>
              <div className="flex flex-wrap gap-2 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                {Array.from(ilgiliKelimeler).map((kelime) => (
                  <span key={kelime} className="rounded-md bg-slate-200 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {kelime}
                  </span>
                ))}
              </div>
            </section>
          )}

          {deyimler.size > 0 && (
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Deyimler</h3>
              <ul className="space-y-1 rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
                {Array.from(deyimler).map((deyim) => (
                  <li key={deyim}>• {deyim}</li>
                ))}
              </ul>
            </section>
          )}

          {ekMaddeler.size > 0 && (
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Ek Maddeler</h3>
              <div className="space-y-2 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                {Array.from(ekMaddeler).map((madde) => (
                  <p key={madde} className="whitespace-pre-line border-l-2 border-orange-400 pl-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {madde}
                  </p>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Kaynaklar <span className="font-normal text-slate-400">({kaynakAdlari.length})</span>
            </h3>
            <div className="overflow-hidden rounded-lg border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
              {kaynaklar.length > 0 ? kaynaklar.map((kaynak, idx) => {
                const anlam = getAnlam(kaynak);
                const kaynakParcalari = getKaynakParcalari(kaynak);
                return (
                  <details key={`${getSozlukAdi(kaynak)}-${idx}`} className="group border-b border-slate-200 last:border-b-0 dark:border-slate-700">
                    <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                      <BookOpen size={14} className="text-orange-500" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block truncate">{getSozlukAdi(kaynak)}</span>
                        {getKaynakMeta(kaynak) && (
                          <span className="mt-0.5 block text-[11px] font-normal text-slate-400">
                            {getKaynakMeta(kaynak)}
                          </span>
                        )}
                      </span>
                      <span className="ml-auto text-slate-400 transition-transform group-open:rotate-90">›</span>
                    </summary>
                    {anlam && (
                      <div className="space-y-2 px-4 pb-4 pt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {kaynakParcalari.map((parca, parcaIndex) => (
                          <p key={`${parca}-${parcaIndex}`} className={parcaIndex > 0 ? 'border-l-2 border-orange-300 pl-3' : ''}>
                            {parcaIndex > 0 && <span className="mr-1 text-orange-500">◊</span>}
                            {parca}
                          </p>
                        ))}
                      </div>
                    )}
                  </details>
                );
              }) : (
                <p className="p-4 text-sm text-slate-400">Kaynak bulunamadı</p>
              )}
            </div>
          </section>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex gap-2 border-t border-slate-300 bg-slate-100/95 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-800/95">
          <button
            type="button"
            onClick={panoyaKopyala}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {kopyalandi ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {kopyalandi ? 'Kopyalandı' : 'Kopyala'}
          </button>
          <button
            type="button"
            onClick={paylas}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <Share2 size={16} aria-hidden="true" />
            Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}
