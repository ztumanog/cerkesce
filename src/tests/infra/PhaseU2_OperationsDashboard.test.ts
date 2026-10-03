import { describe, it, expect } from 'vitest';
import { OperationsDashboardViewService } from '../../infra/ui/OperationsDashboardViewService';

describe('Sprint U-2 - OperationsDashboardViewService', () => {
  it('View uretir', () => {
    const view = OperationsDashboardViewService.getView();
    expect(view.timestamp).toBeDefined();
    expect(view.widgets.length).toBe(4);
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });

  it('Widget detaylari', () => {
    const view = OperationsDashboardViewService.getView();
    const healthWidget = view.widgets.find(w => w.id === 'health');
    expect(healthWidget).toBeDefined();
    expect(healthWidget?.title).toBe('Health');
  });

  it('Overall status hesaplanir', () => {
    const view = OperationsDashboardViewService.getView();
    expect(['ok', 'warning', 'critical']).toContain(view.overallStatus);
  });

  it('Summary uretir', () => {
    const view = OperationsDashboardViewService.getView();
    expect(view.summary.length).toBeGreaterThan(0);
  });

  it('Tum widgetlar', () => {
    const view = OperationsDashboardViewService.getView();
    const ids = view.widgets.map(w => w.id);
    expect(ids).toContain('health');
    expect(ids).toContain('capacity');
    expect(ids).toContain('slo');
    expect(ids).toContain('alerts');
  });
});
