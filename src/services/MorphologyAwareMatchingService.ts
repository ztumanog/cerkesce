/**
 * @file src/services/MorphologyAwareMatchingService.ts
 * @description Morfolojik ve lehçe duyarlı eşleştirme servisi.
 * @version 4.0 - Pattern-based matching (dialect-agnostic)
 */

import { TranslationEntry } from "../domain/translation";
import { DialectRule } from "../domain/dialect";

export interface ExtendedDialectRule extends Partial<DialectRule> {
  id?: string;
  name?: string;
  sourcePattern: string;
  targetPattern: string;
  confidenceScore?: number;
  fromDialect?: "KBD" | "ADY";
  toDialect?: "KBD" | "ADY";
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
  }

  public addRule(rule: ExtendedDialectRule): void {
    this.rules.push(rule);
  }

  private normalize(text: string): string {
    if (!text) return "";
    if (this.normalizationCache.has(text)) {
      return this.normalizationCache.get(text)!;
    }
    const normalized = text
      .trim()
      .toLowerCase()
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

    // Suffix (ek) varyasyonları
    if (normalized.length > 3) {
      variations.add(normalized.slice(0, -1));
      variations.add(normalized.slice(0, -2));
    }

    return variations;
  }

  private levenshteinDistance(a: string, b: string, maxDistance: number = 3): number {
    const aLen = a.length;
    const bLen = b.length;

    if (Math.abs(aLen - bLen) > maxDistance) return maxDistance + 1;

    const matrix: number[][] = Array(aLen + 1)
      .fill(null)
      .map(() => Array(bLen + 1).fill(0));

    for (let i = 0; i <= aLen; i++) matrix[i][0] = i;
    for (let j = 0; j <= bLen; j++) matrix[0][j] = j;

    for (let i = 1; i <= aLen; i++) {
      for (let j = 1; j <= bLen; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[aLen][bLen];
  }

  /**
   * TranslationService ve Testler için match metodu
   * Query string ile entry'yi eşleştirir
   */
  public match(entry: TranslationEntry, query: string): number {
    if (!query || !entry) return 0;
    
    const normalizedQuery = query.toLowerCase().trim();
    const queryVariations = this.generateVariations(normalizedQuery);

    let maxScore = 0;

    // Lemma ile eşleştir
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

    // Meanings (anlamlar) ile eşleştir
    if (entry.meanings && Array.isArray(entry.meanings)) {
      for (const meaning of entry.meanings) {
        const meaningText = (meaning as { value?: string; text?: string }).value || 
                          (meaning as { value?: string; text?: string }).text;
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

  /**
   * İki giriş arasında detaylı eşleştirme türü ve skoru döner
   * 
   * Eşleştirme sırası:
   * 1. Pattern-based kural kontrolü (dialect-agnostic)
   * 2. Case-insensitive exact match
   * 3. Fuzzy matching (Levenshtein distance)
   * 
   * @param entryA - Birinci çeviri girdisi
   * @param entryB - İkinci çeviri girdisi
   * @returns Eşleştirme sonucu (tip, skor, kural ID)
   */
  public async matchEntries(
    entryA: TranslationEntry,
    entryB: TranslationEntry
  ): Promise<MatchResult> {
    if (!entryA || !entryB) {
      return { matchType: "NONE", score: 0.0 };
    }

    // Normalize lemmas before comparison
    const lemmaA = this.normalize(entryA.lemma ?? entryA.sourceWord ?? "");
    const lemmaB = this.normalize(entryB.lemma ?? entryB.sourceWord ?? "");

    if (!lemmaA || !lemmaB) {
      return { matchType: "NONE", score: 0.0 };
    }

    // ============================================================
    // ADIM 1: Kural kontrolü — Pattern-based (dialect-agnostic)
    // Dialect bilgisi yok sayılıyor, sadece pattern eşleşmesi önemli
    // ============================================================
    for (const rule of this.rules) {
      if (!rule.sourcePattern || !rule.targetPattern) continue;

      const sourceNorm = this.normalize(rule.sourcePattern);
      const targetNorm = this.normalize(rule.targetPattern);

      // Durum 1: Exact pattern matching
      // lemmaA sourcePattern'e uyuyor, lemmaB targetPattern'e uyuyor (veya tersi)
      const aMatchesSource = lemmaA === sourceNorm;
      const bMatchesTarget = lemmaB === targetNorm;
      const aMatchesTarget = lemmaA === targetNorm;
      const bMatchesSource = lemmaB === sourceNorm;

      if ((aMatchesSource && bMatchesTarget) || (aMatchesTarget && bMatchesSource)) {
        return {
          matchType: "MORPHOLOGY_DIALECT_VARIANT",
          score: rule.confidenceScore ?? 0.85,
          matchedRuleId: rule.id,
        };
      }

      // Durum 2: Pattern replacement kontrolü
      // lemmaA'da sourcePattern varsa, targetPattern ile değiştir
      // Sonuç lemmaB'ye eşit mi?
      const convertedA = lemmaA.replace(sourceNorm, targetNorm);
      const convertedB = lemmaB.replace(sourceNorm, targetNorm);

      if (convertedA === lemmaB || convertedB === lemmaA) {
        return {
          matchType: "MORPHOLOGY_DIALECT_VARIANT",
          score: rule.confidenceScore ?? 0.85,
          matchedRuleId: rule.id,
        };
      }
    }

    // ============================================================
    // ADIM 2: Case-insensitive exact match
    // ============================================================
    if (lemmaA === lemmaB) {
      return { matchType: "EXACT", score: 1.0 };
    }

    // ============================================================
    // ADIM 3: Fuzzy matching (Levenshtein distance)
    // ============================================================
    let fuzzyScore = 0.0;

    if (lemmaA.includes(lemmaB) || lemmaB.includes(lemmaA)) {
      // Substring match
      const minLen = Math.min(lemmaA.length, lemmaB.length);
      const maxLen = Math.max(lemmaA.length, lemmaB.length);
      fuzzyScore = minLen / maxLen;
    } else {
      // Levenshtein distance calculation
      const distance = this.levenshteinDistance(lemmaA, lemmaB);
      const maxLen = Math.max(lemmaA.length, lemmaB.length);
      fuzzyScore = 1.0 - distance / maxLen;
    }

    if (fuzzyScore > 0.3) {
      return {
        matchType: "FUZZY",
        score: Number(fuzzyScore.toFixed(2)),
      };
    }

    return { matchType: "NONE", score: 0.0 };
  }

  /**
   * İki entry arasında benzerlik skoru hesapla (0.0 - 1.0)
   */
  public async calculateSimilarity(
    entryA: TranslationEntry,
    entryB: TranslationEntry
  ): Promise<number> {
    if (entryA.id && entryB.id && entryA.id === entryB.id) {
      return 1.0;
    }
    const result = await this.matchEntries(entryA, entryB);
    return result.score;
  }

  /**
   * Kurala göre entry'yi dönüştür
   */
  public applyRule(
    entry: TranslationEntry,
    rule: Partial<ExtendedDialectRule>
  ): string {
    if (!rule.sourcePattern || !rule.targetPattern || !entry.lemma) {
      return entry.lemma || "";
    }

    if (entry.lemma.includes(rule.sourcePattern)) {
      return entry.lemma.replace(rule.sourcePattern, rule.targetPattern);
    }

    return entry.lemma;
  }

  /**
   * Kuralı değerlendir
   */
  public evaluateRule(rule: Partial<ExtendedDialectRule>): {
    name: string;
    score: number;
  } {
    const name = rule.name || `Rule-${rule.id || "default"}`;
    const score = rule.confidenceScore ?? 0.5;
    return { name, score };
  }

  /**
   * Entry'nin anlamlarında query'yi ara
   */
  public matchMeanings(entry: TranslationEntry, query: string): boolean {
    if (!entry.meanings || entry.meanings.length === 0) return false;
    const normalizedQuery = this.normalize(query);
    if (!normalizedQuery) return false;

    return entry.meanings.some((meaning) => {
      const meaningText =
        (meaning as { value?: string; text?: string }).value ||
        (meaning as { value?: string; text?: string }).text ||
        "";
      return this.normalize(meaningText).includes(normalizedQuery);
    });
  }
}

// Diğer servislerin import uyumluluğu için alias export
export { MorphologyAwareMatchingService as MatchingService };