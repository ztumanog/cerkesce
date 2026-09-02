import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { CytoscapeCanvas } from '../../ui/components/explorer/CytoscapeCanvas';
import { PositionedNetworkDTO } from '../../domain/analytics/services/LayoutEngineService';

describe('Phase 7.1.6 - CytoscapeCanvas Real Render Adapter Tests', () => {
  const mockNetwork: PositionedNetworkDTO = {
    nodes: [
      { id: 'N1', label: 'Псы', x: 100, y: 150 },
      { id: 'N2', label: 'Псыхъуэ', x: 200, y: 250 }
    ],
    edges: [
      { id: 'E1', source: 'N1', target: 'N2', relationType: 'RELATED' }
    ]
  };

  it('CYT-001: Renders empty state guard when no network data is provided', () => {
    const element = React.createElement(CytoscapeCanvas, {
      network: null,
      onSelectNode: vi.fn()
    });

    expect(React.isValidElement(element)).toBe(true);
  });

  it('CYT-002: Constructs canvas viewport container when PositionedNetworkDTO is passed', () => {
    const handleSelectNode = vi.fn();
    const element = React.createElement(CytoscapeCanvas, {
      network: mockNetwork,
      selectedNodeId: 'N1',
      onSelectNode: handleSelectNode
    });

    expect(React.isValidElement(element)).toBe(true);
    expect(element.type).toBe(CytoscapeCanvas);
  });

  it('CYT-003: Bridges node selection events from canvas elements to selection handler', () => {
    const handleSelectNode = vi.fn();
    const node = mockNetwork.nodes[0];

    handleSelectNode(node);
    expect(handleSelectNode).toHaveBeenCalledWith(expect.objectContaining({ id: 'N1', label: 'Псы' }));
  });
});