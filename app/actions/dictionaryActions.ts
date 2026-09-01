/**
 * @file app/actions/dictionaryActions.ts
 * @description Server-side çeviri arama eylemleri
 * 
 * Bu dosya Next.js "use server" direktifi ile sunucu tarafında çalışır.
 * TranslationService'i başlatır ve çeviri işlemlerini expose eder.
 * 
 * NOT: "use server" dosyasında SADECE async fonksiyonlar olabilir!
 */

"use server";

import { TranslationService } from "@/services/TranslationService";
import { MorphologyAwareMatchingService } from "@/services/MorphologyAwareMatchingService";
import { MockTranslationRepository } from "@/repository/MockTranslationRepository";
import {
  TranslationResult,
  SearchResult,
  ReverseLookupResult,
} from "@/services/TranslationService";
import { TranslationEntry, TranslationGroup } from "@/domain/translation";

/**
 * Servisleri başlat (singleton pattern)
 */
let translationService: TranslationService | null = null;

function getTranslationService(): TranslationService {
  if (!translationService) {
    // Repository'yi başlat
    const repository = new MockTranslationRepository();

    // MorphologyAwareMatchingService'i başlat
    const matchingService = new MorphologyAwareMatchingService();

    // TranslationService'i başlat (2 argüman: repository + matchingService)
    translationService = new TranslationService(repository, matchingService);
  }
  return translationService;
}

/**
 * Yardımcı Fonksiyon: SearchResult veya dizi gelen yapıdan güvenli bir şekilde TranslationEntry[] ayıklar
 */
function extractEntries(result: any): TranslationEntry[] {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  return result.entries || result.results || result.items || [];
}

/**
 * Yardımcı Fonksiyon: TranslationEntry[] dizisini SearchResult'a dönüştürür
 */
function toSearchResult(entries: TranslationEntry[], query: string = ""): SearchResult {
  return {
    entries: entries,
    total: entries.length,
  };
}

/**
 * ===== TEMEL ARAMA FONKSİYONLARI =====
 */

/**
 * Lemma ile çeviri arar
 * 
 * @param lemma Aranacak kelime (örn: "шъхьэ")
 * @returns TranslationEntry veya null
 */
export async function searchByLemma(
  lemma: string
): Promise<TranslationEntry | null> {
  try {
    const service = getTranslationService();
    return await service.getById(lemma);
  } catch (error) {
    console.error("searchByLemma hatası:", error);
    return null;
  }
}

/**
 * Sorgu ile çevirileri arar
 * 
 * @param query Arama sorgusu (örn: "пс")
 * @returns TranslationEntry dizisi
 */
export async function searchTranslations(
  query: string
): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    const result = await service.search(query);
    return extractEntries(result);
  } catch (error) {
    console.error("searchTranslations hatası:", error);
    return [];
  }
}

/**
 * Anlam ile ters arama yapar
 * 
 * @param meaning Aranacak anlam (örn: "baş")
 * @returns TranslationEntry dizisi
 */
export async function reverseLookupByMeaning(
  meaning: string
): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    const results: ReverseLookupResult[] = await service.reverseLookup(meaning);
    return results.map((r) => r.entry);
  } catch (error) {
    console.error("reverseLookupByMeaning hatası:", error);
    return [];
  }
}

/**
 * Morfolojik çeviri yapar
 * 
 * @param query Çevirilecek kelime
 * @param fromDialect Kaynak lehçe (Varsayılan: "DOGU")
 * @param toDialect Hedef lehçe (Varsayılan: "BATI")
 * @returns TranslationResult[] - Çeviri sonuçları dizisi
 */
export async function translateWithMorphology(
  query: string,
  fromDialect: string = "DOGU",
  toDialect: string = "BATI"
): Promise<TranslationResult[]> {
  try {
    const service = getTranslationService();
    return await service.translate(query, fromDialect, toDialect);
  } catch (error) {
    console.error("translateWithMorphology hatası:", error);
    return [];
  }
}

/**
 * ===== GRUP İŞLEMLERİ =====
 */

/**
 * Grup ID'si ile çevirileri arar
 * 
 * @param groupId Grup tanımlayıcı (örn: "g-head", "g-water")
 * @returns TranslationGroup veya null
 */
