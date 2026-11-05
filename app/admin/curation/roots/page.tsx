"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Root = { id: string; form?: string; ipa?: string; meaning?: string; notes?: string; [k:string]: any };
type Family = { id: string; conceptIds?: string[]; lexemeIds?: string[]; notes?: string; _source?: string; [k:string]: any };
type Lexeme = { id: string; rootIds?: string[]; wordFamilyId?: string; form?: string; conceptId?: string };

export default function RootsPage() {
  const [roots, setRoots] = useState<Root[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [lexemes, setLexemes] = useState<Lexeme[]>([]);
  const [selRoot, setSelRoot] = useState<string>("");
  const [selFamily, setSelFamily] = useState<string>("");
  const [qRoot, setQRoot] = useState<string>("");
  const [qFam, setQFam] = useState<string>("");
  const [draftFam, setDraftFam] = useState<Family | null>(null);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch("/data/linguistic/roots.json");
        if (r.ok) {
          const raw = await r.json();
          const arr = Array.isArray(raw) ? raw : raw.roots || [];
          setRoots(arr);
          if (arr[0]) setSelRoot(arr[0].id);
        }
      } catch {}
      try {
        const rf = await fetch("/data/linguistic/word_families.json");
        if (rf.ok) {
          const raw = await rf.json();
          setFamilies(Array.isArray(raw) ? raw : raw.families || []);
        }
      } catch {}
      try {
        const rl = await fetch("/data/linguistic/lexemes.json");
        if (rl.ok) {
          const raw = await rl.json();
          setLexemes(Array.isArray(raw) ? raw : raw.lexemes || []);
        }
      } catch {}
    }
    load();
  }, []);

  const filteredRoots = useMemo(() => {
    if (!qRoot) return roots;
    const s = qRoot.toLowerCase();
    return roots.filter(r => `${r.id} ${r.form||""} ${r.meaning||""}`.toLowerCase().includes(s));
  }, [roots, qRoot]);

  const familiesOfRoot = useMemo(() => {
    if (!selRoot) return [];
    const famIds = new Set<string>();
    lexemes.forEach(l => {
      if ((l.rootIds||[]).includes(selRoot) && l.wordFamilyId) famIds.add(l.wordFamilyId);
    });
    return families.filter(f => famIds.has(f.id));
  }, [families, lexemes, selRoot]);

  const filteredFamilies = useMemo(() => {
    if (!qFam) return familiesOfRoot;
    const s = qFam.toLowerCase();
    return familiesOfRoot.filter(f => `${f.id} ${f.notes||""} ${(f.conceptIds||[]).join(" ")}`.toLowerCase().includes(s));
  }, [familiesOfRoot, qFam]);

  const selectedRoot = useMemo(() => roots.find(r => r.id === selRoot) || null, [roots, selRoot]);
  const selectedFamily = useMemo(() => families.find(f => f.id === selFamily) || null, [families, selFamily]);

  useEffect(() => {
    if (selectedFamily) setDraftFam({ ...selectedFamily });
    else setDraftFam(null);
  }, [selectedFamily]);


  // roots-family-tools-v1
  const [busy, setBusy] = useState(false);
  const operationLock = useRef(false);

  const familyCounts = useMemo(() => {
    const counts = new Map<string, number>();
    lexemes.forEach(l => {
      if (l.wordFamilyId) {
        counts.set(l.wordFamilyId, (counts.get(l.wordFamilyId) || 0) + 1);
      }
    });
    return counts;
  }, [lexemes]);

  const familyDirty = !!draftFam && !!selectedFamily && (
    (draftFam.notes || "") !== (selectedFamily.notes || "") ||
    JSON.stringify(draftFam.conceptIds || []) !==
    JSON.stringify(selectedFamily.conceptIds || [])
  );

  function canLeaveFamily() {
    if (operationLock.current) {
      setMsg("İşlem sürüyor. Tamamlanmasını bekle.");
      return false;
    }
    return !familyDirty || window.confirm(
      "Kaydedilmemiş aile değişiklikleri var. Değişiklikler bırakılsın mı?"
    );
  }

  function chooseRoot(id: string) {
    if (id === selRoot || !canLeaveFamily()) return;
    setDraftFam(null);
    setSelFamily("");
    setSelRoot(id);
    setMsg("");
  }

  function chooseFamily(id: string) {
    if (id === selFamily || !canLeaveFamily()) return;
    setDraftFam(null);
    setSelFamily(id);
    setMsg("");
  }

  useEffect(() => {
    if (!draftFam) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById("roots-family-editor")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [draftFam?.id]);

  function downloadJson(value: unknown, filename: string) {
    const blob = new Blob(
      [JSON.stringify(value, null, 2)],
      { type: "application/json;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportFamilyDraft() {
    if (!draftFam) return;
    downloadJson({
      type: "family-edit-draft",
      exportedAt: new Date().toISOString(),
      persisted: false,
      rootId: selRoot,
      updates: [{
        id: draftFam.id,
        patch: {
          notes: draftFam.notes || "",
          conceptIds: draftFam.conceptIds || [],
        },
      }],
    }, "family-draft.json");
    setMsg("Aile taslağı indirildi. İndirme kaynak dosyaya kayıt yapmaz.");
  }

  function exportRootFamilies() {
    const ids = new Set(familiesOfRoot.map(f => f.id));
    downloadJson({
      type: "observed-root-family-links",
      exportedAt: new Date().toISOString(),
      rootId: selRoot,
      root: selectedRoot,
      notice: "Kaynakta gözlenen bağlantılar; dilbilimsel onay değildir.",
      families: familiesOfRoot.map(f => ({
        sourceFamily: f,
        observedTotalLexemes: familyCounts.get(f.id) || 0,
        lexemesLinkedToSelectedRoot: lexemes
          .filter(l => l.wordFamilyId === f.id &&
            (l.rootIds || []).includes(selRoot))
          .map(l => ({
            id: l.id,
            form: l.form,
            conceptId: l.conceptId,
            rootIds: l.rootIds,
            wordFamilyId: l.wordFamilyId,
          })),
      })),
      missingFamilyIds: Array.from(new Set(
        lexemes
          .filter(l => (l.rootIds || []).includes(selRoot) && l.wordFamilyId)
          .map(l => l.wordFamilyId as string)
      )).filter(id => !ids.has(id)),
    }, "root-families.json");
    setMsg("Kökün aile listesi indirildi. Kaynak dosyalar değiştirilmedi.");
  }

  async function postUpdates(url: string, body: unknown) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        `API JSON döndürmedi (HTTP ${response.status}). Endpoint kontrol edilmeli.`
      );
    }
    if (!response.ok || data.success !== true) {
      throw new Error(
        data.error || `API işlemi doğrulamadı (HTTP ${response.status}).`
      );
    }
    return data;
  }

  async function removeFamilyFromRoot(famId: string) {
    if (!selRoot || !canLeaveFamily()) return;
    const rootId = selRoot;
    const affected = lexemes.filter(l =>
      l.wordFamilyId === famId && (l.rootIds || []).includes(rootId)
    );
    if (!affected.length) {
      setMsg("Bu ailede seçili köke bağlı kelime bulunamadı.");
      return;
    }
    if (!window.confirm(
      `${famId} ailesindeki ${affected.length} kelimeden ${rootId} kök bağlantısı kaldırılacak.\n\n` +
      "Aile ve kelimeler silinmez. Diğer kök bağlantıları korunur.\nDevam edilsin mi?"
    )) return;

    operationLock.current = true;
    setBusy(true);
    setMsg("Kök bağlantıları kaydediliyor...");
    const updates = affected.map(l => ({
      id: l.id,
      patch: { rootIds: (l.rootIds || []).filter(id => id !== rootId) },
    }));
    const affectedIds = new Set(affected.map(l => l.id));
    try {
      await postUpdates("/api/admin/curation/update-lexemes", { updates });
      setLexemes(prev => prev.map(l =>
        affectedIds.has(l.id)
          ? { ...l, rootIds: (l.rootIds || []).filter(id => id !== rootId) }
          : l
      ));
      if (selFamily === famId) {
        setSelFamily("");
        setDraftFam(null);
      }
      setMsg(
        `✅ API başarı bildirdi: ${affected.length} kelimeden ${rootId} kaldırıldı. ` +
        "Kalıcı sonucu sayfa yenilendiğinde kontrol et."
      );
    } catch (error) {
      setMsg(`❌ ${(error as Error).message}`);
    } finally {
      operationLock.current = false;
      setBusy(false);
    }
  }

  async function saveFamily() {
    if (!draftFam || operationLock.current) return;
    if (!familyDirty) {
      setMsg("Kaydedilecek yeni değişiklik yok.");
      return;
    }
    const snapshot = {
      id: draftFam.id,
      notes: draftFam.notes || "",
      conceptIds: [...(draftFam.conceptIds || [])],
    };
    operationLock.current = true;
    setBusy(true);
    setMsg("Aile bilgileri kaydediliyor...");
    try {
      await postUpdates("/api/admin/curation/update-families", {
        updates: [{
          id: snapshot.id,
          patch: {
            notes: snapshot.notes,
            conceptIds: snapshot.conceptIds,
          },
        }],
      });
      setFamilies(prev => prev.map(f =>
        f.id === snapshot.id ? { ...f, ...snapshot } : f
      ));
      setMsg(
        `✅ API başarı bildirdi: ${snapshot.id}. ` +
        "Kalıcı sonucu sayfa yenilendiğinde kontrol et."
      );
    } catch (error) {
      setMsg(
        `❌ ${(error as Error).message} ` +
        "Kaydedilmedi; taslağı JSON olarak indirebilirsin."
      );
    } finally {
      operationLock.current = false;
      setBusy(false);
    }
  }


  return (
    <div style={{ display: "flex", minHeight: "100vh", gap: 0, background: "#f1f5f9" }}>
      {/* Kök Listesi */}
      <div style={{ flex: "0 0 260px", borderRight: "1px solid #e2e8f0", background: "#fff", padding: 16, display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: 900 }}>KÖKLER • {roots.length} gerçek</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>roots.json • lexemes rootIds ile bağlı</div>
        <input value={qRoot} onChange={e => setQRoot(e.target.value)} placeholder="Kök ara..." style={{ marginTop: 12, width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 10px" }} />
        <div style={{ marginTop: 12, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, maxHeight: "85vh" }}>
          {filteredRoots.slice(0,200).map(r => {
            const cnt = lexemes.filter(l => (l.rootIds||[]).includes(r.id)).length;
            const active = selRoot === r.id;
            return (
              <button key={r.id} disabled={busy} onClick={() => chooseRoot(r.id)} style={{ textAlign: "left", padding: 10, borderRadius: 10, border: active ? "2px solid #059669" : "1px solid #e2e8f0", background: active ? "#d1fae5" : "#fff" }}>
                <div style={{ fontWeight: 800, fontFamily: "monospace" }}>{r.id}</div>
                <div style={{ fontSize: 12 }}>{r.form || ""} {r.ipa ? `/${r.ipa}/` : ""}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{cnt} lexeme</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bu Köke Ait Aileler */}
      <div style={{ flex: "0 0 380px", borderRight: "1px solid #e2e8f0", background: "#f8fafc", padding: 16, display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: 900 }}>Bu Köke Ait Aileler • {familiesOfRoot.length} aile</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>{selRoot} köküne bağlı • lexemes.wordFamilyId üzerinden • düzenlenebilir</div>
        <input value={qFam} onChange={e => setQFam(e.target.value)} placeholder="Aile ara..." style={{ marginTop: 12, width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 10px" }} />
        <div style={{ marginTop: 12, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, maxHeight: "80vh" }}>
          {filteredFamilies.map(f => {
            const lexCount = lexemes.filter(l => l.wordFamilyId === f.id && (l.rootIds||[]).includes(selRoot)).length;
            const active = selFamily === f.id;
            return (
              <div key={f.id} style={{ padding: 12, borderRadius: 12, border: active ? "2px solid #2563eb" : "1px solid #e2e8f0", background: active ? "#dbeafe" : "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button disabled={busy} onClick={() => chooseFamily(f.id)} style={{ fontWeight: 800, fontFamily: "monospace", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>{f.id}</button>
                  <button disabled={busy} onClick={() => removeFamilyFromRoot(f.id)} style={{ fontSize: 10, background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 6, padding: "2px 6px", cursor: "pointer" }}>Kökten Çıkar</button>
                </div>
                <div style={{ fontSize: 11, color: "#334155", marginTop: 4 }}>{f.notes || ""}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{lexCount} lexeme bu kökte • {(f.conceptIds||[]).length} kavram • {familyCounts.get(f.id) || 0} kaynakta bağlı kelime</div>
                {active && <div style={{ fontSize: 10, color: "#2563eb", marginTop: 4 }}>✏️ Düzenlemek için sağ panelde</div>}
              </div>
            );
          })}
          {familiesOfRoot.length === 0 && <div style={{ fontSize: 12, color: "#64748b", padding: 12 }}>Bu köke bağlı aile yok (lexemes içinde rootIds={selRoot} olan wordFamilyId bulunamadı)</div>}
        </div>

        <button type="button" disabled={busy || !selRoot}
          onClick={exportRootFamilies}
          style={{ marginTop: 12, padding: 10, borderRadius: 10,
            background: "#ede9fe", color: "#6d28d9",
            border: "1px solid #c4b5fd", cursor: "pointer" }}>
          ↓ Bu kökün ailelerini JSON indir
        </button>
        {msg && <div style={{ marginTop: 12, fontSize: 12, padding: 10, borderRadius: 8, background: "#fff", border: "1px solid #e2e8f0" }}>{msg}</div>}
      </div>

      {/* Detay + Düzenleme */}
      <div style={{ flex: 1, background: "#fff", padding: 24, overflowY: "auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 900 }}>Kök: {selectedRoot?.id} {selectedRoot?.form ? `• ${selectedRoot.form}` : ""} • Aile Düzenleme</h2>
        <div style={{ fontSize: 12, color: "#64748b" }}>KBD en üstte • Aile bu roota ait değilse listeden çıkar • Eksik bilgi girilebilir • Gerçek veri • update-lexemes + update-families</div>

        {!selectedRoot ? <div>Kök seç</div> : (
          <>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              <div style={{ border: "2px solid #059669", borderRadius: 12, padding: 14, background: "#ecfdf5" }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: "#065f46" }}>🌱 KÖK</div>
                <div style={{ fontWeight: 900, fontSize: 18, marginTop: 6 }}>{selectedRoot.form || selectedRoot.id} {selectedRoot.ipa ? `/ ${selectedRoot.ipa}/` : ""}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{selectedRoot.meaning || selectedRoot.notes || ""}</div>
              </div>
              <div style={{ border: "2px solid #2563eb", borderRadius: 12, padding: 14, background: "#eff6ff" }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: "#1e40af" }}>👨‍👩‍👧‍👦 Seçili Aile</div>
                <div style={{ fontWeight: 900, marginTop: 6 }}>{selFamily || "Aile seçilmedi"}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{selectedFamily?.notes || ""}</div>
              </div>
            </div>

            {draftFam ? (
              <div id="roots-family-editor" style={{ marginTop: 20, border: "1px solid #e2e8f0", borderRadius: 14, padding: 16 }}>
                <div style={{ fontWeight: 900 }}>Aile Bilgilerini Düzenle • {draftFam.id}</div>
                <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 4 }}>ID değiştirilemez (bağlı {(draftFam.lexemeIds||[]).length} lexeme kopar) • rootIds düzenlemesi lexeme üzerinden yapılır</div>

                <label style={{ display: "block", marginTop: 16, fontSize: 12, fontWeight: 700 }}>Notlar / Açıklama (eksikse gir)</label>
                <textarea disabled={busy} value={draftFam.notes||""} onChange={e => setDraftFam({ ...draftFam, notes: e.target.value })} rows={3} style={{ marginTop: 6, width: "100%", border: "2px solid #cbd5e1", borderRadius: 10, padding: "10px 12px" }} placeholder="El ailesi (Ӏэ). Somatik kök..." />

                <label style={{ display: "block", marginTop: 16, fontSize: 12, fontWeight: 700 }}>conceptIds (virgülle ayır, eksikse gir)</label>
                <input disabled={busy} value={(draftFam.conceptIds||[]).join(", ")} onChange={e => setDraftFam({ ...draftFam, conceptIds: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} style={{ marginTop: 6, width: "100%", border: "2px solid #cbd5e1", borderRadius: 10, padding: "10px 12px" }} placeholder="Kaynakta doğruladığın kavram kimlikleri" />

                <div style={{ marginTop: 12, fontSize: 11, color: "#64748b" }}>lexemeIds: {(draftFam.lexemeIds||[]).length} • _source: {draftFam._source||""} • Bu kökte {lexemes.filter(l=>l.wordFamilyId===draftFam.id && (l.rootIds||[]).includes(selRoot)).length} lexeme</div>


                <div style={{ marginTop: 12, display: "flex",
                  gap: 8, flexWrap: "wrap" }}>
                  <button type="button" disabled={busy}
                    onClick={exportFamilyDraft}
                    style={{ background: "#ede9fe", color: "#6d28d9",
                      border: "1px solid #c4b5fd", borderRadius: 10,
                      padding: "10px 14px", cursor: "pointer" }}>
                    ↓ Taslağı JSON indir
                  </button>
                  <button type="button" disabled={busy || !familyDirty}
                    onClick={() => {
                      if (!canLeaveFamily()) return;
                      setDraftFam(selectedFamily ? { ...selectedFamily } : null);
                    }}
                    style={{ background: "#f1f5f9",
                      border: "1px solid #cbd5e1", borderRadius: 10,
                      padding: "10px 14px", cursor: "pointer" }}>
                    Değişiklikleri geri al
                  </button>
                  <span style={{ fontSize: 12, alignSelf: "center",
                    color: familyDirty ? "#b45309" : "#64748b" }}>
                    {familyDirty ? "Kaydedilmemiş değişiklik var" : "Yeni değişiklik yok"}
                  </span>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  <button disabled={busy || !familyDirty} onClick={saveFamily} style={{ background: "#16a34a", color: "#fff", fontWeight: 900, padding: "10px 18px", borderRadius: 10, border: "none", cursor: "pointer" }}>{busy ? "İşlem sürüyor..." : "✓ Aileyi Kaydet"}</button>
                  <button disabled={busy} onClick={() => removeFamilyFromRoot(draftFam.id)} style={{ background: "#fee2e2", color: "#b91c1c", fontWeight: 700, padding: "10px 18px", borderRadius: 10, border: "1px solid #fecaca", cursor: "pointer" }}>Bu Kökten Çıkar</button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 20, fontSize: 13, color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: 12, padding: 20, textAlign: "center" }}>Ortadaki listeden bir aile seç → sağda düzenle → eksik bilgileri gir → kaydet • Aile bu roota ait değilse "Kökten Çıkar" ile lexeme bağlantılarını silebilirsin</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
