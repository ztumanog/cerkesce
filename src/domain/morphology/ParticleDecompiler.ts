/**
 * ParticleDecompiler - Parcacik cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-017 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl7.pdf (Parcaciklar)
 *
 * Desteklenen parcacik tipleri:
 * - negative     : хъэуэ (hayir)
 * - affirmative  : ары (evet), хьуи (tamam)
 * - demonstrative: мис (iste), мес (iste - uzak)
 * - imperative   : йэуэ (hadi), адэ (pekistirme)
 * - intensive    : дэд (cok), нытIэ (pekistirme)
 * - bare
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type ParticleType =
  | 'negative'
  | 'affirmative'
  | 'demonstrative'
  | 'imperative'
  | 'intensive'
  | 'bare';

export interface ParticleResult {
  input: string;
  type: ParticleType;
  meaning: string;
  confidence: number;
}

interface ParticleEntry {
  form: string;
  type: ParticleType;
  meaning: string;
}

// ============================================
// PARCACIK SOZLUGU
// ============================================

const PARTICLES: ParticleEntry[] = [
  // Olumsuz
  { form: 'хъэуэ', type: 'negative', meaning: 'hayir' },
  { form: 'хьау', type: 'negative', meaning: 'hayir (varyant)' },

  // Olumlu
  { form: 'ары', type: 'affirmative', meaning: 'evet' },
  { form: 'хьуи', type: 'affirmative', meaning: 'tamam' },
  { form: 'хьуишъ', type: 'affirmative', meaning: 'tamam (varyant)' },
  { form: 'нтIэ', type: 'affirmative', meaning: 'evet (varyant)' },

  // Isaret
  { form: 'мис', type: 'demonstrative', meaning: 'iste' },
  { form: 'мес', type: 'demonstrative', meaning: 'iste (uzak)' },
  { form: 'мисри', type: 'demonstrative', meaning: 'iste (vurgu)' },
  { form: 'месри', type: 'demonstrative', meaning: 'iste (uzak vurgu)' },

  // Tesvik
  { form: 'йэуэ', type: 'imperative', meaning: 'hadi' },
  { form: 'йэу', type: 'imperative', meaning: 'hadi (varyant)' },
  { form: 'адэ', type: 'imperative', meaning: 'pekistirme' },

  // Pekiştirme
  { form: 'дэд', type: 'intensive', meaning: 'cok' },
  { form: 'дыдз', type: 'intensive', meaning: 'cok (varyant)' },
  { form: 'нытIэ', type: 'intensive', meaning: 'pekistirme' },
  { form: 'атIэ', type: 'intensive', meaning: 'pekistirme (varyant)' },
];

// ============================================
// DECOMPILER
// ============================================

export class ParticleDecompiler {
  /**
   * Bir parcacigi cozumler.
   */
  decompile(form: string): ParticleResult {
    const normalized = form.trim();

    if (!normalized) {
      return {
        input: '',
        type: 'bare',
        meaning: '',
        confidence: 0,
      };
    }

    const found = PARTICLES.find(p => p.form === normalized);
    if (found) {
      return {
        input: normalized,
        type: found.type,
        meaning: found.meaning,
        confidence: 1.0,
      };
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
  decompileBatch(forms: string[]): ParticleResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum parcaciklar.
   */
  getParticles(): string[] {
    return PARTICLES.map(p => p.form);
  }

  /**
   * Parcacik mi?
   */
  isParticle(form: string): boolean {
    return this.decompile(form).type !== 'bare';
  }

  /**
   * Anlamini doner.
   */
  getMeaning(form: string): string {
    return this.decompile(form).meaning;
  }

  /**
   * Olumsuz mu?
   */
  isNegative(form: string): boolean {
    return this.decompile(form).type === 'negative';
  }

  /**
   * Olumlu mu?
   */
  isAffirmative(form: string): boolean {
    return this.decompile(form).type === 'affirmative';
  }
}
