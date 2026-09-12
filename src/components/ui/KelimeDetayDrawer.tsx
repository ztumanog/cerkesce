'use client';

import React, { useRef, useEffect } from 'react';
import { metneCevir, kaynagiDuzenle } from '@/utils/helpers';
import type { GruplanmisKelime, KaynakItem } from '@/types/dictionary';

interface KelimeDetayDrawerProps {
  seciliKelime: GruplanmisKelime | null;
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => kapatBtnRef.current?.focus(), 50);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !seciliKelime) {
    return null;
  }

  const kaynakListesi: KaynakItem[] =
    (seciliKelime.kaynaklar?.length ?? 0) > 0
      ? (seciliKelime.kaynaklar as KaynakItem[])
      : (seciliKelime.anlamlar ?? []).map((anlam) => ({
          tanim: anlam,
        }));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-[9999] flex justify-end"
    >
      {/* Karartma Arka Planı (Backdrop) */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        style={{ fontSize: `${metinBoyutu}px` }}
        className="relative z-10 w-full max-w-[520px] h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-y-auto p-6 transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-slate-800"
      >
        {/* Başlık ve Kapat Butonu */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <h2
            id="drawer-title"
            className="font-bold text-2xl text-slate-900 dark:text-slate-100 tracking-tight"
          >
            {metneCevir(seciliKelime.kelime)}
          </h2>
          <button
            ref={kapatBtnRef}
            onClick={onClose}
            aria-label="Detay panelini kapat"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            ✕
          </button>
        </div>

        {/* Kaynaklar / Tanımlar Listesi */}
        <div className="flex-1 flex flex-col gap-4">
          {kaynakListesi.length > 0 ? (
            kaynakListesi.map((kaynak, idx) => {
              const dosyaAdi =
                kaynak.kaynak_sozluk ||
                kaynak.file ||
                kaynak.kaynak ||
                kaynak.sözlük ||
                kaynak.dictionaryName;

              const tanim = metneCevir(
                kaynak.tanim ||
                  kaynak.anlam ||
                  kaynak.meaning ||
                  kaynak.full_definition_in_html ||
                  ''
              );

              return (
                <div
                  key={`${dosyaAdi || 'kaynak'}-${idx}`}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 shadow-sm transition-all"
                >
                  {dosyaAdi && (
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                      <span>📚</span>
                      <span>{kaynagiDuzenle(metneCevir(dosyaAdi))}</span>
                    </div>
                  )}

                  {tanim && (
                    <div
                      className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm md:text-base prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: tanim }}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-medium">
              Tanım bulunamadı
            </div>
          )}
        </div>
      </div>
    </div>
  );
}