import { describe, it, expect } from 'vitest';
import { ConceptValidator } from '../../../domain/concept/services/ConceptValidator';
import {
  ConceptRelation,
  RelationType,
} from '../../../domain/concept/types/ConceptRelation';

describe('CE-14: Domain Validation & Cycle Detection', () => {
  it('Self-reference ilişkilerinde hata fırlatmalıdır', () => {
    expect(() => {
      ConceptValidator.validateSelfReference('CONCEPT_A', 'CONCEPT_A');
    }).toThrow('Self-referencing relation is strictly forbidden.');
  });

  it('Doğrudan döngüsel (A -> B ve B -> A) hiyerarşik ilişkileri engellemelidir', () => {
    const conceptA = 'CONCEPT_A';
    const conceptB = 'CONCEPT_B';

    const bRelations: ConceptRelation[] = [
      {
        id: 'REL_B_TO_A',
        targetConceptId: conceptA,
        type: RelationType.HYPONYM,
        direction: 'DIRECTED' as any,
        weight: 1,
      },
    ];

    expect(() => {
      ConceptValidator.validateDirectCycle(conceptA, conceptB, bRelations);
    }).toThrow('Direct cycle detected between concepts.');
  });

  it('ADR-GOV-015: Kanonik olmayan conceptId girişlerini reddetmelidir', () => {
    expect(() => ConceptValidator.validateSelfReference('concept_a', 'CONCEPT_B')).toThrow();
    expect(() =>
      ConceptValidator.validateRelation({
        id: 'REL_1',
        targetConceptId: 'su_kavrami_ş',
        type: RelationType.SYNONYM,
        direction: 'UNDIRECTED' as any,
      })
    ).toThrow();
  });
});