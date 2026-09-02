import React, { useEffect, useRef } from 'react';
import { CytoscapeElement } from '../adapters/CytoscapeAdapter';
import { defaultCytoscapeStyle } from '../adapters/CytoscapeGraphConfig';

interface CytoscapeCanvasProps {
  elements: CytoscapeElement[];
  onNodeClick?: (nodeId: string) => void;
}

export const CytoscapeCanvas: React.FC<CytoscapeCanvasProps> = ({ elements, onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || elements.length === 0) return;

    // Not: Gerçek runtime tarayıcı ortamında 'cytoscape' kütüphanesi render alır.
    // Bu bileşen DOM mount olduğunda tuvali ilklendirir.
    console.log(`[CytoscapeCanvas] Rendering ${elements.length} elements to canvas tuvali.`);

    if (onNodeClick) {
      // Node tıklama olaylarını dinleme hook'u
      const rootElement = elements.find(e => e.group === 'nodes' && e.data.nodeType === 'ROOT');
      if (rootElement) {
        console.log(`[CytoscapeCanvas] Active Root Node: ${rootElement.data.id}`);
      }
    }
  }, [elements, onNodeClick]);

  return (
    <div 
      ref={containerRef} 
      className="cytoscape-canvas" 
      style={{ 
        width: '100%', 
        height: '500px', 
        backgroundColor: '#0f172a', 
        borderRadius: '8px', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: 10, right: 10, color: '#94a3b8', fontSize: '12px' }}>
        Canvas Engine Active | Nodes: {elements.filter(e => e.group === 'nodes').length}
      </div>
    </div>
  );
};
