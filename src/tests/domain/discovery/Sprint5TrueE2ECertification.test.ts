import { describe, it, expect, beforeEach } from 'vitest';
import { MultilingualExplorer } from '../../../domain/discovery/services/MultilingualExplorer';
import { GraphTraversalService } from '../../../domain/discovery/services/GraphTraversalService';
import { DiscoveryAssembler } from '../../../domain/discovery/services/DiscoveryAssembler';
import { MeaningGraph } from '../../../domain/concept/services/MeaningGraph';
import { Concept } from '../../../domain/concept/Concept';
import { ConceptID } from '../../../domain/concept/value-objects/ConceptID';
import { InMemoryTranslationRepository } from '../../../repository/InMemoryTranslationRepository';
import { InMemoryConceptRepository } from '../../../repository/InMemoryConceptRepository';
import { TranslationService } from '../../../services/TranslationService';
import { MeaningConceptLinker } from '../../../domain/concept/services/MeaningConceptLinker';
import { DialectResolver } from '../../../domain/dialect/services/DialectResolver';
import { DialectRuleRepository } from '../../../repository/DialectRuleRepository';

describe('Phase 5.1 Sprint 5: Repository-Backed True E2E Certification (Zero Mock)', () => {
  let translationRepo: InMemoryTranslationRepository;
  let conceptRepo: InMemoryConceptRepository;
  let translationService: TranslationService;
  let meaningLinker: MeaningConceptLinker;
  let dialectResolver: DialectResolver;
  let meaningGraph: MeaningGraph;
  let graphTraversalService: GraphTraversalService;
  let discoveryAssembler: DiscoveryAssembler;

  // Valid ULID Formats (26 Chars Base32)
  const ID_WATER = '01H8XPARK00000000000000WTR';
  const ID_ICE   = '01H8XPARK00000000000000ICE';
  const ID_RIVER = '01H8XPARK00000000000000RVR';
  const ID_LIQUID= '01H8XPARK00000000000000LQD';
  const ID_STEAM = '01H8XPARK00000000000000STM';

  beforeEach(() => {
    translationRepo = new InMemoryTranslationRepository();
    conceptRepo = new InMemoryConceptRepository();
    const dialectRuleRepo = new DialectRuleRepository();

    // 1. Translation Repository Verileri
    translationRepo.save({ id: 'm_water_1', language: 'TR', term: 'su', definition: 'H2O bileşiği' });
    translationRepo.save({ id: 'm_water_2', language: 'EN', term: 'water', definition: 'Clear liquid' });

    // 2. Valid ULID'ler ile Concept Nesneleri
    const conceptWater = new Concept({ id: ConceptID.create(ID_WATER) as any, canonicalName: 'Water' });
    (conceptWater as any).meaningIds = ['m_water_1', 'm_water_2'];
    (conceptWater as any).relations = [
      { targetConceptId: ID_ICE, type: 'STATE_OF' },
      { targetConceptId: ID_RIVER, type: 'LOCATION_OF' },
      { targetConceptId: ID_LIQUID, type: 'CATEGORY_OF' }
    ];

    const conceptIce = new Concept({ id: ConceptID.create(ID_ICE) as any, canonicalName: 'Ice' });
    (conceptIce as any).relations = [
      { targetConceptId: ID_STEAM, type: 'STATE_OF' }
    ];

    const conceptRiver = new Concept({ id: ConceptID.create(ID_RIVER) as any, canonicalName: 'River' });
    const conceptLiquid = new Concept({ id: ConceptID.create(ID_LIQUID) as any, canonicalName: 'Liquid' });
    const conceptSteam = new Concept({ id: ConceptID.create(ID_STEAM) as any, canonicalName: 'Steam' });

    conceptRepo.save(conceptWater);
    conceptRepo.save(conceptIce);
    conceptRepo.save(conceptRiver);
    conceptRepo.save(conceptLiquid);
    conceptRepo.save(conceptSteam);

    // 3. MeaningGraph ve Traversal Engine
    meaningGraph = new MeaningGraph();
    meaningGraph.addConcept(conceptWater);
    meaningGraph.addConcept(conceptIce);
    meaningGraph.addConcept(conceptRiver);
    meaningGraph.addConcept(conceptLiquid);
    meaningGraph.addConcept(conceptSteam);

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

    // 4. Somut Servisler
    translationService = new TranslationService(translationRepo);
    meaningLinker = new MeaningConceptLinker(conceptRepo);
    dialectResolver = new DialectResolver(dialectRuleRepo);
    graphTraversalService = new GraphTraversalService(graphRepositoryAdapter as any);
    discoveryAssembler = new DiscoveryAssembler();
  });

  it('should perform Zero-Mock True E2E discovery for WATER scenario', async () => {
    const explorer = new MultilingualExplorer(
      translationService as any,
      meaningLinker as any,
      dialectResolver as any,
      graphTraversalService,
      discoveryAssembler
    );

    const result = await explorer.explore('su', { targetDialect: 'KBD' });

    // ACT & ASSERT
    expect(result).toBeDefined();
    expect(result.query).toBe('su');
    expect(result.conceptId).toBe(ID_WATER);
    expect(result.canonicalName).toBe('Water');

    // Related Concepts Traversal Assertions
    expect(result.relatedConcepts).toBeDefined();
    const conceptIds = result.relatedConcepts!.map(c => c.conceptId);

    expect(conceptIds).not.toContain(ID_WATER);
    expect(conceptIds).toContain(ID_ICE);
    expect(conceptIds).toContain(ID_RIVER);
    expect(conceptIds).toContain(ID_LIQUID);
    expect(conceptIds).toContain(ID_STEAM);

    // Graph Metadata Assertions
    expect(result.graphMetadata?.maxDepth).toBe(2);
  });
});