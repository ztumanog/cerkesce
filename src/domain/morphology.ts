/**
 * @file src/domain/morphology.ts
 * @description Çerkesçe morfolojik analiz veri yapıları, segmentler ve arayüz tanımları.
 */

/**
 * Bir kelimenin ayrıştırılmış morfolojik parçalarını (segmentlerini) temsil eder.
 */
export interface MorphologicalSegments {
  /** Kelimenin kökü (örn: "кӀо") */
  root: string;

  /** Kelimenin önekleri / prefix'leri (varsa) */
  prefixes?: string[];

  /** Kelimenin sonekleri / suffix'leri (varsa) */
  suffixes?: string[];

  /** Kelimenin gövdesi (varsa) */
  stem?: string;
}

/**
 * Bir kelimenin detaylı morfolojik analiz sonucunu temsil eden nesne arayüzü.
 */
export interface MorphologicalAnalysis {
  /** Kelimenin yalın kökü */
  root: string;

  /** Kelimenin parçalanmış segment detayları */
  segments?: MorphologicalSegments;
  
  /** Kelimenin gövdesi (varsa) */
  stem?: string;
  
  /** Kelimeye eklenen morfolojik eklerin listesi */
  suffixes?: string[];
  
  /** Gramer kategorisi (örn: "verb", "noun") */
  pos?: string;
  
  /** Ekstra morfolojik etiketler veya özellikler */
  features?: Record<string, string>;
}

/**
 * Morfolojik analiz yapabilen servisler için sözleşme (interface).
 */
export interface IMorphologyAnalyzer {
  /**
   * Verilen kelimeyi morfolojik olarak analiz eder.
   * @param word Analiz edilecek kelime
   * @returns Analiz sonucu nesnesi veya çözümlenemezse null/undefined
   */
  analyze(word: string): Promise<MorphologicalAnalysis | null> | MorphologicalAnalysis | null;

  /**
   * Verilen kelimenin morfolojik segmentlerini döndürür.
   * @param word Segmentlerine ayrılacak kelime
   */
  segment?(word: string): Promise<MorphologicalSegments | null> | MorphologicalSegments | null;
}