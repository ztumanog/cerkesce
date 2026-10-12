// src/types/matcher.types.ts

export type MatchType = 'exact' | 'semantic' | 'fuzzy' | 'phonetic';

export interface TranslationMatch {
  sourceLanguage: string;
  targetLanguage: string;
  sourceWord: string;
  targetWord: string;
  confidence: number;
  matchType: MatchType;
  metadata?: Record<string, any>;
}

export interface CrossDictionaryMatch {
  conceptId: string;
  matches: TranslationMatch[];
  timestamp: Date;
  score: number;
}

export interface MatchingStrategy {
  name: string;
  match(source: string, target: string): number;
}
