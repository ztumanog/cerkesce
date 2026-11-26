import Link from 'next/link';
import { loadGovReport, formatGeneratedAt, ConceptsAuditReport } from '@/infra/governance/govReports';

/**
 * ADR-GOV-016 — Kavram Denetimi (/admin/yonetim/kavram-denetimi)
 *
 * public/admin-reports/concepts-audit.json'u okur ve gösterir (RULE-01).
 * Metrik sözlüğü (ADR-GOV-016):
 * - legacyConceptIdRecords: SSOT öncesi `conceptIds` dizisini hâlâ taşıyan kayıt
 * - wfDanglingConceptRefs:  WF.conceptIds içinde hiçbir lexeme'nin conceptId'si
 *   olarak geçmeyen (asılı) referans taşıyan aile
 */

export const dynamic = 'force-dynamic';

export default function KavramDenetimiPage() {
  const report = loadGovReport<ConceptsAuditReport>('concepts-audit.json');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">ADR-GOV-016</p>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Kavram Denetimi</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                conceptId / conceptIds / wordFamily concept referanslarındaki açıklar — SSOT sonrası kalıntılar.
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
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rapor bulunamadı (public/admin-reports/concepts-audit.json)</p>
            <p className="mt-2 text-sm text-slate-500">Üretmek için: <code className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs">npm run report:governance</code></p>
          </div>
        ) : (
          <>
            {/* Metrik kartları */}
            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'conceptId boş', value: report.emptyConceptIds, desc: 'Kavram bağlantısı olmayan kayıt', tone: report.emptyConceptIds === 0 ? 'ok' : 'warn' },
                { label: 'Legacy conceptIds kaydı', value: report.legacyConceptIdRecords, desc: `SSOT öncesi dizi taşıyan kayıt (${report.legacyConceptIdValues} değer)`, tone: report.legacyConceptIdRecords === 0 ? 'ok' : 'warn' },
                { label: 'concept ≠ conceptId', value: report.conceptFieldMismatch, desc: 'İki alan birbirini tutmuyor', tone: report.conceptFieldMismatch === 0 ? 'ok' : 'warn' },
                { label: 'WF asılı concept', value: report.wfDanglingConceptRefs, desc: `Hiçbir lexeme'nin taşımadığı referanslı aile (${report.wfDanglingConceptValues} benzersiz değer)`, tone: report.wfDanglingConceptRefs === 0 ? 'ok' : 'warn' },
              ].map((c) => (
                <article
                  key={c.label}
                  className={`rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-900 ${c.tone === 'ok' ? 'border-slate-200 dark:border-slate-800' : c.tone === 'warn' ? 'border-amber-300' : 'border-rose-300'}`}
                  style={c.tone === 'ok' ? undefined : { borderLeft: '5px solid #d97706' }}
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
              <strong className="text-slate-700 dark:text-slate-300">Ek göstergeler:</strong> conceptId ≠ conceptIds[0]:{' '}
              {report.conceptIdMismatch.toLocaleString('tr-TR')} (validator kuralıyla aynı). Tüm metrik tanımları
              ADR-GOV-016 metrik sözlüğündedir; sayılar yalnızca rapordan gelir.
            </p>

            {/* Legacy kayıtlar */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Legacy conceptIds Taşıyan Kayıtlar ({report.legacyConceptIdRecords})</h2>
              <p className="mt-1 text-sm text-slate-500">
                ADR-GOV-015 (SSOT) sonrası hâlâ eski çoklu-kavram dizisi taşıyan kayıtlar — ADR-ROOTS-007 kuyruğunun girdisi.
                Rapordaki ilk {report.legacyRecordSamples.length} örnek:
              </p>
              <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
                <summary className="cursor-pointer p-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Kayıtları göster
                </summary>
                <div className="overflow-x-auto px-4 pb-3 pt-1">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                        <th className="py-2 pr-4 font-semibold">Lexeme</th>
                        <th className="py-2 pr-4 font-semibold">conceptId</th>
                        <th className="py-2 font-semibold">Legacy conceptIds</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {report.legacyRecordSamples.map((s) => (
                        <tr key={s.id}>
                          <td className="py-2 pr-4 font-mono text-xs">
                            <Link href={`/admin/curation/${encodeURIComponent(s.id)}`} className="text-blue-600 hover:underline">{s.id}</Link>
                          </td>
                          <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-100">{s.conceptId ?? '—'}</td>
                          <td className="py-2 font-mono text-xs text-slate-600 dark:text-slate-300">{s.conceptIds.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </section>

            {/* conceptId boş kayıtlar */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">conceptId Boş Kayıtlar ({report.emptyConceptIds})</h2>
              <p className="mt-1 text-sm text-slate-500">Kayda tıklayınca kürasyon ekranında açılır (derin bağlantı); rapor ilk {report.emptyConceptSamples.length} örneği taşır.</p>
              <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
                <summary className="cursor-pointer p-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Kayıtları göster
                </summary>
                <ul className="grid gap-1 px-4 pb-3 pt-1 sm:grid-cols-2 lg:grid-cols-3">
                  {report.emptyConceptSamples.map((id) => (
                    <li key={id} className="font-mono text-xs">
                      <Link href={`/admin/curation/${encodeURIComponent(id)}`} className="text-blue-600 hover:underline">• {id}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </section>

            {/* WF asılı concept örnekleri */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">WF Asılı Concept Referansları</h2>
              <p className="mt-1 text-sm text-slate-500">
                {report.wfDanglingConceptRefs.toLocaleString('tr-TR')} ailede, hiçbir lexeme'nin conceptId&apos;si olarak geçmeyen
                referanslar var ({report.wfDanglingConceptValues.toLocaleString('tr-TR')} benzersiz değer). İlk 30 aileden örnekler:
              </p>
              <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
                <summary className="cursor-pointer p-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Örnekleri göster
                </summary>
                <div className="overflow-x-auto px-4 pb-3 pt-1">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                        <th className="py-2 pr-4 font-semibold">Word Family</th>
                        <th className="py-2 font-semibold">Asılı concept değerleri (ilk 10)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {report.wfDanglingSamples.map((s) => (
                        <tr key={s.wfId}>
                          <td className="py-2 pr-4 font-mono text-xs">
                            <Link href={`/admin/curation/roots?family=${encodeURIComponent(s.wfId)}`} className="text-blue-600 hover:underline">{s.wfId}</Link>
                          </td>
                          <td className="py-2 font-mono text-xs text-slate-600 dark:text-slate-300">{s.dangling.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
