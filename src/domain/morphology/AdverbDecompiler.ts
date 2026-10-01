/**
 * AdverbDecompiler - Zarf cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-014 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl6.pdf (Zarflar)
 *
 * Desteklenen zarf tipleri:
 * - general  : -уэ, -у   (дахэуэ, guzelce)
 * - place    : -нэ        (дэнэ, nerede)
 * - time     : -щ         (zaman zarfi)
 * - bare
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type AdverbType =
  | 'general'
  | 'place'
  | 'time'
  | 'bare';

export interface AdverbResult {
  input: string;
  type: AdverbType;
  stem: string;
  suffix: string;
  confidence: number;
}

interface AdverbRule {
  suffix: string;
  type: AdverbType;
}

// ============================================
// ZARF KURALLARI
// ============================================
// SIRA ONEMLI: En uzun ekten en kisaya dogru.

const ADVERB_RULES: AdverbRule[] = [
  // Yer zarfi (-нэ)
  { suffix: 'нэ', type: 'place' },
  // Genel zarf (-уэ)
  { suffix: 'уэ', type: 'general' },
  // Genel zarf (-у)
  { suffix: 'у', type: 'general' },
  // Zaman zarfi (-щ)
  { suffix: 'щ', type: 'time' },
];

// ============================================
// DECOMPILER
// ============================================

export class AdverbDecompiler {
  /**
   * Bir zarfi cozumler.
   */
  decompile(form: string): AdverbResult {
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
    for (const rule of ADVERB_RULES) {
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
  decompileBatch(forms: string[]): AdverbResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum zarf tipleri.
   */
  getTypes(): AdverbType[] {
    return ['general', 'place', 'time', 'bare'];
  }

  /**
   * Genel zarf mi?
   */
  isGeneral(form: string): boolean {
    return this.decompile(form).type === 'general';
  }

  /**
   * Yer zarfi mi?
   */
  isPlace(form: string): boolean {
    return this.decompile(form).type === 'place';
  }

  /**
   * Zaman zarfi mi?
   */
  isTime(form: string): boolean {
    return this.decompile(form).type === 'time';
  }
}
