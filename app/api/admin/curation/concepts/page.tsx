// app/admin/curation/concepts/page.tsx - STYLISH
'use client';
import { useEffect, useState } from 'react';
type Entry = { target: string | null; circassianCandidates: string[]; confidence: string; review: boolean; verdict?: string; };
export default function ConceptsPage() {
  const [data, setData] = useState<Record<string, Entry>>({});
  const [current, setCurrent] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, 'approved'|'changed'|'skipped'>>({});
  useEffect(() => { fetch('/api/curation/concepts').then(r => r.json()).then(d => { setData(d); const f = Object.keys(d).filter(k=>!k.startsWith('_'))[0]; setCurrent(f||null); }); }, []);
  async function decide(a: 'approved'|'changed'|'skipped') {
    if (!current) return;
    await fetch('/api/curation/concepts/decide', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ concept: current, action: a, target: data[current].target }) });
    setDone(s => ({ ...s, [current]: a })); const keys = Object.keys(data).filter(k=>!k.startsWith('_')); const nxt = keys.find(k=>!(k in done) && k!==current); setCurrent(nxt||null);
  }
  const e = current ? data[current] : null; const rem = Object.keys(data).filter(k=>!k.startsWith('_') && !(k in done)).length; const total = Object.keys(data).filter(k=>!k.startsWith('_')).length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex">
        <div className="w-64 bg-slate-900 text-white min-h-screen p-6 space-y-6">
          <div className="flex items-center gap-3"><div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold">Ç</div><span className="font-semibold">Çerkesçe Admin</span></div>
          <nav className="space-y-2 text-sm"><a href="/admin/curation" className="block px-3 py-2 hover:bg-slate-800 rounded-lg text-slate-400">Lexeme Düzenleyici</a><a href="/admin/curation/concepts" className="block px-3 py-2 bg-slate-800 rounded-lg">Kavram Inceleme</a></nav>
          <div className="pt-6 border-t border-slate-800"><div className="text-xs text-slate-400 mb-2">{rem} / {total} kaldi</div><div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-violet-500 h-2 rounded-full" style={{width: `${((total-rem)/total*100)||0}%`}}></div></div></div>
        </div>
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center"><h1 className="font-bold">Kavramlar</h1><span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{rem} kaldi</span></div>
              <ul className="divide-y max-h-[75vh] overflow-auto">
                {Object.entries(data).filter(([k])=>!k.startsWith('_')).map(([k,v])=>(
                  <li key={k} onClick={()=>setCurrent(k)} className={`px-4 py-3 cursor-pointer flex justify-between items-center ${k===current?'bg-violet-50 border-l-4 border-l-violet-500':'hover:bg-slate-50'}`}>
                    <span className="font-medium">{k} {done[k] && <span className="text-green-600 text-xs">✓{done[k]}</span>}</span>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${v.confidence==='HIGH'?'bg-green-100 text-green-700':v.confidence==='MEDIUM'?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}`}>{v.confidence}{v.review?' 🔍':''}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>{e && current && (
              <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
                <div className="text-center space-y-3 py-6">
                  <p className="text-3xl font-bold tracking-tight">{current}</p>
                  <p className="text-slate-300">↓</p>
                  <p className="text-xl text-slate-700 font-medium">{e.target ?? '❓ hedef yok'}</p>
                  <p className="text-slate-300">↓</p>
                  <p className="text-2xl font-mono bg-slate-50 px-4 py-2 rounded-xl inline-block">{e.circassianCandidates.join(' / ')||'—'}</p>
                  <div className="flex justify-center gap-2 pt-2"><span className={`text-xs px-3 py-1 rounded-full ${e.confidence==='HIGH'?'bg-green-100 text-green-700':'bg-yellow-100'}`}>{e.confidence}</span>{e.review && <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">review</span>}</div>
                </div>
                {e.verdict==='BROKEN_ALIGNMENT' && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">⚠ BROKEN_ALIGNMENT — migration'a gitmez</div>}
                <div className="flex gap-3 justify-center pt-4"><button onClick={()=>decide('approved')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition">Onayla</button><button onClick={()=>decide('changed')} className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition">Degistir</button><button onClick={()=>decide('skipped')} className="border px-6 py-3 rounded-xl hover:bg-slate-50 transition">Atla</button></div>
              </div>
            )}</div>
          </div>
        </div>
      </div>
    </div>
  );
}