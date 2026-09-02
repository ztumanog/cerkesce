import { describe, it, expect } from 'vitest';
import { KnowledgeRanker } from '../../../domain/discovery/services/KnowledgeRanker';
import { TraversalNode } from '../../../domain/discovery/dto/TraversalNode';
import { DiscoveryRelationType } from '../../../domain/discovery/types/DiscoveryRelationType';

describe('Phase 5.2.1: KnowledgeRanker Certification', () => {
  it('should rank related nodes deterministically using relation weight and depth penalty', () => {
    const nodes: TraversalNode[] = [
      { conceptId: 'CONCEPT_WATER', depth: 0, relationType: DiscoveryRelationType.ROOT },
      { conceptId: 'CONCEPT_RIVER', depth: 1, relationType: DiscoveryRelationType.LOCATION_OF }, // 0.80 * 0.90 = 0.720
      { conceptId: 'CONCEPT_LIQUID', depth: 1, relationType: DiscoveryRelationType.CATEGORY_OF }, // 0.85 * 0.90 = 0.765
      { conceptId: 'CONCEPT_ICE', depth: 1, relationType: DiscoveryRelationType.STATE_OF }        // 1.00 * 0.90 = 0.900
    ];

    const ranker = new KnowledgeRanker();
    const ranked = ranker.rank(nodes);

    expect(ranked).toHaveLength(3);
    expect(ranked[0].conceptId).toBe('CONCEPT_ICE');
    expect(ranked[0].score).toBe(0.9);

    expect(ranked[1].conceptId).toBe('CONCEPT_LIQUID');
    expect(ranked[1].score).toBe(0.765);

    expect(ranked[2].conceptId).toBe('CONCEPT_RIVER');
    expect(ranked[2].score).toBe(0.72);
  });

  it('should apply depth 2 penalty correctly', () => {
    const nodes: TraversalNode[] = [
      { conceptId: 'CONCEPT_WATER', depth: 0, relationType: DiscoveryRelationType.ROOT },
      { conceptId: 'CONCEPT_STEAM', depth: 2, relationType: DiscoveryRelationType.STATE_OF } // 1.00 * 0.75 = 0.750
    ];

    const ranker = new KnowledgeRanker();
    const ranked = ranker.rank(nodes);

    expect(ranked[0].score).toBe(0.75);
  });
});