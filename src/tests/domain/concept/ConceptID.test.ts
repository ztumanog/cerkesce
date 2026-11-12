import { describe, it, expect } from 'vitest';
import { ConceptID } from '../../../domain/concept/value-objects/ConceptID';

describe('ConceptID Value Object', () => {
  it('geçerli bir kanonik kavram ID ile oluşturulabilmelidir', () => {
    const validId = 'WATER';
    const conceptId = ConceptID.create(validId);
    expect(conceptId.getValue()).toBe(validId);
  });

  it('geçersiz ve eski ULID formatlarında hata fırlatmalıdır', () => {
    expect(() => ConceptID.create('invalid-id')).toThrow();
    expect(() => ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FAV')).toThrow();
  });

  it('aynı değerlere sahip iki nesne eşit sayılmalıdır', () => {
    const id1 = ConceptID.create('APPLE_TREE');
    const id2 = ConceptID.create('APPLE_TREE');
    expect(id1.equals(id2)).toBe(true);
  });
});
