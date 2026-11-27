"use client";
// Sprint 2A.3 - Tam Alan Lexeme Düzenleme Formu (controlled state + dry-run/apply)
import { useState } from "react";

export interface SenseExampleItem {
  kbd?: string;
  ady?: string;
  tr?: string;
  en?: string;
  ru?: string;
  [key: string]: any;
}

export interface SenseItem {
  n?: number;
  tr?: string;
  en?: string;
  ru?: string;
  ar?: string;
  source?: string;
  examples?: SenseExampleItem[];
  [key: string]: any;
}

export interface LexemeEditInitial {
  form: string;
  ipa: string;
  dialect: string;
  partOfSpeech: string;
  status: string;
  etymologyType: string;
  isLemma: boolean;
  corpusFrequency: string;
  meaning: string;
  literalMeaning: string;
  translations: {
    tr: string;
    en: string;
    ru: string;
    ar: string;
  };
  senses: SenseItem[];
  examples: any[];
  wordFamilyId: string;
  conceptId: string;
  rootIds: string;
  root: string;
  resolvedRootForm?: string;
  dialectVariants: {
    adyghe: string;
    kabardian: string;
    [key: string]: any;
  };
  derivation: {
    rule: string;
    rootIds: string;
    morphemeIds: string;
    [key: string]: any;
  };
  notes: string;
  dialectNote: string;
  etymology: string;
  source: string;
  sources: string[];
  audioUrl: string;
  scientificName: string;
  tags: string;
  rawRecord: Record<string, any>;
}

const DIALECT_OPTIONS = ["", "COMMON", "KBD", "ADY", "BES", "SHP", "BZJ", "ABZ"];
const POS_OPTIONS = ["", "noun", "verb", "adjective", "adverb", "pronoun", "numeral", "postposition", "conjunction", "interjection", "particle", "prefix", "suffix", "phrase", "idiom"];
const STATUS_OPTIONS = ["", "VERIFIED", "DRAFT", "REVIEW", "NEEDS_REVIEW"];
const ETYM_OPTIONS = ["", "native", "borrowed", "compound", "derived", "loanword", "unknown"];

function formatDiffValue(val: any): string {
  if (val === null || val === undefined || val === "") return "—";
  if (typeof val === "object") {
    const s = JSON.stringify(val, null, 2);
    return s.length > 350 ? s.slice(0, 347) + "..." : s;
  }
  return String(val);
}

function exampleItemToText(ex: any): string {
  if (typeof ex === "string") return ex;
  return JSON.stringify(ex);
}

function textLineToExampleItem(line: string): any {
  const trimmed = line.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return line;
    }
  }
  return line;
}

