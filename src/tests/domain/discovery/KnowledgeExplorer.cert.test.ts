import { describe, it, expect, beforeEach } from 'vitest';
import { DiscoveryFacade } from '../../../domain/discovery/services/DiscoveryFacade';

describe('Phase 5.3.2 - Knowledge Explorer API Certification (KE)', () => {
  let mockGraphRepo: any;
  let facade: DiscoveryFacade;

  const WATER_ID = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
  const ICE_ID = '01ARZ3NDEKTSV4RRFFQ69G5FB0';
  const RIVER_ID = '01ARZ3NDEKTSV4RRFFQ69G5FB1';

  beforeEach(() => {
    mockGraphRepo = {
      getNeighbors: (conceptId: string) => {
        if (conceptId === WATER_ID) {
          return [
            { conceptId: ICE_ID, relationType: 'STATE_OF', weight: 1.0 },
            { conceptId: RIVER_ID, relationType: 'LOCATION_OF', weight: 0.8 }
          ];
        }
        return [];
      }
    };

    facade = new DiscoveryFacade(mockGraphRepo);
  });

  it('KE-001: Kelime sorgusu (water) basariyla DiscoveryResultDTO üretmelidir', async () => {
    const result = await facade.explore('water');

    expect(result).toBeDefined();
    expect(result.rootConceptId).toBe(WATER_ID);
    expect(result.traversalNodes.length).toBeGreaterThan(0);
  });

  it('KE-002: Doğrudan Concept ID sorgusu basariyla calismalidir', async () => {
    const result = await facade.explore(WATER_ID);

    expect(result).toBeDefined();
    expect(result.rootConceptId).toBe(WATER_ID);
    expect(result.traversalNodes[0].conceptId).toBe(WATER_ID);
  });

  it('KE-003: Diyalekt ve derinlik parametreleri opsiyonel olarak aktarilabilmelidir', async () => {
    const result = await facade.explore('su', { maxDepth: 1, dialect: 'KBD' });

    expect(result).toBeDefined();
    expect(result.rootConceptId).toBe(WATER_ID);
  });

  it('KE-004: Ranking ve Clustering sonuclari ayni DTO icinde eksiksiz bulunmalidir', async () => {
    const result = await facade.explore('water');

    expect(result.rankedRelatedConcepts).toBeDefined();
    expect(result.rankedRelatedConcepts!.length).toBeGreaterThan(0);
    expect(result.contextClusters).toBeDefined();
    expect(result.contextClusters!.length).toBeGreaterThan(0);
  });

  it('KE-005: Tam Uçtan Uca Boru Hattı (Query -> Mapper -> Traversal -> Ranker -> Clusterer -> DTO) doğrulanmalıdır', async () => {
    const result = await facade.explore('water');

    expect(result.rootConceptId).toBe(WATER_ID);
    expect(result.contextClusters).toBeDefined();
    expect(result.contextClusters!.length).toBeGreaterThan(0);
  });
});