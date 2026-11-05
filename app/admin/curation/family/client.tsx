
'use client';
import { useState, useMemo } from 'react';

const MOCK = [
  { cer:'wa', tr:'su', kavram:'PSU *wa-', durum:'Onaylandi', id:'WF-1E-001', color:'green' },
  { cer:'kʷa', tr:'ateş', kavram:'— Kavramsız', durum:'Kavramsız', id:'WF-1E-002', color:'yellow' },
  { cer:'psa', tr:'köpek', kavram:'PSU *psa-', durum:'Root var', id:'WF-1E-003', color:'blue' },
  { cer:'bza', tr:'ekmek', kavram:'N/A · İnceleme bekleniyor', durum:'İnceleme', id:'WF-1E-004', color:'red' },
];

export default function Client({initialFamilies, initialLexemes}:{initialFamilies:any[], initialLexemes:any[]}){
  const [sel,setSel]=useState('WF-1E');
  const rows = MOCK;

  return (
    <div style={{display:'flex', minHeight:'100vh', background:'#f8fafc', fontFamily:'Inter, system-ui'}}>
      {/* SIDEBAR */}
      <div style={{width:'300px', background:'#1e345d', color:'white', display:'flex', flexDirection:'column', padding:'24px 16px', borderRadius:'0 24px 24px 0'}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'40px'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'999px', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center'}}>🌿</div>
          <div><div style={{fontWeight:'800', letterSpacing:'0.5px', lineHeight:'1.1'}}>KAVRAM</div><div style={{opacity:0.7}}>SÖZLÜĞÜ</div></div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
          <div style={{padding:'12px 16px', opacity:0.7}}>⊞ Genel</div>
          <div style={{padding:'14px 16px', background:'#2e4a8a', borderRadius:'16px', fontWeight:'700'}}>📁 Aileler</div>
          <div style={{padding:'12px 16px', opacity:0.7}}>💡 Kavramlar</div>
          <div style={{padding:'12px 16px', opacity:0.7}}>↕ İçe Aktar</div>
          <div style={{padding:'12px 16px', opacity:0.7}}>⚙ Ayarlar</div>
        </div>
        <div style={{marginTop:'auto', display:'flex', alignItems:'center', gap:'12px', padding:'12px', background:'rgba(0,0,0,0.2)', borderRadius:'12px'}}>
          <div style={{width:'40px', height:'40px', borderRadius:'999px', background:'#3b82f6', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'800'}}>KA</div>
          <div><div style={{fontWeight:'700'}}>Kemal Arıkan</div><div style={{fontSize:'12px', opacity:0.6}}>Editör</div></div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1, padding:'24px 32px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{color:'#64748b'}}>Aileler / {sel}</div>
            <h1 style={{fontSize:'42px', fontWeight:'900', color:'#1e345d', margin:'4px 0'}}>Aileler · {sel}</h1>
            <div style={{color:'#64748b'}}>Köklü kavram aileleri · {initialFamilies.length} aile gösteriliyor</div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'12px', alignItems:'flex-end'}}>
            <button style={{border:'1px solid #cbd5e1', padding:'10px 20px', borderRadius:'12px', background:'white', fontWeight:'600'}}>Filtrele</button>
            <button style={{background:'#1e40af', color:'white', padding:'12px 24px', borderRadius:'12px', fontWeight:'700'}}>+ Yeni Kavram</button>
          </div>
        </div>

        <div style={{marginTop:'24px', background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:'12px', padding:'16px 20px', display:'flex', alignItems:'center', gap:'20px'}}>
          <b style={{fontSize:'20px'}}>Durum Gösterge</b>
          <span><span style={{color:'#22c55e'}}>●</span> Kavramlı</span>
          <span><span style={{color:'#eab308'}}>●</span> Kavramsız</span>
          <span><span style={{color:'#3b82f6'}}>●</span> Root var</span>
        </div>

        <div style={{marginTop:'24px', background:'white', borderRadius:'16px', overflow:'hidden', border:'1px solid #e2e8f0'}}>
          <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1.8fr 1fr', padding:'14px 20px', background:'#f1f5f9', fontWeight:'800', color:'#334155'}}>
            <div>ÇERKESÇE</div><div>TR ANLAM</div><div>KAVRAM/ROOT</div><div>ID</div>
          </div>
          {rows.map(r=>{
            const bg = r.color==='green'?'#dcfce7': r.color==='yellow'?'#fef9c3': r.color==='blue'?'#dbeafe':'#f3e8ff';
            const border = r.color==='green'?'#22c55e': r.color==='yellow'?'#eab308': r.color==='blue'?'#3b82f6':'#ef4444';
            return (
              <div key={r.id} style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1.8fr 1fr', padding:'16px 20px', background:bg, borderLeft:'8px solid '+border, alignItems:'center'}}>
                <div style={{fontWeight:'700', fontSize:'18px'}}>{r.cer}</div>
                <div style={{fontWeight:'600'}}>{r.tr}</div>
                <div style={{display:'flex', gap:'8px', alignItems:'center'}}>{r.kavram} <span style={{background:'rgba(0,0,0,0.1)', padding:'2px 10px', borderRadius:'999px', fontSize:'12px'}}>{r.durum}</span></div>
                <div style={{color:'#64748b'}}>{r.id}</div>
              </div>
            )
          })}
        </div>

        <div style={{marginTop:'12px', background:'#f1f5f9', borderRadius:'12px', padding:'12px 20px', display:'flex', justifyContent:'space-between', color:'#64748b'}}>
          <div>Toplam {rows.length} satır · Sayfa 1 / 1</div>
          <div>‹ Önceki <span style={{background:'#1e40af', color:'white', padding:'2px 10px', borderRadius:'999px'}}>1</span> Sonraki ›</div>
        </div>
      </div>
    </div>
  )
}
