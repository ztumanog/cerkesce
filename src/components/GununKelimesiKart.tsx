import type React from "react";
import { KURUMSAL } from "@/lib/dictionaryConstants";
import type { DictionaryItem } from "@/types/dictionary";
import { tanimlariBicimlendir, kaynagiDuzenle, type TemaTipi } from "@/utils/helpers";

interface GununKelimesiKartiProps {
  gununKelimesi: DictionaryItem | null;
  karanlikMod: boolean;
  metinBoyutu: number;
  tema: TemaTipi;
  onClick: () => void;
}

export default function GununKelimesiKarti({
  gununKelimesi,
  karanlikMod,
  metinBoyutu,
  tema,
  onClick,
}: GununKelimesiKartiProps) {
  if (!gununKelimesi) return null;

  // Veri İşleme Öncelik Hiyerarşisi: 
  // 1. definitions[].meaning -> 2. full_definition_in_html -> 3. tanim / meaning
  const tanimMetni =
    gununKelimesi.definitions?.[0]?.meaning ||
    gununKelimesi.full_definition_in_html ||
    (typeof gununKelimesi.tanim === "string" ? gununKelimesi.tanim : "") ||
    gununKelimesi.meaning ||
    "";

  const arkaPlanRengi = karanlikMod ? "#1e293b" : KURUMSAL.kirmiziAcik;
  const isBatil = gununKelimesi.dialect === "BATI";

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        padding: "16px 20px",
        backgroundColor: arkaPlanRengi,
        borderLeft: `5px solid ${KURUMSAL.kirmizi}`,
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        cursor: "pointer",
        textAlign: "left",
      }}
      className="transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
      role="button"
      tabIndex={0}
      aria-label="Günün kelimesi detaylarını aç"
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            color: KURUMSAL.kirmizi,
            fontSize: `${metinBoyutu * 0.85}px`,
          }}
          className="font-bold uppercase tracking-wider"
        >
          🌟 Günün Kelimesi
        </span>
        {gununKelimesi.dialect && (
          <span
            style={{
              fontSize: `${metinBoyutu * 0.75}px`,
              color: isBatil ? "#16a34a" : "#2563eb",
              backgroundColor: isBatil ? "#16a34a15" : "#2563eb15",
            }}
            className="rounded-full px-2 py-0.5 font-bold"
          >
            {isBatil ? "Batı Adıgece" : "Doğu Kabardeyce"}
          </span>
        )}
      </div>

      <div
        style={{
          fontSize: `${metinBoyutu * 1.25}px`,
          color: tema.yaziAna,
        }}
        className="mt-1 font-bold"
      >
        {gununKelimesi.kelime}
      </div>

      {tanimlariBicimlendir(
        tanimMetni,
        tema,
        gununKelimesi.kelime,
        metinBoyutu,
        kaynagiDuzenle(gununKelimesi.kaynak_sozluk)
      )}
    </div>
  );
}