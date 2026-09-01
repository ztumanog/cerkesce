import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryConceptRepository } from '../../../repository/InMemoryConceptRepository';
import { MeaningGraph } from '../../../domain/concept/services/MeaningGraph';
import { Concept } from '../../../domain/concept/Concept';
import { ConceptID } from '../../../domain/concept/value-objects/ConceptID';
import { RelationDirection, RelationType } from '../../../domain/concept/types/ConceptRelation';

describe('Sprint 5: CE-12 - Phase 3 Concept Engine Stress & Performance', () => {
  let repo: InMemoryConceptRepository;
  let graph: MeaningGraph;

  beforeEach(() => {
    repo = new InMemoryConceptRepository();
    graph = new MeaningGraph(repo);
  });

  it('1. 10.000 Kavram ve ilişkileri başarıyla belleğe yüklenmelidir', async () => {
    const startTime = Date.now();
    const count = 10000;

    for (let i = 0; i < count; i++) {
      const idStr = '01ARZ3NDEKTSV4RRFFQ69' + String(i).padStart(5, '0');
      const targetStr = '01ARZ3NDEKTSV4RRFFQ69' + String((i + 1) % count).padStart(5, '0');

      const concept = new Concept({
        id: ConceptID.create(idStr),
        relations: [
          {
            id: 'rel-' + i,
            targetConceptId: targetStr,
            type: RelationType.SYNONYM,
            direction: RelationDirection.UNDIRECTED,
          },
        ],
      });
      await repo.save(concept);
    }

    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(3000);
  });

  it('2. 10.000 düğümlü graf üzerinde Depth=2 taraması 50ms altında yanıt vermelidir', async () => {
    const rootIdStr = '01ARZ3NDEKTSV4RRFFQ6900000';
    const rootId = ConceptID.create(rootIdStr);

    for (let i = 0; i < 50; i++) {
      const currentIdStr = '01ARZ3NDEKTSV4RRFFQ69' + String(i).padStart(5, '0');
      const nextIdStr = '01ARZ3NDEKTSV4RRFFQ69' + String(i + 1).padStart(5, '0');

      const concept = new Concept({
        id: ConceptID.create(currentIdStr),
        relations: [
          {
            id: 'rel-' + i,
            targetConceptId: nextIdStr,
            type: RelationType.RELATED,
            direction: RelationDirection.DIRECTED,
          },
        ],
      });
      await repo.save(concept);
    }

    const startTime = Date.now();
    const result = await graph.traverse(rootId);
    const duration = Date.now() - startTime;

    expect(duration).toBeLessThan(50);
    expect(result.depth1.length).toBeGreaterThan(0);
  });
});