export async function searchByGroup(
  groupId: string
): Promise<TranslationGroup | null> {
  try {
    const service = getTranslationService();
    return await service.getByGroup(groupId);
  } catch (error) {
    console.error("searchByGroup hatası:", error);
    return null;
  }
}

/**
 * ===== GELİŞMİŞ ARAMA FONKSİYONLARI =====
 */

/**
 * Çapraz sözlük araması (lemma ve meanings'de)
 * 
 * @param query Arama sorgusu
 * @returns TranslationEntry dizisi
 */
export async function searchCrossDictionary(
  query: string
): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return await service.searchCrossDictionary(query);
  } catch (error) {
    console.error("searchCrossDictionary hatası:", error);
    return [];
  }
}

/**
 * Benzer terimleri bulur
 * 
 * @param lemma Referans kelime
 * @param limit Sonuç sınırı (Varsayılan: 5)
 * @returns TranslationEntry dizisi
 */
export async function findSimilarTerms(
  lemma: string,
  limit: number = 5
): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    const results = await service.findSimilarTerms(lemma);
    return results.slice(0, limit);
  } catch (error) {
    console.error("findSimilarTerms hatası:", error);
    return [];
  }
}

/**
 * Lehçe varyasyonlarını döndürür
 * 
 * @param lemma Referans kelime
 * @param fromDialect Kaynak lehçe (Varsayılan: "DOGU")
 * @returns TranslationEntry[] - Lehçe varyasyonları
 */
export async function getDialectVariations(
  lemma: string,
  fromDialect: string = "DOGU"
): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return await service.getDialectVariations(lemma, fromDialect);
  } catch (error) {
    console.error("getDialectVariations hatası:", error);
    return [];
  }
}

/**
 * ===== FİLTRELEME FONKSİYONLARI (ASYNC) =====
 */

/**
 * Dile göre girdileri filtreler
 */
export async function filterByLanguageAsync(
  entries: TranslationEntry[],
  language: string
): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return service.filterByLanguage(entries, language);
  } catch (error) {
    console.error("filterByLanguageAsync hatası:", error);
    return entries;
  }
}

/**
 * Lehçeye göre girdileri filtreler
 */
export async function filterByDialectAsync(
  entries: TranslationEntry[],
  dialect: string
): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return service.filterByDialect(entries, dialect);
  } catch (error) {
    console.error("filterByDialectAsync hatası:", error);
    return entries;
  }
}

/**
 * ===== CACHE YÖNETİMİ =====
 */

/**
 * Cache'i temizler
 */
export async function clearCache(): Promise<void> {
  try {
    const service = getTranslationService();
    service.clearCache();
  } catch (error) {
    console.error("clearCache hatası:", error);
  }
}

/**
 * Cache istatistiklerini döndürür
 */
export async function getCacheStats(): Promise<{
  size: number;
  entries: string[];
}> {
  try {
    const service = getTranslationService();
    return service.getCacheStats();
  } catch (error) {
    console.error("getCacheStats hatası:", error);
    return { size: 0, entries: [] };
  }
}

/**
 * ===== TOPLU İŞLEMLER =====
 */

/**
 * Birden fazla sorguyu paralel olarak arar
 */
export async function searchMultiple(
  queries: string[]
): Promise<SearchResult[]> {
  try {
    const service = getTranslationService();
    const promises = queries.map((q) => service.search(q));
    const results = await Promise.all(promises);
    
    return results.map((entries: TranslationEntry[], index: number) => {
      return toSearchResult(entries, queries[index]);
    });
  } catch (error) {
    console.error("searchMultiple hatası:", error);
    return [];
  }
}

/**
 * Tüm çevirileri döndürür
 */
export async function getAllTranslations(): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return await service.getAllEntries();
  } catch (error) {
    console.error("getAllTranslations hatası:", error);
    return [];
  }
}

/**
 * Tüm grupları döndürür
 */
export async function getAllGroups(): Promise<TranslationGroup[]> {
  try {
    const service = getTranslationService();
    return await service.getAllGroups();
  } catch (error) {
    console.error("getAllGroups hatası:", error);
    return [];
  }
}