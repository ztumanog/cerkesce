import { describe, it, expect, beforeEach } from 'vitest';
import { DiscoveryFacade } from '../../../domain/discovery/services/DiscoveryFacade';

describe('Phase 5.3.3 - Integration & Validation Certification (IV)', () => {
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

  it('IV-001: Cross-Lingual Discovery - Farklı dillerdeki kelimeler aynı kök kavrama haritalanmalıdır', async () => {
    const resultEn = await facade.explore('water');
    const resultTr = await facade.explore('su');
    const resultAdy = await facade.explore('psı');

    expect(resultEn.conceptId).toBe(WATER_ID);
    expect(resultTr.conceptId).toBe(WATER_ID);
    expect(resultAdy.conceptId).toBe(WATER_ID);
  });

  it('IV-002: Knowledge Ranking - Skorların deterministik üretimi', async () => {
    const result = await facade.explore('su');
    
    expect(result.relatedConcepts).toBeDefined();
    const iceRanking = result.relatedConcepts!.find((r: any) => r.conceptId === ICE_ID);
    
    expect(iceRanking).toBeDefined();
    expect(iceRanking!.score).toBeGreaterThan(0);
  });

  it('IV-003: Context Cluster Validation - Kavramsal kümelerin doğru oluşturulması', async () => {
    const result = await facade.explore('water');
    
    expect(result.contextClusters).toBeDefined();
    
    const stateCluster = result.contextClusters!.find((c: any) => c.clusterId === 'state');
    expect(stateCluster).toBeDefined();
    expect(stateCluster!.concepts.some((c: any) => c.conceptId === ICE_ID)).toBe(true);
  });

  it('IV-004: DiscoveryFacade Contract Stability - DTO projeksiyon stabilitesi', async () => {
    const result = await facade.explore(WATER_ID);
    
    expect(result).toHaveProperty('conceptId');
    expect(result).toHaveProperty('relatedConcepts');
    expect(result).toHaveProperty('contextClusters');
    
    expect(Array.isArray(result.relatedConcepts)).toBe(true);
    expect(Array.isArray(result.contextClusters)).toBe(true);
  });

  it('IV-005: Performance Validation - Concurrent request (Eşzamanlı istek) toleransı', async () => {
    const start = performance.now();
    
    const promises = Array.from({ length: 100 }).map((_, index) => 
      facade.explore(index % 2 === 0 ? 'water' : 'su', { maxDepth: 2 })
    );
    
    const results = await Promise.all(promises);
    const end = performance.now();
    
    expect(results.length).toBe(100);
    expect(results.every((r: any) => r.conceptId === WATER_ID)).toBe(true);
    
    const duration = end - start;
    expect(duration).toBeLessThan(1000);
  });
});