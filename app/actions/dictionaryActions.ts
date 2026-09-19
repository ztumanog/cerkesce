/**
 * File: app/actions/dictionaryActions.ts
 * Generated: 2026-09-19
 * Layer: Service
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
import { TranslationEntry, TranslationGroup } from "@/types/dictionary";

let translationService: TranslationService | null = null;

function getTranslationService(): TranslationService {
  if (!translationService) {
    const repository = new MockTranslationRepository();
    const matchingService = new MorphologyAwareMatchingService();
    translationService = new TranslationService(repository, matchingService);
  }
  return translationService;
}

// Type Guard ve Helper Fonksiyonlar (Export EDİLMEMELİ)
interface SearchResultEnvelope {
  entries?: TranslationEntry[];
  results?: TranslationEntry[];
  items?: TranslationEntry[];
}

function isSearchResultEnvelope(value: unknown): value is SearchResultEnvelope {
  return typeof value === "object" && value !== null;
}

function extractEntries(result: unknown): TranslationEntry[] {
  if (Array.isArray(result)) return result as TranslationEntry[];
  if (!isSearchResultEnvelope(result)) return [];
  return result.entries || result.results || result.items || [];
}

function toSearchResult(entries: TranslationEntry[], query: string = ""): SearchResult {
  return {
    entries: entries,
    total: entries.length,
  };
}

/* ===== Server Action Fonksiyonları (Sadece Async) ===== */

export async function searchByLemma(lemma: string): Promise<TranslationEntry | null> {
  try {
    const service = getTranslationService();
    return await service.getById(lemma);
  } catch (error) {
    console.error("searchByLemma hatası:", error);
    return null;
  }
}

export async function searchTranslations(query: string): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    const result = await service.search(query);
    return extractEntries(result);
  } catch (error) {
    console.error("searchTranslations hatası:", error);
    return [];
  }
}

export async function reverseLookupByMeaning(meaning: string): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    const results: ReverseLookupResult[] = await service.reverseLookup(meaning);
    return results.map((r) => r.entry);
  } catch (error) {
    console.error("reverseLookupByMeaning hatası:", error);
    return [];
  }
}

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

export async function searchByGroup(groupId: string): Promise<TranslationGroup | null> {
  try {
    const service = getTranslationService();
    return await service.getByGroup(groupId);
  } catch (error) {
    console.error("searchByGroup hatası:", error);
    return null;
  }
}

export async function searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return await service.searchCrossDictionary(query);
  } catch (error) {
    console.error("searchCrossDictionary hatası:", error);
    return [];
  }
}

export async function findSimilarTerms(lemma: string, limit: number = 5): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    const results = await service.findSimilarTerms(lemma);
    return results.slice(0, limit);
  } catch (error) {
    console.error("findSimilarTerms hatası:", error);
    return [];
  }
}

export async function getDialectVariations(lemma: string, fromDialect: string = "DOGU"): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return await service.getDialectVariations(lemma, fromDialect);
  } catch (error) {
    console.error("getDialectVariations hatası:", error);
    return [];
  }
}

export async function filterByLanguageAsync(entries: TranslationEntry[], language: string): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return service.filterByLanguage(entries, language);
  } catch (error) {
    console.error("filterByLanguageAsync hatası:", error);
    return entries;
  }
}

export async function filterByDialectAsync(entries: TranslationEntry[], dialect: string): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return service.filterByDialect(entries, dialect);
  } catch (error) {
    console.error("filterByDialectAsync hatası:", error);
    return entries;
  }
}

export async function clearCache(): Promise<void> {
  try {
    const service = getTranslationService();
    service.clearCache();
  } catch (error) {
    console.error("clearCache hatası:", error);
  }
}

export async function getCacheStats(): Promise<{ size: number; entries: string[] }> {
  try {
    const service = getTranslationService();
    return service.getCacheStats();
  } catch (error) {
    console.error("getCacheStats hatası:", error);
    return { size: 0, entries: [] };
  }
}

export async function searchMultiple(queries: string[]): Promise<SearchResult[]> {
  try {
    const service = getTranslationService();
    const promises = queries.map((q) => service.search(q));
    const results = await Promise.all(promises);
    return results.map((entries: TranslationEntry[], index: number) => toSearchResult(entries, queries[index]));
  } catch (error) {
    console.error("searchMultiple hatası:", error);
    return [];
  }
}

export async function getAllTranslations(): Promise<TranslationEntry[]> {
  try {
    const service = getTranslationService();
    return await service.getAllEntries();
  } catch (error) {
    console.error("getAllTranslations hatası:", error);
    return [];
  }
}

export async function getAllGroups(): Promise<TranslationGroup[]> {
  try {
    const service = getTranslationService();
    return await service.getAllGroups();
  } catch (error) {
    console.error("getAllGroups hatası:", error);
    return [];
  }
}