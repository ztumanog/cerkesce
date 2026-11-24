import { describe, it, expect } from 'vitest';
import { CsvExporterService } from '../../../domain/analytics/services/CsvExporterService';
import { CanvasPngRendererService } from '../../../domain/analytics/services/CanvasPngRendererService';
import { GenericConceptNetworkDTO } from '../../../domain/analytics/services/ExportEngineService';

/**
 * P4-C: ZipExporterService silindi — gerçek ZIP üretmiyordu (stub: manifest +
 * base64; kendi dokümantasyonu "gerçek ZIP için archiver/jszip gerekir" diyordu)
 * ve yaptığının tamamı BatchExportService tarafından kapsanıyordu. ZIP-00x
 * testleri bu nedenle kaldırıldı.
 *
 * CsvExporter P4-C ile GraphExport'a ("CSV indir" butonu) bağlandı;
 * CanvasPngRendererService P4-C ile PNG akışına bağlandı (tarayıcı-güvenli
 * svgToPngDataUri düzeltmesiyle).
 */

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

  it('CSV-001: exportNetwork düğüm + kenar satırları üretir (GraphExport butonu)', () => {
    const csv = CsvExporterService.exportNetwork(sampleNetwork);
    expect(csv).toContain('type,id,source,target,label,relationType');
    expect(csv).toContain('node,WATER,,,ПСЫ,');
    expect(csv).toContain('edge,,WATER,ICE,,STATE_OF');
  });

  it('HARD-001: Adigece karakterler korunur', () => {
    const tsv = CsvExporterService.exportNetworkTsv(sampleNetwork);
    expect(tsv).toContain('ПСЫ');
    expect(tsv).toContain('МЫЛ');
  });

  it('PNG-001: CanvasPngRenderer SVG data URI döndürür (rasterizasyon tarayıcıda)', () => {
    const uri = CanvasPngRendererService.render(sampleNetwork, { width: 800, height: 600 });
    expect(uri.startsWith('data:image/svg+xml;base64,')).toBe(true);
    expect(uri.length).toBeGreaterThan(100);
  });

  it('PNG-002: renderHighRes ölçeklenmiş boyut üretir', () => {
    const uri = CanvasPngRendererService.renderHighRes(sampleNetwork, { width: 800, height: 600, scale: 2 });
    expect(uri.startsWith('data:image/svg+xml;base64,')).toBe(true);
    // SVG içinde ölçeklenmiş boyut görünmeli
    const decoded = atob(uri.split(',')[1]);
    expect(decoded).toContain('width="1600"');
  });
});
