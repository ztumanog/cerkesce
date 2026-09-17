/**
 * File: src/types/dictionary.ts
 * Generated: 2026-09-16
 * Layer: Domain Model (SSOT)
 */

/**
 * İlgili Kelime
 */
export interface RelatedTerm {
  text: string;
  targetWord?: string;
  source?: string;
}

/**
 * Sözlük Kaynağı
 */
export interface DictionarySource {
  title: string;
  author?: string;
  publisher?: string;
  year?: number | string;
  rawDefinition?: string;
}

/**
 * Raw Sözlük Öğesi (Dış Kaynaktan)
 */
export interface RawDictionaryItem {
  word?: string;
  madde?: string;
  lemma?: string;
  spelling?: string;
  meaning?: string;
  definition?: string;
  [key: string]: unknown;
}

/**
 * Sözlük Meta Verisi
 */
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

/**
 * Çeviri Öğesi
 */
export interface TranslationEntry {
  language: string;
  text: string;
  context?: string;
}

/**
 * Aktif Sözlük Öğesi (Kaynak Tanımları)
 */
export interface AktifSozlukItem {
  id: string;
  code?: string;
  name: string;
  description?: string;
  entryCount?: number;
  isActive: boolean;
  priority?: number;
  type?: string;
  itemCount?: number;
  lastUpdated?: string;
  dialects?: string[];
}

/**
 * 🎯 CANONICAL MODEL - Kanonik Sözlük Girişi (SSOT)
 * 
 * Tüm sözlük kaynaklarından normalize edilen birleşik veri modeli.
 * Hem UI ihtiyaçlarını (meaning, meanings vb.) hem de Canonical detayları kapsar.
 */
export interface DictionaryEntry {
  // ============================================================
  // TEMEL BİLGİLER
  // ============================================================

  /** Benzersiz ID */
  id: string;

  /** Kelime/Madde başlığı */
  word: string;

  // ============================================================
  // TANIMLAR & ANLAMLAR
  // ============================================================

  /** Birincil tanım */
  meaning: string;

  /** Alternatif tanım alanı */
  definition?: string;

  /** Anlam listesi */
  meanings?: string[];

  /** Tanım listesi */
  definitions?: string[];

  /** Sözcük türü (noun, verb, adjective, etc.) */
  partOfSpeech?: string;

  /** Kullanım örnekleri */
  examples?: string[];

  /** Çeviriler (dil bazında) */
  translations?: TranslationEntry[];

  // ============================================================
  // İLİŞKİLER & KULLANIM
  // ============================================================

  /** İlgili kelimeler */
  relatedTerms?: Array<string | RelatedTerm>;

  /** Eş anlamlılar */
  synonyms?: string[];

  /** Zıt anlamlılar */
  antonyms?: string[];

  /** Kullanım şekilleri */
  usages?: string[];

  /** Deyimler */
  idioms?: string[];

  // ============================================================
  // KAYNAK & META
  // ============================================================

  /** Kaynaklar */
  sources?: DictionarySource[];

  /** Meta veriler */
  meta?: DictionaryMeta;

  // ============================================================
  // OPSİYONEL ALANLAR
  // ============================================================

  /** Etimoloji */
  etymology?: string;

  /** Kullanım notu */
  usage?: string;
}

// ============================================================
// LEHÇE TİPLERİ
// ============================================================

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

// ============================================================
// SÖZLÜK TİPLERİ
// ============================================================

export type SozlukTipi =
  | 'Çerkesçe-Türkçe'
  | 'Türkçe-Çerkesçe'
  | 'Çerkesçe-Rusça'
  | 'Rusça-Çerkesçe'
  | 'Çerkesçe-İngilizce'
  | 'İngilizce-Çerkesçe'
  | string;

// Re-export the domain rule from the barrel-compatible module path used by
// repositories and services.
export { DialectRule } from './dialect/DialectRule';