/**
 * @file src/domain/translation.ts
 * @description Çeviri ve sözlük alan modeli tipleri.
 */

export type DialectCode = "DOGU" | "BATI" | "STANDART" | "GENEL";

export type LanguageCode = "TR" | "RU" | "EN" | "AR";

export interface TranslationMeaning {
  id: string; // ✅ Zorunlu
  language: LanguageCode; // ✅ Zorunlu
  text: string; // ✅ Zorunlu
  exampleSentence?: string;
  partOfSpeech?: string;
  category?: string;
  value?: string;
  example?: string;
}

export interface TranslationEntry {
  id: string;
  lemma: string;
  normalizedLemma?: string;
  dialect?: DialectCode;
  groupId?: string;
  meanings: TranslationMeaning[];
  rootLemma?: string;
  frequency?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TranslationGroup {
  id: string;
  groupName: string;
  entries: TranslationEntry[];
}

export interface SearchResult {
  query: string;
  results: TranslationEntry[];
  totalCount: number;
}