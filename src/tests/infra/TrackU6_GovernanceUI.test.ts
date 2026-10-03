import { describe, it, expect } from 'vitest';
import { GovernanceDashboardViewService } from '../../infra/ui/GovernanceDashboardViewService';

describe('Sprint U-6 - Governance Dashboard UI', () => {
  it('View servisi calisiyor', () => {
    const view = GovernanceDashboardViewService.getView();
    expect(view.widgets.length).toBe(4);
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });

  it('Widget yapisi dogru', () => {
    const view = GovernanceDashboardViewService.getView();
    for (const widget of view.widgets) {
      expect(widget.id).toBeDefined();
      expect(widget.title).toBeDefined();
      expect(widget.value).toBeDefined();
      expect(widget.status).toMatch(/^(ok|warning|critical)$/);
    }
  });

  it('Summary ve timestamp', () => {
    const view = GovernanceDashboardViewService.getView();
    expect(view.summary.length).toBeGreaterThan(0);
    expect(view.timestamp).toBeDefined();
  });
});
