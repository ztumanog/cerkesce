"use client";

import React from "react";
import { tanimlariBicimlendir, kaynagiDuzenle, type TemaTipi } from "@/utils/helpers";
import { KURUMSAL } from "@/lib/dictionaryConstants";
import type { GruplanmisKelime, DictionaryItem } from "@/types/dictionary";

interface KelimeKartiProps {
  grup: GruplanmisKelime;
  idx: number;
  tema: TemaTipi;
  metinBoyutu: number;
  kopyalandiId: string | null;
  panoyaKopyala: (kelime: string, tanim?: string, id?: string) => void;
  onClick: (grup: GruplanmisKelime) => void;
}

// Tip güvenliği sağlayan yardımcı metin dönüştürücü
const metneCevir = (deger: unknown): string => {
  if (!deger) return "";
  if (typeof deger === "string") return deger;
  if (typeof deger === "number") return String(deger);
  if (typeof deger === "object" && deger !== null) {
    const obj = deger as Record<string, unknown>;
    if (typeof obj.name === "string") return obj.name;
    if (typeof obj.dilCifti === "string") return obj.dilCifti;
    if (typeof obj.yazar === "string") return obj.yazar;
    return JSON.stringify(deger);
  }
  return String(deger);
};

// Tanım metnini öncelik sırasına göre alma:
// 1. definitions[].meaning
// 2. full_definition_in_html
// 3. tanim / meaning
const tanimMetniniAl = (item?: DictionaryItem | Record<string, unknown>): string => {
  if (!item) return "";
  
  if (Array.isArray(item.definitions) && item.definitions.length > 0) {
    const ilkTanim = item.definitions[0]?.meaning;
    if (ilkTanim) return metneCevir(ilkTanim);
  }
  
  if (item.full_definition_in_html) {
    return metneCevir(item.full_definition_in_html);
  }
  
  return metneCevir(item.tanim || item.meaning);
};

export default function KelimeKarti({
  grup,
  idx,
  tema,
  metinBoyutu,
  kopyalandiId,
  panoyaKopyala,
  onClick
}: KelimeKartiProps) {
  const ilkKaynak = grup.kaynaklar?.[0] || grup.anlamlar?.[0];
  
  const kelimeMetni = metneCevir(grup.kelime);
  const tanimMetni = tanimMetniniAl(ilkKaynak as DictionaryItem);
  const dosyaVeyaSozluk = metneCevir(
    (ilkKaynak as Record<string, unknown>)?.file || 
    (ilkKaynak as Record<string, unknown>)?.kaynak_sozluk || 
    (ilkKaynak as Record<string, unknown>)?.dictionaryName
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(grup);
    }
  };

  return (
    <article
      onClick={() => onClick(grup)} 
      onKeyDown={handleKeyDown}
      style={{ 
        padding: "16px", 
        backgroundColor: tema.kartArkaPlan, 
        border: `1px solid ${tema.kenarlik}`, 
        borderRadius: "8px", 
        cursor: "pointer",
        transition: "border-color 0.2s ease"
      }}
      onMouseOver={(e) => (e.currentTarget.style.borderColor = KURUMSAL.kirmizi)}
      onMouseOut={(e) => (e.currentTarget.style.borderColor = tema.kenarlik)}
      tabIndex={0}
      aria-label={`${kelimeMetni} kelimesi detayları`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: `${metinBoyutu * 1.1}px`, color: tema.yaziAna }}>
          {kelimeMetni}
        </h3>
        
        <button 
          type="button"
          onClick={(e) => { 
            e.stopPropagation();
            panoyaKopyala(kelimeMetni, tanimMetni, `g-${idx}`); 
          }}
          style={{ 
            padding: "4px 8px", 
            fontSize: "12px", 
            border: `1px solid ${tema.kenarlik}`, 
            backgroundColor: "transparent", 
            color: tema.yaziAlt, 
            borderRadius: "4px", 
            cursor: "pointer",
            fontWeight: kopyalandiId === `g-${idx}` ? "bold" : "normal"
          }}
          aria-label="Kelimeyi ve tanımını kopyala"
        >
          {kopyalandiId === `g-${idx}` ? "✓ Kopyalandı" : "📋 Kopyala"}
        </button>
      </div>
      
      {tanimlariBicimlendir(
        tanimMetni, 
        tema, 
        kelimeMetni, 
        metinBoyutu, 
        kaynagiDuzenle(dosyaVeyaSozluk)
      )}
    </article>
  );
}