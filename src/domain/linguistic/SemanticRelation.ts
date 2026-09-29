/**
 * SemanticRelation - Kökler ve kavramlar arası anlamsal ilişki
 *
 * ADR-ROOT-001 gereği:
 * - SemanticRelations VERİ olarak toplanır
 * - Runtime'a (Discovery, KnowledgeRanker) BAĞLANMAZ
 * - Faz 4/5'te ADR-ROOT-002 ile runtime'a girer
 *
 * Bu katman şimdilik sadece "araştırma verisi"dir.
 */

export type RelationType =
  | 'metaphorical'    // mecazi: щхьэ (baş) -> REASON
  | 'metonymic'       // bitişiklik: нэ (göz) -> görme
  | 'derivational'    // türetim: гу (kalp) -> JOY
  | 'compound'        // bileşik: фо (bal) + шыгъу (tuz) -> şeker
  | 'synonymic'       // eşanlamlı
  | 'antonymic';      // karşıt

export interface SemanticRelation {
  /** Benzersiz kimlik. Örnek: "SR-HEAD-REASON" */
  id: string;

  /**
   * Kaynak: Root ID veya Concept ID.
   * Örnek: "R-SHHYE" veya "HEAD"
   */
  source: string;

  /**
   * Hedef: Concept ID.
   * Örnek: "REASON"
   */
  target: string;

  /** İlişki türü */
  type: RelationType;

  /**
   * Kanıt: bu ilişkiyi gösteren sözlükbirim.
   * Örnek: "щхьэусыгъуэ"
   */
  evidence: string;

  /**
   * Güven skoru (0.0 - 1.0).
   * 1.0 = kanıtlanmış, 0.5 = şüpheli
   */
  confidence: number;

  /** Kanıt kaynağı: korpus, sözlük, akademik */
  evidenceSource?: 'corpus' | 'dictionary' | 'academic' | 'inferred';

  /** Korpus sıklığı (varsa) */
  corpusFrequency?: number;

  /** Akademik referans */
  reference?: string;

  /** Serbest notlar */
  notes?: string;
}

/**
 * ⚠️ RUNTIME KURALI
 *
 * Bu tip runtime'da KULLANILMAZ.
 * Sadece veri dosyalarında (JSON) ve araştırma araçlarında kullanılır.
 *
 * Yasaklı kullanım örnekleri:
 *   ❌ KnowledgeRanker içinde import
 *   ❌ DiscoveryFacade içinde import
 *   ❌ QuerySemanticMapper içinde import
 *
 * İzinli kullanım:
 *   ✅ public/data/linguistic/semantic_relations.json
 *   ✅ Python analiz scriptleri
 *   ✅ ADR dokümantasyonu
 */