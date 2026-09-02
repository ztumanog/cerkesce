import { describe, it, expect, beforeEach } from 'vitest';
import { GraphMutationService } from '../../domain/sync/services/GraphMutationService';

describe('Phase 9.2 - Real-time Knowledge Graph Sync Certification', () => {
  beforeEach(() => {
    GraphMutationService.clear();
  });

  it('SYNC-001: Graph mutation triggers selective cache invalidation for updated concept', () => {
    const mutationResult = GraphMutationService.applyMutation({
      mutationId: 'mut_001',
      conceptId: 'WATER_CONCEPT',
      type: 'NODE_UPDATED',
      timestamp: Date.now()
    });

    expect(mutationResult.success).toBe(true);
    expect(GraphMutationService.isCacheInvalidated('cache_concept_WATER_CONCEPT')).toBe(true);
    expect(GraphMutationService.isCacheInvalidated('cache_concept_FIRE_CONCEPT')).toBe(false);
  });
});