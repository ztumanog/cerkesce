/**
 * ADR-GOV-016 — Seçenek D: Bayatlık göstergesi bandı.
 *
 * lexemes.json, raporun üretildiği andan sonra değiştirilmişse gösterilir.
 * Uyarır ama hesap yapmaz (RULE-05); ekran salt okunur kalır.
 */
export default function StaleReportBanner({ stale }: { stale: boolean }) {
  if (!stale) return null;
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200">
      <strong>⚠ Governance raporu güncel değil</strong> — sözlük verisi, raporun üretildiği andan sonra
      değiştirilmiş. Yenilemek için:{' '}
      <code className="rounded bg-amber-100 px-2 py-0.5 font-mono text-xs dark:bg-amber-900">
        npm run report:governance
      </code>
    </div>
  );
}
