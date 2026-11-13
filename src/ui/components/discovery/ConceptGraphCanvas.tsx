'use client';

import React, { useMemo, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ZoomIn, ZoomOut, RotateCcw, Network, ArrowUpRight, Search, GitBranch, X,
} from 'lucide-react';

export interface CytoscapeElementData {
  nodes: Array<{ data: { id: string; label?: string; nodeType?: string; dialect?: string; depth?: number; score?: number; [key: string]: any } }>;
  edges: Array<{ data: { source: string; target: string; relationType?: string; [key: string]: any } }>;
}

interface ConceptGraphCanvasProps {
  data: CytoscapeElementData;
  rootLabel?: string;
}

type RelationFilter = 'ALL' | 'CHILD' | 'ROOT' | 'RELATED';

function parseNodeLabel(rawLabel: string, fallbackId: string) {
  const text = String(rawLabel || fallbackId || '').trim();
  const conceptMatch = text.match(/^(.*?)\s*\[([A-Z0-9_-]+)\]$/);
  if (conceptMatch) {
    return { primary: conceptMatch[1].trim() || conceptMatch[2], secondary: conceptMatch[2] };
  }
  const parenMatch = text.match(/^([^(]+?)\s*\(([^)]+)\)$/);
  if (parenMatch) {
    return { primary: parenMatch[1].trim(), secondary: parenMatch[2].trim() };
  }
  return { primary: text, secondary: /^[A-Z0-9_-]{3,}$/.test(text) ? 'Kavram' : '' };
}

function clip(str: string, max: number): string {
  return str.length <= max ? str : `${str.slice(0, max - 1)}…`;
}

function getRelTheme(rel?: string) {
  const key = String(rel || 'CHILD').toUpperCase();
  if (key === 'ROOT') {
    return {
      label: 'Aynı Kök / Aile',
      stroke: '#10b981',
      fill: '#052e2b',
      border: '#059669',
      dot: '#34d399',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      dash: '6,4',
    };
  }
  if (key === 'RELATED') {
    return {
      label: 'İlişkili Kavram',
      stroke: '#f59e0b',
      fill: '#2e1a05',
      border: '#d97706',
      dot: '#fbbf24',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      dash: '3,4',
    };
  }
  return {
    label: 'Kavram Kelimesi',
    stroke: '#38bdf8',
    fill: '#0f172a',
    border: '#0284c7',
    dot: '#38bdf8',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    dash: undefined,
  };
}

