'use client';

import React, { useMemo, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ZoomIn, ZoomOut, RotateCcw, Network, ArrowUpRight, Search, GitBranch,
} from 'lucide-react';

export interface CytoscapeElementData {
  nodes: Array<{ data: { id: string; label?: string; nodeType?: string; depth?: number; score?: number; [key: string]: any } }>;
  edges: Array<{ data: { source: string; target: string; relationType?: string; [key: string]: any } }>;
}

interface ConceptGraphCanvasProps {
  data: CytoscapeElementData;
  rootLabel?: string;
}

type RelationFilter = 'ALL' | 'CHILD' | 'ROOT' | 'RELATED';

interface ParsedLabel {
  primary: string;
  secondary: string;
  isConceptCode: boolean;
}

function parseNodeLabel(rawLabel: string, fallbackId: string): ParsedLabel {
  const text = String(rawLabel || fallbackId || '').trim();
  const conceptMatch = text.match(/^(.*?)\s*\[([A-Z0-9_-]+)\]$/);
  if (conceptMatch) {
    return {
      primary: conceptMatch[1].trim() || conceptMatch[2],
      secondary: conceptMatch[2],
      isConceptCode: true,
    };
  }
  const parenMatch = text.match(/^([^(]+?)\s*\(([^)]+)\)$/);
  if (parenMatch) {
    return {
      primary: parenMatch[1].trim(),
      secondary: parenMatch[2].trim(),
      isConceptCode: false,
    };
  }
  return {
    primary: text,
    secondary: /^[A-Z0-9_-]{3,}$/.test(text) ? 'Kavram' : '',
    isConceptCode: /^[A-Z0-9_-]{3,}$/.test(text),
  };
}

function truncateText(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return `${str.slice(0, maxLen - 1)}…`;
}

function getRelationStyle(rel?: string) {
  const key = String(rel || 'CHILD').toUpperCase();
  if (key === 'ROOT') {
    return {
      label: 'Aynı Kök / Aile',
      stroke: '#10b981',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      pillStroke: '#059669',
      pillFill: '#064e3b',
      dot: '#34d399',
      dash: '6,4',
    };
  }
  if (key === 'RELATED') {
    return {
      label: 'İlişkili Kavram',
      stroke: '#f59e0b',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      pillStroke: '#d97706',
      pillFill: '#451a03',
      dot: '#fbbf24',
      dash: '3,4',
    };
  }
  return {
    label: 'Kavram Kelimesi',
    stroke: '#38bdf8',
    badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    pillStroke: '#0284c7',
    pillFill: '#0f172a',
    dot: '#38bdf8',
    dash: undefined,
  };
}

