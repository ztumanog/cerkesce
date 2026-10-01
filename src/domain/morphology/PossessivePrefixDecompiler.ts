/**
 * PossessivePrefixDecompiler - Iyelik onekleri cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-006 - Morphology Engine
 *
 * Kabardeyce iyelik onekleri:
 * - си-  (1sg) benim
 * - уи-  (2sg) senin
 * - и-   (3sg) onun
 * - ди-  (1pl) bizim
 * - фи-  (2pl) sizin
 * - я-   (3pl) onlarin
 *
 * Ornekler:
 * - си унэ  -> benim ev
 * - уи унэ  -> senin ev
 * - и унэ   -> onun ev
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

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

// ============================================
// IYELIK ONEKLERI
// ============================================

const POSSESSIVE_PREFIXES: PossessivePrefix[] = [
  { prefix: 'си', person: '1sg', meaningTr: 'benim' },
  { prefix: 'уи', person: '2sg', meaningTr: 'senin' },
  { prefix: 'и',  person: '3sg', meaningTr: 'onun' },
  { prefix: 'ди', person: '1pl', meaningTr: 'bizim' },
  { prefix: 'фи', person: '2pl', meaningTr: 'sizin' },
  { prefix: 'я',  person: '3pl', meaningTr: 'onlarin' },
];

// ============================================
// DECOMPILER
// ============================================

export class PossessivePrefixDecompiler {
  /**
   * Iyelik onekini cozumler.
   *
   * "си унэ" -> prefix: си, person: 1sg, stem: унэ
   * "сиунэ"  -> prefix: си, person: 1sg, stem: унэ
   */
  decompile(form: string): PossessiveResult {
    const normalized = form.trim();

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

    // 1. Boslukla ayrilmis form: "си унэ"
    const parts = normalized.split(/\s+/);
    if (parts.length === 2) {
      const [first, second] = parts;
      const match = POSSESSIVE_PREFIXES.find(p => p.prefix === first);
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

    // 2. Bitisik form: "сиунэ" — en uzun onek once
    const sortedPrefixes = [...POSSESSIVE_PREFIXES].sort(
      (a, b) => b.prefix.length - a.prefix.length
    );

    for (const p of sortedPrefixes) {
      if (normalized.startsWith(p.prefix)) {
        const stem = normalized.slice(p.prefix.length);
        // Tek karakterli "и" ve "я" onekleri icin stem kontrolu
        if (p.prefix.length === 1 && stem.length < 2) {
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

    // 3. Bare form (onek yok) — INHERENT_DEFINITE_BARE
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

  /**
   * Toplu cozumleme.
   */
  decompileBatch(forms: string[]): PossessiveResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Iyelik oneki var mi?
   */
  hasPossessivePrefix(form: string): boolean {
    return this.decompile(form).prefix !== null;
  }

  /**
   * Bare form mu? (INHERENT_DEFINITE_BARE)
   */
  isBare(form: string): boolean {
    return this.decompile(form).method === 'bare';
  }

  /**
   * Bilinen tum onekleri doner.
   */
  getPrefixes(): PossessivePrefix[] {
    return [...POSSESSIVE_PREFIXES];
  }
}
