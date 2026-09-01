import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryConceptRepository } from '../../repository/InMemoryConceptRepository';
import { Concept } from '../../domain/concept/Concept';
import { ConceptID } from '../../domain/concept/value-objects/ConceptID';

describe('Sprint 2: CE-03 & CE-09 - InMemoryConceptRepository', () => {
  let repository: InMemoryConceptRepository;

  beforeEach(() => {
    repository = new InMemoryConceptRepository();
  });

  it('kavramı depoya kaydedebilmeli ve ID ile O(1) erişebilmelidir', async () => {
    const conceptId = ConceptID.create();
    const concept = new Concept({ id: conceptId, relations: [] });

    await repository.save(concept);
    const found = await repository.findById(conceptId);

    expect(found).not.toBeNull();
    expect(found?.id.equals(conceptId)).toBe(true);
  });

  it('çoklu ID sorgusunda (findMany) eşleşen tüm kavramları getirmelidir', async () => {
    const id1 = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA1');
    const id2 = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA2');
    const id3 = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA3');

    const c1 = new Concept({ id: id1, relations: [] });
    const c2 = new Concept({ id: id2, relations: [] });

    await repository.save(c1);
    await repository.save(c2);

    const foundList = await repository.findMany([id1, id2, id3]);

    expect(foundList).toHaveLength(2);
    expect(foundList.some(c => c.id.equals(id1))).toBe(true);
    expect(foundList.some(c => c.id.equals(id2))).toBe(true);
  });

  it('olmayan kavram sorgulandığında null dönmelidir', async () => {
    const conceptId = ConceptID.create();
    const found = await repository.findById(conceptId);

    expect(found).toBeNull();
  });

  it('kavram silme ve varlık kontrolü işlemlerini doğrulamalıdır', async () => {
    const conceptId = ConceptID.create();
    const concept = new Concept({ id: conceptId, relations: [] });

    await repository.save(concept);
    expect(await repository.exists(conceptId)).toBe(true);

    const deleted = await repository.delete(conceptId);
    expect(deleted).toBe(true);
    expect(await repository.exists(conceptId)).toBe(false);
  });
});