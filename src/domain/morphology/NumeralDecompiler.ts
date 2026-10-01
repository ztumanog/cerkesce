/**
 * NumeralDecompiler - Sayi cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-011 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl3.pdf (Sayilar)
 *
 * Desteklenen sayi tipleri:
 * - cardinal     : зы (1), тIу (2), щы (3)...
 * - ordinal      : япэ (birinci), етIуанэ (ikinci)...
 * - fractional   : щанэ (ucte bir), ханэ (altida bir)...
 * - distributive : зырыз (birer), тIурытIу (ikiser)...
 * - bare
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type NumeralType =
  | 'cardinal'
  | 'ordinal'
  | 'fractional'
  | 'distributive'
  | 'bare';

export interface NumeralResult {
  input: string;
  type: NumeralType;
  value?: number;
  stem: string;
  suffix: string;
  confidence: number;
}

interface CardinalEntry {
  form: string;
  value: number;
}

// ============================================
// ASAL SAYILAR (cardinal)
// ============================================

const CARDINALS: CardinalEntry[] = [
  { form: 'зы', value: 1 },
  { form: 'тIу', value: 2 },
  { form: 'щы', value: 3 },
  { form: 'пIлIы', value: 4 },
  { form: 'тху', value: 5 },
  { form: 'хы', value: 6 },
  { form: 'блы', value: 7 },
  { form: 'и', value: 8 },
  { form: 'бгъу', value: 9 },
  { form: 'пIщIы', value: 10 },
  { form: 'тIошI', value: 20 },
  { form: 'щэ', value: 100 },
];

// ============================================
// SIRA SAYILARI (ordinal)
// ============================================

const ORDINALS: string[] = [
  'япэ',
  'етIуанэ',
  'ещанэ',
  'еплIанэ',
  'етхуанэ',
  'еханэ',
  'ебланэ',
  'еианэ',
  'ебгъуанэ',
  'епщIанэ',
];

// ============================================
// KESIR SAYILARI (fractional)
// ============================================

const FRACTIONALS: string[] = [
  'щанэ',
  'плIанэ',
  'тхуанэ',
  'ханэ',
  'бланэ',
  'ианэ',
  'бгъуанэ',
  'пщIанэ',
];

// ============================================
// ULCESTIRME SAYILARI (distributive)
// ============================================

const DISTRIBUTIVES: string[] = [
  'зырыз',
  'тIурытIу',
  'щырыщ',
  'плIырыплI',
  'тхурытху',
  'хырых',
  'блырыбл',
  'ирыи',
  'бгъурыбгъу',
  'пщIырыпщI',
];

// ============================================
// DECOMPILER
// ============================================

export class NumeralDecompiler {
  /**
   * Bir sayiyi cozumler.
   */
  decompile(form: string): NumeralResult {
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

    // 1. Asal sayi (cardinal)
    const cardinal = CARDINALS.find(c => c.form === normalized);
    if (cardinal) {
      return {
        input: normalized,
        type: 'cardinal',
        value: cardinal.value,
        stem: normalized,
        suffix: '',
        confidence: 1.0,
      };
    }

    // 2. Sira sayisi (ordinal)
    if (ORDINALS.includes(normalized)) {
      return {
        input: normalized,
        type: 'ordinal',
        stem: normalized,
        suffix: '',
        confidence: 0.9,
      };
    }

    // 3. Kesir sayisi (fractional)
    if (FRACTIONALS.includes(normalized)) {
      return {
        input: normalized,
        type: 'fractional',
        stem: normalized,
        suffix: '',
        confidence: 0.9,
      };
    }

    // 4. Ulestirme sayisi (distributive)
    if (DISTRIBUTIVES.includes(normalized)) {
      return {
        input: normalized,
        type: 'distributive',
        stem: normalized,
        suffix: '',
        confidence: 0.9,
      };
    }

    // 5. Bilinmeyen
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
  decompileBatch(forms: string[]): NumeralResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum sayi tipleri.
   */
  getTypes(): NumeralType[] {
    return ['cardinal', 'ordinal', 'fractional', 'distributive', 'bare'];
  }

  /**
   * Asal sayi mi?
   */
  isCardinal(form: string): boolean {
    return this.decompile(form).type === 'cardinal';
  }

  /**
   * Sira sayisi mi?
   */
  isOrdinal(form: string): boolean {
    return this.decompile(form).type === 'ordinal';
  }

  /**
   * Kesir sayisi mi?
   */
  isFractional(form: string): boolean {
    return this.decompile(form).type === 'fractional';
  }

  /**
   * Ulestirme sayisi mi?
   */
  isDistributive(form: string): boolean {
    return this.decompile(form).type === 'distributive';
  }

  /**
   * Sayi degerini doner.
   */
  getValue(form: string): number | undefined {
    return this.decompile(form).value;
  }
}
