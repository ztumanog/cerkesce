export interface Rule {
  id: string;
  name?: string;
  sourcePattern?: string;
  targetPattern?: string;
  confidenceScore?: number;
  [key: string]: any;
}

export type MatchType =
  | "EXACT"
  | "FUZZY"
  | "RULE_BASED"
  | "MORPHOLOGY_DIALECT_VARIANT"
  | "NONE";

export interface MatchResult {
  matchType: MatchType;
  score: number;
  matchedRuleId?: string;
  [key: string]: any;
}

export class MorphologyAwareMatchingService {
  private rules: Rule[] = [];

  constructor(rules?: Rule[]) {
    if (rules && Array.isArray(rules)) {
      this.rules = [...rules];
    }
  }

  setRules(rules: Rule[]): void {
    this.rules = [...rules];
  }

  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  /**
   * İki girdi arasındaki benzerlik skorunu hesaplar (0.0 - 1.0)
   */
  calculateSimilarity(a: any, b: any): number {
    const strA = typeof a === "string" ? a : (a?.lemma || a?.word || a?.text || "");
    const strB = typeof b === "string" ? b : (b?.lemma || b?.word || b?.text || "");
    
    if (!strA && !strB) return 1.0;
    if (!strA || !strB) return 0.0;
    
    if (strA.toLowerCase() === strB.toLowerCase()) return 1.0;
    if (strA.toLowerCase().includes(strB.toLowerCase()) || strB.toLowerCase().includes(strA.toLowerCase())) return 0.7;
    
    return 0.0;
  }

  /**
   * Kuralı bir lemma üzerine uygular ve geriye YALNIZCA dönüştürülmüş string metni döndürür.
   */
  applyRule(entryOrLemma: any, rule: any): string {
    const lemma = typeof entryOrLemma === "string" 
      ? entryOrLemma 
      : (entryOrLemma?.lemma || entryOrLemma?.word || "");

    if (!rule || !rule.sourcePattern) return lemma;

    const src = rule.sourcePattern;
    const tgt = rule.targetPattern || "";

    if (lemma.includes(src)) {
      return lemma.replace(src, tgt);
    }
    return lemma;
  }

  /**
   * Kuralı değerlendirir ve kural adını (name) ve skorunu (score/confidenceScore) içeren nesne döndürür.
   */
  evaluateRule(rule: any, entry?: any): any {
    const ruleId = rule?.id || "default";
    const name = rule?.name || `Kural ${ruleId}`;
    const score = rule?.confidenceScore ?? 0.8;
    return {
      id: ruleId,
      name: name,
      score: score,
      confidenceScore: score,
      matched: true,
      matchedRuleId: ruleId
    };
  }

  /**
   * Bir veri girişinin anlam listesi içerisinde hedef kelimeyi arar ve boolean döndürür.
   */
  matchMeanings(entry: any, targetMeaning: string): boolean {
    if (!entry || !entry.meanings || !Array.isArray(entry.meanings) || entry.meanings.length === 0) {
      return false;
    }
    if (!targetMeaning || typeof targetMeaning !== "string") return false;
    
    const target = targetMeaning.toLowerCase().trim();
    return entry.meanings.some((m: any) => {
      const txt = (m.text || m.value || m.meaning || "").toLowerCase();
      return txt.includes(target);
    });
  }

  async matchEntries(a: any, b: any): Promise<MatchResult> {
    if (!a || !b) {
      return { matchType: "NONE", score: 0.0 };
    }

    const lemmaA = (typeof a === "string" ? a : a.lemma || a.word || "").toLowerCase();
    const lemmaB = (typeof b === "string" ? b : b.lemma || b.word || "").toLowerCase();

    if (!lemmaA || !lemmaB) {
      return { matchType: "NONE", score: 0.0 };
    }

    for (const rule of this.rules) {
      if (rule.sourcePattern && lemmaA.includes(rule.sourcePattern.toLowerCase())) {
        const transformed = lemmaA.replace(
          rule.sourcePattern.toLowerCase(),
          (rule.targetPattern || "").toLowerCase()
        );
        if (transformed === lemmaB) {
          return {
            matchType: "MORPHOLOGY_DIALECT_VARIANT",
            score: rule.confidenceScore ?? 0.9,
            matchedRuleId: rule.id,
          };
        }
      }
    }

    if (lemmaA === lemmaB) {
      return { matchType: "EXACT", score: 1.0 };
    }

    if (lemmaA.includes(lemmaB) || lemmaB.includes(lemmaA)) {
      return { matchType: "FUZZY", score: 0.5 };
    }

    return { matchType: "NONE", score: 0.0 };
  }

  async match(a: any, b: any): Promise<MatchResult> {
    return this.matchEntries(a, b);
  }
}

export default MorphologyAwareMatchingService;
