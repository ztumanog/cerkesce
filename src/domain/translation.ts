// SSOT: types/dictionary.ts â€” tÃ¼m tipler oradan gelir


export type DialectType = import('../types/dictionary').DialectCode;

// domain/translation.ts içindeki TranslationEntry'ye word ve definition ekle
export interface TranslationEntry {
  id: string;
  lemma: string;
  word?: string;        // ← ekle
  definition?: string;  // ← ekle
  normalizedLemma?: string;
  sourceWord?: string;
  dialect?: string;
  pos?: string;
  meaning?: string;
  meanings?: import('../types/dictionary').TranslationMeaning[];
  notes?: string;
  groupId?: string;
  frequency?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SearchResult {
  query: string;
  results: import('../types/dictionary').TranslationEntry[];
  totalCount: number;
}
export interface TranslationRepository {
  findById(id: string): Promise<TranslationEntry | null>;
  search(query: string, targetLang?: string): Promise<TranslationEntry[]>;
  searchByMeaning?(text: string, lang?: string): Promise<TranslationEntry[]>;
  save(entry: TranslationEntry): Promise<void | TranslationEntry>;
  saveBatch?(entries: TranslationEntry[]): Promise<void>;
  clear?(): Promise<void> | void;
}


export type { TranslationMeaning, TranslationGroup, LemmaGroup } from '../types/dictionary';
