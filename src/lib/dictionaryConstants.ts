/**
 * @file src/lib/dictionaryConstants.ts
 * @description Ã‡erkesÃ§e Dil Korpusu iÃ§in tÃ¼m sabitler, tema ve dilbilgisi tÃ¼r tanÄ±mlarÄ±.
 */

// ============================================================================
// 1. TEMA TÄ°PÄ° TANIMI
// ============================================================================
export interface TemaTipi {
  arkaPlan: string;
  kartArkaPlan: string;
  yaziAna: string;
  yaziAlt: string;
  kenarlik: string;        // Zorunlu alan
  inputArkaPlan: string;  // Zorunlu alan
  renk_ana?: string;
  renk_ikincil?: string;
  renk_vurgu?: string;
  renk_basarili?: string;
  renk_uyari?: string;
  renk_hata?: string;
  renk_arka?: string;
  renk_sinir?: string;
}

// ============================================================================
// 2. EXPORT EDÄ°LEN SABÄ°TLER (SOZLUK_META ve TUR_MAP Dahil)
// ============================================================================

// Hata 1 Ã‡Ã¶zÃ¼mÃ¼: SOZLUK_META export edildi
export const SOZLUK_META = {
  default: {
    id: "default",
    file: "default.json",
    title: "Ã‡erkesÃ§e Genel SÃ¶zlÃ¼k",
    name: "Ã‡erkesÃ§e SÃ¶zlÃ¼k",
    totalWords: 0,
    dialect: "western",
    fromLang: "ady",
    toLang: "tr",
  },
  western: {
    id: "western",
    file: "western.json",
    title: "BatÄ± AdÄ±ÄŸece SÃ¶zlÃ¼k",
    name: "BatÄ± AdÄ±ÄŸece",
    totalWords: 0,
    dialect: "western",
    fromLang: "ady",
    toLang: "tr",
  },
  eastern: {
    id: "eastern",
    file: "eastern.json",
    title: "DoÄŸu Kabardeyce SÃ¶zlÃ¼k",
    name: "DoÄŸu Kabardeyce",
    totalWords: 0,
    dialect: "eastern",
    fromLang: "kbd",
    toLang: "tr",
  },
} as const;

// Hata 5 Ã‡Ã¶zÃ¼mÃ¼: TUR_MAP export edildi
export const TUR_MAP: Record<string, string> = {
  noun: "Ä°sim",
  verb: "Fiil",
  adjective: "SÄ±fat",
  adverb: "Zarf",
  preposition: "Edat",
  conjunction: "BaÄŸlaÃ§",
  pronoun: "Zamir",
  interjection: "Ãœnlem",
};

// VarsayÄ±lan Tema (TemaTipi ile Uyumlu)
export const VARSAYILAN_TEMA: TemaTipi = {
  arkaPlan: "#FFFFFF",
  kartArkaPlan: "#F4EFE6",
  yaziAna: "#2C221E",
  yaziAlt: "#4A3E37",
  kenarlik: "#EADDC9",        // Zorunlu alan
  inputArkaPlan: "#FFFFFF",   // Zorunlu alan
  renk_ana: "#1F2937",
  renk_ikincil: "#6B7280",
  renk_vurgu: "#3B82F6",
  renk_basarili: "#10B981",
  renk_uyari: "#F59E0B",
  renk_hata: "#EF4444",
  renk_arka: "#FFFFFF",
  renk_sinir: "#E5E7EB",
};

// KURUMSAL nesnesini dÄ±ÅŸarÄ±ya aktarÄ±yoruz (export)
export const KURUMSAL = {
  ad: "Ã‡erkesÃ§e Dil Korpusu",
  aciklama: "Ã‡erkesÃ§e (AdÄ±ÄŸe/Kabardeyce) Ã‡ok Dilli SÃ¶zlÃ¼k Platformu",
  versiyon: "2.0",
  yil: 2026,
  dil: "tr",
  kirmizi: "#EF4444",
} as const;

// TypeScript iÃ§in KURUMSAL Tip TanÄ±mÄ± (Ä°htiyaÃ§ durumunda kullanÄ±labilir)
export type KurumsalTipi = typeof KURUMSAL;

