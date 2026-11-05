"use client";
import { useState, useMemo } from 'react';
import { layoutEngine, LayoutType, GraphNode, GraphLink } from '@/domain/analytics/services/SvgLayoutEngineService';

// GERCEK SOZLUK - burayi data/dictionary.json'dan da doldurabilirsin
const DICTIONARY = [
  { id: '1', ad: 'шы', tr: 'kedi', translit: 'psı' },
  { id: '2', ad: 'чъэтыу', tr: 'kedi', translit: 'çetıv' },
  { id: '3', ad: 'хьэ', tr: 'köpek', translit: 'he' },
  { id: '4', ad: 'унэ', tr: 'ev', translit: 'wıne' },
  { id: '5', ad: 'псы', tr: 'su', translit: 'psı' },
  { id: '6', ad: 'машIо', tr: 'ateş', translit: 'maşo' },
  { id: '7', ad: 'тыгъэ', tr: 'güneş', translit: 'tıge' },
  { id: '8', ad: 'чъыг', tr: 'ağaç', translit: 'çıg' },
  { id: '9', ad: 'мэз', tr: 'orman', translit: 'mez' },
  { id: '10', ad: 'къалэ', tr: 'şehir', translit: 'kale' },
  { id: '11', ad: 'кIалэ', tr: 'çocuk', translit: 'çale' },
  { id: '12', ad: 'пшъашъэ', tr: 'kız', translit: 'pşaşe' },
];

const trToAdMap: Record<string, string[]> = {
  kedi: ['шы', 'чъэтыу'],
  köpek: ['хьэ'],
  ev: ['унэ'],
  su: ['псы'],
  ateş: ['машIо'],
  güneş: ['тыгъэ'],
};

function normalizeQuery(q: string): string[] {
  const clean = q.trim().toLowerCase();
  if (!clean) return [];
  if (trToAdMap[clean]) return [clean, ...trToAdMap[clean]];
  return [clean];
}

export function NetworkExplorerPage() {
  const [query, setQuery] = useState('шы');
  const [layout, setLayout] = useState<LayoutType>('GRID');

  // ARAMA - gercek filtre
  const { nodes, links } = useMemo(() => {
    const queries = normalizeQuery(query);
    if (queries.length === 0) return { nodes: [] as GraphNode[], links: [] as GraphLink[] };

    const results = DICTIONARY.filter(d =>
      queries.some(q => d.tr.toLowerCase() === q || d.ad.toLowerCase() === q || d.translit.toLowerCase() === q || d.tr.toLowerCase().includes(q) || d.ad.toLowerCase().includes(q))
    ).slice(0, 8);

    // Merkez node = aradigin kelime
    const centerId = 'center';
    const n: GraphNode[] = [
      { id: centerId, label: query, lang: 'tr' },
      ...results.map(r => ({ id: r.id, label: r.ad, trLabel: r.tr, lang: 'ad' as const }))
    ];
    const l: GraphLink[] = results.map(r => ({ source: centerId, target: r.id }));
    return { nodes: n, links: l };
  }, [query]);

  // LAYOUT - her degistiginde yeniden hesapla
  const positioned = useMemo(() => {
    if (nodes.length === 0) return [];
    return layoutEngine.getLayout([...nodes], [...links], layout, 900, 460);
  }, [nodes, links, layout]);

  return (
    <div className="p-4 bg-[#f8f7ff] min-h-screen">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') setQuery(e.currentTarget.value); }}
          placeholder="Ara: kedi, köpek, ev, su..."
          className="px-3 py-2 border rounded-lg w-[240px]"
        />
        <button onClick={() => setQuery(query)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Ara</button>
        <span className="ml-6 self-center">Düzen:</span>
        {(['CIRCULAR','GRID','FORCE'] as LayoutType[]).map(t => (
          <button
            key={t}
            onClick={() => setLayout(t)}
            className={`px-3 py-2 rounded-lg border ${layout===t ? 'bg-purple-600 text-white' : 'bg-white'}`}
          >{t}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border p-2">
        <svg viewBox="0 0 900 460" className="w-full h-[460px]">
          {links.map((link, i) => {
            const s = positioned.find(n => n.id === (typeof link.source === 'string' ? link.source : (link.source as any).id)) || positioned.find(n => n.id === 'center');
            const tgt = positioned.find(n => n.id === (typeof link.target === 'string' ? link.target : (link.target as any).id));
            if (!s || !tgt) return null;
            return <line key={i} x1={s.x} y1={s.y} x2={tgt.x} y2={tgt.y} stroke="#c4b5fd" strokeWidth={1.5} />;
          })}
          {positioned.map(n => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={n.id==='center'?28:22} fill={n.id==='center' ? '#111827' : '#4f46e5'} stroke="white" strokeWidth={2} />
              <text x={n.x} y={n.y!+5} textAnchor="middle" fill="white" fontSize="11" fontWeight={600}>{n.label}</text>
              {n.trLabel && <text x={n.x} y={n.y!+28} textAnchor="middle" fill="#6b7280" fontSize="10">{n.trLabel}</text>}
            </g>
          ))}
        </svg>
        <div className="text-xs text-gray-500 mt-1">{positioned.length} node - SvgLayoutEngineService deterministik - Layout: {layout} - Query: {query}</div>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        Deneyin: <button onClick={()=>setQuery('kedi')} className="underline">kedi</button> | <button onClick={()=>setQuery('köpek')} className="underline">köpek</button> | <button onClick={()=>setQuery('ev')} className="underline">ev</button> | <button onClick={()=>setQuery('su')} className="underline">su</button> | <button onClick={()=>setQuery('шы')} className="underline">шы</button>
      </div>
    </div>
  );
}
