"use client";
// Sprint 2A.3 - Duzenleme formu (client)
import { useState } from "react";

export default function EditForm({ lexemeId, initial }: {
  lexemeId: string;
  initial: { ipa: string; partOfSpeech: string; conceptId: string; rootIds: string; notes: string };
}) {
  const [diff, setDiff] = useState<{ field: string; oldValue: any; newValue: any }[] | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function readChanges(): Record<string, any> {
    const fd = new FormData(document.querySelector("form")!);
    return {
      ipa: fd.get("ipa"),
      partOfSpeech: fd.get("partOfSpeech"),
      conceptId: fd.get("conceptId"),
      rootIds: fd.get("rootIds"),
      notes: fd.get("notes"),
    };
  }

  async function post(confirm: boolean) {
    setSaving(true);
    const res = await fetch("/api/admin/curation/lexeme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lexemeId, changes: readChanges(), confirm }),
    });
    const json = await res.json();
    setSaving(false);
    return json;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const json = await post(false);
    if (json.dryRun) {
      setDiff(json.diff);
      setMessage(json.diff.length === 0 ? "Degisiklik yok." : `${json.diff.length} alan degisecek - onaylayin.`);
    } else {
      setMessage(json.error ?? "Beklenmeyen yanit.");
    }
  }

  async function handleConfirm() {
    const json = await post(true);
    setDiff(null);
    setMessage(json.applied ? `Uygulandi: ${json.appliedFields.join(", ")} - sayfayi yenileyin.` : json.message ?? json.error ?? "");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">IPA</label>
          <input name="ipa" defaultValue={initial.ipa} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Part of Speech</label>
          <input name="partOfSpeech" defaultValue={initial.partOfSpeech} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Concept ID</label>
          <input name="conceptId" defaultValue={initial.conceptId} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Root IDs (virgulle)</label>
          <input name="rootIds" defaultValue={initial.rootIds} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea name="notes" rows={3} defaultValue={initial.notes} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <button type="submit" disabled={saving}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {saving ? "Kontrol ediliyor..." : "Degisiklikleri Kontrol Et (dry-run)"}
        </button>
      </form>

      {diff && diff.length > 0 && (
        <div className="mt-4 rounded border border-yellow-400 bg-yellow-50 p-4">
          <h3 className="font-semibold">Degisiklik Raporu</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {diff.map(d => (
              <li key={d.field}>
                <b>{d.field}</b>: <s>{String(d.oldValue)}</s> â†’ <b>{String(d.newValue)}</b>
              </li>
            ))}
          </ul>
          <button onClick={handleConfirm} disabled={saving}
            className="mt-3 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
            Onayla ve Uygula
          </button>
        </div>
      )}

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
