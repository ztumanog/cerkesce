/**
 * @file src/services/MorphologyAwareMatchingService.ts
 * @description Dilbilimsel ve morfolojik eşleştirme servisi ana uygulaması.
 */

import { TranslationEntry } from "../domain/translation";
import { DialectRule } from "../domain/dialect";

export interface ExtendedDialectRule extends Partial<DialectRule> {
  id?: string;
  name?: string;
  sourcePattern: string;
  targetPattern: string;
  confidenceScore?: number;
  fromDialect?: "DOGU" | "BATI";
  toDialect?: "DOGU" | "BATI";
}

export type MatchType = "EXACT" | "MORPHOLOGY_DIALECT_VARIANT" | "FUZZY" | "NONE";

export interface MatchResult {
  matchType: MatchType;
  score: number;
  matchedRuleId?: string;
}

export class MorphologyAwareMatchingService {
  private rules: ExtendedDialectRule[] = [];
  private normalizationCache: Map<string, string> = new Map();

  constructor(rules: ExtendedDialectRule[] = []) {
    this.rules = [...rules];
  }

  public setRules(rules: ExtendedDialectRule[]): void {
    this.rules = [...rules];
    this.normalizationCache.clear();
  }

  public addRule(rule: ExtendedDialectRule): void {
    this.rules.push(rule);
    this.normalizationCache.clear();
  }

  public clearCache(): void {
    this.normalizationCache.clear();
  }

  private normalize(text: string): string {
    if (!text) return "";

    if (this.normalizationCache.has(text)) {
      return this.normalizationCache.get(text)!;
    }

    const normalized = text
      .trim()
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    this.normalizationCache.set(text, normalized);
    return normalized;
  }

  public generateVariations(word: string): Set<string> {
    const variations = new Set<string>();
    if (!word) return variations;

    const normalized = word.toLowerCase().trim();
    variations.add(normalized);

    // Doğu Çerkesçe varyasyonları
    variations.add(normalized.replace(/ə/g, "a"));
    variations.add(normalized.replace(/ə/g, "e"));

    // Batı Çerkesçe varyasyonları
    variations.add(normalized.replace(/a/g, "ə"));
    variations.add(normalized.replace(/e/g, "ə"));

    // Suffix varyasyonları
    if (normalized.length > 3) {
      variations.add(normalized.slice(0, -1));
      variations.add(normalized.slice(0, -2));
    }

    return variations;
  }

  private levenshteinDistance(a: string, b: string, maxDistance: number = 10): number {
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

        if (matrix[i][j] > maxDistance) {
          return maxDistance + 1;
        }
      }
    }

    return matrix[b.length][a.length];
  }

  public match(entry: TranslationEntry, query: string): number {
    if (!query || !entry) return 0;

    const normalizedQuery = query.toLowerCase().trim();
    const queryVariations = this.generateVariations(normalizedQuery);

    let maxScore = 0;

    if (entry.lemma) {
      const lemmaVariations = this.generateVariations(entry.lemma);
      for (const qVar of queryVariations) {
        for (const lVar of lemmaVariations) {
          if (qVar === lVar) {
            maxScore = Math.max(maxScore, 1.0);
          } else {
            const distance = this.levenshteinDistance(qVar, lVar);
            const similarity = Math.max(0, 1 - distance / Math.max(qVar.length, lVar.length));
            maxScore = Math.max(maxScore, similarity);
          }
        }
      }
    }

    if (entry.meanings && Array.isArray(entry.meanings)) {
      for (const meaning of entry.meanings) {
        const meaningText = (meaning as any).value || (meaning as any).text || "";
        if (meaningText) {
          const meaningVariations = this.generateVariations(meaningText);
          for (const qVar of queryVariations) {
            for (const mVar of meaningVariations) {
              if (qVar === mVar) {
                maxScore = Math.max(maxScore, 0.8);
              } else {
                const distance = this.levenshteinDistance(qVar, mVar);
                const similarity = Math.max(0, 0.8 * (1 - distance / Math.max(qVar.length, mVar.length)));
                maxScore = Math.max(maxScore, similarity);
              }
            }
          }
        }
      }
    }

    return maxScore;
  }

  public async matchEntries(entryA: TranslationEntry, entryB: TranslationEntry): Promise<MatchResult> {
    const lemmaA = this.normalize(entryA.lemma);
    const lemmaB = this.normalize(entryB.lemma);

    if (!lemmaA || !lemmaB) {
      return { matchType: "NONE", score: 0.0 };
    }

    if (lemmaA === lemmaB) {
      return { matchType: "EXACT", score: 1.0 };
    }

    for (const rule of this.rules) {
      if (!rule.sourcePattern || !rule.targetPattern) continue;

      const sourceNorm = this.normalize(rule.sourcePattern);
      const targetNorm = this.normalize(rule.targetPattern);

      const escapedSource = sourceNorm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedSource, "g");

      const convertedA = lemmaA.replace(regex, targetNorm);
      const convertedB = lemmaB.replace(regex, targetNorm);

      if (convertedA === lemmaB || convertedB === lemmaA) {
        return {
          matchType: "MORPHOLOGY_DIALECT_VARIANT",
          score: rule.confidenceScore ?? 0.85,
          matchedRuleId: rule.id,
        };
      }
    }

    let fuzzyScore = 0.0;
    if (lemmaA.includes(lemmaB) || lemmaB.includes(lemmaA)) {
      const minLen = Math.min(lemmaA.length, lemmaB.length);
      const maxLen = Math.max(lemmaA.length, lemmaB.length);
      fuzzyScore = minLen / maxLen;
    } else {
      const distance = this.levenshteinDistance(lemmaA, lemmaB);
      const maxLen = Math.max(lemmaA.length, lemmaB.length);
      fuzzyScore = 1.0 - distance / maxLen;
    }

    if (fuzzyScore > 0.3) {
      return { matchType: "FUZZY", score: Number(fuzzyScore.toFixed(2)) };
    }

    return { matchType: "NONE", score: 0.0 };
  }

  public async calculateSimilarity(entryA: TranslationEntry, entryB: TranslationEntry): Promise<number> {
    if (entryA.id && entryB.id && entryA.id === entryB.id) {
      return 1.0;
    }
    const result = await this.matchEntries(entryA, entryB);
    return result.score;
  }

  public applyRule(entry: TranslationEntry, rule: Partial<ExtendedDialectRule>): string {
    if (!rule.sourcePattern || !rule.targetPattern || !entry.lemma) {
      return entry.lemma || "";
    }

    if (entry.lemma.includes(rule.sourcePattern)) {
      return entry.lemma.replace(rule.sourcePattern, rule.targetPattern);
    }

    return entry.lemma;
  }

  public evaluateRule(rule: Partial<ExtendedDialectRule>): { name: string; score: number } {
    const name = rule.name || `Rule-${rule.id || "default"}`;
    const score = rule.confidenceScore ?? 0.5;
    return { name, score };
  }

  public matchMeanings(entry: TranslationEntry, query: string): boolean {
    if (!entry.meanings || entry.meanings.length === 0) return false;
    const normalizedQuery = this.normalize(query);
    if (!normalizedQuery) return false;

    return entry.meanings.some((meaning) => {
      const meaningText = (meaning as any).value || (meaning as any).text || "";
      return this.normalize(meaningText).includes(normalizedQuery);
    });
  }
}

export * from "./MorphologyAwareMatchingService";