import { describe, it, expect } from 'vitest';
import { OperationsDashboardViewService } from '../../infra/ui/OperationsDashboardViewService';

describe('Sprint U-7 - Operations Dashboard UI', () => {
  it('View servisi calisiyor', () => {
    const view = OperationsDashboardViewService.getView();
    expect(view.widgets.length).toBe(4);
  });

  it('Widget yapisi dogru', () => {
    const view = OperationsDashboardViewService.getView();
    for (const widget of view.widgets) {
      expect(widget.id).toBeDefined();
      expect(widget.title).toBeDefined();
    }
  });

  it('Overall status', () => {
    const view = OperationsDashboardViewService.getView();
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });
});
