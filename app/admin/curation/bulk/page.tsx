'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Lexeme = { id: string; [key: string]: unknown };
type Edit = {
  roots: string;
  family: string;
  form: string;
  tr: string;
  concept: string;
  dialect: string;
  note: string;
};
type Update = { id: string; patch: Record<string, unknown> };

const SIZE = 50;
const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm outline-none focus:border-blue-500';
const buttonClass =
  'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-40';
const cellClass = 'border-b border-slate-100 px-3 py-3 align-top';

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function text(value: unknown): string {
  if (value == null) return '';
  return typeof value === 'string' ? value : JSON.stringify(value) ?? '';
}

function editFor(record: Lexeme): Edit {
  return {
    roots: Array.isArray(record.rootIds)
      ? record.rootIds.map(text).join(' | ') : text(record.rootIds),
    family: text(record.wordFamilyId),
    form: text(record.form),
    tr: isObject(record.translations) ? text(record.translations.tr) : '',
    concept: text(record.conceptId),
    dialect: text(record.dialect ?? record.lehce),
    note: text(record.notes),
  };
}

function patchFor(record: Lexeme, edit: Edit): Record<string, unknown> {
  const original = editFor(record);
  const patch: Record<string, unknown> = {};
  if (edit.roots !== original.roots) {
    patch.rootIds = [...new Set(
      edit.roots.split(/[|,;\n]/).map(value => value.trim()).filter(Boolean),
    )];
  }
  if (edit.family !== original.family) patch.wordFamilyId = edit.family.trim() || null;
  if (edit.form !== original.form) patch.form = edit.form;
  if (edit.tr !== original.tr) {
    // Sunucu yüzeysel birleştirse bile mevcut diğer diller korunur.
    patch.translations = {
      ...(isObject(record.translations) ? record.translations : {}),
      tr: edit.tr,
    };
  }
  if (edit.concept !== original.concept) patch.conceptId = edit.concept.trim() || null;
  if (edit.dialect !== original.dialect) patch.dialect = edit.dialect;
  if (edit.note !== original.note) patch.notes = edit.note;
  return patch;
}

function csvCell(value: unknown): string {
  let result = text(value);
  if (/^\s*[=+@-]/.test(result) || /^[\t\r\n]/.test(result)) result = "'" + result;
  return `"${result.replace(/"/g, '""')}"`;
}

