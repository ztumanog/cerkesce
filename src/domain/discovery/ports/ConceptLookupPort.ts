/**
 * File: src/domain/discovery/ports/ConceptLookupPort.ts
 * Layer: Port (Hexagonal Architecture)
 *
 * Query → ConceptId çözümlemesinin tek sözleşmesi.
 * Somut veri kaynağı (lexemes.json, concept_mapping.json, veritabanı, API)
 * bu portun arkasına gizlenir. Mapper artık veri kaynağını bilmez.
 */

export interface ConceptLookupResult {
  conceptId: string;
  confidence: number;
  source: 'lexeme' | 'translation' | 'registry' | 'manual';
}

export interface ConceptLookupPort {
  /**
   * Bir sorguyu (kelime, form, lemma) kavram ID'sine çözer.
   * @param normalizedQuery NFC normalize + lowercase edilmiş sorgu
   * @returns Eşleşme varsa ConceptLookupResult, yoksa null
   */
  lookup(normalizedQuery: string): Promise<ConceptLookupResult | null>;
}
