import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { loadProposals } from '@/lib/moderation/proposalStore';
import { GovernanceDashboardViewService } from '@/infra/ui/GovernanceDashboardViewService';
import { OperationsDashboardViewService } from '@/infra/ui/OperationsDashboardViewService';
import { IntelligenceDashboardViewService } from '@/infra/ui/IntelligenceDashboardViewService';

/**
 * GÜNLÜK ÖZET (/yonetim/executive)
 *
 * Baş Mimar'ı ilgilendiren günlük manzara — vatandaş diliyle:
 * - Bugün kaç öneri geldi, kaçı onay bekliyor
 * - Bugün sözlükte kaç değişiklik yapıldı (denetim kaydından)
 * - Sorun varsa: sorun ne + nereden çözülür (kart tıklanınca ilgili panoya gider)
 *
 * Eski /executive adresi bu sayfaya yönlendirilir (next.config redirects).
 */

export const dynamic = 'force-dynamic';

const LING_DIR = path.join(process.cwd(), 'public/data/linguistic');

function fileSafe(name: string): { exists: boolean; sizeMb: string; modified: string } {
  try {
    const p = path.join(LING_DIR, name);
    if (!fs.existsSync(p)) return { exists: false, sizeMb: '—', modified: '—' };
    const st = fs.statSync(p);
    return {
      exists: true,
      sizeMb: (st.size / 1024 / 1024).toFixed(1),
      modified: new Date(st.mtimeMs).toLocaleString('tr-TR'),
    };
  } catch {
    return { exists: false, sizeMb: '—', modified: '—' };
  }
}

function todayIsoPrefix(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Bugünkü sözlük değişikliklerini denetim kaydından (audit_log.jsonl) sayar. */
function countTodayAuditChanges(): { changes: number; records: number } {
  try {
  const p = path.join(LING_DIR, 'audit_log.jsonl');
    if (!fs.existsSync(p)) return { changes: 0, records: 0 };
    const lines = fs.readFileSync(p, 'utf-8').trim().split('\n').filter(Boolean).slice(-500);
    const today = todayIsoPrefix();
    let changes = 0;
    let records = 0;
    for (const line of lines) {
      try {
        const e = JSON.parse(line);
        if (String(e.timestamp || '').startsWith(today)) {
          changes += 1;
          records += Array.isArray(e.diff) ? e.diff.length : 0;
        }
      } catch { /* bozuk satırı atla */ }
    }
    return { changes, records };
  } catch {
    return { changes: 0, records: 0 };
  }
}

const PANEL_STATUS_TR: Record<string, { text: string; cls: string }> = {
  ok: { text: 'Sorun yok', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  warning: { text: 'Dikkat gerekiyor', cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  critical: { text: 'Müdahale gerekli', cls: 'bg-rose-100 text-rose-800 border-rose-200' },
};

export default function GunlukOzetPage() {
  const proposals = loadProposals();
  const pending = proposals.filter((p) => p.status === 'PENDING');
  const approved = proposals.filter((p) => p.status === 'APPROVED');
  const today = todayIsoPrefix();
  const todayProposals = proposals.filter((p) => String((p as any).createdAt || '').startsWith(today));
  const audit = countTodayAuditChanges();
  const lex = fileSafe('lexemes.json');

  const gov = GovernanceDashboardViewService.getView();
  const ops = OperationsDashboardViewService.getView();
  const intel = IntelligenceDashboardViewService.getView();

  const panels = [
    {
      href: '/admin/yonetim/governance',
      title: 'Kararlar ve İşler',
      status: gov.overallStatus,
      detail: gov.summary,
      action: gov.overallStatus === 'ok' ? 'Yapılacak bir şey yok — karar defteri tutarlı.' : 'Yarım kalan işleri görmek ve ne yapılacağını okumak için tıklayın.',
    },
    {
      href: '/admin/yonetim/intelligence',
      title: 'Öneriler',
      status: intel.overallStatus,
      detail: `${pending.length} öneri onay bekliyor`,
      action: pending.length > 0 ? 'Önerileri kabul etmek veya reddetmek için tıklayın.' : 'Yeni öneri yok — Kelime Öner sayfasından gelenler burada listelenir.',
    },
    {
      href: '/admin/yonetim/operations',
      title: 'Sistem Sağlığı',
      status: ops.overallStatus,
      detail: ops.summary,
      action: ops.overallStatus === 'ok' ? 'Sistem sağlıklı görünüyor.' : 'Sorunun ne olduğunu ve çözümünü okumak için tıklayın.',
    },
  ];

  const stats = [
    { label: 'Bugün gelen öneri', value: String(todayProposals.length), sub: `${proposals.length} öneri toplam` },
    { label: 'Onay bekleyen', value: String(pending.length), sub: `${approved.length} öneri onaylandı` },
    { label: 'Bugünkü sözlük değişikliği', value: String(audit.changes), sub: `${audit.records} kayıt alanı güncellendi` },
    { label: 'Sözlük verisi', value: lex.exists ? `${lex.sizeMb} MB` : 'EKSİK', sub: lex.exists ? `Son güncelleme: ${lex.modified}` : 'lexemes.json bulunamadı!' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Günlük Özet</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Sözlüğün bugünkü manzarası: gelen öneriler, yapılan değişiklikler ve dikkat gerektiren konular.
              </p>
            </div>
            <Link href="/admin/yonetim" className="text-sm font-medium text-blue-600 hover:text-blue-800">&larr; Yönetim</Link>
          </div>
        </div>

        {/* Sayısal özet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</div>
              <div className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">{s.value}</div>
              <div className="mt-1 text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Dikkat gerektiren konular — kart tıklanınca ilgili panoya */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Dikkat Gerektiren Konular</h2>
          <p className="text-xs text-slate-400">Karta tıklayınca sorunun detayına ve ne yapmanız gerektiğine gidersiniz.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {panels.map((p) => {
              const st = PANEL_STATUS_TR[p.status] || PANEL_STATUS_TR.warning;
              return (
                <Link key={p.href} href={p.href} className="group rounded-xl border border-slate-200 dark:border-slate-800 p-4 transition hover:border-blue-300 hover:bg-blue-50/40 dark:hover:bg-slate-800">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700">{p.title}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${st.cls}`}>{st.text}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{p.action}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
