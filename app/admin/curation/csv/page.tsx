"use client";
import { useEffect, useState } from "react";

type Lexeme = { id: string; form?: string; translations?: any; rootIds?: any; wordFamilyId?: string; conceptId?: string; [k:string]:any };

function safeT(d:Lexeme|null, lang:string){
  if(!d||!d.translations) return "";
  return (d.translations as any)[lang] || "";
}

export default function CSVPage(){
  const [lexemes,setLexemes]=useState<Lexeme[]>([]);
  const [msg,setMsg]=useState("");
  const [csv,setCsv]=useState("");

  useEffect(()=>{
    fetch("/data/linguistic/lexemes.json").then(r=>r.json()).then((raw:any)=>{
      const recs=Array.isArray(raw)?raw:raw.lexemes||[];
      setLexemes(recs);
    });
  },[]);

  const exportCSV=()=>{
    const headers=["id","form","tr","en","ru","ady","ar","rootIds","wordFamilyId","conceptId"];
    const rows=lexemes.map((l:Lexeme)=>{
      const root=Array.isArray(l.rootIds)?(l.rootIds as string[]).join(";"):l.rootIds||"";
      return [l.id,l.form||"",safeT(l,"tr"),safeT(l,"en"),safeT(l,"ru"),safeT(l,"ady")||safeT(l,"ad"),safeT(l,"ar"),root,l.wordFamilyId||"",l.conceptId||""].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",");
    });
    const out=[headers.join(","),...rows].join("\n");
    setCsv(out);
    const blob=new Blob([out],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download=`lexemes_${new Date().toISOString().slice(0,10)}.csv`; a.click();
    setMsg(`✅ Export edildi ${lexemes.length} kayıt`);
  };

  const handleImportAndSave=async()=>{
    if(!csv.trim()){ setMsg("❌ CSV boş"); return; }
    try{
      const lines=csv.trim().split("\n");
      const headers=lines[0].split(",").map(h=>h.replace(/"/g,"").trim());
      const updates: Lexeme[]=[];
      for(let i=1;i<lines.length;i++){
        const cols=lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c=>c.replace(/^"|"$/g,"").replace(/""/g,'"'));
        const obj:any={};
        headers.forEach((h,idx)=>obj[h]=cols[idx]||"");
        if(!obj.id) continue;
        updates.push({
          id: obj.id,
          form: obj.form,
          translations: { tr: obj.tr, en: obj.en, ru: obj.ru, ady: obj.ady, ar: obj.ar },
          rootIds: obj.rootIds?obj.rootIds.split(";").map((s:string)=>s.trim()).filter(Boolean):[],
          wordFamilyId: obj.wordFamilyId,
          conceptId: obj.conceptId
        });
      }
      const res=await fetch("/api/admin/curation/update-lexemes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({updates})});
      if(!res.ok) throw new Error("kayıt hatası");
      setMsg(`✅ Import & Save başarılı ${updates.length} kayıt • Backup alındı`);
    }catch(e){ setMsg(`❌ ${(e as Error).message}`); }
  };

  return (
    <div style={{display:"flex",minHeight:"100vh",gap:16,background:"#eef2f7",padding:16}}>
      <div style={{flex:1,borderRadius:18,border:"1px solid #e2e8f0",background:"#fff",padding:28}}>
        <h2 style={{fontSize:28,fontWeight:900}}>CSV Kürasyon • 6 Dil / 2 Buton</h2>
        <p style={{color:"#475569",marginTop:4}}>TR, EN, RU, ADYĞECE, ÇERKESÇE, ARAPÇA + KÖK, AİLE, KAVRAM • WCAG AA</p>

        <div style={{marginTop:20,display:"flex",gap:12}}>
          <button onClick={exportCSV} style={{borderRadius:12,padding:"12px 20px",background:"#fff",border:"2px solid #64748b",fontWeight:800}}>📤 Export CSV</button>
          <button onClick={handleImportAndSave} style={{borderRadius:12,padding:"12px 20px",background:"#7c3aed",color:"#fff",fontWeight:900}}>📥 Import & Save (Birleşik)</button>
          <span style={{marginLeft:12,fontSize:13,alignSelf:"center"}}>{msg}</span>
        </div>

        <div style={{marginTop:20,display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,fontSize:12}}>
          {[
            {l:"TR",c:"#eaf4ff",b:"#38bdf8"},
            {l:"EN",c:"#eaffea",b:"#4ade80"},
            {l:"RU",c:"#fef2f2",b:"#f87171"},
            {l:"ADY",c:"#f0fdfa",b:"#2dd4bf"},
            {l:"CE/IPA",c:"#f5f0ff",b:"#a78bfa"},
            {l:"AR RTL",c:"linear-gradient(135deg,#fef3c7,#a78bfa)",b:"#c4b5fd"},
          ].map(x=><div key={x.l} style={{borderRadius:12,border:`2px solid ${x.b}`,background:x.c,padding:12,textAlign:"center",fontWeight:800}}>{x.l}<br/><span style={{fontSize:10}}>✓ Düzenlenebilir</span></div>)}
        </div>

        <textarea value={csv} onChange={e=>setCsv(e.target.value)} placeholder="CSV buraya yapıştır veya Export sonrası burada gör..." style={{marginTop:20,width:"100%",minHeight:400,borderRadius:12,border:"2px solid #cbd5e1",padding:12,fontFamily:"monospace",fontSize:12}}/>

        <div style={{marginTop:12,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          <div style={{border:"2px solid #64748b",borderRadius:12,padding:10,fontSize:12}}>KÖK: R-GU • virgülle</div>
          <div style={{border:"2px solid #64748b",borderRadius:12,padding:10,fontSize:12}}>AİLE: WF-GU</div>
          <div style={{border:"2px solid #64748b",borderRadius:12,padding:10,fontSize:12}}>KAVRAM: concept_*</div>
          <div style={{border:"2px solid #64748b",borderRadius:12,padding:10,fontSize:12}}>LEHÇE: adige</div>
        </div>
      </div>
    </div>
  );
}