import { describe, it, expect } from 'vitest';
import { ReportGeneratorService } from '../../../domain/analytics/services/ReportGeneratorService';
import { GenericConceptNetworkDTO } from '../../../domain/analytics/services/ExportEngineService';

describe('Phase 7.0.5 - ReportGeneratorService', () => {
  const sampleNetwork: GenericConceptNetworkDTO = {
    nodes: [
      { id: 'WATER', label: 'ПСЫ' },
      { id: 'ICE', label: 'МЫЛ' }
    ],
    edges: [
      { id: 'E1', source: 'WATER', target: 'ICE', relationType: 'STATE_OF' }
    ]
  };

  it('REP-001: Network raporu uretir', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork);
    expect(report.title).toBe('Concept Network Report');
    expect(report.sections.length).toBeGreaterThan(0);
  });

  it('REP-002: Baslik ve yazar ayarlanabilir', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork, {
      title: 'Ozel Rapor',
      author: 'Test Yazar'
    });
    expect(report.title).toBe('Ozel Rapor');
    expect(report.author).toBe('Test Yazar');
  });

  it('REP-003: Markdown formatina cevirir', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork);
    const md = ReportGeneratorService.toMarkdown(report);
    expect(md).toContain('# Concept Network Report');
    expect(md).toContain('## Ozet');
  });

  it('REP-004: JSON formatina cevirir', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork);
    const json = ReportGeneratorService.toJSON(report);
    const parsed = JSON.parse(json);
    expect(parsed.title).toBe('Concept Network Report');
  });

  it('REP-005: Istatistikler dahil', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork, { includeStats: true });
    const statsSection = report.sections.find(s => s.heading === 'Istatistikler');
    expect(statsSection).toBeDefined();
  });

  it('REP-006: Adigece karakterleri korur', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork);
    const md = ReportGeneratorService.toMarkdown(report);
    expect(md).toContain('ПСЫ');
    expect(md).toContain('МЫЛ');
  });
});
