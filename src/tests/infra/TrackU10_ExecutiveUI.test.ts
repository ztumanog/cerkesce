import { describe, it, expect } from 'vitest';
import { ExecutiveViewService } from '../../infra/ui/ExecutiveViewService';

describe('Sprint U-10 - Executive View UI', () => {
  it('View servisi calisiyor', () => {
    const view = ExecutiveViewService.getView();
    expect(view.widgets.length).toBe(4);
  });

  it('Widget yapisi dogru', () => {
    const view = ExecutiveViewService.getView();
    for (const widget of view.widgets) {
      expect(widget.id).toBeDefined();
      expect(widget.title).toBeDefined();
    }
  });

  it('Overall status', () => {
    const view = ExecutiveViewService.getView();
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });
});
