
'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function Client({initialFamilies, initialLexemes}:{initialFamilies:any[], initialLexemes:any[]}){
  const [families]=useState(initialFamilies);
  const [lexemes]=useState(initialLexemes);
  const [sel,setSel]=useState(families[0]?.id||'WF-1');
  const [q,setQ]=useState('');
  const filtered = useMemo(()=>{
    const s=q.toLowerCase().trim();
    if(!s) return families.slice(0,300);
    return families.filter((f:any)=>(f.id||'').toLowerCase().includes(s)).slice(0,300);
  },[families,q]);
  const members = useMemo(()=>lexemes.filter((l:any)=>l.wordFamilyId===sel).slice(0,200),[lexemes,sel]);
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{width:'340px',background:'white',borderRight:'1px solid #e2e8f0',padding:'20px',height:'100vh',overflow:'auto'}}>
        <Link href="/sozluk" style={{fontSize:'12px',color:'#64748b'}}>← Sözlük</Link>
        <h2 style={{fontWeight:'900',fontSize:'20px',marginTop:'8px'}}>AILELER</h2>
        <div style={{fontSize:'12px',opacity:0.6}}>{filtered.length} / {families.length} aile</div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="WF- ara" style={{marginTop:'12px',width:'100%',padding:'10px 12px',borderRadius:'999px',border:'1px solid #e2e8f0'}}/>
        <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
          {filtered.map((f:any)=>{
            const active=sel===f.id;
            return <button key={f.id} onClick={()=>setSel(f.id)} style={{textAlign:'left',padding:'12px 16px',borderRadius:'999px',border:'1px solid #e2e8f0',background:active?'#0f172a':'white',color:active?'white':'#334155',fontWeight:'700'}}>{f.id}</button>
          })}
        </div>
      </div>
      <div style={{flex:1,padding:'24px',overflow:'auto'}}>
        <h1 style={{fontSize:'28px',fontWeight:'900'}}>{sel}</h1>
        <div style={{opacity:0.6}}>{members.length} kelime</div>
        <div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'8px'}}>
          {members.map((m:any)=>(
            <div key={m.id} style={{padding:'12px',borderRadius:'12px',background:'white',border:'1px solid #e2e8f0'}}>
              <b>{m.form}</b> — {m.translations?.tr||'-'} <span style={{opacity:0.5}}>· {m.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
