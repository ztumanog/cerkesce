import Link from 'next/link';
import { loadGovReport, formatGeneratedAt, isGovReportStale, HealthReport } from '@/infra/governance/govReports';
import StaleReportBanner from '@/components/governance/StaleReportBanner';

/**
 * ADR-GOV-016 — Veri Sağlığı (/admin/yonetim/veri-sagligi)
 *
 * public/admin-reports/health.json'u okur ve gösterir (RULE-01: salt-okunur).
 * Rapor yoksa uydurma sayı gösterilmez; üretim komutu söylenir.
 */

export const dynamic = 'force-dynamic';

export default function VeriSagligiPage() {
  const report = loadGovReport<HealthReport>('health.json');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">ADR-GOV-016</p>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Veri Sağlığı</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Hangi alan ne kadar dolu, ne kadarı hâlâ eksik? Sayılar JSON raporundan okunur.
              </p>
            </div>
            <Link href="/admin/yonetim" className="text-sm font-medium text-blue-600 hover:text-blue-800">&larr; Yönetim</Link>
          </div>
          {report && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                Son rapor: {formatGeneratedAt(report.generatedAt)}
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                JSON&apos;dan okunuyor
              </span>
              <span className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-500">
                Salt okunur — düzeltme akışı bu ekranın dışında
              </span>
            </div>
          )}
        </div>

        {!report ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-12 text-center">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rapor bulunamadı (public/admin-reports/health.json)</p>
            <p className="mt-2 text-sm text-slate-500">Üretmek için: <code className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs">npm run report:governance</code></p>
          </div>
        ) : (
          <>
            <StaleReportBanner stale={isGovReportStale(report)} />

            {/* Sayım + bütünlük kartları */}
            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'Lexeme', value: report.lexemes, desc: 'Sözlükteki tüm kayıt', ok: true },
                { label: 'Kök', value: report.roots, desc: 'Tanımlı kök havuzu', ok: true },
                { label: 'Word Family', value: report.wordFamilies, desc: 'Tanımlı aile', ok: true },
                {
                  label: 'Bütünlük',
                  value: report.duplicateIds + report.brokenRootRefs + report.brokenWordFamilyRefs,
                  desc: 'Mükerrer ID + kırık kök/WF referansı',
                  ok: report.duplicateIds + report.brokenRootRefs + report.brokenWordFamilyRefs === 0,
                  zeroIsGood: true,
                },
              ].map((c) => (
                <article
                  key={c.label}
                  className={`rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-900 ${c.ok ? 'border-slate-200 dark:border-slate-800' : 'border-rose-300'}`}
                  style={c.ok ? undefined : { borderLeft: '5px solid #e11d48' }}
                >
                  <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100">{c.label}</p>
                  <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    {c.value.toLocaleString('tr-TR')}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
                  <p className={`mt-2 border-t border-slate-100 pt-2 text-[11px] ${c.ok ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {c.ok ? '✓ Sağlıklı' : '✗ Dikkat gerektiriyor'}
                  </p>
                </article>
              ))}
            </section>

            {/* Doluluk çubukları */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Doluluk</h2>
              <p className="mt-1 text-sm text-slate-500">Kayıt başına alan doluluğu — {report.lexemes.toLocaleString('tr-TR')} lexeme üzerinden.</p>
              <div className="mt-5 space-y-6">
                {[
                  {
                    label: 'Word Family doluluk', pct: report.fill.wordFamilyFillPct,
                    filled: report.lexemes - report.fill.wordFamilyEmpty, empty: report.fill.wordFamilyEmpty, color: '#059669',
                  },
                  {
                    label: 'Kök (rootId) doluluk', pct: report.fill.rootFillPct,
                    filled: report.lexemes - report.fill.rootEmpty, empty: report.fill.rootEmpty, color: '#d97706',
                  },
                  {
                    label: 'Arapça karşılık doluluk', pct: report.fill.arabicFillPct,
                    filled: report.lexemes - report.fill.arabicEmpty, empty: report.fill.arabicEmpty, color: '#e11d48',
                  },
                  {
                    label: 'Kavram (conceptId) doluluk', pct: report.fill.conceptFillPct,
                    filled: report.lexemes - report.fill.conceptEmpty, empty: report.fill.conceptEmpty, color: '#0d9488',
                  },
                  {
                    label: 'Örnek (example) doluluk', pct: report.fill.exampleCoveragePct,
                    filled: report.fill.withExamples, empty: report.lexemes - report.fill.withExamples, color: '#7c3aed',
                  },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex flex-wrap items-end justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{row.label}</p>
                      <p className="font-mono text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-xl font-semibold">%
                          {row.pct.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                        </span>
                        {' '}· {row.filled.toLocaleString('tr-TR')} dolu
                      </p>
                    </div>
                    <div
                      className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                      role="progressbar"
                      aria-label={row.label}
                      aria-valuenow={row.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div className="h-full rounded-full" style={{ width: `${Math.min(row.pct, 100)}%`, background: row.color }} />
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">
                      Kalan: <strong className="text-slate-700 dark:text-slate-200">{row.empty.toLocaleString('tr-TR')}</strong> kayıt boş
                      {row.label.startsWith('Örnek') ? ` (örnekli ${row.filled.toLocaleString('tr-TR')})` : ''}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
                <strong>Ek göstergeler:</strong> IPA boş {report.fill.ipaEmpty.toLocaleString('tr-TR')} ·
                POS boş {report.posEmpty.toLocaleString('tr-TR')} ·
                Mükerrer ID {report.duplicateIds} · Kırık kök referansı {report.brokenRootRefs} ·
                Kırık WF referansı {report.brokenWordFamilyRefs}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
