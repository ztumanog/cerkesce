import { describe, it, expect } from 'vitest';
import { LargeGraphOptimizerService, GraphNode, GraphEdge } from '../../domain/performance/services/LargeGraphOptimizerService';

describe('Phase 8.1 - Production Performance & Large Graph Certification', () => {
  const generateLargeGraph = (nodeCount: number, edgeFactor = 2) => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({ id: `N${i}`, label: `Kavram_${i}` });
    }

    for (let i = 0; i < nodeCount * edgeFactor; i++) {
      const source = `N${Math.floor(Math.random() * nodeCount)}`;
      const target = `N${Math.floor(Math.random() * nodeCount)}`;
      if (source !== target) {
        edges.push({ source, target });
      }
    }

    return { nodes, edges };
  };

  it('PERF-001: Optimizes large graph (>1000 nodes) processing under 50ms benchmark threshold', () => {
    const { nodes, edges } = generateLargeGraph(1200, 2);
    const chunk = LargeGraphOptimizerService.optimizeForViewport(nodes, edges, 200);

    expect(chunk.nodes.length).toBeLessThanOrEqual(200);
    expect(chunk.totalNodes).toBe(1200);
    expect(chunk.processingTimeMs).toBeLessThan(50);
  });

  it('PERF-002: Prioritizes high-degree central nodes in viewport chunking', () => {
    const nodes: GraphNode[] = [
      { id: 'hub', label: 'Merkez Kavram' },
      { id: 'leaf1', label: 'Yaprak 1' },
      { id: 'leaf2', label: 'Yaprak 2' },
      { id: 'leaf3', label: 'Yaprak 3' }
    ];

    const edges: GraphEdge[] = [
      { source: 'hub', target: 'leaf1' },
      { source: 'hub', target: 'leaf2' },
      { source: 'hub', target: 'leaf3' }
    ];

    const chunk = LargeGraphOptimizerService.optimizeForViewport(nodes, edges, 2);
    expect(chunk.nodes.map(n => n.id)).toContain('hub');
  });

  it('PERF-003: Preserves structural edge integrity during viewport optimization', () => {
    const { nodes, edges } = generateLargeGraph(500, 2);
    const chunk = LargeGraphOptimizerService.optimizeForViewport(nodes, edges, 100);

    const visibleNodeIds = new Set(chunk.nodes.map(n => n.id));
    chunk.edges.forEach(edge => {
      expect(visibleNodeIds.has(edge.source)).toBe(true);
      expect(visibleNodeIds.has(edge.target)).toBe(true);
    });
  });
});