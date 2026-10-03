import { describe, it, expect, beforeEach } from 'vitest';
import { KnowledgeGraphService } from '../../infra/knowledge/KnowledgeGraphService';

describe('Track C.2 - KnowledgeGraphService', () => {
  beforeEach(() => {
    KnowledgeGraphService.clear();
  });

  it('Entity ekler', () => {
    KnowledgeGraphService.addEntity({
      id: 'adr-001',
      type: 'adr',
      name: 'ADR 1',
      properties: {},
    });
    const report = KnowledgeGraphService.getReport();
    expect(report.entities).toBe(1);
  });

  it('Relation ekler', () => {
    KnowledgeGraphService.addEntity({ id: 'a', type: 'adr', name: 'A', properties: {} });
    KnowledgeGraphService.addEntity({ id: 'b', type: 'phase', name: 'B', properties: {} });
    KnowledgeGraphService.addRelation({ from: 'a', to: 'b', type: 'documents' });
    const report = KnowledgeGraphService.getReport();
    expect(report.relations).toBe(1);
  });

  it('Yol bulur', () => {
    KnowledgeGraphService.addEntity({ id: 'a', type: 'adr', name: 'A', properties: {} });
    KnowledgeGraphService.addEntity({ id: 'b', type: 'phase', name: 'B', properties: {} });
    KnowledgeGraphService.addEntity({ id: 'c', type: 'service', name: 'C', properties: {} });
    KnowledgeGraphService.addRelation({ from: 'a', to: 'b', type: 'documents' });
    KnowledgeGraphService.addRelation({ from: 'b', to: 'c', type: 'implements' });
    const path = KnowledgeGraphService.findPath('a', 'c');
    expect(path).toBeDefined();
    expect(path?.length).toBe(2);
  });

  it('Component sayisi', () => {
    KnowledgeGraphService.addEntity({ id: 'a', type: 'adr', name: 'A', properties: {} });
    KnowledgeGraphService.addEntity({ id: 'b', type: 'phase', name: 'B', properties: {} });
    const report = KnowledgeGraphService.getReport();
    expect(report.components).toBe(2);
  });
});
