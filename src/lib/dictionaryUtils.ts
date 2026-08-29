/**
 * @file src/lib/dictionaryUtils.ts
 * @description Çerkesçe Sözlük filtreleme, arama, metin normalizasyonu ve doğrulama utility fonksiyonları.
 */

import type { DictionaryItem, LehceTipi } from "@/types/dictionary";

// ============================================================================
// SÖZLÜK & LEHÇE SABİTLERİ
// ============================================================================

/**
 * Varsayılan/Tanımlı sözlükler ve özellikleri.
 */
export const SOZLUKLER = {
  "kabardey-cerkes": {
    id: "kabardey-cerkes",
    title: "Kabardey-Çerkes Sözlüğü",
    file: "kabardey-cerkes.json",
    dialect: "eastern" as const,
    author: "Bilinmiyor",
    year: 2020,
  },
  "adyghe-english": {
    id: "adyghe-english",
    title: "Adyghe-English Dictionary",
    file: "adyghe-english.json",
    dialect: "western" as const,
    author: "Bilinmiyor",
    year: 2021,
  },
  "cerkes-turkce": {
    id: "cerkes-turkce",
    title: "Çerkes-Türkçe Sözlüğü",
    file: "cerkes-turkce.json",
    dialect: "western" as const,
    author: "Bilinmiyor",
    year: 2019,
  },
} as const;

export const LEHCELER: Record<string, string> = {
  TUMU: "Tümü",
  western: "Batı Çerkesçesi (Adigece)",
  eastern: "Doğu Çerkesçesi (Kabardeyce)",
  BATI: "Batı Çerkesçesi (Adigece)",
  DOGU: "Doğu Çerkesçesi (Kabardeyce)",
};

export const HEDEF_DILLER: Record<string, string> = {
  TUMU: "Tümü",
  turkish: "Türkçe",
  english: "English",
  TURKCE: "Türkçe",
  INGILIZCE: "English",
  russian: "Rusça",
  RUSCA: "Rusça",
};

// ============================================================================
// METİN NORMALİZASYON (METİN TEMİZLEME)
// ============================================================================

/**
 * Türkçe ve Çerkesçe harfleri doğru şekilde küçük harfe çeviren ve temizleyen fonksiyon.
 * @param text Dönüştürülecek ham metin
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .toLowerCase()
    .trim();
}

// ============================================================================
// ARAMA VE FİLTRELEME FONKSİYONLARI
// ============================================================================

/**
 * Verilen sorguya göre sözlük öğelerini filtreler.
 * Prefix, contains, exact ve fuzzy arama modlarını destekler.
 * 
 * @param items Filtrelenecek sözlük elemanları dizisi
 * @param query Kullanıcının girdiği arama metni
 * @param mode Arama modu ("prefix" | "contains" | "exact" | "fuzzy")
 */
export function sozlukAra(
  items: DictionaryItem[],
  query: string,
  mode: "prefix" | "contains" | "exact" | "fuzzy" = "prefix"
): DictionaryItem[] {
  const q = normalizeText(query);
  if (!q) return items;

  return items.filter((item) => {
    const kelime = normalizeText(item.kelime || item.word || "");
    const tanim = normalizeText(item.tanim || item.definition || item.meaning || "");

    switch (mode) {
      case "prefix":
        // Kelime sorgu ile başlıyor mu VEYA tanım sorgu ile başlıyor mu?
        return kelime.startsWith(q) || tanim.startsWith(q);

      case "exact":
        return kelime === q || tanim === q;

      case "contains":
        return kelime.includes(q) || tanim.includes(q);

      case "fuzzy": {
        // Esnek arama: Sorgudaki karakterlerin sırayla kelimede geçip geçmediğini kontrol eder
        let queryIndex = 0;
        for (let i = 0; i < kelime.length && queryIndex < q.length; i++) {
          if (kelime[i] === q[queryIndex]) queryIndex++;
        }
        return queryIndex === q.length;
      }

      default:
        return false;
    }
  });
}

