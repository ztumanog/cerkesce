"use client";
// Sprint 2A.3 - Duzenleme formu (client) - SIK TASARIM
import { useState } from "react";

export default function EditForm({
  lexemeId,
  initial,
}: {
  lexemeId: string;
  initial: {
    ipa: string;
    partOfSpeech: string;
    conceptId: string;
    rootIds: string;
    wordFamilyId: string;
    notes: string;
  };
}) {
  const [diff, setDiff] = useState<{ field: string; oldValue: any; newValue: any }[] | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [familyStatus, setFamilyStatus] = useState("");

  function readChanges(): Record<string, any> {
    const fd = new FormData(document.querySelector("form")!);
    return {
      wordFamilyId: fd.get("wordFamilyId"),
      ipa: fd.get("ipa"),
      partOfSpeech: fd.get("partOfSpeech"),
      conceptId: fd.get("conceptId"),
      rootIds: fd.get("rootIds"),
      notes: fd.get("notes"),
    };
  }

  // WF-GU gibi aile var mı kontrol et
  async function checkFamily(id: string) {
    if (!id.trim()) { setFamilyStatus(""); return; }
    // Basit format kontrolü
    if (!/^WF-[A-Z0-9_-]+$/.test(id.trim().toUpperCase())) {
      setFamilyStatus("⚠️ Format: WF-GU gibi olmalı");
      return;
    }
    setFamilyStatus("✓ Format doğru — kaydetmede kontrol edilecek");
  }
async function post(confirm: boolean) {
  setSaving(true);
  try {
    const res = await fetch("/api/admin/curation/lexeme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lexemeId, changes: readChanges(), confirm }),
    });

    const text = await res.text();
    if (!text || !text.trim()) {
      setSaving(false);
      return { error: `Sunucudan boş yanıt döndü (HTTP ${res.status}). Rota mevcut değil veya çöküyor olabilir.` };
    }

    const json = JSON.parse(text);
    setSaving(false);
    return json;
  } catch (err: any) {
    setSaving(false);
    return { error: err.message || "İstek işlenirken beklenmeyen bir hata oluştu." };
  }
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
    setMessage(
      json.applied
        ? `Uygulandi: ${json.appliedFields.join(", ")} - sayfayi yenileyin.`
        : json.message ?? json.error ?? ""
    );
  }

  const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", fontSize: 14, outline: "none" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 800, color: "#334155", marginBottom: 6, letterSpacing: "0.02em" };
  const hintStyle: React.CSSProperties = { fontSize: 11, color: "#64748b", marginTop: 4 };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Başlık kartı */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #7c3aed 100%)", borderRadius: 16, padding: 20, color: "#fff", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 700, letterSpacing: "0.08em" }}>ÇERKESÇE SÖZLÜK • DÜZENLEME</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 4 }}>{lexemeId}</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Önce kontrol et (dry-run) → sonra onayla. Yedek + audit otomatik.</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 999, padding: "6px 12px", fontSize: 11, fontWeight: 800 }}>✏️ DÜZENLE</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
        {/* Aile - en önemli, vurgulu */}
        <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 12, padding: 14 }}>
          <label style={labelStyle}>🏠 WORD FAMILY ID <span style={{ color: "#7c3aed" }}>• Aile</span></label>
          <input
            name="wordFamilyId"
            defaultValue={initial.wordFamilyId}
            onChange={(e) => checkFamily(e.target.value)}
            placeholder="örn: WF-GU"
            style={{ ...fieldStyle, fontFamily: "monospace", textTransform: "uppercase", borderColor: "#c4b5fd", background: "#fff" }}
          />
          <div style={hintStyle}>Örn: WF-GU, WF-GU-KALP (silindi, kullanma). Aile yoksa kaydetmede uyarı verir. {familyStatus && <span style={{ color: "#7c3aed", fontWeight: 700 }}>{familyStatus}</span>}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label style={labelStyle}>🔤 IPA</label>
            <input name="ipa" defaultValue={initial.ipa} placeholder="[gʷəf'e]" style={fieldStyle} />
            <div style={hintStyle}>Sadece gerçek IPA, Kiril kopyalama</div>
          </div>
          <div>
            <label style={labelStyle}>📝 PART OF SPEECH</label>
            <input name="partOfSpeech" defaultValue={initial.partOfSpeech} placeholder="noun / verb / adverb" style={fieldStyle} />
            <div style={hintStyle}>örn: noun, verb, adverb</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label style={labelStyle}>💡 CONCEPT ID</label>
            <input name="conceptId" defaultValue={initial.conceptId} placeholder="ROTTEN" style={{ ...fieldStyle, fontFamily: "monospace", textTransform: "uppercase" }} />
            <div style={hintStyle}>BÜYÜK HARF: ROTTEN, JOY. Yoksa yeni oluşturulur.</div>
          </div>
          <div>
            <label style={labelStyle}>🌱 ROOT IDs (virgülle)</label>
            <input name="rootIds" defaultValue={initial.rootIds} placeholder="R-GU, R-KALP" style={fieldStyle} />
            <div style={hintStyle}>Virgülle ayır: R-GU, R-KALP</div>
          </div>
        </div>

        <div>
          <label style={labelStyle}>🗒️ NOTES</label>
          <textarea name="notes" rows={3} defaultValue={initial.notes} placeholder="Etimoloji, kullanım notu..." style={{ ...fieldStyle, resize: "vertical" }} />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{ background: saving ? "#94a3b8" : "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: saving ? "not-allowed" : "pointer", fontSize: 14 }}
        >
          {saving ? "⏳ Kontrol ediliyor..." : "🔍 Değişiklikleri Kontrol Et (dry-run)"}
        </button>
        <div style={{ fontSize: 11, color: "#64748b", textAlign: "center" }}>Önce dry-run yapılır, hiçbir şey yazılmaz. Onaylarsan yazılır.</div>
      </form>

      {diff && diff.length > 0 && (
        <div style={{ marginTop: 16, borderRadius: 14, border: "1px solid #fbbf24", background: "#fffbeb", padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: 900, fontSize: 15 }}>⚠️ Değişiklik Raporu — {diff.length} alan değişecek</h3>
            <span style={{ background: "#f59e0b", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 999 }}>DRY-RUN</span>
          </div>
          <ul style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {diff.map((d) => (
              <li key={d.field} style={{ background: "#fff", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 12px", fontSize: 13, display: "flex", justifyContent: "space-between", gap: 10 }}>
                <b style={{ minWidth: 110 }}>{d.field}</b>
                <span style={{ color: "#991b1b" }}><s>{String(d.oldValue ?? "—")}</s></span>
                <span>→</span>
                <b style={{ color: "#166534" }}>{String(d.newValue ?? "—")}</b>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button
              onClick={handleConfirm}
              disabled={saving}
              style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontWeight: 800, cursor: "pointer", flex: 1 }}
            >
              ✅ Onayla ve Uygula
            </button>
            <button onClick={() => setDiff(null)} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 16px", cursor: "pointer" }}>
              Vazgeç
            </button>
          </div>
        </div>
      )}

      {message && (
        <div style={{ marginTop: 12, borderRadius: 10, padding: "10px 12px", fontSize: 13, background: message.includes("Uygulandi") ? "#dcfce7" : message.includes("Degisiklik yok") ? "#f1f5f9" : "#fef2f2", border: "1px solid #e2e8f0" }}>
          {message}
        </div>
      )}
    </div>
  );
}

