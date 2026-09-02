import { describe, it, expect } from 'vitest';
import { CytoscapeAdapter } from '../../presentation/adapters/CytoscapeAdapter';
import { ConceptNetworkDTO } from '../../domain/discovery/dto/ConceptNetworkDTO';

describe('Phase 6.2 - P6S2-02 CytoscapeAdapter Unit Tests', () => {
  it('should transform ConceptNetworkDTO into valid Cytoscape elements with nodeType and depth', () => {
    const mockDto: ConceptNetworkDTO = {
      nodes: [
        { id: 'WATER', label: 'WATER', nodeType: 'ROOT', depth: 0, score: 1.0, cluster: 'root' },
        { id: 'ICE', label: 'ICE', nodeType: 'CONCEPT', depth: 1, score: 0.9, cluster: 'state' }
      ],
      edges: [
        { source: 'WATER', target: 'ICE', relationType: 'STATE_OF', weight: 0.9 }
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

    const elements = CytoscapeAdapter.toCytoscapeElements(mockDto);

    expect(elements).toHaveLength(3);

    const rootNode = elements.find((e) => e.group === 'nodes' && e.data.id === 'WATER');
    expect(rootNode).toBeDefined();
    expect(rootNode?.data.nodeType).toBe('ROOT');
    expect(rootNode?.data.depth).toBe(0);
    expect(rootNode?.classes).toContain('node-type-root');

    const edge = elements.find((e) => e.group === 'edges');
    expect(edge).toBeDefined();
    expect(edge?.data.source).toBe('WATER');
    expect(edge?.data.target).toBe('ICE');
    expect(edge?.classes).toContain('edge-relation-state_of');
  });
});
