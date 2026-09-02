import { describe, it, expect } from 'vitest';
import { ContextClusterer } from '../../../domain/discovery/services/ContextClusterer';
import { RankedRelatedConceptDTO } from '../../../domain/discovery/dto/RankedRelatedConceptDTO';

describe('Phase 5.2.2 - Contextual Discovery Certification (CDC)', () => {
  const clusterer = new ContextClusterer();

  it('CDC-001: STATE_OF iliskileri ayni cluster (state) icine dusmelidir', () => {
    const mockConcepts: RankedRelatedConceptDTO[] = [
      { conceptId: 'ICE', score: 0.9, depth: 1, relationType: 'STATE_OF' },
      { conceptId: 'STEAM', score: 0.81, depth: 2, relationType: 'STATE_OF' }
    ];

    const clusters = clusterer.cluster(mockConcepts);

    expect(clusters).toHaveLength(1);
    expect(clusters[0].clusterId).toBe('state');
    expect(clusters[0].concepts.map(c => c.conceptId)).toEqual(['ICE', 'STEAM']);
  });

  it('CDC-002: CATEGORY_OF ve LOCATION_OF ayri clusterlara gitmelidir', () => {
    const mockConcepts: RankedRelatedConceptDTO[] = [
      { conceptId: 'RIVER', score: 0.9, depth: 1, relationType: 'LOCATION_OF' },
      { conceptId: 'LIQUID', score: 0.9, depth: 1, relationType: 'CATEGORY_OF' }
    ];

    const clusters = clusterer.cluster(mockConcepts);

    expect(clusters).toHaveLength(2);
    const categoryCluster = clusters.find(c => c.clusterId === 'category');
    const locationCluster = clusters.find(c => c.clusterId === 'location');

    expect(categoryCluster).toBeDefined();
    expect(locationCluster).toBeDefined();
    expect(categoryCluster?.concepts[0].conceptId).toBe('LIQUID');
    expect(locationCluster?.concepts[0].conceptId).toBe('RIVER');
  });

  it('CDC-003: Ayni puandaki ogeler deterministik alfabetik sirayla dizilmelidir', () => {
    const mockConcepts: RankedRelatedConceptDTO[] = [
      { conceptId: 'STEAM', score: 0.9, depth: 1, relationType: 'STATE_OF' },
      { conceptId: 'ICE', score: 0.9, depth: 1, relationType: 'STATE_OF' }
    ];

    const clusters = clusterer.cluster(mockConcepts);

    expect(clusters[0].concepts.map(c => c.conceptId)).toEqual(['ICE', 'STEAM']);
  });

  it('CDC-004: Bos traversal gidisinde [] donmelidir', () => {
    const clusters = clusterer.cluster([]);
    expect(clusters).toEqual([]);
  });

  it('CDC-005: Clusterer katmani tekrar traversal yapmamali, sadece mevcut listeyi kumelemelidir', () => {
    const mockConcepts: RankedRelatedConceptDTO[] = [
      { conceptId: 'LAKE', score: 0.7, depth: 2, relationType: 'LOCATION_OF' }
    ];

    const clusters = clusterer.cluster(mockConcepts);

    expect(clusters).toHaveLength(1);
    expect(clusters[0].concepts).toHaveLength(1);
    expect(clusters[0].concepts[0].depth).toBe(2);
  });
});