/**
 * Bir sözlük öğesinin belirtilen lehçeyle uyumlu olup olmadığını kontrol eder.
 */
export function diyalektUyuyorMu(
  item: DictionaryItem,
  lehce: LehceTipi
): boolean {
  if (!lehce || lehce === "TUMU") return true;

  const itemDialect = normalizeText(item.dialect || "western");
  const normalizedLehce = diyalektKodunaCevir(lehce);

  return itemDialect === normalizedLehce;
}

/**
 * Bir sözlük öğesinin belirtilen hedef dille uyumlu olup olmadığını kontrol eder.
 * JSON içerisindeki farklı hedef dil alanlarını (targetLanguage, hedefDil, toLang vb.) esnekçe tarar.
 */
export function hedefDilUyuyorMu(
  item: DictionaryItem,
  hedefDil: string
): boolean {
  if (!hedefDil || hedefDil === "TUMU") return true;

  const targetLangCode = hedefDilKodu(hedefDil);

  // 1. Doğrudan eleman üzerindeki alanları kontrol et
  const itemTarget = normalizeText(
    (item.targetLanguage || item.hedefDil || item.toLang || item.hedef_dil || "") as string
  );

  if (itemTarget) {
    if (targetLangCode === "turkish") return itemTarget.includes("turk") || itemTarget === "tr";
    if (targetLangCode === "english") return itemTarget.includes("eng") || itemTarget === "en";
    if (targetLangCode === "russian") return itemTarget.includes("rus") || itemTarget === "ru";
  }

  // 2. Sözlük dosyası / ID adına göre fallback kontrolü yap
  const sozlukId = normalizeText(sozlukDosyasi(item));

  if (targetLangCode === "turkish") {
    return sozlukId.includes("turkce") || sozlukId.includes("turkish") || sozlukId.includes("-tr");
  } else if (targetLangCode === "english") {
    return sozlukId.includes("english") || sozlukId.includes("ingilizce") || sozlukId.includes("-en");
  } else if (targetLangCode === "russian") {
    return sozlukId.includes("russian") || sozlukId.includes("rusca") || sozlukId.includes("-ru");
  }

  return true;
}

/**
 * Bir sözlük öğesinin dosya/kaynak adını döndürür.
 */
export function sozlukDosyasi(item: DictionaryItem): string {
  return (
    item.file ||
    item.kaynak_sozluk ||
    item.kaynakSozluk ||
    item.dictionaryId ||
    "bilinmeyen-sozluk"
  );
}

/**
 * Bir sözlük öğesinin arayüzde görünen başlığını döndürür.
 */
export function sozlukGorunenAdi(item: DictionaryItem): string {
  const dosya = sozlukDosyasi(item);
  const bulunan = SOZLUKLER[dosya as keyof typeof SOZLUKLER];
  return bulunan ? bulunan.title : dosya;
}

// ============================================================================
// DÖNÜŞTÜRÜCÜ VE KONTROL FONKSİYONLARI
// ============================================================================

/**
 * Lehçe kodunu standart "western" veya "eastern" değerine çevirir.
 */
export function diyalektKodunaCevir(lehce: LehceTipi): string {
  const mapping: Record<string, string> = {
    TUMU: "TUMU",
    western: "western",
    eastern: "eastern",
    BATI: "western",
    DOGU: "eastern",
  };
  return mapping[lehce] || "western";
}

/**
 * Hedef dil string değerini standart dile ("turkish", "english", "russian") dönüştürür.
 */
export function hedefDilKodu(hedefDil: string): string {
  const mapping: Record<string, string> = {
    TURKCE: "turkish",
    INGILIZCE: "english",
    RUSCA: "russian",
    turkish: "turkish",
    english: "english",
    russian: "russian",
    TUMU: "TUMU",
  };
  return mapping[hedefDil] || normalizeText(hedefDil);
}

// ============================================================================
// GETTER FONKSİYONLARI
// ============================================================================

export function getLehceler() {
  return LEHCELER;
}

export function getHedefDiller() {
  return HEDEF_DILLER;
}

export function getSozlukler() {
  return SOZLUKLER;
}