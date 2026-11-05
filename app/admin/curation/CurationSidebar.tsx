'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CurationSidebar(){
  const path=usePathname();
  const isActive=(h:string)=>path===h || path?.startsWith(h+'/');
  return (
    <div style={{width:'260px',background:'white',borderRight:'1px solid #e5e7eb',display:'flex',flexDirection:'column',height:'100vh',position:'sticky',top:0}}>
      <div style={{padding:'16px',borderBottom:'1px solid #f3f4f6',display:'flex',gap:'10px',alignItems:'center'}}>
        <div style={{width:'36px',height:'36px',background:'#8b5cf6',borderRadius:'10px',display:'grid',placeItems:'center',color:'white'}}>Ç</div>
        <div><div style={{fontWeight:'800',fontSize:'13px'}}>Circassian Lexicon</div><div style={{fontSize:'11px',opacity:0.6}}>Admin Curation · v0.3</div></div>
      </div>
      <div style={{padding:'12px',flex:1,overflow:'auto'}}>
        <div style={{fontSize:'10px',letterSpacing:'1px',opacity:0.4,fontWeight:'800',margin:'12px 8px'}}>SÖZLÜK</div>
        <Link href="/admin/curation/roots" style={{display:'flex',padding:'8px 12px',borderRadius:'10px',textDecoration:'none',color:'#374151',fontSize:'13px',gap:'8px'}}>🌿 Kökler</Link>
        <Link href="/admin/curation/family" style={{display:'flex',padding:'8px 12px',borderRadius:'10px',textDecoration:'none',color:'#374151',fontSize:'13px',gap:'8px'}}>👨👩👧 Aileler</Link>
        <Link href="/admin/curation/concepts" style={{display:'flex',padding:'8px 12px',borderRadius:'10px',background:isActive('/admin/curation/concepts')?'#0f172a':'transparent',color:isActive('/admin/curation/concepts')?'white':'#374151',textDecoration:'none',fontSize:'13px',gap:'8px',justifyContent:'space-between',alignItems:'center',fontWeight:'600'}}>
          <span>💡 Kavramlar</span><span style={{background:'#8b5cf6',color:'white',padding:'2px 8px',borderRadius:'999px',fontSize:'11px'}}>500</span>
        </Link>
        <div style={{fontSize:'10px',letterSpacing:'1px',opacity:0.4,fontWeight:'800',margin:'20px 8px 12px'}}>KÜRASYON</div>
        <Link href="/admin/curation" style={{display:'flex',padding:'8px 12px',borderRadius:'10px',textDecoration:'none',color:'#374151',fontSize:'13px',gap:'8px'}}>📁 Kürasyon</Link>
        <div style={{marginLeft:'16px',borderLeft:'1px solid #f3f4f6',paddingLeft:'12px',display:'flex',flexDirection:'column',gap:'2px'}}>
          <Link href="/admin/curation/single" style={{display:'flex',justifyContent:'space-between',padding:'6px 12px',borderRadius:'8px',textDecoration:'none',fontSize:'13px',color:'#374151'}}><span>· Tekli</span><span style={{background:'#8b5cf6',color:'white',padding:'2px 6px',borderRadius:'999px',fontSize:'10px'}}>500</span></Link>
          <Link href="/admin/curation/bulk" style={{display:'flex',padding:'6px 12px',borderRadius:'8px',textDecoration:'none',fontSize:'13px',color:'#374151',gap:'6px'}}>≋ Toplu</Link>
          <Link href="/admin/curation/csv" style={{display:'flex',padding:'6px 12px',borderRadius:'8px',textDecoration:'none',fontSize:'13px',color:'#374151',gap:'6px'}}>📄 Csv</Link>
        </div>
        <div style={{fontSize:'10px',letterSpacing:'1px',opacity:0.4,fontWeight:'800',margin:'20px 8px 12px'}}>SYSTEM</div>
        <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
          <Link href="/admin/moderasyon" style={{display:'flex',justifyContent:'space-between',padding:'8px 12px',borderRadius:'10px',textDecoration:'none',color:'#7c3aed',fontSize:'13px',fontWeight:'600',background:'#f5f3ff'}}>
            <span>🛡️ Moderasyon</span><span style={{background:'#7c3aed',color:'white',padding:'2px 8px',borderRadius:'999px',fontSize:'10px'}}>Faz 12</span>
          </Link>
          <Link href="/admin/faz-kontrol" style={{display:'flex',justifyContent:'space-between',padding:'8px 12px',borderRadius:'10px',textDecoration:'none',color:'#059669',fontSize:'13px',fontWeight:'600',background:'#ecfdf5'}}>
            <span>✅ Faz Kontrol</span><span style={{background:'#059669',color:'white',padding:'2px 8px',borderRadius:'999px',fontSize:'10px'}}>4 Yeşil</span>
          </Link>
          <Link href="/explorer" style={{display:'flex',justifyContent:'space-between',padding:'8px 12px',borderRadius:'10px',textDecoration:'none',color:'#2563eb',fontSize:'13px',fontWeight:'600',background:'#eff6ff'}}>
            <span>🕸️ Explorer</span><span style={{background:'#2563eb',color:'white',padding:'2px 8px',borderRadius:'999px',fontSize:'10px'}}>Canlı</span>
          </Link>
          <Link href="/yonetim" style={{display:'flex',justifyContent:'space-between',padding:'8px 12px',borderRadius:'10px',textDecoration:'none',color:'#0f172a',fontSize:'13px',fontWeight:'600',background:'#f8fafc',border:'1px solid #e2e8f0'}}>
            <span>📊 Yönetim</span><span style={{background:'#0f172a',color:'white',padding:'2px 8px',borderRadius:'999px',fontSize:'10px'}}>/yonetim</span>
          </Link>
          <div style={{height:'1px',background:'#f3f4f6',margin:'8px 12px'}} />
          <div style={{padding:'6px 12px',fontSize:'12px',opacity:0.6}}>🗄 _meta · v0.3</div>
          <div style={{padding:'6px 12px',fontSize:'12px',opacity:0.6}}>🕒 Audit Log</div>
          <div style={{padding:'6px 12px',fontSize:'12px',color:'#8b5cf6'}}>🛡 Dry-run zorunlu</div>
        </div>
      </div>
    </div>
  )
}