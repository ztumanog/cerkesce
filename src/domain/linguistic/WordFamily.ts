/**
 * WordFamily - Tek bir kökten türeyen sözlükbirimler ailesi
 *
 * ADR-ROOT-001 gereği:
 * - WordFamily bir kökün tüm türevlerini gruplar
 * - Root -> WordFamily -> Lexeme zincirinin ortası
 * - Compound ile KARIŞTIRILMAMALI:
 *   * WordFamily: tek kök -> N türev
 *   * Compound: N kök -> 1 birleşik
 *
 * Runtime bu tipe DOĞRUDAN erişmez.
 */

export interface WordFamily {
  /** Benzersiz kimlik. Örnek: "WF-GU" */
  id: string;

  /** Bağlı olduğu kök. Örnek: "R-GU" */
  rootId: string;

  /**
   * Bu ailede kullanılan biçimbirimler.
   * Örnek: ["M-F1E", "M-GHE", "M-ZHY"]
   */
  morphemeIds: string[];

  /**
   * Aile üyesi sözlükbirimler.
   * Örnek: ["L-GUF1E", "L-GUGHE", "L-GUBZHYGE"]
   */
  lexemeIds: string[];

  /**
   * Ailenin üretkenlik özeti.
   */
  productivity: {
    totalLexemes: number;
    corpusFrequency?: number;
    /** En sık kullanılan üye */
    mostFrequentLexemeId?: string;
  };

  /**
   * Diyalekt farkı.
   * Örnek: Adigece'de "гушӀо", Kabardeyce'de "гуфӀэ"
   */
  dialectNote?: {
    adyghe?: string;
    kabardian?: string;
    note?: string;
  };

  /** Serbest notlar */
  notes?: string;
}
