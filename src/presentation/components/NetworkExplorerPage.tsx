import React, { useState } from 'react';
import { ConceptNetworkDTO } from '../../domain/discovery/dto/ConceptNetworkDTO';
import { CytoscapeAdapter, CytoscapeElement } from '../adapters/CytoscapeAdapter';
import { GraphMerger } from '../../domain/discovery/services/GraphMerger';

export const NetworkExplorerPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkDTO, setNetworkDTO] = useState<ConceptNetworkDTO | null>(null);
  const [cytoscapeElements, setCytoscapeElements] = useState<CytoscapeElement[]>([]);
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);

  // Kök Arama (Live Search)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/v1/discovery/concept-network?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      const data: ConceptNetworkDTO = await res.json();
      
      setNetworkDTO(data);
      setCytoscapeElements(CytoscapeAdapter.toCytoscapeElements(data));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch concept network');
    } finally {
      setLoading(false);
    }
  };

  // Tıklanan Düğümü Genişletme (Interactive Concept Expansion)
  const handleNodeClick = async (nodeId: string) => {
    if (!networkDTO) return;

    try {
      const res = await fetch(`/api/v1/discovery/concept-network?q=${encodeURIComponent(nodeId)}`);
      if (!res.ok) return;
      const subGraphData: ConceptNetworkDTO = await res.json();

      const mergedDTO = GraphMerger.mergeNetworks(networkDTO, subGraphData, nodeId);
      setNetworkDTO(mergedDTO);
      setCytoscapeElements(CytoscapeAdapter.toCytoscapeElements(mergedDTO));
    } catch (err) {
      console.error('Failed to expand concept node:', err);
    }
  };

  return (
    <div className="network-explorer-container" style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
      <header className="explorer-header" style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#0f172a' }}>Interactive Concept Network Explorer</h1>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concept root (e.g. water)..."
            style={{ padding: '10px', width: '320px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <button 
            type="submit" 
            disabled={loading} 
            style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {loading ? 'Searching...' : 'Explore'}
          </button>
        </form>
      </header>

      {error && <div style={{ color: '#dc2626', marginBottom: '10px' }}>{error}</div>}

      {/* Canvas Wrapper */}
      <div style={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: '8px', minHeight: '450px', backgroundColor: '#0f172a', padding: '15px' }}>
        
        {/* Guardrail Warning Badge (P6S2-08) */}
        {networkDTO?.metadata.isTruncated && (
          <div 
            className="guardrail-badge"
            style={{ 
              position: 'absolute', 
              top: '15px', 
              right: '15px', 
              backgroundColor: '#b45309', 
              color: '#fef3c7', 
              padding: '6px 12px', 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: 'bold',
              zIndex: 10 
            }}
          >
            ⚠️ Guardrail Active: Truncated at 500 Nodes
          </div>
        )}

        {/* Hover Details Tooltip (P6S2-06) */}
        {hoveredNode && (
          <div 
            className="node-tooltip"
            style={{
              position: 'absolute',
              bottom: '15px',
              left: '15px',
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              color: '#f8fafc',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '13px',
              border: '1px solid #475569',
              zIndex: 10
            }}
          >
            <div><strong>ID:</strong> {hoveredNode.id}</div>
            <div><strong>Type:</strong> {hoveredNode.nodeType}</div>
            <div><strong>Depth:</strong> {hoveredNode.depth}</div>
            <div><strong>Cluster:</strong> {hoveredNode.cluster || 'general'}</div>
            {hoveredNode.score !== undefined && <div><strong>Score:</strong> {hoveredNode.score}</div>}
          </div>
        )}

        {/* Interactive Elements Display / Mock Canvas */}
        {cytoscapeElements.length > 0 ? (
          <div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '10px' }}>
              Root: <strong style={{ color: '#38bdf8' }}>{networkDTO?.metadata.rootConceptId}</strong> | 
              Nodes: <strong style={{ color: '#38bdf8' }}>{networkDTO?.metadata.nodeCount}</strong> | 
              Edges: <strong style={{ color: '#38bdf8' }}>{networkDTO?.metadata.edgeCount}</strong>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {cytoscapeElements.filter(e => e.group === 'nodes').map((nodeEl: any) => (
                <button
                  key={nodeEl.data.id}
                  onClick={() => handleNodeClick(nodeEl.data.id)}
                  onMouseEnter={() => setHoveredNode(nodeEl.data)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    backgroundColor: nodeEl.data.nodeType === 'ROOT' ? '#1e3a8a' : '#0284c7',
                    color: '#ffffff',
                    border: nodeEl.data.isExpanded ? '2px solid #f59e0b' : '1px solid #0369a1',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  {nodeEl.data.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ color: '#64748b', textAlign: 'center', paddingTop: '180px' }}>
            Enter a search term above to render the Interactive Concept Network.
          </div>
        )}
      </div>
    </div>
  );
};
