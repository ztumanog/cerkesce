import { describe, it, expect } from 'vitest';
import { Concept } from '../../../domain/concept/Concept';
import { ConceptId } from '../../../domain/shared/value-objects/ConceptId';

describe('Concept Entity', () => {
  it('gecerli props ile olusturulabilmelidir', () => {
    const id = ConceptId.create('CONCEPT_WATER');
    const concept = Concept.create(id, 'Water', 'Su kavrami');
    expect(concept.id.getValue()).toBe('CONCEPT_WATER');
    expect(concept.preferredLabel).toBe('Water');
    expect(concept.description).toBe('Su kavrami');
  });

  it('description olmadan olusturulabilmelidir', () => {
    const id = ConceptId.create('CONCEPT_HEAD');
    const concept = Concept.create(id, 'Head');
    expect(concept.description).toBe('');
  });

  it('ayni id ile iki concept esit sayilmalidir', () => {
    const id1 = ConceptId.create('CONCEPT_WATER');
    const id2 = ConceptId.create('CONCEPT_WATER');
    const c1 = Concept.create(id1, 'Water');
    const c2 = Concept.create(id2, 'Water');
    expect(c1.id.equals(c2.id)).toBe(true);
  });
});
