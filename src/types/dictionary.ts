/**
 * File: src/types/dictionary.ts
 * Layer: Domain Model
 */

// ============================================================================
// 0. TEMEL YARDIMCI TİPLER
// ============================================================================

export interface TranslationMeaning {
  id?: string;
  language?: string;
  text: string;
  value?: string;          // ← bunu ekle
  exampleSentence?: string;
  partOfSpeech?: string;
}

export type LehceTipi = 'TUMU' | 'ADY' | 'KBD' | 'western' | 'DOGU';
export type SozlukTipi = string;
export type DialectCode = 'KBD' | 'ADG' | 'BES' | 'DOGU' | 'BATI' | 'GENEL';
export type LanguageCode = 'TR' | 'RU' | 'EN' | 'AR';

// ============================================================================
// 1. DICTIONARY ENTRY
// ============================================================================

export interface DictionaryEntry {
  id: string;
  word: string;
  definition: string;
  lemma: string;           // ← ekle
  normalizedLemma?: string; // ← ekle
  partOfSpeech?: string;
  examples?: string[];
  usage?: string;
  relatedTerms?: string[];
  usages?: string[];
  sourceWord?: string;
meanings?: TranslationMeaning[];
  dialect?: string;
  groupId?: string;
}

export interface DictionarySource {
  title: string;
  author?: string;
  publisher?: string;
  year?: number | string;
  rawDefinition?: string;
  meaning?: string;
  definition?: string;
  [key: string]: any;
}

export interface DictionaryMeta {
  file?: string;
  title?: string;
  originalTitle?: string;
  source?: string;
  dialect?: string;
  tarih?: string;
  meta?: KelimeMeta;
}

// ============================================================================
// 2. KAYNAK BİLGİSİ
// ============================================================================

export interface KaynakItem {
  title?: string;
  sözlük?: string;
  kaynak?: string;
  kaynak_sozluk?: string;
  dictionaryName?: string;
  name?: string;
  file?: string;
  author?: string;
  yazar?: string;
  year?: string;
  yil?: string;
  tanim?: string;
  anlam?: string;
  meaning?: string;
  full_definition_in_html?: string;
  total_words?: number;
  totalWords?: number;
  kelimeSayisi?: number;
  dialect?: string;
  sourceFile?: string;
  kelime?: string;
sourceLanguage?: string;
targetLanguage?: string;
}

// ============================================================================
// 3. KELİME META
// ============================================================================

export interface KelimeMeta {
  seviye?: 'Başlangıç' | 'Orta' | 'İleri';
  kategori?: string;
  notlar?: string;
  etimoloji?: string;
  ornekCumle?: string;
  ornekCumleCeviri?: string;
  kokKelime?: string;
  [key: string]: unknown;
}

// ============================================================================
// 4. DİCTİONARY İTEM (UI katmanı)
// ============================================================================

export interface DictionaryItem {
  id: string;
  kelime: string;
  madde: string;
  anlam: string;
  anlamlar?: string[];
  kaynaklar?: KaynakItem[];
  lehce?: LehceTipi;
  sozluk?: SozlukTipi;
  ilkAnlam?: string;
  kelilem?: string;
  
}

export type KelimeItem = DictionaryItem;

export interface DictionaryRawItem {
  word?: string;
  madde?: string;
  lemma: string;
  spelling?: string;
  meaning?: string;
  isActive: boolean;
  lastUpdated?: string;
  dialects?: LehceTipi[];
  dictionaryName?: string;
}

export interface GroupedDictionaryEntry {
  kelime: string;
  anlam: string;
  meaning?: string;
  tanim?: string;
  full_definition_in_html?: string;
  total_words?: number;
  totalWords?: number;
  kelimeSayisi?: number;
}

// ============================================================================
// 5. GROUPED WORDS TYPE
// ============================================================================

export interface GruplanmisKelime {
  harf: string;
  kelimeler: DictionaryItem[];
}

// ============================================================================
// 6. LEMMA ENTRY
// ============================================================================

export interface LemmaEntry {
  id: string;
  lemma: string;
  normalizedLemma?: string;
  sourceWord?: string;
  dialect?: string;
  pos?: string;
  meaning?: string;
  meanings?: (string | TranslationMeaning)[];
  notes?: string;
  groupId?: string;
  frequency?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LemmaGroup {
  id: string;
  groupName?: string;
  groupLabel?: string;
  groupId?: string;
  canonicalMeaning?: string;
  entries: LemmaEntry[];
  metadata?: Record<string, unknown>;
}

export function isValidLemmaEntry(obj: unknown): obj is LemmaEntry {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as LemmaEntry;
  return typeof o.id === 'string' && typeof o.lemma === 'string';
}

// ============================================================================
// 7. REPOSITORY & SERVICE INTERFACES
// ============================================================================

export interface DictionaryRepository {
  findById(id: string): Promise<DictionaryEntry | null>;
  findByWord(word: string): Promise<DictionaryEntry[]>;
  findAll(): Promise<DictionaryEntry[]>;
  save(entry: DictionaryEntry): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface DictionaryService {
  search(query: string): Promise<DictionaryEntry[]>;
  getDaily(): Promise<DailyWord>;
  getTranslations(word: string, language: string): Promise<TranslationEntry[]>;
}

export interface DictionaryFilter {
  lehce?: LehceTipi;
  sozluk?: SozlukTipi;
  partOfSpeech?: string;
  minConfidence?: number;
}

export interface SearchResult {
  entries?: DictionaryEntry[];
  results?: DictionaryItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

// ============================================================================
// 8. DAILY WORD & TRANSLATION
// ============================================================================

export interface DailyWord {
  entry: DictionaryEntry;
  tarih: string;
  meta?: KelimeMeta;
}

export interface GununKelimesi {
  id: string;
  kelime: string;
  anlam: string;
  lehce: string;
  tarih: string;
  meta?: KelimeMeta;
}

export interface TranslationEntry {
  id: string;
  lemma: string;
  normalizedLemma?: string;
  sourceWord?: string;
  dialect?: string;
  pos?: string;
  meaning?: string;
  meanings?: (string | TranslationMeaning)[];
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

// ============================================================================
// 9. VALIDATION
// ============================================================================

export function isValidDictionaryEntry(obj: any): obj is DictionaryEntry {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.word === 'string' &&
    typeof obj.definition === 'string'
  );
}

  

export interface KaynakDetay {
  sozlukAdi: string;
  anlam: string;
  dialect?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}
export interface AktifSozlukItem {
  id?: any;
file?: string;
  name?: any;
  title?: string;
  dialect?: string;
  isActive?: boolean;
  type?: SozlukTipi;
  itemCount?: any;
  lastUpdated?: string;
  dialects?: any[];
}