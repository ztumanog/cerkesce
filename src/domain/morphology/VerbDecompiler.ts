/**
 * VerbDecompiler - Fiil onek cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-012 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl4.pdf (Fiil yapisi)
 *
 * 7 Onek Sirasi:
 * 1. Reflexive   : зы-
 * 2. Directional : къы-
 * 3. Version     : ху- / зды-
 * 4. Comitative  : дэ-
 * 5. Locative    : хэ- / щIэ-
 * 6. Causative   : гъэ-
 * 7. Factitive   : уы- / гъэ-
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type PrefixSlot =
  | 'reflexive'
  | 'directional'
  | 'version'
  | 'comitative'
  | 'locative'
  | 'causative'
  | 'factitive';

export interface ParsedPrefix {
  slot: PrefixSlot;
  form: string;
  position: number;
}

export interface VerbResult {
  input: string;
  prefixes: ParsedPrefix[];
  root: string;
  prefixCount: number;
  method: 'exact' | 'partial' | 'fallback';
  confidence: number;
}

// ============================================
// ONEK TABLOSU
// ============================================

const PREFIX_TABLE: Array<{ slot: PrefixSlot; forms: string[] }> = [
  { slot: 'reflexive',   forms: ['зы'] },
  { slot: 'directional', forms: ['къы', 'къэ'] },
  { slot: 'version',     forms: ['ху', 'зды', 'фIэ'] },
  { slot: 'comitative',  forms: ['дэ', 'ды'] },
  { slot: 'locative',    forms: ['хэ', 'щIэ', 'и'] },
  { slot: 'causative',   forms: ['гъэ', 'гъа'] },
  { slot: 'factitive',   forms: ['уы', 'Iу'] },
];

// ============================================
// DECOMPILER
// ============================================

export class VerbDecompiler {
  /**
   * Bir fiili cozumler.
   * Onek sirasini takip eder (slot 1'den 7'ye).
   */
  decompile(form: string): VerbResult {
    const normalized = form.trim();

    if (!normalized) {
      return {
        input: '',
        prefixes: [],
        root: '',
        prefixCount: 0,
        method: 'fallback',
        confidence: 0,
      };
    }

    let remaining = normalized;
    const prefixes: ParsedPrefix[] = [];
    let position = 1;

    // Her slot icin sirayla kontrol
    for (const { slot, forms } of PREFIX_TABLE) {
      let matched = false;

      for (const prefixForm of forms) {
        if (remaining.startsWith(prefixForm)) {
          const stem = remaining.slice(prefixForm.length);
          // Kok bos kalmasin
          if (stem.length < 2) continue;

          prefixes.push({
            slot,
            form: prefixForm,
            position: position++,
          });
          remaining = stem;
          matched = true;
          break;
        }
      }

      // Slot atlanabilir
      if (!matched) continue;
    }

    // Kalan = root
    const root = remaining;

    if (prefixes.length > 0) {
      return {
        input: normalized,
        prefixes,
        root,
        prefixCount: prefixes.length,
        method: 'partial',
        confidence: 0.85,
      };
    }

    // Hicbir onek uymadi -> bare
    return {
      input: normalized,
      prefixes: [],
      root: normalized,
      prefixCount: 0,
      method: 'fallback',
      confidence: 0.5,
    };
  }

  /**
   * Toplu cozumleme.
   */
  decompileBatch(forms: string[]): VerbResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Onek sayisini doner.
   */
  getPrefixCount(form: string): number {
    return this.decompile(form).prefixCount;
  }

  /**
   * Belirli bir slot var mi?
   */
  hasSlot(form: string, slot: PrefixSlot): boolean {
    return this.decompile(form).prefixes.some(p => p.slot === slot);
  }

  /**
   * Tum slotlari doner.
   */
  getSlots(): PrefixSlot[] {
    return ['reflexive', 'directional', 'version', 'comitative', 'locative', 'causative', 'factitive'];
  }
}
