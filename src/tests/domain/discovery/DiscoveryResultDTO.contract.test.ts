import { describe, it, expect } from 'vitest';
import { DiscoveryAssembler } from '../../../domain/discovery/services/DiscoveryAssembler';
import { TraversalNode } from '../../../domain/discovery/dto/TraversalNode';

describe('DiscoveryResultDTO & Assembler Integration Contract', () => {
  it('should assemble WATER traversal nodes into ranked concepts and context clusters correctly', () => {
    const assembler = new DiscoveryAssembler();
    const nodes: TraversalNode[] = [
      { conceptId: 'WATER', depth: 0, relationType: 'ROOT' },
      { conceptId: 'ICE', depth: 1, relationType: 'STATE_OF', parentConceptId: 'WATER' },
      { conceptId: 'STEAM', depth: 2, relationType: 'STATE_OF', parentConceptId: 'WATER' },
      { conceptId: 'RIVER', depth: 1, relationType: 'LOCATION_OF', parentConceptId: 'WATER' },
      { conceptId: 'LAKE', depth: 1, relationType: 'LOCATION_OF', parentConceptId: 'WATER' },
      { conceptId: 'MINERAL_WATER', depth: 1, relationType: 'DRINK_OF', parentConceptId: 'WATER' }
    ];

    const result = assembler.assemble('su', 12, {
      conceptId: 'CONCEPT_WATER',
      canonicalName: 'Water',
      traversalNodes: nodes,
      maxDepth: 2
    });

    expect(result.query).toBe('su');
    expect(result.conceptId).toBe('CONCEPT_WATER');

    // 1. Ranked Concepts Kontrolü
    expect(result.relatedConcepts).toBeDefined();
    expect(result.relatedConcepts?.length).toBe(5);
    expect(result.relatedConcepts![0].conceptId).toBe('ICE'); // En yüksek skorlu (1.0 * 0.9 = 0.9)

    // 2. Context Clusters Kontrolü (State, Location, Drink)
    expect(result.contextClusters).toBeDefined();
    expect(result.contextClusters!.length).toBe(3);

    const stateCluster = result.contextClusters!.find(c => c.clusterId === 'state');
    expect(stateCluster).toBeDefined();
    expect(stateCluster?.concepts.map(c => c.conceptId)).toEqual(['ICE', 'STEAM']);

    const locationCluster = result.contextClusters!.find(c => c.clusterId === 'location');
    expect(locationCluster).toBeDefined();
    // Aynı score'a sahip LAKE ve RIVER alfabetik sıraya göre sıralanır: LAKE < RIVER
    expect(locationCluster?.concepts.map(c => c.conceptId)).toEqual(['LAKE', 'RIVER']);

    const drinkCluster = result.contextClusters!.find(c => c.clusterId === 'drink');
    expect(drinkCluster).toBeDefined();
    expect(drinkCluster?.concepts.map(c => c.conceptId)).toEqual(['MINERAL_WATER']);
  });
});