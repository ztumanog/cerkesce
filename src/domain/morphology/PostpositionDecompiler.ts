/**
 * PostpositionDecompiler - Edat cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-015 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl7.pdf (Edatlar)
 *
 * Desteklenen edatlar:
 * - дэжь      (yaninda)
 * - пайэ      (icin)
 * - пIшIондэ  (-e kadar)
 * - лъандэрэ  (-den beri)
 * - щхьэкIэ   (hakkinda)
 * - пэмычI    (disinda)
 * - деж       (yanina)
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export interface PostpositionResult {
  input: string;
  isPostposition: boolean;
  meaning: string;
  confidence: number;
}

interface PostpositionEntry {
  form: string;
  meaning: string;
}

// ============================================
// EDAT SOZLUGU
// ============================================

const POSTPOSITIONS: PostpositionEntry[] = [
  { form: 'дэжь', meaning: 'yaninda' },
  { form: 'деж', meaning: 'yanina' },
  { form: 'пайэ', meaning: 'icin' },
  { form: 'пIшIондэ', meaning: '-e kadar' },
  { form: 'лъандэрэ', meaning: '-den beri' },
  { form: 'щхьэкIэ', meaning: 'hakkinda' },
  { form: 'пэмычI', meaning: 'disinda' },
  { form: 'нэмычI', meaning: 'disinda' },
  { form: 'пачIэ', meaning: 'icin' },
  { form: 'гъунэгъу', meaning: 'yakin' },
];

// ============================================
// DECOMPILER
// ============================================

export class PostpositionDecompiler {
  /**
   * Bir edati cozumler.
   */
  decompile(form: string): PostpositionResult {
    const normalized = form.trim();

    if (!normalized) {
      return {
        input: '',
        isPostposition: false,
        meaning: '',
        confidence: 0,
      };
    }

    const found = POSTPOSITIONS.find(p => p.form === normalized);
    if (found) {
      return {
        input: normalized,
        isPostposition: true,
        meaning: found.meaning,
        confidence: 1.0,
      };
    }

    return {
      input: normalized,
      isPostposition: false,
      meaning: '',
      confidence: 0.5,
    };
  }

  /**
   * Toplu cozumleme.
   */
  decompileBatch(forms: string[]): PostpositionResult[] {
    return forms.map(f => this.decompile(f));
  }

  /**
   * Bilinen tum edatlar.
   */
  getPostpositions(): string[] {
    return POSTPOSITIONS.map(p => p.form);
  }

  /**
   * Edat mi?
   */
  isPostposition(form: string): boolean {
    return this.decompile(form).isPostposition;
  }

  /**
   * Anlamini doner.
   */
  getMeaning(form: string): string {
    return this.decompile(form).meaning;
  }
}
