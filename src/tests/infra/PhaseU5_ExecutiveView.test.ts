import { describe, it, expect } from 'vitest';
import { ExecutiveViewService } from '../../infra/ui/ExecutiveViewService';

describe('Sprint U-5 - ExecutiveViewService', () => {
  it('View uretir', () => {
    const view = ExecutiveViewService.getView();
    expect(view.timestamp).toBeDefined();
    expect(view.widgets.length).toBe(4);
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });

  it('Widget detaylari', () => {
    const view = ExecutiveViewService.getView();
    const govWidget = view.widgets.find(w => w.id === 'governance');
    expect(govWidget).toBeDefined();
    expect(govWidget?.title).toBe('Governance');
  });

  it('Overall status hesaplanir', () => {
    const view = ExecutiveViewService.getView();
    expect(['ok', 'warning', 'critical']).toContain(view.overallStatus);
  });

  it('Summary uretir', () => {
    const view = ExecutiveViewService.getView();
    expect(view.summary.length).toBeGreaterThan(0);
  });

  it('Tum widgetlar', () => {
    const view = ExecutiveViewService.getView();
    const ids = view.widgets.map(w => w.id);
    expect(ids).toContain('governance');
    expect(ids).toContain('operations');
    expect(ids).toContain('intelligence');
    expect(ids).toContain('knowledge');
  });
});
