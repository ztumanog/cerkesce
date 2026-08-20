// src/types/dictionary.ts

// 1. Her türlü 'any' kullanımı yasaklanmıştır. Kesin tipler tanımlanır.
export interface SozlukAnlam {
  meaning?: string;
}

export interface SozlukTanimi {
  definitions?: SozlukAnlam[];
  full_definition_in_html?: string;
  tanim?: SozlukAnlam;
}

export interface DictionaryMeta {
  file: string;
  title: string;
  author?: string;
  publisher?: string;
  year?: string;
  dialect: "BATI" | "DOGU" | "TÜMÜ";
  total_words?: number;
}

export type Dialect = "BATI" | "DOGU" | "TÜMÜ";

export interface DictionaryItem {
  kelime: string;
  tanim: string;
  kaynak_sozluk?: string;
  file?: string;
  dialect?: Dialect;
  language?: string;
}

export interface ExtendedDictionaryItem extends DictionaryItem {
  normalizedKelime?: string;
  normalizedTanim?: string;
  [key: string]: unknown;
}

export interface ConceptDetail {
  kaynakSozluk: string;
  tanim: string;
}

export interface ConceptRow {
  kavram?: string;
  Turkce?: string;
  Ingilizce?: string;
  Arapca?: string;
  Rusca?: string;
  Adigece?: string;
  Kabardeyce?: string;
  detaylar?: ConceptDetail[];
  [key: string]: string | ConceptDetail[] | undefined;
}

// 2. HATA ÇÖZÜMÜ (TS2459 & TS2303): Type Guard burada dışa aktarılır (export)
export function isSozlukTanimi(veri: unknown): veri is SozlukTanimi {
  return typeof veri === "object" && veri !== null;
}