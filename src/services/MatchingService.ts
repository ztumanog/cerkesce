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

  constructor(...args: any[]) {
    if (args.length > 0 && Array.isArray(args[0])) {
      this.rules = [...args[0]];
    }
  }

  setRules(rules: Rule[]): void {
    this.rules = [...rules];
  }

  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  async matchEntries(...args: any[]): Promise<MatchResult> {
    const a = args[0];
    const b = args[1];

    if (!a || !b) {
      return { matchType: "NONE", score: 0.0 };
    }

    const lemmaA = (a.lemma || a.word || "").toLowerCase();
    const lemmaB = (b.lemma || b.word || "").toLowerCase();

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

  async match(...args: any[]): Promise<MatchResult> {
    return this.matchEntries(...args);
  }
}
