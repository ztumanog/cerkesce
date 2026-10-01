/**
 * ParticipleDecompiler - Partisip cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-013 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl5.pdf (Partisipler)
 *
 * Desteklenen partisip tipleri:
 * - general  : -р   (кIуэр, giden)
 * - perfect  : -гъэ (кIуагъэ, gitmis)
 * - static   : -щ   (шыщ, oturan)
 * - bare
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type ParticipleType =
  | 'general'
  | 'perfect'
  | 'static'
  | 'bare';

export interface ParticipleResult {
  input: string;
  type: ParticipleType;
  stem: string;
  suffix: string;
  confidence: number;
}

interface ParticipleRule {
  suffix: string;
  type: ParticipleType;
}

// ============================================
// PARTISIP KURALLARI
// ============================================
// SIRA ONEMLI: En uzun ekten en kisaya dogru.

const PARTICIPLE_RULES: ParticipleRule[] = [
  // Perfect (-гъэ)
  { suffix: 'гъэ', type: 'perfect' },
  // General (-р)
  { suffix: 'р', type: 'general' },
  // Static (-щ)
  { suffix: 'щ', type: 'static' },
];

// ============================================
// DECOMPILER
// ============================================

export class ParticipleDecompiler {
  /**
   * Bir partisipi cozumler.
   */
  decompile(form: string): ParticipleResult {
    const normalized = form.trim();

    if (!normalized) {
      return {
        input: '',
        type: 'bare',
        stem: '',
        suffix: '',
        confidence: 0,
      };
    }

    // Sira onemli: en uzun ekten en kisaya
    for (const rule of PARTICIPLE_RULES) {
      if (normalized.endsWith(rule.suffix)) {
        const stem = normalized.slice(0, normalized.length - rule.suffix.length);
        // Kok bos kalmasin
        if (stem.length < 2) continue;

        return {
          input: normalized,
          type: rule.type,
          stem,
          suffix: rule.suffix,
          confidence: 0.85,
        };
      }
    }

    // Hicbir ek uymadi -> bare
    return {
      input: normalized,
      type: 'bare',
      stem: normalized,
      suffix: '',
      confidence: 0.5,
    };
  }

  /**
   * Toplu cozumleme.
   */
  decompileBatch(forms: string[]): ParticipleResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum partisip tipleri.
   */
  getTypes(): ParticipleType[] {
    return ['general', 'perfect', 'static', 'bare'];
  }

  /**
   * Genel partisip mi?
   */
  isGeneral(form: string): boolean {
    return this.decompile(form).type === 'general';
  }

  /**
   * Perfekt partisip mi?
   */
  isPerfect(form: string): boolean {
    return this.decompile(form).type === 'perfect';
  }

  /**
   * Statik partisip mi?
   */
  isStatic(form: string): boolean {
    return this.decompile(form).type === 'static';
  }
}
