
# Güncellenmiş loader kodu
loader_code = '''/**
 * Çerkesçe Sözlük JSON dosyalarını yükleyen ve Zod doğrulamasından geçiren modül.
 * Veri Akışı: Source → Fetch → Zod Parse/Validation → Loader Result
 */

import { z } from "zod";
import type { DictionaryMeta, DictionaryItem } from "@/types/dictionary";

// ============================================================================
// ZOD SCHEMAS & TYPES
// ============================================================================

export const DictionaryMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  file: z.string(),
  dialect: z.enum(["western", "eastern"]).optional(), // ✅ EKLE
  author: z.string().optional(),
  year: z.number().optional(),
});

export const DictionaryItemSchema = z.object({
  id: z.string().optional(),
  word: z.string().optional(),
  kelime: z.string().optional(),
  definition: z.string().optional(),
  tanim: z.string().optional(),
  meaning: z.string().optional(),
  kaynak_sozluk: z.string().optional(), // ✅ EKLE
  file: z.string().optional(), // ✅ EKLE
}).passthrough();

export interface LoaderResult {
  success: boolean;
  data: DictionaryItem[];
  count: number;
  error?: string;
}

// ============================================================================
// MANIFEST YÜKLEME
// ============================================================================

/**
 * Sözlük manifestini (dictionaries.json) yükler ve doğrular.
 */
export async function loadManifest(): Promise<DictionaryMeta[]> {
  try {
    console.log("[Loader] Manifest yükleniyor: /data/dictionaries.json");
    
    const response = await fetch("/data/dictionaries.json", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Manifest yüklenemedi.`);
    }

    const rawData: unknown = await response.json();
    const parsedData = z.array(DictionaryMetaSchema).safeParse(rawData);

    if (!parsedData.success) {
      console.error("[Loader] Manifest veri doğrulama hatası:", parsedData.error.format());
      return [];
    }

    console.log(`[Loader] ✅ Manifest yüklendi: ${parsedData.data.length} sözlük`);
    return parsedData.data as DictionaryMeta[];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
    console.error("[Loader] ❌ Manifest yükleme hatası:", message);
    return [];
  }
}

// ============================================================================
// TEKİL SÖZLÜK YÜKLEME
// ============================================================================

/**
 * Belirtilen JSON dosyasını yükler, tip doğrulamasını gerçekleştirir.
 */
export async function loadDictionary(filename: string): Promise<LoaderResult> {
  try {
    console.log(`[Loader] Sözlük yükleniyor: ${filename}`);
    
    const response = await fetch(`/data/${filename}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${filename} dosyası yüklenemedi.`);
    }

    const rawData: unknown = await response.json();

    if (!Array.isArray(rawData)) {
      throw new Error(`Geçersiz Veri Biçimi: ${filename} dizisi (array) bekleniyordu.`);
    }

    const parsedData = z.array(DictionaryItemSchema).safeParse(rawData);

    if (!parsedData.success) {
      console.warn(`[Loader] ${filename} içerisinde tip uyuşmazlığı taptandı, ham veri fallback'e alındı.`);
    }

    const validData = (parsedData.success ? parsedData.data : rawData) as DictionaryItem[];

    console.log(`[Loader] ✅ ${filename} yüklendi: ${validData.length} kayıt`);
    
    return {
      success: true,
      data: validData,
      count: validData.length,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Loader] ❌ ${filename} yükleme hatası:`, message);

    return {
      success: false,
      data: [],
      count: 0,
      error: message,
    };
  }
}

// ============================================================================
// BATCH YÜKLEME (Paralel İşleme)
// ============================================================================

/**
 * Birden fazla sözlüğü paralel olarak (batchSize adediyle) yükler.
 */
export async function loadDictionariesBatch(
  filenames: string[],
  batchSize: number = 4
): Promise<Map<string, DictionaryItem[]>> {
  const results = new Map<string, DictionaryItem[]>();

  for (let i = 0; i < filenames.length; i += batchSize) {
    const batch = filenames.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map(async (filename) => {
        const result = await loadDictionary(filename);
        return { filename, result };
      })
    );

    for (const { filename, result } of batchResults) {
      if (result.success) {
        results.set(filename, result.data);
      }
    }
  }

  return results;
}

// ============================================================================
// TÜM SÖZLÜKLERİ YÜKLEME
// ============================================================================

/**
 * Tüm sözlükleri yükler (İlk 3 dosya öncelikli paralel, kalanlar gruplanmış batch).
 */
export async function loadAllDictionaries(
  manifest: DictionaryMeta[]
): Promise<Map<string, DictionaryItem[]>> {
  console.log(`[Loader] Tüm sözlükler yükleniyor: ${manifest.length} dosya`);
  
  const filenames = manifest.map((item) => item.file);
  const allData = new Map<string, DictionaryItem[]>();

  const firstThree = filenames.slice(0, 3);
  const remaining = filenames.slice(3);

  const firstResults = await loadDictionariesBatch(firstThree, 3);
  firstResults.forEach((data, file) => allData.set(file, data));

  if (remaining.length > 0) {
    const remainingResults = await loadDictionariesBatch(remaining, 4);
    remainingResults.forEach((data, file) => allData.set(file, data));
  }

  console.log(`[Loader] ✅ Tüm sözlükler yüklendi: ${allData.size} dosya`);
  
  return allData;
}
'''

print("=" * 80)
print("GÜNCELLENMIŞ LOADER KODU")
print("=" * 80)
print(loader_code[:500] + "...")
print("\n✅ Değişiklikler:")
print("  1. DictionaryMetaSchema → dialect alanı eklendi")
print("  2. DictionaryItemSchema → kaynak_sozluk ve file eklendi")
print("  3. Console.log'lar eklendi (debug için)")
