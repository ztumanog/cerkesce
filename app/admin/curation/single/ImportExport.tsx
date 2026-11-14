"use client";
import { useMemo, useRef, useState } from "react";
type Lexeme = { id: string; [k: string]: any };
type Props = { lexemes: Lexeme[]; filtered: Lexeme[]; onDone?: () => void };
const s = (v: any) => (typeof v === "string" ? v : v == null ? "" : String(v));
function getTr(x: Lexeme) {
  const t = x.translations;
  if (t && typeof t === "object" && !Array.isArray(t)) return s((t as any).tr);
  return s(x.tr);
}
function toRow(x: Lexeme) {
  return { id: s(x.id), form: s(x.form), ipa: s(x.ipa), tr: getTr(x), en: s(x.translations?.en), ru: s(x.translations?.ru), ar: s(x.translations?.ar), ady: s(x.translations?.ady ?? x.translations?.ad), literalMeaning: s(x.literalMeaning), conceptId: s(x.conceptId), wordFamilyId: s(x.wordFamilyId), rootIds: Array.isArray(x.rootIds) ? x.rootIds.join("|") : s(x.rootIds), dialect: s(x.dialect ?? x.lehce), notes: s(x.notes) };
}
const COLS = ["id","form","ipa","tr","en","ru","ar","ady","literalMeaning","conceptId","wordFamilyId","rootIds","dialect","notes"];
function csvEscape(v: string) { return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
function parseCSV(text: string): Record<string,string>[] {
  const rows: string[][] = []; let cur: string[] = []; let val = ""; let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) { if (c === '"') { if (text[i+1] === '"') { val += '"'; i++; } else inQ = false; } else val += c; }
    else { if (c === '"') inQ = true; else if (c === ",") { cur.push(val); val = ""; } else if (c === "\n") { cur.push(val); rows.push(cur); cur = []; val = ""; } else if (c !== "\r") val += c; }
  }
  if (val !== "" || cur.length) { cur.push(val); rows.push(cur); }
  if (!rows.length) return [];
  const head = rows[0].map(h => h.trim());
  return rows.slice(1).filter(r => r.some(c => c.trim() !== "")).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}
