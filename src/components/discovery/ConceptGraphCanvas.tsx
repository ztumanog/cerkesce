'use client';
import React, { useMemo, useState, useRef, useCallback } from 'react';
import {
  ZoomIn, ZoomOut, RotateCcw, Network, ArrowUpRight, Search,
  GitBranch, X, Sparkles, Layers, Link2, BookOpen, Info,
} from 'lucide-react';

// DÜZELTİLDİ: tüm UI importları tek, standart yol -> @/components/ui/...
// Önceki hatalı haller: @/ui/button , @/ui/components/ui/input , @/u + satır kırığı + i/select'
// RADIX SÜRÜMÜ: shadcn yok, doğrudan @radix-ui paketleri kullanılıyor.
// Gerekli paketler: @radix-ui/react-tooltip, @radix-ui/react-select,
// @radix-ui/react-scroll-area, @radix-ui/react-separator
// Kurulum (eksikse): npm i @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-scroll-area @radix-ui/react-separator
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Select from '@radix-ui/react-select';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Separator from '@radix-ui/react-separator';

// Radix'te olmayan basit parçalar: ince yerel sarmalayıcılar (shadcn değil)
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string };
function Button({ className = '', variant: _variant, size: _size, ...p }: BtnProps) {
  return <button type="button" className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${className}`} {...p} />;
}
function Badge({ className = '', ...p }: DivProps) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${className}`} {...p} />;
}
function Input(p: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...p} className={`flex h-9 w-full rounded-lg border bg-transparent px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 ${p.className ?? ''}`} />;
}
function Card({ className = '', ...p }: DivProps) {
  return <div className={`rounded-xl border bg-slate-950 text-slate-100 shadow ${className}`} {...p} />;
}
function CardContent({ className = '', ...p }: DivProps) {
  return <div className={`p-4 ${className}`} {...p} />;
}
function CardHeader({ className = '', ...p }: DivProps) {
  return <div className={`flex flex-col gap-1.5 p-4 ${className}`} {...p} />;
}
function CardTitle({ className = '', ...p }: DivProps) {
  return <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...p} />;
}
function CardDescription({ className = '', ...p }: DivProps) {
  return <p className={`text-sm text-slate-400 ${className}`} {...p} />;
}

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

