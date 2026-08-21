"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { GruplanmisKelime } from "@/types/dictionary";
import { tanimlariBicimlendir, kaynagiDuzenle, type TemaTipi } from "@/utils/helpers";

interface KelimeDetayDrawerProps {
  seciliKelime: GruplanmisKelime | null;
  kapat: () => void;
  tema: TemaTipi;
  metinBoyutu: number;
}

export default function KelimeDetayDrawer({
  seciliKelime,
  kapat,
  tema,
  metinBoyutu,
}: KelimeDetayDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") kapat();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [kapat]);

  if (!seciliKelime) return null;

  // Veri güvenliği: kaynaklar veya anlamlar dizisinden hangisi doluysa onu kullan
  const detayListesi =
    seciliKelime.kaynaklar && seciliKelime.kaynaklar.length > 0
      ? seciliKelime.kaynaklar
      : seciliKelime.anlamlar && seciliKelime.anlamlar.length > 0
      ? seciliKelime.anlamlar
      : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity"
      onClick={kapat}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={drawerRef}
        className="w-full max-w-md h-full p-6 overflow-y-auto shadow-2xl flex flex-col"
        style={{ backgroundColor: tema.kartArkaPlan }}
        onClick={(e) => e.stopPropagation()} // İçeriğe tıklanınca kapanmasını önler
      >
        {/* Üst Başlık & Kapat Butonu */}
        <header
          className="flex justify-between items-start mb-6 pb-4 border-b"
          style={{ borderColor: tema.kenarlik }}
        >
          <div>
            <h2
              style={{
                color: tema.yaziAna,
                margin: 0,
                fontSize: `${metinBoyutu * 1.4}px`,
                fontWeight: "bold",
              }}
            >
              {seciliKelime.kelime}
            </h2>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded mt-1 inline-block"
              style={{
                backgroundColor: tema.kenarlik,
                color: tema.yaziAlt,
              }}
            >
              {detayListesi.length} farklı tanım/kaynak
            </span>
          </div>

          <button
            type="button"
            onClick={kapat}
            className="px-3 py-1.5 rounded-lg border text-xs font-bold transition-all hover:opacity-80"
            style={{
              borderColor: tema.kenarlik,
              color: tema.yaziAna,
              backgroundColor: tema.arkaPlan,
            }}
          >
            ✕ Kapat
          </button>
        </header>

        {/* Tanımlar Listesi */}
        <div className="flex-1 space-y-6">
          {detayListesi.length === 0 ? (
            <p style={{ color: tema.yaziAlt }}>Bu kelime için tanım detayı bulunamadı.</p>
          ) : (
            detayListesi.map((item: any, index: number) => {
              // Farklı JSON key olasılıklarını yakala
              const tanimMetni =
                item.tanim ||
                item.meaning ||
                item.full_definition_in_html ||
                "";

              const dosya =
                item.file ||
                item.kaynak_sozluk ||
                item.dictionaryName ||
                "";

              const kaynakIsmi = kaynagiDuzenle(dosya);

              return (
                <article
                  key={index}
                  className="pb-5 border-b last:border-0 space-y-2"
                  style={{ borderColor: tema.kenarlik }}
                >
                  {kaynakIsmi && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "#FFC60422",
                          color: tema.yaziAna,
                          border: "1px solid #FFC604aa",
                        }}
                      >
                        📚 {kaynakIsmi}
                      </span>
                    </div>
                  )}

                  <div className="text-sm leading-relaxed" style={{ color: tema.yaziAna }}>
                    {tanimlariBicimlendir(
                      tanimMetni,
                      tema,
                      seciliKelime.kelime,
                      metinBoyutu,
                      kaynakIsmi
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Alt Kurumsal İmza */}
        <footer
          className="mt-8 pt-4 border-t flex justify-end opacity-90"
          style={{ borderColor: tema.kenarlik }}
        >
          <Image
            src="/imza.png"
            alt="Açık Mektep Kurumsal İmza"
            width={120}
            height={40}
            className="object-contain"
          />
        </footer>
      </div>
    </div>
  );
}