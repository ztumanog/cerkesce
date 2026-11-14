"use client";
import ImportExport from "./ImportExport";
import { useEffect, useMemo, useRef, useState } from "react";
type Lexeme = { id: string; [key: string]: unknown };
type Language = { key: string; label: string; icon: string; badge: string; border: string; background: string; accent: string };
const languages: Language[] = [
  { key: "tr", label: "TURKCE", icon: "TR", badge: "TR", border: "#38bdf8", background: "#eaf4ff", accent: "#0369a1" },
  { key: "en", label: "INGILIZCE", icon: "EN", badge: "EN", border: "#4ade80", background: "#eaffea", accent: "#166534" },
  { key: "ru", label: "RUSCA", icon: "RU", badge: "RU", border: "#f87171", background: "#fef2f2", accent: "#b91c1c" },
  { key: "ady", label: "ADIGECE", icon: "ADY", badge: "ADY", border: "#2dd4bf", background: "#f0fdfa", accent: "#0f766e" },
  { key: "ar", label: "ARAPCA", icon: "AR", badge: "RTL", border: "#c4b5fd", background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 20%, #e9d5ff 70%, #a78bfa 100%)", accent: "#78350f" },
];
const SIZE = 50;
const inputClass = "mt-3 w-full rounded-xl border-2 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2";
const buttonClass = "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40";
function isObject(v: unknown): v is Record<string, unknown> { return v !== null && typeof v === "object" && !Array.isArray(v); }
function text(v: unknown): string { return typeof v === "string" ? v : ""; }
function translations(r: Lexeme | null): Record<string, unknown> { return r && isObject(r.translations) ? r.translations : {}; }
function rootsText(r: Lexeme | null): string { return Array.isArray(r?.rootIds) ? r.rootIds.map(text).join(", ") : text(r?.rootIds); }
function isSorunlu(r: Lexeme): boolean { const tr = text(translations(r).tr); const lit = text(r.literalMeaning); const cid = text(r.conceptId); return tr.includes("?") || lit.includes("<") || !cid; }
function sorunNedeni(r: Lexeme): string { const o: string[] = []; if (text(translations(r).tr).includes("?")) o.push("trde ?"); if (text(r.literalMeaning).includes("<")) o.push("literalde HTML"); if (!text(r.conceptId)) o.push("conceptId bos"); return o.join(" - "); }
function changedPatch(o: Lexeme, d: Lexeme): Record<string, unknown> { const p: Record<string, unknown> = {}; for (const k of ["form","ipa","rootIds","wordFamilyId","conceptId","dialect","lehce","notes","translations"]) { if (JSON.stringify(o[k]) !== JSON.stringify(d[k])) p[k] = d[k]; } return p; }
export default function SinglePage() {
  const [lexemes, setLexemes] = useState<Lexeme[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [draft, setDraft] = useState<Lexeme | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [playing, setPlaying] = useState(false);
  const [onlyBad, setOnlyBad] = useState(false);
  const [saving, setSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const c = new AbortController();
    async function load() {
      try {
        const res = await fetch("/data/linguistic/lexemes.json", { cache: "no-store", signal: c.signal });
        if (!res.ok) throw new Error("Veri alinamadi (" + res.status + ").");
        const raw: unknown = await res.json();
        const records = Array.isArray(raw) ? raw : isObject(raw) ? raw.lexemes : undefined;
        if (!Array.isArray(records) || !records.length) throw new Error("Lexeme verisi bos veya gecersiz.");
        const seen = new Set<string>(); const deduped: Lexeme[] = []; const dups: string[] = [];
        for (const r of records) {
          if (!isObject(r) || typeof r.id !== "string" || !r.id) continue;
          if (seen.has(r.id)) { dups.push(r.id); continue; }
          seen.add(r.id); deduped.push(r as Lexeme);
        }
        if (!c.signal.aborted) {
          setLexemes(deduped); setSelectedId(deduped[0].id); setDraft(deduped[0]);
          if (dups.length) setMessage("Uyari: " + dups.length + " tekrarli kimlik atlandi (orn: " + dups.slice(0,3).join(", ") + "). Ilk kayit korundu.");
        }
      } catch (e) { if (!c.signal.aborted) setError(e instanceof Error ? e.message : "Veri yuklenemedi."); }
      finally { if (!c.signal.aborted) setLoading(false); }
    }
    void load(); return () => c.abort();
  }, []);
  useEffect(() => () => { audioRef.current?.pause(); }, []);
  const original = lexemes.find(r => r.id === selectedId);
  const patch = original && draft ? changedPatch(original, draft) : {};
  const dirty = Object.keys(patch).length > 0;
  const values = translations(draft);
  const sorunluCount = useMemo(() => lexemes.filter(isSorunlu).length, [lexemes]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const filtered = useMemo(() => {
    const s = query.trim().toLocaleLowerCase("tr");
    return lexemes.filter(r => {
      if (onlyBad && !isSorunlu(r)) return false;
      if (!s) return true;
      return [r.id, text(r.form), JSON.stringify(r.translations ?? {}), rootsText(r), text(r.wordFamilyId), text(r.conceptId)].join(" ").toLocaleLowerCase("tr").includes(s);
    });
  }, [lexemes, query, onlyBad]);
  const pages = Math.max(1, Math.ceil(filtered.length / SIZE));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * SIZE, currentPage * SIZE);
  const adyKey = original && Object.prototype.hasOwnProperty.call(translations(original), "ady") ? "ady" : original && Object.prototype.hasOwnProperty.call(translations(original), "ad") ? "ad" : null;
  const dialectKey = original && Object.prototype.hasOwnProperty.call(original, "dialect") ? "dialect" : original && Object.prototype.hasOwnProperty.call(original, "lehce") ? "lehce" : "dialect";
  function select(r: Lexeme) {
    if (r.id === selectedId) return;
    if (dirty && !window.confirm("Kaydedilmemis taslak var. Taslagi birakip diger kelimeye gecilsin mi?")) return;
    audioRef.current?.pause(); audioRef.current = null; setPlaying(false);
    setSelectedId(r.id); setDraft(r); setMessage(""); setError("");
  }
  function change(k: string, v: unknown) { setDraft(p => p ? { ...p, [k]: v } : p); setMessage(""); }
  function changeTranslation(k: string, v: string) { setDraft(p => p ? { ...p, translations: { ...translations(p), [k]: v } } : p); setMessage(""); }
  async function play() {
    const src = text(draft?.audioUrl); if (!src) return; setError("");
    try {
      audioRef.current?.pause(); const a = new Audio(src); audioRef.current = a;
      a.onended = () => { if (audioRef.current === a) setPlaying(false); };
      a.onerror = () => { if (audioRef.current === a) { setPlaying(false); setError("Ses kaydi oynatilamadi."); } };
      await a.play(); if (audioRef.current === a) setPlaying(true);
    } catch { setPlaying(false); setError("Ses kaydi oynatilamadi."); }
  }
  function downloadDraft() {
    if (!draft || !dirty) return;
    const content = { kind: "lexeme-review-draft", serverWrite: false, exportedAt: new Date().toISOString(), updates: [{ id: draft.id, patch }] };
    const url = URL.createObjectURL(new Blob([JSON.stringify(content, null, 2) + "\n"], { type: "application/json;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "lexeme-taslak-" + draft.id.replace(/[^a-zA-Z0-9_-]/g, "_") + ".json";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Taslak indirme baslatildi. Sunucu verisi degistirilmedi.");
  }
  async function saveOne() {
    if (!draft || !dirty) return;
    if (!window.confirm("Bu kayit lexemes.jsona yazilacak. Once yedek alinacak. Onayliyor musun?")) return;
    setSaving(true); setError(""); setMessage("");
    try {
      const res = await fetch("/api/curation/bulk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ updates: [{ id: draft.id, patch }], confirmStructural: true }) });
      const j = await res.json(); if (!res.ok) throw new Error(j.error || j.detail || "Yazma basarisiz");
      setMessage("Kaydedildi: " + draft.id + ". Yedek: " + j.backup + ". Commit terminalden.");
      setDraft({ ...draft });
    } catch (e: any) { setError(e?.message || "Yazma hatasi"); } finally { setSaving(false); }
  }
  const identifiers = [
    { key: "rootIds", label: "KOK / ROOT", value: rootsText(draft) },
    { key: "wordFamilyId", label: "AILE / FAMILY", value: text(draft?.wordFamilyId) },
    { key: "conceptId", label: "KAVRAM / CONCEPT", value: text(draft?.conceptId) },
    { key: dialectKey, label: "LEHCE / DIALECT", value: text(draft?.[dialectKey]) },
  ];
  return (
    <main className="min-w-0 flex-1 bg-slate-100 p-4 text-slate-900">
      <ImportExport lexemes={lexemes} filtered={filtered} onDone={() => window.location.reload()} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <aside className="flex shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 lg:w-80">
          <h2 className="font-black">INCELEME KUYRUGU <span className="ml-2 text-sm text-violet-700">{filtered.length.toLocaleString("tr-TR")}</span></h2>
          <p className="mt-1 text-xs text-slate-500">{lexemes.length.toLocaleString("tr-TR")} kelime - <span className="text-red-600 font-bold">{sorunluCount.toLocaleString("tr-TR")} sorunlu</span></p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => { setOnlyBad(false); setPage(1); }} className={"flex-1 rounded-full px-3 py-2 text-xs font-bold border " + (!onlyBad ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200")}>Tumu</button>
            <button type="button" onClick={() => { setOnlyBad(true); setPage(1); }} className={"flex-1 rounded-full px-3 py-2 text-xs font-bold border " + (onlyBad ? "bg-red-600 text-white border-red-600" : "bg-red-50 text-red-700 border-red-200")}>Sadece sorunlu ({sorunluCount})</button>
          </div>
          <input aria-label="Inceleme kuyrugunda ara" className={inputClass} style={{ borderColor: "#e2e8f0" }} value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Kelime, anlam, kimlik ara..." />
          <div className="mt-3 max-h-96 space-y-2 overflow-y-auto lg:max-h-screen">
            {visible.map(r => (
              <button key={r.id} type="button" aria-pressed={selectedId === r.id} onClick={() => select(r)} className="w-full rounded-xl border p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600" style={{ border: selectedId === r.id ? "2px solid #7c3aed" : "1px solid #e2e8f0", background: selectedId === r.id ? "#f5f3ff" : "#fff" }}>
                <strong className="block">{text(r.form) || r.id}</strong>
                <span className="mt-1 block text-xs text-slate-600">{text(translations(r).tr)}</span>
                {isSorunlu(r) && <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text- font-bold text-red-700">Sorun: {sorunNedeni(r)}</span>}
                <span className="mt-1 block font-mono text-xs text-slate-500">{r.id}</span>
              </button>
            ))}
            {loading && <p role="status">Yukleniyor...</p>}
            {!loading && !visible.length && <p className="text-sm">Eslesen kayit yok.</p>}
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <button type="button" className={buttonClass} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Onceki</button>
            <span className="text-xs">{currentPage} / {pages}</span>
            <button type="button" className={buttonClass} disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>Sonraki</button>
          </div>
        </aside>
        <section className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
          <h1 className="text-3xl font-black tracking-tight">Dil Kurasyonu</h1>
          <p className="mt-2 text-sm text-slate-600">Dil karsiliklari - Cerkesce kelime / IPA - Kok, aile, kavram ve lehce</p>
          <p className="mt-2 font-mono text-xs text-violet-700">{selectedId || "Kayit secilmedi"}</p>
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}
          {draft && (
            <>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {languages.filter(l => l.key !== "ar").map(l => {
                  const k = l.key === "ady" ? adyKey : l.key;
                  return (
                    <div key={l.key} className="rounded-2xl border-2 p-4" style={{ borderColor: l.border, background: l.background }}>
                      <div className="flex items-center justify-between gap-2 font-black"><label htmlFor={"language-" + l.key}>{l.icon} {l.label}</label><span className="rounded-full bg-white px-2 py-1 text-xs" style={{ color: l.accent }}>{l.badge}</span></div>
                      <input id={"language-" + l.key} className={inputClass} style={{ borderColor: l.border }} value={k ? text(values[k]) : ""} disabled={!k} onChange={e => { if (k) changeTranslation(k, e.target.value); }} placeholder={k ? "Dil karsiligini yaz..." : "Veri anahtari bagli degil"} />
                      <p className="mt-2 text-xs" style={{ color: l.accent }}>{k ? "Duzenlenebilir - " + k : "Ad / ady kaynagi dogrulanmali"}</p>
                    </div>
                  );
                })}
                <div className="rounded-2xl border-2 border-violet-400 bg-violet-50 p-4">
                  <div className="flex items-center justify-between gap-2 font-black"><label htmlFor="lexeme-form">CERKESCE / IPA</label><span className="rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-800">SES</span></div>
                  <div className="mt-3 flex gap-2">
                    <input id="lexeme-form" className={inputClass + " mt-0 min-w-0 flex-1 border-violet-400"} value={text(draft.form)} onChange={e => change("form", e.target.value)} placeholder="Cerkesce kelime" />
                    <button type="button" aria-label="Kaynak ses kaydini dinle" disabled={!text(draft.audioUrl)} onClick={() => void play()} className="shrink-0 rounded-xl px-3 text-white disabled:opacity-40" style={{ background: playing ? "#4c1d95" : "#6d5bdb" }}>Ses</button>
                  </div>
                  <label htmlFor="lexeme-ipa" className="mt-3 block text-xs font-semibold text-violet-800">IPA</label>
                  <input id="lexeme-ipa" className={inputClass + " mt-1 border-violet-400"} value={text(draft.ipa)} onChange={e => change("ipa", e.target.value)} placeholder="IPA gosterimi" />
                  <p className="mt-2 text-xs text-violet-800">{text(draft.audioUrl) ? "Kaynak ses kaydi mevcut" : "Ses kaydi yok"}</p>
                </div>
                <div className="rounded-2xl border-2 p-4" style={{ borderColor: "#c4b5fd", background: languages[4].background }}>
                  <div className="flex items-center justify-between gap-2 font-black"><label htmlFor="language-ar">ARAPCA</label><span className="rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-900">RTL</span></div>
                  <input id="language-ar" dir="rtl" className={inputClass + " border-amber-400 text-right"} value={text(values.ar)} onChange={e => changeTranslation("ar", e.target.value)} placeholder="Arapca..." />
                  <p className="mt-2 text-xs text-amber-900">Duzenlenebilir - RTL aktif</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {identifiers.map(f => (
                  <label key={f.key} className="block rounded-2xl border-2 border-slate-500 bg-white p-4">
                    <span className="text-xs font-black text-slate-600">{f.label}</span>
                    <input className={inputClass + " border-slate-300"} value={f.value} onChange={e => change(f.key, f.key === "rootIds" ? [...new Set(e.target.value.split(/[,|;]/).map(v => v.trim()).filter(Boolean))] : e.target.value)} />
                    <span className="mt-2 block text-xs text-slate-600">Taslakta duzenlenebilir</span>
                  </label>
                ))}
              </div>
              <label className="mt-3 block rounded-2xl border-2 border-slate-500 p-4">
                <span className="text-xs font-black text-slate-600">NOT - notes</span>
                <textarea className={inputClass + " border-slate-300"} rows={3} value={text(draft.notes)} onChange={e => change("notes", e.target.value)} placeholder="Degisiklik gerekcesi..." />
              </label>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <span className={"text-sm font-semibold " + (dirty ? "text-amber-800" : "text-slate-600")}>{dirty ? "Kaydedilmemis taslak var" : "Degisiklik yok"}</span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={buttonClass} disabled={!dirty} onClick={() => { if (original && window.confirm("Bu taslak degisiklikleri geri alinsin mi?")) { setDraft(original); setMessage(""); } }}>Geri al</button>
                  <button type="button" disabled={!dirty} onClick={downloadDraft} className="rounded-xl bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:opacity-40">Taslagi indir</button>
                  <button type="button" disabled={!dirty || saving} onClick={() => void saveOne()} className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 disabled:opacity-40">{saving ? "Kaydediliyor..." : "Kaydet"}</button>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">Kaydet, KARAR-16ya gore dogrulama + yedek + lexemes.json yazma yapar. Commit terminalden.</p>
              <details className="mt-5 rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer text-sm font-semibold">Ozgun kaydin tum alanlari - salt okunur</summary>
                <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-50 p-3 text-xs">{JSON.stringify(original, null, 2)}</pre>
              </details>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
