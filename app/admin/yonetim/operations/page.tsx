import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { OperationsDashboardViewService } from '@/infra/ui/OperationsDashboardViewService';

/**
 * SİSTEM SAĞLIĞI (/admin/yonetim/operations)
 *
 * - Gerçek kontroller: sözlük veri dosyaları var mı, boyutları ne, en son
 *   ne zaman güncellendi (uydurma uyarı yok — fs kontrolleri)
 * - Kapasite / erişilebilirlik / uyarı sayıları OperationsDashboardViewService'ten
 *   (sayılar doğruydu) — üstüne "ne yapmam lazım" eklendi
 * - Hata yoksa "yapılacak bir şey yok" der
 */

export const dynamic = 'force-dynamic';

const LING_DIR = path.join(process.cwd(), 'public/data/linguistic');

interface FileCheck {
  name: string;
  label: string;
  exists: boolean;
  sizeMb: string;
  modified: string;
  fixHint: string;
}

function checkFile(name: string, label: string): FileCheck {
  try {
    const p = path.join(LING_DIR, name);
    if (!fs.existsSync(p)) {
      return { name, label, exists: false, sizeMb: '—', modified: '—', fixHint: `${name} dosyası eksik — public/data/linguistic/ altındaki .bak-* yedeklerinden en yeni olanı geri yükleyin.` };
    }
    const st = fs.statSync(p);
    return {
      name, label, exists: true,
      sizeMb: (st.size / 1024 / 1024).toFixed(1),
      modified: new Date(st.mtimeMs).toLocaleString('tr-TR'),
      fixHint: '',
    };
  } catch {
    return { name, label, exists: false, sizeMb: '—', modified: '—', fixHint: `${name} kontrol edilemedi — dosya izinlerini kontrol edin.` };
  }
}

/** Denetim kaydından son kayıt bilgisi. */
function lastAuditInfo(): string | null {
  try {
    const p = path.join(LING_DIR, 'audit_log.jsonl');
    if (!fs.existsSync(p)) return null;
    const lines = fs.readFileSync(p, 'utf-8').trim().split('\n').filter(Boolean);
    if (lines.length === 0) return null;
    const last = JSON.parse(lines[lines.length - 1]);
    const when = String(last.timestamp || '').slice(0, 19).replace('T', ' ');
    return `Son denetim kaydı: ${when} — ${last.action || 'kayıt'} (${(last.diff || []).length} alan değişikliği)`;
  } catch {
    return null;
  }
}

const WIDGET_TR: Record<string, { title: string }> = {
  health: { title: 'Servis Durumu' },
  capacity: { title: 'Kapasite' },
  slo: { title: 'Erişilebilirlik' },
  alerts: { title: 'Uyarılar' },
};

export default function SistemSagligiPage() {
  const files = [
    checkFile('lexemes.json', 'Sözlük kayıtları'),
    checkFile('roots.json', 'Kök kayıtları'),
    checkFile('word_families.json', 'Kelime aileleri'),
    checkFile('concept-words.json', 'Kavram sözlüğü'),
    checkFile('moderation_proposals.json', 'Kelime önerileri'),
  ];
  const missing = files.filter((f) => !f.exists);
  const view = OperationsDashboardViewService.getView();
  const auditInfo = lastAuditInfo();
  const allOk = missing.length === 0 && view.overallStatus === 'ok';

  const statusCls = (s: string) =>
    s === 'ok'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : s === 'warning'
        ? 'bg-amber-100 text-amber-800 border-amber-200'
        : 'bg-rose-100 text-rose-800 border-rose-200';
  const statusTr = (s: string) => (s === 'ok' ? 'Sorun yok' : s === 'warning' ? 'Dikkat' : 'Müdahale gerekli');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sistem Sağlığı</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Site ayakta mı, veri dosyaları yerli yerinde mi, son kayıt ne — ve bir sorun varsa ne yapmanız gerektiği.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/yonetim/operations/details" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">Uyarı detayları &rarr;</Link>
              <Link href="/admin/yonetim" className="text-sm font-medium text-blue-600 hover:text-blue-800">&larr; Yönetim</Link>
            </div>
          </div>
          {allOk && (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              ✓ Yapılacak bir şey yok — veri dosyaları ve sistem göstergeleri sağlıklı görünüyor.
            </div>
          )}
        </div>

        {/* Veri dosyası kontrolleri — gerçek fs kontrolleri */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Veri Dosyaları</h2>
          <div className="space-y-2">
            {files.map((f) => (
              <div key={f.name} className={`rounded-xl border p-3 ${f.exists ? 'border-slate-200 dark:border-slate-800' : 'border-rose-300 bg-rose-50'}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${f.exists ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'}`}>
                    {f.exists ? '✓ Var' : '✗ EKSİK'}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{f.label}</span>
                  <span className="font-mono text-xs text-slate-500">{f.name}</span>
                  {f.exists && (
                    <span className="ml-auto text-xs text-slate-400">{f.sizeMb} MB · güncelleme: {f.modified}</span>
                  )}
                </div>
                {!f.exists && <p className="mt-1 text-xs text-rose-700">Ne yapmalı: {f.fixHint}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Sistem göstergeleri — sayılar mevcut servisten, Türkçe karşılıklarla */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sistem Göstergeleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {view.widgets.map((w) => {
              const tr = WIDGET_TR[w.id] || { title: w.title };
              return (
                <div key={w.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{tr.title}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusCls(w.status)}`}>{statusTr(w.status)}</span>
                  </div>
                  <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{w.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{w.details}</div>
                  {w.status !== 'ok' && (
                    <p className="mt-2 text-xs text-amber-700">
                      Ne yapmalı: {w.id === 'capacity' ? 'Bellek kullanımı yüksekse sunucu belleğini artırın ya da önbelleği temizleyin.' : w.id === 'slo' ? 'Erişilebilirlik düştüyse dağıtım günlüklerini kontrol edin.' : w.id === 'alerts' ? 'Uyarı detayları için "Uyarı detayları" bağlantısına bakın.' : 'Sunucu günlüklerini kontrol edin.'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Son kayıt */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Son Kayıt</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {auditInfo || 'Denetim kaydı henüz yok — sözlükte değişiklik yapıldıkça burada görünecek.'}
          </p>
        </div>
      </div>
    </div>
  );
}
