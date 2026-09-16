/**
 * @file src/domain/translation.ts
 */

export type DialectType = 'KBD' | 'ADG' | 'BES' | 'DOGU' | 'BATI' | 'GENEL';
export type DialectCode = DialectType;
export type LanguageCode = 'TR' | 'RU' | 'EN' | 'AR';

export interface TranslationMeaning {
  id: string;
  language: LanguageCode | string;
  text: string;
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
  sourceWord?: string;
  dialect?: DialectType;
  pos?: string;
  meaning?: string;
  meanings?: TranslationMeaning[];
  notes?: string;
  groupId?: string;
  frequency?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TranslationGroup {
  id: string;
  groupId?: string;
  groupLabel?: string;
  groupName?: string;
  canonicalMeaning?: string;
  entries: TranslationEntry[];
  metadata?: Record<string, unknown>;
}

export interface TranslationRepository {
  findById(id: string): Promise<TranslationEntry | null>;
  findBySourceWord?(word: string): Promise<TranslationEntry[]>;
  search(query: string, targetLang?: string): Promise<TranslationEntry[]>;
  searchByMeaning(text: string): Promise<TranslationEntry[]>;
  findByLanguage?(language: string): Promise<TranslationEntry[]>;
  findGroupById?(groupId: string): Promise<TranslationGroup | null>;
  searchGroups?(query: string): Promise<TranslationGroup[]>;
  save(entry: TranslationEntry): Promise<void>;
  saveBatch?(entries: TranslationEntry[]): Promise<void>;
  clear?(): Promise<void>;
}

export interface SearchResult {
  query: string;
  results: TranslationEntry[];
  totalCount: number;
}
