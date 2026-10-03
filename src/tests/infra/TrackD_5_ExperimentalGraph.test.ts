import { describe, it, expect, beforeEach } from 'vitest';
import { ExperimentalGraphIntelligenceService } from '../../infra/research/ExperimentalGraphIntelligenceService';

describe('Track D.5 - ExperimentalGraphIntelligenceService', () => {
  beforeEach(() => {
    ExperimentalGraphIntelligenceService.clear();
  });

  it('Node ekler', () => {
    ExperimentalGraphIntelligenceService.addNode({
      id: 'n1',
      type: 'service',
      weight: 1,
      connections: ['n2', 'n3', 'n4'],
    });
    const report = ExperimentalGraphIntelligenceService.getReport();
    expect(report.totalNodes).toBe(1);
  });

  it('Merkezi dugum tespit eder', () => {
    ExperimentalGraphIntelligenceService.addNode({
      id: 'n1', type: 'service', weight: 1, connections: ['a', 'b', 'c'],
    });
    ExperimentalGraphIntelligenceService.addNode({
      id: 'n2', type: 'service', weight: 1, connections: [],
    });
    const insight = ExperimentalGraphIntelligenceService.detectCentralNodes(3);
    expect(insight.nodes).toContain('n1');
  });

  it('Izole dugum tespit eder', () => {
    ExperimentalGraphIntelligenceService.addNode({
      id: 'n1', type: 'service', weight: 1, connections: [],
    });
    const insight = ExperimentalGraphIntelligenceService.detectIsolatedNodes();
    expect(insight.nodes).toContain('n1');
  });

  it('Kume tespit eder', () => {
    ExperimentalGraphIntelligenceService.addNode({ id: 'a', type: 'service', weight: 1, connections: [] });
    ExperimentalGraphIntelligenceService.addNode({ id: 'b', type: 'service', weight: 1, connections: [] });
    const insight = ExperimentalGraphIntelligenceService.detectClusters();
    expect(insight.nodes.length).toBe(2);
  });

  it('Bos graf warning', () => {
    const report = ExperimentalGraphIntelligenceService.getReport();
    expect(report.status).toBe('warning');
  });
});
