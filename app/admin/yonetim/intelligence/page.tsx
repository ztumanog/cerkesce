import Link from 'next/link';
import { loadProposals } from '@/lib/moderation/proposalStore';
import OneriListesi from './OneriListesi';

/**
 * ÖNERİLER (/admin/yonetim/intelligence)
 *
 * Kelime Öner sayfasından (/sozluk/oneri) gelen topluluk önerileri:
 * kelime + Türkçe karşılığı + gönderen + sebep. Kabul Et / Reddet
 * eylemleri kalıcıdır (/api/moderasyon → dosya).
 *
 * Eski /intelligence adresi buraya yönlendirilir; detay analiz
 * /admin/yonetim/intelligence/details sayfasındadır (404 yok).
 */

export const dynamic = 'force-dynamic';

export default function OnerilerPage() {
  const proposals = loadProposals();
  const pending = proposals.filter((p) => p.status === 'PENDING').length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Öneriler</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Vatandaşların "Kelime Öner" sayfasından gönderdiği sözlük önerileri — {pending} tanesi onay bekliyor.
                Öneriye tıklayınca önerinin kendisi ve sebebi açılır.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/yonetim/intelligence/details" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">Detaylı analiz &rarr;</Link>
              <Link href="/admin/yonetim" className="text-sm font-medium text-blue-600 hover:text-blue-800">&larr; Yönetim</Link>
            </div>
          </div>
        </div>

        <OneriListesi initial={proposals} />
      </div>
    </div>
  );
}
