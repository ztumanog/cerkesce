'use client';

import React, { useMemo, useState, useRef, useCallback } from 'react';
import {
  ZoomIn, ZoomOut, RotateCcw, Network, ArrowUpRight, Search,
  GitBranch, X, Sparkles, Layers, Link2, BookOpen, Info, ChevronDown
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, Badge, Input, Separator } from '@/components/ui/primitives';
import { parseNodeLabel, clip, splitHighlight } from '@/utils/text';

export interface CytoscapeElementData {
  nodes: Array<{
    data: {
      id: string;
      label?: string;
      nodeType?: string;
      dialect?: string;
      depth?: number;
      score?: number;
      [key: string]: unknown;
    };
  }>;
  edges: Array<{
    data: {
      source: string;
      target: string;
      relationType?: string;
      [key: string]: unknown;
    };
  }>;
}

interface ConceptGraphCanvasProps {
  data: CytoscapeElementData;
  rootLabel?: string;
}

type RelationFilter = 'ALL' | 'CHILD' | 'ROOT' | 'RELATED';


const REL_META: Record<
  string,
  { label: string; color: string; border: string; dot: string; dash?: string; icon: React.ElementType }
> = {
  CHILD: {
    label: 'Kavram Kelimeleri',
    color: '#0284c7',
    border: 'rgba(2,132,199,0.35)',
    dot: '#0369A1',
    icon: BookOpen,
  },
  ROOT: {
    label: 'Ortak Kök / Aile',
    color: '#059669',
    border: 'rgba(5,150,105,0.35)',
    dot: '#047857',
    dash: '6,4',
    icon: Layers,
  },
  RELATED: {
    label: 'İlişkili Kavramlar',
    color: '#d97706',
    border: 'rgba(217,119,6,0.35)',
    dot: '#92400E',
    dash: '3,4',
    icon: Link2,
  },
};

function getRelTheme(rel?: string) {
  return REL_META[String(rel || 'CHILD').toUpperCase()] ?? REL_META.CHILD;
}

