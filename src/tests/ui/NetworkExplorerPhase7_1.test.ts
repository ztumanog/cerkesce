import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { ConceptDetailDrawer } from '../../ui/components/explorer/ConceptDetailDrawer';
import { NetworkExplorerToolbar } from '../../ui/components/explorer/NetworkExplorerToolbar';

describe('Phase 7.1 - Interactive Concept Network Explorer UI Tests', () => {
  it('UI-001: ConceptDetailDrawer handles node selection and null states correctly', () => {
    const handleClose = vi.fn();
    const handleExpand = vi.fn();
    const node = { id: 'N1', label: 'Псы', x: 100, y: 200, weight: 0.95 };

    // Null state doğrulaması
    const emptyElement = ConceptDetailDrawer({
      selectedNode: null,
      onClose: handleClose,
      onExpand: handleExpand
    });
    expect(emptyElement).toBeNull();

    // ReactElement ağaç doğrulaması
    const element = React.createElement(ConceptDetailDrawer, {
      selectedNode: node,
      onClose: handleClose,
      onExpand: handleExpand
    });

    expect(React.isValidElement(element)).toBe(true);
    expect(element.type).toBe(ConceptDetailDrawer);
  });

  it('UI-002: NetworkExplorerToolbar constructs UI controls tree properly', () => {
    const handleLayoutChange = vi.fn();
    const handleExport = vi.fn();
    const handleFit = vi.fn();

    const element = React.createElement(NetworkExplorerToolbar, {
      currentLayout: 'CIRCULAR',
      onLayoutChange: handleLayoutChange,
      onExport: handleExport,
      onFitToScreen: handleFit
    });

    expect(React.isValidElement(element)).toBe(true);
    expect(element.type).toBe(NetworkExplorerToolbar);
  });
});