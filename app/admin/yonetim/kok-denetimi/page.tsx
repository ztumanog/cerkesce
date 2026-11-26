import Link from 'next/link';
import { loadGovReport, formatGeneratedAt, RootsAuditReport } from '@/infra/governance/govReports';

/**
 * ADR-GOV-016 — Kök Denetimi (/admin/yonetim/kok-denetimi)
 *
 * public/admin-reports/roots-audit.json'u okur ve gösterir (RULE-01).
 * Derin bağlantı (v1): kayıt ID'leri tıklanabilir — lexeme → /admin/curation/{id},
 * kök → /admin/curation/roots?root={id}, WF → /admin/curation/roots?family={id}.
 * Ekran yine salt okunurdur; düzeltme kürasyon tarafında yapılır.
 *
 * Metrik sözlüğü (ADR-GOV-016):
 * - "rootId boş lexeme" ≠ "boş kök": ilki LEXEME kaydının kök alanının boş
 *   olması; ikincisi kök havuzunda hiç üyesi olmayan köktür (unusedRoots).
 */

export const dynamic = 'force-dynamic';

export default function KokDenetimiPage() {
  const report = loadGovReport<RootsAuditReport>('roots-audit.json');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">ADR-GOV-016</p>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Kök Denetimi</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Kök havuzundaki ve lexeme kök bağlantısındaki tutarsızlıklar — önem sırasına göre.
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
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rapor bulunamadı (public/admin-reports/roots-audit.json)</p>
            <p className="mt-2 text-sm text-slate-500">Üretmek için: <code className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs">npm run report:governance</code></p>
          </div>
        ) : (
          <>
            {/* Metrik kartları — RULE-06: her etiket veri sözlüğü tanımıdır */}
            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'rootId boş lexeme', value: report.rootIdMissing, desc: 'rootId alanı boş olan kayıt (boş kök değil)', tone: 'warn' },
                { label: 'rootIds boş lexeme', value: report.rootIdsMissing, desc: 'rootIds dizisi boş/eksik olan kayıt', tone: 'warn' },
                { label: 'rootId ≠ rootIds[0]', value: report.rootIdMismatch, desc: 'İki alan birbirini tutmuyor', tone: report.rootIdMismatch === 0 ? 'ok' : 'bad' },
                { label: 'Kırık root referansı', value: report.brokenRootRefs, desc: 'Hedefi kök havuzunda olmayan referans', tone: report.brokenRootRefs === 0 ? 'ok' : 'bad' },
                { label: 'Üyesiz root', value: report.unusedRoots, desc: 'Hiçbir lexeme referans etmeyen kök', tone: report.unusedRoots > 0 ? 'warn' : 'ok' },
                { label: 'Üyesiz wordFamily', value: report.unusedWordFamilies, desc: 'Hiçbir lexeme referans etmeyen aile', tone: report.unusedWordFamilies > 0 ? 'warn' : 'ok' },
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
              <strong className="text-slate-700 dark:text-slate-300">Metrik sözlüğü notu:</strong> &quot;rootId boş lexeme&quot; kayıt düzeyinde
              eksik kök bağlantısıdır (ROOT-AUGMENT-001 kapsamı); &quot;üyesiz kök&quot; ise kök havuzunda artık hiç üyesi kalmayan köktür.
              Bu iki kavram karıştırılmamalıdır — tanımlar ADR-GOV-016 metrik sözlüğündedir.
              {report.rootIdMissingWhenRootIdsPresent > 0 && ` · ${report.rootIdMissingWhenRootIdsPresent} kayıtta rootIds dolu ama rootId boş.`}
            </p>

            {/* Üyesiz kök listesi — tam liste */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Üyesiz Kökler ({report.orphanRoots.length})</h2>
              <p className="mt-1 text-sm text-slate-500">Hiçbir lexeme tarafından referans edilmeyen kökler — tam liste.</p>
              {report.orphanRoots.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-6 text-center text-sm text-slate-400">Üyesiz kök yok.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                        <th className="py-2 pr-4 font-semibold">Kök ID</th>
                        <th className="py-2 pr-4 font-semibold">Form</th>
                        <th className="py-2 font-semibold">Anlam</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {report.orphanRoots.map((r) => (
                        <tr key={r.id}>
                          <td className="py-2 pr-4 font-mono text-xs">
                            <Link href={`/admin/curation/roots?root=${encodeURIComponent(r.id)}`} className="text-blue-600 hover:underline">
                              {r.id}
                            </Link>
                          </td>
                          <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-100">{r.form ?? '—'}</td>
                          <td className="py-2 text-slate-600 dark:text-slate-300">{r.primaryMeaning ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Üyesiz wordFamily listesi — tam liste */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Üyesiz Word Family&apos;ler ({report.unusedWordFamilies})</h2>
              <p className="mt-1 text-sm text-slate-500">Hiçbir lexeme&apos;nin wordFamilyId&apos;si ile referans etmediği aileler — tam liste.</p>
              {report.orphanWordFamilies.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-6 text-center text-sm text-slate-400">Üyesiz wordFamily yok.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                        <th className="py-2 pr-4 font-semibold">Word Family ID</th>
                        <th className="py-2 font-semibold">Kök Form</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {report.orphanWordFamilies.map((w) => (
                        <tr key={w.id}>
                          <td className="py-2 pr-4 font-mono text-xs">
                            <Link href={`/admin/curation/roots?family=${encodeURIComponent(w.id)}`} className="text-blue-600 hover:underline">
                              {w.id}
                            </Link>
                          </td>
                          <td className="py-2 font-semibold text-slate-800 dark:text-slate-100">{w.rootForm ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* rootId boş örnek kayıtlar — satır içi açılır */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">rootId Boş Kayıtlar</h2>
              <p className="mt-1 text-sm text-slate-500">
                {report.rootIdMissing.toLocaleString('tr-TR')} kayıt · rapordaki ilk {report.rootIdMissingSamples.length} örnek.
                Kayda tıklayınca kürasyon ekranında açılır (derin bağlantı).
              </p>
              <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
                <summary className="cursor-pointer p-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Örnek kayıtları göster ({report.rootIdMissingSamples.length})
                </summary>
                <ul className="grid gap-1 px-4 pb-3 pt-1 sm:grid-cols-2 lg:grid-cols-3">
                  {report.rootIdMissingSamples.map((id) => (
                    <li key={id} className="font-mono text-xs">
                      <Link href={`/admin/curation/${encodeURIComponent(id)}`} className="text-blue-600 hover:underline">• {id}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
