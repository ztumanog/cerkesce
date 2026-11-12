"use client";

import { useEffect, useState, useMemo } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type Lexeme = { id: string; _revision: string; [key: string]: any };

function text(v: any): string { if (v===undefined||v===null) return ''; return typeof v==='string'? v : JSON.stringify(v); }
function isObject(v:any){ return v!==null && typeof v==='object' && !Array.isArray(v); }
function concept(l:Lexeme){ return typeof l.conceptId==='string'? l.conceptId : ''; }

function dialectLabel(d:any){
  const s = typeof d==='string'? d.toLowerCase() : '';
  if (s.includes('kbd')||s.includes('kabard')||s==='kab'||s.includes('къэбэр')) return { label:'KBD — Kabardey', isKbd:true, isAdy:false, isUnknown:false, color:'#14b8a6', bg:'#ccfbf1', border:'#2dd4bf' };
  if (s.includes('ady')||s.includes('adig')||s.includes('адыг')||s.includes('bjed')||s.includes('shapsug')||s.includes('abzakh')) return { label:`ADY — Adığce (${text(d)})`, isKbd:false, isAdy:true, isUnknown:false, color:'#6366f1', bg:'#e0e7ff', border:'#818cf8' };
  if (!s) return { label:'Lehçe bilinmiyor', isKbd:false, isAdy:false, isUnknown:true, color:'#94a3b8', bg:'#f1f5f9', border:'#cbd5e1' };
  return { label:`Lehçe: ${text(d)}`, isKbd:false, isAdy:false, isUnknown:false, color:'#64748b', bg:'#f8fafc', border:'#e2e8f0' };
}
function sortKbdFirst(a:Lexeme,b:Lexeme){ const da=dialectLabel(a.dialect); const db=dialectLabel(b.dialect); if(da.isKbd&&!db.isKbd) return -1; if(!da.isKbd&&db.isKbd) return 1; return 0; }

const scalarFields: [string,string][] = [
  ['form','Form (orijinal)'], ['ipa','IPA (yalnızca l.ipa varsa)'], ['literalMeaning','Literal'], ['meaning','Anlam'], ['partOfSpeech','POS'], ['conceptId','Kavram ID'], ['dialect','Lehçe'], ['notes','Notlar']
];
const languageFields: [string,string][] = [['tr','Türkçe'],['en','İngilizce'],['ru','Rusça'],['ar','Arapça']];

function isValidConceptFormat(id: string) { return /^[A-Z][A-Z0-9_]*$/.test(id); }

