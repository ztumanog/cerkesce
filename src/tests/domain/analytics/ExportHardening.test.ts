import { describe, it, expect } from 'vitest';
import { ZipExporterService } from '../../../domain/analytics/services/ZipExporterService';
import { CsvExporterService } from '../../../domain/analytics/services/CsvExporterService';
import { GenericConceptNetworkDTO } from '../../../domain/analytics/services/ExportEngineService';

describe('Phase 7.3 - Export Hardening', () => {
  const sampleNetwork: GenericConceptNetworkDTO = {
    nodes: [
      { id: 'WATER', label: 'ПСЫ' },
      { id: 'ICE', label: 'МЫЛ' }
    ],
    edges: [
      { id: 'E1', source: 'WATER', target: 'ICE', relationType: 'STATE_OF' }
    ]
  };

  const sampleItems = [
    { id: 'NET_WATER', network: sampleNetwork },
    { id: 'NET_ICE', network: sampleNetwork }
  ];

  it('ZIP-001: ZIP export uretir', () => {
    const result = ZipExporterService.exportZip(sampleItems);
    expect(result.filename).toContain('.zip');
    expect(result.mimeType).toBe('application/zip');
    expect(result.itemCount).toBe(2);
  });

  it('ZIP-002: ZIP base64 dondurur', () => {
    const result = ZipExporterService.exportZip(sampleItems);
    expect(result.base64.length).toBeGreaterThan(0);
  });

  it('ZIP-003: ZIP manifest dondurur', () => {
    const manifest = ZipExporterService.getManifest(sampleItems);
    const parsed = JSON.parse(manifest);
    expect(parsed.itemCount).toBe(2);
    expect(parsed.version).toBe('1.0.0');
  });

  it('ZIP-004: Bos ZIP', () => {
    const result = ZipExporterService.exportZip([]);
    expect(result.itemCount).toBe(0);
  });

  it('ZIP-005: Gecersiz input hata verir', () => {
    expect(() => ZipExporterService.exportZip(null as any)).toThrow();
  });

  it('TSV-001: TSV export uretir', () => {
    const tsv = CsvExporterService.exportNetworkTsv(sampleNetwork);
    expect(tsv).toContain('type\tid\tsource\ttarget');
    expect(tsv).toContain('node\tWATER');
  });

  it('PIPE-001: Pipe export uretir', () => {
    const pipe = CsvExporterService.exportNetworkPipe(sampleNetwork);
    expect(pipe).toContain('type|id|source|target');
    expect(pipe).toContain('node|WATER');
  });

  it('HARD-001: Adigece karakterler korunur', () => {
    const tsv = CsvExporterService.exportNetworkTsv(sampleNetwork);
    expect(tsv).toContain('ПСЫ');
    expect(tsv).toContain('МЫЛ');
  });
});
