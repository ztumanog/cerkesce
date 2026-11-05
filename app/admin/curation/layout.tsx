import Link from "next/link";
import CurationSidebar from './CurationSidebar';
export default function CurationLayout({children}:{children:React.ReactNode}){
  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <div style={{flex:'0 0 260px'}}><CurationSidebar /></div>
      <div style={{flex:'1 1 0', display:'flex', minWidth:0, overflow:'hidden'}}>{children}</div>
    </div>
  );
}

      {/* SISTEM - Yonetim Linkleri */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="px-3 mb-2 text- font-black tracking-widest text-gray-400">SİSTEM</div>
        <Link href="/admin/moderasyon" className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-violet-50 transition group">
          <span className="text-sm font-medium group-hover:text-violet-700">🛡️ Moderasyon</span>
          <span className="text- bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold">Faz 12</span>
        </Link>
        <Link href="/admin/faz-kontrol" className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-green-50 transition group">
          <span className="text-sm font-medium group-hover:text-green-700">✅ Faz Kontrol</span>
          <span className="text- bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">4 Yeşil</span>
        </Link>
        <Link href="/explorer" className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 transition group">
          <span className="text-sm font-medium group-hover:text-blue-700">🕸️ Explorer</span>
          <span className="text- bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Canlı</span>
        </Link>
        <Link href="/yonetim" className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 transition">
          <span className="text-sm font-medium">📊 Yönetim Merkezi</span>
          <span className="text- bg-gray-100 px-2 py-0.5 rounded-full">/yonetim</span>
        </Link>
      </div>

