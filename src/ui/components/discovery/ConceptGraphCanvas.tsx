'use client';

import React, { useState } from 'react';

export interface CytoscapeElementData {
  nodes: Array<{ data: { id: string; label?: string; nodeType?: string; depth?: number; score?: number; [key: string]: any } }>;
  edges: Array<{ data: { source: string; target: string; relationType?: string; [key: string]: any } }>;
}

interface ConceptGraphCanvasProps {
  data: CytoscapeElementData;
  rootLabel?: string;
}

export function ConceptGraphCanvas({ data }: ConceptGraphCanvasProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  if (!data || !data.nodes || data.nodes.length === 0) {
    return null;
  }

  const nodes = data.nodes;
  const edges = data.edges;

  const width = 600;
  const height = 360;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 130;

  const nodePositions = new Map<string, { x: number; y: number }>();
  const nonRootNodes = nodes.filter(n => n.data.nodeType !== 'ROOT');
  const rootNode = nodes.find(n => n.data.nodeType === 'ROOT') || nodes[0];

  if (rootNode) {
    nodePositions.set(rootNode.data.id, { x: centerX, y: centerY });
  }

  nonRootNodes.forEach((node, idx) => {
    const angle = (idx / Math.max(1, nonRootNodes.length)) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    nodePositions.set(node.data.id, { x, y });
  });

  return (
    <div className="bg-slate-900 rounded-xl p-5 text-white shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <h3 className="font-semibold text-sm tracking-wide text-slate-200">
            2D Görsel Kavram Çizgesi (Cytoscape Projeksiyonu)
          </h3>
        </div>
        <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
          {nodes.length} Düğüm | {edges.length} Bağlantı
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex justify-center items-center bg-slate-950/60 rounded-lg border border-slate-800/80">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-[360px] select-none">
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {edges.map((edge, idx) => {
            const start = nodePositions.get(edge.data.source);
            const end = nodePositions.get(edge.data.target);
            if (!start || !end) return null;

            const isHighlighted = selectedNode === edge.data.source || selectedNode === edge.data.target;

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isHighlighted ? '#38bdf8' : '#334155'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={edge.data.relationType === 'DERIVED' ? '4,4' : undefined}
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-200"
                />
                <text
                  x={(start.x + end.x) / 2}
                  y={(start.y + end.y) / 2 - 6}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="middle"
                  className="font-mono pointer-events-none"
                >
                  {edge.data.relationType || ''}
                </text>
              </g>
            );
          })}

          {nodes.map((node) => {
            const pos = nodePositions.get(node.data.id);
            if (!pos) return null;

            const isRoot = node.data.nodeType === 'ROOT';
            const isSelected = selectedNode === node.data.id;

            return (
              <g
                key={`node-${node.data.id}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedNode(node.data.id === selectedNode ? null : node.data.id)}
                className="cursor-pointer group"
              >
                <circle
                  r={isRoot ? 22 : 16}
                  fill={isRoot ? '#2563eb' : isSelected ? '#0284c7' : '#1e293b'}
                  stroke={isRoot ? '#60a5fa' : isSelected ? '#38bdf8' : '#475569'}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-200 group-hover:scale-110"
                />
                <text
                  y={isRoot ? 32 : 28}
                  fill={isRoot ? '#93c5fd' : '#e2e8f0'}
                  fontSize={isRoot ? '12' : '10'}
                  fontWeight={isRoot ? 'bold' : 'normal'}
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {node.data.label || node.data.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}