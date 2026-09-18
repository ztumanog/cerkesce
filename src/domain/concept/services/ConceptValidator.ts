/**
 * @file src/domain/concept/services/ConceptValidator.ts
 * @description Kavram Doğrulayıcı - İlişki Validasyonu
 * @layer Service
 */

import { ConceptRelation, RelationType } from '../types/ConceptRelation';

/**
 * Kavram Doğrulayıcı
 * 
 * Sorumluluklar:
 * - Kendi kendine referans kontrolü
 * - Direkt döngü tespiti
 * - İlişki geçerliliği doğrulaması
 */
export class ConceptValidator {
  /**
   * Kendi kendine referans kontrolü
   * 
   * @param sourceConceptId - Kaynak kavram ID'si
   * @param targetConceptId - Hedef kavram ID'si
   * @throws Eğer kaynak ve hedef aynıysa hata fırlatır
   */
  public static validateSelfReference(
    sourceConceptId: string,
    targetConceptId: string
  ): void {
    if (sourceConceptId === targetConceptId) {
      throw new Error('Self-referencing relation is strictly forbidden.');
    }
  }

  /**
   * Direkt döngü tespiti
   * 
   * @param sourceConceptId - Kaynak kavram ID'si
   * @param targetConceptId - Hedef kavram ID'si
   * @param targetRelations - Hedef kavramın ilişkileri
   * @throws Eğer döngü tespit edilirse hata fırlatır
   */
  public static validateDirectCycle(
    sourceConceptId: string,
    targetConceptId: string,
    targetRelations: ConceptRelation[]
  ): void {
    const hasBackLink = targetRelations.some(
      (rel) =>
        rel.targetConceptId === sourceConceptId &&
        (rel.type === RelationType.HYPONYM ||
          rel.type === RelationType.HOLONYM)
    );

    if (hasBackLink) {
      throw new Error('Direct cycle detected between concepts.');
    }
  }

  /**
   * İlişki geçerliliğini doğrular
   * 
   * @param relation - Doğrulanacak ilişki
   * @throws Eğer ilişki geçersizse hata fırlatır
   */
  public static validateRelation(relation: ConceptRelation): void {
    if (!relation.id || !relation.targetConceptId) {
      throw new Error('Relation ID and target concept ID are required.');
    }

    if (!Object.values(RelationType).includes(relation.type)) {
      throw new Error(`Invalid relation type: ${relation.type}`);
    }
  }
}