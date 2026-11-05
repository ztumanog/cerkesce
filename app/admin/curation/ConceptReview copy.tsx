'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  Search, Check, Pencil, SkipForward, AlertTriangle, Loader2, Info, X, ListChecks, Database, Layers
} from 'lucide-react';

type Action = 'approved' | 'changed' | 'skipped';
type Entry = {
  target: string | null;
  circassianCandidates: string[];
  confidence: string;
  review: boolean;
  verdict?: string;
  reason?: string;
  decision?: Action;
  // KANONİK ek alanlar lexemes.json'dan
  lexemeId?: string;
  wordFamilyId?: string;
  rootIds?: string[];
  trMeaning?: string;
};

const EDITOR_KEY = 'curation-editor';
const inputCls = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-900/20 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';
const labelCls = 'mb-1.5 block text- font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400';

function splitList(s: string): string[] { return s.split(/[\/,;|]/).map(x=>x.trim()).filter(Boolean); }
function toList(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string' && x.trim() !== '').map(x=>x.trim());
  if (typeof v === 'string') return splitList(v);
  return [];
}
function normalizeData(d: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(d)) {
    out[k] = k.startsWith('_') || !v || typeof v !== 'object' ? v : { ...v, circassianCandidates: toList(v.circassianCandidates) };
  }
  return out;
}
function confidenceClass(c: string) {
  if (c === 'HIGH') return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300';
  if (c === 'MEDIUM') return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300';
  return 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300';
}
function matchesConcept(key: string, entry: Entry, q: string): boolean {
  if (!q) return true;
  const hay = [key, entry.target ?? '', ...entry.circassianCandidates, entry.wordFamilyId ?? '', (entry.rootIds??[]).join(' '), entry.trMeaning ?? ''].join(' ').toLocaleLowerCase('tr');
  return hay.includes(q);
}

type Props = { search?: string; onPendingChange?: (n: number) => void };

