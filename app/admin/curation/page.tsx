"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Counts = { roots: number; families: number; concepts: number; lexemes: number };

export default function CurationIndex() {
  const [counts, setCounts] = useState<Counts>({ roots: 0, families: 0, concepts: 0, lexemes: 0 });
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          fetch("/data/linguistic/roots.json").then(r=>r.json()).catch(()=>[]),
          fetch("/data/linguistic/word_families.json").then(r=>r.json()).catch(()=>[]),
          fetch("/data/linguistic/concepts.json").then(r=>r.json()).catch(()=>[]),
          fetch("/data/linguistic/lexemes.json").then(r=>r.json()).catch(()=>[]),
        ]);
        const c = {
          roots: Array.isArray(r1) ? r1.length : (r1.roots?.length||0),
          families: Array.isArray(r2) ? r2.length : (r2.families?.length||0),
          concepts: Array.isArray(r3) ? r3.length : (r3.concepts?.length||0),
          lexemes: Array.isArray(r4) ? r4.length : (r4.lexemes?.length||0),
        };
        setCounts(c);
      } catch (e) {
        setMsg((e as Error).message);
      }
    }
    load();
  }, []);

  const cards = [
    { id: "roots", href: "/admin/curation/roots", title: "KÖKLER", tr: "Kök", en: "Root", count: counts.roots, color: "#059669", bg: "#ecfdf5", border: "#10b981", desc: "roots.json gerçek • lexemes rootIds ile bağlı • KBD ana form", emoji: "🌱" },
    { id: "family", href: "/admin/curation/family", title: "AİLELER", tr: "Aile", en: "Word Family", count: counts.families, color: "#2563eb", bg: "#eff6ff", border: "#3b82f6", desc: "word_families.json 1018 gerçek • conceptIds + lexemeIds • bu köke ait mi?", emoji: "👨‍👩‍👧‍👦" },
    { id: "concepts", href: "/admin/curation/concepts", title: "KAVRAMLAR", tr: "Kavram", en: "Concept", count: counts.concepts, color: "#7c3aed", bg: "#f5f3ff", border: "#8b5cf6", desc: "concepts.json • ARTIFICIAL_INTELLIGENCE, BODY... • 6 dil editable", emoji: "💡" },
    { id: "single", href: "/admin/curation/single", title: "KELİMELER", tr: "Kelime", en: "Lexeme", count: counts.lexemes, color: "#ea580c", bg: "#fff7ed", border: "#fb923c", desc: "lexemes.json gerçek • TR/EN/RU/KBD/CE/AR 6 dil • KBD en üstte", emoji: "📖" },
  ];

  return (
    <div style={{ flex: 1, background: "#f8fafc", padding: 32 }}>
      <div style={{ maxWidth: 1200 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900 }}>Çerkesçe Sözlük Kürasyon Paneli</h1>
        <p style={{ color: "#475569", fontSize: 14, marginTop: 8 }}>Hiyerarşi: <b>Kök → Aile → Kavram → Kelime</b> • Gerçek veri • Sahte WF-GU / R-GU yok • KBD Kabardey en üstte • WCAG AA</p>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {cards.map(c => (
            <Link key={c.id} href={c.href} style={{ textDecoration: "none" }}>
              <div style={{ border: `2px solid ${c.border}`, borderRadius: 18, padding: 20, background: c.bg, cursor: "pointer", transition: "transform 0.1s" }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: c.color }}>{c.emoji} {c.title}</div>
                <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8, color: "#0f172a" }}>{c.count || "—"}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, color: "#334155" }}>{c.tr} / {c.en}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 8, lineHeight: 1.4 }}>{c.desc}</div>
                <div style={{ marginTop: 12, fontSize: 12, fontWeight: 800, color: c.color }}>→ Aç</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 20, background: "#fff" }}>
            <div style={{ fontWeight: 900 }}>Hızlı İş Akışı</div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ background: "#059669", color: "#fff", borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 900 }}>1</span> <b>Kök seç</b> → <span style={{ color: "#64748b" }}>/admin/curation/roots • Bu köke ait aileleri gör, aile bu roota ait değilse "Kökten Çıkar" (lexeme rootIds silinir)</span></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ background: "#2563eb", color: "#fff", borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 900 }}>2</span> <b>Aile düzenle</b> → <span style={{ color: "#64748b" }}>/admin/curation/family • notes, conceptIds eksikse gir, KBD en üstte</span></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ background: "#7c3aed", color: "#fff", borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 900 }}>3</span> <b>Kavram düzenle</b> → <span style={{ color: "#64748b" }}>/admin/curation/concepts • 6 dil TR/EN/RU/KBD/CE/AR</span></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ background: "#ea580c", color: "#fff", borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 900 }}>4</span> <b>Kelime kürasyon</b> → <span style={{ color: "#64748b" }}>/admin/curation/single • 6 dil editable, Ctrl+Enter Onayla, IPA 🔊</span></div>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <Link href="/admin/curation/csv" style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", color: "#0f172a" }}>CSV Export/Import</Link>
              <Link href="/admin/curation/bulk" style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", color: "#0f172a" }}>Bulk Düzenle</Link>
            </div>
          </div>

          <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 20, background: "#fff" }}>
            <div style={{ fontWeight: 900 }}>Durum • Gerçek Veri</div>
            <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.6, color: "#334155" }}>
              <div>• roots.json: {counts.roots} kök (gerçek, sahte R-GU yok)</div>
              <div>• word_families.json: {counts.families} aile</div>
              <div>• concepts.json: {counts.concepts} kavram</div>
              <div>• lexemes.json: {counts.lexemes} kelime</div>
              <div style={{ marginTop: 8, color: "#059669", fontWeight: 700 }}>✓ KBD Kabardey en üstte</div>
              <div style={{ color: "#b91c1c", fontWeight: 700 }}>✗ Sahte veri üretimi kapalı</div>
              <div style={{ color: "#64748b" }}>Yedekler: _backups/lexemes_*.json, word_families_*.json</div>
            </div>
            {msg && <div style={{ marginTop: 12, fontSize: 11, color: "#b91c1c" }}>{msg}</div>}
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: "#94a3b8" }}>ÇERKESÇE SÖZLÜK • KBD aktif • KÖK→AİLE hiyerarşisi • WCAG AA • 6 dil • yedekli kayıt</div>
      </div>
    </div>
  );
}
