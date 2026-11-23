"use client";

import { useState, useEffect, useCallback } from "react";
import { Send, Lightbulb, Hourglass, CheckCircle2, XCircle } from "lucide-react";
import { ConceptProposal } from "@/domain/collaboration/services/CollaborativeModerationService";

/**
 * KELİME ÖNER (/sozluk/oneri) — herkese açık vatandaş yüzü.
 *
 * - Yalnızca öneri gönderme ve gönderilen önerilerin durumunu izleme.
 * - Onayla/Reddet YOK: moderasyon eylemleri /admin/moderasyon sayfasındadır.
 * - Kalıcılık: /api/moderasyon üzerinden dosyaya yazılır (yenilemede kaybolmaz).
 * - Öneri numarası sunucuda otomatik üretilir; ekranda iç jargon gösterilmez.
 */

const STATUS_VIEW: Record<string, { text: string; icon: typeof Hourglass; className: string }> = {
  PENDING: { text: "İnceleniyor", icon: Hourglass, className: "bg-amber-100 text-amber-800 border-amber-200" },
  APPROVED: { text: "Onaylandı — sözlüğe eklenecek", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  REJECTED: { text: "Reddedildi", icon: XCircle, className: "bg-rose-100 text-rose-800 border-rose-200" },
};

export default function KelimeOnerPage() {
  const [proposals, setProposals] = useState<ConceptProposal[]>([]);
  const [form, setForm] = useState({ word: "", meaning: "", concept: "", author: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/moderasyon", { cache: "no-store" });
      const j = await res.json();
      if (res.ok && Array.isArray(j.proposals)) setProposals(j.proposals);
    } catch {
      // yükleme hatasında liste boş kalır; işlem yapınca hata görünür olur
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  const submit = async () => {
    setError("");
    if (!form.word.trim() || !form.meaning.trim() || !form.author.trim()) {
      setError("Çerkesçe kelime, Türkçe anlamı ve adınız alanları zorunludur.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/moderasyon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptId: form.concept.trim().toUpperCase() || "UNCLASSIFIED",
          proposedLabel: form.word.trim(),
          meaning: form.meaning.trim(),
          author: form.author.trim(),
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Öneri gönderilemedi.");
      setProposals(prev => [...prev, j.proposal]);
      setForm({ word: "", meaning: "", concept: "", author: "" });
      showToast("Teşekkürler! Öneriniz alındı ve incelenmek üzere kaydedildi.");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 px-4 pt-24 pb-10 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Başlık */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-violet-100 dark:bg-violet-900/40 p-2.5">
              <Lightbulb className="h-6 w-6 text-violet-700 dark:text-violet-300" aria-hidden />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Kelime Öner</h1>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Sözlükte eksik olduğunu düşündüğün bir Çerkesçe kelimeyi buradan önerebilirsin.
                Önerileri sözlük ekibimiz inceler; onaylananlar sözlüğe eklenir.
              </p>
            </div>
          </div>
        </div>

        {/* Öneri formu */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Send className="h-4 w-4 text-violet-600" aria-hidden /> Yeni Öneri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="oner-word" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Çerkesçe kelime <span className="text-rose-500">*</span>
              </label>
              <input id="oner-word" className={inputCls} placeholder="örn: унэ" value={form.word}
                onChange={e => setForm({ ...form, word: e.target.value })} />
            </div>
            <div>
              <label htmlFor="oner-meaning" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Türkçe anlamı <span className="text-rose-500">*</span>
              </label>
              <input id="oner-meaning" className={inputCls} placeholder="örn: ev" value={form.meaning}
                onChange={e => setForm({ ...form, meaning: e.target.value })} />
            </div>
            <div>
              <label htmlFor="oner-concept" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Hangi kavrama ait? <span className="font-normal text-slate-400">(isteğe bağlı)</span>
              </label>
              <input id="oner-concept" className={inputCls} placeholder="örn: HOUSE, WATER" value={form.concept}
                onChange={e => setForm({ ...form, concept: e.target.value })} />
            </div>
            <div>
              <label htmlFor="oner-author" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Adınız <span className="text-rose-500">*</span>
              </label>
              <input id="oner-author" className={inputCls} placeholder="örn: Zeki" value={form.author}
                onChange={e => setForm({ ...form, author: e.target.value })} />
            </div>
          </div>
          {error && (
            <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
          )}
          {toast && (
            <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{toast}</div>
          )}
          <button type="button" onClick={submit} disabled={sending}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60">
            <Send className="h-4 w-4" aria-hidden /> {sending ? "Gönderiliyor..." : "Öneriyi Gönder"}
          </button>
        </div>

        {/* Gönderilen öneriler — salt okunur durum takibi */}
        {proposals.length > 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Gönderilen Öneriler</h2>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {proposals.map(p => {
                const st = STATUS_VIEW[p.status] || STATUS_VIEW.PENDING;
                const StIcon = st.icon;
                return (
                  <li key={p.proposalId} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-sm">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{p.proposedLabel}</span>
                    <span className="text-slate-400">—</span>
                    <span className="text-slate-600 dark:text-slate-300">{p.meaning || p.conceptId}</span>
                    <span className="ml-auto inline-flex items-center gap-1.5">
                      <StIcon className="h-3.5 w-3.5" aria-hidden />
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${st.className}`}>{st.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="text-[11px] text-slate-400">
              Onaylanan öneriler sözlük ekibi tarafından düzenli olarak sözlüğe işlenir.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
