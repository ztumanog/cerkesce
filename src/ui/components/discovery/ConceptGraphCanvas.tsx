'use client';

import React, { useMemo, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ZoomIn, ZoomOut, RotateCcw, Network, ArrowUpRight, Search,
  GitBranch, X, Sparkles, Layers, Link2, BookOpen, Info,
} from 'lucide-react';

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

export interface ConceptOption {
  id: string;
  labelTr: string;
}

interface ConceptGraphCanvasProps {
  data: CytoscapeElementData;
  rootLabel?: string;
  conceptId?: string;
  availableConcepts?: ConceptOption[];
}

type RelationFilter = 'ALL' | 'CHILD' | 'ROOT' | 'RELATED';

function parseNodeLabel(rawLabel: string, fallbackId: string) {
  const text = String(rawLabel || fallbackId || '').trim();
  const conceptMatch = text.match(/^(.*?)\s*\[([A-Z0-9_-]+)\]$/);
  if (conceptMatch) return { primary: conceptMatch[1].trim() || conceptMatch[2], secondary: conceptMatch[2] };
  const parenMatch = text.match(/^([^(]+?)\s*\(([^)]+)\)$/);
  if (parenMatch) return { primary: parenMatch[1].trim(), secondary: parenMatch[2].trim() };
  return { primary: text, secondary: /^[A-Z0-9_-]{3,}$/.test(text) ? 'Kavram' : '' };
}

function clip(str: string, max: number): string {
  return str.length <= max ? str : `${str.slice(0, max - 1)}…`;
}

function splitHighlight(text: string, q: string) {
  if (!q) return [{ t: text, m: false }];
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return [{ t: text, m: false }];
  return [
    { t: text.slice(0, i), m: false },
    { t: text.slice(i, i + q.length), m: true },
    { t: text.slice(i + q.length), m: false },
  ].filter((p) => p.t.length > 0);
}

const REL_META: Record<
  string,
  {
    label: string;
    color: string;
    fill: string;
    border: string;
    dot: string;
    badgeClass: string;
    dash?: string;
    icon: React.ElementType;
  }
> = {
  CHILD: {
    label: 'Kavram Kelimesi',
    color: '#0284c7',
    fill: '#ffffff',
    border: '#7dd3fc',
    dot: '#0284c7',
    badgeClass: 'border-sky-200 bg-sky-50 text-sky-800',
    icon: BookOpen,
  },
  ROOT: {
    label: 'Aynı Kök / Aile',
    color: '#059669',
    fill: '#ecfdf5',
    border: '#6ee7b7',
    dot: '#059669',
    badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    dash: '6,4',
    icon: Layers,
  },
  RELATED: {
    label: 'İlişkili Kavram',
    color: '#d97706',
    fill: '#fffbeb',
    border: '#fcd34d',
    dot: '#d97706',
    badgeClass: 'border-amber-200 bg-amber-50 text-amber-800',
    dash: '3,4',
    icon: Link2,
  },
};

function getRelTheme(rel?: string) {
  return REL_META[String(rel || 'CHILD').toUpperCase()] ?? REL_META.CHILD;
}

