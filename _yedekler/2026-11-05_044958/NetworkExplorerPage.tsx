"use client";
import React, { useState, useMemo } from 'react';
import { LayoutAlgorithm } from '@/domain/analytics/services/LayoutEngineService';
import { SvgLayoutEngineService } from '@/domain/analytics/services/SvgLayoutEngineService';
import { GenericConceptNetworkDTO } from '@/domain/analytics/services/ExportEngineService';

const DEMO_NETWORK: GenericConceptNetworkDTO = {
  nodes: [
    { id: 'psı', data: { label: 'псы (su)' } } as any,
    { id: 'kedi', data: { label: 'kedi' } } as any,
    { id: 'mı', data: { label: 'мы (taş)' } } as any,
  ],
  edges: [
    { source: 'psı', target: 'kedi', data: {} } as any,
    { source: 'kedi', target: 'mı', data: {} } as any,
  ],
} as any;

export function NetworkExplorerPage({ initialQuery = 'kedi' }: { initialQuery?: string }) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentLayout, setCurrentLayout] = useState<LayoutAlgorithm>('CIRCULAR');
  const [rawNetwork, setRawNetwork] = useState<GenericConceptNetworkDTO | null>(DEMO_NETWORK);

  const svgString = useMemo(() => {
    const net = rawNetwork || DEMO_NETWORK;
    return SvgLayoutEngineService.render(net, { algorithm: currentLayout, width: 800, height: 400 });
  }, [rawNetwork, currentLayout]);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} style={{ border: '1px solid #ccc', padding: 8 }} />
        <button onClick={() => setRawNetwork(DEMO_NETWORK)} style={{ background: '#7c3aed', color: 'white', padding: '8px 12px', borderRadius: 6 }}>Ara</button>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <span>Düzen:</span>
        {(['CIRCULAR', 'GRID', 'FORCE'] as LayoutAlgorithm[]).map((alg) => (
          <button key={alg} onClick={() => setCurrentLayout(alg)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #ccc', background: currentLayout === alg ? '#7c3aed' : 'white', color: currentLayout === alg ? 'white' : 'black' }}>{alg}</button>
        ))}
      </div>
      <div style={{ border: '1px solid #e5e7eb', minHeight: 400, background: 'white' }} dangerouslySetInnerHTML={{ __html: svgString }} />
      <p style={{ fontSize: 12, color: '#666' }}>{rawNetwork?.nodes?.length || 3} node - SvgLayoutEngineService deterministik</p>
    </div>
  );
}