export default function ImportExport({ lexemes, filtered, onDone }: Props) {
  const [preview, setPreview] = useState<Array<{ id: string; patch: Record<string, any>; error?: string }>>([]);
  const [confirmStructural, setConfirmStructural] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileKind, setFileKind] = useState<"json" | "csv">("json");
  const counts = useMemo(() => ({ total: lexemes.length, filtered: filtered.length }), [lexemes, filtered]);
  function download(name: string, content: string, type: string) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement("a"); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function exportJSON() {
    const rows = filtered.map(toRow);
    download("lexemes-export-" + new Date().toISOString().slice(0,10) + ".json", JSON.stringify({ kind: "lexeme-export", exportedAt: new Date().toISOString(), count: rows.length, lexemes: filtered }, null, 2), "application/json");
    setMsg(rows.length + " kayit JSON olarak indirildi.");
  }
  function exportCSV() {
    const rows = filtered.map(toRow);
    const head = COLS.join(",");
    const lines = rows.map(r => COLS.map(c => csvEscape(s((r as any)[c]))).join(","));
    download("lexemes-export-" + new Date().toISOString().slice(0,10) + ".csv", "\uFEFF" + [head, ...lines].join("\n"), "text/csv;charset=utf-8");
    setMsg(rows.length + " kayit CSV olarak indirildi.");
  }
  async function onFile(file: File) {
    setErr(""); setMsg(""); setPreview([]);
    try {
      const textContent = await file.text();
      const isCSV = fileKind === "csv" || file.name.toLowerCase().endsWith(".csv");
      let updates: Array<{ id: string; patch: Record<string, any> }> = [];
      if (!isCSV) {
        const parsed = JSON.parse(textContent);
        const arr = Array.isArray(parsed) ? parsed : parsed.lexemes ?? parsed.updates ?? [];
        for (const item of arr) {
          if (!item?.id) continue;
          if (item.patch) updates.push({ id: s(item.id), patch: item.patch });
          else {
            const patch: Record<string, any> = {};
            if (item.tr !== undefined || item.translations?.tr !== undefined) patch.translations = { tr: item.tr ?? item.translations?.tr };
            for (const k of ["form","ipa","literalMeaning","conceptId","wordFamilyId","rootIds","dialect","notes"]) if (item[k] !== undefined) patch[k] = item[k];
            if (item.translations) patch.translations = { ...(patch.translations || {}), ...item.translations };
            updates.push({ id: s(item.id), patch });
          }
        }
      } else {
        const rows = parseCSV(textContent);
        for (const r of rows) {
          if (!r.id) continue;
          const patch: Record<string, any> = {};
          const trs: Record<string,string> = {};
          if (r.tr) trs.tr = r.tr; if (r.en) trs.en = r.en; if (r.ru) trs.ru = r.ru; if (r.ar) trs.ar = r.ar; if (r.ady) trs.ady = r.ady;
          if (Object.keys(trs).length) patch.translations = trs;
          for (const k of ["form","ipa","literalMeaning","conceptId","wordFamilyId","dialect","notes"] as const) if (r[k]) patch[k] = r[k];
          if (r.rootIds) patch.rootIds = r.rootIds.split("|").map(v => v.trim()).filter(Boolean);
          updates.push({ id: r.id, patch });
        }
      }
      const byId = new Map(lexemes.map(x => [s(x.id), x]));
      const checked: Array<{ id: string; patch: Record<string, any>; error?: string }> = updates.map(u => {
        if (!byId.has(u.id)) return { ...u, error: "ID bulunamadi" };
        const tr = u.patch.translations?.tr;
        if (typeof tr === "string" && tr.includes("?")) return { ...u, error: "tr icinde ? var" };
        if (typeof u.patch.literalMeaning === "string" && String(u.patch.literalMeaning).includes("<")) return { ...u, error: "literalMeaning icinde < var" };
        return u;
      });
      setPreview(checked);
      setMsg(checked.length + " satir okundu, " + checked.filter(x => x.error).length + " hatali.");
    } catch (e: any) { setErr("Dosya okunamadi: " + (e?.message || "hata")); }
  }
  async function apply() {
    const good = preview.filter(x => !x.error);
    if (!good.length) { setErr("Uygulanacak gecerli satir yok."); return; }
    const hasStructural = good.some(u => ["conceptId","wordFamilyId","rootIds"].some(k => k in u.patch));
    if (hasStructural && !confirmStructural) { setErr("Yapisal alan degisimi var, onay kutusunu isaretle."); return; }
    if (!window.confirm(good.length + " kayit yazilacak. Once yedek alinacak. Onayliyor musun?")) return;
    setBusy(true); setErr(""); setMsg("");
    try {
      const res = await fetch("/api/curation/bulk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ updates: good, confirmStructural }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || j.detail || "Yazma basarisiz");
      setMsg("Uygulandi: " + j.applied + " kayit. Yedek: " + j.backup + ". Commit terminalden.");
      setPreview([]);
      onDone?.();
    } catch (e: any) { setErr(e?.message || "Yazma hatasi"); } finally { setBusy(false); }
  }
  return (
    <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="font-black text-slate-900">JSON / CSV - Indir / Yukle</h3><p className="text-xs text-slate-500 mt-0.5">Filtreli liste ({counts.filtered}) indirilir. Yuklemede once onizleme + dogrulama, sonra yazma.</p></div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportJSON} className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white">JSON indir ({counts.filtered})</button>
          <button type="button" onClick={exportCSV} className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white">CSV indir ({counts.filtered})</button>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <div className="flex gap-1 rounded-full bg-slate-100 p-1 text-xs font-bold">
          <button type="button" onClick={() => setFileKind("json")} className={"px-3 py-1.5 rounded-full " + (fileKind === "json" ? "bg-white shadow" : "text-slate-500")}>JSON yukle</button>
          <button type="button" onClick={() => setFileKind("csv")} className={"px-3 py-1.5 rounded-full " + (fileKind === "csv" ? "bg-white shadow" : "text-slate-500")}>CSV yukle</button>
        </div>
        <input ref={fileRef} type="file" accept={fileKind === "json" ? ".json" : ".csv"} className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) void onFile(f); e.target.value = ""; }} />
        <button type="button" onClick={() => fileRef.current?.click()} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700">Dosya sec ({fileKind.toUpperCase()})</button>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><input type="checkbox" checked={confirmStructural} onChange={e => setConfirmStructural(e.target.checked)} /> Yapisal alan toplu degisimini onayliyorum</label>
        {preview.length > 0 && <button type="button" disabled={busy} onClick={() => void apply()} className="ml-auto rounded-xl bg-violet-700 px-4 py-2 text-xs font-bold text-white disabled:opacity-40">{busy ? "Yaziliyor..." : "Uygula (" + preview.filter(x => !x.error).length + " gecerli)"}</button>}
      </div>
      {msg && <p className="mt-3 rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-800">{msg}</p>}
      {err && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}
      {preview.length > 0 && (
        <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs"><thead><tr className="bg-slate-50 text-left"><th className="px-3 py-2">ID</th><th className="px-3 py-2">Yama</th><th className="px-3 py-2">Durum</th></tr></thead>
          <tbody>{preview.slice(0, 100).map((row, i) => (
            <tr key={row.id + "-" + i} className="border-t border-slate-100"><td className="px-3 py-1.5 font-mono">{row.id}</td><td className="px-3 py-1.5 max-w- truncate">{JSON.stringify(row.patch)}</td><td className="px-3 py-1.5">{row.error ? <span className="text-red-600 font-bold">{row.error}</span> : <span className="text-emerald-600 font-bold">Gecerli</span>}</td></tr>
          ))}</tbody></table>
        </div>
      )}
      <p className="mt-2 text- text-slate-400">CSV sutunlari: id, form, ipa, tr, en, ru, ar, ady, literalMeaning, conceptId, wordFamilyId, rootIds (| ile), dialect, notes.</p>
    </div>
  );
}
