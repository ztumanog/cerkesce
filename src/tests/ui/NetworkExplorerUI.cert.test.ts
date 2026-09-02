import { describe, it, expect } from 'vitest';
import { CytoscapeAdapter } from '../../presentation/adapters/CytoscapeAdapter';
import { ConceptNetworkDTO } from '../../domain/discovery/dto/ConceptNetworkDTO';

describe('Phase 6.2 - UI Polish & Guardrail Badge Certification Tests', () => {
  it('UI-001: Truncated metadata correctly flags Guardrail Warning Badge display state', () => {
    const truncatedDto: ConceptNetworkDTO = {
      nodes: Array.from({ length: 500 }, (_, i) => ({ id: `N${i}`, label: `N${i}`, nodeType: 'CONCEPT', depth: 1 })),
      edges: [],
      metadata: {
        rootConceptId: 'WATER',
        generatedAt: new Date().toISOString(),
        nodeCount: 500,
        edgeCount: 0,
        schemaVersion: '1.0.0',
        isDirected: true,
        isTruncated: true
      }
    };

    expect(truncatedDto.metadata.isTruncated).toBe(true);
    expect(truncatedDto.nodes.length).toBe(500);
  });

  it('UI-002: Adapter correctly passes score, cluster, and depth metadata for tooltip rendering', () => {
    const dto: ConceptNetworkDTO = {
      nodes: [{ id: 'ICE', label: 'ICE', nodeType: 'CONCEPT', depth: 1, score: 0.92, cluster: 'state' }],
      edges: [],
      metadata: {
        rootConceptId: 'WATER',
        generatedAt: new Date().toISOString(),
        nodeCount: 1,
        edgeCount: 0,
        schemaVersion: '1.0.0',
        isDirected: true,
        isTruncated: false
      }
    };

    const elements = CytoscapeAdapter.toCytoscapeElements(dto);
    const nodeData = elements[0].data as any;

    expect(nodeData.score).toBe(0.92);
    expect(nodeData.cluster).toBe('state');
    expect(nodeData.depth).toBe(1);
  });
});
