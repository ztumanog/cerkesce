import { describe, it, expect } from 'vitest';
import { LayoutEngineService } from '../../domain/analytics/services/LayoutEngineService';
import { BatchExportService } from '../../domain/analytics/services/BatchExportService';
import { ExportFormat } from '../../domain/analytics/dto/ExportOptionsDTO';
import { GenericConceptNetworkDTO } from '../../domain/analytics/services/ExportEngineService';

describe('Phase 7.0.4 - Layout Engine & Batch Export Certification Tests', () => {
  const sampleNetwork: GenericConceptNetworkDTO = {
    nodes: [
      { id: 'N1', label: 'Псы' },
      { id: 'N2', label: 'Псыхъуэ' },
      { id: 'N3', label: 'Хы' }
    ],
    edges: []
  };

  it('LAY-001: Calculates spatial coordinates correctly in CIRCULAR layout', () => {
    const result = LayoutEngineService.applyLayout(sampleNetwork, 'CIRCULAR', 800, 600);

    expect(result.nodes).toHaveLength(3);
    expect(result.nodes[0].x).toBeDefined();
    expect(result.nodes[0].y).toBeDefined();
    expect(result.nodes[0].x).not.toBe(result.nodes[1].x);
  });

  it('LAY-002: Distributes nodes evenly in GRID layout', () => {
    const result = LayoutEngineService.applyLayout(sampleNetwork, 'GRID', 800, 600);

    expect(result.nodes).toHaveLength(3);
    expect(result.nodes[0].x).toBeGreaterThan(0);
    expect(result.nodes[1].x).toBeGreaterThan(0);
  });

  it('LAY-003: Calculates spatial coordinates using FORCE algorithm strategy', () => {
    const result = LayoutEngineService.applyLayout(sampleNetwork, 'FORCE', 800, 600);

    expect(result.nodes).toHaveLength(3);
    expect(result.nodes[0].x).toBeDefined();
    expect(result.nodes[0].y).toBeDefined();
    expect(typeof result.nodes[0].x).toBe('number');
  });

  it('BAT-001: Exports multiple networks in a single batch call', () => {
    const items = [
      { id: 'NET_WATER', network: sampleNetwork },
      { id: 'NET_TREE', network: { nodes: [{ id: 'T1', label: 'Чъыг' }], edges: [] } }
    ];

    const result = BatchExportService.exportBatch(items, { format: ExportFormat.JSON });

    expect(result.totalProcessed).toBe(2);
    expect(result.exports['NET_WATER']).toBeDefined();
    expect(result.exports['NET_TREE']).toBeDefined();
    expect(result.exports['NET_WATER'].nodeCount).toBe(3);
    expect(result.exports['NET_TREE'].nodeCount).toBe(1);
  });

  it('BAT-002: Handles empty batch requests gracefully', () => {
    const result = BatchExportService.exportBatch([], { format: ExportFormat.JSON });

    expect(result.totalProcessed).toBe(0);
    expect(result.exports).toEqual({});
  });
});