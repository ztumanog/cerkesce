import type React from "react";
import { KURUMSAL, SOZLUK_META } from "@/lib/dictionaryConstants";
import type { DictionaryItem } from "@/types/dictionary";
import { tanimlariBicimlendir, kaynagiDuzenle, type TemaTipi } from "@/utils/helpers";

interface YerelSozlukMeta {
  dilCifti: string;
  yazar: string;
}

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

  // Veri İşleme Öncelik Hiyerarşisi
  const tanimMetni =
    gununKelimesi.definitions?.[0]?.meaning ||
    gununKelimesi.full_definition_in_html ||
    (typeof gununKelimesi.tanim === "string" ? gununKelimesi.tanim : "") ||
    gununKelimesi.meaning ||
    "";

  // Kaynaklar.tsx Renk Mimarisi
  const arkaPlanRengi = karanlikMod ? "#1F1A17" : "#FFFFFF";
  const kenarlikRengi = karanlikMod ? "#3D322C" : "#EADDC9";
  const bordoRenk = KURUMSAL.kirmizi || "#7A1C1C";
  const isBatil = gununKelimesi.dialect === "BATI";

  // 1. Kaynak verisini güvenli şekilde al
  const rawKaynak = gununKelimesi.kaynak_sozluk as unknown;
  let kaynakStr = "";
  let kaynakMeta: YerelSozlukMeta | null = null;

  if (typeof rawKaynak === "string") {
    kaynakStr = rawKaynak;
  } else if (rawKaynak && typeof rawKaynak === "object") {
    kaynakMeta = rawKaynak as YerelSozlukMeta;
  }

  // 2. Dosya adını string olarak al
  const dosyaAdi: string = typeof gununKelimesi.file === "string" 
    ? gununKelimesi.file 
    : kaynakStr;

  // 3. Metadata haritası veya yedek fonksiyondan isim üret
  const metaObj = dosyaAdi ? (SOZLUK_META[dosyaAdi] as YerelSozlukMeta | undefined) : undefined;

  let kaynakIsmi = "";
  if (metaObj) {
    kaynakIsmi = `${metaObj.dilCifti} — ${metaObj.yazar}`;
  } else if (kaynakMeta) {
    kaynakIsmi = `${kaynakMeta.dilCifti} — ${kaynakMeta.yazar}`;
  } else {
    const duzenlenmis = kaynagiDuzenle(dosyaAdi) as unknown;
    if (typeof duzenlenmis === "string") {
      kaynakIsmi = duzenlenmis;
    } else if (duzenlenmis && typeof duzenlenmis === "object") {
      const obj = duzenlenmis as YerelSozlukMeta;
      kaynakIsmi = `${obj.dilCifti} — ${obj.yazar}`;
    } else {
      kaynakIsmi = dosyaAdi;
    }
  }

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
        width: "100%",
        boxSizing: "border-box",
        padding: "18px 20px",
        backgroundColor: arkaPlanRengi,
        borderLeft: `4px solid ${bordoRenk}`,
        borderTop: `1px solid ${kenarlikRengi}`,
        borderRight: `1px solid ${kenarlikRengi}`,
        borderBottom: `1px solid ${kenarlikRengi}`,
        borderRadius: "3px",
        marginBottom: "16px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "'IBM Plex Sans', sans-serif",
        transition: "all 0.15s ease",
      }}
      className="hover:border-amber-700/30 focus:outline-none focus:ring-1 focus:ring-amber-900/20"
      role="button"
      tabIndex={0}
      aria-label="Günün kelimesi detaylarını aç"
    >
      {/* Üst Etiket Satırı ve Diyalekt Rozeti */}
      <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
        <span
          style={{
            color: bordoRenk,
            fontSize: `${Math.max(11, metinBoyutu * 0.75)}px`,
            letterSpacing: "1.5px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          ✨ Günün Kelimesi
        </span>

        {gununKelimesi.dialect && (
          <span
            style={{
              fontSize: `${Math.max(10, metinBoyutu * 0.70)}px`,
              fontWeight: "bold",
              color: isBatil ? bordoRenk : "#A37015",
              backgroundColor: isBatil
                ? (karanlikMod ? "#2C221E" : "#FDF2F2")
                : (karanlikMod ? "#2A2419" : "#FCF8ED"),
              border: `1px solid ${isBatil
                ? (karanlikMod ? "#3D322C" : "#F4C7C7")
                : (karanlikMod ? "#4A3E26" : "#E2C997")}`,
              padding: "2px 6px",
              borderRadius: "2px",
              textTransform: "uppercase",
            }}
          >
            {isBatil ? "🟢 BATI ADIGECE" : "🔵 DOĞU KABARDEYCE"}
          </span>
        )}
      </div>

      {/* Başlık (Kelime) */}
      <div
        style={{
          fontSize: `${metinBoyutu * 1.3}px`,
          color: tema.yaziAna,
          fontFamily: "serif",
          fontWeight: "bold",
          lineHeight: "1.3",
          marginBottom: "6px",
        }}
      >
        {gununKelimesi.kelime}
      </div>

      {/* Tanım İçeriği */}
      <div style={{ fontSize: `${metinBoyutu * 0.9}px`, color: karanlikMod ? "#D0C4B8" : "#4A3E37" }}>
        {tanimlariBicimlendir(
          tanimMetni,
          tema,
          gununKelimesi.kelime,
          metinBoyutu,
          kaynakIsmi
        )}
      </div>
    </div>
  );
}