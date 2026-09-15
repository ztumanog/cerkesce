// ============================================================================
// SPRINT B: Domain-Driven Normalization
// Single Source of Truth: DictionaryEntry
// ============================================================================

/**
 * ADR-0001: Modüler Tip Mimarisi
 * Ham veri (RawDictionaryItem) → Normalizer → DictionaryEntry (UI)
 */

// ============================================================================
// 1. RAW DATA TYPES (Loader & Normalizer katmanında yaşar)
// ============================================================================

export interface RawDictionaryItem {
  word?: string;
  madde?: string;
  lemma?: string;
  spelling?: string;
  meaning?: string;
  definition?: string;
  [key: string]: any;
}

// ============================================================================
// 2. NORMALIZED TYPES (UI'ın tek gerçek kaynağı)
// ============================================================================

export interface DictionaryMeta {
  source?: string;
  dialect?: string;
  region?: string;
  timestamp?: string;
  confidence?: number;
}

export interface TranslationEntry {
  language: string;
  text: string;
  context?: string;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  definition: string;
  partOfSpeech?: string;
  examples?: string[];
  translations?: TranslationEntry[];
  meta?: DictionaryMeta;
  synonyms?: string[];
  antonyms?: string[];
  etymology?: string;
  usage?: string;
}

// ============================================================================
// 3. LEHÇE & SÖZLÜK TİPLERİ (SINGLE SOURCE OF TRUTH)
// ============================================================================

export type LehceTipi = 
  | 'Standart'
  | 'Kuzey'
  | 'Güney'
  | 'dogu'
  | 'bati'
  | 'Mekezi'
  | 'Diğer'
  | 'Adigece';

export type SozlukTipi =
  | 'Genel'
  | 'Teknik'
  | 'Tıbbi'
  | 'Hukuki'
  | 'Eğitim'
  | 'Tarihsel';

// ============================================================================
// 4. DAILY WORD WRAPPER (ADR-0005: Adapter Pattern)
// ============================================================================

export interface KelimeMeta {
  seviye?: 'Başlangıç' | 'Orta' | 'İleri';
  kategori?: string;
  notlar?: string;
}

export interface GununKelimesi {
  id: string;
  kelime: string;
  anlam: string;
  ornek?: string;
  lehce?: LehceTipi;
  tarih?: string;
}

export interface DailyWord {
  entry: DictionaryEntry;
  tarih: string;
  meta?: KelimeMeta;
}

// ============================================================================
// 5. GROUPED WORDS TYPE
// ============================================================================

export type GruplanmisKelime = {
  harf: string;
  kelimeler: Array<{
    id: string;
    kelime: string;
    madde: string;
    anlam: string;
  }>;
};

// ============================================================================
// 6. REPOSITORY & SERVICE TYPES
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

// ============================================================================
// 7. FILTER & SEARCH TYPES
// ============================================================================

export interface DictionaryFilter {
  lehce?: LehceTipi;
  sozluk?: SozlukTipi;
  partOfSpeech?: string;
  minConfidence?: number;
}

export interface SearchResult {
  entries: DictionaryEntry[];
  total: number;
  page: number;
  pageSize: number;
}

// ============================================================================
// 8. TYPE GUARDS (Validation)
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

export function isValidRawDictionaryItem(obj: any): obj is RawDictionaryItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (typeof obj.word === 'string' ||
      typeof obj.madde === 'string' ||
      typeof obj.lemma === 'string')
  );
}

export function isValidGununKelimesi(obj: any): obj is GununKelimesi {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.kelime === 'string' &&
    typeof obj.anlam === 'string'
  );
}

export function isValidGruplanmisKelime(obj: any): obj is GruplanmisKelime {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.harf === 'string' &&
    Array.isArray(obj.kelimeler)
  );
}