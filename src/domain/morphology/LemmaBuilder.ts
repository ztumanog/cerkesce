/**
 * LemmaBuilder - Faz 4.4 Morphology Engine
 *
 * Iki is yapar:
 * 1. Model A (ANA): Toplu lemma uretimi — homonim tespiti + senses[]
 * 2. Tekil arama (YARDIMCI): form -> LemmaResult
 *
 * ADR-0024 (Model A):
 *   Lemma = surface form normalizasyonu
 *   Sense = anlam ayrimi
 *   Root -> Lemma -> Sense -> Concept
 */

import { Lexeme } from '../linguistic/Lexeme';
import { Root } from '../linguistic/Root';
import { Morpheme } from '../linguistic/Morpheme';

// ============================================
// MODEL A — Toplu lemma uretimi
// ============================================

export interface LemmaSense {
  lexemeId: string;
  meaning: string;
  conceptId?: string;
  dialectVariants?: Record<string, string>;
}

export interface Lemma {
  lemmaId: string;
  form: string;
  senses: LemmaSense[];
  isHomonym: boolean;
}

export interface LexemeInput {
  id: string;
  form: string;
  literalMeaning?: string;
  conceptId?: string;
  dialectVariants?: Record<string, string>;
}

// ============================================
// TEKIL ARAMA — LemmaResult
// ============================================

export interface LemmaResult {
  input: string;
  lemma?: Lexeme;
  root?: Root;
  morphemes: Morpheme[];
  matched: boolean;
  confidence: number;
}

// ============================================
// LemmaBuilder
// ============================================

export class LemmaBuilder {
  private lexemes: Lexeme[];

  constructor(lexemes?: Lexeme[]) {
    this.lexemes = lexemes || [];
  }

  // ----- MODEL A (ANA IS) -----

  /**
   * Toplu lemma uretimi (Model A)
   * ADR-0024: Homonimler tek lemmaId altinda toplanir, senses[] dizisinde ayrilir.
   */
  build(lexemes: LexemeInput[]): Lemma[] {
    const byForm = new Map<string, LexemeInput[]>();

    for (const lex of lexemes) {
      const form = lex.form.trim();
      if (!byForm.has(form)) byForm.set(form, []);
      byForm.get(form)!.push(lex);
    }

    const result: Lemma[] = [];

    for (const [form, group] of byForm.entries()) {
      const slug = form
        .replace(/[^a-zA-Zа-яёА-ЯЁа-яА-ЯёЁ\u04C0\u04CF]/g, '')
        .toUpperCase()
        .slice(0, 12) || 'X';

      const lemmaId = 'LEMMA-' + slug;

      const senses: LemmaSense[] = group.map(l => ({
        lexemeId: l.id,
        meaning: l.literalMeaning || '',
        conceptId: l.conceptId,
        dialectVariants: l.dialectVariants,
      }));

      result.push({
        lemmaId,
        form,
        senses,
        isHomonym: group.length > 1,
      });
    }

    return result;
  }

  getHomonyms(lexemes: LexemeInput[]): Lemma[] {
    return this.build(lexemes).filter(l => l.isHomonym);
  }

  // ----- TEKIL ARAMA (YARDIMCI IS) -----

  /**
   * Tek formu lexeme listesinde arar
   */
  resolve(form: string): LemmaResult {
    const found = this.lexemes.find(l => l.form === form);
    return {
      input: form,
      lemma: found,
      morphemes: [],
      matched: found !== undefined,
      confidence: found ? 1.0 : 0.0,
    };
  }

  buildBatch(forms: string[]): LemmaResult[] {
    return forms.map(f => this.resolve(f));
  }

  getSuccessRate(results: LemmaResult[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.matched).length;
    return matched / results.length;
  }
}