export default function ConceptReview({ search = '', onPendingChange }: Props) {
  const [data, setData] = useState<Record<string, Entry>>({});
  const [current, setCurrent] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, Action>>({});
  const [draft, setDraft] = useState('');
  const [editor, setEditor] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yuklemeHatasi, setYuklemeHatasi] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    let iptal = false;
    setEditor(localStorage.getItem(EDITOR_KEY) ?? '');
    fetch('/api/curation/concepts').then(r=>{ if(!r.ok) throw new Error(`Veri alınamadı (${r.status})`); return r.json(); })
      .then(d=>{ if(iptal) return; const nd=normalizeData(d); setData(nd); const prev: Record<string, Action>={}; Object.entries(nd).forEach(([k,v])=>{ if(!k.startsWith('_')&&v?.decision) prev[k]=v.decision; }); setDone(prev); })
      .catch(err=>{ if(!iptal) setYuklemeHatasi(err instanceof Error?err.message:'Bilinmeyen hata'); })
      .finally(()=>{ if(!iptal) setYukleniyor(false); });
    return ()=>{ iptal=true; };
  },[]);

  const q = (search || localSearch).trim().toLocaleLowerCase('tr');
  const keys = useMemo(()=>Object.keys(data).filter(k=>!k.startsWith('_')),[data]);
  const visible = useMemo(()=>keys.filter(k=>done[k]!=='approved'&&done[k]!=='changed').filter(k=>matchesConcept(k,data[k],q)),[keys,done,data,q]);
  const pending = useMemo(()=>keys.filter(k=>!(k in done)),[keys,done]);
  const stats = useMemo(()=>{ const s={approved:0,changed:0,skipped:0}; for(const k of keys){ const a=done[k]; if(a==='approved') s.approved+=1; else if(a==='changed') s.changed+=1; else if(a==='skipped') s.skipped+=1; } return s; },[keys,done]);
  const entry = current ? data[current] : null;
  const draftList = useMemo(()=>splitList(draft),[draft]);
  const hasCandidates = !!entry && entry.circassianCandidates.length>0;
  const draftDegisti = !!entry && draftList.join(' / ') !== entry.circassianCandidates.join(' / ');

  useEffect(()=>{ onPendingChange?.(pending.length); },[pending.length]);
  useEffect(()=>{ if(!current||!visible.includes(current)) setCurrent(visible[0]??null); },[data,done,q]);
  useEffect(()=>{ if(!current||!data[current]) return; setDraft(data[current].circassianCandidates.join(' / ')); setReason(''); setError(null); },[current,data]);

  async function decide(action: Action) {
    if(!current||!entry||busy) return;
    const key=current; const candidates=splitList(draft);
    if(action==='approved'&&entry.circassianCandidates.length===0){ setError('Karşılığı olmayan kayıt onaylanamaz. Değiştir ile girin.'); return; }
    if(action==='changed'&&candidates.length===0){ setError('Değiştir için en az bir karşılık girin.'); return; }
    if(action!=='skipped'){ if(!editor.trim()||!reason.trim()){ setError('Editör ve sebep zorunlu.'); return; } localStorage.setItem(EDITOR_KEY,editor.trim()); }
    setBusy(true); setError(null);
    try{
      const res=await fetch('/api/curation/concepts/decide',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({concept:key,action,target:action==='changed'?candidates.join(' / '):entry.target,editor:editor.trim(),reason:reason.trim()})});
      const json=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(`Kayıt başarısız (${res.status}): ${json.error??'Bilinmeyen hata'}`);
      const next=pending.find(k=>k!==key)??null;
      setData(d=>({...d,[key]:{...d[key],circassianCandidates:action==='changed'?candidates:d[key].circassianCandidates,decision:action}}));
      setDone(d=>({...d,[key]:action}));
      setCurrent(next);
    }catch(err){ setError(err instanceof Error?err.message:'Bilinmeyen hata'); }finally{ setBusy(false); }
  }

  const kartlar=[
    {etiket:'Kalan',deger:pending.length,renk:'text-slate-900 dark:text-slate-100'},
    {etiket:'Onaylanan',deger:stats.approved,renk:'text-emerald-700'},
    {etiket:'Değiştirilen',deger:stats.changed,renk:'text-blue-700'},
    {etiket:'Atlanan',deger:stats.skipped,renk:'text-slate-600'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 p-4 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100 md:p-6">
      <header className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2"><span className="rounded-lg bg-slate-900 p-1.5 text-white dark:bg-slate-100 dark:text-slate-900"><ListChecks className="h-4 w-4"/></span><h1 className="text-xl font-extrabold tracking-tight">Kavram İnceleme - Kanonik</h1></div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Sadece <b>lexemes.json</b> kanonik kaynak. <b>Root, Family, TR Anlam, Lexeme, Yeni Concept, Durum, Not</b> sırası.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kartlar.map(c=><div key={c.etiket} className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/60"><div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{c.etiket}</div><div className={`mt-0.5 text-lg font-extrabold tabular-nums ${c.renk}`}>{c.deger.toLocaleString('tr-TR')}</div></div>)}
        </div>
      </header>

      {yukleniyor&&<div className="mb-3 flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs text-slate-600 shadow-sm"><Loader2 className="h-3.5 w-3.5 animate-spin"/>Yükleniyor...</div>}
      {yuklemeHatasi&&<div className="mb-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0"/>{yuklemeHatasi}</div>}

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b p-3"><div className="relative"><Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"/><input value={localSearch} onChange={ev=>setLocalSearch(ev.target.value)} placeholder="Kavram, WF, root, TR ara..." className={`${inputCls} py-2 pl-8 text-xs`}/></div></div>
          <ul className="max-h- divide-y overflow-auto">
            {visible.length===0&&!yukleniyor&&<li className="p-8 text-center text-xs text-slate-400">Eşleşen kavram yok.</li>}
            {visible.map(k=>{
              const v=data[k]; const cands=v.circassianCandidates; const hasC=cands.length>0; const secili=k===current; const atlandi=done[k]==='skipped';
              return (
                <li key={k}>
                  <button type="button" onClick={()=>setCurrent(k)} className={`flex w-full items-center gap-3 border-l-4 px-4 py-2.5 text-left transition ${secili?'border-slate-900 bg-slate-50 dark:border-white dark:bg-slate-800':'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/70'} ${atlandi?'opacity-60':''}`}>
                    <div className="flex min-w-0 flex-col">
                      <span className={`truncate font-mono text-sm font-bold ${hasC?'text-slate-900 dark:text-slate-100':'text-rose-700'}`}>{hasC?cands.join(' / '):k}</span>
                      <span className="truncate text-xs text-slate-500">{k} {v.wordFamilyId?`· ${v.wordFamilyId}`:''} {v.rootIds?.length?`· ${v.rootIds.join(',')}`:''}</span>
                    </div>
                    <div className="ml-auto flex shrink-0 items-center gap-1.5">
                      {atlandi&&<span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-600">atlandı</span>}
                      {!hasC&&<span className="rounded-md bg-rose-100 px-1.5 py-0.5 text-xs font-semibold text-rose-700">karşılık yok</span>}
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${confidenceClass(v.confidence)}`}>{v.confidence}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="lg:sticky lg:top-6 lg:self-start">
          {entry&&current?(
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Kavram</p>
                <h2 className="mt-1 font-mono text-2xl font-extrabold">{current}</h2>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border bg-indigo-50/50 p-2.5"><div className="text- font-bold uppercase text-indigo-700">Root (Root IDs)</div><div className="mt-1 font-mono font-bold">{entry.rootIds?.join(', ')||'—'}</div></div>
                  <div className="rounded-xl border bg-purple-50/50 p-2.5"><div className="text- font-bold uppercase text-purple-700">Family (WF ID)</div><div className="mt-1 font-mono font-bold">{entry.wordFamilyId||'—'}</div></div>
                  <div className="rounded-xl border bg-emerald-50/50 p-2.5 col-span-2"><div className="text- font-bold uppercase text-emerald-700">TR Anlam (lexeme)</div><div className="mt-1 font-medium">{entry.trMeaning||entry.target||'—'}</div></div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold text-slate-700">{entry.target??'—'}</span>
                  <span className="text-slate-400">→</span>
                  {hasCandidates?entry.circassianCandidates.map(c=><span key={c} className="rounded-md bg-emerald-50 px-2 py-1 font-mono text-xs font-semibold text-emerald-800">{c}</span>):<span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">Çerkesçe karşılık yok</span>}
                </div>
              </div>

              <div>
                <label className={labelCls}>Çerkesçe karşılık (/ ile ayırın) — Lexeme (Kelime + ID)</label>
                <input className={`${inputCls} font-mono`} value={draft} onChange={ev=>setDraft(ev.target.value)} placeholder="бэгъон / ..."/>
                {draftList.length>0&&<div className="mt-2 flex flex-wrap gap-1.5">{draftList.map((c,i)=><span key={`${c}-${i}`} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">{c}</span>)}</div>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={labelCls}>Yeni Concept</label><input className={inputCls} value={entry.target??''} readOnly placeholder="Mevcut kavram"/></div>
                <div><label className={labelCls}>TR Anlam (Kavram) — Mevcut Tanım</label><input className={inputCls} value={current} readOnly/></div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={labelCls}>Editör *</label><input className={inputCls} value={editor} onChange={ev=>setEditor(ev.target.value)} placeholder="Kim işlem yapıyor"/></div>
                <div><label className={labelCls}>Sebep * — Not</label><input className={inputCls} value={reason} onChange={ev=>setReason(ev.target.value)} placeholder="Neden bu değişiklik"/></div>
              </div>

              {error&&<div className="flex items-start justify-between gap-2 break-words rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"><span className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0"/>{error}</span><button onClick={()=>setError(null)}><X className="h-4 w-4"/></button></div>}

              <div className="flex flex-wrap items-center gap-3 border-t pt-4">
                <button onClick={()=>decide('approved')} disabled={busy||!hasCandidates} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-40"><Check className="h-4 w-4"/>Onayla</button>
                <button onClick={()=>decide('changed')} disabled={busy||draftList.length===0} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 disabled:opacity-40"><Pencil className="h-4 w-4"/>Değiştir ve kaydet</button>
                <button onClick={()=>decide('skipped')} disabled={busy} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"><SkipForward className="h-4 w-4"/>Atla</button>
                {busy&&<Loader2 className="h-4 w-4 animate-spin text-slate-400"/>}
              </div>

              <div className="flex items-center gap-2 text- text-slate-400"><Database className="h-3 w-3"/><span>Kanonic: lexemes.json — Root, Family, TR Anlam, Lexeme, Yeni Concept, Durum, Not sırası korundu</span></div>
            </div>
          ):(
            <div className="flex flex-col items-center gap-2 rounded-2xl border bg-white p-10 text-center shadow-sm"><span className="rounded-full bg-emerald-100 p-2 text-emerald-700"><Check className="h-5 w-5"/></span><p className="text-sm font-semibold">Bu listede incelenecek kavram kalmadı.</p><p className="text-xs text-slate-400">Aramayı temizleyerek tüm kavramları yeniden görebilirsiniz.</p></div>
          )}
        </section>
      </div>
    </div>
  );
}