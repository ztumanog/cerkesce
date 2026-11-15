/**
 * File: src/domain/discovery/services/SmartSuggestionService.ts
 * Layer: Service
 *
 * P5-003: Smart Suggestions (Ortografi Toleransli Kiril Araması)
 */

import { SmartSuggestion, SmartSuggestionResult } from '../dto/SmartSuggestionDTO';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';
import { normalizeLatinToKiril } from '@/lib/latinNormalize';

interface LexemeData {
  id: string;
  form: string;
  etymologyType?: string;
  literalMeaning?: string;
  wordFamilyId?: string;
  conceptId?: string;
  dictionaryEvidence?: {
    meanings?: {
      tr?: string;
      en?: string;
      ru?: string;
    };
  };
}

export class SmartSuggestionService {
  private lexemes: LexemeData[] = [];
  private static readonly MAX_SUGGESTIONS = 5;
  private static readonly MAX_DISTANCE = 3;

  constructor(lexemes?: LexemeData[]) {
    this.lexemes = lexemes || [];
  }

  public loadLexemes(lexemes: LexemeData[]): void {
    this.lexemes = lexemes;
  }

  public suggest(
    query: string,
    maxSuggestions: number = SmartSuggestionService.MAX_SUGGESTIONS
  ): SmartSuggestionResult {
    const normalizedQuery = this.normalize(query);

    if (!normalizedQuery) {
      return { query, suggestions: [] };
    }

    const suggestions: SmartSuggestion[] = [];
    const qLen = normalizedQuery.length;

    for (const lex of this.lexemes) {
      if (!lex.form) continue;
      const normalizedForm = this.normalize(lex.form);
      if (Math.abs(normalizedForm.length - qLen) > SmartSuggestionService.MAX_DISTANCE) {
        continue;
      }

      const distance = this.levenshtein(normalizedQuery, normalizedForm);
      if (distance > SmartSuggestionService.MAX_DISTANCE) continue;
      if (distance === 0) continue;

      const maxLen = Math.max(qLen, normalizedForm.length);
      const confidence = maxLen > 0 ? 1 - distance / maxLen : 0;

      suggestions.push({
        word: lex.form,
        meaningTr: lex.dictionaryEvidence?.meanings?.tr || lex.literalMeaning,
        meaningEn: lex.dictionaryEvidence?.meanings?.en,
        meaningRu: lex.dictionaryEvidence?.meanings?.ru,
        distance,
        confidence,
        conceptId: lex.conceptId,
      });
    }

    suggestions.sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      return b.confidence - a.confidence;
    });

    const top = suggestions.slice(0, maxSuggestions);

    return {
      query,
      suggestions: top,
      bestMatch: top.length > 0 ? top[0] : undefined,
    };
  }

  /**
   * Ortografi toleransli normalizasyon:
   * - Palochka varyantlarini (1, I, İ, ı, І, ӏ -> Ӏ) birlestirir
   * - NFC + kucuk harf standardizasyonu uygular
   */
  private normalize(word: string): string {
    if (!word) return '';
    const trimmed = word.trim().normalize('NFC');
    const converted = /[\u0400-\u04FF]/.test(trimmed)
      ? trimmed
      : normalizeLatinToKiril(trimmed);
    return normalizePalochka(converted).toLowerCase();
  }

  private levenshtein(a: string, b: string): number {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }
}
