/**
 * RootExtractor - Lexeme formundan kok cikarma
 * ADR-0040: Morphological Root Taxonomy
 *
 * RootClassifier entegre edilmistir.
 * Iki mod destekler:
 * 1. Obje: { lexemeId, form } -> dictionary-based
 * 2. String: form -> morpheme-based
 *
 * Phase 4.2 - Morphology Engine
 */

import { Root } from '../linguistic/Root';
import { RootClassifier, RootType } from './RootClassifier';

export interface RootExtractorInput {
  lexemeId: string;
  form: string;
  morphemes?: string[];
}

export interface RootExtractorOutput {
  lexemeId: string;
  rootId: string | null;
  rootForm: string | null;
  rootType: RootType;
  confidence: number;
  method: 'dictionary' | 'morpheme' | 'corpus' | 'fallback';
  evidence?: string;
}

interface LexemeLike {
  id: string;
  form: string;
  derivation?: {
    rootIds?: string[];
    morphemeIds?: string[];
    rule?: string;
  };
}

export class RootExtractor {
  private roots: Map<string, Root>;
  private lexemes: Map<string, LexemeLike>;
  private classifier: RootClassifier;

  constructor(roots: Root[], lexemes?: LexemeLike[]) {
    this.roots = new Map(roots.map(r => [r.id, r]));
    this.lexemes = new Map((lexemes || []).map((l: LexemeLike) => [l.id, l]));
    this.classifier = new RootClassifier();
  }

  /**
   * Kok cikarir.
   * Hem obje hem string kabul eder.
   */
  extract(input: RootExtractorInput | string): RootExtractorOutput {
    // String ise obje'ye cevir
    const inp: RootExtractorInput =
      typeof input === 'string'
        ? { lexemeId: 'UNKNOWN', form: input }
        : input;

    // 1. Dictionary-based: lexeme.derivation.rootIds
    const lexeme = this.lexemes.get(inp.lexemeId);
    if (lexeme?.derivation?.rootIds?.length) {
      const rootId = lexeme.derivation.rootIds[0];
      const root = this.roots.get(rootId);
      const rootForm = root?.form ?? null;
      return {
        lexemeId: inp.lexemeId,
        rootId,
        rootForm,
        rootType: rootForm ? this.classifier.getType(rootForm) : 'NEUTRAL',
        confidence: 0.95,
        method: 'dictionary',
        evidence: `lexeme.derivation.rootIds[0] = ${rootId}`,
      };
    }

    // 2. Exact match
    for (const root of this.roots.values()) {
      if (root.form === inp.form) {
        return {
          lexemeId: inp.lexemeId,
          rootId: root.id,
          rootForm: root.form,
          rootType: this.classifier.getType(root.form),
          confidence: 0.90,
          method: 'dictionary',
          evidence: `roots.json exact match: ${root.id}`,
        };
      }
    }

    // 3. Prefix match (en uzun)
    const candidates: Array<{ root: Root; matchLen: number }> = [];
    for (const root of this.roots.values()) {
      if (inp.form.startsWith(root.form)) {
        candidates.push({ root, matchLen: root.form.length });
      }
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.matchLen - a.matchLen);
      const best = candidates[0];
      return {
        lexemeId: inp.lexemeId,
        rootId: best.root.id,
        rootForm: best.root.form,
        rootType: this.classifier.getType(best.root.form),
        confidence: 0.75,
        method: 'morpheme',
        evidence: `prefix match: ${best.root.form}`,
      };
    }

    // 4. Fallback
    return {
      lexemeId: inp.lexemeId,
      rootId: null,
      rootForm: null,
      rootType: 'NEUTRAL',
      confidence: 0.0,
      method: 'fallback',
    };
  }

  /**
   * Toplu cikarim (lexeme listesi).
   */
  extractAll(lexemes: LexemeLike[]): RootExtractorOutput[] {
    return lexemes.map(l => this.extract({ lexemeId: l.id, form: l.form }));
  }

  /**
   * Toplu cikarim (form listesi).
   */
  extractBatch(forms: string[]): RootExtractorOutput[] {
    return forms.map(f => this.extract(f));
  }

  /**
   * Basari orani.
   */
  getSuccessRate(results: RootExtractorOutput[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.rootId !== null).length;
    return matched / results.length;
  }
}
