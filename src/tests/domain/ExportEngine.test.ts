import { describe, it, expect } from 'vitest';
import { ExportFormat } from '../../domain/analytics/dto/ExportOptionsDTO';
import { ExportEngineService, GenericConceptNetworkDTO } from '../../domain/analytics/services/ExportEngineService';

describe('Phase 7.0 - Export Engine Certification Tests', () => {
  const sampleNetwork: GenericConceptNetworkDTO = {
    nodes: [
      { id: 'CONCEPT_RIVER', label: 'Псыхъуэ' },
      { id: 'CONCEPT_WATER', label: 'Псы & 水 <Water>' }
    ],
    edges: [
      { id: 'EDGE_1', source: 'CONCEPT_WATER', target: 'CONCEPT_RIVER', relationType: 'DERIVED_FROM' }
    ]
  };

  it('EXP-001: Exports valid JSON payload with metadata and schema version', () => {
    const result = ExportEngineService.exportNetwork(sampleNetwork, { format: ExportFormat.JSON });

    expect(result.format).toBe('JSON');
    expect(result.mimeType).toBe('application/json');
    expect(result.nodeCount).toBe(2);
    expect(result.edgeCount).toBe(1);

    const parsed = JSON.parse(result.content);
    expect(parsed.schemaVersion).toBe('1.0');
    expect(parsed.network.nodes).toHaveLength(2);
  });

  it('EXP-002: Generates valid SVG XML string with XML escaping', () => {
    const result = ExportEngineService.exportNetwork(sampleNetwork, {
      format: ExportFormat.SVG,
      width: 1024,
      height: 768
    });

    expect(result.format).toBe('SVG');
    expect(result.mimeType).toBe('image/svg+xml');
    expect(result.content).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(result.content).toContain('node-CONCEPT_WATER');
    // XML Escaping verification: & -> &amp;, < -> &lt;, > -> &gt;
    expect(result.content).toContain('Псы &amp; 水 &lt;Water&gt;');
  });

  it('EXP-003: Produces valid PNG stub data URI format', () => {
    const result = ExportEngineService.exportNetwork(sampleNetwork, { format: ExportFormat.PNG });

    expect(result.format).toBe('PNG');
    expect(result.mimeType).toBe('image/png');
    expect(result.content).toContain('data:image/png;base64,');
  });

  it('EXP-004: Throws error on invalid network structure', () => {
    expect(() => {
      ExportEngineService.exportNetwork(null as any, { format: ExportFormat.JSON });
    }).toThrow('Invalid ConceptNetworkDTO payload');
  });

  it('EXP-005: Guarantees deterministic output across multiple export runs', () => {
    const fixedTimestamp = '2026-09-02T12:00:00.000Z';
    const run1 = ExportEngineService.exportNetwork(sampleNetwork, { format: ExportFormat.JSON }, fixedTimestamp);
    const run2 = ExportEngineService.exportNetwork(sampleNetwork, { format: ExportFormat.JSON }, fixedTimestamp);

    expect(run1.content).toBe(run2.content);
    // Verified deterministic sorting: CONCEPT_RIVER comes before CONCEPT_WATER alphabetically in sorted output
    const parsed = JSON.parse(run1.content);
    expect(parsed.network.nodes[0].id).toBe('CONCEPT_RIVER');
    expect(parsed.network.nodes[1].id).toBe('CONCEPT_WATER');
  });

  it('EXP-006: Preserves Unicode characters (Adyghe Cyrillic & Palochka) without corruption', () => {
    const circassianNetwork: GenericConceptNetworkDTO = {
      nodes: [
        { id: 'C1', label: 'Псы' },
        { id: 'C2', label: 'Псыхъуэ' },
        { id: 'C3', label: 'КӀуэд' }
      ],
      edges: []
    };

    const jsonExport = ExportEngineService.exportNetwork(circassianNetwork, { format: ExportFormat.JSON });
    const svgExport = ExportEngineService.exportNetwork(circassianNetwork, { format: ExportFormat.SVG });

    expect(jsonExport.content).toContain('Псы');
    expect(jsonExport.content).toContain('Псыхъуэ');
    expect(jsonExport.content).toContain('КӀуэд');

    expect(svgExport.content).toContain('Псы');
    expect(svgExport.content).toContain('Псыхъуэ');
    expect(svgExport.content).toContain('КӀуэд');
  });
});