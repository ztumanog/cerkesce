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
  rootIds?: string[];
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

  extract(input: RootExtractorInput | string): RootExtractorOutput {
    const inp: RootExtractorInput =
      typeof input === 'string'
        ? { lexemeId: 'UNKNOWN', form: input }
        : input;

    const lexeme = this.lexemes.get(inp.lexemeId);
    const rawIds = (lexeme as any)?.rootIds?.length
      ? (lexeme as any).rootIds
      : lexeme?.derivation?.rootIds;

    if (rawIds?.length) {
      const firstRoot = this.roots.get(rawIds[0]);
      const targetForm = firstRoot?.form;
      let rootId = rawIds[0];
      let root: Root | undefined = firstRoot;

      if (targetForm) {
        const sameForm = [...this.roots.values()].filter(r => r.form === targetForm);
        sameForm.sort((a, b) => a.id.length - b.id.length);
        if (sameForm.length > 0) {
          root = sameForm[0];
          rootId = root.id;
        }
      } else {
        const cleaned = rawIds[0].replace(/-KALP$/, '');
        if (this.roots.has(cleaned)) {
          rootId = cleaned;
          root = this.roots.get(cleaned);
        }
      }

      return {
        lexemeId: inp.lexemeId,
        rootId,
        rootForm: root?.form ?? null,
        rootType: root?.form ? this.classifier.getType(root.form) : 'NEUTRAL',
        confidence: 0.95,
        method: 'dictionary',
        evidence: `lexeme.derivation.rootIds[0] = ${rootId}`,
      };
    }

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
        method: 'dictionary',
        evidence: `prefix match: ${best.root.form}`,
      };
    }

    return {
      lexemeId: inp.lexemeId,
      rootId: null,
      rootForm: null,
      rootType: 'NEUTRAL',
      confidence: 0.0,
      method: 'fallback',
    };
  }

  extractAll(lexemes: LexemeLike[]): RootExtractorOutput[] {
    return lexemes.map(l => this.extract({ lexemeId: l.id, form: l.form }));
  }

  extractBatch(forms: string[]): RootExtractorOutput[] {
    return forms.map(f => this.extract(f));
  }

  getSuccessRate(results: RootExtractorOutput[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.rootId !== null).length;
    return matched / results.length;
  }
}