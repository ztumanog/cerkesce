/**
 * @file src/domain/translation.ts
 * @description Ã‡eviri ve sÃ¶zlÃ¼k alan modeli tipleri.
 */

export type DialectCode = "DOGU" | "BATI" | "STANDART" | "GENEL";

export type LanguageCode = "TR" | "RU" | "EN" | "AR";

export interface TranslationMeaning {
  id: string; // âœ… Zorunlu
  language: LanguageCode; // âœ… Zorunlu
  text: string; // âœ… Zorunlu
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
