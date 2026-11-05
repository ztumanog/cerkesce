"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lexeme = {
  id: string;
  [key: string]: unknown;
};

type Language = {
  key: string;
  label: string;
  icon: string;
  badge: string;
  border: string;
  background: string;
  accent: string;
};

const languages: Language[] = [
  {
    key: "tr", label: "TÜRKÇE", icon: "🇹🇷", badge: "TR",
    border: "#38bdf8", background: "#eaf4ff", accent: "#0369a1",
  },
  {
    key: "en", label: "İNGİLİZCE", icon: "🇬🇧", badge: "EN",
    border: "#4ade80", background: "#eaffea", accent: "#166534",
  },
  {
    key: "ru", label: "RUSÇA", icon: "🇷🇺", badge: "RU",
    border: "#f87171", background: "#fef2f2", accent: "#b91c1c",
  },
  {
    key: "ady", label: "ADIĞECE", icon: "🏔️", badge: "ADY",
    border: "#2dd4bf", background: "#f0fdfa", accent: "#0f766e",
  },
  {
    key: "ar", label: "ARAPÇA", icon: "🌙", badge: "RTL",
    border: "#c4b5fd",
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 20%, #e9d5ff 70%, #a78bfa 100%)",
    accent: "#78350f",
  },
];

const SIZE = 50;
const inputClass =
  "mt-3 w-full rounded-xl border-2 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2";
const buttonClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40";

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function translations(record: Lexeme | null): Record<string, unknown> {
  return record && isObject(record.translations) ? record.translations : {};
}

function rootsText(record: Lexeme | null): string {
  return Array.isArray(record?.rootIds)
    ? record.rootIds.map(text).join(", ")
    : text(record?.rootIds);
}

