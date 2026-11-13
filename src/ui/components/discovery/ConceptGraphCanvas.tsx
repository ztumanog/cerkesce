'use client';

import React, { useMemo, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ZoomIn, ZoomOut, RotateCcw, Network, ArrowUpRight, Search, GitBranch, X, Maximize2, ArrowLeft,
} from 'lucide-react';

export interface CytoscapeElementData {
  nodes: Array<{ data: { id: string; label?: string; nodeType?: string; dialect?: string; depth?: number; score?: number; [key: string]: any } }>;
  edges: Array<{ data: { source: string; target: string; relationType?: string; [key: string]: any } }>;
}

export interface ConceptOption {
  id: string;
  labelTr: string;
  count?: number;
}

interface ConceptGraphCanvasProps {
  data: CytoscapeElementData;
  rootLabel?: string;
  conceptId?: string;
  standalone?: boolean;
  availableConcepts?: ConceptOption[];
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
      stroke: '#059669',
      fill: '#ecfdf5',
      border: '#10b981',
      dot: '#059669',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      dash: '6,4',
    };
  }
  if (key === 'RELATED') {
    return {
      label: 'İlişkili Kavram',
      stroke: '#d97706',
      fill: '#fffbeb',
      border: '#f59e0b',
      dot: '#d97706',
      badge: 'bg-amber-50 text-amber-800 border-amber-300',
      dash: '3,4',
    };
  }
  return {
    label: 'Kavram Kelimesi',
    stroke: '#0284c7',
    fill: '#ffffff',
    border: '#7dd3fc',
    dot: '#0284c7',
    badge: 'bg-sky-50 text-sky-800 border-sky-300',
    dash: undefined,
  };
}

