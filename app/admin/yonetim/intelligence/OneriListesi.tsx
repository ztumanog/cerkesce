'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { ConceptProposal } from '@/domain/collaboration/services/CollaborativeModerationService';

/**
 * Öneri listesi (client) — Kabul Et / Reddet eylemleri.
 * Kalıcılık: /api/moderasyon PATCH üzerinden (dosyaya yazar).
 * İş kuralları serviste: yalnız bekleyen öneriler incelenir,
 * öneriyi gönderen kişi kendi önerisini onaylayamaz.
 */

export default function OneriListesi({ initial }: { initial: ConceptProposal[] }) {
  const [proposals, setProposals] = useState(initial);
  const [reviewer, setReviewer] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const pending = proposals.filter((p) => p.status === 'PENDING');
  const decided = proposals.filter((p) => p.status !== 'PENDING');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const transition = async (p: ConceptProposal, action: 'APPROVED' | 'REJECTED') => {
    setError('');
    if (!reviewer.trim()) {
      setError('Önce "İnceleyen kişi" alanına adınızı yazın.');
      return;
    }
    try {
      const res = await fetch('/api/moderasyon', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId: p.proposalId, action, moderatorId: reviewer.trim() }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'İşlem uygulanamadı');
      setProposals((prev) => prev.map((x) => (x.proposalId === p.proposalId ? j.proposal : x)));
      showToast(`"${p.proposedLabel}" önerisi ${action === 'APPROVED' ? 'onaylandı' : 'reddedildi'}.`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Onay Bekleyen Öneriler ({pending.length})</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="oneri-reviewer" className="text-xs font-semibold text-slate-600 dark:text-slate-300">İnceleyen kişi:</label>
            <input id="oneri-reviewer" className="w-40 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="örn: Zeki" value={reviewer} onChange={(e) => setReviewer(e.target.value)} />
          </div>
        </div>

        {error && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}
        {toast && <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{toast}</div>}

        {pending.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-10 text-center text-sm text-slate-400">
            Onay bekleyen öneri yok. Yeni öneriler <strong>Kelime Öner</strong> sayfasından gelir.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {pending.map((p) => (
              <li key={p.proposalId} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
                <details className="min-w-0 flex-1">
                  <summary className="cursor-pointer">
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{p.proposedLabel}</span>
                    <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">— {p.meaning || p.conceptId}</span>
                    <span className="ml-2 text-xs text-slate-400">(gönderen: {p.author})</span>
                  </summary>
                  <div className="mt-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
                    <p><span className="font-semibold">Öneri:</span> "{p.proposedLabel}" kelimesi sözlüğe eklensin{p.meaning ? ` — Türkçe karşılığı: ${p.meaning}` : ''}.</p>
                    <p className="mt-1"><span className="font-semibold">Sebep:</span> {p.author} tarafından gönderildi{p.conceptId && p.conceptId !== 'UNCLASSIFIED' ? `, "${p.conceptId}" kavramına` : ''}.</p>
                    <p className="mt-1 text-xs text-slate-400">Kayıt numarası: {p.proposalId}</p>
                  </div>
                </details>
                <span className="flex gap-2">
                  <button type="button" onClick={() => transition(p, 'APPROVED')}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100">
                    <Check className="h-3.5 w-3.5" aria-hidden /> Kabul Et
                  </button>
                  <button type="button" onClick={() => transition(p, 'REJECTED')}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100">
                    <X className="h-3.5 w-3.5" aria-hidden /> Reddet
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-[11px] text-slate-400">Not: öneriyi gönderen kişi kendi önerisini onaylayamaz.</p>
      </div>

      {decided.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sonuçlanmış Öneriler ({decided.length})</h2>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {decided.map((p) => (
              <li key={p.proposalId} className="flex flex-wrap items-center gap-2 py-2.5 text-sm">
                <span className="font-bold text-slate-900 dark:text-slate-100">{p.proposedLabel}</span>
                <span className="text-slate-400">—</span>
                <span className="text-slate-600 dark:text-slate-300">{p.meaning || p.conceptId}</span>
                <span className={`ml-auto rounded-full border px-2 py-0.5 text-[11px] font-bold ${p.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'}`}>
                  {p.status === 'APPROVED' ? 'Onaylandı' : 'Reddedildi'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
