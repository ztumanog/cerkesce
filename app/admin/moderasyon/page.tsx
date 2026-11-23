"use client";

import { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, X, ClipboardList, AlertTriangle } from "lucide-react";
import { ConceptProposal } from "@/domain/collaboration/services/CollaborativeModerationService";

/**
 * KELİME ÖNERİLERİ İNCELEME (/admin/moderasyon) — moderatör yüzü.
 *
 * Vatandaş yüzü /sozluk/oneri'de (yalnız öneri + durum takibi); onay/red
 * eylemleri yalnızca bu sayfada. Kalıcılık: /api/moderasyon → dosya.
 *
 * Bilinen sınırlar: uygulamada kimlik doğrulama sistemi yok — bu sayfa ve
 * PATCH ucu teknik olarak herkesin erişimine açık. Yetkilendirme ayrı iş
 * (öneri: en azından admin gizli anahtarı / basit auth).
 */

const STATUS_LABEL: Record<string, { text: string; className: string }> = {
  PENDING: { text: "Bekliyor", className: "bg-amber-100 text-amber-800 border-amber-200" },
  APPROVED: { text: "Onaylandı", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  REJECTED: { text: "Reddedildi", className: "bg-rose-100 text-rose-800 border-rose-200" },
};

export default function ModerasyonIncelePage() {
  const [proposals, setProposals] = useState<ConceptProposal[]>([]);
  const [reviewer, setReviewer] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [confirm, setConfirm] = useState<{ id: string; action: "APPROVED" | "REJECTED"; word: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/moderasyon", { cache: "no-store" });
      const j = await res.json();
      if (res.ok && Array.isArray(j.proposals)) setProposals(j.proposals);
    } catch {
      // sessiz: işlem sırasında hata görünür olur
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleTransition = async () => {
    if (!confirm) return;
    const target = confirm;
    setConfirm(null);
    if (!reviewer.trim()) {
      setError("İnceleyen kişi adını önce yazmalısınız.");
      return;
    }
    try {
      const res = await fetch("/api/moderasyon", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId: target.id, action: target.action, moderatorId: reviewer.trim() }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "İşlem uygulanamadı.");
      setProposals(prev => prev.map(p => p.proposalId === target.id ? j.proposal : p));
      showToast(`"${target.word}" önerisi ${target.action === "APPROVED" ? "onaylandı" : "reddedildi"}.`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const pending = proposals.filter(p => p.status === "PENDING").length;
  const inputCls = "w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Kelime Önerileri — İnceleme</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Vatandaşların <span className="font-semibold">Kelime Öner</span> sayfasından gönderdiği önerileri
                onaylayın ya da reddedin. Onaylanan öneriler sözlüğe işlenmek üzere kaydedilir.
              </p>
            </div>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              {pending} öneri bekliyor
            </span>
          </div>
          <div className="mt-4">
            <label htmlFor="mod-reviewer" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
              İnceleyen kişi (adınız) <span className="text-rose-500">*</span>
            </label>
            <input id="mod-reviewer" className={inputCls} placeholder="örn: Zeki" value={reviewer}
              onChange={e => setReviewer(e.target.value)} />
            <p className="mt-1 text-[11px] text-slate-400">Not: öneriyi gönderen kişi kendi önerisini onaylayamaz.</p>
          </div>
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {error}
          </div>
        )}
        {toast && (
          <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{toast}</div>
        )}

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-violet-600" aria-hidden /> Öneriler ({proposals.length})
          </h2>
          {proposals.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-14 text-center text-sm text-slate-400">
              Henüz öneri yok.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700">
                    <th className="py-2 pr-3 font-semibold">Kelime</th>
                    <th className="py-2 pr-3 font-semibold">Anlamı</th>
                    <th className="py-2 pr-3 font-semibold">Kavram</th>
                    <th className="py-2 pr-3 font-semibold">Gönderen</th>
                    <th className="py-2 pr-3 font-semibold">Durum</th>
                    <th className="py-2 font-semibold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map(p => {
                    const st = STATUS_LABEL[p.status] || STATUS_LABEL.PENDING;
                    return (
                      <tr key={p.proposalId} className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-2.5 pr-3 font-bold text-slate-900 dark:text-slate-100">{p.proposedLabel}</td>
                        <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{p.meaning || "—"}</td>
                        <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{p.conceptId === "UNCLASSIFIED" ? "—" : p.conceptId}</td>
                        <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{p.author}</td>
                        <td className="py-2.5 pr-3">
                          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${st.className}`}>{st.text}</span>
                        </td>
                        <td className="py-2.5">
                          {p.status === "PENDING" ? (
                            <span className="flex gap-1.5">
                              <button type="button" onClick={() => setConfirm({ id: p.proposalId, action: "APPROVED", word: p.proposedLabel })}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100">
                                <Check className="h-3 w-3" aria-hidden /> Onayla
                              </button>
                              <button type="button" onClick={() => setConfirm({ id: p.proposalId, action: "REJECTED", word: p.proposedLabel })}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100">
                                <X className="h-3 w-3" aria-hidden /> Reddet
                              </button>
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Dialog.Root open={!!confirm} onOpenChange={o => !o && setConfirm(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[400px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              <Dialog.Title className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {confirm?.action === "APPROVED" ? "Öneriyi onaylıyor musun?" : "Öneriyi reddediyor musun?"}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-slate-200">{confirm?.word}</strong> önerisi{" "}
                {confirm?.action === "APPROVED" ? "onaylanacak" : "reddedilecek"}. İşlem dosyaya kaydedilir.
              </Dialog.Description>
              <div className="mt-5 flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button type="button" className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Vazgeç</button>
                </Dialog.Close>
                <button type="button" onClick={handleTransition}
                  className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${confirm?.action === "APPROVED" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}>
                  {confirm?.action === "APPROVED" ? "Onayla" : "Reddet"}
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
