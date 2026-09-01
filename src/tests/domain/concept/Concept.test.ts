import { describe, it, expect } from 'vitest';
import { Concept } from '../../../domain/concept/Concept';
import { ConceptID } from '../../../domain/concept/value-objects/ConceptID';

describe('CE-02: Concept Domain Core', () => {
  it('T001 - Concept nesnesi başarılı şekilde oluşturulmalıdır', () => {
    const conceptId = ConceptID.create();
    const concept = new Concept({
      id: conceptId,
      relations: [],
    });

    expect(concept.id).toBeDefined();
    expect(concept.id.getValue()).toBe(conceptId.getValue());
  });

  it('T002 - Relation immutably eklenmeli, orijinal nesneyi değiştirmemelidir', () => {
    const concept = new Concept({
      id: ConceptID.create(),
      relations: [],
    });

    const updated = concept.addRelation({ id: 'rel-1' });

    expect(updated.relations).toHaveLength(1);
    expect(concept.relations).toHaveLength(0);
  });

  it('T003 - Var olan ilişkiyi doğru tespit etmelidir', () => {
    const concept = new Concept({
      id: ConceptID.create(),
      relations: [{ id: 'rel-1' }],
    });

    expect(concept.hasRelation('rel-1')).toBe(true);
  });

  it('T004 - Olmayan ilişki için false dönmelidir', () => {
    const concept = new Concept({
      id: ConceptID.create(),
      relations: [],
    });

    expect(concept.hasRelation('rel-999')).toBe(false);
  });

  it('R4 - Dilsel veya metinsel veri alanları içermemelidir', () => {
    const concept = new Concept({
      id: ConceptID.create(),
      relations: [],
    });
    
    const keys = Object.keys(concept);
    expect(keys).not.toContain('language');
    expect(keys).not.toContain('word');
    expect(keys).not.toContain('label');
    expect(keys).not.toContain('meaning');
  });
});