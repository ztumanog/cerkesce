/**
 * NominalDerivationDecompiler - Isim turetme eki cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-009 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl1.pdf (Isim Morfolojisi, s.51-67)
 *
 * Desteklenen turetme ekleri:
 * - -гъэ  (abstract)  : лIыгъэ (cesaret)
 * - -кIуэ (agent)     : кIуэгъуэ (gitme zamani)
 * - -гъу  (companion) : ныбжьэгъу (arkadas)
 * - -пIэ  (place)     : тIысыпIэ (oturma yeri)
 * - -щ    (quality)   : лъэщ (guclu)
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type DerivationType =
  | 'abstract'
  | 'agent'
  | 'time'
  | 'companion'
  | 'place'
  | 'quality'
  | 'bare';

export interface DerivationResult {
  input: string;
  type: DerivationType;
  stem: string;
  suffix: string;
  confidence: number;
}

interface DerivationRule {
  suffix: string;
  type: DerivationType;
}

// ============================================
// TURETME EKI KURALLARI
// ============================================
// SIRA ONEMLI: En uzun ekten en kisaya dogru.

const DERIVATION_RULES: DerivationRule[] = [
  // Time (-гъуэ) — ONCE (cunku -гъу ile karisir)
  { suffix: 'гъуэ', type: 'time' },
  // Companion (-гъу)
  { suffix: 'гъу', type: 'companion' },
  // Agent (-кIуэ)
  { suffix: 'кIуэ', type: 'agent' },
  // Abstract (-гъэ)
  { suffix: 'гъэ', type: 'abstract' },
  // Place (-пIэ)
  { suffix: 'пIэ', type: 'place' },
  // Quality (-щ)
  { suffix: 'щ', type: 'quality' },
];

// ============================================
// DECOMPILER
// ============================================

export class NominalDerivationDecompiler {
  /**
   * Bir isim turetme ekini cozumler.
   */
  decompile(form: string): DerivationResult {
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
    for (const rule of DERIVATION_RULES) {
      if (normalized.endsWith(rule.suffix)) {
        const stem = normalized.slice(0, normalized.length - rule.suffix.length);
        // Kok bos kalmasin
        if (stem.length === 0) continue;

        return {
          input: normalized,
          type: rule.type,
          stem,
          suffix: rule.suffix,
          confidence: 0.9,
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
  decompileBatch(forms: string[]): DerivationResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum turetme tipleri.
   */
  getTypes(): DerivationType[] {
    return ['abstract', 'agent', 'time', 'companion', 'place', 'quality', 'bare'];
  }

  /**
   * Soyut isim mi?
   */
  isAbstract(form: string): boolean {
    return this.decompile(form).type === 'abstract';
  }

  /**
   * Yer/araci mi?
   */
  isAgent(form: string): boolean {
    return this.decompile(form).type === 'agent';
  }

  /**
   * Zaman mi?
   */
  isTime(form: string): boolean {
    return this.decompile(form).type === 'time';
  }

  /**
   * Ortak mi?
   */
  isCompanion(form: string): boolean {
    return this.decompile(form).type === 'companion';
  }
}
