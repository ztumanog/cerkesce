/**
 * NounCaseParser - Isim durum eki cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-008 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl1.pdf (Isim Morfolojisi)
 *
 * Desteklenen durumlar:
 * - nominative           (-р)
 * - ergative             (-м)
 * - instrumental         (-кIэ)
 * - definite_instrumental (-мкIэ)
 * - adverbial            (-уэ)
 * - plural_nominative    (-хэр)
 * - plural_ergative      (-хэм)
 * - plural_instrumental  (-хэмкIэ)
 * - plural_adverbial     (-хэу)
 * - bare                 (ek yok)
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type NounCase =
  | 'nominative'
  | 'ergative'
  | 'instrumental'
  | 'definite_instrumental'
  | 'adverbial'
  | 'plural_nominative'
  | 'plural_ergative'
  | 'plural_instrumental'
  | 'plural_adverbial'
  | 'bare';

export interface NounCaseResult {
  input: string;
  case: NounCase;
  stem: string;
  suffix: string;
  isPlural: boolean;
  isDefinite: boolean;
  confidence: number;
}

interface CaseRule {
  suffix: string;
  case: NounCase;
  isPlural: boolean;
  isDefinite: boolean;
}

// ============================================
// DURUM EKI KURALLARI
// ============================================
// SIRA ONEMLI: En uzun ekten en kisaya dogru.

const CASE_RULES: CaseRule[] = [
  // Cogul + instrumental (en uzun)
  { suffix: 'хэмкIэ', case: 'plural_instrumental', isPlural: true, isDefinite: true },
  // Cogul + ergative / nominative / adverbial
  { suffix: 'хэм', case: 'plural_ergative', isPlural: true, isDefinite: true },
  { suffix: 'хэр', case: 'plural_nominative', isPlural: true, isDefinite: true },
  { suffix: 'хэу', case: 'plural_adverbial', isPlural: true, isDefinite: false },
  // Tekil + instrumental (Kabardeyce: -кIэ ve -чIэ varyantlari)
  { suffix: 'мкIэ', case: 'definite_instrumental', isPlural: false, isDefinite: true },
  { suffix: 'мчIэ', case: 'definite_instrumental', isPlural: false, isDefinite: true },
  { suffix: 'кIэ', case: 'instrumental', isPlural: false, isDefinite: false },
  { suffix: 'чIэ', case: 'instrumental', isPlural: false, isDefinite: false },
  // Tekil + adverbial
  { suffix: 'уэ', case: 'adverbial', isPlural: false, isDefinite: false },
  // Tekil + ergative / nominative
  { suffix: 'м', case: 'ergative', isPlural: false, isDefinite: true },
  { suffix: 'р', case: 'nominative', isPlural: false, isDefinite: true },
];

// ============================================
// PARSER
// ============================================

export class NounCaseParser {
  /**
   * Bir isim formunu cozumler.
   */
  parse(form: string): NounCaseResult {
    const normalized = form.trim();

    // Bos form
    if (!normalized) {
      return {
        input: '',
        case: 'bare',
        stem: '',
        suffix: '',
        isPlural: false,
        isDefinite: false,
        confidence: 0,
      };
    }

    // Sira onemli: en uzun ekten en kisaya dogru
    for (const rule of CASE_RULES) {
      if (normalized.endsWith(rule.suffix)) {
        const stem = normalized.slice(0, normalized.length - rule.suffix.length);
        // Kok bos kalmasin (yanlis eslesmeyi onle)
        if (stem.length === 0) continue;

        return {
          input: normalized,
          case: rule.case,
          stem,
          suffix: rule.suffix,
          isPlural: rule.isPlural,
          isDefinite: rule.isDefinite,
          confidence: 0.9,
        };
      }
    }

    // Hicbir ek uymadi -> bare
    return {
      input: normalized,
      case: 'bare',
      stem: normalized,
      suffix: '',
      isPlural: false,
      isDefinite: false,
      confidence: 0.5,
    };
  }

  /**
   * Toplu cozumleme.
   */
  parseBatch(forms: string[]): NounCaseResult[] {
    return forms.map(f => this.parse(f));
  }

  /**
   * Cogul mu?
   */
  isPlural(form: string): boolean {
    return this.parse(form).isPlural;
  }

  /**
   * Belirli mi?
   */
  isDefinite(form: string): boolean {
    return this.parse(form).isDefinite;
  }

  /**
   * Bilinen tum durumlar.
   */
  getCases(): NounCase[] {
    return [
      'nominative',
      'ergative',
      'instrumental',
      'definite_instrumental',
      'adverbial',
      'plural_nominative',
      'plural_ergative',
      'plural_instrumental',
      'plural_adverbial',
      'bare',
    ];
  }
}
