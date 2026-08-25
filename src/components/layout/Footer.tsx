"use client";

import type { TemaTipi } from "@/utils/helpers";
import { KURUMSAL } from "@/lib/dictionaryConstants";

interface FooterProps {
  aktifTema: TemaTipi;
  onKaynaklarAc: () => void;
}

export default function Footer({
  aktifTema,
  onKaynaklarAc,
}: FooterProps) {
  const kenarlikRengi = aktifTema?.kenarlik || "#EADDC9";
  const altYaziRengi = aktifTema?.yaziAlt || "#8C7A6B";
  const kartArkaPlanRengi =
    aktifTema?.kartArkaPlan ||
    aktifTema?.arkaPlan ||
    "#FFFFFF";
  const vurguRengi = KURUMSAL.kirmizi || "#7A1C1C";

  return (
    <footer
      style={{
        borderTopColor: kenarlikRengi,
        color: altYaziRengi,
      }}
      className="mt-6 flex flex-col items-start justify-between gap-3 border-t pt-4 pb-6 text-xs transition-colors duration-200 sm:flex-row sm:items-center"
    >
      <div className="flex max-w-full items-center gap-2">
        <span
          style={{
            backgroundColor: vurguRengi,
          }}
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full opacity-80"
          aria-hidden="true"
        />

        <span className="text-[10px] font-semibold leading-4 tracking-[0.25px] opacity-80 sm:text-[11px]">
          AÇIK MEKTEP DİJİTAL YAYINCILIK — ÇERKESÇE DİL KORPUSU
        </span>
      </div>

      <button
        type="button"
        onClick={onKaynaklarAc}
        style={{
          color: vurguRengi,
          borderColor: kenarlikRengi,
          backgroundColor: kartArkaPlanRengi,
        }}
        className="cursor-pointer rounded-[4px] border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.5px] transition-all duration-150 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/30"
        aria-label="Kaynaklar ve referanslar penceresini aç"
      >
        Kaynaklar ve Referanslar →
      </button>
    </footer>
  );
}
