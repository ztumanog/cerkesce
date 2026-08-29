// @/utils/utils.tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================================
// CLASS NAME UTILITY (cn - classnames helper)
// ============================================================================

/**
 * Tailwind CSS class adlarını birleştirmek için utility fonksiyonu
 * clsx ve tailwind-merge kullanarak çakışan sınıfları çözer
 * @param inputs - Birleştirilecek class adları
 * @returns Birleştirilmiş ve optimize edilmiş class string'i
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ============================================================================
// DICTIONARY UTILITIES
// ============================================================================

/**
 * Sözlük verilerini normalleştirmek için yardımcı fonksiyon
 */
export function normalizeDictionaryData(data: unknown): Record<string, unknown> {
  if (typeof data === "object" && data !== null) {
    return data as Record<string, unknown>;
  }
  return {};
}

/**
 * Sözlük meta verilerini formatlamak
 */
export function formatDictionaryMeta(meta: {
  id?: string;
  name?: string;
  totalWords?: number;
  label?: string;
}): { id: string; name: string; totalWords: number; label?: string } {
  return {
    id: meta.id ?? "unknown",
    name: meta.name ?? "Unnamed Dictionary",
    totalWords: meta.totalWords ?? 0,
    label: meta.label,
  };
}

/**
 * Arama sonuçlarını filtrelemek
 */
export function filterSearchResults(
  results: unknown[],
  query: string
): unknown[] {
  if (!Array.isArray(results)) return [];
  if (!query || query.trim().length === 0) return results;

  const lowerQuery = query.toLowerCase();
  return results.filter((item) => {
    if (typeof item === "object" && item !== null) {
      const obj = item as Record<string, unknown>;
      const word = String(obj.word ?? obj.kelime ?? "").toLowerCase();
      const definition = String(
        obj.definition ?? obj.tanim ?? obj.meaning ?? ""
      ).toLowerCase();
      return word.includes(lowerQuery) || definition.includes(lowerQuery);
    }
    return false;
  });
}

/**
// ✅ YENI - Çerkesçe lehçeleri
export function lehceAdiniGetir(kod: string): string {
  const lehceler: Record<string, string> = {
    western: "Batı Adığece",
    eastern: "Doğu Kabardeyce",
  };
  return lehceler[kod] ?? kod;
}

// ✅ YENI - Hedef diller
export function hedefDilAdiniGetir(kod: string): string {
  const diller: Record<string, string> = {
    turkish: "Türkçe",
    russian: "Rusça",
    english: "İngilizce",
  };
  return diller[kod] ?? kod;
}
  return lehceler[kod] ?? kod;
}

/**
 * Arama modunu Türkçe adına çevir
 */
export function aramaModuAdiniGetir(mod: string): string {
  const modlar: Record<string, string> = {
    exact: "Tam Eşleşme",
    prefix: "Başlangıç",
    contains: "İçeriyor",
    fuzzy: "Bulanık Arama",
  };
  return modlar[mod] ?? mod;
}

/**
 * Tarih formatı: DD.MM.YYYY
 */
export function formatTarih(tarih: Date | string): string {
  const date = typeof tarih === "string" ? new Date(tarih) : tarih;
  if (isNaN(date.getTime())) return "";

  const gun = String(date.getDate()).padStart(2, "0");
  const ay = String(date.getMonth() + 1).padStart(2, "0");
  const yil = date.getFullYear();

  return `${gun}.${ay}.${yil}`;
}

/**
 * Sayıyı Türkçe formatında göster (1.000.000)
 */
export function formatSayi(sayi: number): string {
  return new Intl.NumberFormat("tr-TR").format(sayi);
}

/**
 * Hata mesajını güvenli şekilde al
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Bilinmeyen bir hata oluştu";
}