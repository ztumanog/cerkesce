/**
 * @file src/domain/concept/services/ConceptValidator.ts
 * @description Kavram Doğrulayıcı - İlişki ve Kanonik Kimlik Validasyonu (ADR-GOV-015)
 * @layer Service
 */

import { ConceptRelation, RelationType } from '../types/ConceptRelation';
import { ConceptId } from '../../shared/value-objects/ConceptId';

export class ConceptValidator {
  public static validateSelfReference(
    sourceConceptId: string,
    targetConceptId: string
  ): void {
    const source = ConceptId.create(sourceConceptId).value;
    const target = ConceptId.create(targetConceptId).value;

    if (source === target) {
      throw new Error('Self-referencing relation is strictly forbidden.');
    }
  }

  public static validateDirectCycle(
    sourceConceptId: string,
    targetConceptId: string,
    targetRelations: ConceptRelation[]
  ): void {
    const source = ConceptId.create(sourceConceptId).value;
    ConceptId.create(targetConceptId);

    const hasBackLink = targetRelations.some(
      (rel) =>
        rel.targetConceptId === source &&
        (rel.type === RelationType.HYPONYM ||
          rel.type === RelationType.HOLONYM)
    );

    if (hasBackLink) {
      throw new Error('Direct cycle detected between concepts.');
    }
  }

  public static validateRelation(relation: ConceptRelation): void {
    if (!relation.id || !relation.targetConceptId) {
      throw new Error('Relation ID and target concept ID are required.');
    }

    ConceptId.create(relation.targetConceptId);

    if (!Object.values(RelationType).includes(relation.type)) {
      throw new Error(`Invalid relation type: ${relation.type}`);
    }
  }
}