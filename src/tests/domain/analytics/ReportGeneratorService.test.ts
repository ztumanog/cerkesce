import { describe, it, expect } from 'vitest';
import { ReportGeneratorService } from '../../../domain/analytics/services/ReportGeneratorService';
import { GenericConceptNetworkDTO } from '../../../domain/analytics/services/ExportEngineService';

describe('Phase 7.0.5 - ReportGeneratorService (REPORT-001: ürünleştirildi)', () => {
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
    expect(report.title).toBe('Kavram Ağı Raporu');
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
    expect(md).toContain('# Kavram Ağı Raporu');
    expect(md).toContain('## Özet');
    expect(md).toContain('## Düğümler');
    expect(md).toContain('## İstatistikler');
  });

  it('REP-004: JSON formatina cevirir', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork);
    const json = ReportGeneratorService.toJSON(report);
    const parsed = JSON.parse(json);
    expect(parsed.title).toBe('Kavram Ağı Raporu');
  });

  it('REP-005: Istatistikler dahil', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork, { includeStats: true });
    const statsSection = report.sections.find(s => s.heading === 'İstatistikler');
    expect(statsSection).toBeDefined();
  });

  it('REP-006: Adigece karakterleri korur', () => {
    const report = ReportGeneratorService.generateNetworkReport(sampleNetwork);
    const md = ReportGeneratorService.toMarkdown(report);
    expect(md).toContain('ПСЫ');
    expect(md).toContain('МЫЛ');
  });

  it('REP-007: Özet bölümü REPORT-001 v1 şablonunu içerir (kavram/merkez/izole)', () => {
    // 3 düğümlü ağ: WATER merkez (2 kenar), ICE bağlantılı, SNOW izole
    const ag: GenericConceptNetworkDTO = {
      nodes: [
        { id: 'WATER', label: 'ПСЫ' },
        { id: 'ICE', label: 'МЫЛ' },
        { id: 'SNOW', label: 'ЩЫЙ' }
      ],
      edges: [
        { id: 'E1', source: 'WATER', target: 'ICE', relationType: 'STATE_OF' },
        { id: 'E2', source: 'WATER', target: 'SNOW', relationType: 'STATE_OF' }
      ]
    };
    const report = ReportGeneratorService.generateNetworkReport(ag, { concept: 'SU' });
    const ozet = report.sections.find(s => s.heading === 'Özet');
    expect(ozet).toBeDefined();
    expect(ozet!.content).toContain('Kavram: SU');
    expect(ozet!.content).toContain('Düğüm Sayısı: 3');
    expect(ozet!.content).toContain('Bağ Sayısı: 2');
    expect(ozet!.content).toContain('Merkez Kavram: ПСЫ'); // en yüksek derece (2)
  });

  it('REP-008: İzole düğüm sayısı doğru hesaplanır', () => {
    // WATER-ICE bağlı, SNOW izole
    const ag: GenericConceptNetworkDTO = {
      nodes: [
        { id: 'WATER', label: 'ПСЫ' },
        { id: 'ICE', label: 'МЫЛ' },
        { id: 'SNOW', label: 'ЩЫЙ' }
      ],
      edges: [
        { id: 'E1', source: 'WATER', target: 'ICE', relationType: 'STATE_OF' }
      ]
    };
    const report = ReportGeneratorService.generateNetworkReport(ag);
    const ozet = report.sections.find(s => s.heading === 'Özet');
    expect(ozet!.content).toContain('İzole Düğüm: 1');
    expect(ozet!.content).toContain('Merkez Kavram: ПСЫ');
  });

  it('REP-009: Kenarsız ağda merkez kavram yoktur, tüm düğümler izoledir', () => {
    const ag: GenericConceptNetworkDTO = {
      nodes: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' }
      ],
      edges: []
    };
    const report = ReportGeneratorService.generateNetworkReport(ag);
    const ozet = report.sections.find(s => s.heading === 'Özet');
    expect(ozet!.content).toContain('Merkez Kavram: —');
    expect(ozet!.content).toContain('İzole Düğüm: 2');
    // Kenarlar bölümü boş ağda üretilmez
    expect(report.sections.find(s => s.heading === 'Kenarlar')).toBeUndefined();
  });
});
