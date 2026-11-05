
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function FamilyDetail(){
  const params=useParams();
  const router=useRouter();
  const id=params?.id as string;
  const [lexemes,setLexemes]=useState<any[]>([]);

  useEffect(()=>{
    fetch('/data/linguistic/lexemes.json').then(r=>r.json()).then(raw=>{
      const lex=Array.isArray(raw)?raw:(raw.lexemes??[]);
      // Doğrudan lexeme.json'dan filtrele - family dosyasına bakma
      const filt=lex.filter((l:any)=>l.wordFamilyId===id);
      setLexemes(filt);
    }).catch(()=>{});
  },[id]);

  return (
    <div style={{padding:'20px', maxWidth:'900px', margin:'0 auto'}}>
      <button onClick={()=>router.back()} style={{marginBottom:'12px',padding:'6px 12px',borderRadius:'8px',border:'1px solid #e2e8f0',background:'white',cursor:'pointer'}}>← Geri</button>
      <h1 style={{fontSize:'28px', fontWeight:'900'}}>{id} <span style={{fontSize:'14px', opacity:0.5}}>· {lexemes.length} lexeme</span></h1>
      <div style={{marginTop:'4px', fontSize:'12px', opacity:0.6}}>Kaynak: lexemes.json → wordFamilyId === {id}</div>
      
      <div style={{marginTop:'16px', display:'flex', flexDirection:'column', gap:'8px'}}>
        {lexemes.length===0 && <div style={{padding:'20px',background:'#fefce8',borderRadius:'12px'}}>Bu family ID için lexeme bulunamadı. WF-GU, WF-SHHYE gibi deneyin.</div>}
        {lexemes.slice(0,500).map((m:any)=>{
          const hasConcept=!!m.conceptId;
          return (
            <div key={m.id} onClick={()=>router.push(`/admin/curation/${m.id}`)} style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr 0.8fr', gap:'8px', padding:'12px', borderRadius:'12px', background: hasConcept?'#f0fdf4':'#fefce8', borderLeft:`6px solid ${hasConcept?'#22c55e':'#facc15'}`, borderTop:'1px solid #e2e8f0', borderRight:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0', cursor:'pointer'}}>
              <span style={{fontWeight:'bold'}}>{m.form}</span>
              <span>{m.translations?.tr||''}</span>
              <span style={{fontSize:'11px'}}>{m.conceptId||'Kavramsız'}</span>
              <span style={{fontFamily:'monospace', fontSize:'10px', opacity:0.6}}>{m.id}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}
