/**
 * InflectionHandler - Cekim yonetimi
 * 
 * Phase 4.5 - Morphology Engine
 * Hedef: 50+ test
 */

export type InflectionType = 'case' | 'number' | 'possession' | 'tense';

export interface Inflection {
  type: InflectionType;
  suffix: string;
  meaning: string;
}

export interface InflectionResult {
  input: string;
  base: string;
  inflections: Inflection[];
  matched: boolean;
  confidence: number;
}

export class InflectionHandler {
  private inflections: Inflection[];

  constructor(inflections: Inflection[]) {
    this.inflections = inflections;
  }

  analyze(form: string): InflectionResult {
    const found: Inflection[] = [];
    let base = form;

    for (const infl of this.inflections) {
      if (form.endsWith(infl.suffix)) {
        found.push(infl);
        base = form.slice(0, -infl.suffix.length);
      }
    }

    return {
      input: form,
      base,
      inflections: found,
      matched: found.length > 0,
      confidence: found.length / this.inflections.length
    };
  }

  analyzeBatch(forms: string[]): InflectionResult[] {
    return forms.map(f => this.analyze(f));
  }

  getSuccessRate(results: InflectionResult[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.matched).length;
    return matched / results.length;
  }
}