function changedPatch(original: Lexeme, draft: Lexeme): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  for (const key of [
    "form", "ipa", "rootIds", "wordFamilyId", "conceptId",
    "dialect", "lehce", "notes", "translations",
  ]) {
    if (JSON.stringify(original[key]) !== JSON.stringify(draft[key])) {
      patch[key] = draft[key];
    }
  }
  return patch;
}

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
  const [saving, setSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/data/linguistic/lexemes.json", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Veri alınamadı (${response.status}).`);
        const raw: unknown = await response.json();
        const records = Array.isArray(raw)
          ? raw : isObject(raw) ? raw.lexemes : undefined;

        if (!Array.isArray(records) || !records.length) {
          throw new Error("Lexeme verisi boş veya geçersiz.");
        }

        const ids = new Set<string>();
        for (const record of records) {
          if (!isObject(record) || typeof record.id !== "string" || !record.id) {
            throw new Error("Geçersiz kayıt kimliği bulundu.");
          }
          if (ids.has(record.id)) {
            throw new Error(`Tekrarlanan kimlik: ${record.id}`);
          }
          ids.add(record.id);
        }

        if (!controller.signal.aborted) {
          const list = records as Lexeme[];
          setLexemes(list);
          setSelectedId(list[0].id);
          setDraft(list[0]);
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : "Veri yüklenemedi.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const original = lexemes.find(record => record.id === selectedId);
  const patch = original && draft ? changedPatch(original, draft) : {};
  const dirty = Object.keys(patch).length > 0;
  const values = translations(draft);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("tr");
    return lexemes.filter(record => !search || [
      record.id,
      text(record.form),
      JSON.stringify(record.translations ?? {}),
      rootsText(record),
      text(record.wordFamilyId),
      text(record.conceptId),
    ].join(" ").toLocaleLowerCase("tr").includes(search));
  }, [lexemes, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / SIZE));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * SIZE, currentPage * SIZE);

  const adyKey = original && Object.prototype.hasOwnProperty.call(translations(original), "ady")
    ? "ady"
    : original && Object.prototype.hasOwnProperty.call(translations(original), "ad")
      ? "ad" : null;

  const dialectKey = original &&
    Object.prototype.hasOwnProperty.call(original, "dialect")
    ? "dialect"
    : original && Object.prototype.hasOwnProperty.call(original, "lehce")
      ? "lehce" : "dialect";

  function select(record: Lexeme) {
    if (saving) return;
    if (record.id === selectedId) return;
    if (dirty && !window.confirm(
      "Kaydedilmemiş taslak var. Taslağı bırakıp diğer kelimeye geçilsin mi?",
    )) return;

    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(false);
    setSelectedId(record.id);
    setDraft(record);
    setMessage("");
    setError("");
  }

  function change(key: string, value: unknown) {
    if (saving) return;
    setDraft(previous => previous ? { ...previous, [key]: value } : previous);
    setMessage("");
  }

  function changeTranslation(key: string, value: string) {
    if (saving) return;
    setDraft(previous => previous ? {
      ...previous,
      translations: { ...translations(previous), [key]: value },
    } : previous);
    setMessage("");
  }

  async function play() {
    const source = text(draft?.audioUrl);
    if (!source) return;

    setError("");
    try {
      audioRef.current?.pause();
      const audio = new Audio(source);
      audioRef.current = audio;
      audio.onended = () => {
        if (audioRef.current === audio) setPlaying(false);
      };
      audio.onerror = () => {
        if (audioRef.current === audio) {
          setPlaying(false);
          setError("Ses kaydı oynatılamadı.");
        }
      };
      await audio.play();
      if (audioRef.current === audio) setPlaying(true);
    } catch {
      setPlaying(false);
      setError("Ses kaydı oynatılamadı.");
    }
  }


  async function saveLexeme() {
    if (!draft || !original || !dirty || saving) return;
    const submittedDraft = draft;
    const submittedOriginal = original;
    const submittedPatch = changedPatch(submittedOriginal, submittedDraft);
    const preview = JSON.stringify(submittedPatch, null, 2);
    if (!window.confirm(
      "Bu kaydın aşağıdaki değişiklikleri lexemes.json dosyasına yazılacak.\n" +
      "Diğer kayıtlara dokunulmaz; önce yedek alınır.\n\n" +
      submittedDraft.id + "\n\n" + preview
    )) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/curation/lexemes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: submittedDraft.id,
          expected: submittedOriginal,
          patch: submittedPatch,
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok) {
        throw new Error(
          isObject(result) && typeof result.error === "string"
            ? result.error : `Kayıt başarısız (${response.status}).`
        );
      }
      if (!isObject(result) || result.ok !== true ||
          !isObject(result.record) ||
          result.record.id !== submittedDraft.id) {
        throw new Error("Sunucudan geçerli kayıt doğrulaması alınamadı.");
      }
      const saved = result.record as Lexeme;
      setLexemes(previous => previous.map(row =>
        row.id === saved.id ? saved : row
      ));
      setDraft(saved);
      setMessage(
        "Kaydedildi. Yedek: " + text(result.backup) +
        " · SHA256: " + text(result.sha256)
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kayıt başarısız.");
    } finally {
      setSaving(false);
    }
  }

  function downloadDraft() {
    if (!draft || !dirty) return;
    const content = {
      kind: "lexeme-review-draft",
      serverWrite: false,
      exportedAt: new Date().toISOString(),
      updates: [{ id: draft.id, patch }],
    };
    const url = URL.createObjectURL(new Blob(
      [JSON.stringify(content, null, 2) + "\n"],
      { type: "application/json;charset=utf-8" },
    ));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `lexeme-taslak-${draft.id.replace(/[^a-zA-Z0-9_-]/g, "_")}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Taslak indirme başlatıldı. Sunucu verisi değiştirilmedi.");
  }

  const identifiers = [
    { key: "rootIds", label: "KÖK / ROOT", value: rootsText(draft) },
    { key: "wordFamilyId", label: "AİLE / FAMILY", value: text(draft?.wordFamilyId) },
    { key: "conceptId", label: "KAVRAM / CONCEPT", value: text(draft?.conceptId) },
    { key: dialectKey, label: "LEHÇE / DIALECT", value: text(draft?.[dialectKey]) },
  ];

  return (
    <main className="min-w-0 flex-1 bg-slate-100 p-4 text-slate-900">
      <div className="flex flex-col gap-4 lg:flex-row">
        <aside className="flex shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 lg:w-80">
          <h2 className="font-black">
            İNCELEME KUYRUĞU
            <span className="ml-2 text-sm text-violet-700">
              {filtered.length.toLocaleString("tr-TR")}
            </span>
          </h2>

          <input
            aria-label="İnceleme kuyruğunda ara"
            className={inputClass}
            style={{ borderColor: "#e2e8f0" }}
            value={query}
            onChange={event => { setQuery(event.target.value); setPage(1); }}
            placeholder="Kelime, anlam, kimlik ara..."
          />

          <div className="mt-3 max-h-96 space-y-2 overflow-y-auto lg:max-h-screen">
            {visible.map(record => (
              <button
                key={record.id}
                type="button"
                aria-pressed={selectedId === record.id}
                onClick={() => select(record)}
                className="w-full rounded-xl border p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
                style={{
                  border: selectedId === record.id
                    ? "2px solid #7c3aed" : "1px solid #e2e8f0",
                  background: selectedId === record.id ? "#f5f3ff" : "#fff",
                }}
              >
                <strong className="block">{text(record.form) || record.id}</strong>
                <span className="mt-1 block text-xs text-slate-600">
                  {text(translations(record).tr)}
                </span>
                <span className="mt-1 block font-mono text-xs text-slate-500">
                  {record.id}
                </span>
              </button>
            ))}
            {loading && <p role="status">Yükleniyor...</p>}
            {!loading && !visible.length && <p className="text-sm">Eşleşen kayıt yok.</p>}
          </div>

          {/* single-layout-fix-v1 */}
          {!loading && (
            <div className="mt-4 flex items-center justify-between gap-2">
              <button type="button" className={buttonClass}
                disabled={currentPage <= 1}
                onClick={() => setPage(Math.max(1, currentPage - 1))}>
                Önceki
              </button>
              <span className="text-xs">{currentPage} / {pages}</span>
              <button type="button" className={buttonClass}
                disabled={currentPage >= pages}
                onClick={() => setPage(Math.min(pages, currentPage + 1))}>
                Sonraki
              </button>
            </div>
          )}
        </aside>

        <section className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
          <h1 className="text-3xl font-black tracking-tight">
            Dil Kürasyonu
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Dil karşılıkları • Çerkesçe kelime / IPA • Kök, aile, kavram ve lehçe
          </p>
          <p className="mt-2 font-mono text-xs text-violet-700">
            {selectedId || "Kayıt seçilmedi"}
          </p>

          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}

          {draft && (
            <>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border-2 border-violet-400 bg-violet-50 p-4 md:col-span-2 xl:col-span-3">
                  <div className="flex items-center justify-between gap-2 font-black">
                    <label htmlFor="lexeme-form">🔊 ÇERKESÇE / IPA</label>
                    <span className="rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-800">SES</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input id="lexeme-form"
                      className={`${inputClass} mt-0 min-w-0 flex-1 border-violet-400`}
                      value={text(draft.form)}
                      onChange={event => change("form", event.target.value)}
                      placeholder="Çerkesçe kelime"
                    />
                    <button type="button"
                      aria-label="Kaynak ses kaydını dinle"
                      title={text(draft.audioUrl) ? "Kaynak ses kaydı" : "Ses kaydı bulunmuyor"}
                      disabled={!text(draft.audioUrl)}
                      onClick={() => void play()}
                      className="shrink-0 rounded-xl px-3 text-white disabled:opacity-40"
                      style={{ background: playing ? "#4c1d95" : "#6d5bdb" }}>🔊</button>
                  </div>
                  <label htmlFor="lexeme-ipa" className="mt-3 block text-xs font-semibold text-violet-800">IPA</label>
                  <input id="lexeme-ipa"
                    className={`${inputClass} mt-1 border-violet-400`}
                    value={text(draft.ipa)}
                    onChange={event => change("ipa", event.target.value)}
                    placeholder="IPA gösterimi"
                  />
                  <p className="mt-2 text-xs text-violet-800">
                    {text(draft.audioUrl) ? "✓ Kaynak ses kaydı mevcut" : "Ses kaydı yok; yapay telaffuz kullanılmaz"}
                  </p>
                </div>

                {languages.filter(language => language.key !== "ar").map(language => {
                  const key = language.key === "ady" ? adyKey : language.key;
                  return (
                    <div key={language.key} className="rounded-2xl border-2 p-4"
                      style={{ borderColor: language.border, background: language.background }}>
                      <div className="flex items-center justify-between gap-2 font-black">
                        <label htmlFor={`language-${language.key}`}>
                          {language.icon} {language.label}
                        </label>
                        <span className="rounded-full bg-white px-2 py-1 text-xs"
                          style={{ color: language.accent }}>{language.badge}</span>
                      </div>
                      <input
                        id={`language-${language.key}`}
                        className={inputClass}
                        style={{ borderColor: language.border }}
                        value={key ? text(values[key]) : ""}
                        disabled={!key}
                        onChange={event => { if (key) changeTranslation(key, event.target.value); }}
                        placeholder={key ? "Dil karşılığını yaz..." : "Veri anahtarı bağlı değil"}
                      />
                      <p className="mt-2 text-xs" style={{ color: language.accent }}>
                        {key ? `✓ Düzenlenebilir · ${key}` : "Ad / ady kaynağı doğrulanmalı"}
                      </p>
                    </div>
                  );
                })}

                <div className="rounded-2xl border-2 p-4"
                  style={{ borderColor: "#c4b5fd", background: languages[4].background }}>
                  <div className="flex items-center justify-between gap-2 font-black">
                    <label htmlFor="language-ar">🌙 ARAPÇA</label>
                    <span className="rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-900">RTL</span>
                  </div>
                  <input id="language-ar" dir="rtl"
                    className={`${inputClass} border-amber-400 text-right`}
                    value={text(values.ar)}
                    onChange={event => changeTranslation("ar", event.target.value)}
                    placeholder="اكتب النص العربي هنا..."
                  />
                  <p className="mt-2 text-xs text-amber-900">✓ Düzenlenebilir · RTL aktif</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {identifiers.map(field => (
                  <label key={field.key}
                    className="block rounded-2xl border-2 border-slate-500 bg-white p-4">
                    <span className="text-xs font-black text-slate-600">{field.label}</span>
                    <input className={`${inputClass} border-slate-300`}
                      value={field.value}
                      onChange={event => change(field.key, field.key === "rootIds"
                        ? [...new Set(event.target.value.split(/[,|;]/).map(value => value.trim()).filter(Boolean))]
                        : event.target.value)}
                    />
                    <span className="mt-2 block text-xs text-slate-600">✓ Taslakta düzenlenebilir</span>
                  </label>
                ))}
              </div>

              <label className="mt-3 block rounded-2xl border-2 border-slate-500 p-4">
                <span className="text-xs font-black text-slate-600">NOT — notes</span>
                <textarea className={`${inputClass} border-slate-300`}
                  rows={3}
                  value={text(draft.notes)}
                  onChange={event => change("notes", event.target.value)}
                  placeholder="Değişiklik gerekçesi..."
                />
              </label>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <span className={`text-sm font-semibold ${dirty ? "text-amber-800" : "text-slate-600"}`}>
                  {dirty ? "Kaydedilmemiş taslak var" : "Değişiklik yok"}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={buttonClass}
                    disabled={!dirty || saving}
                    onClick={() => {
                      if (original && window.confirm("Bu taslak değişiklikleri geri alınsın mı?")) {
                        setDraft(original);
                        setMessage("");
                      }
                    }}>Geri al</button>
                  <button type="button" disabled={!dirty}
                    onClick={downloadDraft}
                    className="rounded-xl bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:opacity-40">
                    Taslağı indir
                  </button>
                  <button type="button" disabled={!dirty || saving}
                    onClick={() => void saveLexeme()}
                    title="Seçili kaydın değişikliklerini yedek alarak kaydet."
                    className="rounded-xl bg-violet-700 px-4 py-2 font-bold text-white disabled:opacity-40">
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                Kaydet, seçili kaydı lexemes.json dosyasına yedek alarak yazar.
                İndirilen taslağın içe aktarma uyumluluğu doğrulanmadı.
                Kavram bağlantısı inceleme onayı değildir.
              </p>

              <details className="mt-5 rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer text-sm font-semibold">
                  Özgün kaydın tüm alanları — salt okunur
                </summary>
                <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-slate-50 p-3 text-xs">
                  {JSON.stringify(original, null, 2)}
                </pre>
              </details>
            </>
          )}
        </section>
      </div>
    </main>
  );
}