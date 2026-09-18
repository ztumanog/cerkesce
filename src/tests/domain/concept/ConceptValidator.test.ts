/**
 * @file src/tests/domain/concept/ConceptValidator.test.ts
 * @description Kavram Doğrulayıcı Testleri
 */

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

    // B'nin A'ya geri bağlantısı (HYPONYM)
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
});

