/**
 * RootClassifier - Kabardeyce kok siniflandirmasi
 * ADR-0040: Morphological Root Taxonomy
 *
 * Kokleri 4 tipe ayirir:
 * - FREE: Tek basina gorunur
 * - BOUND: Tek basina gorunmez (onek/sonek alir)
 * - NEUTRAL: Baglama gore degisir
 * - STABLE: Kararli, degismez
 *
 * Referans: Kumakhov, gl4.pdf
 */

export type RootType = 'FREE' | 'BOUND' | 'NEUTRAL' | 'STABLE';

export interface RootClassification {
  form: string;
  type: RootType;
  confidence: number;
  reason: string;
}

/**
 * Bilinen bound root'lar (Kumakhov gl4.pdf)
 */
const KNOWN_BOUND_ROOTS = [
  '-сы',
  '-лъы',
  '-ты',
  '-гъы',
  '-къIэ',
  '-щIэ',
  '-пIэ',
  '-кIэ',
];

/**
 * Bilinen stabil root'lar
 */
const KNOWN_STABLE_ROOTS = [
  'гу',
  'нэ',
  'псы',
  'щхьэ',
  'лъэ',
  'фэ',
];

export class RootClassifier {
  /**
   * Bir kokun tipini belirler.
   */
  classify(form: string): RootClassification {
    const normalized = form.trim();

    if (!normalized) {
      return {
        form: '',
        type: 'NEUTRAL',
        confidence: 0,
        reason: 'Bos form',
      };
    }

    // 1. Bound root kontrolu (onek ile baslar)
    if (normalized.startsWith('-')) {
      return {
        form: normalized,
        type: 'BOUND',
        confidence: 1.0,
        reason: 'Onek isareti (-) ile basliyor',
      };
    }

    // 2. Bilinen stabil root'lar (ONCE — cunku bound kontrolu yanlis pozitif verebilir)
    for (const stable of KNOWN_STABLE_ROOTS) {
      if (normalized === stable) {
        return {
          form: normalized,
          type: 'STABLE',
          confidence: 1.0,
          reason: `Bilinen stabil root: ${stable}`,
        };
      }
    }

    // 3. Bilinen bound root'lar (SONRA — sadece son ek olarak)
    for (const bound of KNOWN_BOUND_ROOTS) {
      const boundForm = bound.replace('-', '');
      if (normalized.endsWith(boundForm)) {
        return {
          form: normalized,
          type: 'BOUND',
          confidence: 0.9,
          reason: `Bilinen bound root: ${bound}`,
        };
      }
    }

    // 4. Tek basina gorunuyorsa FREE
    if (normalized.length >= 2 && !normalized.startsWith('-')) {
      return {
        form: normalized,
        type: 'FREE',
        confidence: 0.7,
        reason: 'Tek basina gorunur form',
      };
    }

    // 5. Fallback
    return {
      form: normalized,
      type: 'NEUTRAL',
      confidence: 0.5,
      reason: 'Belirsiz — varsayilan NEUTRAL',
    };
  }

  /**
   * Toplu siniflandirma.
   */
  classifyBatch(forms: string[]): RootClassification[] {
    return forms.map(f => this.classify(f));
  }

  /**
   * Sadece tip doner.
   */
  getType(form: string): RootType {
    return this.classify(form).type;
  }

  /**
   * Bound root mu?
   */
  isBound(form: string): boolean {
    return this.classify(form).type === 'BOUND';
  }

  /**
   * Free root mu?
   */
  isFree(form: string): boolean {
    return this.classify(form).type === 'FREE';
  }
}
