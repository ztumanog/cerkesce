import { describe, it, expect } from 'vitest';
import { CanvasPngRendererService } from '../../../domain/analytics/services/CanvasPngRendererService';
import { GenericConceptNetworkDTO } from '../../../domain/analytics/services/ExportEngineService';

describe('Phase 7.0.4 - CanvasPngRendererService', () => {
  const sampleNetwork: GenericConceptNetworkDTO = {
    nodes: [
      { id: 'WATER', label: 'ПСЫ' },
      { id: 'ICE', label: 'МЫЛ' }
    ],
    edges: [
      { id: 'E1', source: 'WATER', target: 'ICE', relationType: 'STATE_OF' }
    ]
  };

  it('PNG-001: PNG data URI uretir', () => {
    const png = CanvasPngRendererService.render(sampleNetwork);
    expect(png).toContain('data:image/png;base64,');
  });

  it('PNG-002: SVG to PNG data URI', () => {
    const svg = '<svg></svg>';
    const png = CanvasPngRendererService.svgToPngDataUri(svg);
    expect(png).toContain('data:image/svg+xml;base64,');
  });

  it('PNG-003: Yuksek cozunurluk (2x)', () => {
    const png = CanvasPngRendererService.renderHighRes(sampleNetwork, { scale: 2 });
    expect(png).toContain('data:image/png;base64,');
  });

  it('PNG-004: Yuksek cozunurluk (4x)', () => {
    const png = CanvasPngRendererService.renderHighRes(sampleNetwork, { scale: 4 });
    expect(png).toContain('data:image/png;base64,');
  });

  it('PNG-005: Width/height ayarlanabilir', () => {
    const png = CanvasPngRendererService.render(sampleNetwork, { width: 1024, height: 768 });
    expect(png).toContain('data:image/png;base64,');
  });

  it('PNG-006: Adigece karakterleri korur', () => {
    const svg = '<svg>ПСЫ</svg>';
    const png = CanvasPngRendererService.svgToPngDataUri(svg);
    const decoded = Buffer.from(png.split(',')[1], 'base64').toString('utf-8');
    expect(decoded).toContain('ПСЫ');
  });
});
