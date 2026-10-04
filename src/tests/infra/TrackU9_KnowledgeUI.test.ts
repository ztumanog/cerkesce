import { describe, it, expect } from 'vitest';
import { KnowledgeExplorerViewService } from '../../infra/ui/KnowledgeExplorerViewService';

describe('Sprint U-9 - Knowledge Explorer UI', () => {
  it('View servisi calisiyor', () => {
    const view = KnowledgeExplorerViewService.getView();
    expect(view.widgets.length).toBe(7);
  });

  it('Widget yapisi dogru', () => {
    const view = KnowledgeExplorerViewService.getView();
    for (const widget of view.widgets) {
      expect(widget.id).toBeDefined();
      expect(widget.title).toBeDefined();
    }
  });

  it('Overall status', () => {
    const view = KnowledgeExplorerViewService.getView();
    expect(view.overallStatus).toMatch(/^(ok|warning|critical)$/);
  });
});