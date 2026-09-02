import { describe, it, expect, beforeEach } from 'vitest';
import { MultilingualExplorer } from '../../../domain/discovery/services/MultilingualExplorer';
import { GraphTraversalService } from '../../../domain/discovery/services/GraphTraversalService';
import { DiscoveryAssembler } from '../../../domain/discovery/services/DiscoveryAssembler';
import { MeaningGraph } from '../../../domain/concept/services/MeaningGraph';
import { Concept } from '../../../domain/concept/Concept';
import { ConceptID } from '../../../domain/value-objects/ConceptID';

describe('Phase 5.1 Sprint 4: Graph-Aware Discovery E2E Certification', () => {
  let meaningGraph: MeaningGraph;
  let graphTraversalService: GraphTraversalService;
  let discoveryAssembler: DiscoveryAssembler;

  beforeEach(() => {
    meaningGraph = new MeaningGraph();

    // Create valid ULID-based ConceptIDs
    const waterID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FAV');
    const iceID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FB0');
    const riverID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FB1');
    const liquidID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FB2');
    const steamID = ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FB3');

    // 1. Concept Tanımları ve İlişkiler - USE PROPER CONSTRUCTOR
    const conceptWater = Concept.create(waterID, 'Water');
    (conceptWater as any).relations = [
      { targetConceptId: iceID.getValue(), type: 'STATE_OF' },
      { targetConceptId: riverID.getValue(), type: 'LOCATION_OF' },
      { targetConceptId: liquidID.getValue(), type: 'CATEGORY_OF' }
    ];

    const conceptIce = Concept.create(iceID, 'Ice');
    (conceptIce as any).relations = [
      { targetConceptId: steamID.getValue(), type: 'STATE_OF' }
    ];

    const conceptRiver = Concept.create(riverID, 'River');
    const conceptLiquid = Concept.create(liquidID, 'Liquid');
    const conceptSteam = Concept.create(steamID, 'Steam');

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
        id: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
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
    expect(result.conceptId).toBe('01ARZ3NDEKTSV4RRFFQ69G5FAV');
    expect(result.canonicalName).toBe('Water');

    // ASSERT: Gerçek Traversal
    expect(result.relatedConcepts).toBeDefined();
    const conceptIds = result.relatedConcepts!.map(c => c.conceptId);

    // Kök Filtreleme Check
    expect(conceptIds).not.toContain('01ARZ3NDEKTSV4RRFFQ69G5FAV');

    // Derinlik 1 ve 2 Bağlantıları
    expect(conceptIds).toContain('01ARZ3NDEKTSV4RRFFQ69G5FB0');
    expect(conceptIds).toContain('01ARZ3NDEKTSV4RRFFQ69G5FB1');
    expect(conceptIds).toContain('01ARZ3NDEKTSV4RRFFQ69G5FB2');
    expect(conceptIds).toContain('01ARZ3NDEKTSV4RRFFQ69G5FB3');

    // ASSERT: Graph Metadata
    expect(result.graphMetadata?.maxDepth).toBe(2);
  });
});