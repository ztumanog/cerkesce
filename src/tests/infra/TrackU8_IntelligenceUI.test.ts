import { describe, it, expect } from 'vitest';
import { IntelligenceDashboardViewService } from '../../infra/ui/IntelligenceDashboardViewService';

describe('Sprint U-8 - Intelligence Dashboard UI', () => {
  it('View servisi calisiyor', () => {
    const view = IntelligenceDashboardViewService.getView();
    expect(view.widgets.length).toBe(4);
  });

  it('Widget yapisi dogru', () => {
    const view = IntelligenceDashboardViewService.getView();
    for (const widget of view.widgets) {
      expect(widget.id).toBeDefined();
      expect(widget.title).toBeDefined();
    }
  });

  it('Overall status', () => {
    const view = IntelligenceDashboardViewService.getView();
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });
});
