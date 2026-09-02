import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryConceptRepository } from '../repository/InMemoryConceptRepository';
import { MeaningGraph } from '../domain/discovery/MeaningGraph';
import { GraphTraversalService } from '../domain/discovery/GraphTraversalService';
import * as ConceptModule from '../domain/concept';

const { Concept } = ConceptModule as any;
const ConceptID = (ConceptModule as any).ConceptID;

describe('P5S5-02: Repository-Backed Graph Traversal Sertifikasyonu', () => {
  let conceptRepo: InMemoryConceptRepository;
  let graph: MeaningGraph;
  let traversalService: GraphTraversalService;

  const WATER_ID = 'C-WATER';
  const ICE_ID = 'C-ICE';
  const RIVER_ID = 'C-RIVER';
  const LIQUID_ID = 'C-LIQUID';
  const STEAM_ID = 'C-STEAM';
  const OCEAN_ID = 'C-OCEAN'; // Depth 3 testi için

  beforeEach(async () => {
    conceptRepo = new InMemoryConceptRepository();
    
    // Kavramların Oluşturulması ve Kaydedilmesi
    const createConcept = (idStr: string, label: string) => {
      let cId = ConceptID && typeof ConceptID.create === 'function' ? ConceptID.create(idStr) : idStr;
      return new Concept({ id: cId, prefLabel: label, description: label });
    };

    await conceptRepo.save(createConcept(WATER_ID, 'Water'));
    await conceptRepo.save(createConcept(ICE_ID, 'Ice'));
    await conceptRepo.save(createConcept(RIVER_ID, 'River'));
    await conceptRepo.save(createConcept(LIQUID_ID, 'Liquid'));
    await conceptRepo.save(createConcept(STEAM_ID, 'Steam'));
    await conceptRepo.save(createConcept(OCEAN_ID, 'Ocean'));

    // Graf ve Servis Kurulumu
    graph = new MeaningGraph();
    traversalService = new GraphTraversalService(graph, conceptRepo);

    // DEPTH 1 İLİŞKİLERİ (WATER merkezli)
    graph.addEdge(WATER_ID, ICE_ID, 'RELATED', 1.0);
    graph.addEdge(WATER_ID, RIVER_ID, 'RELATED', 1.0);
    graph.addEdge(WATER_ID, LIQUID_ID, 'CHILD_OF', 1.0);

    // DEPTH 2 İLİŞKİSİ
    graph.addEdge(LIQUID_ID, STEAM_ID, 'RELATED', 0.8);

    // DEPTH 3 İLİŞKİSİ (Sınır Testi)
    graph.addEdge(RIVER_ID, OCEAN_ID, 'FLOWS_INTO', 0.9);

    // CYCLE İLİŞKİSİ (Döngü Testi: WATER -> ICE -> WATER)
    graph.addEdge(ICE_ID, WATER_ID, 'MELT_INTO', 1.0);
  });

  it('1. Depth 1 ve Depth 2 düğümlerini eksiksiz getirmelidir', async () => {
    const results = await traversalService.traverse(WATER_ID, { maxDepth: 2 });
    
    const resultIds = results.map(r => 
      typeof r.concept.id === 'string' ? r.concept.id : (r.concept.id.getValue ? r.concept.id.getValue() : String(r.concept.id))
    );

    expect(resultIds).toContain(ICE_ID);     // Depth 1
    expect(resultIds).toContain(RIVER_ID);   // Depth 1
    expect(resultIds).toContain(LIQUID_ID);  // Depth 1
    expect(resultIds).toContain(STEAM_ID);   // Depth 2
  });

  it('2. Depth 3 sınırını aşmamalı ve OCEAN düğümünü dahil etmemelidir', async () => {
    const results = await traversalService.traverse(WATER_ID, { maxDepth: 2 });
    
    const resultIds = results.map(r => 
      typeof r.concept.id === 'string' ? r.concept.id : (r.concept.id.getValue ? r.concept.id.getValue() : String(r.concept.id))
    );

    expect(resultIds).not.toContain(OCEAN_ID); // Sınır koruması
  });

  it('3. Cycle (A->B->A) durumunda sonsuz döngüye girmeden çalışmalıdır', async () => {
    // Traverse işlemi timeout'a düşmeden tamamlanıyorsa cycle protection çalışıyor demektir.
    const results = await traversalService.traverse(WATER_ID, { maxDepth: 2 });
    expect(results.length).toBeGreaterThan(0);
    
    // Su nesnesinin kendisi dönen sonuçlar arasında (discovery listesinde) tekrar yer almamalıdır
    const resultIds = results.map(r => 
      typeof r.concept.id === 'string' ? r.concept.id : (r.concept.id.getValue ? r.concept.id.getValue() : String(r.concept.id))
    );
    expect(resultIds.filter(id => id === WATER_ID).length).toBe(0);
  });
});