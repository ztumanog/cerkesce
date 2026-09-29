/**
 * Lexeme - Sözlükbirim (somut sözlük girdisi)
 *
 * ADR-ROOT-001 gereği:
 * - "Word" yerine "Lexeme" terimi kullanılır
 * - Lexeme bir WordFamily üyesidir
 * - Lexeme, Concept'e bağlanabilir (opsiyonel)
 *
 * Runtime bu tipe DOĞRUDAN erişmez.
 */

export interface Lexeme {
  /** Benzersiz kimlik. Örnek: "L-GUF1E" */
  id: string;

  /** Sözlük formu. Örnek: "гуфӀэ" */
  form: string;

  /** IPA gösterimi. Örnek: "/gufʔa/" */
  ipa: string;

  /**
   * Kelimenin gerçek anlamı (literal).
   * Örnek: "kalbin iyiliği"
   */
  literalMeaning: string;

  /**
   * Türetim bilgisi.
   * Root + Morpheme ilişkisini kaydeder.
   */
  derivation: {
    /** Kaynak kök(ler). Örnek: ["R-GU"] */
    rootIds: string[];

    /** Kullanılan biçimbirim(ler). Örnek: ["M-F1E"] */
    morphemeIds: string[];

    /** Türetim kuralı */
    rule: 'suffix' | 'prefix' | 'infix' | 'compound' | 'root';

    /** Bileşik ise kaynak lexeme'ler. Örnek: ["L-FO", "L-SHYGHU"] */
    sourceLexemeIds?: string[];
  };

  /**
   * Bağlı olduğu WordFamily. Örnek: "WF-GU"
   * Compound ise undefined olabilir.
   */
  wordFamilyId?: string;

  /**
   * Kavramsal karşılık (opsiyonel).
   * ADR-ROOT-002 ile runtime'a bağlanana kadar veri olarak kalır.
   */
  conceptId?: string;

  /** Diyalekt varyantları */
  dialectVariants?: {
    adyghe?: string;
    kabardian?: string;
  };

  /** Korpus sıklığı */
  corpusFrequency?: number;

  /** Serbest notlar */
  notes?: string;
}