/**
 * @file src/lib/dictionaryLoader.ts
 * @description Optimize edilmiş, batch (toplu) ve güvenli sözlük JSON yükleyici modülü.
 */

import type { DictionaryItem, DictionaryMeta } from "@/types/dictionary";

/**
 * Yükleme işlemlerinin standart dönüş tipini belirten arabirim.
 */
export interface DictionaryLoadResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Tek bir JSON dosyasını güvenli şekilde HTTP isteği ile yükler.
 * @param jsonPath Yüklenecek JSON dosyasının bağıl veya tam yolu.
 */
export async function loadDictionaryJson<T = unknown>(
  jsonPath: string
): Promise<DictionaryLoadResult<T>> {
  try {
    // 1. Path sanitize/doğrulama kontrolü
    if (!jsonPath || typeof jsonPath !== "string") {
      return {
        success: false,
        error: "Geçersiz dosya yolu",
      };
    }

    console.log(`[Loader] 📥 Yükleniyor: ${jsonPath}`);

    // 2. Fetch isteği ve 10 saniyelik zaman aşımı (Timeout) kontrolü
    const response = await fetch(jsonPath, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const rawText = await response.text();
    const trimmedText = rawText.trim();

    // 3. JSON formatı ön kontrolü
    if (!trimmedText.startsWith("{") && !trimmedText.startsWith("[")) {
      console.error(
        `[Loader] ❌ ${jsonPath} - Geçersiz JSON formatı! İlk 100 karakter:`,
        trimmedText.substring(0, 100)
      );
      return {
        success: false,
        error: `Geçerli JSON değil. İlk 100 karakter: "${trimmedText.substring(0, 100)}"`,
      };
    }

    const parsedData = JSON.parse(trimmedText) as T;
    console.log(`[Loader] ✅ ${jsonPath} başarıyla yüklendi`);

    return {
      success: true,
      data: parsedData,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error(`[Loader] ❌ ${jsonPath}:`, errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Dosya listesini grup (batch) halinde ve kısa gecikmelerle yükler.
 * Ağ kilitlenmelerini önlemek için throttling uygular.
 * 
 * @param filePaths Yüklenecek dosya yolları dizisi
 * @param batchSize Aynı anda paralel yüklenecek dosya sayısı (Varsayılan: 5)
 */
export async function loadDictionariesBatch<T = unknown>(
  filePaths: string[],
  batchSize: number = 5
): Promise<DictionaryLoadResult<T>[]> {
  const results: DictionaryLoadResult<T>[] = [];

  console.log(
    `[Loader] 🔄 Batch yükleme başladı: Toplam ${filePaths.length} dosya, ${batchSize}'erli gruplar.`
  );

  for (let i = 0; i < filePaths.length; i += batchSize) {
    const batch = filePaths.slice(i, i + batchSize);
    console.log(
      `[Loader] 📦 Grup ${Math.floor(i / batchSize) + 1}/${Math.ceil(filePaths.length / batchSize)} işleniyor...`
    );

    // Aynı gruptaki dosyaları paralel olarak yükle
    const batchResults = await Promise.allSettled(
      batch.map((path) => loadDictionaryJson<T>(path))
    );

    // Sonuçları derle
    batchResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        console.error(
          `[Loader] ❌ ${batch[index]} - İstek reddedildi:`,
          result.reason
        );
        results.push({
          success: false,
          error: `Promise rejected: ${result.reason}`,
        });
      }
    });

    // Sunucuyu yormamak için gruplar arasına 100ms gecikme koy
    if (i + batchSize < filePaths.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  const successCount = results.filter((r) => r.success).length;
  console.log(
    `[Loader] ✅ Tüm gruplar yüklendi: ${successCount}/${filePaths.length} başarılı`
  );

  return results;
}

/**
 * Sözlük manifest dosyasını (`/data/dictionaries.json`) yükler ve doğrudan liste döndürür.
 */
export async function loadManifest(): Promise<DictionaryMeta[]> {
  const result = await loadDictionaryJson<DictionaryMeta[]>("/data/dictionaries.json");
  if (result.success && Array.isArray(result.data)) {
    return result.data;
  }
  return [];
}

/**
 * Manifest içindeki tüm aktif sözlük verilerini yükler ve bir Map yapısında döndürür.
 * 
 * @param manifest Aktif sözlüklerin meta veri dizisi
 */
export async function loadAllDictionaries(
  manifest: DictionaryMeta[]
): Promise<Map<string, DictionaryItem[]>> {
  const dictionaryMap = new Map<string, DictionaryItem[]>();

  // Sadece aktif ve geçerli dosya yolu olan sözlüklerin yollarını al
  const filePaths = manifest
    .filter((m) => m.active !== false && m.file)
    .map((m) => (m.file.startsWith("/") ? m.file : `/data/${m.file}`));

  const batchResults = await loadDictionariesBatch<DictionaryItem[]>(filePaths, 5);

  batchResults.forEach((res, index) => {
    if (res.success && res.data) {
      const path = filePaths[index];
      dictionaryMap.set(path, res.data);
    }
  });

  return dictionaryMap;
}