function parseNodeLabel(rawLabel: string, fallbackId: string) {
  const text = String(rawLabel || fallbackId || '').trim();
  const conceptMatch = text.match(/^(.*?)\s*\[([A-Z0-9_-]+)\]$/);
  if (conceptMatch) return { primary: conceptMatch[1].trim() || conceptMatch[2], secondary: conceptMatch[2] };
  const parenMatch = text.match(/^([^(]+?)\s*\(([^)]+)\)$/);
  if (parenMatch) return { primary: parenMatch[1].trim(), secondary: parenMatch[2].trim() };
  return { primary: text, secondary: /^[A-Z0-9_-]{3,}$/.test(text) ? 'Concept' : '' };
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
  { label: string; color: string; bg: string; border: string; dot: string; dash?: string; icon: React.ElementType }
> = {
  CHILD: {
    label: 'Concept Lexemes',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.35)',
    dot: '#38bdf8',
    icon: BookOpen,
  },
  ROOT: {
    label: 'Shared Root / Family',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.35)',
    dot: '#34d399',
    dash: '6,4',
    icon: Layers,
  },
  RELATED: {
    label: 'Related Concepts',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.35)',
    dot: '#fbbf24',
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

  // Aynı hedefe 2 farklı ilişkiden kenar gelirse ezme, hepsini tut
  const edgeMap = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const e of edges) {
      const rel = String(e.data.relationType || 'CHILD').toUpperCase();
      const arr = m.get(e.data.target) ?? [];
      if (!arr.includes(rel)) arr.push(rel);
      m.set(e.data.target, arr);
    }
    return m;
  }, [edges]);
  // Birincil ilişki = ilk kenar (filtre / renk için)
  const primaryRel = useCallback((id: string) => (edgeMap.get(id)?.[0] || 'CHILD') as RelationFilter, [edgeMap]);

  const counts = useMemo(() => {
    const c = { ALL: 0, CHILD: 0, ROOT: 0, RELATED: 0 } as Record<RelationFilter, number>;
    if (!rootNode) return c;
    for (const n of nodes) {
      if (n.data.id === rootNode.data.id) continue;
      c.ALL += 1;
      const r = primaryRel(n.data.id);
      if (r in c) c[r] += 1;
    }
    return c;
  }, [nodes, rootNode, primaryRel]);

  const q = nodeSearch.trim().toLowerCase();

  const satellites = useMemo(() => {
    if (!rootNode) return [];
    return nodes.filter((n) => {
      if (n.data.id === rootNode.data.id) return false;
      const r = primaryRel(n.data.id);
      if (relFilter !== 'ALL' && r !== relFilter) return false;
      if (!q) return true;
      return `${n.data.id} ${n.data.label || ''}`.toLowerCase().includes(q);
    });
  }, [nodes, rootNode, primaryRel, relFilter, q]);

  // Sabit halka yok: halka sayısı düğüm sayısına göre büyür
  const layout = useMemo(() => {
    const pos = new Map<string, { x: number; y: number; w: number; h: number }>();
    const PER_RING = 12;
    const ringCount = Math.max(1, Math.ceil(satellites.length / PER_RING));
    const maxRx = 200 + (ringCount - 1) * 135;
    const width = Math.max(1040, (maxRx + 140) * 2);
    const height = Math.max(700, (maxRx * 0.68 + 100) * 2);
    const cx = width / 2, cy = height / 2;
    if (rootNode) pos.set(rootNode.data.id, { x: Math.round(cx * 100) / 100, y: Math.round(cy * 100) / 100, w: 220, h: 64 });
    for (let ring = 0; ring < ringCount; ring++) {
      const slice = satellites.slice(ring * PER_RING, (ring + 1) * PER_RING);
      const rx = 200 + ring * 135, ry = rx * 0.68;
      slice.forEach((n, i) => {
        const a = (i / Math.max(1, slice.length)) * 2 * Math.PI - Math.PI / 2 + ring * (Math.PI / Math.max(1, slice.length));
        pos.set(n.data.id, { x: Math.round((cx + rx * Math.cos(a)) * 100) / 100, y: Math.round((cy + ry * Math.sin(a)) * 100) / 100, w: 160, h: 48 });
      });
    }
    return { width, height, cx, cy, pos };
  }, [rootNode, satellites]);

  const focusId = hoveredId || selectedId;

  const selectedDetail = useMemo(() => {
    if (!selectedId || !rootNode || selectedId === rootNode.data.id) return null;
    const node = nodes.find((n) => n.data.id === selectedId);
    if (!node) return null;
    const rel = primaryRel(node.data.id);
    return {
      id: node.data.id,
      rel,
      dialect: String(node.data.dialect || ''),
      depth: typeof node.data.depth === 'number' ? node.data.depth : null,
      parsed: parseNodeLabel(node.data.label || node.data.id, node.data.id),
    };
  }, [selectedId, rootNode, nodes, primaryRel]);

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
      <Card className="overflow-hidden border-slate-800/60 bg-slate-950">
        <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <Network className="h-8 w-8 text-slate-600" />
          <p className="text-sm font-semibold text-slate-200">No graph data available</p>
          <p className="text-xs text-slate-400">Provide a valid data prop to ConceptGraphCanvas.</p>
        </CardContent>
      </Card>
    );
  }

  const rootParsed = parseNodeLabel(rootLabel || rootNode.data.label || rootNode.data.id, rootNode.data.id);

  return (
    <Tooltip.Provider delayDuration={200}>
      <style>{`
        @keyframes cgFade { from { opacity: 0; } to { opacity: 1; } }
        .cg-node { animation: cgFade .5s ease-out both; }
      `}</style>

      <Card className="overflow-hidden border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <CardHeader className="border-b border-slate-800/60 bg-slate-900/50 px-6 py-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-500/30">
                <Network className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-base font-bold tracking-tight text-white">
                  Concept Relation Network
                </CardTitle>
                <CardDescription className="mt-0.5 font-mono text-xs text-slate-400">
                  {satellites.length + 1} nodes · {satellites.length} links
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <Input
                  value={nodeSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNodeSearch(e.target.value)}
                  placeholder="Search network…"
                  className="h-9 w-48 rounded-lg border-slate-700/60 bg-slate-950/80 pl-8 pr-7 text-xs text-slate-100 placeholder:text-slate-500"
                />
                {nodeSearch && (
                  <button
                    type="button"
                    onClick={() => setNodeSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <Select.Root value={relFilter} onValueChange={(v: string) => setRelFilter(v as RelationFilter)}>
                <Select.Trigger className="flex h-9 w-44 items-center justify-between rounded-lg border border-slate-700/60 bg-slate-950/80 px-3 text-xs text-slate-200 outline-none">
                  <Select.Value placeholder="Relation type" />
                </Select.Trigger>
                <Select.Portal><Select.Content className="z-50 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-900 text-slate-100 shadow"><Select.Viewport className="p-1">
                  <Select.Item value="ALL" className="flex cursor-pointer items-center rounded px-2 py-1.5 text-xs outline-none data-[highlighted]:bg-slate-800"><Select.ItemText>All ({counts.ALL})</Select.ItemText></Select.Item>
                  {counts.CHILD > 0 && (
                    <Select.Item value="CHILD" className="flex cursor-pointer items-center rounded px-2 py-1.5 text-xs outline-none data-[highlighted]:bg-slate-800"><Select.ItemText><span className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5 text-sky-400" /> Lexemes ({counts.CHILD})</span></Select.ItemText></Select.Item>
                  )}
                  {counts.ROOT > 0 && (
                    <Select.Item value="ROOT" className="flex cursor-pointer items-center rounded px-2 py-1.5 text-xs outline-none data-[highlighted]:bg-slate-800"><Select.ItemText><span className="flex items-center gap-2"><Layers className="h-3.5 w-3.5 text-emerald-400" /> Root / Family ({counts.ROOT})</span></Select.ItemText></Select.Item>
                  )}
                  {counts.RELATED > 0 && (
                    <Select.Item value="RELATED" className="flex cursor-pointer items-center rounded px-2 py-1.5 text-xs outline-none data-[highlighted]:bg-slate-800"><Select.ItemText><span className="flex items-center gap-2"><Link2 className="h-3.5 w-3.5 text-amber-400" /> Related ({counts.RELATED})</span></Select.ItemText></Select.Item>
                  )}
                </Select.Viewport></Select.Content></Select.Portal>
              </Select.Root>

              <Separator.Root orientation="vertical" className="h-6 w-px bg-slate-700/60" />

              <div className="flex items-center gap-0.5 rounded-lg border border-slate-700/60 bg-slate-950/80 p-0.5">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:bg-slate-800 hover:text-white"
                      onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))))}
                    >
                      <ZoomOut className="h-3.5 w-3.5" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal><Tooltip.Content side="bottom" className="z-50 rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow">Zoom out</Tooltip.Content></Tooltip.Portal>
                </Tooltip.Root>
                <span className="min-w-11 text-center font-mono text-xs text-slate-300">
                  {Math.round(zoom * 100)}%
                </span>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:bg-slate-800 hover:text-white"
                      onClick={() => setZoom((z) => Math.min(2, Number((z + 0.15).toFixed(2))))}
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal><Tooltip.Content side="bottom" className="z-50 rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow">Zoom in</Tooltip.Content></Tooltip.Portal>
                </Tooltip.Root>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:bg-slate-800 hover:text-white"
                      onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedId(null); }}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal><Tooltip.Content side="bottom" className="z-50 rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow">Reset view</Tooltip.Content></Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-8" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)' }}>
              <div
                className="pointer-events-none absolute inset-0"
                style={{ opacity: 0.06, backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />

              <svg
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                role="img"
                aria-label="Concept relation network graph"
                onMouseDown={onDown}
                onMouseMove={onMove}
                onMouseUp={onUp}
                onMouseLeave={onUp}
                onWheel={onWheel}
                className="relative z-10 w-full cursor-grab select-none active:cursor-grabbing"
                style={{ height: 540 }}
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

                <g transform={`translate(${layout.cx + pan.x},${layout.cy + pan.y}) scale(${zoom}) translate(${-layout.cx},${-layout.cy})`}>
                  {Array.from({ length: Math.max(1, Math.ceil(satellites.length / 12)) }, (_, i) => 200 + i * 135).map((r, i) => (
                    <g key={r}>
                      <ellipse
                        cx={layout.cx}
                        cy={layout.cy}
                        rx={r}
                        ry={r * 0.68}
                        fill="none"
                        stroke="rgba(148,163,184,0.08)"
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
                    const rel = primaryRel(node.data.id);
                    const theme = getRelTheme(rel);
                    const dx = tp.x - rp.x, dy = tp.y - rp.y;
                    const dist = Math.hypot(dx, dy) || 1;
                    const ux = dx / dist, uy = dy / dist;
                    const sx = rp.x + ux * 100, sy = rp.y + uy * 30;
                    const tx = tp.x - ux * 80, ty = tp.y - uy * 24;
                    const mx = (sx + tx) / 2 - uy * 16, my = (sy + ty) / 2 + ux * 16;
                    const hi = focusId === node.data.id;
                    const dim = Boolean(focusId && focusId !== rootNode.data.id && !hi);
                    return (
                      <path
                        key={`e-${node.data.id}`}
                        d={`M${sx} ${sy} Q${mx} ${my} ${tx} ${ty}`}
                        fill="none"
                        stroke={theme.color}
                        strokeWidth={hi ? 2.4 : 1.3}
                        strokeOpacity={dim ? 0.1 : hi ? 1 : 0.42}
                        strokeDasharray={theme.dash}
                        markerEnd={`url(#arr-${rel.toLowerCase()})`}
                        style={{ transition: 'stroke-opacity .2s, stroke-width .2s' }}
                      />
                    );
                  })}

                  {satellites.map((node, i) => {
                    const p = layout.pos.get(node.data.id);
                    if (!p) return null;
                    const rel = primaryRel(node.data.id);
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
                        style={{ animationDelay: `${Math.min(i * 40, 480)}ms`, opacity: dim ? 0.25 : 1, transition: 'opacity .2s', cursor: 'pointer' }}
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
                          rx={14}
                          fill={isSel ? 'rgba(99,102,241,0.16)' : theme.bg}
                          stroke={isSel ? '#818cf8' : isHov ? 'rgba(255,255,255,0.6)' : theme.border}
                          strokeWidth={isSel ? 2 : 1.2}
                          style={{ transition: 'all .15s' }}
                        />
                        <circle cx={-p.w / 2 + 14} cy={parsed.secondary ? -5 : 0} r={3.5} fill={theme.dot} />
                        <text x={-p.w / 2 + 24} y={parsed.secondary ? -1 : 4} fontSize="12.5" fontWeight="700" textAnchor="start">
                          {splitHighlight(clip(parsed.primary, 15), q).map((part, j) => (
                            <tspan key={j} fill={part.m ? '#fde68a' : '#f1f5f9'} fontWeight={part.m ? 800 : 700}>{part.t}</tspan>
                          ))}
                        </text>
                        {parsed.secondary && (
                          <text x={-p.w / 2 + 24} y={14} fill="#94a3b8" fontSize="10" textAnchor="start">
                            {clip(parsed.secondary, 18)}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  <g
                    data-node="true"
                    transform={`translate(${layout.cx},${layout.cy})`}
                    onClick={() => setSelectedId(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <title>{rootNode.data.label || rootNode.data.id}</title>
                    <rect
                      x={-110}
                      y={-32}
                      width={220}
                      height={64}
                      rx={18}
                      fill="url(#cg-root-grad)"
                      stroke="rgba(165,180,252,0.5)"
                      strokeWidth="2"
                      filter="url(#cg-glow)"
                    />
                    <text x={0} y={rootParsed.secondary ? -5 : 5} fill="#fff" fontSize="15" fontWeight="800" textAnchor="middle">
                      {clip(rootParsed.primary, 20)}
                    </text>
                    {rootParsed.secondary && (
                      <text x={0} y={14} fill="rgba(224,231,255,0.85)" fontSize="10.5" textAnchor="middle">
                        {clip(rootParsed.secondary, 24)}
                      </text>
                    )}
                  </g>
                </g>
              </svg>

              {satellites.length === 0 && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="rounded-xl border border-slate-700/60 bg-slate-950/90 px-6 py-4 text-center">
                    <Search className="mx-auto mb-2 h-6 w-6 text-slate-500" />
                    <p className="text-sm font-semibold text-slate-200">No matching nodes</p>
                    <p className="mt-1 text-xs text-slate-400">Clear the search query or change the filter.</p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-xl border border-slate-700/50 bg-slate-950/85 p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setRelFilter('ALL')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${relFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  All
                </button>
                {Object.entries(REL_META).map(([key, m]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRelFilter(key as RelationFilter)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${relFilter === key ? 'bg-slate-800 text-white ring-1 ring-slate-600' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: m.dot }} />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <aside className="border-t bg-slate-900/40 lg:col-span-4 lg:border-l lg:border-t-0" style={{ borderColor: 'rgba(30,41,59,0.6)' }}>
              <ScrollArea.Root><ScrollArea.Viewport className="p-5" style={{ height: 540 }}><div style={{ display: "table", minWidth: "100%" }}>
                {selectedDetail ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <Badge  className="border-slate-700/60 bg-slate-800/50 px-2.5 py-1 text-xs font-semibold text-slate-200">
                        <Sparkles className="mr-1.5 h-3 w-3 text-indigo-400" />
                        {getRelTheme(selectedDetail.rel).label}
                      </Badge>
                      {selectedDetail.dialect && (
                        <Badge className="border-0 bg-slate-800 font-mono text-xs text-slate-300">
                          {selectedDetail.dialect}
                        </Badge>
                      )}
                    </div>

                    <div className="rounded-xl border-l-4 bg-slate-950/40 py-3 pl-4 pr-3" style={{ borderLeftColor: getRelTheme(selectedDetail.rel).color }}>
                      <h4 className="text-2xl font-extrabold tracking-tight text-white">{selectedDetail.parsed.primary}</h4>
                      {selectedDetail.parsed.secondary && (
                        <p className="mt-1 text-sm text-slate-400">{selectedDetail.parsed.secondary}</p>
                      )}
                    </div>

                    <Separator.Root className="h-px w-full bg-slate-800/60" />

                    <Card className="border-slate-800/60 bg-slate-950/60 shadow-none">
                      <CardContent className="space-y-2 p-3.5 text-xs text-slate-400">
                        <div className="flex justify-between">
                          <span>Root Concept:</span>
                          <strong className="text-slate-200">{rootParsed.primary}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Node ID:</span>
                          <code className="rounded bg-slate-800/60 px-1.5 py-0.5 font-mono text-xs text-indigo-300">{selectedDetail.id}</code>
                        </div>
                        {selectedDetail.depth !== null && (
                          <div className="flex justify-between">
                            <span>Depth:</span>
                            <span className="font-mono text-slate-300">{selectedDetail.depth}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="flex flex-col gap-2 pt-1">
                      {selectedDetail.rel === 'RELATED' ? (
                        <a href={`/kavram/${encodeURIComponent(selectedDetail.id)}`} className="inline-flex w-full items-center justify-center rounded-xl bg-amber-600 px-3 py-2 text-xs font-bold text-white hover:bg-amber-500">
                          <span className="inline-flex w-full items-center gap-2">
                            <GitBranch className="h-4 w-4" />
                            Explore Concept Network
                            <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-70" />
                          </span>
                        </a>
                      ) : (
                        <a href={`/sozluk?q=${encodeURIComponent(selectedDetail.id)}`} className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-500">
                          <span className="inline-flex w-full items-center gap-2">
                            <Search className="h-4 w-4" />
                            Search in Dictionary
                            <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-70" />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 shadow-none">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                          Root Concept
                        </CardDescription>
                        <CardTitle className="text-xl font-extrabold text-white">{rootParsed.primary}</CardTitle>
                        {rootParsed.secondary && <p className="text-xs text-slate-400">{rootParsed.secondary}</p>}
                      </CardHeader>
                    </Card>

                    <div className="flex gap-2 rounded-xl border border-slate-800/60 bg-slate-950/40 p-3 text-xs leading-relaxed text-slate-400">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                      <p>
                        Click any node capsule to inspect its dialect, root metadata, and dictionary link.
                        Scroll to zoom and drag empty space to pan.
                      </p>
                    </div>

                    <Separator.Root className="h-px w-full bg-slate-800/60" />

                    <div className="space-y-2.5">
                      {Object.entries(REL_META).map(([key, m]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setRelFilter(key as RelationFilter)}
                          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${relFilter === key ? 'border-slate-600 bg-slate-800/60' : 'border-slate-800/50 bg-slate-950/40 hover:bg-slate-800/40'}`}
                        >
                          <span className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.dot }} />
                            {m.label}
                          </span>
                          <Badge  className="bg-slate-800 text-xs text-slate-300">
                            {(counts as Record<string, number>)[key] ?? 0}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div></ScrollArea.Viewport><ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb className="rounded bg-slate-700" /></ScrollArea.Scrollbar></ScrollArea.Root>
            </aside>
          </div>
        </CardContent>
      </Card>
    </Tooltip.Provider>
  );
}