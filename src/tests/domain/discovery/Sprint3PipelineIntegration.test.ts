import { describe, it, expect, vi } from 'vitest';
import { MultilingualExplorer, ITranslationServiceMock, IMeaningConceptLinkerMock, IDialectResolverMock, IGraphTraversalServiceMock } from '../../../domain/discovery/services/MultilingualExplorer';
import { TraversalNode } from '../../../domain/discovery/dto/TraversalNode';

describe('Phase 5.1 Sprint 3: Knowledge Discovery Pipeline Certification', () => {
  it('should execute pipeline traversal and project relatedConcepts for query "water"', async () => {
    // 1. Mock Katmanları (WATER -> ICE, RIVER, LIQUID)
    const mockTranslationService: ITranslationServiceMock = {
      search: vi.fn().mockResolvedValue([
        { id: 'm_water_tr', language: 'TR', term: 'su', definition: 'Yaşam için gerekli berrak sıvı' }
      ])
    };

    const mockMeaningLinker: IMeaningConceptLinkerMock = {
      resolveConcept: vi.fn().mockResolvedValue({
        id: 'CONCEPT_WATER',
        canonicalName: 'Water'
      })
    };

    const mockDialectResolver: IDialectResolverMock = {
      resolveVariants: vi.fn().mockResolvedValue([
        { id: 'v_1', dialectCode: 'KBD', term: 'Псы' }
      ])
    };

    const mockNodes: TraversalNode[] = [
      { conceptId: 'CONCEPT_WATER', depth: 0, relationType: 'ROOT', weight: 1.0 },
      { conceptId: 'CONCEPT_ICE', depth: 1, relationType: 'STATE_OF', weight: 0.9 },
      { conceptId: 'CONCEPT_RIVER', depth: 1, relationType: 'LOCATION_OF', weight: 0.8 },
      { conceptId: 'CONCEPT_LIQUID', depth: 2, relationType: 'CATEGORY_OF', weight: 0.7 }
    ];

    const mockGraphTraversalService: IGraphTraversalServiceMock = {
      traverse: vi.fn().mockResolvedValue(mockNodes)
    };

    const explorer = new MultilingualExplorer(
      mockTranslationService,
      mockMeaningLinker,
      mockDialectResolver,
      mockGraphTraversalService
    );

    // 2. Pipeline Tetiği
    const result = await explorer.explore('water', { targetDialect: 'KBD' });

    // 3. Pipeline Doğrulamaları
    expect(result.query).toBe('water');
    expect(result.conceptId).toBe('CONCEPT_WATER');
    expect(result.canonicalName).toBe('Water');

    // Meanings & Variants
    expect(result.meanings).toHaveLength(1);
    expect(result.variants).toHaveLength(1);

    // Graph Traversal Invocation Check
    expect(mockGraphTraversalService.traverse).toHaveBeenCalledWith('CONCEPT_WATER', 2);
    expect(result.relatedConcepts).toBeDefined();

    // ROOT (CONCEPT_WATER) filtrelenmiş olmalı, geri kalan 3 ilişkili kavram kalmalı
    expect(result.relatedConcepts).toHaveLength(3);

    const relatedIds = result.relatedConcepts?.map(r => r.conceptId);
    expect(relatedIds).toContain('CONCEPT_ICE');
    expect(relatedIds).toContain('CONCEPT_RIVER');
    expect(relatedIds).toContain('CONCEPT_LIQUID');

    // Graph Metadata Check
    expect(result.graphMetadata).toEqual({
      maxDepth: 2,
      traversedNodes: 4
    });

    // Latency Check
    expect(result.executionTimeMs).toBeGreaterThanOrEqual(0);
  });
});