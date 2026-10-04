import { describe, it, expect } from 'vitest';
import { KnowledgeExplorerViewService } from '../../infra/ui/KnowledgeExplorerViewService';

describe('Sprint U-4 - KnowledgeExplorerViewService', () => {
  it('View uretir', () => {
    const view = KnowledgeExplorerViewService.getView();
    expect(view.timestamp).toBeDefined();
    expect(view.widgets.length).toBe(7);
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });

  it('Widget detaylari', () => {
    const view = KnowledgeExplorerViewService.getView();
    const phaseWidget = view.widgets.find(w => w.id === 'phase');
    expect(phaseWidget).toBeDefined();
    expect(phaseWidget?.title).toBeDefined();
  });

  it('Overall status hesaplanir', () => {
    const view = KnowledgeExplorerViewService.getView();
    expect(['ok', 'warning', 'critical']).toContain(view.overallStatus);
  });

  it('Summary uretir', () => {
    const view = KnowledgeExplorerViewService.getView();
    expect(view.summary.length).toBeGreaterThan(0);
  });

  it('Tum widgetlar', () => {
    const view = KnowledgeExplorerViewService.getView();
    const ids = view.widgets.map(w => w.id);
    expect(ids).toContain('phase');
    expect(ids).toContain('adr');
    expect(ids).toContain('historical');
    expect(ids).toContain('memory');
  });
});