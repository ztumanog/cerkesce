import React, { useState } from 'react';
import { LayoutAlgorithm, LayoutEngineService, PositionedNetworkDTO, PositionedNodeDTO } from '../../domain/analytics/services/LayoutEngineService';
import { ExportFormat } from '../../domain/analytics/dto/ExportOptionsDTO';
import { ExportEngineService, GenericConceptNetworkDTO } from '../../domain/analytics/services/ExportEngineService';
import { NetworkExplorerToolbar } from '../components/explorer/NetworkExplorerToolbar';
import { ConceptDetailDrawer } from '../components/explorer/ConceptDetailDrawer';

export interface NetworkExplorerPageProps {
  initialQuery?: string;
  onSearchApi?: (query: string) => Promise<GenericConceptNetworkDTO>;
  onExpandApi?: (nodeId: string) => Promise<GenericConceptNetworkDTO>;
}

export const NetworkExplorerPage: React.FC<NetworkExplorerPageProps> = ({
  initialQuery = '',
  onSearchApi,
  onExpandApi
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentLayout, setCurrentLayout] = useState<LayoutAlgorithm>('CIRCULAR');
  const [rawNetwork, setRawNetwork] = useState<GenericConceptNetworkDTO | null>(null);
  const [positionedNetwork, setPositionedNetwork] = useState<PositionedNetworkDTO | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const networkData = onSearchApi 
        ? await onSearchApi(searchQuery)
        : { nodes: [{ id: searchQuery, label: searchQuery }], edges: [] };
      
      setRawNetwork(networkData);
      const positioned = LayoutEngineService.applyLayout(networkData, currentLayout);
      setPositionedNetwork(positioned);
      setSelectedNodeId(null);
    } catch (err: any) {
      setError(err?.message || 'Arama sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLayoutChange = (newLayout: LayoutAlgorithm) => {
    setCurrentLayout(newLayout);
    if (rawNetwork) {
      const positioned = LayoutEngineService.applyLayout(rawNetwork, newLayout);
      setPositionedNetwork(positioned);
    }
  };

  const handleExpandNode = async (nodeId: string) => {
    if (!onExpandApi || !rawNetwork) return;
    setIsLoading(true);
    try {
      const expansionData = await onExpandApi(nodeId);
      const existingIds = new Set(rawNetwork.nodes.map(n => n.id));
      const newNodes = expansionData.nodes.filter(n => !existingIds.has(n.id));
      
      const mergedNetwork: GenericConceptNetworkDTO = {
        nodes: [...rawNetwork.nodes, ...newNodes],
        edges: [...rawNetwork.edges, ...expansionData.edges]
      };

      setRawNetwork(mergedNetwork);
      const positioned = LayoutEngineService.applyLayout(mergedNetwork, currentLayout);
      setPositionedNetwork(positioned);
    } catch (err: any) {
      setError('Ağaç genişletme hatası: ' + err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (format: ExportFormat) => {
    if (!rawNetwork) return;
    ExportEngineService.exportNetwork(rawNetwork, { format });
  };

  const selectedNode: PositionedNodeDTO | null = 
    positionedNetwork?.nodes.find(n => n.id === selectedNodeId) || null;

  return React.createElement('div', { className: 'flex flex-col h-screen w-full bg-gray-100' },
    React.createElement('div', { className: 'p-4 bg-white border-b flex items-center space-x-2' },
      React.createElement('input', {
        type: 'text',
        value: query,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
        placeholder: 'Kavram arayın...',
        className: 'border p-2 rounded w-80 text-sm',
        'data-testid': 'search-input'
      }),
      React.createElement('button', {
        onClick: () => handleSearch(query),
        className: 'bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium',
        'data-testid': 'search-btn'
      }, '🔍 Ara')
    ),

    React.createElement(NetworkExplorerToolbar, {
      currentLayout,
      onLayoutChange: handleLayoutChange,
      onExport: handleExport,
      onFitToScreen: () => {}
    }),

    React.createElement('div', { className: 'flex-1 relative overflow-hidden p-6' },
      isLoading && React.createElement('div', { className: 'text-gray-500' }, 'Yükleniyor...'),
      error && React.createElement('div', { className: 'text-red-600' }, error),
      
      positionedNetwork && React.createElement('div', { className: 'grid grid-cols-3 gap-4', 'data-testid': 'network-canvas' },
        positionedNetwork.nodes.map(node =>
          React.createElement('div', {
            key: node.id,
            onClick: () => setSelectedNodeId(node.id),
            className: `p-4 border rounded shadow bg-white cursor-pointer ${selectedNodeId === node.id ? 'ring-2 ring-indigo-500' : ''}`,
            'data-testid': `node-${node.id}`
          },
            React.createElement('div', { className: 'font-bold' }, node.label),
            React.createElement('div', { className: 'text-xs text-gray-400' }, `(${node.x}, ${node.y})`)
          )
        )
      )
    ),

    React.createElement(ConceptDetailDrawer, {
      selectedNode,
      onClose: () => setSelectedNodeId(null),
      onExpand: handleExpandNode
    })
  );
};