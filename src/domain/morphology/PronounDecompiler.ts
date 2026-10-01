/**
 * PronounDecompiler - Zamir cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-010 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl2.pdf (Zamirler)
 *
 * Desteklenen zamir tipleri:
 * - personal      : сэ (ben), уэ (sen), дэ (biz), фэ (siz)
 * - possessive    : сыйэ (benim), уыйэ (senin), йыйэ (onun)
 * - demonstrative : мы (bu), мо (şu), а (o)
 * - interrogative : хэт (kim), сыд (ne)
 * - indefinite    : гуэрэ (birisi), зыгуэрэ (bir şey)
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type PronounType =
  | 'personal'
  | 'possessive'
  | 'demonstrative'
  | 'interrogative'
  | 'indefinite'
  | 'bare';

export type PersonType = '1sg' | '2sg' | '3sg' | '1pl' | '2pl' | '3pl';

export interface PronounResult {
  input: string;
  type: PronounType;
  person?: PersonType;
  stem: string;
  suffix: string;
  confidence: number;
}

// ============================================
// ZAMIR SOZLUKLERI
// ============================================

const PERSONAL_PRONOUNS: Record<string, PersonType> = {
  'сэ': '1sg',
  'уэ': '2sg',
  'дэ': '1pl',
  'фэ': '2pl',
  'ар': '3sg',
};

const POSSESSIVE_PRONOUNS: Record<string, PersonType> = {
  'сыйэ': '1sg',
  'сэсыйэ': '1sg',
  'уыйэ': '2sg',
  'уэуыйэ': '2sg',
  'йыйэ': '3sg',
  'йэй': '3sg',
  'дыйэ': '1pl',
  'дэдыйэ': '1pl',
  'фыйэ': '2pl',
  'фэфыйэ': '2pl',
  'йайэ': '3pl',
};

const DEMONSTRATIVE_PRONOUNS: string[] = [
  'мы',
  'мыр',
  'мо',
  'мор',
  'а',
  'ар',
];

const INTERROGATIVE_PRONOUNS: string[] = [
  'хэт',
  'сыд',
  'сыт',
  'дэнэ',
  'дагъуэ',
];

const INDEFINITE_PRONOUNS: string[] = [
  'гуэрэ',
  'гуэр',
  'зыгуэрэ',
  'зыгуэр',
  'зыгор',
];

// ============================================
// DECOMPILER
// ============================================

export class PronounDecompiler {
  /**
   * Bir zamiri cozumler.
   */
  decompile(form: string): PronounResult {
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

    // 1. Sahis zamiri
    if (PERSONAL_PRONOUNS[normalized]) {
      return {
        input: normalized,
        type: 'personal',
        person: PERSONAL_PRONOUNS[normalized],
        stem: normalized,
        suffix: '',
        confidence: 1.0,
      };
    }

    // 2. Iyelik zamiri
    if (POSSESSIVE_PRONOUNS[normalized]) {
      return {
        input: normalized,
        type: 'possessive',
        person: POSSESSIVE_PRONOUNS[normalized],
        stem: normalized,
        suffix: '',
        confidence: 1.0,
      };
    }

    // 3. Isaret zamiri
    if (DEMONSTRATIVE_PRONOUNS.includes(normalized)) {
      return {
        input: normalized,
        type: 'demonstrative',
        stem: normalized,
        suffix: '',
        confidence: 0.9,
      };
    }

    // 4. Soru zamiri
    if (INTERROGATIVE_PRONOUNS.includes(normalized)) {
      return {
        input: normalized,
        type: 'interrogative',
        stem: normalized,
        suffix: '',
        confidence: 0.9,
      };
    }

    // 5. Belirsiz zamir
    if (INDEFINITE_PRONOUNS.includes(normalized)) {
      return {
        input: normalized,
        type: 'indefinite',
        stem: normalized,
        suffix: '',
        confidence: 0.9,
      };
    }

    // 6. Bilinmeyen -> bare
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
  decompileBatch(forms: string[]): PronounResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum zamir tipleri.
   */
  getTypes(): PronounType[] {
    return ['personal', 'possessive', 'demonstrative', 'interrogative', 'indefinite', 'bare'];
  }

  /**
   * Sahis zamiri mi?
   */
  isPersonal(form: string): boolean {
    return this.decompile(form).type === 'personal';
  }

  /**
   * Iyelik zamiri mi?
   */
  isPossessive(form: string): boolean {
    return this.decompile(form).type === 'possessive';
  }

  /**
   * Isaret zamiri mi?
   */
  isDemonstrative(form: string): boolean {
    return this.decompile(form).type === 'demonstrative';
  }

  /**
   * Soru zamiri mi?
   */
  isInterrogative(form: string): boolean {
    return this.decompile(form).type === 'interrogative';
  }
}
