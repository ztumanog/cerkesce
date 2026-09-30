/**
 * MorphemeParser - Lexeme formundan morfem ayristirma
 * Phase 4.3 - Morphology Engine
 */

import { Morpheme } from '../linguistic/Morpheme';

export interface ParseResult {
  input: string;
  morphemes: Morpheme[];
  matched: boolean;
  confidence: number;
}

export class MorphemeParser {
  private morphemes: Morpheme[];

  constructor(morphemes: Morpheme[]) {
    this.morphemes = morphemes;
  }

  parse(form: string): ParseResult {
    const found: Morpheme[] = [];
    for (const m of this.morphemes) {
      const mForm = m.form || '';
      if (form.includes(mForm)) {
        found.push(m);
      }
    }
    return {
      input: form,
      morphemes: found,
      matched: found.length > 0,
      confidence: found.length / this.morphemes.length
    };
  }

  parseBatch(forms: string[]): ParseResult[] {
    return forms.map(f => this.parse(f));
  }

  getSuccessRate(results: ParseResult[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.matched).length;
    return matched / results.length;
  }
}
