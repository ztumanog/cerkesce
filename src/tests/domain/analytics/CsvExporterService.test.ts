import { describe, it, expect } from 'vitest';
import { CsvExporterService } from '../../../domain/analytics/services/CsvExporterService';
import { GenericConceptNetworkDTO } from '../../../domain/analytics/services/ExportEngineService';

describe('Phase 7.0.5 - CsvExporterService', () => {
  const sampleNetwork: GenericConceptNetworkDTO = {
    nodes: [
      { id: 'WATER', label: 'ПСЫ' },
      { id: 'ICE', label: 'МЫЛ' }
    ],
    edges: [
      { id: 'E1', source: 'WATER', target: 'ICE', relationType: 'STATE_OF' }
    ]
  };

  it('CSV-001: Network CSV uretir', () => {
    const csv = CsvExporterService.exportNetwork(sampleNetwork);
    expect(csv).toContain('type,id,source,target,label,relationType');
    expect(csv).toContain('node,WATER');
    expect(csv).toContain('edge,,WATER,ICE');
  });

  it('CSV-002: Sadece dugumler', () => {
    const csv = CsvExporterService.exportNodes(sampleNetwork);
    expect(csv).toContain('id,label');
    expect(csv).toContain('WATER,ПСЫ');
  });

  it('CSV-003: Sadece kenarlar', () => {
    const csv = CsvExporterService.exportEdges(sampleNetwork);
    expect(csv).toContain('source,target,relationType');
    expect(csv).toContain('WATER,ICE,STATE_OF');
  });

  it('CSV-004: Virgul escaping', () => {
    const networkWithComma: GenericConceptNetworkDTO = {
      nodes: [{ id: 'TEST', label: 'A, B, C' }],
      edges: []
    };
    const csv = CsvExporterService.exportNodes(networkWithComma);
    expect(csv).toContain('A; B; C');
  });
});
