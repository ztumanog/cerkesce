// src/matcher/CrossDictionaryMatcher.ts

import { TranslationMatch, CrossDictionaryMatch, MatchType } from '@/types/matcher.types';

export interface ICrossDictionaryMatcher {
  match(sourceWord: string, targetWord: string): number;
  findMatches(sourceWord: string, targetWords: string[]): TranslationMatch[];
  scoreMatches(matches: TranslationMatch[]): TranslationMatch[];
  rankMatches(matches: TranslationMatch[]): TranslationMatch[];
}
