
/**
 * Morpheme - Bağımsız veya bağlı biçimbirim
 *
 * ADR-ROOT-001 gereği:
 * - Morpheme ayrı bir katmandır
 * - Root != Morpheme
 * - Bağımsız morfemler kelime olabilir (фӀэ = "iyi")
 * - Bağlı morfemler sadece ek olarak yaşar (гъэ = "-dır-")
 *
 * Runtime bu tipe DOĞRUDAN erişmez.
 */

export type MorphemeType =
  | 'free'      // Bağımsız: фӀэ, щӀо (tek başına kelime olabilir)
  | 'bound'     // Bağlı: гъэ, ху (sadece ek olarak)
  | 'clitic';   // Yarı bağımlı: -щт, -мэ

export type DialectMark =
  | 'adyghe'      // Batı Çerkesçe
  | 'kabardian'   // Doğu Çerkesçe
  | 'both';       // Her iki lehçede aynı

export interface Morpheme {
  /** Benzersiz kimlik. Örnek: "M-F1E" */
  id: string;

  /** Biçimbirim formu. Örnek: "фӀэ" */
  form: string;

  /** IPA gösterimi. Örnek: "/fʔa/" */
  ipa: string;

  /** Anlam (Türkçe). Örnek: "iyi, aydın" */
  gloss: string;

  /** Tip: bağımsız, bağlı, clitic */
  type: MorphemeType;

  /** Hangi diyalekte ait */
  dialect: DialectMark;

  /**
   * Diyalekt karşılığı.
   * Örnek: { adyghe: "шӀо", kabardian: "фӀэ" }
   */
  equivalent?: {
    adyghe?: string;
    kabardian?: string;
  };

  /**
   * Bağlanma kuralı.
   * Örnek: "suffix" -> kelime sonuna eklenir
   */
  attachment?: 'prefix' | 'suffix' | 'infix' | 'circumfix';

  /** Örnek kullanımlar (Lexeme ID'leri) */
  exampleLexemeIds?: string[];

  /** Serbest notlar */
  notes?: string;
}