export function ConceptGraphCanvas({ data, rootLabel }: ConceptGraphCanvasProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [relFilter, setRelFilter] = useState<RelationFilter>('ALL');
  const [nodeSearch, setNodeSearch] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0 });

  if (!data || !data.nodes || data.nodes.length === 0) return null;

  const rootNode = useMemo(
    () => data.nodes.find((n) => n.data.nodeType === 'ROOT') || data.nodes[0],
    [data.nodes],
  );

  const edgeMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const e of data.edges || []) {
      m.set(e.data.target, String(e.data.relationType || 'CHILD').toUpperCase());
    }
    return m;
  }, [data.edges]);

  const counts = useMemo(() => {
    const c = { ALL: 0, CHILD: 0, ROOT: 0, RELATED: 0 };
    for (const n of data.nodes) {
      if (n.data.id === rootNode.data.id) continue;
      c.ALL += 1;
      const r = (edgeMap.get(n.data.id) || 'CHILD') as keyof typeof c;
      if (r in c) c[r] += 1;
    }
    return c;
  }, [data.nodes, rootNode, edgeMap]);

  const satellites = useMemo(() => {
    const q = nodeSearch.trim().toLowerCase();
    return data.nodes.filter((n) => {
      if (n.data.id === rootNode.data.id) return false;
      const r = edgeMap.get(n.data.id) || 'CHILD';
      if (relFilter !== 'ALL' && r !== relFilter) return false;
      if (!q) return true;
      return `${n.data.id} ${n.data.label || ''}`.toLowerCase().includes(q);
    });
  }, [data.nodes, rootNode, edgeMap, relFilter, nodeSearch]);

  const layout = useMemo(() => {
    const width = 1040;
    const height = 700;
    const cx = width / 2;
    const cy = height / 2;
    const pos = new Map<string, { x: number; y: number; w: number; h: number }>();
    pos.set(rootNode.data.id, { x: cx, y: cy, w: 204, h: 60 });

    const r1 = satellites.slice(0, 10);
    const r2 = satellites.slice(10, 26);
    const r3 = satellites.slice(26);

    const place = (list: typeof satellites, rx: number, ry: number, offset: number) => {
      list.forEach((n, i) => {
        const a = offset + (i / Math.max(1, list.length)) * 2 * Math.PI - Math.PI / 2;
        pos.set(n.data.id, { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), w: 156, h: 46 });
      });
    };

    place(r1, 235, 175, 0);
    const step = r1.length > 0 ? Math.PI / r1.length : 0.25;
    place(r2, 415, 290, step);
    place(r3, 545, 365, step * 0.5);

    return { width, height, cx, cy, pos };
  }, [rootNode, satellites]);

  const focusId = hoveredId || selectedId;

  const selectedDetail = useMemo(() => {
    if (!selectedId || selectedId === rootNode.data.id) return null;
    const node = data.nodes.find((n) => n.data.id === selectedId);
    if (!node) return null;
    const rel = edgeMap.get(node.data.id) || 'CHILD';
    return {
      id: node.data.id,
      rel,
      dialect: node.data.dialect || '',
      parsed: parseNodeLabel(node.data.label || node.data.id, node.data.id),
    };
  }, [selectedId, rootNode, data.nodes, edgeMap]);

  const onDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as Element)?.closest('[data-node="true"]')) return;
    dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, ox: pan.x, oy: pan.y };
  }, [pan]);

  const onMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragRef.current.active) return;
    setPan({ x: dragRef.current.ox + (e.clientX - dragRef.current.sx), y: dragRef.current.oy + (e.clientY - dragRef.current.sy) });
  }, []);

  const onUp = useCallback(() => { dragRef.current.active = false; }, []);

  const rootParsed = parseNodeLabel(rootLabel || rootNode.data.label || rootNode.data.id, rootNode.data.id);

  return (
    <section
      aria-label="Kavram İlişki Ağı"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden"
    >
      {/* Üst Araç Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/95 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Network className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-white">Kavram İlişki Ağı</h3>
            <p className="text-[11px] text-slate-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {satellites.length + 1} düğüm · {satellites.length} bağlantı
            </p>
          </div>
        </div>

        {/* Düğüm içi hızlı arama */}
        <div className="relative w-full sm:w-52">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={nodeSearch}
            onChange={(e) => setNodeSearch(e.target.value)}
            placeholder="Ağ içinde kelime ara..."
            className="h-8 w-full rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-7 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          {nodeSearch && (
            <button type="button" onClick={() => setNodeSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* İlişki Filtreleri */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => setRelFilter('ALL')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${relFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            Tümü ({counts.ALL})
          </button>
          {counts.CHILD > 0 && (
            <button type="button" onClick={() => setRelFilter('CHILD')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${relFilter === 'CHILD' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-sky-300 hover:bg-slate-700'}`}>
              <span className="h-2 w-2 rounded-full bg-sky-400" /> Kelimeler ({counts.CHILD})
            </button>
          )}
          {counts.ROOT > 0 && (
            <button type="button" onClick={() => setRelFilter('ROOT')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${relFilter === 'ROOT' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'}`}>
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Kök ({counts.ROOT})
            </button>
          )}
          {counts.RELATED > 0 && (
            <button type="button" onClick={() => setRelFilter('RELATED')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${relFilter === 'RELATED' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-amber-300 hover:bg-slate-700'}`}>
              <span className="h-2 w-2 rounded-full bg-amber-400" /> İlişkili ({counts.RELATED})
            </button>
          )}
        </div>

        {/* Zoom Kontrolleri */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
          <button type="button" onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))} className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Uzaklaştır">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[42px] text-center text-[11px] text-slate-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {Math.round(zoom * 100)}%
          </span>
          <button type="button" onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.15).toFixed(2))))} className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Yakınlaştır">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedId(null); }} className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Sıfırla">
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Ana Çizge ve Sağ Detay Paneli */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            className="h-[500px] sm:h-[560px] w-full cursor-grab active:cursor-grabbing select-none"
          >
            <defs>
              <marker id="arr-child" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="arr-root" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
              </marker>
              <marker id="arr-rel" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            <g transform={`translate(${layout.cx + pan.x}, ${layout.cy + pan.y}) scale(${zoom}) translate(${-layout.cx}, ${-layout.cy})`}>
              <ellipse cx={layout.cx} cy={layout.cy} rx={235} ry={175} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,6" />
              {satellites.length > 10 && (
                <ellipse cx={layout.cx} cy={layout.cy} rx={415} ry={290} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,6" />
              )}

              {/* Kavisli Bağlantı Okları */}
              {satellites.map((node) => {
                const tp = layout.pos.get(node.data.id);
                const rp = layout.pos.get(rootNode.data.id);
                if (!tp || !rp) return null;

                const rel = edgeMap.get(node.data.id) || 'CHILD';
                const theme = getRelTheme(rel);
                const dx = tp.x - rp.x;
                const dy = tp.y - rp.y;
                const dist = Math.hypot(dx, dy) || 1;
                const ux = dx / dist;
                const uy = dy / dist;

                const sx = rp.x + ux * 96;
                const sy = rp.y + uy * 28;
                const tx = tp.x - ux * 78;
                const ty = tp.y - uy * 23;
                const mx = (sx + tx) / 2 - uy * 14;
                const my = (sy + ty) / 2 + ux * 14;

                const isHighlighted = focusId === node.data.id;
                const isDimmed = Boolean(focusId && focusId !== rootNode.data.id && !isHighlighted);
                const marker = rel === 'ROOT' ? 'url(#arr-root)' : rel === 'RELATED' ? 'url(#arr-rel)' : 'url(#arr-child)';

                return (
                  <path
                    key={`edge-${node.data.id}`}
                    d={`M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`}
                    fill="none"
                    stroke={theme.stroke}
                    strokeWidth={isHighlighted ? 2.6 : 1.4}
                    strokeOpacity={isDimmed ? 0.12 : isHighlighted ? 0.95 : 0.48}
                    strokeDasharray={theme.dash}
                    markerEnd={marker}
                  />
                );
              })}

              {/* Uydu Düğüm Kapsülleri */}
              {satellites.map((node) => {
                const p = layout.pos.get(node.data.id);
                if (!p) return null;
                const rel = edgeMap.get(node.data.id) || 'CHILD';
                const theme = getRelTheme(rel);
                const parsed = parseNodeLabel(node.data.label || node.data.id, node.data.id);
                const isSel = selectedId === node.data.id;
                const isHov = hoveredId === node.data.id;
                const isDim = Boolean(focusId && focusId !== rootNode.data.id && !isSel && !isHov);

                return (
                  <g
                    key={`node-${node.data.id}`}
                    data-node="true"
                    transform={`translate(${p.x}, ${p.y})`}
                    onClick={() => setSelectedId(isSel ? null : node.data.id)}
                    onMouseEnter={() => setHoveredId(node.data.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ opacity: isDim ? 0.25 : 1 }}
                    className="cursor-pointer transition-opacity duration-150"
                  >
                    <rect
                      x={-p.w / 2}
                      y={-p.h / 2}
                      width={p.w}
                      height={p.h}
                      rx={12}
                      fill={isSel ? '#1e293b' : theme.fill}
                      stroke={isSel || isHov ? '#ffffff' : theme.border}
                      strokeWidth={isSel ? 2.4 : 1.4}
                    />
                    <circle cx={-p.w / 2 + 13} cy={parsed.secondary ? -5 : 0} r={4} fill={theme.dot} />
                    <text x={-p.w / 2 + 23} y={parsed.secondary ? -1 : 4} fill="#f8fafc" fontSize="12.5" fontWeight="700" textAnchor="start">
                      {clip(parsed.primary, 16)}
                    </text>
                    {parsed.secondary && (
                      <text x={-p.w / 2 + 23} y={14} fill="#94a3b8" fontSize="10.5" textAnchor="start">
                        {clip(parsed.secondary, 19)}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Merkez Kök Kavram Kartı */}
              <g data-node="true" transform={`translate(${layout.cx}, ${layout.cy})`} onClick={() => setSelectedId(null)} className="cursor-pointer">
                <rect x={-102} y={-30} width={204} height={60} rx={16} fill="#1d4ed8" stroke="#93c5fd" strokeWidth={2.5} />
                <text x={0} y={rootParsed.secondary ? -4 : 5} fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle" className="capitalize">
                  {clip(rootParsed.primary, 20)}
                </text>
                {rootParsed.secondary && (
                  <text x={0} y={15} fill="#dbeafe" fontSize="11" textAnchor="middle">
                    {clip(rootParsed.secondary, 24)}
                  </text>
                )}
              </g>
            </g>
          </svg>
        </div>

        {/* Sağ İnceleme Paneli */}
        <aside className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between">
          {selectedDetail ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${getRelTheme(selectedDetail.rel).badge}`}>
                  {getRelTheme(selectedDetail.rel).label}
                </span>
                {selectedDetail.dialect && (
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {selectedDetail.dialect}
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white">{selectedDetail.parsed.primary}</h4>
                {selectedDetail.parsed.secondary && (
                  <p className="mt-1 text-sm text-slate-300">{selectedDetail.parsed.secondary}</p>
                )}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs text-slate-400 space-y-1.5">
                <div>Merkez Kavram: <strong className="text-slate-200 capitalize">{rootParsed.primary}</strong></div>
                <div>Düğüm Kimliği: <code className="text-indigo-300">{selectedDetail.id}</code></div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {selectedDetail.rel === 'RELATED' ? (
                  <Link
                    href={`/kavram/${encodeURIComponent(selectedDetail.id)}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-500 transition-colors"
                  >
                    <GitBranch className="h-4 w-4" />
                    Bu Kavramın Ağına Geç
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    href={`/sozluk?q=${encodeURIComponent(selectedDetail.id)}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
                  >
                    <Search className="h-4 w-4" />
                    35 Sözlükte Ara ({selectedDetail.id})
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Merkez Kavram</h4>
                <p className="mt-1 text-lg font-bold text-white capitalize">{rootParsed.primary}</p>
                {rootParsed.secondary && <p className="text-xs text-slate-400">{rootParsed.secondary}</p>}
              </div>

              <p className="text-xs leading-relaxed text-slate-400">
                Soldaki ağ üzerinde herhangi bir kelime veya kavram kapsülüne tıklayarak Türkçe karşılığını, lehçe bilgisini ve doğrudan sözlük bağlantısını burada açabilirsiniz.
              </p>

              <div className="space-y-2 border-t border-slate-800 pt-3 text-xs text-slate-300">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Kavram Kelimeleri ({counts.CHILD})</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Aynı Kök / Kelime Ailesi ({counts.ROOT})</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> İlişkili Kavram Ağları ({counts.RELATED})</div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
