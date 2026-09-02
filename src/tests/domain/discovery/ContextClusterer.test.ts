import { describe, it, expect } from 'vitest';
import { ContextClusterer } from '../../../domain/discovery/services/ContextClusterer';
import { RankedRelatedConceptDTO } from '../../../domain/discovery/dto/RankedRelatedConceptDTO';

describe('Phase 5.2.2: ContextClusterer Certification', () => {
  const clusterer = new ContextClusterer();

  it('should cluster WATER concepts correctly into rule-based context clusters', () => {
    const rankedConcepts: RankedRelatedConceptDTO[] = [
      { conceptId: 'ICE', relationType: 'STATE_OF', depth: 1, score: 0.9, parentConceptId: 'WATER' },
      { conceptId: 'STEAM', relationType: 'STATE_OF', depth: 2, score: 0.75, parentConceptId: 'WATER' },
      { conceptId: 'RIVER', relationType: 'LOCATION_OF', depth: 1, score: 0.72, parentConceptId: 'WATER' },
      { conceptId: 'LAKE', relationType: 'LOCATION_OF', depth: 1, score: 0.72, parentConceptId: 'WATER' },
      { conceptId: 'MINERAL_WATER', relationType: 'DRINK_OF', depth: 1, score: 0.70, parentConceptId: 'WATER' },
    ];

    const clusters = clusterer.cluster(rankedConcepts);

    expect(clusters).toBeDefined();
    expect(clusters.length).toBeGreaterThanOrEqual(3);

    const stateCluster = clusters.find(c => c.clusterId === 'state');
    expect(stateCluster).toBeDefined();
    expect(stateCluster?.concepts.map(c => c.conceptId)).toEqual(['ICE', 'STEAM']);

    const locationCluster = clusters.find(c => c.clusterId === 'location');
    expect(locationCluster).toBeDefined();
    expect(locationCluster?.concepts.map(c => c.conceptId)).toEqual(['LAKE', 'RIVER']);

    const drinkCluster = clusters.find(c => c.clusterId === 'drink');
    expect(drinkCluster).toBeDefined();
    expect(drinkCluster?.concepts.map(c => c.conceptId)).toEqual(['MINERAL_WATER']);
  });
});