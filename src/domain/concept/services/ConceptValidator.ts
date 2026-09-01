import { ConceptRelation } from '../value-objects/ConceptRelation';
import { RelationType } from '../types/ConceptRelation';

export class ConceptValidator {
  public static validateSelfReference(sourceConceptId: string, targetConceptId: string): void {
    if (sourceConceptId === targetConceptId) {
      throw new Error('Self-referencing relation is strictly forbidden.');
    }
  }

  public static validateDirectCycle(
    sourceConceptId: string,
    targetConceptId: string,
    targetRelations: ConceptRelation[]
  ): void {
    const hasBackLink = targetRelations.some(
      rel => rel.targetConceptId === sourceConceptId &&
             (rel.type === RelationType.HYPONYM || rel.type === RelationType.HOLONYM)
    );

    if (hasBackLink) {
      throw new Error('Direct cycle detected between concepts.');
    }
  }
}