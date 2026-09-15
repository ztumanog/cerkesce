import { ReactNode } from 'react';

// ============================================================================
// CORE DICTIONARY TYPES
// ============================================================================

/**
 * DictionaryEntry: UI'ın gördüğü tek sözleşme (Canonical Model)
 * Ham veri alanları (word, madde, lemma, spelling, meaning, definition) 
 * hiçbir zaman UI'a sızmamalıdır.
 */
export interface DictionaryEntry {
  readonly id: string;
  readonly kelime: string;
  readonly translation: string;
  readonly dialect?: string;
  readonly dictionaryName?: string;
  readonly file?: string;
  readonly etimoloji?: string;
  readonly kaynak?: string;
}

/**
 * RawDictionaryItem: Farklı veri kaynaklarından gelen ham veriler
 * Yalnızca Loader ve Normalizer katmanlarında yaşar.
 * UI katmanı bunu ASLA görmemelidir.
 */
export interface RawDictionaryItem {
  id?: string;
  word?: string;
  kelime?: string;
  madde?: string;
  lemma?: string;
  spelling?: string;
  translation?: string;
  tanim?: string;
  definition?: string;
  meaning?: string;
  anlam?: string;
  dialect?: string;
  targetLanguage?: string;
  hedefDil?: string;
  toLang?: string;
  hedef_dil?: string;
  dictionaryName?: string;
  kaynak_sozluk?: string;
  kaynakSozluk?: string;
  dictionaryId?: string;
  file?: string;
  etimoloji?: string;
  kaynak?: string;
}

/**
 * DictionaryItem: İç kullanım için (Repository katmanı)
 */
export interface DictionaryItem {
  id: string;
  word: string;
  translation: string;
  dialect: string;
  dictionaryName: string;
  file?: string;
  etimoloji?: string;
  kaynak?: string;
}

/**
 * DictionaryMeta: Sözlük meta bilgileri
 */
export interface DictionaryMeta {
  id: string;
  name: string;
  description?: string;
  language: string;
  targetLanguage: string;
  totalWords: number;
  lastUpdated: string;
}

/**
 * KelimeMeta: Kelime meta bilgileri
 */
export interface KelimeMeta {
  id: string;
  kelime: string;
  okunusu?: string;
  kategori?: string;
  seviye?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  ornekler?: string[];
  sinonimler?: string[];
  antonimler?: string[];
}

/**
 * DailyWord: Günün kelimesi (Wrapper pattern)
 * DailyWord ≠ DictionaryEntry
 * DailyWord, seçilmiş bir DictionaryEntry'dir.
 */
export interface DailyWord {
  entry: DictionaryEntry;
  tarih: string;
  meta?: KelimeMeta;
}

/**
 * TranslationEntry: Çeviri kaydı
 */
export interface TranslationEntry {
  id: string;
  sourceWord: string;
  targetWord: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence?: number;
  verified?: boolean;
}

// ============================================================================
// UI COMPONENT PROPS
// ============================================================================

/**
 * SearchBoxProps: Arama kutusu bileşeni
 */
export interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

/**
 * SozlukEkraniProps: Sözlük ekranı bileşeni
 */
export interface SozlukEkraniProps {
  entries: DictionaryEntry[];
  loading?: boolean;
  error?: string;
  onEntrySelect?: (entry: DictionaryEntry) => void;
  onSearch?: (query: string) => void;
}

// ============================================================================
// MANIFEST & FILE TYPES
// ============================================================================

/**
 * ManifestItem: Manifest dosyasındaki tek bir öğe
 */
export interface ManifestItem {
  id: string;
  name: string;
  path: string;
  type: 'dictionary' | 'corpus' | 'resource';
  version: string;
  lastModified: string;
  checksum?: string;
}

/**
 * ManifestData: Manifest dosyasının yapısı
 */
export interface ManifestData {
  version: string;
  created: string;
  updated: string;
  items: ManifestItem[];
  metadata?: Record<string, unknown>;
}

/**
 * RawDictionaryFile: Ham sözlük dosyası yapısı
 */
export interface RawDictionaryFile {
  id: string;
  filename: string;
  format: 'json' | 'csv' | 'xml';
  encoding: string;
  items: RawDictionaryItem[];
  metadata?: Record<string, unknown>;
}

/**
 * RawDictionaryWord: Ham kelime kaydı
 */
export interface RawDictionaryWord {
  id?: string;
  word?: string;
  kelime?: string;
  translation?: string;
  dialect?: string;
  dictionaryName?: string;
  [key: string]: unknown;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Nullable: Bir tipi nullable yapan utility type
 */
export type Nullable<T> = T | null;

/**
 * Optional: Bir tipi optional yapan utility type
 */
export type Optional<T> = T | undefined;

/**
 * Result: Başarı/Hata sonucu
 */
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };