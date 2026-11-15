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
  const [loading,setLoading] = useState(false);
  
  // Seçili dillerin state'i. Varsayılan: Hepsi açık.
  const [activeLangs, setActiveLangs] = useState<string[]>(["TR", "EN", "RU", "ADY", "CE/IPA", "AR RTL"]);

  useEffect(()=>{
    fetch("/data/linguistic/lexemes.json").then(r=>r.json()).then((raw:any)=>{
      const recs=Array.isArray(raw)?raw:raw.lexemes||[];
      setLexemes(recs);
    });
  },[]);

  const toggleLang = (lang: string) => {
    setActiveLangs(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const exportCSV=()=>{
    const headers=["id","form"];
    if (activeLangs.includes("TR")) headers.push("tr");
    if (activeLangs.includes("EN")) headers.push("en");
    if (activeLangs.includes("RU")) headers.push("ru");
    if (activeLangs.includes("ADY")) headers.push("ady");
    if (activeLangs.includes("AR RTL")) headers.push("ar");
    
    // Sabit yapısal sütunlar
    headers.push("rootIds","wordFamilyId","conceptId");

    const rows=lexemes.map((l:Lexeme)=>{
      const root=Array.isArray(l.rootIds)?(l.rootIds as string[]).join(";"):l.rootIds||"";
      const rowData: string[] = [l.id, l.form||""];
      
      if (activeLangs.includes("TR")) rowData.push(safeT(l,"tr"));
      if (activeLangs.includes("EN")) rowData.push(safeT(l,"en"));
      if (activeLangs.includes("RU")) rowData.push(safeT(l,"ru"));
      if (activeLangs.includes("ADY")) rowData.push(safeT(l,"ady")||safeT(l,"ad"));
      if (activeLangs.includes("AR RTL")) rowData.push(safeT(l,"ar"));
      
      rowData.push(root, l.wordFamilyId||"", l.conceptId||"");
      return rowData.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",");
    });
    const out=[headers.join(","),...rows].join("\n");
    setCsv(out);
    const blob=new Blob([out],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download=`lexemes_${new Date().toISOString().slice(0,10)}.csv`; a.click();
    setMsg(`✅ Export edildi ${lexemes.length} kayıt (Seçili Diller: ${activeLangs.join(", ")})`);
  };

  const handleImportAndSave=async()=>{
    if(!csv.trim()){ setMsg("❌ CSV boş"); return; }
    setLoading(true);
    try{
      const lines=csv.trim().split("\n");
      const headers=lines[0].split(",").map(h=>h.replace(/"/g,"").trim());
      const updates: any[]=[];
      
      for(let i=1;i<lines.length;i++){
        const cols=lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c=>c.replace(/^"|"$/g,"").replace(/""/g,'"'));
        const obj:any={};
        headers.forEach((h,idx)=>obj[h]=cols[idx]||"");
        if(!obj.id) continue;
        
        // Sadece CSV'de olan dilleri güncelle
        const trans:any = {};
        if (headers.includes("tr") && activeLangs.includes("TR")) trans.tr = obj.tr;
        if (headers.includes("en") && activeLangs.includes("EN")) trans.en = obj.en;
        if (headers.includes("ru") && activeLangs.includes("RU")) trans.ru = obj.ru;
        if (headers.includes("ady") && activeLangs.includes("ADY")) trans.ady = obj.ady;
        if (headers.includes("ar") && activeLangs.includes("AR RTL")) trans.ar = obj.ar;

        updates.push({
          id: obj.id,
          patch: {
            translations: trans,
            rootIds: obj.rootIds ? obj.rootIds.split(";").map((s:string)=>s.trim()).filter(Boolean) : undefined,
            wordFamilyId: obj.wordFamilyId,
            conceptId: obj.conceptId
          }
        });
      }
      
      const res=await fetch("/api/admin/curation/update-lexemes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({updates})
      });
      if(!res.ok) throw new Error("kayıt hatası");
      setMsg(`✅ Import & Save başarılı ${updates.length} kayıt • Backup alındı`);
    }catch(e){ setMsg(`❌ ${(e as Error).message}`); }
    finally { setLoading(false); }
  };

  return (
    <div style={{display:"flex",minHeight:"100vh",gap:16,background:"#eef2f7",padding:16}}>
      <div style={{flex:1,borderRadius:18,border:"1px solid #e2e8f0",background:"#fff",padding:28}}>
        <h2 style={{fontSize:28,fontWeight:900}}>CSV Kürasyon • 6 Dil / 2 Buton</h2>
        <p style={{color:"#475569",marginTop:4}}>TR, EN, RU, ADYĞECE, ÇERKESÇE, ARAPÇA + KÖK, AİLE, KAVRAM • WCAG AA</p>

        {/* Butonlar ve Mesaj */}
        <div style={{marginTop:20,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
          <button onClick={exportCSV} style={{borderRadius:12,padding:"12px 20px",background:"#fff",border:"2px solid #64748b",fontWeight:800}}>📤 Export CSV</button>
          
          <label style={{borderRadius:12,padding:"12px 20px",background:"#0ea5e9",color:"#fff",fontWeight:800,cursor:"pointer",display:"inline-block"}}>
            {loading ? "⏳ İşleniyor..." : "📁 CSV Dosyası Seç"}
            <input type="file" accept=".csv,text/csv" style={{display:"none"}}
              onChange={(e) => {
                const f = e.target.files?.[0]; if(!f) return;
                const r = new FileReader();
                r.onload = () => {
                  const text = String(r.result ?? "");
                  setCsv(text);
                  setMsg(`✅ ${f.name} yüklendi (${text.split("\n").length - 1} satır)`);
                };
                r.readAsText(f, "utf-8");
              }}
            />
          </label>
          
          <button onClick={handleImportAndSave} disabled={loading} style={{borderRadius:12,padding:"12px 20px",background:"#7c3aed",color:"#fff",fontWeight:900,opacity:loading?0.6:1}}>
            {loading ? "Kaydediliyor..." : "📥 Import & Save (Birleşik)"}
          </button>
          
          <span style={{marginLeft:12,fontSize:13,alignSelf:"center",fontWeight:600,color:msg.includes("❌")?"#dc2626":"#16a34a"}}>{msg}</span>
        </div>

        {/* Dil Seçim Kutuları */}
        <div style={{marginTop:20,display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,fontSize:12}}>
          {[
            {l:"TR",c:"#eaf4ff",b:"#38bdf8"},
            {l:"EN",c:"#eaffea",b:"#4ade80"},
            {l:"RU",c:"#fef2f2",b:"#f87171"},
            {l:"ADY",c:"#f0fdfa",b:"#2dd4bf"},
            {l:"CE/IPA",c:"#f5f0ff",b:"#a78bfa"},
            {l:"AR RTL",c:"linear-gradient(135deg,#fef3c7,#a78bfa)",b:"#c4b5fd"},
          ].map(x=>{
            const isActive = activeLangs.includes(x.l);
            return (
              <div 
                key={x.l} 
                onClick={() => toggleLang(x.l)}
                style={{
                  borderRadius:12,
                  border:`2px solid ${x.b}`,
                  background: isActive ? x.c : "#f1f5f9",
                  padding:12,
                  textAlign:"center",
                  fontWeight:800,
                  cursor:"pointer",
                  opacity: isActive ? 1 : 0.4,
                  transition: "all 0.2s",
                  userSelect: "none"
                }}
              >
                {x.l}<br/>
                <span style={{fontSize:10}}>{isActive ? "✓ Seçili" : "✗ Pasif"}</span>
              </div>
            );
          })}
        </div>

        {/* CSV Metin Alanı */}
        <textarea 
          value={csv} 
          onChange={e=>setCsv(e.target.value)} 
          placeholder="CSV buraya yapıştır veya Export sonrası burada gör..." 
          style={{marginTop:20,width:"100%",minHeight:400,borderRadius:12,border:"2px solid #cbd5e1",padding:12,fontFamily:"monospace",fontSize:12}}
        />
      </div>
    </div>
  );
}
