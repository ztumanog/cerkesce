import { describe, it, expect, beforeEach } from 'vitest';
import { ConceptFacade } from '../../services/ConceptFacade';
import { InMemoryConceptRepository } from '../../repository/InMemoryConceptRepository';
import { MeaningConceptLinker } from '../../domain/concept/services/MeaningConceptLinker';
import { MeaningGraph } from '../../domain/concept/services/MeaningGraph';
import { Concept } from '../../domain/concept/Concept';
import { ConceptID } from '../../domain/concept/value-objects/ConceptID';

describe('Phase 4: CE-15 - ConceptFacade & Cross-Lingual Search Pipeline', () => {
  let repo: InMemoryConceptRepository;
  let linker: MeaningConceptLinker;
  let graph: MeaningGraph;
  let facade: ConceptFacade;

  beforeEach(() => {
    repo = new InMemoryConceptRepository();
    linker = new MeaningConceptLinker();
    graph = new MeaningGraph(repo);
    facade = new ConceptFacade(repo, linker, graph);
  });

  it('Meaning ID üzerinden çapraz anlamsal arama yapıp ilişkili düğümleri getirmelidir', async () => {
    const conceptIdStr = '01ARZ3NDEKTSV4RRFFQ69G5FA1';
    const conceptId = ConceptID.create(conceptIdStr);

    const concept = new Concept({ id: conceptId, relations: [] });
    await repo.save(concept);

    linker.link('meaning-tr-1', conceptIdStr);
    linker.link('meaning-ady-1', conceptIdStr);

    const result = await facade.searchCrossLingualByMeaning('meaning-tr-1');

    expect(result).not.toBeNull();
    expect(result?.conceptId).toBe(conceptIdStr);
    expect(result?.relatedMeaningIds).toContain('meaning-tr-1');
    expect(result?.relatedMeaningIds).toContain('meaning-ady-1');
  });
});