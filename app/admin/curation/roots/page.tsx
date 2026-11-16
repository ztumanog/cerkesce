"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Root = {
  id: string;
  form?: string;
  ipa?: string;
  primaryMeaning?: string;
  meaning?: string;
  secondaryMeanings?: string[];
  notes?: string;
  [k: string]: any;
};

type Family = {
  id: string;
  conceptIds?: string[];
  lexemeIds?: string[];
  notes?: string;
  _source?: string;
  [k: string]: any;
};

type Lexeme = {
  id: string;
  rootIds?: string[];
  wordFamilyId?: string;
  form?: string;
  ipa?: string;
  conceptId?: string;
  literalMeaning?: string;
  isLemma?: boolean;
  corpusFrequency?: number;
  corpusFrequencyAdy?: number;
  corpusFrequencyKbd?: number;
  translations?: { tr?: string | string[]; en?: string | string[]; ru?: string | string[] };
};

function cleanGloss(raw: string): string {
  const s = raw.replace(/\s+\d+$/, "").trim();
  if (!s) return "";
  if (s === s.toLocaleUpperCase("tr-TR") && s !== s.toLocaleLowerCase("tr-TR")) {
    return "";
  }
  return s;
}

function pickTr(val: unknown): string {
  if (Array.isArray(val)) {
    return val
      .map((x) => cleanGloss(String(x || "")))
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");
  }
  if (typeof val === "string") {
    return val
      .split(/[;,]/)
      .map((part) => cleanGloss(part))
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");
  }
  return "";
}

function enTextOf(val: unknown): string {
  if (Array.isArray(val)) return val.map((x) => String(x || "")).join(" ").toLowerCase();
  if (typeof val === "string") return val.toLowerCase();
  return "";
}

function rootMeaningOf(r?: Root | null): string {
  if (!r) return "";
  const primary = pickTr(r.primaryMeaning) || pickTr(r.meaning);
  const secondary = Array.isArray(r.secondaryMeanings)
    ? r.secondaryMeanings
        .map((s) => cleanGloss(String(s || "")))
        .filter(Boolean)
        .slice(0, 3)
        .join(", ")
    : "";
  if (primary && secondary && primary !== secondary) return `${primary} (${secondary})`;
  return primary || secondary || String(r.notes || "").trim();
}

function lexemeTrOf(l?: Lexeme | null): string {
  if (!l) return "";
  return pickTr(l.translations?.tr) || pickTr(l.literalMeaning);
}

function lexemePriority(l: Lexeme): number {
  const freq = Math.min(
    Number(l.corpusFrequency || 0) +
      Number(l.corpusFrequencyAdy || 0) +
      Number(l.corpusFrequencyKbd || 0),
    20000
  );
  const lemmaScore = l.isLemma ? 50000 : 0;
  const lenPenalty = Math.min(String(l.form || "").trim().length, 40) * 400;
  return lemmaScore + freq - lenPenalty;
}

function conceptMatchScore(l: Lexeme, conceptId: string): number {
  let score = lexemePriority(l);
  const targetWord = conceptId.toLowerCase().replace(/_/g, " ").trim();
  const en = enTextOf(l.translations?.en);
  if (targetWord && en) {
    const parts = en.split(/[;,/]/).map((p) => p.trim());
    if (parts.includes(targetWord)) score += 90000;
    else if (en.includes(targetWord)) score += 45000;
  }
  return score;
}

