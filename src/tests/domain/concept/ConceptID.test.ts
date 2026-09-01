import { describe, it, expect } from 'vitest';
import { ConceptID } from '../../../domain/concept/value-objects/ConceptID';

describe('ConceptID Value Object', () => {
  it('geçerli bir ID ile oluşturulabilmelidir', () => {
    const validId = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
    const conceptId = ConceptID.create(validId);
    expect(conceptId.getValue()).toBe(validId);
  });

  it('geçersiz formatlarda hata fırlatmalıdır', () => {
    expect(() => ConceptID.create('invalid-id')).toThrow();
  });

  it('aynı değerlere sahip iki nesne eşit sayılmalıdır', () => {
    const idStr = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
    const id1 = ConceptID.create(idStr);
    const id2 = ConceptID.create(idStr);
    expect(id1.equals(id2)).toBe(true);
  });
});