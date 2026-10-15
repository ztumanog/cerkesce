/**
 * MorphemeParser - Lexeme formundan morfem ayristirma
 * ADR-0040: Morphological Root Taxonomy
 * Phase 4.3 - Morphology Engine
 *
 * Uc mod destekler:
 * 1. Obje + derivation.morphemeIds -> dictionary-based (eski sema)
 * 2. Obje + derivation.components -> bilesen formlarindan cozumleme (yeni sema)
 * 3. String / components yok -> greedy longest match
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
    components?: string[];
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

/**
 * Morfem formlarindaki ek tirelerini temizler: "-шхуэ" -> "шхуэ", "гъэ-" -> "гъэ".
 * Veri setinde 113 morfemin 53'u tire ile basliyor ve tireli formlar
 * oldugu gibi karsilastirildiginda hicbir zaman eslesmiyor.
 */
function stripAffixDashes(s: string): string {
  return (s || '').replace(/^[-–—]+/, '').replace(/[-–—]+$/, '');
}

// ============================================
// PARSER
// ============================================

export class MorphemeParser {
  private morphemes: Map<string, Morpheme>;
  private byForm: Map<string, Morpheme[]>;
  private byStrippedForm: Map<string, Morpheme[]>;

  constructor(morphemes: Morpheme[]) {
    this.morphemes = new Map(morphemes.map(m => [m.id, m]));
    this.byForm = new Map();
    this.byStrippedForm = new Map();
    for (const m of morphemes) {
      const form = m.form || '';
      if (!form) continue;
      if (!this.byForm.has(form)) {
        this.byForm.set(form, []);
      }
      this.byForm.get(form)!.push(m);

      const stripped = stripAffixDashes(form);
      if (stripped && stripped !== form) {
        if (!this.byStrippedForm.has(stripped)) {
          this.byStrippedForm.set(stripped, []);
        }
        this.byStrippedForm.get(stripped)!.push(m);
      }
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

    // 1) derivation.morphemeIds varsa onu kullan (eski sema)
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

    // 2) derivation.components varsa bilesenleri coz (yeni sema)
    const components = inp.derivation?.components;
    if (components?.length) {
      const sirali = this.orderComponents(components, inp.form);
      const morphemes: ParsedMorpheme[] = [];
      let position = 0;
      let matched = 0;

      for (const ref of sirali) {
        const m = this.findMorpheme(ref);
        if (m) {
          matched++;
          morphemes.push({
            morphemeId: m.id,
            form: m.form,
            type: this.normalizeType(m.type),
            gloss: m.gloss,
            position: position++,
          });
        } else {
          morphemes.push({
            morphemeId: null,
            form: stripAffixDashes(ref) || ref,
            type: 'unknown',
            position: position++,
          });
        }
      }

      // En az bir bilesen cozulebildiyse sozluk sonucunu dondur
      if (matched > 0) {
        return {
          lexemeId: inp.lexemeId,
          morphemes,
          method: 'dictionary',
          confidence: matched / morphemes.length,
        };
      }
      // Hicbiri cozulemedi -> greedy moda dus
    }

    // 3) Greedy longest match
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
        // Once tire temizlenmis formla dene (ör. "-шхуэ" morfemi "унэшхуэ" icinde)
        const affixMatch = this.matchStrippedPrefix(remaining);
        if (affixMatch) {
          morphemes.push({
            morphemeId: affixMatch.morpheme.id,
            form: affixMatch.morpheme.form,
            type: this.normalizeType(affixMatch.morpheme.type),
            gloss: affixMatch.morpheme.gloss,
            position: position++,
          });
          remaining = remaining.slice(affixMatch.length);
          continue;
        }

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

  /**
   * Bir referansi (morfem ID'si veya form) morfeme cevirir.
   * Sirayla: ID -> tam form -> tire temizlenmis form.
   */
  private findMorpheme(ref: string): Morpheme | null {
    const key = (ref || '').trim();
    if (!key) return null;

    const byId = this.morphemes.get(key);
    if (byId) return byId;

    const exact = this.byForm.get(key);
    if (exact?.length) return exact[0];

    const stripped = stripAffixDashes(key);
    if (!stripped) return null;

    const plain = this.byForm.get(stripped);
    if (plain?.length) return plain[0];

    const affix = this.byStrippedForm.get(stripped);
    if (affix?.length) return affix[0];

    return null;
  }

  /**
   * Tireli morfem formlarini, kalan metnin basinda arayarak eslestirir.
   * Greedy dal tireli formlari asla yakalayamadigi icin gerekli.
   */
  private matchStrippedPrefix(remaining: string): { morpheme: Morpheme; length: number } | null {
    let best: Morpheme | null = null;
    let bestLen = 0;
    for (const [stripped, morphs] of this.byStrippedForm) {
      if (remaining.startsWith(stripped) && stripped.length > bestLen) {
        best = morphs[0];
        bestLen = stripped.length;
      }
    }
    return best ? { morpheme: best, length: bestLen } : null;
  }

  /**
   * Bilesenleri, kelime icindeki yuzey sirasina gore dizer.
   * components listesi veri setinde ters sirada olabiliyor
   * (ör. гупсысэ -> ["псы", "гу"]). Formda bulunamayanlar sona atilir.
   */
  private orderComponents(components: string[], form: string): string[] {
    return components
      .map((c, i) => {
        const bare = stripAffixDashes(c);
        const pos = bare ? form.indexOf(bare) : -1;
        return { c, i, pos: pos === -1 ? Number.MAX_SAFE_INTEGER : pos };
      })
      .sort((a, b) => (a.pos - b.pos) || (a.i - b.i))
      .map(x => x.c);
  }
}
