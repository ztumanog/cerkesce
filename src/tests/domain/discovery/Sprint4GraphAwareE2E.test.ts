import { describe, it, expect, beforeEach } from 'vitest';
import { MultilingualExplorer } from '../../../domain/discovery/services/MultilingualExplorer';
import { GraphTraversalService } from '../../../domain/discovery/services/GraphTraversalService';
import { DiscoveryAssembler } from '../../../domain/discovery/services/DiscoveryAssembler';
import { MeaningGraph } from '../../../domain/concept/services/MeaningGraph';
import { Concept } from '../../../domain/concept/Concept';

describe('Phase 5.1 Sprint 4: Graph-Aware Discovery E2E Certification', () => {
  let meaningGraph: MeaningGraph;
  let graphTraversalService: GraphTraversalService;
  let discoveryAssembler: DiscoveryAssembler;

  beforeEach(() => {
    meaningGraph = new MeaningGraph();

    // 1. Concept Tanımları ve İlişkiler
    const conceptWater = new Concept('CONCEPT_WATER', 'Water');
    (conceptWater as any).relations = [
      { targetConceptId: 'CONCEPT_ICE', type: 'STATE_OF' },
      { targetConceptId: 'CONCEPT_RIVER', type: 'LOCATION_OF' },
      { targetConceptId: 'CONCEPT_LIQUID', type: 'CATEGORY_OF' }
    ];

    const conceptIce = new Concept('CONCEPT_ICE', 'Ice');
    (conceptIce as any).relations = [
      { targetConceptId: 'CONCEPT_STEAM', type: 'STATE_OF' }
    ];

    const conceptRiver = new Concept('CONCEPT_RIVER', 'River');
    const conceptLiquid = new Concept('CONCEPT_LIQUID', 'Liquid');
    const conceptSteam = new Concept('CONCEPT_STEAM', 'Steam');

    meaningGraph.addConcept(conceptWater);
    meaningGraph.addConcept(conceptIce);
    meaningGraph.addConcept(conceptRiver);
    meaningGraph.addConcept(conceptLiquid);
    meaningGraph.addConcept(conceptSteam);

    // 2. GraphTraversalService'in Beklediği getNeighbors Adapter'ı
    const graphRepositoryAdapter = {
      getNeighbors: (conceptId: string) => {
        const concept = meaningGraph.getConcept(conceptId);
        if (!concept || !(concept as any).relations) return [];
        return (concept as any).relations.map((r: any) => ({
          targetConceptId: r.targetConceptId,
          relationType: r.type,
          weight: 1.0
        }));
      }
    };

    graphTraversalService = new GraphTraversalService(graphRepositoryAdapter as any);
    discoveryAssembler = new DiscoveryAssembler();
  });

  it('should traverse real MeaningGraph and project related concepts with real traversal engine', async () => {
    // Inline Stub Adaptörler
    const stubTranslationService = {
      search: async (query: string) => [
        { id: 'm_water_1', language: 'TR', term: query, definition: 'Berrak, kokusuz sıvı' }
      ]
    };

    const stubMeaningLinker = {
      resolveConcept: async (_meaningId: string) => ({
        id: 'CONCEPT_WATER',
        canonicalName: 'Water'
      })
    };

    const stubDialectResolver = {
      resolveVariants: async (conceptId: string, dialect?: string) => [
        { id: 'v_kbd_1', dialectCode: dialect || 'KBD', term: 'Псы', isFallback: false }
      ]
    };

    const explorer = new MultilingualExplorer(
      stubTranslationService,
      stubMeaningLinker,
      stubDialectResolver,
      graphTraversalService,
      discoveryAssembler
    );

    // ACT
    const result = await explorer.explore('su', { targetDialect: 'KBD' });

    // ASSERT: Temel Özellikler
    expect(result.query).toBe('su');
    expect(result.conceptId).toBe('CONCEPT_WATER');
    expect(result.canonicalName).toBe('Water');

    // ASSERT: Gerçek Traversal
    expect(result.relatedConcepts).toBeDefined();
    const conceptIds = result.relatedConcepts!.map(c => c.conceptId);

    // Kök Filtreleme Check
    expect(conceptIds).not.toContain('CONCEPT_WATER');

    // Derinlik 1 ve 2 Bağlantıları
    expect(conceptIds).toContain('CONCEPT_ICE');
    expect(conceptIds).toContain('CONCEPT_RIVER');
    expect(conceptIds).toContain('CONCEPT_LIQUID');
    expect(conceptIds).toContain('CONCEPT_STEAM');

    // ASSERT: Graph Metadata
    expect(result.graphMetadata?.maxDepth).toBe(2);
  });
});