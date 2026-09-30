/**
 * LemmaBuilder - Morfolojik analizden lemma olusturma
 * 
 * Phase 4.4 - Morphology Engine
 * Hedef: 244/244 lexeme eslesmesi
 */

import { Lexeme } from '../linguistic/Lexeme';
import { Root } from '../linguistic/Root';
import { Morpheme } from '../linguistic/Morpheme';

export interface LemmaResult {
  input: string;
  lemma?: Lexeme;
  root?: Root;
  morphemes: Morpheme[];
  matched: boolean;
  confidence: number;
}

export class LemmaBuilder {
  private lexemes: Lexeme[];

  constructor(lexemes: Lexeme[]) {
    this.lexemes = lexemes;
  }

  build(form: string): LemmaResult {
    const found = this.lexemes.find(l => l.form === form);
    return {
      input: form,
      lemma: found,
      morphemes: [],
      matched: found !== undefined,
      confidence: found ? 1.0 : 0.0
    };
  }

  buildBatch(forms: string[]): LemmaResult[] {
    return forms.map(f => this.build(f));
  }

  getSuccessRate(results: LemmaResult[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.matched).length;
    return matched / results.length;
  }
}
