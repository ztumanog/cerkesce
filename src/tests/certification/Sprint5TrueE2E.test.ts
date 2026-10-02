import { describe, it, expect, beforeEach } from 'vitest';
import { MultilingualExplorer } from '../../domain/discovery/services/MultilingualExplorer';
import { GraphTraversalService } from '../../domain/discovery/services/GraphTraversalService';
import { DiscoveryAssembler } from '../../domain/discovery/services/DiscoveryAssembler';
import { MeaningGraph } from '../../domain/concept/services/MeaningGraph';
import { Concept } from '../../domain/concept/Concept';
import { ConceptID } from '../../domain/concept/value-objects/ConceptID';
import { InMemoryTranslationRepository } from '../../repository/InMemoryTranslationRepository';
import { InMemoryConceptRepository } from '../../repository/InMemoryConceptRepository';
import { TranslationService } from '../../services/TranslationService';
import { MeaningConceptLinker } from '../../domain/concept/services/MeaningConceptLinker';

describe('Phase 5.1 Sprint 5: True Domain Construction E2E Certification', () => {
  let translationRepo: InMemoryTranslationRepository;
  let conceptRepo: InMemoryConceptRepository;
  let translationService: TranslationService;
  let meaningLinker: MeaningConceptLinker;
  let meaningGraph: MeaningGraph;
  let graphTraversalService: GraphTraversalService;
  let discoveryAssembler: DiscoveryAssembler;

  beforeEach(() => {
    translationRepo = new InMemoryTranslationRepository();
    translationRepo.clear();
    conceptRepo = new InMemoryConceptRepository();

    // 1. Somut Translation Girdileri
    translationRepo.save({
      id: 'm_water_1',
      lemma: 'su',
      meanings: [{ id: 'm_water_1', text: 'H2O bileşiği', language: 'TR' }]
    } as any);

    // 2. Domain Concept Nesneleri
    const conceptWater = new Concept({ id: ConceptID.create('CONCEPT_WATER') as any, preferredLabel: 'Water' });
    const conceptIce = new Concept({ id: ConceptID.create('CONCEPT_ICE') as any, preferredLabel: 'Ice' });
    const conceptRiver = new Concept({ id: ConceptID.create('CONCEPT_RIVER') as any, preferredLabel: 'River' });
    const conceptLiquid = new Concept({ id: ConceptID.create('CONCEPT_LIQUID') as any, preferredLabel: 'Liquid' });
    const conceptSteam = new Concept({ id: ConceptID.create('CONCEPT_STEAM') as any, preferredLabel: 'Steam' });

    conceptRepo.save(conceptWater);
    conceptRepo.save(conceptIce);
    conceptRepo.save(conceptRiver);
    conceptRepo.save(conceptLiquid);
    conceptRepo.save(conceptSteam);

    // 3. Meaning-Concept Köprüsü
    meaningLinker = new MeaningConceptLinker(conceptRepo);
    meaningLinker.link('m_water_1', 'CONCEPT_WATER');

    // 4. Graph İlişkileri
    meaningGraph = new MeaningGraph();
    meaningGraph.addConcept(conceptWater);
    meaningGraph.addConcept(conceptIce);
    meaningGraph.addConcept(conceptRiver);
    meaningGraph.addConcept(conceptLiquid);
    meaningGraph.addConcept(conceptSteam);

    meaningGraph.addRelation({ source: 'CONCEPT_WATER', target: 'CONCEPT_ICE', type: 'STATE_OF' });
    meaningGraph.addRelation({ source: 'CONCEPT_WATER', target: 'CONCEPT_RIVER', type: 'LOCATION_OF' });
    meaningGraph.addRelation({ source: 'CONCEPT_WATER', target: 'CONCEPT_LIQUID', type: 'CATEGORY_OF' });
    meaningGraph.addRelation({ source: 'CONCEPT_ICE', target: 'CONCEPT_STEAM', type: 'STATE_OF' });

    translationService = new TranslationService(translationRepo);
    graphTraversalService = new GraphTraversalService(meaningGraph);
    discoveryAssembler = new DiscoveryAssembler();
  });

  it('should execute true end-to-end discovery via clean domain construction', async () => {
    const explorer = new MultilingualExplorer(
      translationService,
      meaningLinker,
      undefined,
      graphTraversalService,
      discoveryAssembler
    );

    const result = await explorer.explore('su', { targetDialect: 'KBD' });

    expect(result).toBeDefined();
    expect(result.query).toBe('su');
    expect(result.conceptId).toBe('CONCEPT_WATER');
    expect(result.canonicalName).toBe('Water');

    expect(result.relatedConcepts).toBeDefined();
    const relatedIds = result.relatedConcepts!.map(c => c.conceptId);

    expect(relatedIds).not.toContain('CONCEPT_WATER');
    expect(relatedIds).toContain('CONCEPT_ICE');
    expect(relatedIds).toContain('CONCEPT_RIVER');
    expect(relatedIds).toContain('CONCEPT_LIQUID');
    expect(relatedIds).toContain('CONCEPT_STEAM');

    expect(result.graphMetadata?.maxDepth).toBe(2);
  });
});