export function ConceptGraphCanvas({
  data,
  rootLabel,
  conceptId,
  availableConcepts = [],
}: ConceptGraphCanvasProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [relFilter, setRelFilter] = useState<RelationFilter>('ALL');
  const [nodeSearch, setNodeSearch] = useState('');
  const [conceptJump, setConceptJump] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0 });

  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const rootNode = useMemo(
    () => nodes.find((n) => n.data.nodeType === 'ROOT') || nodes[0],
    [nodes],
  );

  const activeConceptId = conceptId || rootNode?.data.id || '';

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
    const width = 1040, height = 680, cx = width / 2, cy = height / 2;
    const pos = new Map<string, { x: number; y: number; w: number; h: number }>();
    if (rootNode) pos.set(rootNode.data.id, { x: cx, y: cy, w: 208, h: 60 });

    const rings: Array<[number, number | undefined, number, number]> = [
      [0, 9, 215, 150],
      [9, 24, 370, 248],
      [24, undefined, 430, 290],
    ];

    for (const [start, end, rx, ry] of rings) {
      const slice = satellites.slice(start, end);
      slice.forEach((n, i) => {
        const a = (i / Math.max(1, slice.length)) * 2 * Math.PI - Math.PI / 2;
        pos.set(n.data.id, { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), w: 156, h: 46 });
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

  const matchingConcepts = useMemo(() => {
    const cq = conceptJump.trim().toLowerCase();
    if (!cq || availableConcepts.length === 0) return [];
    return availableConcepts
      .filter((c) => c.labelTr.toLowerCase().includes(cq) || c.id.toLowerCase().includes(cq))
      .slice(0, 8);
  }, [conceptJump, availableConcepts]);

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
    setZoom((z) => Math.min(2, Math.max(0.65, Number((z - Math.sign(e.deltaY) * 0.1).toFixed(2)))));
  }, []);

  if (!rootNode) return null;

  const rootParsed = parseNodeLabel(rootLabel || rootNode.data.label || rootNode.data.id, rootNode.data.id);

  return (
    <section
      aria-label="Çerkesçe Sözlük — Kavram İlişki Ağı"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @keyframes cgFade { from { opacity: 0; } to { opacity: 1; } }
        .cg-node { animation: cgFade .45s ease-out both; }
      `}</style>

      {/* ═══ Header ═══ */}
      <div className="border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-slate-900 capitalize">
                  {rootParsed.primary}
                </h1>
                <span
                  className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {activeConceptId}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Çerkesçe Sözlük · {satellites.length + 1} düğüm · {satellites.length} bağlantı
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Başka Kavrama Geç */}
            {availableConcepts.length > 0 && (
              <div className="relative w-52">
                <GitBranch className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-indigo-500" />
                <input
                  type="text"
                  value={conceptJump}
                  onChange={(e) => setConceptJump(e.target.value)}
                  placeholder="Başka kavrama geç…"
                  className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
                {conceptJump && (
                  <button
                    type="button"
                    onClick={() => setConceptJump('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                {matchingConcepts.length > 0 && (
                  <div className="absolute left-0 right-0 top-10 z-30 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
                    {matchingConcepts.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setConceptJump('');
                          router.push(`/kavram/${encodeURIComponent(c.id)}`);
                        }}
                        className="flex w-full items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-indigo-50"
                      >
                        <span className="font-semibold text-slate-900 capitalize">{c.labelTr}</span>
                        <span className="text-[10px] text-slate-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {c.id}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Ağ İçi Arama */}
            <div className="relative w-44">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={nodeSearch}
                onChange={(e) => setNodeSearch(e.target.value)}
                placeholder="Ağda ara…"
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
              {nodeSearch && (
                <button
                  type="button"
                  onClick={() => setNodeSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* İlişki Filtresi */}
            <select
              aria-label="İlişki türü"
              value={relFilter}
              onChange={(e) => setRelFilter(e.target.value as RelationFilter)}
              className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              <option value="ALL">Tümü ({counts.ALL})</option>
              {counts.CHILD > 0 && <option value="CHILD">Kelimeler ({counts.CHILD})</option>}
              {counts.ROOT > 0 && <option value="ROOT">Kök / Aile ({counts.ROOT})</option>}
              {counts.RELATED > 0 && <option value="RELATED">İlişkili ({counts.RELATED})</option>}
            </select>

            <div className="hidden h-6 w-px bg-slate-200 sm:block" />

            {/* Zoom */}
            <div className="flex items-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                title="Uzaklaştır"
                onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-slate-900"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span
                className="min-w-11 text-center text-xs font-semibold text-slate-700"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                title="Yakınlaştır"
                onClick={() => setZoom((z) => Math.min(2, Number((z + 0.15).toFixed(2))))}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-slate-900"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Sıfırla"
                onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedId(null); }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-slate-900"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Body ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ── Canvas ── */}
        <div
          className="relative lg:col-span-8"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05) 0%, #f8fafc 75%)' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            role="img"
            aria-label="Kavram ilişki ağı görselleştirmesi"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onWheel={onWheel}
            className="relative z-10 w-full cursor-grab select-none active:cursor-grabbing"
            style={{ height: 560 }}
          >
            <defs>
              {Object.entries(REL_META).map(([key, meta]) => (
                <marker
                  key={key}
                  id={`arr-${key.toLowerCase()}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5.5"
                  markerHeight="5.5"
                  orient="auto"
                >
                  <path d="M0 1L10 5L0 9z" fill={meta.color} opacity="0.85" />
                </marker>
              ))}
              <filter id="cg-card-shadow" x="-10%" y="-10%" width="120%" height="125%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.07" />
              </filter>
              <linearGradient id="cg-root-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            <g transform={`translate(${layout.cx + pan.x},${layout.cy + pan.y}) scale(${zoom}) translate(${-layout.cx},${-layout.cy})`}>
              {/* Dönen kesikli yörünge halkaları */}
              {[215, 370].map((r, i) => (
                <g key={r}>
                  <ellipse
                    cx={layout.cx}
                    cy={layout.cy}
                    rx={r}
                    ry={r * 0.69}
                    fill="none"
                    stroke="#cbd5e1"
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

              {/* Kavisli kenarlar */}
              {satellites.map((node) => {
                const tp = layout.pos.get(node.data.id);
                const rp = layout.pos.get(rootNode.data.id);
                if (!tp || !rp) return null;
                const rel = edgeMap.get(node.data.id) || 'CHILD';
                const theme = getRelTheme(rel);
                const dx = tp.x - rp.x, dy = tp.y - rp.y;
                const dist = Math.hypot(dx, dy) || 1;
                const ux = dx / dist, uy = dy / dist;
                const sx = rp.x + ux * 98, sy = rp.y + uy * 28;
                const tx = tp.x - ux * 78, ty = tp.y - uy * 23;
                const mx = (sx + tx) / 2 - uy * 14, my = (sy + ty) / 2 + ux * 14;
                const hi = focusId === node.data.id;
                const dim = Boolean(focusId && focusId !== rootNode.data.id && !hi);
                return (
                  <path
                    key={`e-${node.data.id}`}
                    d={`M${sx} ${sy} Q${mx} ${my} ${tx} ${ty}`}
                    fill="none"
                    stroke={theme.color}
                    strokeWidth={hi ? 2.5 : 1.5}
                    strokeOpacity={dim ? 0.22 : hi ? 1 : 0.68}
                    strokeDasharray={theme.dash}
                    markerEnd={`url(#arr-${rel.toLowerCase()})`}
                    style={{ transition: 'stroke-opacity .2s, stroke-width .2s' }}
                  />
                );
              })}

              {/* Uydu düğümleri */}
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
                    className="cg-node"
                    filter="url(#cg-card-shadow)"
                    style={{
                      animationDelay: `${Math.min(i * 35, 450)}ms`,
                      opacity: dim ? 0.42 : 1,
                      transition: 'opacity .2s',
                      cursor: 'pointer',
                    }}
                    transform={`translate(${p.x},${p.y})`}
                    onClick={() => setSelectedId(isSel ? null : node.data.id)}
                    onMouseEnter={() => setHoveredId(node.data.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <title>{node.data.label || node.data.id}</title>
                    <rect
                      x={-p.w / 2}
                      y={-p.h / 2}
                      width={p.w}
                      height={p.h}
                      rx={13}
                      fill={isSel ? '#eef2ff' : theme.fill}
                      stroke={isSel || isHov ? '#4f46e5' : theme.border}
                      strokeWidth={isSel ? 2.2 : 1.4}
                    />
                    <circle cx={-p.w / 2 + 13} cy={parsed.secondary ? -5 : 0} r={3.8} fill={theme.dot} />
                    <text x={-p.w / 2 + 23} y={parsed.secondary ? -1 : 4} fontSize="12.5" fontWeight="700" textAnchor="start">
                      {splitHighlight(clip(parsed.primary, 15), q).map((part, j) => (
                        <tspan key={j} fill={part.m ? '#b45309' : '#0f172a'} fontWeight={part.m ? 800 : 700}>
                          {part.t}
                        </tspan>
                      ))}
                    </text>
                    {parsed.secondary && (
                      <text x={-p.w / 2 + 23} y={13} fill="#475569" fontSize="10.5" fontWeight="500" textAnchor="start">
                        {clip(parsed.secondary, 18)}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Merkez kök düğüm */}
              <g
                data-node="true"
                transform={`translate(${layout.cx},${layout.cy})`}
                onClick={() => setSelectedId(null)}
                filter="url(#cg-card-shadow)"
                style={{ cursor: 'pointer' }}
              >
                <title>{rootNode.data.label || rootNode.data.id}</title>
                <rect
                  x={-104}
                  y={-30}
                  width={208}
                  height={60}
                  rx={16}
                  fill="url(#cg-root-grad)"
                  stroke="#3730a3"
                  strokeWidth="1.8"
                />
                <text x={0} y={rootParsed.secondary ? -4 : 5} fill="#ffffff" fontSize="14.5" fontWeight="800" textAnchor="middle" className="capitalize">
                  {clip(rootParsed.primary, 19)}
                </text>
                {rootParsed.secondary && (
                  <text x={0} y={14} fill="#e0e7ff" fontSize="11" fontWeight="500" textAnchor="middle">
                    {clip(rootParsed.secondary, 23)}
                  </text>
                )}
              </g>
            </g>
          </svg>

          {/* Boş durum */}
          {satellites.length === 0 && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-xs">
              <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-center shadow-sm">
                <Search className="mx-auto mb-2 h-6 w-6 text-slate-400" />
                <p className="text-sm font-semibold text-slate-900">Eşleşen düğüm yok</p>
                <p className="mt-1 text-xs text-slate-500">Aramayı temizleyin veya filtreyi değiştirin.</p>
              </div>
            </div>
          )}

          {/* Sol alt tıklanabilir legend */}
          <div className="absolute bottom-3.5 left-3.5 z-20 flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1 shadow-xs backdrop-blur-md">
            <button
              type="button"
              onClick={() => setRelFilter('ALL')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                relFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Tümü
            </button>
            {Object.entries(REL_META).map(([key, m]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRelFilter(key as RelationFilter)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  relFilter === key ? 'bg-slate-100 font-semibold text-slate-900 ring-1 ring-slate-300' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: m.dot }} />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Inspector ── */}
        <aside className="border-t border-slate-200 bg-white p-5 lg:col-span-4 lg:border-l lg:border-t-0">
          {selectedDetail ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getRelTheme(selectedDetail.rel).badgeClass}`}>
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  {getRelTheme(selectedDetail.rel).label}
                </span>
                {selectedDetail.dialect && (
                  <span
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {selectedDetail.dialect}
                  </span>
                )}
              </div>

              <div
                className="rounded-xl border border-slate-200 border-l-4 bg-slate-50/70 py-3 pl-4 pr-3"
                style={{ borderLeftColor: getRelTheme(selectedDetail.rel).color }}
              >
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{selectedDetail.parsed.primary}</h2>
                {selectedDetail.parsed.secondary && (
                  <p className="mt-1 text-sm text-slate-600">{selectedDetail.parsed.secondary}</p>
                )}
              </div>

              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Merkez Kavram:</span>
                  <strong className="text-slate-900 capitalize">{rootParsed.primary}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Düğüm ID:</span>
                  <code
                    className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-indigo-700"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {selectedDetail.id}
                  </code>
                </div>
                {selectedDetail.depth !== null && (
                  <div className="flex justify-between">
                    <span>Derinlik:</span>
                    <span className="font-semibold text-slate-800" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {selectedDetail.depth}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-1">
                {selectedDetail.rel === 'RELATED' ? (
                  <Link
                    href={`/kavram/${encodeURIComponent(selectedDetail.id)}`}
                    className="inline-flex w-full items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-amber-700"
                  >
                    <GitBranch className="h-4 w-4" />
                    Bu Kavramın Ağına Geç
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-80" />
                  </Link>
                ) : (
                  <Link
                    href={`/sozluk?q=${encodeURIComponent(selectedDetail.id)}`}
                    className="inline-flex w-full items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-indigo-700"
                  >
                    <Search className="h-4 w-4" />
                    35 Sözlükte Ara
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-80" />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-violet-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-700">
                  Merkez Kavram
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-900 capitalize">{rootParsed.primary}</h2>
                {rootParsed.secondary && <p className="mt-0.5 text-xs text-slate-600">{rootParsed.secondary}</p>}
              </div>

              <div className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-600" />
                <p>
                  Kapsüllere tıklayarak karşılık, lehçe ve sözlük bağlantısını görüntüleyin.
                  Fare tekerleğiyle yakınlaştırıp boş alandan sürükleyerek kaydırabilirsiniz.
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3">
                {Object.entries(REL_META).map(([key, m]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRelFilter(key as RelationFilter)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      relFilter === key
                        ? 'border-indigo-300 bg-indigo-50/60'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.dot }} />
                      {m.label}
                    </span>
                    <span
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {counts[key as RelationFilter] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
