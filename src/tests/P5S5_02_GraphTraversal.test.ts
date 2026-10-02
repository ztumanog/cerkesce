import { describe, it, expect, beforeEach } from 'vitest';
import { MeaningGraph } from '../domain/concept/services/MeaningGraph';
import { GraphTraversalService } from '../domain/discovery/services/GraphTraversalService';

describe('P5S5-02: Repository-Backed Graph Traversal Sertifikasyonu', () => {
  let graph: MeaningGraph;
  let traversalService: GraphTraversalService;

  const WATER_ID = 'C-WATER';
  const ICE_ID = 'C-ICE';
  const RIVER_ID = 'C-RIVER';
  const RIVER_BRANCH_ID = 'C-RIVER-BRANCH';
  const LIQUID_ID = 'C-LIQUID';
  const STEAM_ID = 'C-STEAM';
  const OCEAN_ID = 'C-OCEAN';

  beforeEach(() => {
    graph = new MeaningGraph();
    traversalService = new GraphTraversalService(graph);

    graph.addEdge(WATER_ID, ICE_ID, 'RELATED');
    graph.addEdge(WATER_ID, RIVER_ID, 'RELATED');
    graph.addEdge(WATER_ID, LIQUID_ID, 'CHILD');
    graph.addEdge(LIQUID_ID, STEAM_ID, 'RELATED');
    graph.addEdge(RIVER_ID, RIVER_BRANCH_ID, 'RELATED');
    graph.addEdge(RIVER_BRANCH_ID, OCEAN_ID, 'RELATED');
    graph.addEdge(ICE_ID, WATER_ID, 'RELATED');
  });

  it('Depth 1 ve Depth 2 düğümlerini eksiksiz getirmelidir', () => {
    const results = traversalService.traverse(WATER_ID, 2);
    const resultIds = results.map((result) => result.conceptId);

    expect(resultIds).toContain(ICE_ID);
    expect(resultIds).toContain(RIVER_ID);
    expect(resultIds).toContain(LIQUID_ID);
    expect(resultIds).toContain(STEAM_ID);
  });

  it('Depth 3 sınırını aşmamalı ve OCEAN düğümünü dahil etmemelidir', () => {
    const results = traversalService.traverse(WATER_ID, 2);
    const resultIds = results.map((result) => result.conceptId);

    expect(resultIds).not.toContain(OCEAN_ID);
  });

  it('Cycle durumunda başlangıç düğümünü tekrar eklememelidir', () => {
    const results = traversalService.traverse(WATER_ID, 2);
    const resultIds = results.map((result) => result.conceptId);

    expect(resultIds.filter((id) => id === WATER_ID)).toHaveLength(1);
  });
});
