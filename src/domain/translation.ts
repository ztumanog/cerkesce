// src/domain/translation.ts

// ============================================================
// ANLAM
// ============================================================

export interface Meaning {
  id?: string;
  language?: string;
  lang?: string;
  text?: string;
  value?: string;
  meaning?: string;
  [key: string]: any;
}

export type TranslationMeaning = Meaning;

// ============================================================
// KAYNAK
// ============================================================

export interface KaynakItem {
  id?: string;
  title?: string;
  name?: string;
  url?: string;
  [key: string]: any;
}

// ============================================================
// TRANSLATION ENTRY (KANONİK)
// ============================================================

export interface TranslationEntry {
  id: string;
  lemma: string;                 // ⚠️ ZORUNLU — test bunu bekliyor
  normalizedLemma?: string;
  word?: string;
  meaning?: string;
  meanings: Meaning[];
  dialect?: string;
  groupId?: string;
  groupName?: string;
  kaynaklar?: KaynakItem[];

  // Drawer ve ek görünümler için:
  cerkesce?: string;
  concept?: string;
  relatedTerms?: string[];
  idioms?: string[];

  [key: string]: any;
}

export type DictionaryEntry = TranslationEntry;

// ============================================================
// TRANSLATION GROUP
// ============================================================

export interface TranslationGroup {
  id: string;
  groaupId?: string;
  groupName?: string;
  entries: TranslationEntry[];
  [key: string]: any;
}

export type LemmaGroup = TranslationGroup;

// ============================================================
// REPOSITORY ARAYÜZÜ
// ============================================================

export interface SearchOptions {
  useDefaults?: boolean;
}

export interface TranslationRepository {
  search(query: string, options?: SearchOptions): TranslationGroup[];
  getById(id: string): TranslationEntry | undefined;
  getAll(): TranslationEntry[];
}