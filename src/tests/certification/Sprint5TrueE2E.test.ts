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
import { DialectResolver } from '../../domain/dialect/services/DialectResolver';
import { DialectRuleRepository } from '../../repository/DialectRuleRepository';

describe('Phase 5.1 Sprint 5: True Domain Construction E2E Certification', () => {
  let translationRepo: InMemoryTranslationRepository;
  let conceptRepo: InMemoryConceptRepository;
  let translationService: TranslationService;
  let meaningLinker: MeaningConceptLinker;
  let dialectResolver: DialectResolver;
  let meaningGraph: MeaningGraph;
  let graphTraversalService: GraphTraversalService;
  let discoveryAssembler: DiscoveryAssembler;

  beforeEach(() => {
    translationRepo = new InMemoryTranslationRepository();
    conceptRepo = new InMemoryConceptRepository();
    const dialectRuleRepo = new DialectRuleRepository();

    // 1. Somut Translation Girdileri
    translationRepo.save({
      id: 'm_water_1',
      lemma: 'su',
      meanings: [{ id: 'm_water_1', text: 'H2O bileşiği', language: 'TR' }]
    } as any);

    // 2. Domain Concept Nesneleri
    const conceptWater = new Concept({ id: ConceptID.create('CONCEPT_WATER') as any, canonicalName: 'Water' });
    const conceptIce = new Concept({ id: ConceptID.create('CONCEPT_ICE') as any, canonicalName: 'Ice' });
    const conceptRiver = new Concept({ id: ConceptID.create('CONCEPT_RIVER') as any, canonicalName: 'River' });
    const conceptLiquid = new Concept({ id: ConceptID.create('CONCEPT_LIQUID') as any, canonicalName: 'Liquid' });
    const conceptSteam = new Concept({ id: ConceptID.create('CONCEPT_STEAM') as any, canonicalName: 'Steam' });

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

    meaningGraph.addRelation('CONCEPT_WATER', 'CONCEPT_ICE', 'STATE_OF');
    meaningGraph.addRelation('CONCEPT_WATER', 'CONCEPT_RIVER', 'LOCATION_OF');
    meaningGraph.addRelation('CONCEPT_WATER', 'CONCEPT_LIQUID', 'CATEGORY_OF');
    meaningGraph.addRelation('CONCEPT_ICE', 'CONCEPT_STEAM', 'STATE_OF');

    const graphAdapter = {
      getNeighbors: (conceptId: string) => {
        const concept = meaningGraph.getConcept(conceptId);
        if (!concept) return [];
        const relations = (concept as any).relations || [];
        return relations.map((r: any) => ({
          targetConceptId: r.targetConceptId,
          relationType: r.relationType || r.type || 'RELATED',
          weight: r.weight ?? 1.0
        }));
      }
    };

    translationService = new TranslationService(translationRepo);
    dialectResolver = new DialectResolver(dialectRuleRepo);
    graphTraversalService = new GraphTraversalService(graphAdapter as any);
    discoveryAssembler = new DiscoveryAssembler();
  });

  it('should execute true end-to-end discovery via clean domain construction', async () => {
    const explorer = new MultilingualExplorer(
      translationService,
      meaningLinker,
      dialectResolver,
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