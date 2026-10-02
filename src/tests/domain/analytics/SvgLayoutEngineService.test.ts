import { describe, it, expect } from 'vitest';
import { SvgLayoutEngineService } from '../../../domain/analytics/services/SvgLayoutEngineService';
import { GenericConceptNetworkDTO } from '../../../domain/analytics/services/ExportEngineService';

describe('Phase 7.0.4 - SvgLayoutEngineService', () => {
  const sampleNetwork: GenericConceptNetworkDTO = {
    nodes: [
      { id: 'WATER', label: 'ПСЫ' },
      { id: 'ICE', label: 'МЫЛ' },
      { id: 'STEAM', label: 'ПШАГЪУЭ' }
    ],
    edges: [
      { id: 'E1', source: 'WATER', target: 'ICE', relationType: 'STATE_OF' },
      { id: 'E2', source: 'ICE', target: 'STEAM', relationType: 'STATE_OF' }
    ]
  };

  it('SVG-001: CIRCULAR layout ile SVG uretir', () => {
    const svg = SvgLayoutEngineService.render(sampleNetwork, { algorithm: 'CIRCULAR' });
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('circle');
    expect(svg).toContain('line');
  });

  it('SVG-002: GRID layout ile SVG uretir', () => {
    const svg = SvgLayoutEngineService.render(sampleNetwork, { algorithm: 'GRID' });
    expect(svg).toContain('<svg');
    expect(svg).toContain('circle');
  });

  it('SVG-003: FORCE layout ile SVG uretir', () => {
    const svg = SvgLayoutEngineService.render(sampleNetwork, { algorithm: 'FORCE' });
    expect(svg).toContain('<svg');
    expect(svg).toContain('circle');
  });

  it('SVG-004: XML escaping yapar', () => {
    const networkWithSpecialChars: GenericConceptNetworkDTO = {
      nodes: [{ id: 'TEST', label: 'A & B < C > D' }],
      edges: []
    };
    const svg = SvgLayoutEngineService.render(networkWithSpecialChars);
    expect(svg).toContain('&amp;');
    expect(svg).toContain('&lt;');
    expect(svg).toContain('&gt;');
  });

  it('SVG-005: Adigece karakterleri korur', () => {
    const svg = SvgLayoutEngineService.render(sampleNetwork);
    expect(svg).toContain('ПСЫ');
    expect(svg).toContain('МЫЛ');
    expect(svg).toContain('ПШАГЪУЭ');
  });

  it('SVG-006: Deterministik cikti', () => {
    const svg1 = SvgLayoutEngineService.render(sampleNetwork, { algorithm: 'CIRCULAR' });
    const svg2 = SvgLayoutEngineService.render(sampleNetwork, { algorithm: 'CIRCULAR' });
    expect(svg1).toBe(svg2);
  });

  it('SVG-007: Data URI format', () => {
    const dataUri = SvgLayoutEngineService.renderDataUri(sampleNetwork);
    expect(dataUri).toContain('data:image/svg+xml;base64,');
  });

  it('SVG-008: Width ve height ayarlanabilir', () => {
    const svg = SvgLayoutEngineService.render(sampleNetwork, { width: 1024, height: 768 });
    expect(svg).toContain('width="1024"');
    expect(svg).toContain('height="768"');
  });
});
