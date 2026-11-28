import Link from 'next/link';
import { loadGovReport, formatGeneratedAt, isGovReportStale, DialectAuditReport } from '@/infra/governance/govReports';
import StaleReportBanner from '@/components/governance/StaleReportBanner';

/**
 * ADR-GOV-016 — Lehçe Denetimi v3 (/admin/yonetim/lehce-denetimi)
 *
 * public/admin-reports/dialect-audit.json'u okur ve gösterir (RULE-01).
 * DIALECT-AUDIT-001'in kalıcılaşmış hali.
 * Metrik sözlüğü: Apazhev işareti = id/notes içinde "apazhev"; çoklu-lehçe
 * form = aynı formun birden fazla dialect kaydında geçmesi (şüpheli aday).
 */

export const dynamic = 'force-dynamic';

export default function LehceDenetimiPage() {
  const report = loadGovReport<DialectAuditReport>('dialect-audit.json');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">ADR-GOV-016 · v3</p>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lehçe Denetimi</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Dialect dağılımı, Apazhev işaretleri ve çoklu-lehçe formlar — DIALECT-AUDIT-001&apos;in kalıcılaşmış hali.
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
                Şüpheli adaylar — hüküm insan kararı
              </span>
            </div>
          )}
        </div>

        {!report ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-12 text-center">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rapor bulunamadı (public/admin-reports/dialect-audit.json)</p>
            <p className="mt-2 text-sm text-slate-500">Üretmek için: <code className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs">npm run report:governance</code></p>
          </div>
        ) : (
          <>
            <StaleReportBanner stale={isGovReportStale(report)} />

            {/* Metrik kartları */}
            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'KBD', value: report.dialectDistribution['KBD'] ?? 0, desc: 'Doğu (Kabardey) kaydı', tone: 'ok' },
                { label: 'COMMON', value: report.dialectDistribution['COMMON'] ?? 0, desc: 'Ortak kaydı', tone: 'ok' },
                { label: 'ADY', value: report.dialectDistribution['ADY'] ?? 0, desc: 'Batı (Adıge) kaydı', tone: 'ok' },
                { label: 'Geçersiz dialect', value: report.invalidDialect, desc: 'KBD/ADY/COMMON dışı değer', tone: report.invalidDialect === 0 ? 'ok' : 'bad' },
                { label: 'Apazhev işaretli', value: report.apazhevMarked, desc: 'id/notes içinde "apazhev" geçen kayıt', tone: 'ok' },
                { label: 'Apazhev olup ADY', value: report.apazhevAdy, desc: 'Apazhev kaynağı ama Batı lehçesi etiketli', tone: report.apazhevAdy === 0 ? 'ok' : 'warn' },
                { label: 'Çoklu-lehçe form', value: report.multiDialectForms, desc: 'Aynı form birden fazla dialect kaydında (şüpheli)', tone: report.multiDialectForms > 0 ? 'warn' : 'ok' },
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

            {/* Çoklu-lehçe formlar */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Çoklu-Lehçe Formlar ({report.multiDialectForms})</h2>
              <p className="mt-1 text-sm text-slate-500">
                Aynı formun birden fazla lehçe kaydında geçtiği durumlar — COMMON birleştirme adayı görünümü (şüpheli; hüküm insan kararı).
                Kesişim dağılımı: {Object.entries(report.crossDialectPairs).map(([k, v]) => `${k}: ${v}`).join(' · ')}
              </p>
              <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
                <summary className="cursor-pointer p-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Örnekleri göster ({report.multiDialectSamples.length})
                </summary>
                <div className="overflow-x-auto px-4 pb-3 pt-1">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                        <th className="py-2 pr-4 font-semibold">Form</th>
                        <th className="py-2 font-semibold">Lehçeler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {report.multiDialectSamples.map((s) => (
                        <tr key={s.form}>
                          <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-100" dir="auto">{s.form}</td>
                          <td className="py-2 font-mono text-xs text-slate-600 dark:text-slate-300">{s.dialects.join(' + ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </section>

            {/* Apazhev ADY örnekleri */}
            {report.apazhevSamples.length > 0 && (
              <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Apazhev olup ADY Olanlar ({report.apazhevAdy})</h2>
                <p className="mt-1 text-sm text-slate-500">Apazhev kaynağından gelip Batı lehçesi etiketi taşıyan kayıtlar.</p>
                <ul className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                  {report.apazhevSamples.map((s) => (
                    <li key={s.id} className="font-mono text-xs">
                      <Link href={`/admin/curation/${encodeURIComponent(s.id)}`} className="text-blue-600 hover:underline">• {s.id}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
