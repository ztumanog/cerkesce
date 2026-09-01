import { describe, it, expect, beforeEach } from 'vitest';
import { MeaningGraph } from '../../../domain/concept/services/MeaningGraph';
import { InMemoryConceptRepository } from '../../../repository/InMemoryConceptRepository';
import { Concept } from '../../../domain/concept/Concept';
import { ConceptID } from '../../../domain/concept/value-objects/ConceptID';
import { RelationDirection, RelationType } from '../../../domain/concept/types/ConceptRelation';

describe('Sprint 4: CE-05 to CE-08 & CE-11 - MeaningGraph Engine', () => {
  let repo: InMemoryConceptRepository;
  let graph: MeaningGraph;

  beforeEach(() => {
    repo = new InMemoryConceptRepository();
    graph = new MeaningGraph(repo);
  });

  it('CE-11: Anayasal Depth=2 sınırında ilişki ağını doğru taramalıdır', async () => {
    const idA = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA1');
    const idB = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA2');
    const idC = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA3');

    // A -> B (Depth 1)
    const conceptA = new Concept({
      id: idA,
      relations: [{ id: 'r1', targetConceptId: idB.getValue(), type: RelationType.SYNONYM, direction: RelationDirection.UNDIRECTED }]
    });

    // B -> C (Depth 2)
    const conceptB = new Concept({
      id: idB,
      relations: [{ id: 'r2', targetConceptId: idC.getValue(), type: RelationType.RELATED, direction: RelationDirection.DIRECTED }]
    });

    const conceptC = new Concept({ id: idC, relations: [] });

    await repo.save(conceptA);
    await repo.save(conceptB);
    await repo.save(conceptC);

    const result = await graph.traverse(idA);

    expect(result.rootId).toBe(idA.getValue());
    expect(result.depth1).toContain(idB.getValue());
    expect(result.depth2).toContain(idC.getValue());
  });

  it('CE-05 & CE-06: Eş ve Zıt anlamlı ilişkileri filtreleyebilmelidir', async () => {
    const idMain = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA1');
    const idSyn = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA2');
    const idAnt = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FA3');

    const mainConcept = new Concept({
      id: idMain,
      relations: [
        { id: 'r1', targetConceptId: idSyn.getValue(), type: RelationType.SYNONYM, direction: RelationDirection.UNDIRECTED },
        { id: 'r2', targetConceptId: idAnt.getValue(), type: RelationType.ANTONYM, direction: RelationDirection.DIRECTED }
      ]
    });

    await repo.save(mainConcept);

    const synonyms = await graph.getSynonyms(idMain);
    const antonyms = await graph.getAntonyms(idMain);

    expect(synonyms).toContain(idSyn.getValue());
    expect(antonyms).toContain(idAnt.getValue());
  });
});