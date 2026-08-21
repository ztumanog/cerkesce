// src/utils/helpers.tsx
import React from "react";
import { 
  VARSAYILAN_TEMA, 
  TUR_MAP, 
  KAYNAK_HARITASI 
} from "@/lib/dictionaryConstants";

// Tip tanımlaması (Tema için)
export interface TemaTipi {
  arkaPlan: string;
  kartArkaPlan: string;
  yaziAna: string;
  yaziAlt: string;
  kenarlik: string;
  inputArkaPlan: string;
}

// 1. Kaynak dosya adını okunaklı sözlük adına çevirir
export const kaynagiDuzenle = (dosyaAdi?: string) => {
  if (!dosyaAdi) return "";
  return KAYNAK_HARITASI[dosyaAdi] || dosyaAdi;
};

// 2. Sözlüğün hangi dilde olduğunu tespit eder
export const hedefDilBul = (dosyaAdi?: string) => {
  if (!dosyaAdi) return "diger";
  const isim = dosyaAdi.toLowerCase();
  if (isim.includes("tur") || isim.includes("tu-")) return "tr";
  if (isim.includes("ara") || isim.includes("-ar")) return "ar";
  if (isim.includes("en") || isim.includes("kbd-en")) return "en";
  if (isim.includes("rus") || isim.includes("ru-")) return "ru";
  return "diger";
};

// 3. Metinleri arama motoru için temizler ve standartlaştırır
export const normalizeText = (text: string) =>
  text.normalize("NFC").toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]/gu, "").trim();

// 4. Karmaşık kelime tanımlarını HTML olarak güzelce biçimlendirir
export const tanimlariBicimlendir = (
  tanim: string,
  tema: TemaTipi = VARSAYILAN_TEMA,
  gecerliBaslikOrBoyut?: string | number,
  metinBoyutuParam?: number,
  kaynakParam?: string
) => {
  if (!tanim) return null;

  const gecerliTema = tema || VARSAYILAN_TEMA;
  let gecerliBaslik = "";
  let metinBoyutu = 16;

  if (typeof gecerliBaslikOrBoyut === "number") {
    metinBoyutu = gecerliBaslikOrBoyut;
  } else if (typeof gecerliBaslikOrBoyut === "string") {
    gecerliBaslik = gecerliBaslikOrBoyut;
    if (typeof metinBoyutuParam === "number") metinBoyutu = metinBoyutuParam;
  }

  const temizBaslik = gecerliBaslik ? normalizeText(gecerliBaslik) : "";
  const satirListesi: string[] = tanim.split("\n");
  const anlamlar: string[] = [];
  const benzersizAnlamlar = new Set<string>();
  let turBilgisi = "";
  let kaynakBilgisi = kaynakParam || "";
  const kirilVarMi = /[\u0400-\u04FF]/.test(tanim);

  for (const satir of satirListesi) {
    let temiz = satir.trim();
    if (!temiz) continue;
    if (/^definitions:?$/i.test(temiz)) continue;

    const typeMatch = temiz.match(/^type:\s*(.*)$/i);
    if (typeMatch) {
      turBilgisi = TUR_MAP[typeMatch[1].trim().toLowerCase()] || typeMatch[1].trim();
      continue;
    }

    const sourceMatch = temiz.match(/^(?:source|kaynak):\s*(.*)$/i);
    if (sourceMatch) { kaynakBilgisi = sourceMatch[1].trim(); continue; }

    temiz = temiz.replace(/^[\s•*\-\d\.\)]+/, "").trim();
    temiz = temiz.replace(/\s*\(.*?\)/g, "").trim();
    if (!temiz) continue;
    if (temizBaslik && normalizeText(temiz) === temizBaslik) continue;
    if (!temizBaslik && kirilVarMi && /^[a-zA-Z\s\-\'\"]+$/.test(temiz)) continue;

    if (!benzersizAnlamlar.has(temiz)) {
      benzersizAnlamlar.add(temiz);
      anlamlar.push(temiz);
    }
  }

  return (
    <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
      {anlamlar.length > 0 && (
        <div>
          <h4 style={{ fontSize: `${metinBoyutu * 0.85}px`, fontWeight: 600, color: gecerliTema.yaziAlt, margin: "0 0 6px 0" }}>
            📖 Karşılıklar
          </h4>
          {anlamlar.map((anlam, idx) => (
            <div key={idx} style={{ color: gecerliTema.yaziAna, fontSize: `${metinBoyutu * 0.95}px`, lineHeight: "1.6", marginBottom: "4px", paddingLeft: "2px" }}>
              • {anlam}
            </div>
          ))}
        </div>
      )}
      {Boolean(turBilgisi) && (
        <div style={{ paddingTop: "8px", borderTop: `1px solid ${gecerliTema.kenarlik}`, fontSize: `${metinBoyutu * 0.85}px`, color: gecerliTema.yaziAlt, fontWeight: 500 }}>
          🏷 Tür: <span style={{ color: gecerliTema.yaziAna, fontWeight: 600 }}>{turBilgisi}</span>
        </div>
      )}
      {Boolean(kaynakBilgisi) && (
        <div style={{ paddingTop: turBilgisi ? "4px" : "8px", borderTop: turBilgisi ? "none" : `1px solid ${gecerliTema.kenarlik}`, fontSize: `${metinBoyutu * 0.8}px`, color: gecerliTema.yaziAlt, fontStyle: "italic" }}>
          📚 Kaynak: <span style={{ fontWeight: 500 }}>{kaynakBilgisi}</span>
        </div>
      )}
    </div>
  );
};