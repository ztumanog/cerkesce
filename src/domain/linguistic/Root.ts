/**
 * Root - Kabardeyce/Adigece kök birimi
 *
 * ADR-ROOT-001 gereği:
 * - Root != Concept
 * - Root -> Concept Space üretir
 * - Root bir Semantic Generator'dır
 *
 * Runtime bu tipe DOĞRUDAN erişmez.
 */

export type SemanticDomain =
  | 'body'        // vücut organı (гу = kalp)
  | 'emotion'     // duygu alanı
  | 'cognition'   // zihinsel alan
  | 'nature'      // doğa (псы = su)
  | 'kinship'     // akrabalık
  | 'action'      // eylem
  | 'quality';    // nitelik

export interface Root {
  /** Benzersiz kimlik. Örnek: "R-GU" */
  id: string;

  /** Kök form. Örnek: "гу" */
  form: string;

  /** Uluslararası Fonetik Alfabe. Örnek: "/gwə/" */
  ipa: string;

  /** Birincil anlam (Türkçe). Örnek: "kalp" */
  primaryMeaning: string;

  /** İkincil anlamlar. Örnek: ["zihin", "merkez", "ruh"] */
  secondaryMeanings: string[];

  /** Ait olduğu anlamsal alanlar */
  semanticDomains: SemanticDomain[];

  /** Diyalekt varyantları */
  dialectVariants: {
    adyghe?: string;      // Batı Çerkesçe
    kabardian?: string;   // Doğu Çerkesçe
  };

  /** Üretkenlik metrikleri */
  productivity?: {
    lemmaCount?: number;         // Kaç sözlükbirim türetiyor
    corpusFrequency?: number;    // Korpus sıklığı
    compoundCount?: number;      // Kaç bileşik üretiyor
  };

  /** Serbest notlar */
  notes?: string;
}