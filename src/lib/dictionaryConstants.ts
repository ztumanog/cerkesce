/**
 * @file src/lib/dictionaryConstants.ts
 * @description Çerkesçe Dil Korpusu için tüm sabitler, tema ve dilbilgisi tür tanımları.
 */

// ============================================================================
// 1. TEMA TİPİ TANIMI
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
// 2. EXPORT EDİLEN SABİTLER (SOZLUK_META ve TUR_MAP Dahil)
// ============================================================================

// Hata 1 Çözümü: SOZLUK_META export edildi
export const SOZLUK_META = {
  default: {
    id: "default",
    file: "default.json",
    title: "Çerkesçe Genel Sözlük",
    name: "Çerkesçe Sözlük",
    totalWords: 0,
    dialect: "western",
    fromLang: "ady",
    toLang: "tr",
  },
  western: {
    id: "western",
    file: "western.json",
    title: "Batı Adığece Sözlük",
    name: "Batı Adığece",
    totalWords: 0,
    dialect: "western",
    fromLang: "ady",
    toLang: "tr",
  },
  eastern: {
    id: "eastern",
    file: "eastern.json",
    title: "Doğu Kabardeyce Sözlük",
    name: "Doğu Kabardeyce",
    totalWords: 0,
    dialect: "eastern",
    fromLang: "kbd",
    toLang: "tr",
  },
} as const;

// Hata 5 Çözümü: TUR_MAP export edildi
export const TUR_MAP: Record<string, string> = {
  noun: "İsim",
  verb: "Fiil",
  adjective: "Sıfat",
  adverb: "Zarf",
  preposition: "Edat",
  conjunction: "Bağlaç",
  pronoun: "Zamir",
  interjection: "Ünlem",
};

// Varsayılan Tema (TemaTipi ile Uyumlu)
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

// KURUMSAL nesnesini dışarıya aktarıyoruz (export)
export const KURUMSAL = {
  ad: "Çerkesçe Dil Korpusu",
  aciklama: "Çerkesçe (Adığe/Kabardeyce) Çok Dilli Sözlük Platformu",
  versiyon: "2.0",
  yil: 2026,
  dil: "tr",
  kirmizi: "#EF4444",
} as const;

// TypeScript için KURUMSAL Tip Tanımı (İhtiyaç durumunda kullanılabilir)
export type KurumsalTipi = typeof KURUMSAL;
