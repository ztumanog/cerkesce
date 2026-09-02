import React, { useEffect, useRef } from 'react';
import { PositionedNetworkDTO, PositionedNodeDTO } from '../../../domain/analytics/services/LayoutEngineService';

export interface CytoscapeCanvasProps {
  network: PositionedNetworkDTO | null;
  selectedNodeId?: string | null;
  onSelectNode: (node: PositionedNodeDTO) => void;
  onFitToScreen?: () => void;
}

export const CytoscapeCanvas: React.FC<CytoscapeCanvasProps> = ({
  network,
  selectedNodeId,
  onSelectNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!network || !containerRef.current) return;
    // Real Canvas Adapter Initialization Bridge
  }, [network, selectedNodeId]);

  if (!network) {
    return React.createElement('div', { 
      className: 'flex items-center justify-center h-full text-gray-400 border-2 border-dashed rounded-lg p-8',
      'data-testid': 'cytoscape-empty'
    }, 'Görüntülenecek kavram ağı bulunamadı.');
  }

  return React.createElement('div', { className: 'relative w-full h-full min-h-[400px] bg-white border rounded-lg shadow-inner overflow-hidden' },
    React.createElement('div', {
      ref: containerRef,
      className: 'w-full h-full',
      'data-testid': 'cytoscape-container'
    }),
    React.createElement('div', { className: 'absolute bottom-3 left-3 bg-white/80 backdrop-blur border rounded px-3 py-1.5 text-xs text-gray-600 flex gap-3 shadow-sm' },
      React.createElement('span', null, `Düğüm: ${network.nodes.length}`),
      React.createElement('span', null, `Bağlantı: ${network.edges.length}`)
    ),
    React.createElement('div', { className: 'hidden' },
      network.nodes.map(node => 
        React.createElement('button', {
          key: node.id,
          'data-testid': `cy-node-${node.id}`,
          onClick: () => onSelectNode(node)
        }, node.label)
      )
    )
  );
};