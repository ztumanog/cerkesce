import Link from 'next/link';
import { loadGovReport, formatGeneratedAt, TranslationsAuditReport, TranslationSample } from '@/infra/governance/govReports';

/**
 * ADR-GOV-016 — Çeviri Denetimi v2 (/admin/yonetim/ceviri-denetimi)
 *
 * public/admin-reports/translations-audit.json'u okur ve gösterir (RULE-01).
 * Tüm göstergeler ŞÜPHELİDİR: ekran insan incelemesi için aday listeler,
 * kesin hüküm değildir (anlam değişikliği insan kararı ilkesi).
 * Derin bağlantı: örnek kayıtlar /admin/curation/{id} üzerinde açılır.
 */

export const dynamic = 'force-dynamic';

function SampleTable({ title, note, items }: { title: string; note: string; items: TranslationSample[] }) {
  if (items.length === 0) return null;
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-sm dark:bg-slate-900">
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{note}</p>
      <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
        <summary className="cursor-pointer p-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Örnek kayıtları göster ({items.length})
        </summary>
        <div className="overflow-x-auto px-4 pb-3 pt-1">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                <th className="py-2 pr-4 font-semibold">Lexeme</th>
                <th className="py-2 font-semibold">Alan içeriği (ilk 120 karakter)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="py-2 pr-4 font-mono text-xs whitespace-nowrap">
                    <Link href={`/admin/curation/${encodeURIComponent(s.id)}`} className="text-blue-600 hover:underline">{s.id}</Link>
                  </td>
                  <td className="py-2 text-slate-600 dark:text-slate-300" dir="auto">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

export default function CeviriDenetimiPage() {
  const report = loadGovReport<TranslationsAuditReport>('translations-audit.json');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">ADR-GOV-016 · v2</p>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Çeviri Denetimi</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Dil alanlarına sızan yabancı metinler ve eksik çeviriler — tümü şüpheli aday, kesin hüküm değil.
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
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rapor bulunamadı (public/admin-reports/translations-audit.json)</p>
            <p className="mt-2 text-sm text-slate-500">Üretmek için: <code className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs">npm run report:governance</code></p>
          </div>
        ) : (
          <>
            {/* Metrik kartları — RULE-06: sözlük etiketleri */}
            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'TR alanında Kiril', value: report.trCyrillic, desc: 'TR karşılığında Kiril karakter' },
                { label: 'TR alanında Arapça', value: report.trArabic, desc: 'TR karşılığında Arapça karakter' },
                { label: 'TR İngilizce şüpheli', value: report.trEnglishSuspect, desc: 'Sabit fonksiyon kelimesi listesi (sözlükte tanımlı)' },
                { label: 'TR == EN', value: report.trEqualsEn, desc: 'Büyük/küçük harf duyarsız birebir aynı' },
                { label: 'RU alanında Latin kelime', value: report.ruLatinWords, desc: 'RU karşılığında ≥3 harfli Latin kelime' },
                { label: 'EN alanında Kiril', value: report.enCyrillic, desc: 'EN karşılığında Kiril karakter' },
                { label: 'EN alanında Arapça', value: report.enArabic, desc: 'EN karşılığında Arapça karakter' },
                { label: 'AR boş', value: report.arEmpty, desc: `Arapça karşılık eksik (TR boş ${report.trEmpty} · EN boş ${report.enEmpty} · RU boş ${report.ruEmpty})` },
              ].map((c) => (
                <article
                  key={c.label}
                  className="rounded-2xl border border-amber-300 bg-white p-4 shadow-sm dark:bg-slate-900"
                  style={{ borderLeft: '5px solid #d97706' }}
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
              <strong className="text-slate-700 dark:text-slate-300">Metrik sözlüğü notu:</strong> tüm göstergeler şüpheli aday listesidir —
              parantez içinde kaynak gösterme (ör. etimoloji) gibi meşru kullanımlar da sayılır; hüküm kürasyon incelemesinde verilir.
              Kayda tıklayınca kürasyon ekranında açılır.
            </p>

            <SampleTable
              title={`TR Alanında Kiril (${report.trCyrillic.toLocaleString('tr-TR')})`}
              note="TR karşılığında Kiril karakter geçen kayıtlar — parantez içinde kaynak gösterme olabilir."
              items={report.samples.trCyrillic}
            />
            <SampleTable
              title={`TR İngilizce Şüpheli (${report.trEnglishSuspect.toLocaleString('tr-TR')})`}
              note="TR karşılığında İngilizce fonksiyon kelimesi geçen kayıtlar — listenin tam tanımı ADR-GOV-016 metrik sözlüğündedir."
              items={report.samples.trEnglishSuspect}
            />
            <SampleTable
              title={`TR == EN (${report.trEqualsEn.toLocaleString('tr-TR')})`}
              note="TR ve EN karşılıkları birebir aynı olan kayıtlar — özel adlarda meşru olabilir."
              items={report.samples.trEqualsEn}
            />
            <SampleTable
              title={`RU Alanında Latin Kelime (${report.ruLatinWords.toLocaleString('tr-TR')})`}
              note="RU karşılığında en az 3 harfli Latin kelime geçen kayıtlar — bilimsel ad (Lat. botanik/zooloji) olabilir."
              items={report.samples.ruLatinWords}
            />
            <SampleTable
              title={`TR Alanında Arapça (${report.trArabic.toLocaleString('tr-TR')})`}
              note="TR karşılığında Arapça karakter geçen kayıtlar."
              items={report.samples.trArabic}
            />
            <SampleTable
              title={`EN Alanında Kiril (${report.enCyrillic.toLocaleString('tr-TR')})`}
              note="EN karşılığında Kiril karakter geçen kayıtlar."
              items={report.samples.enCyrillic}
            />
          </>
        )}
      </div>
    </div>
  );
}
