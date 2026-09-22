// ============================================================
// TEMEL ANLAM / TANIM TİPLERİ
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

export interface Definition {
  id?: string;
  text?: string;
  meaning?: string;
  language?: string;
  tanim?: string;
  [key: string]: any;
}

// ============================================================
// KAYNAK TİPLERİ
// ============================================================

export interface KaynakItem {
  id?: string;
  sourceFile?: string;       // ⭐ dictionaries.json.file ile eşleşir
  file?: string;             // alternatif
  filename?: string;         // alternatif
  title?: string;
  name?: string;
  sözlük?: string;
  url?: string;
  anlam?: string;            // kaynağa özel anlam
  meaning?: string;
  definition?: string;
  yazar?: string;
  author?: string;
  yil?: string | number;
  year?: string | number;
  kaynakDil?: string;
  sourceLanguage?: string;
  hedefDil?: string;
  targetLanguage?: string;
  lehce?: string;
  dialect?: string;
  [key: string]: any;
}

// ============================================================
// DRAWER İÇERİĞİ
// ============================================================

export interface DrawerContent {
  word: string;
  cerkesce?: string;
  meanings: string[];
  dialect?: string;
  concept?: string;
  relatedTerms: string[];
  idioms: string[];
}

// ============================================================
// SÖZLÜK GİRİŞLERİ
// ============================================================

export interface TranslationEntry {
  id: string;
  lemma?: string;
  normalizedLemma?: string;
  word?: string;
  meaning?: string;
  meanings?: Meaning[];
  dialect?: string;
  groupId?: string;
  groupName?: string;
  kaynaklar?: KaynakItem[];
  cerkesce?: string;
  concept?: string;
  relatedTerms?: string[];
  idioms?: string[];
  [key: string]: any;
}

export type DictionaryEntry = TranslationEntry;

// ============================================================
// GRUPLAR
// ============================================================

export interface TranslationGroup {
  id: string;
  groaupId?: string;
  groupName?: string;
  entries?: TranslationEntry[];
  [key: string]: any;
}

export type LemmaGroup = TranslationGroup;

// ============================================================
// LEHÇE / DİYALEKT
// ============================================================

export type DialectCode = 'west' | 'east' | 'kabardian' | 'adyghe' | string;

// ============================================================
// GÜNÜN KELİMESİ
// ============================================================

export interface GununKelimesi {
  id: string;
  word?: string;
  meaning?: string;
  kelime?: any;
  anlam?: any;
  lehce?: string;
  tarih?: string;
  date?: string;
  ornekler?: string[];   // ⭐ YENİ
  meta?: {
    seviye?: string;
    kategori?: string;
    notlar?: string;
    [key: string]: any;
  };
  entry?: TranslationEntry;
  [key: string]: any;
}

// ============================================================
// KELİME META / ITEM
// ============================================================

export interface KelimeMeta {
  id?: string;
  views?: number;
  likes?: number;
  [key: string]: any;
}

export interface KelimeItem {
  id: string;
  lemma?: string;
  meaning?: string;
  word?: string;
  [key: string]: any;
}

// ============================================================
// SÖZLÜK META / AKTİF SÖZLÜK
// ============================================================

export interface DictionaryMeta {
  totalEntries?: number;
  lastUpdated?: string;
  [key: string]: any;
}

export type SozlukTipi = 'kabardian' | 'adyghe' | 'general' | string;

export interface AktifSozlukItem {
  id: string;
  name: string;
  type?: SozlukTipi;
  enabled?: boolean;
  isActive?: boolean;
  [key: string]: any;
}

// ============================================================
// ADR-P4-005: KAYNAK MERKEZLİ GÖRÜNÜM TİPLERİ
// ============================================================

export interface SourceExample {
  target: string;
  translation?: string;
}

export type SourceSectionType =
  | 'roman'      // I, II, III
  | 'arabic'     // 1., 2., 3.
  | 'example'    // ◊
  | 'related'    // / veya BÜYÜK harf
  | 'suffix'     // -
  | 'plain';     // diğer

export interface SourceSection {
  type: SourceSectionType;
  label: string;
  text: string;
  children?: SourceSection[];
}

/**
 * Kaynak merkezli görünüm için her bir sözlük kaynağını temsil eder.
 * TEK TANIM (ADR-P4-005).
 */
export interface SourceContent {
  sourceId: string;
  sourceName: string;
  title?: string;
  author?: string;
  year?: string | number;
  sourceLanguage?: string;
  targetLanguage?: string;
  dialect?: string;
  meanings: string[];
  sections?: SourceSection[];
  examples?: SourceExample[];
  notes?: string;
}

export function isSourceContent(value: unknown): value is SourceContent {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;

  return (
    typeof obj.sourceId === 'string' &&
    typeof obj.sourceName === 'string' &&
    Array.isArray(obj.meanings)
  );
}

export function isSourceContentArray(value: unknown): value is SourceContent[] {
  return Array.isArray(value) && value.every(isSourceContent);
}