export type IntentType = 'DEFINITION' | 'LOCATION' | 'CLASSIFICATION' | 'PROPERTY' | 'UNKNOWN';
export type MatchType = 'EXACT' | 'NORMALIZED' | 'TRANSLATED' | 'FALLBACK';

export interface SemanticMatchResult {
  conceptId: string;
  intent: IntentType;
  matchType: MatchType;
  language: string;
  label?: string;
}

export interface ISemanticRule {
  evaluate(normalizedQuery: string): SemanticMatchResult | null;
}

export class DefinitionRules implements ISemanticRule {
  evaluate(query: string): SemanticMatchResult | null {
    if (query.includes('nedir') || query.includes('what is') || query.endsWith('ne')) {
      return { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', intent: 'DEFINITION', matchType: 'NORMALIZED', language: 'tr' };
    }
    return null;
  }
}

export class LocationRules implements ISemanticRule {
  evaluate(query: string): SemanticMatchResult | null {
    if (query.includes('nerede') || query.includes('where')) {
      return { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', intent: 'LOCATION', matchType: 'NORMALIZED', language: 'tr' };
    }
    return null;
  }
}

export class ClassificationRules implements ISemanticRule {
  evaluate(query: string): SemanticMatchResult | null {
    if (query.includes('türü') || query.includes('kategori') || query.includes('type')) {
      return { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', intent: 'CLASSIFICATION', matchType: 'NORMALIZED', language: 'tr' };
    }
    return null;
  }
}

export class PropertyRules implements ISemanticRule {
  evaluate(query: string): SemanticMatchResult | null {
    if (query.includes('özellik') || query.includes('property')) {
      return { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', intent: 'PROPERTY', matchType: 'NORMALIZED', language: 'tr' };
    }
    return null;
  }
}

export class SemanticRuleRegistry {
  private rules: ISemanticRule[] = [];

  constructor() {
    this.registerRule(new DefinitionRules());
    this.registerRule(new LocationRules());
    this.registerRule(new ClassificationRules());
    this.registerRule(new PropertyRules());
  }

  public registerRule(rule: ISemanticRule): void {
    this.rules.push(rule);
  }

  public evaluate(normalizedQuery: string): SemanticMatchResult | null {
    for (const rule of this.rules) {
      const result = rule.evaluate(normalizedQuery);
      if (result) return result;
    }
    return null;
  }
}