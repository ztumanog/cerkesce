/**
 * MorphemeParser - Lexeme formundan morfem ayristirma
 * ADR-0040: Morphological Root Taxonomy
 * Phase 4.3 - Morphology Engine
 *
 * Iki mod destekler:
 * 1. Obje: { lexemeId, form, derivation } -> dictionary-based
 * 2. String: form -> greedy longest match
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

import { Morpheme } from '../linguistic/Morpheme';

// ============================================
// TIP TANIMLARI
// ============================================

export interface MorphemeParserInput {
  lexemeId: string;
  form: string;
  derivation?: {
    rootIds?: string[];
    morphemeIds?: string[];
    rule?: string;
  };
}

export interface ParsedMorpheme {
  morphemeId: string | null;
  form: string;
  type: 'lexical' | 'grammatical' | 'unknown';
  gloss?: string;
  position: number;
}

export interface MorphemeParserOutput {
  lexemeId: string;
  morphemes: ParsedMorpheme[];
  method: 'dictionary' | 'split' | 'fallback';
  confidence: number;
}

// ============================================
// PARSER
// ============================================

export class MorphemeParser {
  private morphemes: Map<string, Morpheme>;
  private byForm: Map<string, Morpheme[]>;

  constructor(morphemes: Morpheme[]) {
    this.morphemes = new Map(morphemes.map(m => [m.id, m]));
    this.byForm = new Map();
    for (const m of morphemes) {
      const form = m.form || '';
      if (!form) continue;
      if (!this.byForm.has(form)) {
        this.byForm.set(form, []);
      }
      this.byForm.get(form)!.push(m);
    }
  }

  /**
   * Morfemleri ayirir.
   * Hem obje hem string kabul eder.
   */
  parse(input: MorphemeParserInput | string): MorphemeParserOutput {
    // String ise obje'ye cevir
    const inp: MorphemeParserInput =
      typeof input === 'string'
        ? { lexemeId: 'UNKNOWN', form: input }
        : input;

    // 1) derivation.morphemeIds varsa onu kullan
    if (inp.derivation?.morphemeIds?.length) {
      const morphemes: ParsedMorpheme[] = [];
      let position = 0;
      for (const mid of inp.derivation.morphemeIds) {
        const m = this.morphemes.get(mid);
        if (m) {
          morphemes.push({
            morphemeId: m.id,
            form: m.form,
            type: this.normalizeType(m.type),
            gloss: m.gloss,
            position: position++,
          });
        }
      }
      return {
        lexemeId: inp.lexemeId,
        morphemes,
        method: 'dictionary',
        confidence: 0.95,
      };
    }

    // 2) Greedy longest match
    const morphemes: ParsedMorpheme[] = [];
    let remaining = inp.form;
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
          type: this.normalizeType(bestMatch.type),
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
      lexemeId: inp.lexemeId,
      morphemes,
      method: confidence > 0.5 ? 'dictionary' : 'split',
      confidence,
    };
  }

  /**
   * Toplu ayristirma (obje listesi).
   */
  parseAll(inputs: MorphemeParserInput[]): MorphemeParserOutput[] {
    return inputs.map(i => this.parse(i));
  }

  /**
   * Toplu ayristirma (form listesi).
   */
  parseBatch(forms: string[]): MorphemeParserOutput[] {
    return forms.map(f => this.parse(f));
  }

  /**
   * Basari orani.
   */
  getSuccessRate(results: MorphemeParserOutput[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.morphemes.length > 0).length;
    return matched / results.length;
  }

  /**
   * Morfem tipini normalize eder.
   */
  private normalizeType(t: string | undefined): 'lexical' | 'grammatical' | 'unknown' {
    if (t === 'lexical' || t === 'grammatical') return t;
    return 'unknown';
  }
}
