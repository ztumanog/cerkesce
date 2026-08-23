// src/utils/helpers.tsx
import React from "react";
import { VARSAYILAN_TEMA, TUR_MAP } from "@/lib/dictionaryConstants";

export { 
  kaynagiDuzenle, 
  metneCevir, 
  temizeCevir 
} from "@/constants/dictionarySources";

import { kaynagiDuzenle, metneCevir } from "@/constants/dictionarySources";

export interface TemaTipi {
  arkaPlan: string;
  kartArkaPlan: string;
  yaziAna: string;
  yaziAlt: string;
  kenarlik: string;
  inputArkaPlan: string;
  [key: string]: any;
}

const ENTITY_MAP: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&cent;": "¢",
  "&pound;": "£",
  "&yen;": "¥",
  "&euro;": "€",
  "&copy;": "©",
  "&reg;": "®",
};

// Sayısal değerleri Roma rakamına (1 -> I, 2 -> II, 3 -> III vb.) çeviren yardımcı fonksiyon
const sayiyiRomaRakaminaCevir = (num: number): string => {
  const romaMap: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let result = "";
  for (const [val, char] of romaMap) {
    while (num >= val) {
      result += char;
      num -= val;
    }
  }
  return result;
};

export function temizleHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  let text = html
    .replace(/<\/(?:h[1-6]|p|div|li|tr)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");

  text = text.replace(/<[^>]*>/g, "");

  text = text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    if (ENTITY_MAP[entity]) return ENTITY_MAP[entity];
    if (entity.startsWith("&#") && !entity.startsWith("&#x")) {
      const code = parseInt(entity.slice(2, -1), 10);
      return !isNaN(code) ? String.fromCharCode(code) : entity;
    }
    if (entity.startsWith("&#x")) {
      const code = parseInt(entity.slice(3, -1), 16);
      return !isNaN(code) ? String.fromCharCode(code) : entity;
    }
    return entity;
  });

  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n/g, "\n\n")
    .trim();
}

export const hedefDilBul = (dosyaAdi?: any): string => {
  const metin = metneCevir(dosyaAdi);
  if (!metin) return "diger";
  const isim = metin.toLowerCase();
  if (isim.includes("tur") || isim.includes("tu-")) return "tr";
  if (isim.includes("ara") || isim.includes("-ar")) return "ar";
  if (isim.includes("en") || isim.includes("kbd-en")) return "en";
  if (isim.includes("rus") || isim.includes("ru-")) return "ru";
  return "diger";
};

export const normalizeText = (text: any): string => {
  const metin = metneCevir(text);
  if (!metin) return "";
  return metin.normalize("NFC").toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]/gu, "").trim();
};

export const tanimlariBicimlendir = (
  tanim: any,
  tema: TemaTipi = VARSAYILAN_TEMA as unknown as TemaTipi,
  gecerliBaslikOrBoyut?: string | number,
  metinBoyutuParam?: number,
  kaynakParam?: any,
  sozluklerListesi?: any[]
) => {
  const tanimMetni = metneCevir(tanim);
  if (!tanimMetni) return null;

  const gecerliTema: TemaTipi = {
    ...tema,
    arkaPlan: tema?.arkaPlan || "#ffffff",
    kartArkaPlan: tema?.kartArkaPlan || "#f9fafb",
    yaziAna: tema?.yaziAna || "#111827",
    yaziAlt: tema?.yaziAlt || "#4b5563",
    kenarlik: tema?.kenarlik || "#e5e7eb",
    inputArkaPlan: tema?.inputArkaPlan || "#ffffff",
  };

  let gecerliBaslik = "";
  let metinBoyutu = 16;

  if (typeof gecerliBaslikOrBoyut === "number") {
    metinBoyutu = gecerliBaslikOrBoyut;
  } else if (typeof gecerliBaslikOrBoyut === "string") {
    gecerliBaslik = gecerliBaslikOrBoyut;
    if (typeof metinBoyutuParam === "number") metinBoyutu = metinBoyutuParam;
  }

  const temizBaslik = gecerliBaslik ? normalizeText(gecerliBaslik) : "";
  const satirListesi: string[] = tanimMetni.split("\n");
  const anlamlar: string[] = [];
  const benzersizAnlamlar = new Set<string>();
  let turBilgisi = "";
  
  // sozluklerListesi parametresi alt fonksiyona geçiriliyor
  let kaynakBilgisi = kaynagiDuzenle(kaynakParam, sozluklerListesi);
  const kirilVarMi = /[\u0400-\u04FF]/.test(tanimMetni);

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
    if (sourceMatch) { 
      // sozluklerListesi parametresi alt fonksiyona geçiriliyor
      kaynakBilgisi = kaynagiDuzenle(sourceMatch[1].trim(), sozluklerListesi); 
      continue; 
    }

    // Roma rakamı ve başlık numaralarının temizleme esnasında kaybolmaması için \d\.\) çıkarıldı
    temiz = temiz.replace(/^[\s•*\-]+/, "").trim();
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
    <div 
      style={{ 
        marginTop: "12px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "12px",
        pointerEvents: "none"
      }}
    >
      {anlamlar.length > 0 && (
        <div>
          <h4 style={{ fontSize: `${metinBoyutu * 0.85}px`, fontWeight: 600, color: gecerliTema.yaziAlt, margin: "0 0 6px 0" }}>
            📖 Karşılıklar
          </h4>
          {anlamlar.map((anlam, idx) => {
            // I, II, III gibi Roma rakamları kontrolü
            const isRomaRakami = /^(I|II|III|IV|V|VI|VII|VIII|IX|X)(\.|\s|$)/i.test(anlam);

            // 1. veya 1) gibi sayısal başlık kontrolü
            const sayiMatch = anlam.match(/^(\d+)[\.\)]\s*(.*)$/);
            const isSayiBasligi = Boolean(sayiMatch);

            const isBaslik = isRomaRakami || isSayiBasligi;

            // Eğer "1. толстый" gibi sayısal başlık varsa bunu "I. толстый" formatına dönüştür
            let gosterilecekMetin = anlam;
            if (isSayiBasligi && sayiMatch) {
              const romaRakami = sayiyiRomaRakaminaCevir(parseInt(sayiMatch[1], 10));
              const kalanMetin = sayiMatch[2];
              gosterilecekMetin = kalanMetin ? `${romaRakami}. ${kalanMetin}` : romaRakami;
            }

            return (
              <div 
                key={idx} 
                style={{ 
                  color: gecerliTema.yaziAna, 
                  fontSize: isBaslik ? `${metinBoyutu * 1.05}px` : `${metinBoyutu * 0.95}px`, 
                  fontWeight: isBaslik ? "bold" : "normal",
                  lineHeight: "1.6", 
                  marginTop: isBaslik ? "10px" : "2px",
                  marginBottom: "2px", 
                  paddingLeft: isBaslik ? "0px" : "12px" 
                }}
              >
                {!isBaslik && "• "}{gosterilecekMetin}
              </div>
            );
          })}
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