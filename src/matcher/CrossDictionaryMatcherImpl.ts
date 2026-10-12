// src/matcher/CrossDictionaryMatcherImpl.ts

import { ICrossDictionaryMatcher } from './CrossDictionaryMatcher';
import { TranslationMatch, MatchType } from '@/types/matcher.types';

export class CrossDictionaryMatcherImpl implements ICrossDictionaryMatcher {
  private readonly exactThreshold = 1.0;
  private readonly semanticThreshold = 0.8;
  private readonly fuzzyThreshold = 0.6;

  match(sourceWord: string, targetWord: string): number {
    if (sourceWord === targetWord) return 1.0;
    const distance = this.levenshteinDistance(sourceWord, targetWord);
    const maxLength = Math.max(sourceWord.length, targetWord.length);
    const similarity = 1 - distance / maxLength;
    return similarity;
  }

  findMatches(sourceWord: string, targetWords: string[]): TranslationMatch[] {
    return targetWords
      .map((targetWord, index) => ({
        sourceLanguage: 'tr',
        targetLanguage: 'unknown',
        sourceWord,
        targetWord,
        confidence: this.match(sourceWord, targetWord),
        matchType: this.getMatchType(sourceWord, targetWord),
        metadata: { index }
      }))
      .filter(m => m.confidence > 0.5);
  }

  scoreMatches(matches: TranslationMatch[]): TranslationMatch[] {
    return matches.map(m => ({
      ...m,
      confidence: Math.round(m.confidence * 100) / 100
    }));
  }

  rankMatches(matches: TranslationMatch[]): TranslationMatch[] {
    return [...matches].sort((a, b) => b.confidence - a.confidence);
  }

  private getMatchType(source: string, target: string): MatchType {
    const similarity = this.match(source, target);
    if (similarity === 1.0) return 'exact';
    if (similarity >= 0.8) return 'semantic';
    if (similarity >= 0.6) return 'fuzzy';
    return 'phonetic';
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
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