export function ConceptGraphCanvas({ data, rootLabel }: ConceptGraphCanvasProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [relFilter, setRelFilter] = useState<RelationFilter>('ALL');
  const [nodeSearch, setNodeSearch] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0 });

  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const rootNode = useMemo(
    () => nodes.find((n) => n.data.nodeType === 'ROOT') || nodes[0],
    [nodes],
  );

  const edgeMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const e of edges) m.set(e.data.target, String(e.data.relationType || 'CHILD').toUpperCase());
    return m;
  }, [edges]);

  const counts = useMemo(() => {
    const c = { ALL: 0, CHILD: 0, ROOT: 0, RELATED: 0 } as Record<RelationFilter, number>;
    if (!rootNode) return c;
    for (const n of nodes) {
      if (n.data.id === rootNode.data.id) continue;
      c.ALL += 1;
      const r = (edgeMap.get(n.data.id) || 'CHILD') as RelationFilter;
      if (r in c) c[r] += 1;
    }
    return c;
  }, [nodes, rootNode, edgeMap]);

  const q = nodeSearch.trim().toLowerCase();

  const satellites = useMemo(() => {
    if (!rootNode) return [];
    return nodes.filter((n) => {
      if (n.data.id === rootNode.data.id) return false;
      const r = edgeMap.get(n.data.id) || 'CHILD';
      if (relFilter !== 'ALL' && r !== relFilter) return false;
      if (!q) return true;
      return `${n.data.id} ${n.data.label || ''}`.toLowerCase().includes(q);
    });
  }, [nodes, rootNode, edgeMap, relFilter, q]);

  const layout = useMemo(() => {
    const width = 1040, height = 700, cx = width / 2, cy = height / 2;
    const pos = new Map<string, { x: number; y: number; w: number; h: number }>();
    
    // Kök Düğüm: Boyutlar artırıldı (w: 240, h: 72)
    if (rootNode) pos.set(rootNode.data.id, { x: Math.round(cx * 100) / 100, y: Math.round(cy * 100) / 100, w: 240, h: 72 });

    const rings: Array<[number, number | undefined, number, number]> = [
      [0, 9, 230, 155],
      [9, 22, 370, 255],
      [22, undefined, 450, 310],
    ];

    for (const [start, end, rx, ry] of rings) {
      const slice = satellites.slice(start, end);
      slice.forEach((n, i) => {
        const a = (i / Math.max(1, slice.length)) * 2 * Math.PI - Math.PI / 2;
        // Uydu Düğüm: Boyutlar artırıldı (w: 180, h: 54)
        pos.set(n.data.id, { x: Math.round((cx + rx * Math.cos(a)) * 100) / 100, y: Math.round((cy + ry * Math.sin(a)) * 100) / 100, w: 180, h: 54 });
      });
    }
    return { width, height, cx, cy, pos };
  }, [rootNode, satellites]);

  const focusId = hoveredId || selectedId;

  const selectedDetail = useMemo(() => {
    if (!selectedId || !rootNode || selectedId === rootNode.data.id) return null;
    const node = nodes.find((n) => n.data.id === selectedId);
    if (!node) return null;
    const rel = edgeMap.get(node.data.id) || 'CHILD';
    return {
      id: node.data.id,
      rel,
      dialect: String(node.data.dialect || ''),
      depth: typeof node.data.depth === 'number' ? node.data.depth : null,
      parsed: parseNodeLabel(node.data.label || node.data.id, node.data.id),
    };
  }, [selectedId, rootNode, nodes, edgeMap]);

  const onDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as Element)?.closest('[data-node="true"]')) return;
    dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, ox: pan.x, oy: pan.y };
  }, [pan]);

  const onMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragRef.current.active) return;
    setPan({ x: dragRef.current.ox + (e.clientX - dragRef.current.sx), y: dragRef.current.oy + (e.clientY - dragRef.current.sy) });
  }, []);

  const onUp = useCallback(() => { dragRef.current.active = false; }, []);

  const onWheel = useCallback((e: React.WheelEvent<SVGSVGElement>) => {
    setZoom((z) => Math.min(2, Math.max(0.6, Number((z - Math.sign(e.deltaY) * 0.1).toFixed(2)))));
  }, []);

  if (!rootNode) {
    return (
      <Card className="overflow-hidden border-slate-200 bg-white">
        <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <Network className="h-8 w-8 text-slate-600" />
          <p className="text-sm font-semibold text-slate-900">Grafik verisi bulunamadı</p>
          <p className="text-xs text-slate-600">ConceptGraphCanvas için geçerli bir veri prop'u sağlayın.</p>
        </CardContent>
      </Card>
    );
  }

  const rootParsed = parseNodeLabel(rootLabel || rootNode.data.label || rootNode.data.id, rootNode.data.id);

  return (
    <>
      <style>{`
        @keyframes cgFade { from { opacity: 0; } to { opacity: 1; } }
        .cg-node { animation: cgFade .5s ease-out backwards; }
        .cg-node:focus-visible { outline: 3px solid #4F46E5; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .cg-node { animation: none; } }
      `}</style>

      <Card className="overflow-hidden border-slate-200 bg-white">
        <CardHeader className="border-b border-slate-200 bg-slate-50 px-4 sm:px-6 py-4 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-500/30">
                <Network className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-base font-bold tracking-tight text-slate-900">
                  Kavram İlişki Ağı
                </CardTitle>
                <CardDescription className="mt-0.5 font-mono text-xs text-slate-600">
                  {satellites.length + 1} düğüm · {satellites.length} bağlantı
                </CardDescription>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <Input
                  value={nodeSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNodeSearch(e.target.value)}
                  placeholder="Ağda ara…"
                  className="h-9 w-full sm:w-48 rounded-lg border-slate-300 bg-white pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-500"
                />
                {nodeSearch && (
                  <button
                    type="button"
                    onClick={() => setNodeSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-900"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="relative flex-grow sm:flex-grow-0">
                <select
                  value={relFilter}
                  onChange={(e) => setRelFilter(e.target.value as RelationFilter)}
                  className="h-9 w-full sm:w-44 appearance-none rounded-lg border border-slate-300 bg-white px-3 py-1.5 pr-8 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                >
                  <option value="ALL">Tümü ({counts.ALL})</option>
                  {counts.CHILD > 0 && <option value="CHILD">Kelimeler ({counts.CHILD})</option>}
                  {counts.ROOT > 0 && <option value="ROOT">Kök ({counts.ROOT})</option>}
                  {counts.RELATED > 0 && <option value="RELATED">İlişkili ({counts.RELATED})</option>}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              </div>

              <div className="hidden sm:block h-6 w-px bg-slate-300 mx-1" />

              <div className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 bg-white p-1 shadow-sm">
                <button className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))))}>
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="text-center font-mono text-xs font-medium text-slate-700" style={{ minWidth: '3rem' }}>
                  {Math.round(zoom * 100)}%
                </span>
                <button className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => setZoom((z) => Math.min(2, Number((z + 0.15).toFixed(2))))}>
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedId(null); }}>
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-9" style={{ background: "#F8FAFC" }}>
              <div
                className="pointer-events-none absolute inset-0"
                style={{ opacity: 0.15, backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />

              <svg
                suppressHydrationWarning
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                role="img"
                aria-label="Kavram ilişki ağı grafiği"
                onMouseDown={onDown}
                onMouseMove={onMove}
                onMouseUp={onUp}
                onMouseLeave={onUp}
                onWheel={onWheel}
                className="relative z-10 w-full cursor-grab select-none active:cursor-grabbing"
                style={{ minHeight: '350px', height: 'clamp(350px, 55vh, 540px)' }}
              >
                <defs>
                  {Object.entries(REL_META).map(([key, meta]) => (
                    <marker
                      key={key}
                      id={`arr-${key.toLowerCase()}`}
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto"
                    >
                      <path d="M0 1L10 5L0 9z" fill={meta.color} opacity="0.75" />
                    </marker>
                  ))}
                  <filter id="cg-glow">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="cg-root-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                <g transform={`translate(${(layout.cx + pan.x).toFixed(2)},${(layout.cy + pan.y).toFixed(2)}) scale(${zoom}) translate(${(-layout.cx).toFixed(2)},${(-layout.cy).toFixed(2)})`}>
                  {[230, 370, 450].map((r, i) => (
                    <g key={r}>
                      <ellipse
                        cx={layout.cx}
                        cy={layout.cy}
                        rx={r}
                        ry={r * 0.68}
                        fill="none"
                        stroke="rgba(100,116,139,0.25)"
                        strokeWidth="1"
                        strokeDasharray="4,8"
                      />
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${layout.cx} ${layout.cy}`}
                        to={`${i % 2 === 0 ? 360 : -360} ${layout.cx} ${layout.cy}`}
                        dur={i % 2 === 0 ? '180s' : '240s'}
                        repeatCount="indefinite"
                      />
                    </g>
                  ))}

                  {satellites.map((node) => {
                    const tp = layout.pos.get(node.data.id);
                    const rp = layout.pos.get(rootNode.data.id);
                    if (!tp || !rp) return null;
                    const rel = edgeMap.get(node.data.id) || 'CHILD';
                    const theme = getRelTheme(rel);
                    const dx = tp.x - rp.x, dy = tp.y - rp.y;
                    const dist = Math.hypot(dx, dy) || 1;
                    const ux = dx / dist, uy = dy / dist;
                    const sx = Math.round((rp.x + ux * 120) * 100) / 100, sy = Math.round((rp.y + uy * 36) * 100) / 100;
                    const tx = Math.round((tp.x - ux * 90) * 100) / 100, ty = Math.round((tp.y - uy * 27) * 100) / 100;
                    const mx = Math.round(((sx + tx) / 2 - uy * 16) * 100) / 100, my = Math.round(((sy + ty) / 2 + ux * 16) * 100) / 100;
                    const hi = focusId === node.data.id;
                    const dim = Boolean(focusId && focusId !== rootNode.data.id && !hi);
                    return (
                      <path
                        key={`e-${node.data.id}`}
                        d={`M${sx.toFixed(2)} ${sy.toFixed(2)} Q${mx.toFixed(2)} ${my.toFixed(2)} ${tx.toFixed(2)} ${ty.toFixed(2)}`}
                        fill="none"
                        stroke={theme.color}
                        strokeWidth={hi ? 3 : 2}
                        strokeOpacity={dim ? 0.25 : hi ? 1 : 0.9}
                        strokeDasharray={theme.dash}
                        markerEnd={`url(#arr-${rel.toLowerCase()})`}
                        style={{ transition: 'stroke-opacity .2s, stroke-width .2s' }}
                      />
                    );
                  })}

                  {satellites.map((node, i) => {
                    const p = layout.pos.get(node.data.id);
                    if (!p) return null;
                    const rel = edgeMap.get(node.data.id) || 'CHILD';
                    const theme = getRelTheme(rel);
                    const parsed = parseNodeLabel(node.data.label || node.data.id, node.data.id);
                    const isSel = selectedId === node.data.id;
                    const isHov = hoveredId === node.data.id;
                    const dim = Boolean(focusId && focusId !== rootNode.data.id && !isSel && !isHov);
                    return (
                      <g
                        key={`n-${node.data.id}`}
                        data-node="true"
                        role="button"
                        tabIndex={0}
                        className="cg-node outline-none rounded-xl"
                        style={{ animationDelay: `${Math.min(i * 40, 480)}ms`, opacity: dim ? 0.25 : 1, transition: 'opacity .2s', cursor: 'pointer' }}
                        transform={`translate(${p.x.toFixed(2)},${p.y.toFixed(2)})`}
                        onClick={() => setSelectedId(isSel ? null : node.data.id)}
                        onMouseEnter={() => setHoveredId(node.data.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedId(isSel ? null : node.data.id);
                          }
                        }}
                      >
                        <title>{node.data.label || node.data.id}</title>
                        <rect
                          x={-p.w / 2}
                          y={-p.h / 2}
                          width={p.w}
                          height={p.h}
                          rx={14}
                          fill={isSel ? '#EEF2FF' : '#FFFFFF'}
                          stroke={isSel ? '#6366F1' : isHov ? '#0F172A' : theme.border}
                          strokeWidth={isSel ? 2 : 1.2}
                          style={{ transition: 'all .15s' }}
                        />
                        <circle cx={-p.w / 2 + 14} cy={parsed.secondary ? -6 : 0} r={4} fill={theme.dot} />
                        {/* Font boyutu 12.5 -> 14.5 yapıldı */}
                        <text x={-p.w / 2 + 26} y={parsed.secondary ? -2 : 5} fontSize="14.5" textAnchor="start">
                          {splitHighlight(clip(parsed.primary, 18), q).map((part, j) => (
                            <tspan key={j} fill={part.m ? '#b45309' : '#0F172A'} fontWeight={part.m ? 800 : 700}>{part.t}</tspan>
                          ))}
                        </text>
                        {parsed.secondary && (
                          /* Font boyutu 10 -> 12 yapıldı */
                          <text x={-p.w / 2 + 26} y={16} fill="#475569" fontSize="12" textAnchor="start">
                            {clip(parsed.secondary, 22)}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  <g
                    data-node="true"
                    role="button"
                    tabIndex={0}
                    className="cg-node outline-none"
                    transform={`translate(${layout.cx.toFixed(2)},${layout.cy.toFixed(2)})`}
                    onClick={() => setSelectedId(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedId(null);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <title>{rootNode.data.label || rootNode.data.id}</title>
                    <rect
                      x={-120}
                      y={-36}
                      width={240}
                      height={72}
                      rx={18}
                      fill="url(#cg-root-grad)"
                      stroke="rgba(165,180,252,0.5)"
                      strokeWidth="2"
                      filter="url(#cg-glow)"
                    />
                    {/* Font boyutu 15 -> 18 yapıldı */}
                    <text x={0} y={rootParsed.secondary ? -6 : 6} fill="#fff" fontSize="18" fontWeight="800" textAnchor="middle">
                      {clip(rootParsed.primary, 22)}
                    </text>
                    {rootParsed.secondary && (
                      /* Font boyutu 10.5 -> 13 yapıldı */
                      <text x={0} y={16} fill="rgba(224,231,255,0.85)" fontSize="13" textAnchor="middle">
                        {clip(rootParsed.secondary, 28)}
                      </text>
                    )}
                  </g>
                </g>
              </svg>

              {satellites.length === 0 && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="rounded-xl border border-slate-300 bg-white px-6 py-4 text-center ring-1 ring-slate-200">
                    <Search className="mx-auto mb-2 h-6 w-6 text-slate-500" />
                    <p className="text-sm font-semibold text-slate-900">Eşleşen düğüm yok</p>
                    <p className="mt-1 text-xs text-slate-600">Arama sorgusunu temizleyin veya filtreyi değiştirin.</p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-auto z-20 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 p-1 shadow-sm backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setRelFilter('ALL')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${relFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  Tümü
                </button>
                {Object.entries(REL_META).map(([key, m]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRelFilter(key as RelationFilter)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${relFilter === key ? 'bg-slate-100 text-slate-900 ring-1 ring-slate-300' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: m.dot }} />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <aside className="border-t border-slate-200 bg-white lg:col-span-3 lg:border-l lg:border-t-0">
              <div className="overflow-y-auto p-4 sm:p-5" style={{ height: 'clamp(300px, 40vh, 540px)' }}>
                {selectedDetail ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <Badge className="border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-900">
                        <Sparkles className="mr-1.5 h-3 w-3 text-indigo-600" />
                        {getRelTheme(selectedDetail.rel).label}
                      </Badge>
                      {selectedDetail.dialect && (
                        <Badge className="border-0 bg-slate-100 font-mono text-xs text-slate-900">
                          {selectedDetail.dialect}
                        </Badge>
                      )}
                    </div>

                    <div className="rounded-xl border-l-4 bg-slate-50 py-3 pl-4 pr-3" style={{ borderLeftColor: getRelTheme(selectedDetail.rel).color }}>
                      <h4 className="text-2xl font-extrabold tracking-tight text-slate-900">{selectedDetail.parsed.primary}</h4>
                      {selectedDetail.parsed.secondary && (
                        <p className="mt-1 text-sm text-slate-600">{selectedDetail.parsed.secondary}</p>
                      )}
                    </div>

                    <div className="h-px w-full bg-slate-100" />

                    <Card className="border-slate-200 bg-white shadow-sm">
                      <CardContent className="space-y-2 p-3.5 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Kök Kavram:</span>
                          <strong className="text-slate-900">{rootParsed.primary}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Düğüm ID:</span>
                          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-indigo-600 break-all">{selectedDetail.id}</code>
                        </div>
                        {selectedDetail.depth !== null && (
                          <div className="flex justify-between">
                            <span>Derinlik:</span>
                            <span className="font-mono text-slate-700">{selectedDetail.depth}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="flex flex-col gap-2 pt-1">
                      {selectedDetail.rel === 'RELATED' ? (
                        <a href={`/kavram/${encodeURIComponent(selectedDetail.id)}`} className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-white hover:bg-amber-600">
                          <span className="inline-flex w-full items-center gap-2">
                            <GitBranch className="h-4 w-4" />
                            Kavram Ağını İncele
                            <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-70" />
                          </span>
                        </a>
                      ) : (
                        <a href={`/sozluk?q=${encodeURIComponent(selectedDetail.id)}`} className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700">
                          <span className="inline-flex w-full items-center gap-2">
                            <Search className="h-4 w-4" />
                            Sözlükte Ara
                            <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-70" />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50 to-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                          Kök Kavram
                        </CardDescription>
                        <CardTitle className="text-xl font-extrabold text-slate-900">{rootParsed.primary}</CardTitle>
                        {rootParsed.secondary && <p className="text-xs text-slate-600">{rootParsed.secondary}</p>}
                      </CardHeader>
                    </Card>

                    <div className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-600" />
                      <p>
                        Ağız/lehçe, kök bilgisi ve sözlük bağlantısını görmek için herhangi bir düğüme tıklayın. Yakınlaştırmak için kaydırın, sürüklemek için boş alana tıklayın.
                      </p>
                    </div>

                    <div className="h-px w-full bg-slate-100" />

                    <div className="space-y-2.5">
                      {Object.entries(REL_META).map(([key, m]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setRelFilter(key as RelationFilter)}
                          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${relFilter === key ? 'border-slate-300 bg-slate-100' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                        >
                          <span className="flex items-center gap-2 text-xs text-slate-700">
                            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: m.dot }} />
                            {m.label}
                          </span>
                          <Badge className="bg-slate-100 text-xs text-slate-700">
                            {(counts as Record<string, number>)[key] ?? 0}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </CardContent>
      </Card>
    </>
  );
}