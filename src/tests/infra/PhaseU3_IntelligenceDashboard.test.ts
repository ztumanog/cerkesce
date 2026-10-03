import { describe, it, expect } from 'vitest';
import { IntelligenceDashboardViewService } from '../../infra/ui/IntelligenceDashboardViewService';

describe('Sprint U-3 - IntelligenceDashboardViewService', () => {
  it('View uretir', () => {
    const view = IntelligenceDashboardViewService.getView();
    expect(view.timestamp).toBeDefined();
    expect(view.widgets.length).toBe(4);
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });

  it('Widget detaylari', () => {
    const view = IntelligenceDashboardViewService.getView();
    const execWidget = view.widgets.find(w => w.id === 'executive');
    expect(execWidget).toBeDefined();
    expect(execWidget?.title).toBe('Executive Intelligence');
  });

  it('Overall status hesaplanir', () => {
    const view = IntelligenceDashboardViewService.getView();
    expect(['ok', 'warning', 'critical']).toContain(view.overallStatus);
  });

  it('Summary uretir', () => {
    const view = IntelligenceDashboardViewService.getView();
    expect(view.summary.length).toBeGreaterThan(0);
  });

  it('Tum widgetlar', () => {
    const view = IntelligenceDashboardViewService.getView();
    const ids = view.widgets.map(w => w.id);
    expect(ids).toContain('executive');
    expect(ids).toContain('capacity');
    expect(ids).toContain('decision');
    expect(ids).toContain('risk');
  });
});