export default function EditForm({
  lexemeId,
  initial,
}: {
  lexemeId: string;
  initial: LexemeEditInitial;
}) {
  // 1 — Temel Kimlik & Dilbilgisi
  const [form, setForm] = useState(initial.form);
  const [ipa, setIpa] = useState(initial.ipa);
  const [dialect, setDialect] = useState(initial.dialect);
  const [partOfSpeech, setPartOfSpeech] = useState(initial.partOfSpeech);
  const [status, setStatus] = useState(initial.status);
  const [etymologyType, setEtymologyType] = useState(initial.etymologyType);
  const [isLemma, setIsLemma] = useState(initial.isLemma);
  const [corpusFrequency, setCorpusFrequency] = useState(initial.corpusFrequency);

  // 2 — Ana Anlamlar & Çeviriler
  const [meaning, setMeaning] = useState(initial.meaning);
  const [literalMeaning, setLiteralMeaning] = useState(initial.literalMeaning);
  const [tr, setTr] = useState(initial.translations.tr);
  const [en, setEn] = useState(initial.translations.en);
  const [ru, setRu] = useState(initial.translations.ru);
  const [ar, setAr] = useState(initial.translations.ar);

  // 3 — Ayrıntılı Anlamlar (senses[])
  const [senses, setSenses] = useState<SenseItem[]>(() =>
    initial.senses.map((s) => ({
      ...s,
      examples: Array.isArray(s.examples) ? s.examples.map((ex) => ({ ...ex })) : [],
    }))
  );

  // 4 — Örnek Cümleler (examples[])
  const [examplesText, setExamplesText] = useState(() =>
    initial.examples.map(exampleItemToText).join("\n")
  );

  // 5 — Kök, Aile, Kavram & Türetim
  const [wordFamilyId, setWordFamilyId] = useState(initial.wordFamilyId);
  const [conceptId, setConceptId] = useState(initial.conceptId);
  const [rootIds, setRootIds] = useState(initial.rootIds);
  const [adygheVariant, setAdygheVariant] = useState(initial.dialectVariants.adyghe);
  const [kabardianVariant, setKabardianVariant] = useState(initial.dialectVariants.kabardian);
  const [derivRule, setDerivRule] = useState(initial.derivation.rule);
  const [derivRootIds, setDerivRootIds] = useState(initial.derivation.rootIds);
  const [derivMorphemeIds, setDerivMorphemeIds] = useState(initial.derivation.morphemeIds);

  // 6 — Açıklamalar, Notlar & Kaynaklar
  const [notes, setNotes] = useState(initial.notes);
  const [dialectNote, setDialectNote] = useState(initial.dialectNote);
  const [etymology, setEtymology] = useState(initial.etymology);
  const [source, setSource] = useState(initial.source);
  const [sourcesText, setSourcesText] = useState(() => initial.sources.join("\n"));
  const [audioUrl, setAudioUrl] = useState(initial.audioUrl);
  const [scientificName, setScientificName] = useState(initial.scientificName);
  const [tags, setTags] = useState(initial.tags);

  const [diff, setDiff] = useState<{ field: string; oldValue: any; newValue: any }[] | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [familyStatus, setFamilyStatus] = useState("");
  // Anlam #1 (index 0) açık, Anlam #2+ varsayılan kapalı (açılan kutu)
  const [openSenses, setOpenSenses] = useState<Record<number, boolean>>({ 0: true });

  function toggleSenseOpen(index: number) {
    setOpenSenses((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function toggleAllSenses() {
    const anyCollapsed = senses.some((_, idx) => !openSenses[idx]);
    const next: Record<number, boolean> = {};
    senses.forEach((_, idx) => {
      next[idx] = anyCollapsed;
    });
    setOpenSenses(next);
  }

  function checkFamily(id: string) {
    if (!id.trim()) {
      setFamilyStatus("");
      return;
    }
    if (!/^WF-[A-Z0-9_-]+$/.test(id.trim().toUpperCase())) {
      setFamilyStatus("⚠️ Format: WF-GU gibi olmalı");
      return;
    }
    setFamilyStatus("✓ Format doğru — kaydetmede kontrol edilecek");
  }

  function updateSenseField(index: number, key: keyof SenseItem, value: any) {
    setSenses((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  }

  function addSense() {
    const nextIndex = senses.length;
    setSenses((prev) => [
      ...prev,
      { n: prev.length + 1, tr: "", en: "", ru: "", ar: "", source: "", examples: [] },
    ]);
    setOpenSenses((prev) => ({ ...prev, [nextIndex]: true }));
  }

  function removeSense(index: number) {
    setSenses((prev) => prev.filter((_, i) => i !== index));
    setOpenSenses((prev) => {
      const next: Record<number, boolean> = {};
      Object.entries(prev).forEach(([k, v]) => {
        const ki = Number(k);
        if (ki < index) next[ki] = v;
        else if (ki > index) next[ki - 1] = v;
      });
      return next;
    });
  }

  function addSenseExample(senseIdx: number) {
    setSenses((prev) =>
      prev.map((s, i) =>
        i === senseIdx
          ? { ...s, examples: [...(s.examples || []), { kbd: "", tr: "" }] }
          : s
      )
    );
  }

  function updateSenseExample(senseIdx: number, exIdx: number, key: "kbd" | "tr", val: string) {
    setSenses((prev) =>
      prev.map((s, i) =>
        i === senseIdx
          ? {
              ...s,
              examples: (s.examples || []).map((ex, j) =>
                j === exIdx ? { ...ex, [key]: val } : ex
              ),
            }
          : s
      )
    );
  }

  function removeSenseExample(senseIdx: number, exIdx: number) {
    setSenses((prev) =>
      prev.map((s, i) =>
        i === senseIdx
          ? { ...s, examples: (s.examples || []).filter((_, j) => j !== exIdx) }
          : s
      )
    );
  }

  function buildChanges(): Record<string, any> {
    const parseCsv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
    const parsedExamples = examplesText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map(textLineToExampleItem);

    const parsedSources = sourcesText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const normalizedSenses = senses.map((s, idx) => {
      const cleaned: SenseItem = { ...s };
      if (
        Array.isArray(cleaned.examples) &&
        cleaned.examples.length === 0 &&
        !Array.isArray(initial.senses[idx]?.examples)
      ) {
        delete cleaned.examples;
      }
      return cleaned;
    });

    const dialectVariantsOut: Record<string, any> = { ...initial.rawRecord?.dialectVariants };
    if (adygheVariant.trim()) dialectVariantsOut.adyghe = adygheVariant.trim();
    else delete dialectVariantsOut.adyghe;
    if (kabardianVariant.trim()) dialectVariantsOut.kabardian = kabardianVariant.trim();
    else delete dialectVariantsOut.kabardian;

    const derivationOut: Record<string, any> = { ...initial.rawRecord?.derivation };
    if (derivRule.trim()) derivationOut.rule = derivRule.trim();
    else delete derivationOut.rule;
    const dRoots = parseCsv(derivRootIds);
    const dMorphs = parseCsv(derivMorphemeIds);
    if (dRoots.length || initial.rawRecord?.derivation?.rootIds) derivationOut.rootIds = dRoots;
    if (dMorphs.length || initial.rawRecord?.derivation?.morphemeIds) derivationOut.morphemeIds = dMorphs;

    const changes: Record<string, any> = {
      form,
      ipa,
      dialect,
      partOfSpeech,
      status,
      etymologyType,
      isLemma,
      corpusFrequency: corpusFrequency.trim() === "" ? null : Number(corpusFrequency),
      meaning,
      literalMeaning,
      translations: { tr, en, ru, ar },
      wordFamilyId,
      conceptId,
      rootIds,
      notes,
      dialectNote,
      etymology,
      source,
      audioUrl,
      scientificName,
      tags,
    };

    if (senses.length > 0 || initial.senses.length > 0) {
      changes.senses = normalizedSenses;
    }
    if (parsedExamples.length > 0 || initial.examples.length > 0) {
      changes.examples = parsedExamples;
    }
    if (Object.keys(dialectVariantsOut).length > 0 || initial.rawRecord?.dialectVariants) {
      changes.dialectVariants = dialectVariantsOut;
    }
    if (Object.keys(derivationOut).length > 0 || initial.rawRecord?.derivation) {
      changes.derivation = derivationOut;
    }
    if (parsedSources.length > 0 || initial.sources.length > 0) {
      changes.sources = parsedSources;
    }

    return changes;
  }

  async function post(confirm: boolean) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/curation/lexeme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lexemeId, changes: buildChanges(), confirm }),
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
      setMessage(json.diff.length === 0 ? "Değişiklik yok." : `${json.diff.length} alan değişecek — onaylayın.`);
    } else {
      setMessage(json.error ?? "Beklenmeyen yanıt.");
    }
  }

  async function handleConfirm() {
    const json = await post(true);
    setDiff(null);
    setMessage(
      json.applied
        ? `Uygulandı: ${json.appliedFields.join(", ")} — sayfayı yenileyin.`
        : json.message ?? json.error ?? ""
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 11px",
    borderRadius: 9,
    border: "1px solid #cbd5e1",
    background: "#fff",
    fontSize: 13.5,
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11.5,
    fontWeight: 800,
    color: "#334155",
    marginBottom: 5,
    letterSpacing: "0.02em",
  };
  const hintStyle: React.CSSProperties = { fontSize: 11, color: "#64748b", marginTop: 4 };
  const sectionStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 16,
    background: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 900,
    color: "#0f172a",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: 8,
    marginBottom: 2,
  };

  return (
    <div>
      {/* Başlık kartı */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #7c3aed 100%)",
          borderRadius: 14,
          padding: 18,
          color: "#fff",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 700, letterSpacing: "0.08em" }}>
              ÇERKESÇE SÖZLÜK • TAM ALAN DÜZENLEME
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 3 }}>
              {lexemeId} — {form}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 3 }}>
              Tüm alanlar (anlamlar, senses, örnekler, açıklamalar, kök/aile, lehçe varyantları) düzenlenebilir. Önce dry-run → sonra onay.
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.16)", borderRadius: 999, padding: "6px 12px", fontSize: 11, fontWeight: 800, whiteSpace: "nowrap" }}>
            ✏️ TAM FORM
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* 1. TEMEL KİMLİK & DİLBİLGİSİ */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>1. Temel Kimlik & Dilbilgisi</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>FORM (Başlık Kelime)</label>
              <input value={form} onChange={(e) => setForm(e.target.value)} style={fieldStyle} dir="auto" />
            </div>
            <div>
              <label style={labelStyle}>IPA (Fonetik)</label>
              <input value={ipa} onChange={(e) => setIpa(e.target.value)} placeholder="/ʁɐwǝ'vǝn/" style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>LEHÇE (Dialect)</label>
              <select value={dialect} onChange={(e) => setDialect(e.target.value)} style={fieldStyle}>
                {!DIALECT_OPTIONS.includes(dialect) && <option value={dialect}>{dialect}</option>}
                {DIALECT_OPTIONS.map((d) => (
                  <option key={d || "_empty"} value={d}>{d || "— Seçiniz —"}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, alignItems: "end" }}>
            <div>
              <label style={labelStyle}>SÖZCÜK TÜRÜ (Part of Speech)</label>
              <select value={partOfSpeech} onChange={(e) => setPartOfSpeech(e.target.value)} style={fieldStyle}>
                {!POS_OPTIONS.includes(partOfSpeech) && <option value={partOfSpeech}>{partOfSpeech}</option>}
                {POS_OPTIONS.map((p) => (
                  <option key={p || "_empty"} value={p}>{p || "— Seçiniz —"}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>DURUM (Status)</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={fieldStyle}>
                {!STATUS_OPTIONS.includes(status) && <option value={status}>{status}</option>}
                {STATUS_OPTIONS.map((st) => (
                  <option key={st || "_empty"} value={st}>{st || "— Yok —"}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>ETİMOLOJİ TİPİ</label>
              <select value={etymologyType} onChange={(e) => setEtymologyType(e.target.value)} style={fieldStyle}>
                {!ETYM_OPTIONS.includes(etymologyType) && <option value={etymologyType}>{etymologyType}</option>}
                {ETYM_OPTIONS.map((et) => (
                  <option key={et || "_empty"} value={et}>{et || "— Seçiniz —"}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>KORPUS FREKANS</label>
                <input
                  type="number"
                  value={corpusFrequency}
                  onChange={(e) => setCorpusFrequency(e.target.value)}
                  placeholder="—"
                  style={fieldStyle}
                />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#334155", paddingTop: 16, whiteSpace: "nowrap" }}>
                <input type="checkbox" checked={isLemma} onChange={(e) => setIsLemma(e.target.checked)} />
                isLemma
              </label>
            </div>
          </div>
        </div>

        {/* 2. ANA ANLAMLAR & ÇEVİRİLER */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>2. Ana Anlamlar & Çok Dilli Çeviriler (`meaning`, `literalMeaning`, `translations`)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>ANA ANLAM (`meaning` — Türkçe özet)</label>
              <textarea rows={2} value={meaning} onChange={(e) => setMeaning(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>KELİME ANLAMI (`literalMeaning`)</label>
              <textarea rows={2} value={literalMeaning} onChange={(e) => setLiteralMeaning(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>🇹🇷 TÜRKÇE (`translations.tr`)</label>
              <textarea rows={2} value={tr} onChange={(e) => setTr(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>🇬🇧 İNGİLİZCE (`translations.en`)</label>
              <textarea rows={2} value={en} onChange={(e) => setEn(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>🇷🇺 RUSÇA (`translations.ru`)</label>
              <textarea rows={2} value={ru} onChange={(e) => setRu(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>🇸🇦 ARAPÇA (`translations.ar`)</label>
              <textarea rows={2} value={ar} onChange={(e) => setAr(e.target.value)} dir="rtl" style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
          </div>
        </div>

        {/* 3. AYRINTILI ANLAMLAR (senses[]) */}
        <div style={sectionStyle}>
          <div style={{ ...sectionTitleStyle, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span>3. Ayrıntılı Anlamlar (`senses[]` — {senses.length} anlam)</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {senses.length > 1 && (
                <button
                  type="button"
                  onClick={toggleAllSenses}
                  style={{ background: "#e2e8f0", color: "#334155", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}
                >
                  {senses.some((_, idx) => !openSenses[idx]) ? "Tümünü Aç" : "2+ Kapat"}
                </button>
              )}
              <button
                type="button"
                onClick={addSense}
                style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}
              >
                + Yeni Anlam Ekle
              </button>
            </div>
          </div>

          {senses.length === 0 ? (
            <div style={{ fontSize: 12.5, color: "#64748b", fontStyle: "italic" }}>Kayıtlı alt anlam (`senses`) yok.</div>
          ) : (
            senses.map((s, idx) => {
              const isOpen = Boolean(openSenses[idx]);
              const summaryText = s.tr || s.en || s.ru || "(Boş anlam)";
              const exCount = (s.examples || []).length;

              return (
                <div key={idx} style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, overflow: "hidden" }}>
                  <div
                    onClick={() => toggleSenseOpen(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSenseOpen(idx);
                      }
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      cursor: "pointer",
                      background: isOpen ? "#f5f3ff" : "#fff",
                      borderBottom: isOpen ? "1px solid #e2e8f0" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
                      <span style={{ fontSize: 12, color: "#64748b", width: 14 }}>{isOpen ? "▼" : "▶"}</span>
                      <span style={{ fontSize: 12, fontWeight: 900, color: "#7c3aed", whiteSpace: "nowrap" }}>
                        Anlam #{s.n ?? idx + 1}
                      </span>
                      {!isOpen && (
                        <span
                          style={{
                            fontSize: 12.5,
                            color: "#334155",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {summaryText}
                        </span>
                      )}
                      {exCount > 0 && (
                        <span style={{ fontSize: 11, background: "#f1f5f9", color: "#475569", padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap" }}>
                          {exCount} örnek
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSense(idx);
                      }}
                      style={{ background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}
                    >
                      Anlamı Sil
                    </button>
                  </div>

                  {isOpen && (
                    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#475569" }}>Sıra (n):</span>
                        <input
                          type="number"
                          value={s.n ?? idx + 1}
                          onChange={(e) => updateSenseField(idx, "n", Number(e.target.value))}
                          style={{ width: 68, padding: "4px 8px", fontSize: 12, border: "1px solid #cbd5e1", borderRadius: 6 }}
                          title="Anlam sıra numarası (n)"
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div>
                          <label style={labelStyle}>TR</label>
                          <input value={s.tr ?? ""} onChange={(e) => updateSenseField(idx, "tr", e.target.value)} style={fieldStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>EN</label>
                          <input value={s.en ?? ""} onChange={(e) => updateSenseField(idx, "en", e.target.value)} style={fieldStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>RU</label>
                          <input value={s.ru ?? ""} onChange={(e) => updateSenseField(idx, "ru", e.target.value)} style={fieldStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>AR</label>
                          <input value={s.ar ?? ""} onChange={(e) => updateSenseField(idx, "ar", e.target.value)} dir="rtl" style={fieldStyle} />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Anlam Kaynağı / Notu (`source`)</label>
                        <input value={s.source ?? ""} onChange={(e) => updateSenseField(idx, "source", e.target.value)} style={fieldStyle} />
                      </div>

                      <div style={{ borderTop: "1px dashed #e2e8f0", paddingTop: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: "#475569" }}>Anlam İçi Örnekler ({(s.examples || []).length})</span>
                          <button
                            type="button"
                            onClick={() => addSenseExample(idx)}
                            style={{ background: "#e2e8f0", color: "#0f172a", border: "none", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                          >
                            + Örnek
                          </button>
                        </div>
                        {(s.examples || []).map((ex, exIdx) => (
                          <div key={exIdx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 6, marginBottom: 6 }}>
                            <input
                              placeholder="Çerkesçe (kbd)"
                              value={ex.kbd ?? ex.ady ?? ""}
                              onChange={(e) => updateSenseExample(idx, exIdx, "kbd", e.target.value)}
                              style={fieldStyle}
                              dir="auto"
                            />
                            <input
                              placeholder="Türkçe çeviri (tr)"
                              value={ex.tr ?? ""}
                              onChange={(e) => updateSenseExample(idx, exIdx, "tr", e.target.value)}
                              style={fieldStyle}
                            />
                            <button
                              type="button"
                              onClick={() => removeSenseExample(idx, exIdx)}
                              style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 7, padding: "0 9px", fontSize: 12, cursor: "pointer" }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 4. ÖRNEK CÜMLELER (examples[]) */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>
            4. Örnek Cümleler / Kalıplar (`examples[]` — satır başına 1 örnek)
          </div>
          <textarea
            rows={Math.min(14, Math.max(4, examplesText.split(/\r?\n/).length + 1))}
            value={examplesText}
            onChange={(e) => setExamplesText(e.target.value)}
            placeholder="Her satıra bir örnek cümle veya kullanım kalıbı yazın..."
            style={{ ...fieldStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
            dir="auto"
          />
          <div style={hintStyle}>Her satır ayrı bir `examples` elemanı olarak kaydedilir (boş satırlar elenir).</div>
        </div>

        {/* 5. KÖK, AİLE, KAVRAM & TÜRETİM */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>5. Kök, Aile, Kavram, Lehçe Varyantları & Türetim</div>
          <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 10, padding: 12 }}>
            <label style={labelStyle}>🏠 WORD FAMILY ID <span style={{ color: "#7c3aed" }}>• Aile</span></label>
            <input
              value={wordFamilyId}
              onChange={(e) => {
                setWordFamilyId(e.target.value);
                checkFamily(e.target.value);
              }}
              placeholder="örn: WF-GU"
              style={{ ...fieldStyle, fontFamily: "monospace", textTransform: "uppercase", borderColor: "#c4b5fd" }}
            />
            <div style={hintStyle}>
              Aile yoksa kaydetmede uyarı verir. {familyStatus && <span style={{ color: "#7c3aed", fontWeight: 700 }}>{familyStatus}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>💡 CONCEPT ID</label>
              <input
                value={conceptId}
                onChange={(e) => setConceptId(e.target.value)}
                placeholder="BUILD"
                style={{ ...fieldStyle, fontFamily: "monospace", textTransform: "uppercase" }}
              />
            </div>
            <div>
              <label style={labelStyle}>🌱 ROOT IDs (virgülle)</label>
              <input value={rootIds} onChange={(e) => setRootIds(e.target.value)} placeholder="R-UVY, R-UV" style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>
                KÖK FORMU (`roots.json`)
                {initial.resolvedRootForm && (
                  <span style={{ marginLeft: 6, fontWeight: 700, color: "#7c3aed", background: "#f5f3ff", padding: "1px 6px", borderRadius: 6, fontSize: 10.5 }}>
                    rootId lookup
                  </span>
                )}
              </label>
              <input
                value={initial.resolvedRootForm || initial.root || "—"}
                readOnly
                style={{ ...fieldStyle, background: "#f1f5f9", color: "#334155", cursor: "default" }}
                dir="auto"
              />
              <div style={hintStyle}>Kanonik kaynak: `rootId → roots.json` (`lexemes.json`'a yazılmaz)</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>BATI VARYANTI (`dialectVariants.adyghe`)</label>
              <input value={adygheVariant} onChange={(e) => setAdygheVariant(e.target.value)} style={fieldStyle} dir="auto" />
            </div>
            <div>
              <label style={labelStyle}>DOĞU VARYANTI (`dialectVariants.kabardian`)</label>
              <input value={kabardianVariant} onChange={(e) => setKabardianVariant(e.target.value)} style={fieldStyle} dir="auto" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>TÜRETİM KURALI (`derivation.rule`)</label>
              <input value={derivRule} onChange={(e) => setDerivRule(e.target.value)} placeholder="compound / derived" style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>TÜRETİM KÖKLERİ (`derivation.rootIds`)</label>
              <input value={derivRootIds} onChange={(e) => setDerivRootIds(e.target.value)} placeholder="R-UVY_2" style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>MORFEM IDs (`derivation.morphemeIds`)</label>
              <input value={derivMorphemeIds} onChange={(e) => setDerivMorphemeIds(e.target.value)} style={fieldStyle} />
            </div>
          </div>
        </div>

        {/* 6. AÇIKLAMALAR, NOTLAR & KAYNAKLAR */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>6. Açıklamalar, Etimoloji Notları & Kaynaklar</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>🗒️ AÇIKLAMA / NOTLAR (`notes`)</label>
              <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Kullanım, dilbilgisi ve etimoloji notları..." style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>🗣️ LEHÇE NOTU (`dialectNote`)</label>
              <textarea rows={3} value={dialectNote} onChange={(e) => setDialectNote(e.target.value)} placeholder="Lehçeler arası fark notu..." style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>ETİMOLOJİ AÇIKLAMASI (`etymology`)</label>
              <input value={etymology} onChange={(e) => setEtymology(e.target.value)} style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>TEKİL KAYNAK (`source`)</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} style={fieldStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>KAYNAK LİSTESİ (`sources[]` — satır başına 1)</label>
              <textarea rows={2} value={sourcesText} onChange={(e) => setSourcesText(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <label style={labelStyle}>ETİKETLER (`tags`, virgülle)</label>
                <input value={tags} onChange={(e) => setTags(e.target.value)} style={fieldStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <label style={labelStyle}>SES URL (`audioUrl`)</label>
                  <input value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>BİLİMSEL AD (`scientificName`)</label>
                  <input value={scientificName} onChange={(e) => setScientificName(e.target.value)} style={fieldStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. HAM JSON ÖNİZLEMESİ */}
        <details style={{ border: "1px solid #cbd5e1", borderRadius: 10, padding: "10px 14px", background: "#fff" }}>
          <summary style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 800, color: "#475569" }}>
            📦 Tüm Ham Kayıt Alanları ({Object.keys(initial.rawRecord || {}).length} alan — salt-okunur inceleme)
          </summary>
          <pre style={{ marginTop: 10, maxHeight: 340, overflow: "auto", fontSize: 11.5, background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 8 }}>
            {JSON.stringify(initial.rawRecord, null, 2)}
          </pre>
        </details>

        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? "#94a3b8" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "13px",
            fontWeight: 800,
            cursor: saving ? "not-allowed" : "pointer",
            fontSize: 14,
          }}
        >
          {saving ? "⏳ Kontrol ediliyor..." : "🔍 Değişiklikleri Kontrol Et (dry-run)"}
        </button>
        <div style={{ fontSize: 11, color: "#64748b", textAlign: "center" }}>
          Önce dry-run yapılır, hiçbir şey yazılmaz. Onaylarsan yazılır + yedek/audit oluşturulur.
        </div>
      </form>

      {diff && diff.length > 0 && (
        <div style={{ marginTop: 16, borderRadius: 14, border: "1px solid #fbbf24", background: "#fffbeb", padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: 900, fontSize: 15 }}>⚠️ Değişiklik Raporu — {diff.length} alan değişecek</h3>
            <span style={{ background: "#f59e0b", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 999 }}>
              DRY-RUN
            </span>
          </div>
          <ul style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {diff.map((d) => (
              <li
                key={d.field}
                style={{
                  background: "#fff",
                  border: "1px solid #fde68a",
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 12.5,
                  display: "grid",
                  gridTemplateColumns: "150px 1fr 20px 1fr",
                  alignItems: "start",
                  gap: 10,
                }}
              >
                <b style={{ fontFamily: "monospace" }}>{d.field}</b>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#991b1b", fontFamily: "inherit" }}>
                  {formatDiffValue(d.oldValue)}
                </pre>
                <span>→</span>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#166534", fontWeight: 700, fontFamily: "inherit" }}>
                  {formatDiffValue(d.newValue)}
                </pre>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={saving}
              style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontWeight: 800, cursor: "pointer", flex: 1 }}
            >
              ✅ Onayla ve Uygula
            </button>
            <button
              type="button"
              onClick={() => setDiff(null)}
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 16px", cursor: "pointer" }}
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}

      {message && (
        <div
          style={{
            marginTop: 12,
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 13,
            background: message.includes("Uygulandı")
              ? "#dcfce7"
              : message.includes("Değişiklik yok")
                ? "#f1f5f9"
                : "#fef2f2",
            border: "1px solid #e2e8f0",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
