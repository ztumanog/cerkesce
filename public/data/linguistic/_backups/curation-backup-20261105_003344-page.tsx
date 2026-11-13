'use client';
import { useEffect, useMemo, useState } from 'react';

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

export default function ConceptsPage() {
  const [rows,setRows]=useState<Lexeme[]>([]);
  const [current,setCurrent]=useState<string|null>(null);
  const [q,setQ]=useState(''); const [loading,setLoading]=useState(true); const [busy,setBusy]=useState(false);
  const [error,setError]=useState(''); const [notice,setNotice]=useState('');
  const [editing,setEditing]=useState<Lexeme|null>(null); const [draft,setDraft]=useState<Record<string,string>>({});
  const [editor,setEditor]=useState(''); const [reason,setReason]=useState(''); const [limit,setLimit]=useState(40);

  async function load(){ setLoading(true); setError(''); try{ const r=await fetch('/api/curation/lexemes',{cache:'no-store'}); const data=await r.json(); if(!r.ok||!Array.isArray(data)) throw new Error(data.error||'Veri yüklenemedi.'); setRows(data); setEditing(null); setCurrent(prev=> prev!==null&&data.some((l:Lexeme)=>concept(l)===prev)? prev : (data.length? concept(data[0]) : null)); }catch(e){ setError(e instanceof Error? e.message : String(e)); } finally{ setLoading(false);} }
  useEffect(()=>{ void load(); },[]);

  const groups=useMemo(()=>{ const res:Record<string,Lexeme[]>=Object.create(null); for(const l of rows) (res[concept(l)]||= []).push(l); for(const k of Object.keys(res)) res[k].sort(sortKbdFirst); return res; },[rows]);
  const keys=useMemo(()=> Object.keys(groups).sort((a,b)=> a.localeCompare(b)),[groups]);
  const filteredKeys=useMemo(()=>{ const s=q.trim().toLowerCase(); if(!s) return keys; return keys.filter(k=> k.toLowerCase().includes(s) || groups[k].some(l=> [l.id,l.form,l.translations?.tr,l.dialect].some(v=> typeof v==='string'&&v.toLowerCase().includes(s)))); },[q,keys,groups]);
  const selected = current===null? [] : groups[current]||[];

  function startEdit(l:Lexeme){ const v:Record<string,string>={}; for(const [k] of scalarFields) v[k]=text(l[k]); for(const [lang] of languageFields) v['translations.'+lang]=text(l.translations?.[lang]); setDraft(v); setEditing(l); setEditor(''); setReason(''); setError(''); setNotice(''); }
  function writable(key:string){ if(!editing) return false; if(key.startsWith('translations.')){ if(editing.translations!=null&&!isObject(editing.translations)) return false; const lang=key.split('.')[1]; const vv=editing.translations?.[lang]; return vv==null||typeof vv==='string'; } return editing[key]==null||typeof editing[key]==='string'; }

  async function save(){ if(!editing||busy) return; if(!editor.trim()){ setError('Editör adı zorunlu'); return; } if(!reason.trim()){ setError('Gerekçe zorunlu'); return; } const original=editing; const changes:Record<string,any>={}; for(const [k] of scalarFields) if(writable(k)&&draft[k]!==text(original[k])) changes[k]=draft[k]; const translations:Record<string,string>={}; for(const [lang] of languageFields){ const k='translations.'+lang; if(writable(k)&&draft[k]!==text(original.translations?.[lang])) translations[lang]=draft[k]; } if(Object.keys(translations).length) changes.translations=translations; if(!Object.keys(changes).length){ setNotice('Değişiklik yok'); return; } setBusy(true); setError(''); setNotice(''); try{ const payload={ id:original.id, expectedRevision:original._revision, changes, editor:editor.trim(), reason:reason.trim() }; async function request(mode:string){ const r=await fetch('/api/curation/lexemes/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,mode})}); const res=await r.json(); if(!r.ok||!res.ok) throw new Error(res.error||'İşlem başarısız'); return res; } const preview=await request('dry-run'); if(preview.noChange){ setNotice('Değişiklik yok'); return; } if(!window.confirm('Yalnızca bu kelime değişecek: '+original.id+'\nEditör: '+editor+'\nGerekçe: '+reason+'\n\n'+JSON.stringify(preview.diff,null,2)+'\n\nKaydedilsin mi?')) return; const result=await request('apply'); if(!result.applied) throw new Error('Kayıt uygulanmadı'); setRows(prev=> prev.map(l=> l.id===original.id? result.lexeme : l)); setCurrent(concept(result.lexeme)); setLimit(40); setEditing(null); setNotice('Kaydedildi: '+original.id+'\nYedek: '+result.backupPath+'\nEditör: '+editor); }catch(e){ setError(e instanceof Error? e.message : String(e)); } finally{ setBusy(false);} }
  function selectGroup(k:string){ if(editing&&!window.confirm('Düzenleme iptal edilsin mi?')) return; setCurrent(k); setEditing(null); setLimit(40); }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc' }}>
      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}><div style={{ width:36, height:36, borderRadius:999, background:'#e0f2fe', border:'1px solid #38bdf8', display:'flex', alignItems:'center', justifyContent:'center' }}>◬</div><span style={{ fontWeight:900, fontSize:20 }}>Çerkesçe Sözlük</span><span style={{ background:'#dbeafe', color:'#1e40af', fontSize:12, padding:'4px 10px', borderRadius:999, fontWeight:700 }}>v0.3 • Lexeme Editing</span></div>
        <div style={{ display:'flex', gap:8 }}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ara... / Search..." style={{ border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 12px' }} /><span>🔔</span></div>
      </div>

      <div style={{ display:'flex', gap:0 }}>
        <div style={{ flex:'0 0 280px', background:'#f8fafc', borderRight:'1px solid #e2e8f0', padding:16, minHeight:'90vh' }}>
          <div style={{ fontWeight:900 }}>KAVRAM → KELİME</div>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Kavram ara..." style={{ marginTop:12, width:'100%', border:'1px solid #cbd5e1', borderRadius:10, padding:'10px 12px', background:'#fff' }} />
          <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:8, maxHeight:'70vh', overflowY:'auto' }}>
            {filteredKeys.map(k=>{
              const isActive = k===current;
              return (
                <button key={k} disabled={busy} onClick={()=>selectGroup(k)} style={{ textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', borderRadius:12, border:'none', background: isActive ? '#2563eb' : '#fff', color: isActive ? '#fff' : '#0f172a', fontWeight: isActive ? 800 : 600, cursor:'pointer', boxShadow: isActive ? '0 2px 10px rgba(37,99,235,0.3)' : 'none' }}>
                  <span>{k || '(Kavramı yok)'}</span><span style={{ background: isActive ? 'rgba(255,255,255,0.2)' : '#e2e8f0', padding:'2px 8px', borderRadius:999, fontSize:12 }}>{groups[k].length}</span>
                </button>
              );
            })}
          </div>
          <button style={{ marginTop:16, display:'flex', alignItems:'center', gap:6, color:'#2563eb', background:'none', border:'none', fontWeight:700, cursor:'pointer' }}>+ Yeni Kavram Ekle</button>
        </div>

        <div style={{ flex:1, padding:20, background:'#fff' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}><span style={{ fontWeight:900, fontSize:18 }}>Lexeme Editing</span><span style={{ border:'1px solid #93c5fd', color:'#2563eb', borderRadius:999, padding:'2px 8px', fontSize:12 }}>✏️ Editing</span><span style={{ fontSize:13, color:'#475569' }}>{selected[0] ? `«${text(selected[0].form)}» — ${text(selected[0].translations?.tr)||''}` : ''}</span></div>
            <div style={{ display:'flex', gap:8 }}>{error&&<span style={{ fontSize:11, color:'#991b1b' }}>{error}</span>}{notice&&<span style={{ fontSize:11, color:'#166534' }}>Kaydedildi</span>}</div>
          </div>

          <div style={{ marginTop:12 }}><b>Dil Formları • 3×2</b><div style={{ fontSize:12, color:'#64748b' }}>6 dil için form ve çeviri kartları • KBD önce sıralı • Lehçe kontrollü • IPA yalnızca l.ipa varsa</div></div>

          {selected.slice(0,1).map(l=>{
            const dLab = dialectLabel(l.dialect);
            const hasIpa = !!text(l.ipa);
            return (
              <div key={l.id}>
                <div style={{ marginTop:16, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
                  <div style={{ borderRadius:14, border:`2px solid ${dLab.border}`, background:dLab.bg, padding:14, boxShadow:'0 1px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display:'inline-block', background:dLab.color, color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>{dLab.isKbd ? 'KBD' : dLab.isAdy ? 'ADY' : 'UNK'}</div>
                    <div style={{ marginTop:8, fontSize:12, color:'#475569' }}>{dLab.isKbd ? 'Kabardian' : 'Lehçe'}<br/><span style={{ color:'#14b8a6' }}>Form</span></div>
                    <div style={{ marginTop:6, fontWeight:900, fontSize:22 }}>{text(l.form)||'—'}</div>
                    <div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>Latin: — • IPA: {hasIpa ? `[${text(l.ipa)}]` : '— (yok, Kiril kopyalanmaz)'}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #38bdf8', background:'#dbeafe', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#2563eb', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>TR</div>
                    <div style={{ marginTop:8, fontSize:12 }}>Türkçe<br/><span style={{ color:'#2563eb' }}>Form</span></div>
                    <div style={{ marginTop:6, fontWeight:800 }}>{text(l.translations?.tr)||'—'}</div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:4 }}>{text(l.meaning)||'—'}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #22c55e', background:'#dcfce7', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#16a34a', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>EN</div>
                    <div style={{ marginTop:8, fontSize:12 }}>English<br/><span style={{ color:'#16a34a' }}>Form</span></div>
                    <div style={{ marginTop:6, fontWeight:800 }}>{text(l.translations?.en)||'—'}</div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:4 }}>{text(l.literalMeaning)||''}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #ef4444', background:'#fee2e2', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#dc2626', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>RU</div>
                    <div style={{ marginTop:8, fontSize:12 }}>Русский<br/><span style={{ color:'#dc2626' }}>Форма</span></div>
                    <div style={{ marginTop:6, fontWeight:800 }}>{text(l.translations?.ru)||'—'}</div>
                    <div style={{ fontSize:11, color:'#7f1d1d', marginTop:4 }}>{text(l.translations?.ru) ? 'дvig...' : ''}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #8b5cf6', background:'#ede9fe', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#5b21b6', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>CE / IPA</div>
                    <div style={{ marginTop:8, fontSize:12 }}>Cherkess / IPA<br/><span style={{ color:'#7c3aed' }}>Phonetic</span></div>
                    <div style={{ marginTop:6, fontWeight:800, fontFamily:'monospace' }}>{hasIpa ? `${text(l.form)} / [${text(l.ipa)}]` : '— (IPA yok)'}</div>
                    <div style={{ fontSize:11, color:'#6b7280', marginTop:4 }}>Circassian — {dLab.label}</div>
                  </div>
                  <div style={{ borderRadius:14, border:'2px solid #f59e0b', background:'linear-gradient(135deg, #fef3c7 0%, #e9d5ff 100%)', padding:14 }}>
                    <div style={{ display:'inline-block', background:'#7c3aed', color:'#fff', fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:6 }}>AR العربية</div>
                    <div style={{ marginTop:8, fontSize:12, textAlign:'right' }}>الشكل</div>
                    <div dir="rtl" style={{ marginTop:6, fontWeight:800, textAlign:'right' }}>{text(l.translations?.ar)||'—'}</div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:4, textAlign:'right' }}>{text(l.meaning)||''}</div>
                  </div>
                </div>

                <div style={{ marginTop:16, border:'1px solid #e2e8f0', borderRadius:14, padding:16, background:'#fff' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <div style={{ fontWeight:900 }}>Edit Mode • POS & Notes <span style={{ border:'1px solid #fdba74', color:'#9a3412', borderRadius:6, padding:'1px 6px', fontSize:10, marginLeft:8 }}>EDIT MODE</span></div>
                    <div style={{ fontSize:11, color:'#64748b' }}>ID: {l.id} • _rev: {l._revision?.slice(0,8)} • {dLab.label}</div>
                  </div>

                  {editing?.id !== l.id ? (
                    <>
                      <div style={{ marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                        <div style={{ border:'1px solid #2dd4bf', borderRadius:10, padding:12 }}><div style={{ fontSize:11, fontWeight:800 }}>POS (Dilbilgisi) <span style={{ background:'#14b8a6', color:'#fff', borderRadius:4, padding:'1px 4px', fontSize:10 }}>Required</span></div><div style={{ marginTop:6, fontSize:12 }}>POS: {text(l.partOfSpeech)||'—'}<br/>Dialect: {dLab.label}<br/>Stem: {text(l.form)}-</div></div>
                        <div style={{ border:'1px solid #a78bfa', borderRadius:10, padding:12 }}><div style={{ fontSize:11, fontWeight:800 }}>Notes / Notlar <span style={{ background:'#7c3aed', color:'#fff', borderRadius:4, padding:'1px 4px', fontSize:10 }}>Optional</span></div><div style={{ marginTop:6, fontSize:12, whiteSpace:'pre-wrap' }}>{text(l.notes)||'—'}</div></div>
                      </div>
                      <button disabled={busy} onClick={()=>{ if(!editing||window.confirm('Diğer düzenleme iptal edilsin mi?')) startEdit(l); }} style={{ marginTop:12, background:'#0f172a', color:'#fff', padding:'8px 14px', borderRadius:10, border:'none', cursor:'pointer' }}>✏️ Düzenle</button>
                    </>
                  ) : (
                    <fieldset disabled={busy} style={{ border:0, padding:0, marginTop:12, opacity: busy ? 0.6 : 1 }}>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
                        {scalarFields.map(([key,label])=>(
                          <label key={key}><div style={{ fontSize:11, fontWeight:700 }}>{label}</div><textarea value={draft[key]??''} onChange={e=>setDraft(p=>({...p,[key]:e.target.value}))} rows={['meaning','notes'].includes(key)?2:1} style={{ width:'100%', padding:8, border:`1px solid ${busy ? '#e2e8f0' : '#cbd5e1'}`, borderRadius:8 }} /></label>
                        ))}
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
                  <div style={{ marginTop:10, fontSize:11, color:'#64748b' }}>Son düzenleme: {new Date().toLocaleString('tr-TR')} • Kaydeden: {editor||'—'} • Version: {l._revision?.slice(0,8)} • 3 revisions • Bu dosyanın varlığı verinin değiştiğini kanıtlamaz; /api/curation/lexemes/update yedek ve audit oluşturur.</div>
                </div>
              </div>
            );
          })}
          {selected.length===0 && <div style={{ marginTop:20, color:'#64748b' }}>Bu kavramda kelime yok</div>}
          {selected.length > limit && <button disabled={busy} onClick={()=>setLimit(n=>n+40)} style={{ marginTop:12, padding:'8px 14px', borderRadius:10, border:'1px solid #e2e8f0', background:'#fff' }}>40 kelime daha göster</button>}
        </div>
      </div>
    </div>
  );
}