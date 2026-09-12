/**
 * @file src/domain/morphology.ts
 * @description Ã‡erkesÃ§e morfolojik analiz veri yapÄ±larÄ±, segmentler ve arayÃ¼z tanÄ±mlarÄ±.
 */

/**
 * Bir kelimenin ayrÄ±ÅŸtÄ±rÄ±lmÄ±ÅŸ morfolojik parÃ§alarÄ±nÄ± (segmentlerini) temsil eder.
 */
export interface MorphologicalSegments {
  /** Kelimenin kÃ¶kÃ¼ (Ã¶rn: "ĞºÓ€Ğ¾") */
  root: string;

  /** Kelimenin Ã¶nekleri / prefix'leri (varsa) */
  prefixes?: string[];

  /** Kelimenin sonekleri / suffix'leri (varsa) */
  suffixes?: string[];

  /** Kelimenin gÃ¶vdesi (varsa) */
  stem?: string;
}

/**
 * Bir kelimenin detaylÄ± morfolojik analiz sonucunu temsil eden nesne arayÃ¼zÃ¼.
 */
export interface MorphologicalAnalysis {
  /** Kelimenin yalÄ±n kÃ¶kÃ¼ */
  root: string;

  /** Kelimenin parÃ§alanmÄ±ÅŸ segment detaylarÄ± */
  segments?: MorphologicalSegments;
  
  /** Kelimenin gÃ¶vdesi (varsa) */
  stem?: string;
  
  /** Kelimeye eklenen morfolojik eklerin listesi */
  suffixes?: string[];
  
  /** Gramer kategorisi (Ã¶rn: "verb", "noun") */
  pos?: string;
  
  /** Ekstra morfolojik etiketler veya Ã¶zellikler */
  features?: Record<string, string>;
}

/**
 * Morfolojik analiz yapabilen servisler iÃ§in sÃ¶zleÅŸme (interface).
 */
export interface IMorphologyAnalyzer {
  /**
   * Verilen kelimeyi morfolojik olarak analiz eder.
   * @param word Analiz edilecek kelime
   * @returns Analiz sonucu nesnesi veya Ã§Ã¶zÃ¼mlenemezse null/undefined
   */
  analyze(word: string): Promise<MorphologicalAnalysis | null> | MorphologicalAnalysis | null;

  /**
   * Verilen kelimenin morfolojik segmentlerini dÃ¶ndÃ¼rÃ¼r.
   * @param word Segmentlerine ayrÄ±lacak kelime
   */
  segment?(word: string): Promise<MorphologicalSegments | null> | MorphologicalSegments | null;
}
