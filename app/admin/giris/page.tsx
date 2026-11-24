'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn, LogOut, ShieldCheck, LayoutDashboard } from 'lucide-react';

/**
 * YÖNETİCİ GİRİŞİ (/admin/giris) — AUTH-001.
 *
 * - E-posta + şifre, kontrol sunucuda (/api/auth/login)
 * - Girişsiz /admin/* ziyaretleri middleware tarafından buraya ?next= ile yönlendirilir
 * - Kayıt olma / şifre sıfırlama / sosyal giriş YOK (Baş Mimar kararı)
 */

export default function AdminGirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState<string | null>(null);

  // Yönlendirilecek hedef: yalnız dahili /admin yolu (open redirect engellenir)
  const [nextPath, setNextPath] = useState('/admin/yonetim');
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('next') || '';
    if (n.startsWith('/admin')) setNextPath(n);
  }, []);

  useEffect(() => {
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => { if (j?.authenticated) setLoggedInAs(j.email); })
      .catch(() => { /* sessiz — form yine çalışır */ });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Giriş başarısız');
      router.push(nextPath);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız');
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    setLoggedInAs(null);
    router.refresh();
  };

  const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200';

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">Yönetici Girişi</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Çerkesçe Sözlük yönetim alanı</p>
            </div>
          </div>

          {loggedInAs ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                <Lock className="h-4 w-4" aria-hidden />
                Oturum açık: <strong className="font-semibold">{loggedInAs}</strong>
              </div>
              <div className="flex gap-2">
                <a
                  href="/admin/yonetim"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  <LayoutDashboard className="h-4 w-4" aria-hidden />
                  Yönetim Merkezi
                </a>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Çıkış yap
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  E-posta
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="ornek@cerkesce.org"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" aria-hidden />
                {busy ? 'Giriş yapılıyor...' : 'Giriş yap'}
              </button>
              <p className="text-center text-xs text-slate-400">
                Hesabınız yok mu? Yönetici hesapları sistem yöneticisi tarafından tanımlanır.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
