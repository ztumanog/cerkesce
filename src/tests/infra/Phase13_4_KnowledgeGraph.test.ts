import { describe, it, expect, beforeEach } from 'vitest';
import { ArchitectureKnowledgeGraphService } from '../../infra/knowledge/ArchitectureKnowledgeGraphService';

describe('Sprint 13.4 - ArchitectureKnowledgeGraphService', () => {
  beforeEach(() => {
    ArchitectureKnowledgeGraphService.clear();
  });

  it('Node ve edge ekler', () => {
    ArchitectureKnowledgeGraphService.addNode({
      id: 'ADR-001',
      type: 'adr',
      label: 'Test ADR',
    });
    ArchitectureKnowledgeGraphService.addNode({
      id: 'Phase-1',
      type: 'phase',
      label: 'Phase 1',
    });
    ArchitectureKnowledgeGraphService.addEdge({
      from: 'ADR-001',
      to: 'Phase-1',
      relation: 'documents',
    });
    expect(ArchitectureKnowledgeGraphService.getNode('ADR-001')).toBeDefined();
  });

  it('Komsulari bulur', () => {
    ArchitectureKnowledgeGraphService.addNode({ id: 'A', type: 'adr', label: 'A' });
    ArchitectureKnowledgeGraphService.addNode({ id: 'B', type: 'phase', label: 'B' });
    ArchitectureKnowledgeGraphService.addEdge({ from: 'A', to: 'B', relation: 'documents' });
    const neighbors = ArchitectureKnowledgeGraphService.getNeighbors('A');
    expect(neighbors.length).toBe(1);
    expect(neighbors[0].id).toBe('B');
  });

  it('Rapor uretir', () => {
    ArchitectureKnowledgeGraphService.addNode({ id: 'A', type: 'adr', label: 'A' });
    ArchitectureKnowledgeGraphService.addNode({ id: 'B', type: 'phase', label: 'B' });
    ArchitectureKnowledgeGraphService.addEdge({ from: 'A', to: 'B', relation: 'documents' });
    const report = ArchitectureKnowledgeGraphService.getReport();
    expect(report.stats.adr).toBe(1);
    expect(report.stats.phase).toBe(1);
    expect(report.status).toBe('ok');
  });

  it('Bos graf warning', () => {
    const report = ArchitectureKnowledgeGraphService.getReport();
    expect(report.status).toBe('warning');
  });
});
