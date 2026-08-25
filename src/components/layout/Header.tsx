"use client";

import type React from "react";
import type { TemaTipi } from "@/utils/helpers";
import { TUR_MAP } from "@/lib/dictionaryConstants";

interface HeaderProps {
  karanlikMod: boolean;
  toggleKaranlikMod: () => void;
  metinBoyutu: number;
  setMetinBoyutu: React.Dispatch<React.SetStateAction<number>>;
  sozlukSayisi?: number;
  kayitSayisi?: number;
  aramaYapildiMi?: boolean;
  tema: Pick<
    TemaTipi,
    "yaziAna" | "yaziAlt" | "kenarlik" | "kartArkaPlan"
  >;
}
// dictionaryConstants.ts
export const KURUMSAL = {
  kirmizi: "#b91c1c",
};

export default function Header({
  karanlikMod,
  toggleKaranlikMod,
  metinBoyutu,
  setMetinBoyutu,
  sozlukSayisi = 34,
  kayitSayisi = 332238,
  tema,
}: HeaderProps) {
  const arkaPlanRengi = tema.kartArkaPlan || "#F4EFE6";
  const kenarlikRengi = tema.kenarlik || "#EADDC9";
  const anaYaziRengi = tema.yaziAna || "#2C221E";
  const altYaziRengi =
    tema.yaziAlt || (karanlikMod ? "#D0C4B8" : "#4A3E37");
  const vurguRengi = KURUMSAL.kirmizi || "#7A1C1C";
  
  const kontrolArkaPlanRengi = karanlikMod
    ? "#2C221E"
    : "#FFFFFF";

  return (
    <header
      style={{
        backgroundColor: arkaPlanRengi,
        borderLeftColor: vurguRengi,
        borderTopColor: kenarlikRengi,
        borderRightColor: kenarlikRengi,
        borderBottomColor: kenarlikRengi,
      }}
      className="box-border mb-6 flex w-full flex-col rounded-[2px] border border-l-4 px-5 py-5 transition-colors duration-200 sm:px-7 sm:py-6"
    >
      {/* Üst Kısım: Logo, başlık ve kontroller */}
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        {/* Logo ve başlık */}
        <div className="flex min-w-0 items-center gap-4">
          <img
            src="/logo/logo.png"
            alt="Açık Mektep Logosu"
            onError={(event) => {
              event.currentTarget.classList.add("hidden");
            }}
            className="h-12 w-12 shrink-0 rounded object-contain"
          />

          <div className="min-w-0">
            <span
              style={{
                color: vurguRengi,
              }}
              className="mb-1 block text-[10px] font-bold uppercase tracking-[1.5px] sm:text-[11px] sm:tracking-[2.5px]"
            >
              AÇIK MEKTEP AÇIK ERİŞİM DİL KAYNAKLARI PROJESİ
            </span>

            <h1
              style={{
                color: anaYaziRengi,
                fontSize: `${metinBoyutu * 1.5}px`,
              }}
              className="m-0 font-serif font-semibold italic leading-tight"
            >
              Çerkesçe Sözlük
            </h1>
          </div>
        </div>

        {/* Sağ kontroller */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="toolbar"
          aria-label="Görünüm kontrolleri"
        >
          {/* Yazı boyutu kontrolü */}
          <div
            style={{
              backgroundColor: kontrolArkaPlanRengi,
              borderColor: kenarlikRengi,
            }}
            className="inline-flex items-center rounded-[3px] border p-0.5"
          >
            <button
              type="button"
              onClick={() => {
                setMetinBoyutu((oncekiBoyut) =>
                  Math.max(12, oncekiBoyut - 2)
                );
              }}
              aria-label="Yazı boyutunu küçült"
              style={{
                color: anaYaziRengi,
              }}
              className="cursor-pointer border-0 bg-transparent px-2.5 py-1.5 text-[13px] font-bold transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/30"
            >
              A-
            </button>

            <span
              style={{
                color: anaYaziRengi,
                borderLeftColor: kenarlikRengi,
                borderRightColor: kenarlikRengi,
              }}
              className="select-none border-l border-r px-1.5 font-mono text-xs font-semibold"
              aria-live="polite"
            >
              {metinBoyutu}px
            </span>

            <button
              type="button"
              onClick={() => {
                setMetinBoyutu((oncekiBoyut) =>
                  Math.min(24, oncekiBoyut + 2)
                );
              }}
              aria-label="Yazı boyutunu büyüt"
              style={{
                color: anaYaziRengi,
              }}
              className="cursor-pointer border-0 bg-transparent px-2.5 py-1.5 text-[13px] font-bold transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/30"
            >
              A+
            </button>
          </div>

          {/* Karanlık mod butonu */}
          <button
            type="button"
            onClick={toggleKaranlikMod}
            aria-pressed={karanlikMod}
            aria-label="Karanlık temayı aç veya kapat"
            style={{
              color: anaYaziRengi,
              borderColor: kenarlikRengi,
              backgroundColor: kontrolArkaPlanRengi,
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[3px] border px-3 py-2 text-[13px] font-medium transition-all duration-150 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/30"
          >
            {karanlikMod ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Alt Kısım: Genel istatistikler */}
      <p
        style={{
          color: altYaziRengi,
          fontSize: `${metinBoyutu * 0.85}px`,
        }}
        className="mt-4 mb-0 flex flex-wrap items-center gap-2 leading-5"
      >
        <span aria-hidden="true">📖</span>

        <strong>{sozlukSayisi} Sözlük</strong>

        <span aria-hidden="true">&bull;</span>

        <span aria-hidden="true">📚</span>

        <strong>
          {kayitSayisi.toLocaleString("tr-TR")}+ Kelime Kaydı
        </strong>

        <span aria-hidden="true">&bull;</span>

        <span
          style={{
            color: vurguRengi,
          }}
          className="font-bold"
        >
          ● Açık Dijital Arşiv
        </span>
      </p>
    </header>
  );
}
