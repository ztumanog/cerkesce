import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS sınıf adlarını dinamik olarak birleştirir ve çakışmaları çözer.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Çerkesçe lehçe kodlarını insan tarafından okunabilir isimlere dönüştürür.
 */
export function lehceAdiniGetir(kod: string): string {
  const lehceler: Record<string, string> = {
    ady: "Adığece (Batı Çerkesçesi)",
    kbd: "Kabardeyce (Doğu Çerkesçesi)",
    shs: "Şapsığ",
    bzhe: "Bzeduğ",
    abz: "Abzah",
    kem: "Kemirguey",
    bes: "Besleney",
  };
  return lehceler[kod] ?? kod;
}

/**
 * Hedef dil kodlarını okunabilir Türkçe isimlere dönüştürür.
 */
export function hedefDilAdiniGetir(kod: string): string {
  const diller: Record<string, string> = {
    tr: "Türkçe",
    en: "İngilizce",
    ru: "Rusça",
    ar: "Arapça",
    ady: "Adığece",
    kbd: "Kabardeyce",
  };
  return diller[kod] ?? kod;
}

/**
 * Arama modu kodlarını arayüz etiketine dönüştürür.
 */
export function aramaModuAdiniGetir(mod: string): string {
  const modlar: Record<string, string> = {
    exact: "Birebir Eşleşme",
    prefix: "Başlangıç Eşleşmesi",
    contains: "İçeren Arama",
    fuzzy: "Esnek Arama",
  };
  return modlar[mod] ?? mod;
}

export interface BasicDictionaryMeta {
  id: string;
  displayName?: string;
  shortLabel?: string;
}

/**
 * Sözlük meta verisinden ekran etiketini üretir.
 */
export function formatDictionaryMeta(meta?: Partial<BasicDictionaryMeta>): string {
  if (!meta) return "";
  return meta.displayName ?? meta.shortLabel ?? meta.id ?? "";
}

/**
 * UI seviyesinde arama sonuçlarını filtrelemek için geçici istemci fonksiyonu.
 * TODO: Faz 2 sonunda @/lib/dictionaryUtils.ts veya Normalizer katmanına taşınacaktır.
 */
export function filterSearchResults<T extends Record<string, unknown>>(
  results: T[],
  query: string
): T[] {
  if (!query || !query.trim()) return results;
  const normalizedQuery = query.toLowerCase().trim();

  return results.filter((item) => {
    const searchableFields = [
      item.word,
      item.kelime,
      item.definition,
      item.tanim,
      item.meaning,
      item.lemma,
      item.translation,
    ];

    return searchableFields.some(
      (field) =>
        typeof field === "string" &&
        field.toLowerCase().includes(normalizedQuery)
    );
  });
}