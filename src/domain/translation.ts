/**
 * ADR-0004 ve ADR-0005 doğrultusunda tanımlanmış temel çeviri veri tipleri.
 */

export interface TranslationMeaning {
  meaningId: string;
  targetLanguage: string;
  value: string;
  contextNote?: string;
}

export interface TranslationEntry {
  /**
   * Deterministik Kimlik
   * Format: <sourceId>:<sourceEntryId> veya <sourceId>:<lemma>:<index>
   */
  entryId: string;
  sourceLanguage: string;
  lemma: string;
  meanings: TranslationMeaning[];
}

export interface TranslationGroup {
  groupId: string;
  sourceLanguage: string;
  entries: TranslationEntry[];
}