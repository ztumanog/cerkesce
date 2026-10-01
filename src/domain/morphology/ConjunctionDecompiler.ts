/**
 * ConjunctionDecompiler - Baglac cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-016 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl7.pdf (Baglaclar)
 *
 * Desteklenen baglac tipleri:
 * - coordinating : и (ve), -рэ (ve), -и (ve)
 * - correlative  : зы... зы (ne... ne)
 * - subordinating: -мэ (egеr), сыту (cunku)
 * - adversative  : ауэ (ama), щхьэкIэ (fakat)
 * - bare
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type ConjunctionType =
  | 'coordinating'
  | 'correlative'
  | 'subordinating'
  | 'adversative'
  | 'bare';

export interface ConjunctionResult {
  input: string;
  type: ConjunctionType;
  meaning: string;
  confidence: number;
}

interface ConjunctionEntry {
  form: string;
  type: ConjunctionType;
  meaning: string;
}

// ============================================
// BAGLAC SOZLUGU
// ============================================

const CONJUNCTIONS: ConjunctionEntry[] = [
  // Koordine eden
  { form: 'и', type: 'coordinating', meaning: 've' },
  { form: 'рэ', type: 'coordinating', meaning: 've' },
  { form: 'и', type: 'coordinating', meaning: 've (vurgu)' },

  // Korelatif
  { form: 'зы', type: 'correlative', meaning: 'ne... ne' },

  // Alt siralayan
  { form: 'мэ', type: 'subordinating', meaning: 'egеr' },
  { form: 'сыту', type: 'subordinating', meaning: 'cunku' },
  { form: 'сыт', type: 'subordinating', meaning: 'cunku (varyant)' },

  // Karsitlik
  { form: 'ауэ', type: 'adversative', meaning: 'ama' },
  { form: 'щхьэкIэ', type: 'adversative', meaning: 'fakat' },
  { form: 'атIэ', type: 'adversative', meaning: 'ama (varyant)' },
];

// ============================================
// DECOMPILER
// ============================================

export class ConjunctionDecompiler {
  /**
   * Bir baglaci cozumler.
   */
  decompile(form: string): ConjunctionResult {
    const normalized = form.trim();

    if (!normalized) {
      return {
        input: '',
        type: 'bare',
        meaning: '',
        confidence: 0,
      };
    }

    const found = CONJUNCTIONS.find(c => c.form === normalized);
    if (found) {
      return {
        input: normalized,
        type: found.type,
        meaning: found.meaning,
        confidence: 1.0,
      };
    }

    // Suffix baglaclar (-рэ, -и, -мэ) — sona bakar
    const suffixConjunctions = [
      { suffix: 'рэ', type: 'coordinating' as ConjunctionType, meaning: 've' },
      { suffix: 'мэ', type: 'subordinating' as ConjunctionType, meaning: 'egеr' },
    ];

    for (const sc of suffixConjunctions) {
      if (normalized.endsWith(sc.suffix) && normalized.length > sc.suffix.length) {
        return {
          input: normalized,
          type: sc.type,
          meaning: sc.meaning,
          confidence: 0.7,
        };
      }
    }

    // Bilinmeyen
    return {
      input: normalized,
      type: 'bare',
      meaning: '',
      confidence: 0.5,
    };
  }

  /**
   * Toplu cozumleme.
   */
  decompileBatch(forms: string[]): ConjunctionResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum baglaclar.
   */
  getConjunctions(): string[] {
    return CONJUNCTIONS.map(c => c.form);
  }

  /**
   * Baglac mi?
   */
  isConjunction(form: string): boolean {
    const r = this.decompile(form);
    return r.type !== 'bare';
  }

  /**
   * Anlamini doner.
   */
  getMeaning(form: string): string {
    return this.decompile(form).meaning;
  }
}
