/**
 * NominalDerivationDecompiler - İsim türetim ekleri çözümlileyici
 * ADR-0040: Morphological Root Taxonomy
 */

import { norm } from './MorphemeParser';

export interface DerivationResult {
  meaningTr?: string;
  input: string;
  stem: string;
  suffix: string | null;
  derivationType: 'abstract' | 'magnificative' | 'diminutive' | 'nominalizer' | 'repetition' | 'bare';
  gloss: string | null;
  confidence: number;
}

interface DerivationRule {
  suffix: string;
  type: 'abstract' | 'magnificative' | 'diminutive' | 'nominalizer' | 'repetition';
  gloss: string;
}

const DERIVATION_RULES: DerivationRule[] = [
  { suffix: 'ныгъэ', type: 'abstract', gloss: 'Soyut İsim Eki (-ныгъэ)' },
  { suffix: 'ышхуэ', type: 'magnificative', gloss: 'Büyüklük Eki (-ышхуэ)' },
  { suffix: 'шхуэ', type: 'magnificative', gloss: 'Büyüklük Eki (-шхуэ)' },
  { suffix: 'цӀыкӀу', type: 'diminutive', gloss: 'Küçültme Eki (-цӀыкӀу)' },
  { suffix: 'гъэ', type: 'nominalizer', gloss: 'İsimleştirme Eki (-гъэ)' },
  { suffix: 'щӀэ', type: 'repetition', gloss: 'Yenilik / İkincil Ek (-щӀэ)' },
];

export class NominalDerivationDecompiler {
  parse(form: string): DerivationResult {
    const normalized = norm(form);

    if (!normalized) {
      return {
        input: '',
        stem: '',
        suffix: null,
        derivationType: 'bare',
        gloss: null,
        confidence: 0,
      };
    }

    for (const rule of DERIVATION_RULES) {
      const nSuf = norm(rule.suffix);
      if (normalized.endsWith(nSuf)) {
        const stem = normalized.slice(0, normalized.length - nSuf.length);
        if (stem.length >= 1) {
          return {
            input: normalized,
            stem,
            suffix: rule.suffix,
            derivationType: rule.type,
            gloss: rule.gloss,
            confidence: 0.9,
          };
        }
      }
    }

    return {
      input: normalized,
      stem: normalized,
      suffix: null,
      derivationType: 'bare',
      gloss: null,
      confidence: 0.5,
    };
  }
}