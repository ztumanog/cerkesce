import Link from 'next/link';
import { ShieldX, Home, LogIn } from 'lucide-react';

/**
 * YETKİN YOK (/admin/yetkisiz) — AUTH-001.
 * Oturum açık ama rol bu alan için yetersizse middleware buraya yönlendirir.
 * (Şu an tek rol Yönetici olduğu için pratikte ileride eklenecek roller içindir.)
 */
export default function YetkisizPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300">
            <ShieldX className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">Yetkiniz yok</h1>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Bu alan için gerekli yönetici yetkisine sahip değilsiniz. Gerekli erişim için
            sistem yöneticinize başvurun.
          </p>
          <div className="flex justify-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Home className="h-4 w-4" aria-hidden />
              Ana sayfa
            </Link>
            <Link
              href="/admin/giris"
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Başka hesapla gir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
