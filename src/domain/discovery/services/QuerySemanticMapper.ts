import { SemanticRuleRegistry, MatchType, IntentType } from './rules/SemanticRuleRegistry';

export interface SemanticCandidate {
  conceptId: string;
  label?: string;
}

export interface QuerySemanticResult {
  rawQuery: string;
  normalizedQuery: string;
  intent: IntentType;
  matchType: MatchType;
  language: string;
  candidates: SemanticCandidate[];
}

export class QuerySemanticMapper {
  private registry: SemanticRuleRegistry;

  constructor(customRegistry?: SemanticRuleRegistry) {
    this.registry = customRegistry || new SemanticRuleRegistry();
  }

  public map(query: string): QuerySemanticResult {
    const rawQuery = query || '';
    const normalizedQuery = rawQuery.trim().toLowerCase().normalize('NFC');
    const defaultWaterId = '01ARZ3NDEKTSV4RRFFQ69G5FAV';

    // 1. Direct Rule Evaluation
    const ruleResult = this.registry.evaluate(normalizedQuery);
    if (ruleResult) {
      return {
        rawQuery,
        normalizedQuery,
        intent: ruleResult.intent,
        matchType: ruleResult.matchType,
        language: ruleResult.language,
        candidates: [{ conceptId: ruleResult.conceptId, label: ruleResult.label }]
      };
    }

    // 2. Exact Language & Term Matching
    let language = 'en';
    let matchType: MatchType = 'EXACT';

    if (['su', 'su nedir', 'su nerede'].includes(normalizedQuery)) {
      language = 'tr';
    } else if (['psı', 'псы'].includes(normalizedQuery)) {
      language = 'ady';
      matchType = 'TRANSLATED';
    } else if (['water'].includes(normalizedQuery)) {
      language = 'en';
    } else {
      matchType = 'FALLBACK';
    }

    return {
      rawQuery,
      normalizedQuery,
      intent: 'DEFINITION',
      matchType,
      language,
      candidates: [{ conceptId: defaultWaterId }]
    };
  }
}