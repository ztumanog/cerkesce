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
 *
 * NOT (palochka): Veri seti palochka olarak U+04C0 (Ӏ) kullaniyor; ancak
 * bazi kayitlar/scriptler Latin "I", "l", U+04CF (ӏ), U+0406 (І), U+0456 (і)
 * kullanabiliyor. Karsilastirma oncesi bu karakterler tek forma cevrilir,
 * aksi hâlde "-щIэ" gibi kurallar gercek veride hicbir zaman eslesmiyor.
 */

export type RootType = 'FREE' | 'BOUND' | 'NEUTRAL' | 'STABLE';

export interface RootClassification {
  form: string;
  type: RootType;
  confidence: number;
  reason: string;
}

/** Kanonik palochka karakteri (Cyrillic small palochka, U+04C0) */
const PALOCHKA = '\u04C0';

/** Palochka varyantlarini kanonik forma cevirir. */
function normalizePalochka(s: string): string {
  return s.replace(/[\u04CFIl\u0406\u0456]/g, PALOCHKA);
}

/**
 * Bilinen bound root'lar (Kumakhov gl4.pdf)
 * NOT: Palochka icerenler kanonik U+04C0 ile yazilir.
 */
const KNOWN_BOUND_ROOTS = [
  '-сы',
  '-лъы',
  '-ты',
  '-гъы',
  `-къ${PALOCHKA}э`,
  `-щ${PALOCHKA}э`,
  `-п${PALOCHKA}э`,
  `-к${PALOCHKA}э`,
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
    const orijinal = form.trim();
    // Karsilastirmalar palochka normalize edilerek yapilir; donen deger orijinaldir.
    const normalized = normalizePalochka(orijinal);

    if (!normalized) {
      return {
        form: orijinal,
        type: 'NEUTRAL',
        confidence: 0,
        reason: 'Bos form',
      };
    }

    // 1. Bound root kontrolu (onek ile baslar)
    if (normalized.startsWith('-')) {
      return {
        form: orijinal,
        type: 'BOUND',
        confidence: 1.0,
        reason: 'Onek isareti (-) ile basliyor',
      };
    }

    // 2. Bilinen stabil root'lar (ONCE — cunku bound kontrolu yanlis pozitif verebilir)
    for (const stable of KNOWN_STABLE_ROOTS) {
      if (normalized === stable) {
        return {
          form: orijinal,
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
          form: orijinal,
          type: 'BOUND',
          confidence: 0.9,
          reason: `Bilinen bound root: ${bound}`,
        };
      }
    }

    // 4. Tek basina gorunuyorsa FREE
    if (normalized.length >= 2 && !normalized.startsWith('-')) {
      return {
        form: orijinal,
        type: 'FREE',
        confidence: 0.7,
        reason: 'Tek basina gorunur form',
      };
    }

    // 5. Fallback
    return {
      form: orijinal,
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