export default function BulkTable() {
  const [lexemes, setLexemes] = useState<Lexeme[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [edits, setEdits] = useState<Record<string, Edit>>({});
  const [query, setQuery] = useState('');
  const [conceptFilter, setConceptFilter] = useState('all');
  const [dialectFilter, setDialectFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [hash, setHash] = useState('');
  const savingRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/data/linguistic/lexemes.json', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Veri alınamadı (${response.status}).`);
        const buffer = await response.arrayBuffer();
        const raw: unknown = JSON.parse(
          new TextDecoder().decode(buffer).replace(/^\uFEFF/, ''),
        );
        const records = Array.isArray(raw) ? raw : isObject(raw) ? raw.lexemes : null;
        if (!Array.isArray(records) || !records.length) {
          throw new Error('Lexeme verisi boş veya geçersiz.');
        }
        const ids = new Set<string>();
        for (const record of records) {
          if (!isObject(record) || typeof record.id !== 'string' || !record.id) {
            throw new Error('Geçersiz kayıt kimliği.');
          }
          if (ids.has(record.id)) throw new Error(`Tekrarlanan kimlik: ${record.id}`);
          ids.add(record.id);
        }
        if (!window.crypto?.subtle) {
          throw new Error('Güvenli kayıt için HTTPS veya localhost kullanın.');
        }
        const digest = await window.crypto.subtle.digest('SHA-256', buffer);
        const fileHash = Array.from(new Uint8Array(digest))
          .map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
        if (!controller.signal.aborted) {
          setLexemes(records as Lexeme[]);
          setHash(fileHash);
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : 'Veri yüklenemedi.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  const pending = useMemo<Update[]>(() => lexemes.flatMap(record => {
    const edit = edits[record.id];
    if (!edit) return [];
    const patch = patchFor(record, edit);
    return Object.keys(patch).length ? [{ id: record.id, patch }] : [];
  }), [lexemes, edits]);

  const selectedUpdates = pending.filter(update => selected.has(update.id));

  useEffect(() => {
    if (!pending.length) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [pending.length]);

  const dialects = useMemo(() => [...new Set(
    lexemes.map(record => editFor(record).dialect).filter(Boolean),
  )].sort(), [lexemes]);

  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('tr');
    return lexemes.filter(record => {
      const edit = editFor(record);
      const haystack = [record.id, ...Object.values(edit)]
        .join(' ').toLocaleLowerCase('tr');
      if (search && !haystack.includes(search)) return false;
      if (conceptFilter === 'linked' && !edit.concept.trim()) return false;
      if (conceptFilter === 'unlinked' && edit.concept.trim()) return false;
      return dialectFilter === 'all' || edit.dialect === dialectFilter;
    });
  }, [lexemes, query, conceptFilter, dialectFilter]);

  const pages = Math.max(1, Math.ceil(filtered.length / SIZE));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * SIZE, currentPage * SIZE);
  const allSelected = visible.length > 0 && visible.every(record => selected.has(record.id));

  function toggle(id: string) {
    setSelected(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function togglePage() {
    setSelected(previous => {
      const next = new Set(previous);
      visible.forEach(record => {
        if (allSelected) next.delete(record.id);
        else next.add(record.id);
      });
      return next;
    });
  }

  function change(record: Lexeme, field: keyof Edit, value: string) {
    setEdits(previous => ({
      ...previous,
      [record.id]: { ...(previous[record.id] ?? editFor(record)), [field]: value },
    }));
    setMessage('');
  }

  async function save() {
    if (savingRef.current || !selectedUpdates.length) return;
    if (selectedUpdates.length > 500) {
      setError('Bir kayıtta en fazla 500 değişmiş satır seçin.');
      return;
    }
    if (!hash) {
      setError('Veri hash değeri alınamadı; kayıt gönderilmedi.');
      return;
    }
    if (!window.confirm(`${selectedUpdates.length} satırdaki değişiklikler gerçek veriye kaydedilsin mi?`)) return;

    const updates = selectedUpdates;
    savingRef.current = true;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/admin/curation/update-lexemes', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates, expectedHash: hash }),
      });
      const responseText = await response.text();
      let result: unknown;
      try { result = JSON.parse(responseText); } catch { result = null; }
      if (!response.ok || !isObject(result) || result.success !== true) {
        const explanation = isObject(result) ? text(result.error) : '';
        throw new Error(explanation || (
          response.status === 404
            ? 'Kaydetme API’si bulunamadı (404). Kayıt altyapısı henüz kurulmamış.'
            : `Kayıt doğrulanamadı (${response.status}). Değişiklikler ekranda korundu.`
        ));
      }
      if (result.dryRun === true || !Array.isArray(result.lexemes) || typeof result.hash !== 'string') {
        throw new Error('API gerçek kayıt sonucunu doğrulamadı. Değişiklikler ekranda korundu.');
      }
      const returned = new Map<string, Lexeme>();
      for (const record of result.lexemes) {
        if (!isObject(record) || typeof record.id !== 'string') {
          throw new Error('API geçersiz kayıt döndürdü; listeyi yeniden kontrol edin.');
        }
        returned.set(record.id, record as Lexeme);
      }
      if (updates.some(update => !returned.has(update.id))) {
        throw new Error('API tüm gönderilen kayıtları doğrulamadı; listeyi yeniden kontrol edin.');
      }
      setLexemes(previous => previous.map(record => returned.get(record.id) ?? record));
      setHash(result.hash);
      setEdits(previous => {
        const next = { ...previous };
        updates.forEach(update => { delete next[update.id]; });
        return next;
      });
      setMessage(`${updates.length} satırın kayıt işlemi doğrulandı.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Kayıt doğrulanamadı.');
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  function exportCsv() {
    const rows: unknown[][] = [[
      'rootIds', 'wordFamilyId', 'form', 'lexemeId',
      'translations.tr', 'conceptId', 'dialect', 'notes', 'kaydedilmemis',
    ]];
    lexemes.filter(record => selected.has(record.id)).forEach(record => {
      const edit = edits[record.id] ?? editFor(record);
      rows.push([
        edit.roots, edit.family, edit.form, record.id, edit.tr,
        edit.concept, edit.dialect, edit.note,
        Object.keys(patchFor(record, edit)).length > 0 ? 'evet' : 'hayir',
      ]);
    });
    const url = URL.createObjectURL(new Blob([
      '\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\r\n'),
    ], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'toplu-kurasyon.csv';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function field(record: Lexeme, edit: Edit, key: keyof Edit, label: string) {
    if (!selected.has(record.id)) {
      return <span className="whitespace-pre-wrap break-words">{edit[key] || '—'}</span>;
    }
    if (key === 'note') {
      return <textarea
        aria-label={`${record.id} ${label}`}
        className={`${inputClass} h-10 resize-y focus:h-28`}
        value={edit[key]} disabled={saving}
        onChange={event => change(record, key, event.target.value)}
      />;
    }
    return <input
      aria-label={`${record.id} ${label}`}
      className={inputClass} value={edit[key]} disabled={saving}
      onChange={event => change(record, key, event.target.value)}
    />;
  }

  const headers = [
    'Seç', 'Kök kimlikleri', 'Aile kimliği', 'Lexeme + kimlik',
    'TR anlam / lexeme', 'Kavram kimliği', 'TR anlam / kavram',
    'Lehçe', 'İnceleme', 'Not',
  ];

  return (
    <main className="min-w-0 flex-1 bg-slate-50 p-4 text-slate-900 md:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Lexeme Kürasyonu</h1>
          <p className="mt-2 text-sm text-slate-500">Toplu düzenleme · Seçili satırların hücrelerini düzenleyin</p>
        </div>
        <div className="flex gap-2">
          <button className={buttonClass} disabled={!selected.size || saving} onClick={exportCsv}>
            Seçili CSV
          </button>
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            disabled={loading || saving || !hash || !selectedUpdates.length}
            onClick={() => void save()}>
            {saving ? 'Kaydediliyor…' : `Kaydet (${selectedUpdates.length})`}
          </button>
        </div>
      </header>

      <p className="mb-4 text-xs text-slate-500">
        Yalnız seçili ve değişmiş satırlar gönderilir. Seçimi kaldırmak değişiklikleri silmez.
        Kavram anlamının kaynağı ve inceleme şeması bağlı olmadığı için bu iki alan salt okunurdur.
      </p>
      {loading && <p role="status" className="mb-4">Yükleniyor…</p>}
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap gap-3 border-b p-4">
          <input className={`${inputClass} flex-1`} aria-label="Ara"
            placeholder="Kelime, kimlik, anlam, kök, aile, kavram…"
            value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} />
          <select className={buttonClass} aria-label="Kavram filtresi" value={conceptFilter}
            onChange={event => { setConceptFilter(event.target.value); setPage(1); }}>
            <option value="all">Tüm kavram bağlantıları</option>
            <option value="linked">Bağlantı var</option>
            <option value="unlinked">Bağlantı yok</option>
          </select>
          <select className={buttonClass} aria-label="Lehçe filtresi" value={dialectFilter}
            onChange={event => { setDialectFilter(event.target.value); setPage(1); }}>
            <option value="all">Tüm lehçeler</option>
            {dialects.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap justify-between gap-2 px-4 py-3 text-xs text-slate-500">
          <span>{filtered.length.toLocaleString('tr-TR')} sonuç · {selected.size} seçili</span>
          <span>{pending.length} kaydedilmemiş satır · {selectedUpdates.length} kayda hazır</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm" style={{ minWidth: 1700 }}>
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>{headers.map((header, index) => (
                <th key={header} className="border-y px-3 py-4">
                  {index === 0 ? <input type="checkbox" aria-label="Sayfayı seç"
                    checked={allSelected} disabled={saving || !visible.length}
                    onChange={togglePage} /> : header}
                </th>
              ))}</tr>
            </thead>
            <tbody>
              {visible.map(record => {
                const edit = edits[record.id] ?? editFor(record);
                const changed = Object.keys(patchFor(record, edit)).length > 0;
                return (
                  <tr key={record.id} className={selected.has(record.id) ? 'bg-blue-50' : 'bg-white'}>
                    <td className={cellClass}>
                      <input type="checkbox" aria-label={`${record.id} seç`}
                        checked={selected.has(record.id)} disabled={saving}
                        onChange={() => toggle(record.id)} />
                    </td>
                    <td className={`${cellClass} font-mono text-xs`}>{field(record, edit, 'roots', 'Kök kimlikleri')}</td>
                    <td className={`${cellClass} font-mono text-xs`}>{field(record, edit, 'family', 'Aile kimliği')}</td>
                    <td className={cellClass}>
                      {field(record, edit, 'form', 'Kelime')}
                      <div className="mt-1 font-mono text-xs text-slate-500">{record.id}</div>
                      {changed && <span className="text-xs text-amber-700">Kaydedilmedi</span>}
                    </td>
                    <td className={cellClass}>{field(record, edit, 'tr', 'TR anlam')}</td>
                    <td className={cellClass}>{field(record, edit, 'concept', 'Kavram kimliği')}</td>
                    <td className={`${cellClass} text-xs text-slate-400`}>Kaynak bağlı değil</td>
                    <td className={cellClass}>{field(record, edit, 'dialect', 'Lehçe')}</td>
                    <td className={`${cellClass} text-xs text-slate-500`}>
                      {text(record.reviewStatus) || 'İnceleme kaynağı bağlı değil'}
                    </td>
                    <td className={cellClass}>{field(record, edit, 'note', 'Not')}</td>
                  </tr>
                );
              })}
              {!loading && !visible.length && <tr>
                <td colSpan={headers.length} className="p-10 text-center text-slate-500">Gösterilecek kayıt yok.</td>
              </tr>}
            </tbody>
          </table>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <button className={buttonClass} disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}>Önceki</button>
            <span className="text-xs">{currentPage} / {pages}</span>
            <button className={buttonClass} disabled={currentPage === pages}
              onClick={() => setPage(currentPage + 1)}>Sonraki</button>
          </div>
          <button className={buttonClass} disabled={saving || !selected.size}
            onClick={() => setSelected(new Set())}>Seçimleri kaldır</button>
        </footer>
      </section>
    </main>
  );
}