export default function RootsPage() {
  const [roots, setRoots] = useState<Root[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [lexemes, setLexemes] = useState<Lexeme[]>([]);
  const [conceptTrMap, setConceptTrMap] = useState<Record<string, string>>({});
  const [selRoot, setSelRoot] = useState<string>("");
  const [selFamily, setSelFamily] = useState<string>("");
  const [qRoot, setQRoot] = useState<string>("");
  const [qFam, setQFam] = useState<string>("");
  const [draftFam, setDraftFam] = useState<Family | null>(null);
  const [showAllConcepts, setShowAllConcepts] = useState<boolean>(false);
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
      try {
        const rc = await fetch("/data/linguistic/concept-tr.json");
        if (rc.ok) {
          const raw = await rc.json();
          const normalized: Record<string, string> = {};
          if (raw && typeof raw === "object") {
            for (const [k, v] of Object.entries(raw)) {
              const label = typeof v === "string" ? cleanGloss(v) : pickTr((v as any)?.tr);
              if (label) {
                normalized[k] = label;
                normalized[k.toUpperCase()] = label;
              }
            }
          }
          setConceptTrMap(normalized);
        }
      } catch {}
    }
    load();
  }, []);

  // O(1) kok ve aile erisim haritalari
  const rootById = useMemo(() => {
    const m = new Map<string, Root>();
    for (const r of roots) m.set(r.id, r);
    return m;
  }, [roots]);

  const familyById = useMemo(() => {
    const m = new Map<string, Family>();
    for (const f of families) m.set(f.id, f);
    return m;
  }, [families]);

  const sortedLexemes = useMemo(() => {
    return [...lexemes].sort((a, b) => lexemePriority(b) - lexemePriority(a));
  }, [lexemes]);

  // Tek geciste tum O(1) indeksler: rootCounts, rootFamilyLexemes, familyMetaMap
  const { rootCounts, rootFamilyLexemes, familyMetaMap } = useMemo(() => {
    const rCounts = new Map<string, number>();
    const rfMap = new Map<string, Map<string, Lexeme[]>>();
    const fMeta = new Map<
      string,
      {
        circassianWords: string[];
        trMeanings: string[];
        totalCount: number;
      }
    >();

    for (const l of sortedLexemes) {
      const rIds = l.rootIds || [];
      const fid = l.wordFamilyId;

      for (const rid of rIds) {
        rCounts.set(rid, (rCounts.get(rid) || 0) + 1);
        if (fid) {
          let famBucket = rfMap.get(rid);
          if (!famBucket) {
            famBucket = new Map<string, Lexeme[]>();
            rfMap.set(rid, famBucket);
          }
          let list = famBucket.get(fid);
          if (!list) {
            list = [];
            famBucket.set(fid, list);
          }
          list.push(l);
        }
      }

      if (fid) {
        let cur = fMeta.get(fid);
        if (!cur) {
          cur = { circassianWords: [], trMeanings: [], totalCount: 0 };
          fMeta.set(fid, cur);
        }
        cur.totalCount += 1;
        const form = String(l.form || "").trim();
        if (form && !cur.circassianWords.includes(form) && cur.circassianWords.length < 6) {
          cur.circassianWords.push(form);
        }
        const tr = lexemeTrOf(l);
        if (tr && !cur.trMeanings.includes(tr) && cur.trMeanings.length < 4) {
          cur.trMeanings.push(tr);
        }
      }
    }

    return {
      rootCounts: rCounts,
      rootFamilyLexemes: rfMap,
      familyMetaMap: fMeta,
    };
  }, [sortedLexemes]);

  // Kavram ID -> { tr: Turkce karsilik, samples: en cekirdek Cerkesce kelimeler }
  const conceptInfoMap = useMemo(() => {
    const byConcept = new Map<string, Lexeme[]>();
    for (const l of lexemes) {
      if (!l.conceptId) continue;
      const upper = String(l.conceptId).toUpperCase();
      let list = byConcept.get(upper);
      if (!list) {
        list = [];
        byConcept.set(upper, list);
      }
      list.push(l);
    }

    const map = new Map<string, { tr: string; samples: string[] }>();
    for (const [k, tr] of Object.entries(conceptTrMap)) {
      const upper = k.toUpperCase();
      if (!map.has(upper)) map.set(upper, { tr, samples: [] });
    }

    byConcept.forEach((list, upper) => {
      const ranked = [...list].sort(
        (a, b) => conceptMatchScore(b, upper) - conceptMatchScore(a, upper)
      );
      const entry = map.get(upper) || { tr: "", samples: [] };
      for (const l of ranked) {
        if (!entry.tr) {
          const tr = lexemeTrOf(l);
          if (tr) entry.tr = tr;
        }
        const form = String(l.form || "").trim();
        if (form && !entry.samples.includes(form) && entry.samples.length < 3) {
          entry.samples.push(form);
        }
        if (entry.tr && entry.samples.length >= 3) break;
      }
      map.set(upper, entry);
    });
    return map;
  }, [conceptTrMap, lexemes]);

  const conceptTrOf = (cid: string): string => {
    const info = conceptInfoMap.get(String(cid || "").toUpperCase());
    return info?.tr || "";
  };

  const conceptSamplesOf = (cid: string): string[] => {
    const info = conceptInfoMap.get(String(cid || "").toUpperCase());
    return info?.samples || [];
  };

  const filteredRoots = useMemo(() => {
    if (!qRoot) return roots;
    const s = qRoot.toLocaleLowerCase("tr-TR");
    return roots.filter((r) =>
      `${r.id} ${r.form || ""} ${rootMeaningOf(r)}`.toLocaleLowerCase("tr-TR").includes(s)
    );
  }, [roots, qRoot]);

  const currentRootFamMap = useMemo(() => {
    return selRoot ? rootFamilyLexemes.get(selRoot) : undefined;
  }, [rootFamilyLexemes, selRoot]);

  const familiesOfRoot = useMemo(() => {
    if (!currentRootFamMap) return [];
    const list: Family[] = [];
    currentRootFamMap.forEach((_lexList, famId) => {
      const fam = familyById.get(famId);
      if (fam) list.push(fam);
    });
    return list;
  }, [currentRootFamMap, familyById]);

  const filteredFamilies = useMemo(() => {
    if (!qFam) return familiesOfRoot;
    const s = qFam.toLocaleLowerCase("tr-TR");
    return familiesOfRoot.filter((f) => {
      const meta = familyMetaMap.get(f.id);
      const conceptLabels = (f.conceptIds || [])
        .map((c) => `${c} ${conceptTrOf(c)}`)
        .join(" ");
      const blob = `${f.id} ${(meta?.circassianWords || []).join(" ")} ${(meta?.trMeanings || []).join(" ")} ${f.notes || ""} ${conceptLabels}`;
      return blob.toLocaleLowerCase("tr-TR").includes(s);
    });
  }, [familiesOfRoot, qFam, familyMetaMap, conceptInfoMap]);

  const selectedRoot = selRoot ? rootById.get(selRoot) || null : null;
  const selectedFamily = selFamily ? familyById.get(selFamily) || null : null;

  const selectedFamilyRootLexemes = useMemo(() => {
    if (!currentRootFamMap || !selFamily) return [];
    return currentRootFamMap.get(selFamily) || [];
  }, [currentRootFamMap, selFamily]);

  const [busy, setBusy] = useState(false);
  const operationLock = useRef(false);

  const familyDirty =
    !!draftFam &&
    !!selectedFamily &&
    ((draftFam.notes || "") !== (selectedFamily.notes || "") ||
      JSON.stringify(draftFam.conceptIds || []) !==
        JSON.stringify(selectedFamily.conceptIds || []));

  function canLeaveFamily() {
    if (operationLock.current) {
      setMsg("İşlem sürüyor. Tamamlanmasını bekle.");
      return false;
    }
    return (
      !familyDirty ||
      window.confirm("Kaydedilmemiş aile değişiklikleri var. Değişiklikler bırakılsın mı?")
    );
  }

  function chooseRoot(id: string) {
    if (id === selRoot || !canLeaveFamily()) return;
    setSelRoot(id);
    setSelFamily("");
    setDraftFam(null);
    setShowAllConcepts(false);
    setMsg("");
  }

  function chooseFamily(id: string) {
    if (id === selFamily || !canLeaveFamily()) return;
    const nextFam = familyById.get(id) || null;
    setSelFamily(id);
    setDraftFam(nextFam ? { ...nextFam } : null);
    setShowAllConcepts(false);
    setMsg("");
  }

  function downloadJson(value: unknown, filename: string) {
    const blob = new Blob([JSON.stringify(value, null, 2)], {
      type: "application/json;charset=utf-8",
    });
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
    const famMeta = familyMetaMap.get(draftFam.id);
    const linkedWords = selectedFamilyRootLexemes.map((l) => ({
      id: l.id,
      cerkesce: l.form || "",
      turkce: lexemeTrOf(l),
      kavramKodu: l.conceptId || "",
      kavramTurkce: l.conceptId ? conceptTrOf(l.conceptId) : "",
    }));

    downloadJson(
      {
        type: "family-edit-draft",
        exportedAt: new Date().toISOString(),
        persisted: false,
        rootId: selRoot,
        rootCerkesce: selectedRoot?.form || "",
        rootTurkce: rootMeaningOf(selectedRoot),
        updates: [
          {
            id: draftFam.id,
            aileCerkesce: famMeta?.circassianWords || [],
            aileTurkce: famMeta?.trMeanings || [],
            buKoktekiKelimeler: linkedWords,
            patch: {
              notes: draftFam.notes || "",
              conceptIds: draftFam.conceptIds || [],
            },
            kavramDetaylari: (draftFam.conceptIds || []).map((cid) => ({
              kod: cid,
              turkce: conceptTrOf(cid) || "(Türkçe karşılık yok)",
              cerkesceOrnek: conceptSamplesOf(cid),
            })),
          },
        ],
      },
      `family-draft-${selRoot}-${draftFam.id}.json`
    );
    setMsg("Aile taslağı (Çerkesçe + Türkçe açıklamalı) indirildi. Kaynak dosyaya kayıt yapmaz.");
  }

  function exportRootFamilies() {
    const ids = new Set(familiesOfRoot.map((f) => f.id));
    downloadJson(
      {
        type: "observed-root-family-links",
        exportedAt: new Date().toISOString(),
        rootId: selRoot,
        rootCerkesce: selectedRoot?.form || "",
        rootTurkce: rootMeaningOf(selectedRoot),
        root: selectedRoot,
        notice: "Kaynakta gözlenen bağlantılar; dilbilimsel onay değildir.",
        families: familiesOfRoot.map((f) => {
          const meta = familyMetaMap.get(f.id);
          const famRootLexemes = currentRootFamMap?.get(f.id) || [];
          return {
            id: f.id,
            aileCerkesce: meta?.circassianWords || [],
            aileTurkce: meta?.trMeanings || [],
            notes: f.notes || "",
            kavramDetaylari: (f.conceptIds || []).map((cid) => ({
              kod: cid,
              turkce: conceptTrOf(cid) || "(Türkçe karşılık yok)",
              cerkesceOrnek: conceptSamplesOf(cid),
            })),
            sourceFamily: f,
            observedTotalLexemes: meta?.totalCount || 0,
            lexemesLinkedToSelectedRoot: famRootLexemes.map((l) => ({
              id: l.id,
              cerkesce: l.form || "",
              turkce: lexemeTrOf(l),
              kavramKodu: l.conceptId || "",
              kavramTurkce: l.conceptId ? conceptTrOf(l.conceptId) : "",
              rootIds: l.rootIds,
              wordFamilyId: l.wordFamilyId,
            })),
          };
        }),
        missingFamilyIds: Array.from(currentRootFamMap?.keys() || []).filter((id) => !ids.has(id)),
      },
      `root-families-${selRoot}.json`
    );
    setMsg("Kökün aile listesi (Çerkesçe + Türkçe açıklamalı) indirildi.");
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
      throw new Error(`API JSON döndürmedi (HTTP ${response.status}). Endpoint kontrol edilmeli.`);
    }
    if (!response.ok || data.success !== true) {
      throw new Error(data.error || `API işlemi doğrulamadı (HTTP ${response.status}).`);
    }
    return data;
  }

  async function removeFamilyFromRoot(famId: string) {
    if (!selRoot || !canLeaveFamily()) return;
    const rootId = selRoot;
    const meta = familyMetaMap.get(famId);
    const famLabel = meta?.circassianWords?.length
      ? `${meta.circassianWords.slice(0, 3).join(", ")} (${famId})`
      : famId;
    const rootLabel = selectedRoot?.form ? `${selectedRoot.form} (${rootId})` : rootId;

    const affected = currentRootFamMap?.get(famId) || [];
    if (!affected.length) {
      setMsg("Bu ailede seçili köke bağlı kelime bulunamadı.");
      return;
    }
    if (
      !window.confirm(
        `${famLabel} ailesindeki ${affected.length} kelimeden ${rootLabel} kök bağlantısı kaldırılacak.\n\n` +
          "Aile ve kelimeler silinmez. Diğer kök bağlantıları korunur.\nDevam edilsin mi?"
      )
    )
      return;

    operationLock.current = true;
    setBusy(true);
    setMsg("Kök bağlantıları kaydediliyor...");
    const updates = affected.map((l) => ({
      id: l.id,
      patch: { rootIds: (l.rootIds || []).filter((id) => id !== rootId) },
    }));
    const affectedIds = new Set(affected.map((l) => l.id));
    try {
      await postUpdates("/api/admin/curation/update-lexemes", { updates });
      setLexemes((prev) =>
        prev.map((l) =>
          affectedIds.has(l.id)
            ? { ...l, rootIds: (l.rootIds || []).filter((id) => id !== rootId) }
            : l
        )
      );
      if (selFamily === famId) {
        setSelFamily("");
        setDraftFam(null);
      }
      setMsg(
        `✅ API başarı bildirdi: ${affected.length} kelimeden ${rootLabel} kaldırıldı. ` +
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
        updates: [
          {
            id: snapshot.id,
            patch: {
              notes: snapshot.notes,
              conceptIds: snapshot.conceptIds,
            },
          },
        ],
      });
      setFamilies((prev) =>
        prev.map((f) => (f.id === snapshot.id ? { ...f, ...snapshot } : f))
      );
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

  const selRootMeaning = rootMeaningOf(selectedRoot);
  const selFamMeta = selFamily ? familyMetaMap.get(selFamily) : undefined;
  const allDraftConcepts = draftFam?.conceptIds || [];
  const visibleConcepts = showAllConcepts ? allDraftConcepts : allDraftConcepts.slice(0, 60);

  return (
    <div style={{ display: "flex", minHeight: "100vh", gap: 0, background: "#f1f5f9" }}>
      {/* 1. Sütun: Kök Listesi */}
      <div
        style={{
          flex: "0 0 280px",
          borderRight: "1px solid #e2e8f0",
          background: "#fff",
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 900 }}>KÖKLER • {roots.length} gerçek</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>Çerkesçe kök • Türkçe anlam • ID</div>
        <input
          value={qRoot}
          onChange={(e) => setQRoot(e.target.value)}
          placeholder="Çerkesçe, Türkçe veya ID ara (örn. гу, kalp, R-GU)..."
          style={{
            marginTop: 12,
            width: "100%",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "8px 10px",
            fontSize: 12,
          }}
        />
        <div
          style={{
            marginTop: 12,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            maxHeight: "85vh",
          }}
        >
          {filteredRoots.slice(0, 250).map((r) => {
            const cnt = rootCounts.get(r.id) || 0;
            const active = selRoot === r.id;
            const trMeaning = rootMeaningOf(r);
            return (
              <button
                suppressHydrationWarning
                key={r.id}
                disabled={!!busy}
                onClick={() => chooseRoot(r.id)}
                style={{
                  textAlign: "left",
                  padding: 10,
                  borderRadius: 10,
                  border: active ? "2px solid #059669" : "1px solid #e2e8f0",
                  background: active ? "#d1fae5" : "#fff",
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: 16, color: "#0f172a" }}>
                    {r.form || r.id}
                  </span>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "#64748b" }}>
                    {r.id}
                  </span>
                </div>
                {trMeaning && (
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#047857", marginTop: 2 }}>
                    {trMeaning}
                  </div>
                )}
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                  {r.ipa ? `${r.ipa} • ` : ""}
                  {cnt} kelime
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sütun: Bu Köke Ait Aileler */}
      <div
        style={{
          flex: "0 0 400px",
          borderRight: "1px solid #e2e8f0",
          background: "#f8fafc",
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 900 }}>Bu Köke Ait Aileler • {familiesOfRoot.length} aile</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>
          {selectedRoot?.form ? `${selectedRoot.form} (${selRoot})` : selRoot} köküne bağlı aileler
        </div>
        <input
          value={qFam}
          onChange={(e) => setQFam(e.target.value)}
          placeholder="Çerkesçe kelime, Türkçe anlam, kavram veya ID ara..."
          style={{
            marginTop: 12,
            width: "100%",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "8px 10px",
            fontSize: 12,
          }}
        />
        <div
          style={{
            marginTop: 12,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxHeight: "80vh",
          }}
        >
          {filteredFamilies.map((f) => {
            const lexCount = currentRootFamMap?.get(f.id)?.length || 0;
            const active = selFamily === f.id;
            const meta = familyMetaMap.get(f.id);
            const circWords = meta?.circassianWords || [];
            const trWords = meta?.trMeanings || [];
            const sampleConcepts = (f.conceptIds || [])
              .slice(0, 4)
              .map((cid) => {
                const tr = conceptTrOf(cid);
                return tr ? `${tr} (${cid})` : cid;
              });

            return (
              <div
                key={f.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (!busy) chooseFamily(f.id);
                }}
                onKeyDown={(e) => {
                  if (!busy && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    chooseFamily(f.id);
                  }
                }}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: active ? "2px solid #2563eb" : "1px solid #e2e8f0",
                  background: active ? "#dbeafe" : "#fff",
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 15, color: "#0f172a" }}>
                      {circWords.length > 0 ? circWords.slice(0, 4).join(", ") : f.id}
                    </div>
                    <div style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b", marginTop: 1 }}>
                      {f.id}
                      {trWords.length > 0 ? ` • TR: ${trWords.slice(0, 3).join(", ")}` : ""}
                    </div>
                  </div>
                  <button
                    suppressHydrationWarning
                    disabled={!!busy}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFamilyFromRoot(f.id);
                    }}
                    style={{
                      fontSize: 10,
                      background: "#fee2e2",
                      color: "#b91c1c",
                      border: "1px solid #fecaca",
                      borderRadius: 6,
                      padding: "3px 7px",
                      cursor: busy ? "wait" : "pointer",
                      flexShrink: 0,
                    }}
                  >
                    Kökten Çıkar
                  </button>
                </div>

                {f.notes && (
                  <div style={{ fontSize: 11, color: "#334155", marginTop: 5 }}>{f.notes}</div>
                )}

                {sampleConcepts.length > 0 && (
                  <div style={{ fontSize: 11, color: "#4338ca", marginTop: 5 }}>
                    Kavramlar: {sampleConcepts.join(" · ")}
                    {(f.conceptIds || []).length > 4
                      ? ` +${(f.conceptIds || []).length - 4}`
                      : ""}
                  </div>
                )}

                <div style={{ fontSize: 11, color: "#64748b", marginTop: 5 }}>
                  {lexCount} kelime bu kökte • {(f.conceptIds || []).length} kavram •{" "}
                  {meta?.totalCount || 0} toplam kelime
                </div>
                {active && (
                  <div style={{ fontSize: 10, color: "#2563eb", fontWeight: 700, marginTop: 4 }}>
                    ✏️ Sağ panelde seçili
                  </div>
                )}
              </div>
            );
          })}
          {familiesOfRoot.length === 0 && (
            <div style={{ fontSize: 12, color: "#64748b", padding: 12 }}>
              Bu köke bağlı aile yok (lexemes içinde rootIds={selRoot} olan wordFamilyId bulunamadı)
            </div>
          )}
        </div>

        <button
          suppressHydrationWarning
          type="button"
          disabled={!!busy || !selRoot}
          onClick={exportRootFamilies}
          style={{
            marginTop: 12,
            padding: 10,
            borderRadius: 10,
            background: "#ede9fe",
            color: "#6d28d9",
            fontWeight: 700,
            border: "1px solid #c4b5fd",
            cursor: busy ? "wait" : "pointer",
          }}
        >
          ↓ Bu kökün ailelerini JSON indir (Çerkesçe + Türkçe)
        </button>
        {msg && (
          <div
            style={{
              marginTop: 12,
              fontSize: 12,
              padding: 10,
              borderRadius: 8,
              background: "#fff",
              border: "1px solid #e2e8f0",
            }}
          >
            {msg}
          </div>
        )}
      </div>

      {/* 3. Sütun: Detay + Düzenleme */}
      <div style={{ flex: 1, background: "#fff", padding: 24, overflowY: "auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 900 }}>
          Kök: {selectedRoot?.form ? `${selectedRoot.form} (${selectedRoot.id})` : selectedRoot?.id}
          {selRootMeaning ? ` — ${selRootMeaning}` : ""}
        </h2>
        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
          Kök ve ailelerin Çerkesçe biçimleri ile Türkçe karşılıklarını karşılaştırıp hatalı bağlantıları çıkarabilirsin.
        </div>

        {!selectedRoot ? (
          <div style={{ marginTop: 20 }}>Kök seç</div>
        ) : (
          <>
            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 12,
              }}
            >
              <div
                style={{
                  border: "2px solid #059669",
                  borderRadius: 12,
                  padding: 14,
                  background: "#ecfdf5",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 900, color: "#065f46" }}>
                  🌱 KÖK ({selectedRoot.id})
                </div>
                <div style={{ fontWeight: 900, fontSize: 20, marginTop: 6, color: "#0f172a" }}>
                  {selectedRoot.form || selectedRoot.id}{" "}
                  {selectedRoot.ipa ? (
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#475569" }}>
                      {selectedRoot.ipa}
                    </span>
                  ) : null}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#047857", marginTop: 4 }}>
                  Türkçe: {selRootMeaning || "—"}
                </div>
                {selectedRoot.notes && (
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
                    {selectedRoot.notes}
                  </div>
                )}
              </div>

              <div
                style={{
                  border: "2px solid #2563eb",
                  borderRadius: 12,
                  padding: 14,
                  background: "#eff6ff",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 900, color: "#1e40af" }}>
                  👨‍👩‍👧‍👦 SEÇİLİ AİLE {selFamily ? `(${selFamily})` : ""}
                </div>
                <div style={{ fontWeight: 900, fontSize: 18, marginTop: 6, color: "#0f172a" }}>
                  {selFamMeta?.circassianWords?.length
                    ? selFamMeta.circassianWords.slice(0, 5).join(", ")
                    : selFamily || "Aile seçilmedi"}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8", marginTop: 4 }}>
                  {selFamMeta?.trMeanings?.length
                    ? `Türkçe: ${selFamMeta.trMeanings.join(", ")}`
                    : selectedFamily?.notes || ""}
                </div>
              </div>
            </div>

            {draftFam ? (
              <div
                id="roots-family-editor"
                style={{
                  marginTop: 20,
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 16 }}>
                  Aile Bilgilerini Düzenle •{" "}
                  {selFamMeta?.circassianWords?.[0]
                    ? `${selFamMeta.circassianWords[0]} (${draftFam.id})`
                    : draftFam.id}
                </div>
                <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 4 }}>
                  ID değiştirilemez (bağlı {(draftFam.lexemeIds || []).length} lexeme kopar) •
                  rootIds düzenlemesi lexeme üzerinden yapılır
                </div>

                {selectedFamilyRootLexemes.length > 0 && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: 12,
                      borderRadius: 10,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#0f172a" }}>
                      Bu ailede &quot;{selectedRoot.form || selRoot}&quot; köküne bağlı kelimeler (
                      {selectedFamilyRootLexemes.length}):
                    </div>
                    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {selectedFamilyRootLexemes.slice(0, 30).map((l) => {
                        const tr = lexemeTrOf(l);
                        const cTr = l.conceptId ? conceptTrOf(l.conceptId) : "";
                        return (
                          <span
                            key={l.id}
                            style={{
                              fontSize: 12,
                              padding: "4px 8px",
                              borderRadius: 8,
                              background: "#fff",
                              border: "1px solid #cbd5e1",
                            }}
                          >
                            <strong>{l.form}</strong>
                            {tr ? ` — ${tr}` : ""}
                            {l.conceptId ? (
                              <span style={{ color: "#64748b", fontSize: 11 }}>
                                {" "}
                                [{cTr || l.conceptId}]
                              </span>
                            ) : null}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <label style={{ display: "block", marginTop: 16, fontSize: 12, fontWeight: 700 }}>
                  Notlar / Açıklama (eksikse gir)
                </label>
                <textarea
                  disabled={!!busy}
                  value={draftFam.notes || ""}
                  onChange={(e) => setDraftFam({ ...draftFam, notes: e.target.value })}
                  rows={3}
                  style={{
                    marginTop: 6,
                    width: "100%",
                    border: "2px solid #cbd5e1",
                    borderRadius: 10,
                    padding: "10px 12px",
                  }}
                  placeholder="El ailesi (Ӏэ). Somatik kök..."
                />

                <label style={{ display: "block", marginTop: 16, fontSize: 12, fontWeight: 700 }}>
                  Kavramlar — Türkçe & Çerkesçe Karşılıkları ({allDraftConcepts.length})
                </label>

                {allDraftConcepts.length > 0 && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: 10,
                      borderRadius: 10,
                      background: "#fffbeb",
                      border: "1px solid #fde68a",
                      maxHeight: 220,
                      overflowY: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    {visibleConcepts.map((cid, idx) => {
                      const cTr = conceptTrOf(cid);
                      const cSamples = conceptSamplesOf(cid);
                      return (
                        <span
                          key={`${cid}-${idx}`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "4px 8px",
                            borderRadius: 8,
                            background: "#fff",
                            border: "1px solid #fcd34d",
                            fontSize: 12,
                          }}
                        >
                          <span>
                            {cSamples.length > 0 && (
                              <strong style={{ color: "#0f172a" }}>{cSamples[0]} · </strong>
                            )}
                            <span style={{ fontWeight: 700, color: "#92400e" }}>
                              {cTr || cid}
                            </span>
                            {cTr && (
                              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#64748b" }}>
                                {" "}
                                ({cid})
                              </span>
                            )}
                          </span>
                          <button
                            type="button"
                            disabled={!!busy}
                            title={`${cid} kavramını çıkar`}
                            onClick={() =>
                              setDraftFam({
                                ...draftFam,
                                conceptIds: allDraftConcepts.filter((_, i) => i !== idx),
                              })
                            }
                            style={{
                              border: "none",
                              background: "#fee2e2",
                              color: "#b91c1c",
                              borderRadius: 4,
                              padding: "0 5px",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                    {!showAllConcepts && allDraftConcepts.length > 60 && (
                      <button
                        type="button"
                        onClick={() => setShowAllConcepts(true)}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 8,
                          background: "#fef3c7",
                          border: "1px solid #f59e0b",
                          color: "#92400e",
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        + Tümünü göster ({allDraftConcepts.length})
                      </button>
                    )}
                  </div>
                )}

                <label style={{ display: "block", marginTop: 12, fontSize: 11, color: "#64748b" }}>
                  Ham conceptIds listesi (virgülle ayırarak düzenleyebilirsin):
                </label>
                <input
                  disabled={!!busy}
                  value={allDraftConcepts.join(", ")}
                  onChange={(e) =>
                    setDraftFam({
                      ...draftFam,
                      conceptIds: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  style={{
                    marginTop: 4,
                    width: "100%",
                    border: "2px solid #cbd5e1",
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 12,
                  }}
                  placeholder="Kaynakta doğruladığın kavram kimlikleri"
                />

                <div style={{ marginTop: 12, fontSize: 11, color: "#64748b" }}>
                  lexemeIds: {(draftFam.lexemeIds || []).length} • _source: {draftFam._source || ""} • Bu
                  kökte {selectedFamilyRootLexemes.length} lexeme
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    disabled={!!busy}
                    onClick={exportFamilyDraft}
                    style={{
                      background: "#ede9fe",
                      color: "#6d28d9",
                      fontWeight: 700,
                      border: "1px solid #c4b5fd",
                      borderRadius: 10,
                      padding: "10px 14px",
                      cursor: busy ? "wait" : "pointer",
                    }}
                  >
                    ↓ Taslağı JSON indir (Çerkesçe + Türkçe)
                  </button>
                  <button
                    type="button"
                    disabled={!!busy}
                    onClick={() => {
                      if (!canLeaveFamily()) return;
                      setDraftFam(selectedFamily ? { ...selectedFamily } : null);
                    }}
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      borderRadius: 10,
                      padding: "10px 14px",
                      cursor: busy ? "wait" : "pointer",
                    }}
                  >
                    Değişiklikleri geri al
                  </button>
                  <span
                    style={{
                      fontSize: 12,
                      alignSelf: "center",
                      color: familyDirty ? "#b45309" : "#64748b",
                    }}
                  >
                    {familyDirty ? "Kaydedilmemiş değişiklik var" : "Yeni değişiklik yok"}
                  </span>
                </div>

                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  <button
                    disabled={!!(busy || !familyDirty)}
                    onClick={saveFamily}
                    style={{
                      background: familyDirty && !busy ? "#16a34a" : "#94a3b8",
                      color: "#fff",
                      fontWeight: 900,
                      padding: "10px 18px",
                      borderRadius: 10,
                      border: "none",
                      cursor: busy ? "wait" : !familyDirty ? "not-allowed" : "pointer",
                    }}
                  >
                    {busy ? "İşlem sürüyor..." : "✓ Aileyi Kaydet"}
                  </button>
                  <button
                    disabled={!!busy}
                    onClick={() => removeFamilyFromRoot(draftFam.id)}
                    style={{
                      background: "#fee2e2",
                      color: "#b91c1c",
                      fontWeight: 700,
                      padding: "10px 18px",
                      borderRadius: 10,
                      border: "1px solid #fecaca",
                      cursor: busy ? "wait" : "pointer",
                    }}
                  >
                    Bu Kökten Çıkar
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginTop: 20,
                  fontSize: 13,
                  color: "#64748b",
                  border: "1px dashed #cbd5e1",
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center",
                }}
              >
                Ortadaki listeden bir aile seç → sağda Çerkesçe ve Türkçe karşılıklarını gör →
                düzenle veya hatalıysa &quot;Bu Kökten Çıkar&quot; ile ayır
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
