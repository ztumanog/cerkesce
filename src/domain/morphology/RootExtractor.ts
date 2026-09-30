/**
 * RootExtractor - Lexeme formundan kok cikarma
 * Phase 4.2 - Morphology Engine
 */

import { Root } from '../linguistic/Root';

export interface ExtractionResult {
  input: string;
  root?: Root;
  matched: boolean;
  confidence: number;
}

export class RootExtractor {
  private roots: Root[];

  constructor(roots: Root[]) {
    this.roots = roots;
  }

  extract(form: string): ExtractionResult {
    let bestMatch: Root | undefined;
    let bestLength = 0;
    for (const root of this.roots) {
      const rootForm = root.form || '';
      if (form.startsWith(rootForm) && rootForm.length > bestLength) {
        bestMatch = root;
        bestLength = rootForm.length;
      }
    }
    return {
      input: form,
      root: bestMatch,
      matched: bestMatch !== undefined,
      confidence: bestMatch ? bestLength / form.length : 0
    };
  }

  extractBatch(forms: string[]): ExtractionResult[] {
    return forms.map(f => this.extract(f));
  }

  getSuccessRate(results: ExtractionResult[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.matched).length;
    return matched / results.length;
  }
}
