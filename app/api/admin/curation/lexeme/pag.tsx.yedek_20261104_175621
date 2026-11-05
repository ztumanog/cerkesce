// app/admin/curation/page.tsx
'use client';
import { useState } from 'react';

type Lexeme = {
  id: string; form: string; language: string;
  rootIds: string[]; wordFamilyId: string | null; conceptId: string | null;
};

export default function CurationPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Lexeme[]>([]);
  const [selected, setSelected] = useState<Lexeme | null>(null);
  const [draft, setDraft] = useState<Partial<Lexeme>>({});
  const [preview, setPreview] = useState<any>(null);
  const [status, setStatus] = useState('');

  async function search() {
    const res = await fetch(`/api/curation/lexemes?q=${encodeURIComponent(query)}`);
    setResults(await res.json());
  }

  async function open(l: Lexeme) { 
    setSelected(l); 
    setDraft({ rootIds: l.rootIds, wordFamilyId: l.wordFamilyId, conceptId: l.conceptId }); 
    setStatus('');
  }

  async function save() {
    const res = await fetch('/api/curation/lexemes/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected!.id, changes: draft, mode: 'dry-run' }),
    });
    setPreview(await res.json());
  }

  async function apply() {
    const res = await fetch('/api/curation/lexemes/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected!.id, changes: draft, mode: 'apply' }),
    });
    if (res.ok) { 
      setStatus('✅ Uygulandı, backup alındı, audit log yazıldı'); 
      setPreview(null); 
      if(selected) open(selected); 
    }
  }

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold">Lexeme Düzenleyici - /admin/curation</h1>
      <div className="flex gap-2">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Lexeme ara (VÜCUT, цӀыф, HUMAN...)"
               className="border px-3 py-2 rounded w-full" />
        <button onClick={search} className="bg-blue-600 text-white px-4 rounded">Ara</button>
      </div>
      <ul className="divide-y border rounded">
        {results.map(l => (
          <li key={l.id} onClick={() => open(l)} className="cursor-pointer px-3 py-2 hover:bg-gray-100">
            <b>{l.form}</b> <span className="text-gray-500">[{l.language}]</span> → concept: {l.conceptId ?? '—'} | roots: {l.rootIds.join(',')}
          </li>
        ))}
      </ul>
      {selected && (
        <div className="border p-4 rounded space-y-3 bg-white">
          <h2 className="font-semibold">{selected.form} ({selected.id})</h2>
          <label className="block">rootIds:
            <input value={(draft.rootIds ?? []).join(', ')} onChange={e => setDraft(d => ({ ...d, rootIds: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} className="border px-2 py-1 rounded w-full" />
          </label>
          <label className="block">wordFamilyId:
            <input value={draft.wordFamilyId ?? ''} onChange={e => setDraft(d => ({ ...d, wordFamilyId: e.target.value || null }))} className="border px-2 py-1 rounded w-full" />
          </label>
          <label className="block">conceptId:
            <input value={draft.conceptId ?? ''} onChange={e => setDraft(d => ({ ...d, conceptId: e.target.value || null }))} className="border px-2 py-1 rounded w-full" />
          </label>
          <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded">Kaydet (dry-run)</button>
          {status && <p className="text-green-700">{status}</p>}
        </div>
      )}
      {preview && (
        <div className="border-2 border-orange-400 p-4 rounded bg-orange-50">
          <h3 className="font-bold">DRY-RUN ÖNİZLEME — emin misin?</h3>
          <pre className="text-sm bg-white p-2 rounded overflow-auto max-h-64">{JSON.stringify(preview, null, 2)}</pre>
          <div className="flex gap-2 mt-2">
            <button onClick={apply} className="bg-red-600 text-white px-4 py-2 rounded">✅ Onayla & Apply</button>
            <button onClick={() => setPreview(null)} className="border px-4 py-2 rounded bg-white">İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}