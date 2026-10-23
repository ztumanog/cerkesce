// TASLAK: Bu sayfa deneme amacli olusturuldu, henuz tamamlanmadi.
import Link from "next/link";

export default function YonetimPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <h1 className="text-3xl font-bold mb-8">Yönetim Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/sozluk" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
          <h2 className="text-xl font-semibold">Sözlük</h2>
          <p className="text-sm text-slate-500 mt-2">Arama, kelime kartları</p>
        </Link>
        <Link href="/sozluk/favoriler" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
          <h2 className="text-xl font-semibold">Favoriler</h2>
          <p className="text-sm text-slate-500 mt-2">Favori kelimeler</p>
        </Link>
        <Link href="/sozluk/kaydedilenler" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
          <h2 className="text-xl font-semibold">Kaydedilenler</h2>
          <p className="text-sm text-slate-500 mt-2">Kaydedilmiş kelimeler</p>
        </Link>
        <Link href="/sozluk/morphology" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
          <h2 className="text-xl font-semibold">Morpholoji</h2>
          <p className="text-sm text-slate-500 mt-2">Kök, ek, çekim</p>
        </Link>
        <Link href="/sozluk/converter" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
          <h2 className="text-xl font-semibold">Converter</h2>
          <p className="text-sm text-slate-500 mt-2">Lehçe dönüştürücü</p>
        </Link>
        <Link href="/kaynaklar" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
          <h2 className="text-xl font-semibold">Kaynaklar</h2>
          <p className="text-sm text-slate-500 mt-2">Sözlük kaynakları</p>
        </Link>
      </div>
    </div>
  );
}