export function ConceptGraphCanvas({ data, rootLabel }: ConceptGraphCanvasProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [relationFilter, setRelationFilter] = useState<RelationFilter>('ALL');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({
    dragging: false, startX: 0, startY: 0, origX: 0, origY: 0,
  });

  if (!data || !data.nodes || data.nodes.length === 0) {
    return null;
  }

  const rootNode = useMemo(
    () => data.nodes.find((n) => n.data.nodeType === 'ROOT') || data.nodes[0],
    [data.nodes],
  );

  const edgeByTarget = useMemo(() => {
    const map = new Map<string, { source: string; target: string; relationType: string }>();
    for (const e of data.edges || []) {
      map.set(e.data.target, {
        source: e.data.source || rootNode.data.id,
        target: e.data.target,
        relationType: String(e.data.relationType || 'CHILD').toUpperCase(),
      });
    }
    return map;
  }, [data.edges, rootNode]);

  const filteredSatellites = useMemo(() => {
    const raw = data.nodes.filter((n) => n.data.id !== rootNode.data.id);
    if (relationFilter === 'ALL') return raw;
    return raw.filter((n) => {
      const rel = edgeByTarget.get(n.data.id)?.relationType || 'CHILD';
      return rel === relationFilter;
    });
  }, [data.nodes, rootNode, relationFilter, edgeByTarget]);

  const relationCounts = useMemo(() => {
    const counts = { ALL: 0, CHILD: 0, ROOT: 0, RELATED: 0 };
    for (const n of data.nodes) {
      if (n.data.id === rootNode.data.id) continue;
      counts.ALL += 1;
      const rel = (edgeByTarget.get(n.data.id)?.relationType || 'CHILD') as keyof typeof counts;
      if (rel in counts) counts[rel] += 1;
    }
    return counts;
  }, [data.nodes, rootNode, edgeByTarget]);

  // Çok halkalı (iç + dış yörünge kaydırmalı) çakışmasız yerleşim
  const layout = useMemo(() => {
    const width = 1040;
    const height = 700;
    const cx = width / 2;
    const cy = height / 2;

    const positions = new Map<string, { x: number; y: number; ring: number; w: number; h: number }>();
    positions.set(rootNode.data.id, { x: cx, y: cy, ring: 0, w: 196, h: 58 });

    const innerCap = 10;
    const middleCap = 16;

    const innerNodes = filteredSatellites.slice(0, innerCap);
    const middleNodes = filteredSatellites.slice(innerCap, innerCap + middleCap);
    const outerNodes = filteredSatellites.slice(innerCap + middleCap);

    const placeRing = (
      ringNodes: typeof filteredSatellites,
      rx: number,
      ry: number,
      ringIndex: number,
      angleOffset: number,
    ) => {
      const count = ringNodes.length;
      if (count === 0) return;
      ringNodes.forEach((node, idx) => {
        const angle = angleOffset + (idx / count) * 2 * Math.PI - Math.PI / 2;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);
        positions.set(node.data.id, { x, y, ring: ringIndex, w: 152, h: 44 });
      });
    };

    placeRing(innerNodes, 235, 175, 1, 0);
    const step1 = innerNodes.length > 0 ? Math.PI / innerNodes.length : 0.25;
    placeRing(middleNodes, 415, 290, 2, step1);
    placeRing(outerNodes, 540, 365, 3, step1 * 0.5);

    return { width, height, cx, cy, positions };
  }, [rootNode, filteredSatellites]);

  const activeFocusId = hoveredNodeId || selectedNodeId;

  const selectedNodeObj = useMemo(() => {
    if (!selectedNodeId) return null;
    const node = data.nodes.find((n) => n.data.id === selectedNodeId);
    if (!node) return null;
    const edge = edgeByTarget.get(node.data.id);
    const parsed = parseNodeLabel(node.data.label || node.data.id, node.data.id);
    return {
      id: node.data.id,
      isRoot: node.data.id === rootNode.data.id,
      relationType: edge?.relationType || 'ROOT',
      parsed,
    };
  }, [selectedNodeId, data.nodes, edgeByTarget, rootNode]);

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as Element)?.closest('[data-graph-node="true"]')) return;
    dragState.current = { dragging: true, startX: e.clientX, startY: e.clientY, origX: pan.x, origY: pan.y };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPan({ x: dragState.current.origX + dx, y: dragState.current.origY + dy });
  }, []);

  const handleMouseUp = useCallback(() => {
    dragState.current.dragging = false;
  }, []);

  const rootParsed = parseNodeLabel(rootLabel || rootNode.data.label || rootNode.data.id, rootNode.data.id);

  return (
    <section
      aria-label="Kavram İlişki Ağı Çizgesi"
      className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-xl overflow-hidden"
    >
      {/* Üst Kontrol ve Filtre Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/90 bg-slate-900/90 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Network className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-100">
              Kavram İlişki Ağı
            </h3>
            <p className="text-[11px] text-slate-400">
              {filteredSatellites.length + 1} düğüm • {filteredSatellites.length} bağlantı • Sürükleyerek gezinin, düğüme tıklayın
            </p>
          </div>
        </div>

        {/* İlişki Türü Filtre Hapları */}
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="İlişki türü filtresi">
          <button
            type="button"
            onClick={() => setRelationFilter('ALL')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              relationFilter === 'ALL'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tümü ({relationCounts.ALL})
          </button>
          {relationCounts.CHILD > 0 && (
            <button
              type="button"
              onClick={() => setRelationFilter('CHILD')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                relationFilter === 'CHILD'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-sky-300 hover:bg-slate-700'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Kelimeler ({relationCounts.CHILD})
            </button>
          )}
          {relationCounts.ROOT > 0 && (
            <button
              type="button"
              onClick={() => setRelationFilter('ROOT')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                relationFilter === 'ROOT'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Kök / Aile ({relationCounts.ROOT})
            </button>
          )}
          {relationCounts.RELATED > 0 && (
            <button
              type="button"
              onClick={() => setRelationFilter('RELATED')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                relationFilter === 'RELATED'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              İlişkili ({relationCounts.RELATED})
            </button>
          )}
        </div>

        {/* Yakınlaştırma Kontrolleri */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))}
            title="Uzaklaştır"
            aria-label="Çizgeyi uzaklaştır"
            className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[44px] text-center font-mono text-[11px] text-slate-300">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.15).toFixed(2))))}
            title="Yakınlaştır"
            aria-label="Çizgeyi yakınlaştır"
            className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedNodeId(null); }}
            title="Görünümü Sıfırla"
            aria-label="Görünümü sıfırla"
            className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* İnteraktif SVG Ağ Kanvası */}
      <div className="relative w-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="h-[520px] sm:h-[580px] w-full cursor-grab active:cursor-grabbing select-none"
        >
          <defs>
            <marker id="arrow-child" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-root" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker id="arrow-related" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
            </marker>
          </defs>

          <g transform={`translate(${layout.cx + pan.x}, ${layout.cy + pan.y}) scale(${zoom}) translate(${-layout.cx}, ${-layout.cy})`}>
            {/* Hafif Rehber Yörünge Halkaları */}
            <ellipse cx={layout.cx} cy={layout.cy} rx={235} ry={175} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,6" />
            {filteredSatellites.length > 10 && (
              <ellipse cx={layout.cx} cy={layout.cy} rx={415} ry={290} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,6" />
            )}

            {/* Bağlantı Çizgileri (Kavisli Bézier Oklar) */}
            {filteredSatellites.map((node) => {
              const targetPos = layout.positions.get(node.data.id);
              const rootPos = layout.positions.get(rootNode.data.id);
              if (!targetPos || !rootPos) return null;

              const edge = edgeByTarget.get(node.data.id);
              const relType = edge?.relationType || 'CHILD';
              const style = getRelationStyle(relType);

              const dx = targetPos.x - rootPos.x;
              const dy = targetPos.y - rootPos.y;
              const dist = Math.hypot(dx, dy) || 1;
              const ux = dx / dist;
              const uy = dy / dist;

              // Çizgiyi merkez kart ve hedef kapsül kenarından başlatıp bitir
              const sx = rootPos.x + ux * 92;
              const sy = rootPos.y + uy * 28;
              const tx = targetPos.x - ux * 76;
              const ty = targetPos.y - uy * 22;

              // Hafif kavis kontrol noktası
              const mx = (sx + tx) / 2 - uy * 14;
              const my = (sy + ty) / 2 + ux * 14;

              const isFocused = !activeFocusId || activeFocusId === rootNode.data.id || activeFocusId === node.data.id;
              const isHighlighted = activeFocusId === node.data.id;
              const markerId = relType === 'ROOT' ? 'url(#arrow-root)' : relType === 'RELATED' ? 'url(#arrow-related)' : 'url(#arrow-child)';

              return (
                <path
                  key={`edge-${node.data.id}`}
                  d={`M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`}
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth={isHighlighted ? 2.6 : 1.4}
                  strokeOpacity={isFocused ? (isHighlighted ? 0.95 : 0.45) : 0.1}
                  strokeDasharray={style.dash}
                  markerEnd={markerId}
                  className="transition-all duration-200"
                />
              );
            })}

            {/* Uydu Düğüm Kapsül Kartları */}
            {filteredSatellites.map((node) => {
              const pos = layout.positions.get(node.data.id);
              if (!pos) return null;

              const edge = edgeByTarget.get(node.data.id);
              const relType = edge?.relationType || 'CHILD';
              const style = getRelationStyle(relType);
              const parsed = parseNodeLabel(node.data.label || node.data.id, node.data.id);

              const isSelected = selectedNodeId === node.data.id;
              const isHovered = hoveredNodeId === node.data.id;
              const isDimmed = Boolean(activeFocusId && activeFocusId !== rootNode.data.id && !isSelected && !isHovered);

              return (
                <g
                  key={`node-${node.data.id}`}
                  data-graph-node="true"
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedNodeId(isSelected ? null : node.data.id)}
                  onMouseEnter={() => setHoveredNodeId(node.data.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  style={{ opacity: isDimmed ? 0.25 : 1 }}
                  className="cursor-pointer transition-opacity duration-200"
                >
                  <rect
                    x={-pos.w / 2}
                    y={-pos.h / 2}
                    width={pos.w}
                    height={pos.h}
                    rx={12}
                    fill={isSelected ? '#1e293b' : style.pillFill}
                    stroke={isSelected || isHovered ? '#ffffff' : style.pillStroke}
                    strokeWidth={isSelected ? 2.4 : 1.4}
                  />
                  {/* Sol İlişki Noktası */}
                  <circle cx={-pos.w / 2 + 13} cy={parsed.secondary ? -5 : 0} r={4} fill={style.dot} />

                  {/* Ana Kelime / Kavram Başlığı */}
                  <text
                    x={-pos.w / 2 + 23}
                    y={parsed.secondary ? -1 : 4}
                    fill="#f8fafc"
                    fontSize="12.5"
                    fontWeight="700"
                    textAnchor="start"
                  >
                    {truncateText(parsed.primary, 16)}
                  </text>

                  {/* Alt Türkçe Karşılık veya Kavram Kodu */}
                  {parsed.secondary && (
                    <text
                      x={-pos.w / 2 + 23}
                      y={14}
                      fill="#94a3b8"
                      fontSize="10.5"
                      textAnchor="start"
                    >
                      {truncateText(parsed.secondary, 19)}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Merkez Kök Kavram Kartı */}
            <g
              data-graph-node="true"
              transform={`translate(${layout.cx}, ${layout.cy})`}
              onClick={() => setSelectedNodeId(selectedNodeId === rootNode.data.id ? null : rootNode.data.id)}
              className="cursor-pointer"
            >
              <rect
                x={-102}
                y={-31}
                width={204}
                height={62}
                rx={16}
                fill="#1d4ed8"
                stroke="#93c5fd"
                strokeWidth={2.5}
              />
              <text
                x={0}
                y={rootParsed.secondary ? -4 : 5}
                fill="#ffffff"
                fontSize="14"
                fontWeight="800"
                textAnchor="middle"
                className="capitalize"
              >
                {truncateText(rootParsed.primary, 20)}
              </text>
              {rootParsed.secondary && (
                <text
                  x={0}
                  y={15}
                  fill="#dbeafe"
                  fontSize="11"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  {truncateText(rootParsed.secondary, 24)}
                </text>
              )}
            </g>
          </g>
        </svg>
      </div>

      {/* Alt Etkileşimli Seçili Düğüm Bilgi Paneli */}
      <div className="border-t border-slate-800 bg-slate-900/95 px-5 py-3.5">
        {selectedNodeObj && !selectedNodeObj.isRoot ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${getRelationStyle(selectedNodeObj.relationType).badgeBg}`}>
                {getRelationStyle(selectedNodeObj.relationType).label}
              </span>
              <div>
                <span className="text-base font-bold text-white">{selectedNodeObj.parsed.primary}</span>
                {selectedNodeObj.parsed.secondary && (
                  <span className="ml-2 text-sm text-slate-400">— {selectedNodeObj.parsed.secondary}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedNodeObj.relationType === 'RELATED' ? (
                <Link
                  href={`/kavram/${encodeURIComponent(selectedNodeObj.id)}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  Kavram Ağına Git
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <Link
                  href={`/sozluk?q=${encodeURIComponent(selectedNodeObj.id)}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  Sözlükte Ara ({selectedNodeObj.id})
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span>
              İpucu: Bir düğümün üzerine gelerek bağlantı yolunu vurgulayabilir, tıklayarak doğrudan sözlük aramasına veya komşu kavrama geçebilirsiniz.
            </span>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sky-400" /> Kavram Kelimesi</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Kök / Aile</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" /> İlişkili Kavram</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
