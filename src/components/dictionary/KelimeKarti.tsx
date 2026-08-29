"use client";

import React, { useCallback, useMemo } from "react";
import { tanimlariBicimlendir, kaynagiDuzenle, type TemaTipi } from "@/utils/helpers";
import { KURUMSAL } from "@/lib/dictionaryConstants";
import type { GruplanmisKelime, DictionaryItem } from "@/types/dictionary";

interface KelimeKartiProps {
  readonly grup: GruplanmisKelime;
  readonly idx: number;
  readonly tema: TemaTipi;
  readonly metinBoyutu: number;
  readonly kopyalandiId: string | null;
  readonly panoyaKopyala: (kelime: string, tanim?: string, id?: string) => void;
  readonly onClick: (grup: GruplanmisKelime) => void;
}

/**
 * Type Guard: Nesnenin Record<string, unknown> olup olmadığını doğrular.
 */
function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

/**
 * Type Guard: Nesnenin DictionaryItem tipinde olduğunu doğrular.
 */
function isDictionaryItem(val: unknown): val is DictionaryItem {
  return isRecord(val) && ("definitions" in val || "full_definition_in_html" in val || "tanim" in val || "meaning" in val);
}

/**
 * Tip güvenliği sağlanan metin dönüştürücü.
 */
function metneCevir(deger: unknown): string {
  if (deger === null || deger === undefined) return "";
  if (typeof deger === "string") return deger;
  if (typeof deger === "number") return String(deger);
  if (typeof deger === "boolean") return String(deger);

  if (isRecord(deger)) {
    if (typeof deger.name === "string") return deger.name;
    if (typeof deger.dilCifti === "string") return deger.dilCifti;
    if (typeof deger.yazar === "string") return deger.yazar;
    return JSON.stringify(deger);
  }

  return String(deger);
}

/**
 * Nesneden güvenli bir şekilde tanım metnini çıkarır.
 */
function tanimMetniniAl(item: unknown): string {
  if (!isRecord(item)) return "";

  if (Array.isArray(item.definitions) && item.definitions.length > 0) {
    const ilkTanim = item.definitions[0];
    if (isRecord(ilkTanim) && ilkTanim.meaning) {
      return metneCevir(ilkTanim.meaning);
    }
  }

  if (typeof item.full_definition_in_html === "string") {
    return metneCevir(item.full_definition_in_html);
  }

  const tanim = item.tanim ?? item.meaning;
  return metneCevir(tanim);
}

/**
 * Kaynak nesnesinden dosya veya sözlük adını doğrular.
 */
function dosyaVeyaSozlukAl(item: unknown): string {
  if (!isRecord(item)) return "";
  const hedef = item.file ?? item.kaynak_sozluk ?? item.dictionaryName;
  return metneCevir(hedef);
}

export default function KelimeKarti({
  grup,
  idx,
  tema,
  metinBoyutu,
  kopyalandiId,
  panoyaKopyala,
  onClick
}: KelimeKartiProps) {
  const kartId = `g-${idx}`;
  const isKopyalandi = kopyalandiId === kartId;

  const ilkKaynak = useMemo(() => {
    return grup.kaynaklar?.[0] ?? grup.anlamlar?.[0] ?? null;
  }, [grup.kaynaklar, grup.anlamlar]);

  const kelimeMetni = useMemo(() => metneCevir(grup.kelime), [grup.kelime]);
  const tanimMetni = useMemo(() => tanimMetniniAl(ilkKaynak), [ilkKaynak]);
  const dosyaVeyaSozluk = useMemo(() => dosyaVeyaSozlukAl(ilkKaynak), [ilkKaynak]);

  const handleKartClick = useCallback(() => {
    onClick(grup);
  }, [onClick, grup]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(grup);
    }
  }, [onClick, grup]);

  const handleKopyalaClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    panoyaKopyala(kelimeMetni, tanimMetni, kartId);
  }, [panoyaKopyala, kelimeMetni, tanimMetni, kartId]);

  return (
    <article
      role="article"
      tabIndex={0}
      onClick={handleKartClick}
      onKeyDown={handleKeyDown}
      aria-label={`${kelimeMetni} kelimesi detayları`}
      style={{
        padding: "16px",
        backgroundColor: tema.kartArkaPlan,
        border: `1px solid ${tema.kenarlik}`,
        borderRadius: "8px",
        cursor: "pointer",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        // CSS hover bağımlılığını JS state olmadan dinamik değişkenle yönetme
        ["--hover-border" as string]: KURUMSAL.kirmizi
      }}
      className="kelime-karti-item"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 
          style={{ 
            margin: 0, 
            fontSize: `${metinBoyutu * 1.1}px`, 
            color: tema.yaziAna 
          }}
        >
          {kelimeMetni}
        </h3>

        <button
          type="button"
          onClick={handleKopyalaClick}
          aria-live="polite"
          aria-label={isKopyalandi ? `${kelimeMetni} kopyalandı` : `${kelimeMetni} ve tanımını kopyala`}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            border: `1px solid ${tema.kenarlik}`,
            backgroundColor: "transparent",
            color: tema.yaziAlt,
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: isKopyalandi ? "bold" : "normal"
          }}
        >
          {isKopyalandi ? "✓ Kopyalandı" : "📋 Kopyala"}
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