/**
 * VerbDecompiler - Fiil onek cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-012 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl4.pdf (Fiil yapisi)
 *
 * 8 Onek Sirasi:
 * 0. Person      : сы- / фы- / у-   (kisi oneki, en basta)
 * 1. Reflexive   : зы-
 * 2. Directional : къы- / къэ-
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
  | 'person'
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
  // Kisi onekleri: 1SG сы-, 2PL фы-, 2SG у-, 1PL ды-
  { slot: 'person',      forms: ['сы', 'фы', 'ды', 'у'] },
  { slot: 'reflexive',   forms: ['зы', 'зэ'] },
  { slot: 'directional', forms: ['къы', 'къэ', 'нэ'] },
  { slot: 'version',     forms: ['ху', 'хуэ', 'зды', 'фIэ', 'фI', 'уи', 'си', 'ди', 'фи', 'я'] },
  { slot: 'comitative',  forms: ['дэ', 'ды', 'зэ'] },
  { slot: 'locative',    forms: ['кIэры', 'бгъэдэ', 'бгъуры', 'те', 'щIэ', 'хэ', 'дэ', 'и', 'блэ', 'пы', 'Iу', 'щы', 'бжьа', 'бжьы', 'кIэкъыдэ', 'кIэкъылэ', 'гуэ', 'тыр'] },
  { slot: 'causative',   forms: ['гъэ', 'гъа', 'гъ'] },
  { slot: 'factitive',   forms: ['уы', 'Iу', 'и'] },
];

// ============================================
// DECOMPILER
// ============================================

export class VerbDecompiler {
  private knownRoots: Set<string>;
  private strict: boolean;

  constructor(knownRoots: Set<string> = new Set(), strict: boolean = false) {
    this.knownRoots = knownRoots;
    this.strict = strict;
  }
  /**
   * Bir fiili cozumler.
   * Onek sirasini takip eder (slot 0'dan 7'ye).
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

    // Her slot icin sirayla kontrol (slot atlanabilir)
    for (const { slot, forms } of PREFIX_TABLE) {
      for (const prefixForm of forms) {
        if (remaining.startsWith(prefixForm)) {
          const stem = remaining.slice(prefixForm.length);
          // Kok bos kalmasin
          if (stem.length < 2) continue;

          // strict modda: kalan parca gercek bir kok olmali
          if (this.strict && this.knownRoots.size > 0 && !this.knownRoots.has(stem)) {
            continue;
          }

          prefixes.push({
            slot,
            form: prefixForm,
            position: position++,
          });
          remaining = stem;
          break;
        }
      }
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
    return ['person', 'reflexive', 'directional', 'version', 'comitative', 'locative', 'causative', 'factitive'];
  }
}