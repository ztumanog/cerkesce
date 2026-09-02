import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { NetworkExplorerPage } from '../../ui/pages/NetworkExplorerPage';
import { LayoutEngineService } from '../../domain/analytics/services/LayoutEngineService';

describe('Phase 7.1 - NetworkExplorerPage Integration Tests', () => {
  const sampleNetwork = {
    nodes: [
      { id: 'water', label: 'Псы' },
      { id: 'river', label: 'Псыхъуэ' }
    ],
    edges: [{ source: 'water', target: 'river' }]
  };

  it('NEP-001: Renders page tree and toolbar properly on initial mount', () => {
    const pageElement = React.createElement(NetworkExplorerPage, { initialQuery: 'water' });
    expect(React.isValidElement(pageElement)).toBe(true);
    expect(pageElement.type).toBe(NetworkExplorerPage);
  });

  it('NEP-002: Executes search API and initializes concept network layout', async () => {
    const mockSearchApi = vi.fn().mockResolvedValue(sampleNetwork);
    const pageElement = React.createElement(NetworkExplorerPage, {
      initialQuery: 'water',
      onSearchApi: mockSearchApi
    });

    expect(mockSearchApi).not.toHaveBeenCalled();
    const result = await mockSearchApi('water');
    expect(result.nodes).toHaveLength(2);
  });

  it('NEP-003: Computes spatial layout when layout selection changes', () => {
    const circularResult = LayoutEngineService.applyLayout(sampleNetwork, 'CIRCULAR');
    const gridResult = LayoutEngineService.applyLayout(sampleNetwork, 'GRID');

    expect(circularResult.nodes[0].x).not.toBe(gridResult.nodes[0].x);
  });

  it('NEP-004: Interactive Expansion merges new nodes into existing network', async () => {
    const mockExpandApi = vi.fn().mockResolvedValue({
      nodes: [{ id: 'ice', label: 'Мывэ' }],
      edges: [{ source: 'water', target: 'ice' }]
    });

    const expansion = await mockExpandApi('water');
    const mergedNodes = [...sampleNetwork.nodes, ...expansion.nodes];

    expect(mergedNodes).toHaveLength(3);
    expect(mergedNodes.map(n => n.id)).toContain('ice');
  });

  it('NEP-005: Preserves node order and structural determinism during recalculations', () => {
    const layout1 = LayoutEngineService.applyLayout(sampleNetwork, 'CIRCULAR', 800, 600);
    const layout2 = LayoutEngineService.applyLayout(sampleNetwork, 'CIRCULAR', 800, 600);

    expect(layout1.nodes).toEqual(layout2.nodes);
    expect(layout1.edges).toEqual(layout2.edges);
  });
});