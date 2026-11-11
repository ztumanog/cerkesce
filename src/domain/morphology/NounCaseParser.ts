/**
 * NounCaseParser - Isim durum eki cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 */

import { norm } from './MorphemeParser';

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

const CASE_RULES: CaseRule[] = [
  { suffix: 'хэмкӀэ', case: 'plural_instrumental', isPlural: true, isDefinite: true },
  { suffix: 'хэм', case: 'plural_ergative', isPlural: true, isDefinite: true },
  { suffix: 'хэр', case: 'plural_nominative', isPlural: true, isDefinite: true },
  { suffix: 'хэу', case: 'plural_adverbial', isPlural: true, isDefinite: false },
  { suffix: 'мкӀэ', case: 'definite_instrumental', isPlural: false, isDefinite: true },
  { suffix: 'мчӀэ', case: 'definite_instrumental', isPlural: false, isDefinite: true },
  { suffix: 'кӀэ', case: 'instrumental', isPlural: false, isDefinite: false },
  { suffix: 'чӀэ', case: 'instrumental', isPlural: false, isDefinite: false },
  { suffix: 'уэ', case: 'adverbial', isPlural: false, isDefinite: false },
  { suffix: 'м', case: 'ergative', isPlural: false, isDefinite: true },
  { suffix: 'р', case: 'nominative', isPlural: false, isDefinite: true },
];

const DERIVATIONAL_ENDINGS = ['шхуэ', 'ышхуэ', 'цӀыкӀу', 'ныгъэ', 'гъэ', 'щӀэ'];

export class NounCaseParser {
  parse(form: string): NounCaseResult {
    const normalized = norm(form);

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

    // Türetim ekiyle bitip üzerine çekim eki almamış kelimeleri 'bare' tut
    for (const dSuf of DERIVATIONAL_ENDINGS) {
      if (normalized.endsWith(norm(dSuf))) {
        return {
          input: normalized,
          case: 'bare',
          stem: normalized,
          suffix: '',
          isPlural: false,
          isDefinite: false,
          confidence: 0.9,
        };
      }
    }

    for (const rule of CASE_RULES) {
      const nSuffix = norm(rule.suffix);
      if (normalized.endsWith(nSuffix)) {
        const stem = normalized.slice(0, normalized.length - nSuffix.length);
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

  parseBatch(forms: string[]): NounCaseResult[] {
    return forms.map(f => this.parse(f));
  }

  isPlural(form: string): boolean {
    return this.parse(form).isPlural;
  }

  isDefinite(form: string): boolean {
    return this.parse(form).isDefinite;
  }

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