export interface RootExtractorInput {
  lexemeId: string;
  form: string;
  morphemes?: string[];
}

export interface RootExtractorOutput {
  lexemeId: string;
  rootId: string | null;
  rootForm: string | null;
  confidence: number;
  method: 'dictionary' | 'morpheme' | 'corpus' | 'fallback';
  evidence?: string;
}

export interface Root {
  id: string;
  form: string;
  primaryMeaning: string;
  productivity: { lemmaCount: number; corpusFrequency: number; };
}

export interface Lexeme {
  id: string;
  form: string;
  derivation?: { rootIds?: string[]; morphemeIds?: string[]; rule?: string; };
}

export class RootExtractor {
  private roots: Map<string, Root>;
  private lexemes: Map<string, Lexeme>;

  constructor(roots: Root[], lexemes: Lexeme[]) {
    this.roots = new Map(roots.map(r => [r.id, r]));
    this.lexemes = new Map(lexemes.map(l => [l.id, l]));
  }

  extract(input: RootExtractorInput): RootExtractorOutput {
    const lexeme = this.lexemes.get(input.lexemeId);
    if (lexeme?.derivation?.rootIds?.length) {
      const rootId = lexeme.derivation.rootIds[0];
      const root = this.roots.get(rootId);
      return { lexemeId: input.lexemeId, rootId, rootForm: root?.form ?? null, confidence: 0.95, method: 'dictionary', evidence: 'lexeme.derivation.rootIds[0] = ' + rootId };
    }
    for (const root of this.roots.values()) {
      if (root.form === input.form) {
        return { lexemeId: input.lexemeId, rootId: root.id, rootForm: root.form, confidence: 0.90, method: 'dictionary', evidence: 'roots.json exact match: ' + root.id };
      }
    }
    const candidates: Array<{ root: Root; matchLen: number }> = [];
    for (const root of this.roots.values()) {
      if (input.form.startsWith(root.form)) candidates.push({ root, matchLen: root.form.length });
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.matchLen - a.matchLen);
      const best = candidates[0];
      return { lexemeId: input.lexemeId, rootId: best.root.id, rootForm: best.root.form, confidence: 0.75, method: 'morpheme', evidence: 'prefix match: ' + best.root.form };
    }
    return { lexemeId: input.lexemeId, rootId: null, rootForm: null, confidence: 0.0, method: 'fallback' };
  }

  extractAll(lexemes: Lexeme[]): RootExtractorOutput[] {
    return lexemes.map(l => this.extract({ lexemeId: l.id, form: l.form }));
  }
}
