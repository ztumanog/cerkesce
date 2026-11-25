import { describe, it, expect } from 'vitest';
import { LayoutEngineService } from '../../../domain/analytics/services/LayoutEngineService';

/**
 * LayoutEngineService birim testleri.
 *
 * Tarihce: NEP-003 ve NEP-005 testleri NetworkExplorerPage.test.ts icinde
 * yasiyordu (A5-UI-DEMO-001 temizliginden once). Olu demo sayfayla birlikte
 * dosya silinirken canlı servisin kapsami BURAYA tasindi — Bas Mimar sarti:
 * "testler baska bileşenleri de kapsıyorsa parçalayıp kalan kısmı koru".
 *
 * LayoutEngineService canli zincirin parçasi: ExportEngineService,
 * CanvasPngRendererService, SvgLayoutEngineService, GraphExport.
 */

const sampleNetwork = {
  nodes: [
    { id: 'water', label: 'псы' },
    { id: 'river', label: 'псыхъуэ' },
  ],
  edges: [{ source: 'water', target: 'river' }],
};

describe('LayoutEngineService (A5-UI-DEMO-001 tasinan kapsam)', () => {
  it('LE-001 (eski NEP-003): farkli layout algoritmalari farkli uzamsal sonuc uretir', () => {
    const circularResult = LayoutEngineService.applyLayout(sampleNetwork, 'CIRCULAR', 800, 600);
    const gridResult = LayoutEngineService.applyLayout(sampleNetwork, 'GRID', 800, 600);

    expect(circularResult.nodes[0].x).not.toBe(gridResult.nodes[0].x);
  });

  it('LE-002 (eski NEP-005): tekrar hesaplamada dugum sirasi ve yapisal determinizm korunur', () => {
    const layout1 = LayoutEngineService.applyLayout(sampleNetwork, 'CIRCULAR', 800, 600);
    const layout2 = LayoutEngineService.applyLayout(sampleNetwork, 'CIRCULAR', 800, 600);

    expect(layout1.nodes).toEqual(layout2.nodes);
    expect(layout1.edges).toEqual(layout2.edges);
  });
});
