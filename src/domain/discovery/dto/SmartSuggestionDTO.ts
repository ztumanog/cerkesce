/**
 * File: src/domain/discovery/dto/SmartSuggestionDTO.ts
 * Layer: DTO
 *
 * Smart Suggestion sonuc yapisi.
 *
 * P5-003: Yazim toleransi, yakin eslesme, oneri sistemi.
 */

export interface SmartSuggestion {
  /** Onerilen kelime */
  word: string;
  /** Kelimenin anlami (Turkce) */
  meaningTr?: string;
  /** Kelimenin anlami (Ingilizce) */
  meaningEn?: string;
  /** Kelimenin anlami (Rusca) */
  meaningRu?: string;
  /** Levenshtein mesafesi (0 = tam eslesme) */
  distance: number;
  /** Guven skoru (0.0 - 1.0) */
  confidence: number;
  /** Kelimenin concept ID'si */
  conceptId?: string;
}

export interface SmartSuggestionResult {
  /** Kullanicinin yazdigi kelime */
  query: string;
  /** Oneri listesi (sirali) */
  suggestions: SmartSuggestion[];
  /** En iyi oneri (varsa) */
  bestMatch?: SmartSuggestion;
}
