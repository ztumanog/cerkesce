'use client';
import { useEffect, useState } from 'react';
type Entry = { target: string | null; circassianCandidates: string[]; confidence: string; review: boolean; verdict?: string; };
export default function ConceptsPage() {
  const [data, setData] = useState<Record<string, Entry>>({});
  const [current, setCurrent] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, 'approved'|'changed'|'skipped'>>({});
  useEffect(() => { fetch('/api/curation/concepts').then(r => r.json()).then(d => { setData(d); const first = Object.keys(d).filter(k=>!k.startsWith('_'))[0]; setCurrent(first||null); }); }, []);
  async function decide(action: 'approved'|'changed'|'skipped') {
    if (!current) return;
    await fetch('/api/curation/concepts/decide', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ concept: current, action, target: data[current].target }) });
    setDone(d => ({ ...d, [current]: action })); const keys = Object.keys(data).filter(k=>!k.startsWith('_')); const next = keys.find(k=>!(k in done) && k!==current); setCurrent(next||null);
  }
  const e = current ? data[current] : null; const remaining = Object.keys(data).filter(k=>!k.startsWith('_') && !(k in done)).length;
  return (
    <div className="p-6 grid grid-cols-2 gap-6 max-w-6xl mx-auto">
      <div><h1 className="text-xl font-bold mb-2">Kavram İnceleme <span className="text-gray-500">({remaining} kaldı)</span></h1>
        <ul className="border rounded divide-y max-h-[70vh] overflow-auto">
          {Object.entries(data).filter(([k])=>!k.startsWith('_')).map(([k,v])=>(
            <li key={k} onClick={()=>setCurrent(k)} className={`px-3 py-2 cursor-pointer ${k===current?'bg-blue-100':'hover:bg-gray-100'}`}>{k} {done[k] && <span className="text-green-600">✓{done[k]}</span>} <span className="text-xs ml-2">{v.confidence}{v.review&&' 🔍'}</span></li>
          ))}
        </ul></div>
      <div>{e && current && (
        <div className="border rounded p-4 space-y-3 bg-white">
          <div className="text-center space-y-1"><p className="text-2xl font-bold">{current}</p><p className="text-gray-400">↓</p><p className="text-xl">{e.target??'❓'}</p><p className="text-gray-400">↓</p><p className="text-lg font-mono">{e.circassianCandidates.join(' / ')||'—'}</p></div>
          <div className="flex gap-2 justify-center pt-2"><button onClick={()=>decide('approved')} className="bg-green-600 text-white px-4 py-2 rounded">Onayla</button><button onClick={()=>decide('changed')} className="bg-blue-600 text-white px-4 py-2 rounded">Değiştir</button><button onClick={()=>decide('skipped')} className="border px-4 py-2 rounded">Atla</button></div>
        </div>
      )}</div>
    </div>
  );
}