export function ConceptGraphCanvas({
  data,
  rootLabel,
  conceptId,
  standalone = false,
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

  if (!data || !data.nodes || data.nodes.length === 0) return null;

  const rootNode = useMemo(
    () => data.nodes.find((n) => n.data.nodeType === 'ROOT') || data.nodes[0],
    [data.nodes],
  );

  const activeConceptId = conceptId || rootNode.data.id;

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
    const width = 1120;
    const height = 740;
    const cx = width / 2;
    const cy = height / 2;
    const pos = new Map<string, { x: number; y: number; w: number; h: number }>();
    pos.set(rootNode.data.id, { x: cx, y: cy, w: 214, h: 64 });

    const r1 = satellites.slice(0, 10);
    const r2 = satellites.slice(10, 26);
    const r3 = satellites.slice(26);

    const place = (list: typeof satellites, rx: number, ry: number, offset: number) => {
      list.forEach((n, i) => {
        const a = offset + (i / Math.max(1, list.length)) * 2 * Math.PI - Math.PI / 2;
        pos.set(n.data.id, { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), w: 164, h: 48 });
      });
    };

    place(r1, 250, 185, 0);
    const step = r1.length > 0 ? Math.PI / r1.length : 0.25;
    place(r2, 445, 305, step);
    place(r3, 580, 385, step * 0.5);

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

  const matchingConcepts = useMemo(() => {
    const q = conceptJump.trim().toLowerCase();
    if (!q || availableConcepts.length === 0) return [];
    return availableConcepts
      .filter((c) => c.labelTr.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
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

  const rootParsed = parseNodeLabel(rootLabel || rootNode.data.label || rootNode.data.id, rootNode.data.id);

  return (
    <section
      aria-label="Kavram İlişki Ağı"
      className={
        standalone
          ? 'flex min-h-[calc(100vh-115px)] flex-col bg-white text-slate-900'
          : 'rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm overflow-hidden'
      }
    >
      {/* Aydınlık Üst Araç Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3.5">
        <div className="flex items-center gap-3">
          {standalone && (
            <Link
              href={`/kavram/${encodeURIComponent(activeConceptId)}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kavram Detayı
            </Link>
          )}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
            <Network className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 capitalize">{rootParsed.primary}</h2>
              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600">
                {activeConceptId}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {satellites.length + 1} düğüm · {satellites.length} bağlantı
            </p>
          </div>
        </div>

        {/* Bağımsız Sayfada Başka Kavrama Geçiş Kutusu */}
        {standalone && availableConcepts.length > 0 && (
          <div className="relative w-full sm:w-64">
            <GitBranch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              value={conceptJump}
              onChange={(e) => setConceptJump(e.target.value)}
              placeholder="Başka bir kavrama geç (örn. su, kalp)..."
              className="h-9 w-full rounded-xl border border-slate-300 bg-slate-50 pl-8 pr-7 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
            {conceptJump && (
              <button type="button" onClick={() => setConceptJump('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
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
                      router.push(`/kavram/${encodeURIComponent(c.id)}/ag`);
                    }}
                    className="flex w-full items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-indigo-50"
                  >
                    <span className="font-semibold text-slate-900 capitalize">{c.labelTr}</span>
                    <span className="font-mono text-[10px] text-slate-400">{c.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ağ içi düğüm arama */}
        <div className="relative w-full sm:w-48">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={nodeSearch}
            onChange={(e) => setNodeSearch(e.target.value)}
            placeholder="Ağ içinde filtrele..."
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
          />
          {nodeSearch && (
            <button type="button" onClick={() => setNodeSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* İlişki Filtreleri */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => setRelFilter('ALL')}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${relFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            Tümü ({counts.ALL})
          </button>
          {counts.CHILD > 0 && (
            <button type="button" onClick={() => setRelFilter('CHILD')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${relFilter === 'CHILD' ? 'bg-sky-600 text-white' : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'}`}>
              <span className="h-2 w-2 rounded-full bg-sky-500" /> Kelimeler ({counts.CHILD})
            </button>
          )}
          {counts.ROOT > 0 && (
            <button type="button" onClick={() => setRelFilter('ROOT')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${relFilter === 'ROOT' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'}`}>
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Kök ({counts.ROOT})
            </button>
          )}
          {counts.RELATED > 0 && (
            <button type="button" onClick={() => setRelFilter('RELATED')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${relFilter === 'RELATED' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'}`}>
              <span className="h-2 w-2 rounded-full bg-amber-500" /> İlişkili ({counts.RELATED})
            </button>
          )}
        </div>

        {/* Zoom + Tam Sayfa Aç */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button type="button" onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))} className="rounded-lg p-1 text-slate-600 hover:bg-white hover:text-slate-900" aria-label="Uzaklaştır">
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[42px] text-center font-mono text-[11px] font-semibold text-slate-700">
              {Math.round(zoom * 100)}%
            </span>
            <button type="button" onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.15).toFixed(2))))} className="rounded-lg p-1 text-slate-600 hover:bg-white hover:text-slate-900" aria-label="Yakınlaştır">
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedId(null); }} className="rounded-lg p-1 text-slate-600 hover:bg-white hover:text-slate-900" aria-label="Sıfırla">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {!standalone && (
            <Link
              href={`/kavram/${encodeURIComponent(activeConceptId)}/ag`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Bağımsız Tam Sayfa Aç
            </Link>
          )}
        </div>
      </div>

      {/* Ana Aydınlık Tuval ve Sağ Detay Paneli */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${standalone ? 'flex-1' : ''}`}>
        <div className="lg:col-span-9 relative bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]">
          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            className={`${standalone ? 'h-[660px] lg:h-full min-h-[620px]' : 'h-[520px] sm:h-[580px]'} w-full cursor-grab active:cursor-grabbing select-none`}
          >
            <defs>
              <marker id="arr-child-light" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
              </marker>
              <marker id="arr-root-light" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
              </marker>
              <marker id="arr-rel-light" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
              </marker>
              <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="125%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.08" />
              </filter>
            </defs>

            <g transform={`translate(${layout.cx + pan.x}, ${layout.cy + pan.y}) scale(${zoom}) translate(${-layout.cx}, ${-layout.cy})`}>
              {/* Açık Gri Yörünge Rehberleri */}
              <ellipse cx={layout.cx} cy={layout.cy} rx={250} ry={185} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5,6" />
              {satellites.length > 10 && (
                <ellipse cx={layout.cx} cy={layout.cy} rx={445} ry={305} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5,6" />
              )}

              {/* Net Görünür Kavisli Bağlantı Okları */}
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

                const sx = rp.x + ux * 102;
                const sy = rp.y + uy * 30;
                const tx = tp.x - ux * 82;
                const ty = tp.y - uy * 24;
                const mx = (sx + tx) / 2 - uy * 14;
                const my = (sy + ty) / 2 + ux * 14;

                const isHighlighted = focusId === node.data.id;
                const isDimmed = Boolean(focusId && focusId !== rootNode.data.id && !isHighlighted);
                const marker = rel === 'ROOT' ? 'url(#arr-root-light)' : rel === 'RELATED' ? 'url(#arr-rel-light)' : 'url(#arr-child-light)';

                return (
                  <path
                    key={`edge-${node.data.id}`}
                    d={`M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`}
                    fill="none"
                    stroke={theme.stroke}
                    strokeWidth={isHighlighted ? 2.8 : 1.7}
                    strokeOpacity={isDimmed ? 0.25 : isHighlighted ? 1 : 0.72}
                    strokeDasharray={theme.dash}
                    markerEnd={marker}
                  />
                );
              })}

              {/* Yüksek Kontrastlı Uydu Düğüm Kartları */}
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
                    style={{ opacity: isDim ? 0.45 : 1 }}
                    filter="url(#card-shadow)"
                    className="cursor-pointer transition-opacity duration-150"
                  >
                    <rect
                      x={-p.w / 2}
                      y={-p.h / 2}
                      width={p.w}
                      height={p.h}
                      rx={12}
                      fill={isSel ? '#eff6ff' : theme.fill}
                      stroke={isSel || isHov ? '#1d4ed8' : theme.border}
                      strokeWidth={isSel ? 2.5 : 1.6}
                    />
                    <circle cx={-p.w / 2 + 13} cy={parsed.secondary ? -5 : 0} r={4.5} fill={theme.dot} />
                    <text x={-p.w / 2 + 24} y={parsed.secondary ? -1 : 4} fill="#0f172a" fontSize="13" fontWeight="700" textAnchor="start">
                      {clip(parsed.primary, 16)}
                    </text>
                    {parsed.secondary && (
                      <text x={-p.w / 2 + 24} y={14} fill="#475569" fontSize="11" fontWeight="500" textAnchor="start">
                        {clip(parsed.secondary, 19)}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Merkez Kök Kavram Kartı */}
              <g data-node="true" transform={`translate(${layout.cx}, ${layout.cy})`} onClick={() => setSelectedId(null)} filter="url(#card-shadow)" className="cursor-pointer">
                <rect x={-107} y={-32} width={214} height={64} rx={16} fill="#1d4ed8" stroke="#1e40af" strokeWidth={2} />
                <text x={0} y={rootParsed.secondary ? -4 : 5} fill="#ffffff" fontSize="15" fontWeight="800" textAnchor="middle" className="capitalize">
                  {clip(rootParsed.primary, 20)}
                </text>
                {rootParsed.secondary && (
                  <text x={0} y={16} fill="#dbeafe" fontSize="11.5" fontWeight="500" textAnchor="middle">
                    {clip(rootParsed.secondary, 24)}
                  </text>
                )}
              </g>
            </g>
          </svg>
        </div>

        {/* Sağ Aydınlık İnceleme Paneli */}
        <aside className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white p-5 flex flex-col justify-between">
          {selectedDetail ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${getRelTheme(selectedDetail.rel).badge}`}>
                  {getRelTheme(selectedDetail.rel).label}
                </span>
                {selectedDetail.dialect && (
                  <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700">
                    {selectedDetail.dialect}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedDetail.parsed.primary}</h3>
                {selectedDetail.parsed.secondary && (
                  <p className="mt-1 text-sm font-medium text-slate-600">{selectedDetail.parsed.secondary}</p>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600 space-y-1.5">
                <div>Merkez Kavram: <strong className="text-slate-900 capitalize">{rootParsed.primary}</strong></div>
                <div>Düğüm Kimliği: <code className="font-mono text-indigo-700">{selectedDetail.id}</code></div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {selectedDetail.rel === 'RELATED' ? (
                  <Link
                    href={`/kavram/${encodeURIComponent(selectedDetail.id)}/ag`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors"
                  >
                    <GitBranch className="h-4 w-4" />
                    Bu Kavramın Ağına Geç
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    href={`/sozluk?q=${encodeURIComponent(selectedDetail.id)}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
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
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700">Merkez Kavram</h3>
                <p className="mt-1 text-lg font-bold text-slate-900 capitalize">{rootParsed.primary}</p>
                {rootParsed.secondary && <p className="text-xs text-slate-600">{rootParsed.secondary}</p>}
              </div>

              <p className="text-xs leading-relaxed text-slate-600">
                Soldaki tuval üzerinde herhangi bir kelime veya kavram kartına tıklayarak Türkçe karşılığını, lehçe bilgisini ve 35 sözlükteki arama bağlantısını burada açabilirsiniz.
              </p>

              <div className="space-y-2 border-t border-slate-200 pt-3 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Kavram Kelimeleri ({counts.CHILD})</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Aynı Kök / Kelime Ailesi ({counts.ROOT})</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> İlişkili Kavram Ağları ({counts.RELATED})</div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
