import { describe, it, expect } from 'vitest';
import { ConceptValidator } from '../../../domain/concept/services/ConceptValidator';
import { ConceptRelation } from '../../../domain/concept/value-objects/ConceptRelation';
import { RelationDirection, RelationType } from '../../../domain/concept/types/ConceptRelation';

describe('CE-14: Domain Validation & Cycle Detection', () => {
  it('Self-reference ilişkilerinde hata fırlatmalıdır', () => {
    const conceptId = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
    expect(() => {
      ConceptValidator.validateSelfReference(conceptId, conceptId);
    }).toThrow('Self-referencing relation is strictly forbidden.');
  });

  it('Doğrudan döngüsel (A -> B ve B -> A) hiyerarşik ilişkileri engellemelidir', () => {
    const conceptA = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
    const conceptB = '01ARZ3NDEKTSV4RRFFQ69G5FAB';

    const bRelations = [
      ConceptRelation.create({
        id: 'rel-2',
        targetConceptId: conceptA,
        type: RelationType.HYPONYM,
        direction: RelationDirection.DIRECTED,
      })
    ];

    expect(() => {
      ConceptValidator.validateDirectCycle(conceptA, conceptB, bRelations);
    }).toThrow('Direct cycle detected between concepts.');
  });
});