"use server";

import { TranslationEntry } from "../../src/types/dictionary";
import { MorphologyAwareMatchingService } from "../../src/services/MorphologyAwareMatchingService";

const matchingService = new MorphologyAwareMatchingService();

export async function matchDictionaryEntries(
  entry1: TranslationEntry | any,
  entry2?: TranslationEntry | any
) {
  try {
    return await matchingService.matchEntries(entry1, entry2);
  } catch (error) {
    console.error("Eşleştirme işlemi sırasında hata:", error);
    return { matchType: "NONE", score: 0 };
  }
}

export async function searchDictionary(query: string) {
  try {
    if (!query) return [];
    return [];
  } catch (error) {
    console.error("Arama hatası:", error);
    return [];
  }
}
