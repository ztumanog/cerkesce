import { describe, it, expect } from 'vitest';
import { GovernanceDashboardViewService } from '../../infra/ui/GovernanceDashboardViewService';

describe('Sprint U-1 - GovernanceDashboardViewService', () => {
  it('View uretir', () => {
    const view = GovernanceDashboardViewService.getView();
    expect(view.timestamp).toBeDefined();
    expect(view.widgets.length).toBe(4);
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });

  it('Widget detaylari', () => {
    const view = GovernanceDashboardViewService.getView();
    const adrWidget = view.widgets.find(w => w.id === 'adr');
    expect(adrWidget).toBeDefined();
    expect(adrWidget?.title).toBe('ADR Status');
  });

  it('Overall status hesaplanir', () => {
    const view = GovernanceDashboardViewService.getView();
    expect(['ok', 'warning', 'critical']).toContain(view.overallStatus);
  });

  it('Summary uretir', () => {
    const view = GovernanceDashboardViewService.getView();
    expect(view.summary.length).toBeGreaterThan(0);
  });

  it('Tum widgetlar', () => {
    const view = GovernanceDashboardViewService.getView();
    const ids = view.widgets.map(w => w.id);
    expect(ids).toContain('adr');
    expect(ids).toContain('phase');
    expect(ids).toContain('risk');
    expect(ids).toContain('compliance');
  });
});
