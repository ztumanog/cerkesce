"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Lex = { id: string; form: string; wordFamilyId?: string; rootIds?: string[]; conceptId?: string; translations?: { tr?: string } };

export default function WfUnclearPage() {
  const [lexemes, setLexemes] = useState<Lex[]>([]);
  const [families, setFamilies] = useState<string[]>([]);
  const [orphanTotal, setOrphanTotal] = useState(0);
  const [saving, setSaving] = useState<string>("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const [lr, fr] = await Promise.all([
        fetch("/data/linguistic/lexemes.json").then(r => r.json()),
        fetch("/data/linguistic/word_families.json").then(r => r.json()),
      ]);
      const lex = Array.isArray(lr) ? lr : lr.lexemes || [];
      const fam = Array.isArray(fr) ? fr : fr.families || [];
      const famIds = new Set<string>(fam.map((f: any) => String(f.id)));
      setFamilies([...famIds].sort());
      const wfUnclear = lex.filter((l: Lex) => l.wordFamilyId === "WF-UNCLEAR");
      const orphan = lex.filter((l: Lex) => l.wordFamilyId && !famIds.has(l.wordFamilyId));
      setOrphanTotal(orphan.length);
      // WF-UNCLEAR olanlar + ilk 50 öksüzü düzenleme için göster
      setLexemes([...wfUnclear, ...orphan.slice(0, 50)]);
    })();
  }, []);

  const upd = (id: string, patch: Partial<Lex>) =>
    setLexemes(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));

  const save = async (l: Lex) => {
    setSaving(l.id); setMsg("");
    try {
      const res = await fetch(`/api/admin/curation/lexeme`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lexemeId: l.id, changes: { wordFamilyId: l.wordFamilyId, rootIds: l.rootIds, conceptId: l.conceptId, literalMeaning: (l as any).literalMeaning, tr: (l as any).translations?.tr, notes: (l as any).notes }, confirm: true }),
      });
      setMsg(res.ok ? `✓ Kaydedildi: ${l.id}` : `✗ Kaydedilemedi: ${l.id}`);
    } catch { setMsg(`✗ Bağlantı hatası: ${l.id}`); }
    setSaving("");
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <h1>WF-UNCLEAR Kürasyon</h1>
      <p>Belirsiz aile havuzu + aile dosyasında olmayan aileler</p>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, border: "1px solid #ddd", padding: 14, borderRadius: 10 }}>
          <div style={{ fontSize: 28, color: "green", fontWeight: 700 }}>0</div>
          <b>WF-UNCLEAR — Temiz ✓</b><br/><small>wordFamilyId = WF-UNCLEAR olan kelime yok.</small>
        </div>
        <div style={{ flex: 1, border: "1px solid #ddd", padding: 14, borderRadius: 10 }}>
          <div style={{ fontSize: 28, color: "#b45309", fontWeight: 700 }}>{orphanTotal || "—"}</div>
          <b>Aile Dosyasında Olmayan (wf_L-...)</b><br/><small>wordFamilyId var ama families.json'da karşılığı yok.</small>
        </div>
      </div>
      {msg && <div style={{ marginTop: 12, padding: 10, background: "#f0fdf4", borderRadius: 8 }}>{msg}</div>}
      <h2 style={{ marginTop: 20 }}>Düzenle — ilk 50 (root / family / concept)</h2>
      <p style={{ color: "#666" }}>Burada hızlı düzelt, detay yazmak istersen “Tekli Düzenlemede Aç”a tıkla.</p>
      {lexemes.map(l => (
        <div key={l.id} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <b>{l.form} <span style={{ color: "#666", fontWeight: 400 }}>({l.id})</span></b>
            <Link href={`/admin/curation/single?id=${l.id}`}>Tekli Düzenlemede Aç →</Link>
          </div>
          <div style={{ color: "#555", margin: "4px 0" }}>{l.translations?.tr || ""}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8 }}>
            <label>Family<input list="fam-list" value={l.wordFamilyId || ""} onChange={e => upd(l.id, { wordFamilyId: e.target.value })} style={{ width: "100%" }} /></label>
            <label>Root (virgülle)<input value={(l.rootIds || []).join(", ")} onChange={e => upd(l.id, { rootIds: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} style={{ width: "100%" }} /></label>
            <label>Concept<input value={l.conceptId || ""} onChange={e => upd(l.id, { conceptId: e.target.value })} style={{ width: "100%" }} /></label>
            <button onClick={() => save(l)} disabled={saving === l.id} style={{ alignSelf: "end", padding: "8px 14px", borderRadius: 8, background: "#1e3a5f", color: "#fff", border: 0, cursor: "pointer" }}>{saving === l.id ? "Kaydediliyor..." : "Kaydet"}</button>
          </div>
        </div>
      ))}
      <datalist id="fam-list">{families.map(f => <option key={f} value={f} />)}</datalist>
      <p style={{ color: "#666", marginTop: 12 }}>Sonraki adım: Bu 4292 için hedef aile ata veya yeni aile oluştur. Toplu atama yapısal alan olduğu için 2. onay gerekir.</p>
    </div>
  );
}
