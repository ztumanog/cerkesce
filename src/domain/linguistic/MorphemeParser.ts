/**
 * P4-003: MorphemeParser
 *
 * Amac: Lexeme formundan morfemleri ayirmak.
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

export interface MorphemeParserInput {
  lexemeId: string;
  form: string;
  derivation?: {
    rootIds?: string[];
    morphemeIds?: string[];
    rule?: string;
  };
}

export interface MorphemeParserOutput {
  lexemeId: string;
  morphemes: ParsedMorpheme[];
  method: 'dictionary' | 'split' | 'fallback';
  confidence: number;
}

export interface ParsedMorpheme {
  morphemeId: string | null;
  form: string;
  type: 'lexical' | 'grammatical' | 'unknown';
  gloss?: string;
  position: number;
}

export interface Morpheme {
  id: string;
  form: string;
  gloss: string;
  type: 'lexical' | 'grammatical';
  dialect?: string;
  equivalent?: {
    adyghe: string;
    kabardian: string;
  };
}

export class MorphemeParser {
  private morphemes: Map<string, Morpheme>;
  private byForm: Map<string, Morpheme[]>;

  constructor(morphemes: Morpheme[]) {
    this.morphemes = new Map(morphemes.map(m => [m.id, m]));
    this.byForm = new Map();
    for (const m of morphemes) {
      if (!this.byForm.has(m.form)) {
        this.byForm.set(m.form, []);
      }
      this.byForm.get(m.form)!.push(m);
    }
  }

  /**
   * Lexeme formundan morfemleri ayirir.
   */
  parse(input: MorphemeParserInput): MorphemeParserOutput {
    // 1) derivation.morphemeIds varsa onu kullan
    if (input.derivation?.morphemeIds?.length) {
      const morphemes: ParsedMorpheme[] = [];
      let position = 0;
      for (const mid of input.derivation.morphemeIds) {
        const m = this.morphemes.get(mid);
        if (m) {
          morphemes.push({
            morphemeId: m.id,
            form: m.form,
            type: m.type,
            gloss: m.gloss,
            position: position++,
          });
        }
      }
      return {
        lexemeId: input.lexemeId,
        morphemes,
        method: 'dictionary',
        confidence: 0.95,
      };
    }

    // 2) Form'u morfemlere ayirmayi dene (greedy longest match)
    const morphemes: ParsedMorpheme[] = [];
    let remaining = input.form;
    let position = 0;

    while (remaining.length > 0) {
      let bestMatch: Morpheme | null = null;
      let bestLen = 0;

      for (const [form, morphs] of this.byForm) {
        if (remaining.startsWith(form) && form.length > bestLen) {
          bestMatch = morphs[0];
          bestLen = form.length;
        }
      }

      if (bestMatch) {
        morphemes.push({
          morphemeId: bestMatch.id,
          form: bestMatch.form,
          type: bestMatch.type,
          gloss: bestMatch.gloss,
          position: position++,
        });
        remaining = remaining.slice(bestLen);
      } else {
        // Tek karakter ilerle
        morphemes.push({
          morphemeId: null,
          form: remaining[0],
          type: 'unknown',
          position: position++,
        });
        remaining = remaining.slice(1);
      }
    }

    const knownCount = morphemes.filter(m => m.morphemeId !== null).length;
    const confidence = morphemes.length > 0 ? knownCount / morphemes.length : 0;

    return {
      lexemeId: input.lexemeId,
      morphemes,
      method: confidence > 0.5 ? 'dictionary' : 'split',
      confidence,
    };
  }

  /**
   * Toplu ayristirma.
   */
  parseAll(inputs: MorphemeParserInput[]): MorphemeParserOutput[] {
    return inputs.map(i => this.parse(i));
  }
}
