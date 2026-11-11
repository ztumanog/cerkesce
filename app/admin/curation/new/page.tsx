"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewLexemePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const fd = new FormData(e.currentTarget);
    const data = {
      form: fd.get("form"),
      wordFamilyId: fd.get("wordFamilyId"),
      ipa: fd.get("ipa"),
      partOfSpeech: fd.get("partOfSpeech"),
      conceptId: fd.get("conceptId"),
      rootIds: fd.get("rootIds"),
      notes: fd.get("notes"),
    };

    try {
      const res = await fetch("/api/admin/curation/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        setSaving(false);
        setMessage(`Sunucu hatası (${res.status}): API rotası bulunamadı veya HTML döndü.`);
        return;
      }

      const json = await res.json();
      setSaving(false);

      if (res.ok && json.success) {
        setMessage(`Başarıyla eklendi! ID: ${json.lexeme.id}`);
        setTimeout(() => {
          router.push(`/admin/curation/${encodeURIComponent(json.lexeme.id)}`);
        }, 1200);
      } else {
        setMessage(json.error || "Bir hata oluştu.");
      }
    } catch (err: any) {
      setSaving(false);
      setMessage(err.message || "İstek gönderilemedi.");
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link href="/admin/curation" className="text-sm text-blue-600 hover:underline">
        ← Kürasyon Paneline Dön
      </Link>
      <h1 className="mt-4 text-2xl font-bold">➕ Yeni Kelime (Lexeme) Ekle</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700">Kelime / Form (Zorunlu)</label>
          <input name="form" required placeholder="ör: мыӀэрысэ" className="mt-1 w-full rounded border px-3 py-2 text-lg" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Word Family ID</label>
            <input name="wordFamilyId" defaultValue="WF-MY" placeholder="ör: WF-MY" className="mt-1 w-full rounded border px-3 py-2 uppercase" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Root IDs (virgülle)</label>
            <input name="rootIds" defaultValue="R-MY" placeholder="ör: R-MY" className="mt-1 w-full rounded border px-3 py-2 uppercase" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">IPA</label>
            <input name="ipa" defaultValue="/mǝʔɐ'rǝsɐ/" className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Part of Speech</label>
            <input name="partOfSpeech" defaultValue="noun" className="mt-1 w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Concept ID</label>
          <input name="conceptId" defaultValue="APPLE" placeholder="ör: APPLE" className="mt-1 w-full rounded border px-3 py-2 uppercase" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notlar & Etimoloji</label>
          <textarea name="notes" rows={3} defaultValue="Etimoloji: мы (yaban elması) + Ӏэрысэ (evcil/kültür)" className="mt-1 w-full rounded border px-3 py-2" />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Kaydediliyor..." : "Kelimeyi Veritabanına Kaydet"}
        </button>
      </form>

      {message && <p className="mt-4 rounded bg-gray-100 p-3 text-center text-sm font-medium text-gray-800">{message}</p>}
    </main>
  );
}