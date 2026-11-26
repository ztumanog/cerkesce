import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { GovernanceRiskEngine, GovernanceRisk } from '@/infra/intelligence/GovernanceRiskEngine';
import { ArchitectureConsistencyAdvisor } from '@/infra/intelligence/ArchitectureConsistencyAdvisor';

/**
 * KARARLAR VE İŞLER (/yonetim/governance)
 *
 * - Risk neyse: adı + sebebi + ne yapılacağı yazılı (kaynak: GovernanceRiskEngine
 *   ve ArchitectureConsistencyAdvisor — belge taraması, uydurma uyarı yok)
 * - Karar Defteri (ADR): docs/architecture/adr/ dizininden okunur; karta
 *   tıklanınca satır içi genişler (404 yok)
 * - "Faz durumu UYARI" gibi sebepsiz etiket yok — her satırda sebep + öneri var
 */

export const dynamic = 'force-dynamic';

const AREA_TR: Record<GovernanceRisk['area'], string> = {
  adr: 'Karar Defteri (ADR)',
  phase: 'Faz Belgeleri',
  doc: 'Belgeler Arası Tutarlılık',
};

const LEVEL_TR: Record<GovernanceRisk['riskLevel'], { text: string; cls: string }> = {
  low: { text: 'Düşük', cls: 'bg-slate-100 text-slate-700 border-slate-200' },
  medium: { text: 'Orta', cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  high: { text: 'Yüksek', cls: 'bg-orange-100 text-orange-800 border-orange-200' },
  critical: { text: 'Kritik', cls: 'bg-rose-100 text-rose-800 border-rose-200' },
};

interface AdrCard {
  file: string;
  title: string;
  status: string;
  preview: string;
}

/** ADR içeriğinden durum metnini çıkarır (`Durum:`, `Status:`, `## Durum`, `Status\n...`). */
function extractAdrStatus(content: string): string {
  const inlineMatch =
    content.match(/^(?:[-*]\s*)?\*{0,2}(?:Durum|Status)\*{0,2}:\*{0,2}\s*(.+)$/im);
  if (inlineMatch) return inlineMatch[1].trim().slice(0, 80);

  const headingMatch = content.match(/^#{1,4}\s+(?:Durum|Status)\s*\r?\n+([^\n#]+)/im)
    || content.match(/^(?:Durum|Status)\s*\r?\n+\r?\n?([^\n#]+)/im);
  if (headingMatch) return headingMatch[1].trim().slice(0, 80);

  return '—';
}

/** Kart özeti için önizleme metni çıkarır (`---` sonrası veya ilk içerik bölümü). */
function extractAdrPreview(content: string): string {
  const afterHr = content.split(/\r?\n---\r?\n/)[1];
  const source = afterHr
    || content.replace(/^#\s+.+$/m, '').replace(/\r?\n/g, '\n');
  return source
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/[*>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
}

/** Karar Defteri'ni dizinden okur: başlık + durum + ilk paragraf önizlemesi. */
function loadAdrCards(): AdrCard[] {
  const dir = path.join(process.cwd(), 'docs/architecture/adr');
  try {
    const files = fs.readdirSync(dir)
      .filter((f) => f.startsWith('ADR-') && f.endsWith('.md'))
      .sort()
      .reverse();
    return files.map((file) => {
      let title = file.replace('.md', '');
      let status = '—';
      let preview = '';
      try {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) title = titleMatch[1].trim();
        status = extractAdrStatus(content);
        preview = extractAdrPreview(content);
      } catch { /* okunamayan dosya: yalnız dosya adı gösterilir */ }
      return { file, title, status, preview };
    });
  } catch {
    return [];
  }
}

export default function KararlarPage() {
  const riskReport = GovernanceRiskEngine.evaluate();
  let consistencyIssues: any[] = [];
  try {
    consistencyIssues = (ArchitectureConsistencyAdvisor.analyze() as any).issues || [];
  } catch { /* tarama hatası: boş liste */ }
  const adrs = loadAdrCards();

  const pendingWork = [
    ...riskReport.risks.map((r) => ({ source: AREA_TR[r.area] || String(r.area), work: r.recommendation, reason: r.description })),
    ...consistencyIssues.map((i: any) => ({ source: 'Belge Tutarlılığı', work: i.recommendation || 'İlgili belgeyi güncelleyin', reason: `${i.document || i.area}: ${i.description}` })),
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Kararlar ve İşler</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Alınan mimari kararlar (Karar Defteri), yarım kalan işler ve riskler — her biri sebebiyle ve çözümüyle.
              </p>
            </div>
            <Link href="/admin/yonetim" className="text-sm font-medium text-blue-600 hover:text-blue-800">&larr; Yönetim</Link>
          </div>
        </div>

        {/* Yarım kalan işler — sebep + ne yapılmalı */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Bekleyen İşler</h2>
          {pendingWork.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-10 text-center text-sm text-slate-400">
              Yapılacak bir şey yok — belge taraması tutarlılık sorunu bulamadı.
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {pendingWork.map((w, i) => (
                <li key={i} className="py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">{w.source}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{w.work}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sebep: {w.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Riskler — ad + sebep + çözüm, satır içi genişler */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Riskler</h2>
          {riskReport.risks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-10 text-center text-sm text-slate-400">
              Risk yok — Karar Defteri, faz belgeleri ve dokümanlar tutarlı.
            </div>
          ) : (
            <div className="space-y-2">
              {riskReport.risks.map((r, i) => {
                const lv = LEVEL_TR[r.riskLevel] || LEVEL_TR.medium;
                return (
                  <details key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
                    <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-3">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${lv.cls}`}>{lv.text}</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{AREA_TR[r.area] || r.area}</span>
                      <span className="text-xs text-slate-500">{r.description}</span>
                    </summary>
                    <div className="px-4 pb-3 pt-1 text-sm text-slate-600 dark:text-slate-300">
                      <p><span className="font-semibold">Ne yapılmalı:</span> {r.recommendation}</p>
                      <p className="mt-1 text-xs text-slate-400">Etki skoru: {r.score}/100</p>
                    </div>
                  </details>
                );
              })}
            </div>
          )}
        </div>

        {/* Karar Defteri — dizinden okunur, satır içi genişler (404 yok) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Karar Defteri ({adrs.length})</h2>
          <p className="text-xs text-slate-400">Alınan mimari kararlar. Karta tıklayınca özeti açılır.</p>
          {adrs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-10 text-center text-sm text-slate-400">
              Karar dosyaları bulunamadı (docs/architecture/adr/).
            </div>
          ) : (
            <div className="space-y-2">
              {adrs.map((a) => (
                <details key={a.file} className="rounded-xl border border-slate-200 dark:border-slate-800 open:bg-slate-50 dark:open:bg-slate-800/50">
                  <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-3">
                    <span className="font-mono text-xs text-slate-500">{a.file.replace('.md', '')}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{a.title}</span>
                    <span className="ml-auto rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">{a.status}</span>
                  </summary>
                  {a.preview && (
                    <p className="px-4 pb-3 pt-1 text-sm text-slate-600 dark:text-slate-300">{a.preview}…</p>
                  )}
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
