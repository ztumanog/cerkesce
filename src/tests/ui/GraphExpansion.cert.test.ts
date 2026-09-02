import { describe, it, expect } from 'vitest';
import { GraphMerger } from '../../domain/discovery/services/GraphMerger';
import { ConceptNetworkDTO } from '../../domain/discovery/dto/ConceptNetworkDTO';
import { CytoscapeAdapter } from '../../presentation/adapters/CytoscapeAdapter';

describe('Phase 6.2 - P6S2-05 Interactive Concept Expansion Certification Tests', () => {
  const baseGraph: ConceptNetworkDTO = {
    nodes: [
      { id: 'WATER', label: 'WATER', nodeType: 'ROOT', depth: 0 },
      { id: 'ICE', label: 'ICE', nodeType: 'CONCEPT', depth: 1 }
    ],
    edges: [
      { source: 'WATER', target: 'ICE', relationType: 'STATE_OF' }
    ],
    metadata: {
      rootConceptId: 'WATER',
      generatedAt: new Date().toISOString(),
      nodeCount: 2,
      edgeCount: 1,
      schemaVersion: '1.0.0',
      isDirected: true,
      isTruncated: false
    }
  };

  const iceSubGraph: ConceptNetworkDTO = {
    nodes: [
      { id: 'ICE', label: 'ICE', nodeType: 'CONCEPT', depth: 1 },
      { id: 'STEAM', label: 'STEAM', nodeType: 'CONCEPT', depth: 2 }
    ],
    edges: [
      { source: 'ICE', target: 'STEAM', relationType: 'STATE_OF' }
    ],
    metadata: {
      rootConceptId: 'ICE',
      generatedAt: new Date().toISOString(),
      nodeCount: 2,
      edgeCount: 1,
      schemaVersion: '1.0.0',
      isDirected: true,
      isTruncated: false
    }
  };

  it('EXP-001: Node expansion request triggers valid sub-graph merge', () => {
    const merged = GraphMerger.mergeNetworks(baseGraph, iceSubGraph, 'ICE');
    expect(merged.nodes).toHaveLength(3); // WATER, ICE, STEAM
    expect(merged.edges).toHaveLength(2);
  });

  it('EXP-002: Duplicate node prevention - existing node IDs are not duplicated', () => {
    const merged = GraphMerger.mergeNetworks(baseGraph, iceSubGraph, 'ICE');
    const iceNodes = merged.nodes.filter((n) => n.id === 'ICE');
    expect(iceNodes).toHaveLength(1);
  });

  it('EXP-003: Duplicate edge prevention - same source-target-relation edges are ignored', () => {
    const duplicateEdgeGraph: ConceptNetworkDTO = {
      ...iceSubGraph,
      edges: [{ source: 'WATER', target: 'ICE', relationType: 'STATE_OF' }]
    };
    const merged = GraphMerger.mergeNetworks(baseGraph, duplicateEdgeGraph, 'ICE');
    expect(merged.edges).toHaveLength(1);
  });

  it('EXP-004: Expanded node marked correctly with isExpanded = true and ▼ prefix', () => {
    const merged = GraphMerger.mergeNetworks(baseGraph, iceSubGraph, 'ICE');
    const iceNode = merged.nodes.find((n) => n.id === 'ICE');
    expect(iceNode?.isExpanded).toBe(true);

    const elements = CytoscapeAdapter.toCytoscapeElements(merged);
    const iceElement = elements.find((e) => e.data.id === 'ICE');
    expect(iceElement?.classes).toContain('node-expanded');
    expect(iceElement?.data.label).toContain('▼');
  });

  it('EXP-005: Guardrail ceiling (500 nodes) respected during expansion merge', () => {
    const largeGraph: ConceptNetworkDTO = {
      nodes: Array.from({ length: 510 }, (_, i) => ({
        id: `NODE_${i}`,
        label: `NODE_${i}`,
        nodeType: 'CONCEPT',
        depth: 2
      })),
      edges: [],
      metadata: {
        rootConceptId: 'WATER',
        generatedAt: new Date().toISOString(),
        nodeCount: 510,
        edgeCount: 0,
        schemaVersion: '1.0.0',
        isDirected: true,
        isTruncated: false
      }
    };

    const merged = GraphMerger.mergeNetworks(baseGraph, largeGraph, 'WATER');
    expect(merged.nodes.length).toBeLessThanOrEqual(500);
    expect(merged.metadata.isTruncated).toBe(true);
  });
});
