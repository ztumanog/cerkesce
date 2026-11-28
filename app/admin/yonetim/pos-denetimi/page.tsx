import Link from 'next/link';
import { loadGovReport, formatGeneratedAt, isGovReportStale, PosAuditReport } from '@/infra/governance/govReports';
import StaleReportBanner from '@/components/governance/StaleReportBanner';

/**
 * ADR-GOV-016 — POS Denetimi v3 (/admin/yonetim/pos-denetimi)
 *
 * public/admin-reports/pos-audit.json'u okur ve gösterir (RULE-01).
 * Form duplikasyon grubu tanımı: aynı `form` değerini taşıyan birden fazla
 * kayıt (POS fark etmeksizin) — 2026-11-27'de Baş Mimar oturumundaki historik
 * "14 form / 29 kayıt" değeriyle birebir doğrulandı (RULE-07).
 */

export const dynamic = 'force-dynamic';

export default function PosDenetimiPage() {
  const report = loadGovReport<PosAuditReport>('pos-audit.json');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">ADR-GOV-016 · v3</p>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">POS Denetimi</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                POS dağılımı, etiket tutarlılığı ve form bazlı duplikasyon grupları.
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
                Salt okunur
              </span>
            </div>
          )}
        </div>

        {!report ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-12 text-center">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rapor bulunamadı (public/admin-reports/pos-audit.json)</p>
            <p className="mt-2 text-sm text-slate-500">Üretmek için: <code className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs">npm run report:governance</code></p>
          </div>
        ) : (
          <>
            <StaleReportBanner stale={isGovReportStale(report)} />

            {/* Metrik kartları */}
            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'Form duplikasyon grubu', value: report.formDuplicateGroups, desc: `Aynı formu taşıyan ${report.formDuplicateRecords} kayıt (grup)`, tone: 'warn' },
                { label: 'Duplikasyon kaydı', value: report.formDuplicateRecords, desc: 'Gruplardaki toplam kayıt', tone: 'warn' },
                { label: 'POS boş', value: report.posEmpty, desc: 'pos ve partOfSpeech ikisi de boş', tone: report.posEmpty === 0 ? 'ok' : 'bad' },
                { label: 'Geçersiz POS etiketi', value: report.invalidPos, desc: 'İzinli liste dışı etiket (validator kuralıyla aynı)', tone: report.invalidPos === 0 ? 'ok' : 'bad' },
              ].map((c) => (
                <article
                  key={c.label}
                  className={`rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-900 ${c.tone === 'ok' ? 'border-slate-200 dark:border-slate-800' : c.tone === 'warn' ? 'border-amber-300' : 'border-rose-300'}`}
                  style={c.tone === 'ok' ? undefined : { borderLeft: `5px solid ${c.tone === 'warn' ? '#d97706' : '#e11d48'}` }}
                >
                  <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100">{c.label}</p>
                  <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    {c.value.toLocaleString('tr-TR')}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
                </article>
              ))}
            </section>

            <p className="text-xs leading-relaxed text-slate-500">
              <strong className="text-slate-700 dark:text-slate-300">Metrik sözlüğü notu:</strong> form duplikasyon grubu = aynı
              &quot;form&quot; değerini taşıyan birden fazla kayıt (POS&apos;u farklı olsa bile). Bu tanım 2026-11-27&apos;de
              Baş Mimar oturumundaki historik &quot;14 form / 29 kayıt&quot; değeriyle birebir doğrulandı (RULE-07 dört şart sağlandı).
              POS çakışması (pos ≠ partOfSpeech): {report.posMismatch.toLocaleString('tr-TR')}.
            </p>

            {/* POS dağılımı */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">POS Dağılımı</h2>
              <p className="mt-1 text-sm text-slate-500">Tüm lexeme kayıtları üzerinden etiket dağılımı.</p>
              <div className="mt-4 space-y-2">
                {Object.entries(report.posDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([pos, count]) => {
                    const max = Math.max(...Object.values(report.posDistribution));
                    return (
                      <div key={pos} className="flex items-center gap-3">
                        <span className="w-20 shrink-0 font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{pos}</span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div className="h-full rounded-full bg-emerald-600" style={{ width: `${(count / max) * 100}%` }} />
                        </div>
                        <span className="w-16 shrink-0 text-right font-mono text-xs text-slate-600 dark:text-slate-300">
                          {count.toLocaleString('tr-TR')}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* Duplikasyon grupları */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Duplikasyon Grupları ({report.formDuplicateGroups})</h2>
              <p className="mt-1 text-sm text-slate-500">
                Aynı formu taşıyan kayıt grupları — birleştirme öncesi insan incelemesi gerekir. Kayda tıklayınca kürasyon ekranında açılır.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                      <th className="py-2 pr-4 font-semibold">Form</th>
                      <th className="py-2 font-semibold">Kayıtlar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {report.duplicateGroups.map((g) => (
                      <tr key={g.form}>
                        <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-100" dir="auto">{g.form}</td>
                        <td className="py-2">
                          <div className="flex flex-wrap gap-2">
                            {g.ids.map((id) => (
                              <Link key={id} href={`/admin/curation/${encodeURIComponent(id)}`} className="font-mono text-xs text-blue-600 hover:underline">
                                {id}
                              </Link>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