export default function ConceptsGraphPage() {
  const [rows,setRows]=useState<Lexeme[]>([]);
  const [current,setCurrent]=useState<string|null>(null);
  const [q,setQ]=useState(''); const [loading,setLoading]=useState(true); const [busy,setBusy]=useState(false);
  const [error,setError]=useState(''); const [notice,setNotice]=useState('');
  const [editing,setEditing]=useState<Lexeme|null>(null); const [draft,setDraft]=useState<Record<string,string>>({});
  const [editor,setEditor]=useState(''); const [reason,setReason]=useState(''); const [limit,setLimit]=useState(40);

  async function load(){ setLoading(true); setError(''); try{
      let data: any = null; let lastErr = '';
      try{ const r=await fetch('/api/curation/lexemes',{cache:'no-store'}); const j=await r.json(); if(r.ok){ data = Array.isArray(j) ? j : (j.lexemes || j.data || j.items || null); if(!data) lastErr = j.error || 'API boş döndü'; } else lastErr = j.error || ('API '+r.status); }catch(e){ lastErr = 'API erişilemedi: '+(e instanceof Error? e.message : String(e)); }
      if(!data || !data.length){
        try{ const r2=await fetch('/data/linguistic/lexemes.json',{cache:'no-store'}); if(r2.ok){ const j2=await r2.json(); const arr = Array.isArray(j2) ? j2 : (j2.lexemes || j2.data || []); if(arr.length){ data = arr; lastErr=''; } } }catch{}
      }
      if(!data || !data.length) throw new Error(lastErr || 'Veri yüklenemedi. /api/curation/lexemes boş.');
      setRows(data); setEditing(null); setCurrent(prev=> prev!==null&&data.some((l:Lexeme)=>concept(l)===prev)? prev : (data.length? concept(data[0]) : null));
    }catch(e){ setError(e instanceof Error? e.message : String(e)); } finally{ setLoading(false);} }
  useEffect(()=>{ void load(); },[]);

  const validConcepts = useMemo(()=>{
    const s = new Set<string>();
    for (const l of rows) { const c = concept(l); if (c) s.add(c); }
    return s;
  },[rows]);

  const groups=useMemo(()=>{ const res:Record<string,Lexeme[]>=Object.create(null); for(const l of rows) (res[concept(l)]||= []).push(l); for(const k of Object.keys(res)) res[k].sort(sortKbdFirst); return res; },[rows]);
  const keys=useMemo(()=> Object.keys(groups).sort((a,b)=> a.localeCompare(b)),[groups]);
  const filteredKeys=useMemo(()=>{ const s=q.trim().toLowerCase(); if(!s) return keys; return keys.filter(k=> k.toLowerCase().includes(s) || groups[k].some(l=> [l.id,l.form,l.translations?.tr,l.dialect].some(v=> typeof v==='string'&&v.toLowerCase().includes(s)))); },[q,keys,groups]);
  const selected = current===null? [] : groups[current]||[];

  function startEdit(l:Lexeme){ const v:Record<string,string>={}; for(const [k] of scalarFields) v[k]=text(l[k]); for(const [lang] of languageFields) v['translations.'+lang]=text(l.translations?.[lang]); setDraft(v); setEditing(l); setEditor(''); setReason(''); setError(''); setNotice(''); }
  function writable(key:string){ if(!editing) return false; if(key.startsWith('translations.')){ if(editing.translations!=null&&!isObject(editing.translations)) return false; const lang=key.split('.')[1]; const vv=editing.translations?.[lang]; return vv==null||typeof vv==='string'; } return editing[key]==null||typeof editing[key]==='string'; }

  async function save(){ if(!editing||busy) return; if(!editor.trim()){ setError('Editör adı zorunlu'); return; } if(!reason.trim()){ setError('Gerekçe zorunlu'); return; }
    const cid = (draft['conceptId'] || '').trim();
    if (cid) {
      if (!/^[A-Z][A-Z0-9_]*$/.test(cid)) { setError(`Gecersiz Kavram ID: "${cid}".`); return; }
      if (!validConcepts.has(cid)) {
        const ok = window.confirm(`"${cid}" kavramı henüz tanımlı değil.\n\nBu kavramı YENİ olarak oluşturup kelimeyi ona bağlayayım mı?\n\nEvet = Yeni kavram oluştur + kaydet\nHayır = Vazgeç`);
        if (!ok) { setError(`Vazgeçildi: "${cid}" kavramı oluşturulmadı.`); return; }
        try {
          const cr = await fetch('/api/curation/concepts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: cid, label: draft['meaning'] || draft['translations.tr'] || cid, editor: editor.trim(), reason: reason.trim() || 'Yeni kavram' }) });
          if (!cr.ok) setNotice(`Not: /api/curation/concepts yok (${cr.status}), kavram kelime ile birlikte kaydedilecek.`);
        } catch { setNotice('Not: Kavram API erişilemedi, kavram kelime ile birlikte kaydedilecek.'); }
      }
    }
    const original=editing; const changes:Record<string,any>={}; for(const [k] of scalarFields) if(writable(k)&&draft[k]!==text(original[k])) changes[k]=draft[k]; const translations:Record<string,string>={}; for(const [lang] of languageFields){ const k='translations.'+lang; if(writable(k)&&draft[k]!==text(original.translations?.[lang])) translations[lang]=draft[k]; } if(Object.keys(translations).length) changes.translations=translations; if(!Object.keys(changes).length){ setNotice('Değişiklik yok'); return; } setBusy(true); setError(''); setNotice(''); try{ const payload={ id:original.id, expectedRevision:original._revision, changes, editor:editor.trim(), reason:reason.trim() }; async function request(mode:string){ const r=await fetch('/api/curation/lexemes/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,mode})}); const res=await r.json(); if(!r.ok||!res.ok) throw new Error(res.error||'İşlem başarısız'); return res; } const preview=await request('dry-run'); if(preview.noChange){ setNotice('Değişiklik yok'); return; } if(!window.confirm('Yalnızca bu kelime değişecek: '+original.id+'\nEditör: '+editor+'\nGerekçe: '+reason+'\n\n'+JSON.stringify(preview.diff,null,2)+'\n\nKaydedilsin mi?')) return; const result=await request('apply'); if(!result.applied) throw new Error('Kayıt uygulanmadı');
      const updatedRows = rows.map(l=> l.id===original.id? result.lexeme : l);
      setRows(updatedRows);
      setCurrent(concept(result.lexeme)); setLimit(40);
      setNotice('Kaydedildi: '+original.id+' • doğrulanıyor...');
      try {
        const verify = await fetch('/api/curation/lexemes',{cache:'no-store'});
        const vj = await verify.json();
        const varr = Array.isArray(vj) ? vj : (vj.lexemes || vj.data || []);
        const found = varr.find((l:any)=> l.id===original.id);
        if (!found) { setError('Kayıt API\'ye ulaşmadı - tekrar dene.'); setEditing(original); return; }
        if (found._revision === original._revision) { setError('Kayıt yazılmadı - revision değişmedi.'); setEditing(original); return; }
        setRows(varr);
        const grp = varr.filter((l:any)=> concept(l)===concept(result.lexeme)).sort(sortKbdFirst);
        const idx2 = grp.findIndex((l:any)=> l.id===original.id);
        const nxt = grp[idx2+1] || null;
        if (nxt) { startEdit(nxt); setNotice('Kaydedildi ✓: '+original.id+' → Sonraki kelime: '+text(nxt.form)); }
        else {
const allKeys = Object.keys(groups).sort((a,b)=> a.localeCompare(b));
          const ci = allKeys.indexOf(concept(result.lexeme));
          const nextConcept = allKeys[ci+1];
          if (nextConcept) { setCurrent(nextConcept); setEditing(null); setNotice('Kaydedildi ✓: '+original.id+' → Sonraki kavram: '+nextConcept); }
          else { setEditing(null); setNotice('Kaydedildi ✓: '+original.id+' • Son kelimeydi'); }
        }
      } catch(verErr) {
        setError('Kayıt gönderildi ama doğrulanamadı: '+(verErr instanceof Error? verErr.message : String(verErr)));
      } }catch(e){ setError(e instanceof Error? e.message : String(e)); } finally{ setBusy(false);} }
  function selectGroup(k:string){ if(editing&&!window.confirm('Düzenleme iptal edilsin mi?')) return; setCurrent(k); setEditing(null); setLimit(40); }

  function exportCsv(){ const csv = ["id,form,tr,en,dialect,concept,ipa", ...selected.map(l=> `${l.id},"${text(l.form)}","${text(l.translations?.tr)}","${text(l.translations?.en)}",${l.dialect||""},${concept(l)},"${text(l.ipa)}"`)].join("\n"); const blob = new Blob([csv], {type:"text/csv"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download=`${current||"lexemes"}.csv`; a.click(); }
  function exportJson(){ const json = JSON.stringify(selected, null, 2); const blob = new Blob([json], {type:"application/json"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download=`${current||"lexemes"}.json`; a.click(); }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc' }}>
      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}><div style={{ width:36, height:36, borderRadius:999, background:'#e0f2fe', border:'1px solid #38bdf8', display:'flex', alignItems:'center', justifyContent:'center' }}>◬</div><span style={{ fontWeight:900, fontSize:20 }}>Çerkesçe Sözlük</span><span style={{ background:'#dbeafe', color:'#1e40af', fontSize:12, padding:'4px 10px', borderRadius:999, fontWeight:700 }}>Graph • Gerçek Kelimeler • {loading ? 'yükleniyor...' : rows.length + ' lexeme'}</span></div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <button onClick={exportCsv} style={{ padding:'8px 12px', borderRadius:10, border:'1px solid #cbd5e1', background:'#fff', cursor:'pointer' }}>⬇ CSV</button>
          <button onClick={exportJson} style={{ padding:'8px 12px', borderRadius:10, border:'1px solid #cbd5e1', background:'#fff', cursor:'pointer' }}>⬇ JSON</button>
          <button onClick={()=>location.href='/admin/curation/concepts'} style={{ padding:'8px 12px', borderRadius:10, border:'1px solid #e2e8f0', background:'#f8fafc' }}>← Editör</button>
        </div>
      </div>

      <div style={{ display:'flex', gap:0 }}>
        <div style={{ flex:'0 0 300px', background:'#f8fafc', borderRight:'1px solid #e2e8f0', padding:16, minHeight:'90vh' }}>
          <div style={{ fontWeight:900, display:'flex', justifyContent:'space-between' }}><span>KAVRAM → KELİME</span><span style={{ fontSize:12, color:'#64748b' }}>{keys.length} kavram</span></div>
          <button onClick={()=>{ const nid = window.prompt('Yeni Kavram ID (BÜYÜK HARF, örn: ROTTEN, JOY):'); if(!nid) return; const id = nid.trim().toUpperCase(); if(!isValidConceptFormat(id)){ alert('Format yanlış: sadece A-Z, 0-9, _ kullanın'); return; } if(validConcepts.has(id)){ setCurrent(id); return; } const label = window.prompt('Kavram adı / anlamı (örn: çürük):') || id; fetch('/api/curation/concepts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id, label})}).finally(()=>{ setRows(prev=> [...prev]); setCurrent(id); setNotice('Yeni kavram oluşturuldu: '+id); }); }} style={{ marginTop:10, width:'100%', background:'#7c3aed', color:'#fff', border:'none', borderRadius:10, padding:'10px', fontWeight:800, cursor:'pointer' }}>+ Yeni Kavram Oluştur</button>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Kavram ara... гуфӀэ, ун, шы" style={{ marginTop:12, width:'100%', border:'1px solid #cbd5e1', borderRadius:10, padding:'10px 12px', background:'#fff' }} />
          {loading ? <div style={{ marginTop:16, color:'#64748b' }}>Yükleniyor... /api/curation/lexemes deneniyor...</div> : error ? <div style={{ marginTop:16, background:'#fee2e2', border:'1px solid #fca5a5', borderRadius:10, padding:12, fontSize:13, color:'#991b1b' }}><b>Veri gelmedi:</b><br/>{error}<br/><button onClick={()=>void load()} style={{ marginTop:8, background:'#dc2626', color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', cursor:'pointer' }}>↻ Tekrar Dene</button></div> : rows.length===0 ? <div style={{ marginTop:16, color:'#64748b' }}>0 lexeme — API boş</div> : (
            <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:8, maxHeight:'70vh', overflowY:'auto' }}>
              {filteredKeys.map(k=>{
                const isActive = k===current;
                return (
                  <button key={k} disabled={busy} onClick={()=>selectGroup(k)} style={{ textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', borderRadius:12, border:'none', background: isActive ? '#2563eb' : '#fff', color: isActive ? '#fff' : '#0f172a', fontWeight: isActive ? 800 : 600, cursor:'pointer', boxShadow: isActive ? '0 2px 10px rgba(37,99,235,0.3)' : 'none' }}>
                    <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth: 160 }}>{k || '(Kavramı yok)'}</span><span style={{ background: isActive ? 'rgba(255,255,255,0.2)' : '#e2e8f0', padding:'2px 8px', borderRadius:999, fontSize:12 }}>{groups[k].length}</span>
                  </button>
                );
              })}
            </div>
          )}
          <div style={{ marginTop:16, fontSize:11, color:'#64748b' }}>
            ConceptRegistry: {validConcepts.size} kavram tanımlı • Gerçek lexeme'den
          </div>
        </div>

        <div style={{ flex:1, padding:20, background:'#fff' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}><span style={{ fontWeight:900, fontSize:18 }}>Graph • Gerçek Çerkesçe</span><span style={{ border:'1px solid #93c5fd', color:'#2563eb', borderRadius:999, padding:'2px 8px', fontSize:12 }}>Çerkesçe görünür</span><span style={{ fontSize:13, color:'#475569' }}>{selected[0] ? `«${text(selected[0].form)}» — ${text(selected[0].translations?.tr)||''} • ${selected.length} form` : ''}</span></div>
            <div style={{ display:'flex', gap:8 }}>{error&&<span style={{ fontSize:11, color:'#991b1b' }}>{error}</span>}{notice&&<span style={{ fontSize:11, color:'#166534' }}>{notice}</span>}</div>
          </div>

          <div style={{ marginTop:12 }}><b>Dil Formları • 3×2 • Gerçek Çerkesçe Önce</b><div style={{ fontSize:12, color:'#64748b' }}>6 dil için form ve çeviri kartları • KBD önce sıralı • Lehçe kontrollü • IPA yalnızca l.ipa varsa • ConceptRegistry entegre</div></div>

          {selected.slice(0,1).map(l=>{
            const dLab = dialectLabel(l.dialect);
            const hasIpa = !!text(l.ipa);
            return (
              <div key={l.id}>
                <div style={{ marginTop:16, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
                  <div style={{ borderRadius:14, border:`2px solid ${dLab.border}`, background:dLab.bg, padding:14, boxShadow:'0 1px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display:'inline-block', background:dLab.color, color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>{dLab.isKbd ? 'KBD' : dLab.isAdy ? 'ADY' : 'UNK'}</div>
                    <div style={{ marginTop:8, fontSize:12, color:'#475569' }}>{dLab.isKbd ? 'Kabardian' : 'Lehçe'}<br/><span style={{ color:'#14b8a6' }}>Çerkesçe Form • Gerçek</span></div>
                    <div style={{ marginTop:6, fontWeight:900, fontSize:28, fontFamily:'serif' }}>{text(l.form)||'—'}</div>
                    <div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>IPA: {hasIpa ? `[${text(l.ipa)}]` : '—'} • {selected.length} form bu kavramda</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #38bdf8', background:'#dbeafe', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#2563eb', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>TR</div>
                    <div style={{ marginTop:8, fontSize:12 }}>Türkçe<br/><span style={{ color:'#2563eb' }}>Gerçek çeviri</span></div>
                    <div style={{ marginTop:6, fontWeight:800, fontSize:18 }}>{text(l.translations?.tr)||'—'}</div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:4 }}>{text(l.meaning)||'—'}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #22c55e', background:'#dcfce7', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#16a34a', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>EN</div>
                    <div style={{ marginTop:8, fontSize:12 }}>English<br/><span style={{ color:'#16a34a' }}>Real translation</span></div>
                    <div style={{ marginTop:6, fontWeight:800 }}>{text(l.translations?.en)||'—'}</div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:4 }}>{text(l.literalMeaning)||''}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #ef4444', background:'#fee2e2', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#dc2626', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>RU</div>
                    <div style={{ marginTop:8, fontSize:12 }}>Русский<br/><span style={{ color:'#dc2626' }}>Форма</span></div>
                    <div style={{ marginTop:6, fontWeight:800, fontSize:18 }}>{text(l.translations?.ru)||'—'}</div>
                    <div style={{ fontSize:11, color:'#7f1d1d', marginTop:4 }}>Rusça çeviri</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #8b5cf6', background:'#ede9fe', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#5b21b6', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>CE / IPA • Gerçek</div>
                    <div style={{ marginTop:8, fontSize:12 }}>Cherkess / IPA<br/><span style={{ color:'#7c3aed' }}>Phonetic gerçek</span></div>
                    <div style={{ marginTop:6, fontWeight:800, fontFamily:'monospace', fontSize:18 }}>{hasIpa ? `${text(l.form)} / [${text(l.ipa)}]` : `${text(l.form)} / —`}</div>
                    <div style={{ fontSize:11, color:'#6b7280', marginTop:4 }}>Circassian — {dLab.label}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #f59e0b', background:'linear-gradient(135deg, #fef3c7 0%, #e9d5ff 100%)', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#7c3aed', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>AR العربية</div>
                    <div style={{ marginTop:8, fontSize:12, textAlign:'right' }}>الشكل الحقيقي</div>
                    <div dir="rtl" style={{ marginTop:6, fontWeight:800, textAlign:'right', fontSize:18 }}>{text(l.translations?.ar)||'—'}</div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:4, textAlign:'right' }}>{text(l.meaning)||''}</div>
                  </div>
                </div>

                <div style={{ marginTop:16, border:'1px solid #e2e8f0', borderRadius:14, padding:14, background:'#f8fafc' }}>
                  <div style={{ fontWeight:900, marginBottom:8 }}>Aile Grafı — {current} • {selected.length} gerçek form</div>
                  <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
                    {selected.slice(0,12).map((lex) => {
                      const dl = dialectLabel(lex.dialect);
                      return (
                        <div key={lex.id} style={{ textAlign:'center' }}>
                          <div style={{ width:64, height:64, borderRadius:999, background: dl.bg, border:`2px solid ${dl.border}`, display:'grid', placeItems:'center', fontWeight:900, fontSize:14 }}>{text(lex.form).slice(0,3) || '?'}</div>
                          <div style={{ fontSize:11, marginTop:4, maxWidth:70, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{text(lex.form)}</div>
                          <div style={{ fontSize:10, background: dl.color, color:'#fff', borderRadius:4, padding:'1px 4px', display:'inline-block' }}>{dl.isKbd ? 'KBD' : dl.isAdy ? 'ADY' : '?'}</div>
                        </div>
                      );
                    })}
                  </div>
                  {selected.length > 1 && <div style={{ marginTop:12, fontSize:11, color:'#64748b' }}>ConceptRegistry: {current} → {selected.length} form, KBD önce sıralı</div>}
                </div>

                <div style={{ marginTop:16, border:'1px solid #e2e8f0', borderRadius:14, padding:16, background:'#fff' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <div style={{ fontWeight:900 }}>Edit Mode • POS & Notes • Export var</div>
                    <div style={{ fontSize:11, color:'#64748b' }}>ID: {l.id} • Rev: {l._revision?.slice(0,8)} • {dLab.label} • {rows.length} lexeme</div>
                  </div>

                  {editing?.id !== l.id ? (
                    <>
                      <div style={{ marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                        <div style={{ border:'1px solid #2dd4bf', borderRadius:10, padding:12 }}><div style={{ fontSize:11, fontWeight:800 }}>POS (Dilbilgisi)</div><div style={{ marginTop:6, fontSize:12 }}>POS: {text(l.partOfSpeech)||'—'}<br/>Dialect: {dLab.label}<br/>Stem: {text(l.form)}-</div></div>
                        <div style={{ border:'1px solid #a78bfa', borderRadius:10, padding:12 }}><div style={{ fontSize:11, fontWeight:800 }}>Notes</div><div style={{ marginTop:6, fontSize:12, whiteSpace:'pre-wrap' }}>{text(l.notes)||'—'}</div></div>
                      </div>
                      <div style={{ marginTop:12, display:'flex', gap:8 }}>
                        <button disabled={busy} onClick={()=>{ if(!editing||window.confirm('Diğer düzenleme iptal edilsin mi?')) startEdit(l); }} style={{ background:'#0f172a', color:'#fff', padding:'8px 14px', borderRadius:10, border:'none', cursor:'pointer' }}>✏ Düzenle • Gerçek kelime</button>
                        <button disabled={busy} onClick={()=>{ const g = selected; const i = g.findIndex(x=> x.id===l.id); const nxt = g[i+1]; if(nxt) startEdit(nxt); else { const ks = Object.keys(groups).sort((a,b)=> a.localeCompare(b)); const ci = ks.indexOf(current||''); if(ks[ci+1]) setCurrent(ks[ci+1]); } }} style={{ background:'#2563eb', color:'#fff', padding:'8px 14px', borderRadius:10, border:'none', cursor:'pointer' }}>Sonraki Kelime →</button>
                      </div>
                    </>
                  ) : (
                    <fieldset disabled={busy} style={{ border:0, padding:0, marginTop:12, opacity: busy ? 0.6 : 1 }}>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
                        {scalarFields.map(([key,label])=>{
                          if (key === 'partOfSpeech') {
                            const curPos = draft[key] ?? '';
                            const posSecenekleri = [{val:'',label:'— Seçiniz —'},{val:'noun',label:'noun — isim'},{val:'verb',label:'verb — fiil'},{val:'adverb',label:'adverb — zarf'},{val:'adjective',label:'adjective — sıfat'},{val:'interjection',label:'interjection — ünlem'},{val:'numeral',label:'numeral — sayı'},{val:'pronoun',label:'pronoun — zamir'},{val:'particle',label:'particle — edatçık'},{val:'conjunction',label:'conjunction — bağlaç'},{val:'postposition',label:'postposition — edat'},{val:'prefix',label:'prefix — ön ek'},{val:'phrase',label:'phrase — ifade'},{val:'proper_name',label:'proper_name — özel isim'},{val:'transitive_verb',label:'transitive_verb — geçişli fiil'}];
                            const bulunanPos = posSecenekleri.find(s => s.val === curPos);
                            return (<label key={key} style={{ display:'block' }}><div style={{ fontSize:11, fontWeight:700 }}>{label}</div><DropdownMenu.Root><DropdownMenu.Trigger asChild><button type="button" disabled={busy} style={{ width:'100%', padding:'8px 10px', border:'1px solid #cbd5e1', borderRadius:8, background:'#fff', textAlign:'left', cursor:'pointer', fontSize:13 }}>{bulunanPos ? bulunanPos.label : (curPos || 'Seçiniz...')} <span style={{float:'right', color:'#94a3b8'}}>▾</span></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content style={{ background:'#fff', border:'1px solid #cbd5e1', borderRadius:8, boxShadow:'0 4px 16px rgba(0,0,0,0.12)', padding:4, minWidth:200, zIndex:1000 }}><DropdownMenu.RadioGroup value={curPos} onValueChange={(v)=>setDraft(p=>({...p, [key]: v}))}>{posSecenekleri.map(s => (<DropdownMenu.RadioItem key={s.val||'_'} value={s.val} style={{ padding:'8px 10px', borderRadius:6, cursor:'pointer', fontSize:13, outline:'none' }}><DropdownMenu.ItemIndicator style={{ marginRight:6 }}>✓</DropdownMenu.ItemIndicator>{s.label}</DropdownMenu.RadioItem>))}</DropdownMenu.RadioGroup></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>);
                          }
                          if (key === 'dialect') {
                            const cur = draft[key] ?? '';
                            const secenekler = [{val:'',label:'Belirtilmemiş'},{val:'kbd',label:'Kabardeyce (Doğu)'},{val:'ady',label:'Adığece (Batı)'}];
                            const bulunan = secenekler.find(s => s.val === cur);
                            return (<label key={key} style={{ display:'block' }}><div style={{ fontSize:11, fontWeight:700 }}>{label}</div><DropdownMenu.Root><DropdownMenu.Trigger asChild><button type="button" disabled={busy} style={{ width:'100%', padding:'8px 10px', border:'1px solid #cbd5e1', borderRadius:8, background:'#fff', textAlign:'left', cursor:'pointer', fontSize:13 }}>{bulunan ? bulunan.label : (cur || 'Seçiniz...')} <span style={{float:'right', color:'#94a3b8'}}>▾</span></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content style={{ background:'#fff', border:'1px solid #cbd5e1', borderRadius:8, boxShadow:'0 4px 16px rgba(0,0,0,0.12)', padding:4, minWidth:200, zIndex:1000 }}><DropdownMenu.RadioGroup value={cur} onValueChange={(v)=>setDraft(p=>({...p, [key]: v}))}>{secenekler.map(s => (<DropdownMenu.RadioItem key={s.val||'_'} value={s.val} style={{ padding:'8px 10px', borderRadius:6, cursor:'pointer', fontSize:13, outline:'none' }}><DropdownMenu.ItemIndicator style={{ marginRight:6 }}>✓</DropdownMenu.ItemIndicator>{s.label}</DropdownMenu.RadioItem>))}</DropdownMenu.RadioGroup></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>);
                          }
                          return (<label key={key}><div style={{ fontSize:11, fontWeight:700 }}>{label} {key==='conceptId' && <span style={{ fontWeight:400, color:'#64748b' }}>(Yoksa otomatik oluşturulur)</span>}</div><textarea value={draft[key]??''} onChange={e=>setDraft(p=>({...p,[key]:e.target.value}))} rows={['meaning','notes'].includes(key)?2:1} style={{ width:'100%', padding:8, border:`1px solid ${busy ? '#e2e8f0' : '#cbd5e1'}`, borderRadius:8 }} /></label>);
                        })}
                        {languageFields.map(([lang,label])=>{ const k='translations.'+lang; return <label key={k}><div style={{ fontSize:11, fontWeight:700 }}>{label}</div><textarea value={draft[k]??''} dir="auto" onChange={e=>setDraft(p=>({...p,[k]:e.target.value}))} rows={2} style={{ width:'100%', padding:8, border:'1px solid #cbd5e1', borderRadius:8 }} /></label>; })}
                      </div>
                      <div style={{ marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                        <label><div style={{ fontSize:11, fontWeight:700 }}>Editör (zorunlu)</div><input value={editor} onChange={e=>setEditor(e.target.value)} placeholder="Adınız" style={{ width:'100%', padding:8, border:'1px solid #cbd5e1', borderRadius:8 }} /></label>
                        <label><div style={{ fontSize:11, fontWeight:700 }}>Gerekçe (zorunlu)</div><input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Neden?" style={{ width:'100%', padding:8, border:'1px solid #cbd5e1', borderRadius:8 }} /></label>
                      </div>
                      <div style={{ marginTop:12, display:'flex', gap:8 }}>
                        <button disabled={busy} onClick={()=>void save()} style={{ background: busy ? '#94a3b8' : '#7c3aed', color:'#fff', padding:'10px 18px', borderRadius:10, border:'none', cursor: busy ? 'not-allowed' : 'pointer', fontWeight:800 }}>{busy ? 'Kaydediliyor…' : '✓ Kontrol Et ve Kaydet'}</button>
                        <button disabled={busy} onClick={()=>setEditing(null)} style={{ padding:'10px 14px', borderRadius:10, background:'#fff', border:'1px solid #e2e8f0' }}>İptal</button>
                      </div>
                    </fieldset>
                  )}
                </div>
              </div>
            );
          })}
          {selected.length===0 && !loading && !error && (
            <div style={{ marginTop:20, color:'#64748b' }}>Bu kavramda gösterilecek kelime bulunamadı.</div>
          )}
        </div>
      </div>
    </div>
  );
}