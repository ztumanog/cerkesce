import { describe, it, expect } from 'vitest';
import { ConceptRelation } from '../../../domain/concept/value-objects/ConceptRelation';
import { RelationDirection, RelationType } from '../../../domain/concept/types/ConceptRelation';

describe('CE-04: ConceptRelation Model', () => {
  it('geçerli bir ilişki nesnesi oluşturabilmelidir', () => {
    const relation = ConceptRelation.create({
      id: 'rel-101',
      targetConceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
      type: RelationType.SYNONYM,
      direction: RelationDirection.UNDIRECTED,
    });

    expect(relation.id).toBe('rel-101');
    expect(relation.type).toBe(RelationType.SYNONYM);
  });

  it('boş targetConceptId durumunda hata fırlatmalıdır', () => {
    expect(() =>
      ConceptRelation.create({
        id: 'rel-102',
        targetConceptId: '',
        type: RelationType.ANTONYM,
        direction: RelationDirection.DIRECTED,
      })
    ).toThrow();
  });
});