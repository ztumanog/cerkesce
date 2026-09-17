/**
 * File: src/types/dictionary.ts
 * Generated: 2026-09-16
 * Layer: Domain Model (SSOT)
 */

export interface RelatedTerm {
  text: string;
  targetWord?: string;
  source?: string;
}

export interface DictionarySource {
  title: string;
  author?: string;
  publisher?: string;
  year?: number | string;
  rawDefinition?: string;
}

export interface RawDictionaryItem {
  word?: string;
  madde?: string;
  lemma?: string;
  spelling?: string;
  meaning?: string;
  definition?: string;
  [key: string]: unknown;
}

export interface DictionaryMeta {
  file?: string;
  title?: string;
  originalTitle?: string;
  source?: string;
  dialect?: string;
  region?: string;
  timestamp?: string;
  confidence?: number;
  author?: string;
  editor?: string;
  publisher?: string;
  year?: number | string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface TranslationEntry {
  language: string;
  text: string;
  context?: string;
}

// Lehçe ve Sözlük Türleri
export type LehceTipi =
  | 'Standart'
  | 'Kuzey'
  | 'Güney'
  | 'KBD'
  | 'bati'
  | 'Mekezi'
  | 'Diğer'
  | 'Adigece'
  | 'ady'
  | 'Kabardeyce'
  | string;

export type SozlukTipi =
  | 'Çerkesçe-Türkçe'
  | 'Türkçe-Çerkesçe'
  | 'Çerkesçe-Rusça'
  | 'Rusça-Çerkesçe'
  | 'Çerkesçe-İngilizce'
  | 'İngilizce-Çerkesçe'
  | string;

/**
 * Aktif Sözlük Kaynak Modeli
 * TS2322 hatası için eksik alanlar eklendi ve `code` opsiyonel yapıldı.
 */
export interface AktifSozlukItem {
  id: string;
  code?: string;
  name: string;
  description?: string;
  entryCount?: number;
  isActive: boolean;
  priority?: number;
  type?: SozlukTipi | string;
  itemCount?: number;
  lastUpdated?: string;
  dialects?: LehceTipi[] | string[];
}

/**
 * 🎯 CANONICAL MODEL - Kanonik Sözlük Girişi (SSOT)
 */
export interface DictionaryEntry {
  id: string;
  word: string;
  meaning: string;
  definition?: string;
  meanings?: string[];
  definitions?: string[];
  partOfSpeech?: string;
  examples?: string[];
  translations?: TranslationEntry[];
  relatedTerms?: Array<string | RelatedTerm>;
  synonyms?: string[];
  antonyms?: string[];
  usages?: string[];
  idioms?: string[];
  sources?: DictionarySource[];
  meta?: DictionaryMeta;
  etymology?: string;
  usage?: string;
}

// Backward-compatible API export. The implementation lives in the server-side
// loader module; this keeps existing `@/lib/dictionaryLoader` imports working.
export { loadDictionaryData } from '../loader/DictionaryLoader';