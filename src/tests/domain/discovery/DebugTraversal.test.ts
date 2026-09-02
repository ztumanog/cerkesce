import { describe, it, expect } from 'vitest';
import { GraphTraversalService } from '../../../domain/discovery/services/GraphTraversalService';
import { Concept } from '../../../domain/concept/Concept';
import { ConceptID } from '../../../domain/value-objects/ConceptID';
import { MeaningGraph } from '../../../domain/concept/services/MeaningGraph';

describe('Debug: Graph Traversal - Correct ID Usage', () => {
  it('should store and retrieve concepts correctly with ConceptID', () => {
    const meaningGraph = new MeaningGraph();

    // Create ConceptID objects with VALID ULID format (26 chars, alphanumeric)
    const waterID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FAV'); // Valid ULID
    const iceID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FB0');
    const riverID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FB1');

    // Create Concept with proper props
    const conceptWater = Concept.create(waterID, 'Water');
    const conceptIce = Concept.create(iceID, 'Ice');
    const conceptRiver = Concept.create(riverID, 'River');

    console.log('conceptWater.id:', conceptWater.id.getValue());

    // Add relations
    (conceptWater as any).relations = [
      { targetConceptId: iceID.getValue(), type: 'STATE_OF' },
      { targetConceptId: riverID.getValue(), type: 'LOCATION_OF' }
    ];

    meaningGraph.addConcept(conceptWater);
    meaningGraph.addConcept(conceptIce);
    meaningGraph.addConcept(conceptRiver);

    // Try to retrieve
    const retrieved = meaningGraph.getConcept(waterID.getValue());
    console.log('Retrieved concept:', !!retrieved);

    const graphRepositoryAdapter = {
      getNeighbors: (conceptId: string) => {
        console.log('getNeighbors called with:', conceptId);
        const concept = meaningGraph.getConcept(conceptId);
        console.log('concept found:', !!concept);
        if (!concept || !(concept as any).relations) return [];
        const relations = (concept as any).relations;
        console.log('relations found:', relations.length);
        return relations.map((r: any) => ({
          targetConceptId: r.targetConceptId,
          relationType: r.type,
          weight: 1.0
        }));
      }
    };

    const service = new GraphTraversalService(graphRepositoryAdapter as any);
    const result = service.traverse({ rootConceptId: waterID.getValue(), maxDepth: 2 });

    console.log('Traversal result:', result);
    console.log('Result length:', result.length);

    expect(retrieved).toBeDefined();
    expect(result.length).toBeGreaterThan(1);
  });
});