/**
 * PossessivePrefixDecompiler - Iyelik onekleri cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 */

import { norm } from './MorphemeParser';

export type PossessivePerson =
  | '1sg'
  | '2sg'
  | '3sg'
  | '1pl'
  | '2pl'
  | '3pl';

export interface PossessivePrefix {
  prefix: string;
  person: PossessivePerson;
  meaningTr: string;
}

export interface PossessiveResult {
  input: string;
  prefix: string | null;
  person: PossessivePerson | null;
  meaningTr: string | null;
  stem: string;
  method: 'exact' | 'prefix' | 'bare' | 'fallback';
  confidence: number;
}

const POSSESSIVE_PREFIXES: PossessivePrefix[] = [
  { prefix: 'си', person: '1sg', meaningTr: 'benim' },
  { prefix: 'уи', person: '2sg', meaningTr: 'senin' },
  { prefix: 'и',  person: '3sg', meaningTr: 'onun' },
  { prefix: 'ди', person: '1pl', meaningTr: 'bizim' },
  { prefix: 'фи', person: '2pl', meaningTr: 'sizin' },
  { prefix: 'я',  person: '3pl', meaningTr: 'onların' },
];

export class PossessivePrefixDecompiler {
  decompile(form: string): PossessiveResult {
    const normalized = norm(form);

    if (!normalized) {
      return {
        input: '',
        prefix: null,
        person: null,
        meaningTr: null,
        stem: '',
        method: 'fallback',
        confidence: 0,
      };
    }

    // 1. Boşlukla ayrılmış form: "си унэ"
    const parts = normalized.split(/\s+/);
    if (parts.length === 2) {
      const [first, second] = parts;
      const match = POSSESSIVE_PREFIXES.find(p => norm(p.prefix) === first);
      if (match) {
        return {
          input: normalized,
          prefix: match.prefix,
          person: match.person,
          meaningTr: match.meaningTr,
          stem: second,
          method: 'exact',
          confidence: 1.0,
        };
      }
    }

    // 2. Bitişik form: "сиунэ"
    const sortedPrefixes = [...POSSESSIVE_PREFIXES].sort(
      (a, b) => b.prefix.length - a.prefix.length
    );

    for (const p of sortedPrefixes) {
      const nPrefix = norm(p.prefix);
      if (normalized.startsWith(nPrefix)) {
        const stem = normalized.slice(nPrefix.length);
        if (nPrefix.length === 1 && stem.length < 2) {
          continue;
        }
        if (stem.length > 0) {
          return {
            input: normalized,
            prefix: p.prefix,
            person: p.person,
            meaningTr: p.meaningTr,
            stem,
            method: 'prefix',
            confidence: 0.85,
          };
        }
      }
    }

    return {
      input: normalized,
      prefix: null,
      person: null,
      meaningTr: null,
      stem: normalized,
      method: 'bare',
      confidence: 0.5,
    };
  }

  decompileBatch(forms: string[]): PossessiveResult[] {
    return forms.map(f => this.decompile(f));
  }

  hasPossessivePrefix(form: string): boolean {
    return this.decompile(form).prefix !== null;
  }

  isBare(form: string): boolean {
    return this.decompile(form).method === 'bare';
  }

  getPrefixes(): PossessivePrefix[] {
    return [...POSSESSIVE_PREFIXES];
  }
}