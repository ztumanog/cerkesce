"use client";

import { useEffect, useMemo, useState } from "react";

type Row = Record<string, unknown> & { id: string };
type Family = {
  id: string;
  members: Row[];
  roots: string[];
  concepts: string[];
  missing: string[];
};
type Status = "incelenmemis" | "bekliyor" | "onaylandi" | "reddedildi";
type Review = { status: Status; note: string };
type Filter = "tumu" | "eksik" | Status;

const statusNames: Record<Status, string> = {
  incelenmemis: "İncelenmemiş",
  bekliyor: "Onay bekleyen",
  onaylandi: "Onaylanan",
  reddedildi: "Reddedilen",
};
const filters: { key: Filter; label: string }[] = [
  { key: "tumu", label: "Tümü" },
  { key: "eksik", label: "Eksik alanlı" },
  { key: "incelenmemis", label: "İncelenmemiş" },
  { key: "bekliyor", label: "Onay bekleyen" },
  { key: "onaylandi", label: "Onaylanan" },
  { key: "reddedildi", label: "Reddedilen" },
];
const field = "mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900";
const action = "rounded-xl bg-violet-700 px-4 py-2 text-sm font-bold text-white";

function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}
function strings(value: unknown): string[] {
  if (typeof value === "string") return value.trim() ? [value] : [];
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string" && !!v.trim())
    : [];
}
function translation(row: Row, language: string): string {
  return object(row.translations) ? text(row.translations[language]) : "";
}
function familyIds(row: Row): string[] {
  return [...new Set([
    ...strings(row.wordFamilyId),
    ...strings(row.word_family_id),
    ...strings(row.familyId),
  ])];
}
function missingFields(row: Row): string[] {
  const result: string[] = [];
  if (!text(row.form).trim()) result.push("Çerkesçe yazım");
  if (!text(row.ipa).trim()) result.push("IPA");
  if (!translation(row, "tr").trim()) result.push("Türkçe karşılık");
  if (!text(row.conceptId).trim()) result.push("conceptId");
  if (!strings(row.rootIds).length) result.push("rootIds");
  return result;
}

export default function FamilyPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("tumu");
  const [selected, setSelected] = useState("");
  const [reviews, setReviews] = useState<Record<string, Review>>({});
  const [message, setMessage] = useState("");
    const [editing, setEditing] = useState<{
      original: Row; familyId: string; removeOnly: boolean;
    } | null>(null);


  // family-editor-auto-scroll-v1
  useEffect(() => {
    if (!editing) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById("family-member-editor")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [editing]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/data/linguistic/lexemes.json", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Kaynak okunamadı (${response.status}).`);
        const raw: unknown = await response.json();
        const list = Array.isArray(raw) ? raw : object(raw) ? raw.lexemes : undefined;
        if (!Array.isArray(list) || !list.length) {
          throw new Error("Lexeme kaynağı boş veya geçersiz.");
        }
        const ids = new Set<string>();
        for (const row of list) {
          if (!object(row) || typeof row.id !== "string" || !row.id || ids.has(row.id)) {
            throw new Error("Kaynakta geçersiz veya tekrarlanan lexeme kimliği var.");
          }
          ids.add(row.id);
        }
        if (!controller.signal.aborted) setRows(list as Row[]);
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : "Yükleme hatası.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  const families = useMemo(() => {
    const groups = new Map<string, Row[]>();
    for (const row of rows) {
      for (const id of familyIds(row)) {
        const members = groups.get(id) ?? [];
        members.push(row);
        groups.set(id, members);
      }
    }
    return [...groups.entries()].map(([id, members]): Family => ({
      id,
      members,
      roots: [...new Set(members.flatMap(row => strings(row.rootIds)))],
      concepts: [...new Set(members.flatMap(row => strings(row.conceptId)))],
      missing: [...new Set(members.flatMap(missingFields))],
    })).sort((a, b) => a.id.localeCompare(b.id));
  }, [rows]);

  const unlinked = rows.filter(row => !familyIds(row).length).length;
  const conflicts = rows.filter(row => familyIds(row).length > 1).length;
  const current = families.find(family => family.id === selected);
  const currentReview = reviews[selected] ?? { status: "incelenmemis", note: "" };

  function matches(family: Family, value: Filter): boolean {
    if (value === "tumu") return true;
    if (value === "eksik") return family.missing.length > 0;
    return (reviews[family.id]?.status ?? "incelenmemis") === value;
  }

  const visible = families.filter(family =>
    matches(family, filter) &&
    JSON.stringify([
      family.id, family.roots, family.concepts,
      family.members.map(row => [row.id, row.form, row.translations]),
    ]).toLocaleLowerCase("tr").includes(query.trim().toLocaleLowerCase("tr"))
  );

  useEffect(() => {
    if (!selected && families.length) setSelected(families[0].id);
  }, [families, selected]);

  const dirty = Object.keys(reviews).length > 0 || editing !== null;
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function changeReview(patch: Partial<Review>) {
    if (!current) return;
    setReviews(previous => ({
      ...previous,
      [current.id]: {
        ...(previous[current.id] ?? { status: "incelenmemis", note: "" }),
        ...patch,
      },
    }));
    setMessage("İnceleme taslağı değişti. Kaynak dosyaya yazılmadı.");
  }

  function download() {
    const entries = Object.entries(reviews).map(([id, review]) => {
      const family = families.find(item => item.id === id);
      return {
        familyId: id,
        ...review,
        observedLexemeIds: family?.members.map(row => row.id) ?? [],
        observedRootIds: family?.roots ?? [],
        observedConceptIds: family?.concepts ?? [],
      };
    });
    const payload = {
      kind: "family-curation-review-draft",
      serverWrite: false,
      source: "lexemes.json",
      createdAt: new Date().toISOString(),
      note: "Durumlar ekran inceleme kararlarıdır; kanonik aile onayı değildir.",
      entries,
    };
    const url = URL.createObjectURL(new Blob(
      [JSON.stringify(payload, null, 2)],
      { type: "application/json;charset=utf-8" },
    ));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "aile-inceleme-taslagi.json";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Taslak indirme başlatıldı. Kaynak dosyalar değiştirilmedi.");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <h1 className="text-3xl font-black">Aile Kürasyonu</h1>
      <p className="mt-2 text-sm text-slate-600">
        Gerçek lexeme bağlantıları • İnceleme kuyruğu • Uydurma aile veya kök yok
      </p>

      <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
        Aileler lexeme bağlantılarından gruplanır; kanonik aile kayıtları bu sayfaya bağlı değildir.
        Onay durumları bu oturumun inceleme taslağıdır; mevcut dosya onayı olarak gösterilmez.
        Yenilemeden önce taslağı indir.
      </div>
      {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-red-800">{error}</p>}
      {message && <p role="status" className="mt-3 rounded-xl bg-green-50 p-3 text-green-800">{message}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map(item => (
          <button key={item.key} type="button" onClick={() => setFilter(item.key)}
            aria-pressed={filter === item.key}
            className={`rounded-xl border-2 px-3 py-2 text-sm font-bold ${
              filter === item.key ? "border-violet-600 bg-violet-100" : "border-slate-200 bg-white"
            }`}>
            {item.label} · {families.filter(family => matches(family, item.key)).length}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-600">
        “Eksik alanlı”: bağlı kelimelerden en az birinde yazım, IPA, Türkçe,
        conceptId veya rootIds boş. Eksik alan, kaydın yanlış olduğunu kanıtlamaz.
        Aile bağlantısı olmayan kelime: {unlinked} · Farklı aile alanları çelişen kelime: {conflicts}
      </p>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row">
        <aside className="rounded-2xl border bg-white p-4 lg:w-80 lg:shrink-0">
          <h2 className="font-black">AİLE KUYRUĞU · {visible.length}/{families.length}</h2>
          <input aria-label="Aile veya bağlı kelime ara" className={field}
            value={query} onChange={event => setQuery(event.target.value)}
            placeholder="Aile, kök, kavram veya kelime ara…" />
          <div className="mt-3 max-h-screen space-y-2 overflow-auto">
            {visible.map(family => (
              <button key={family.id} type="button" onClick={() => {
                  if (editing && !window.confirm("Açık kelime taslağı bırakılsın mı?")) return;
                  setEditing(null);
                  setSelected(family.id);
                }}
                aria-pressed={selected === family.id}
                className={`w-full rounded-xl border-2 p-3 text-left ${
                  selected === family.id ? "border-blue-500 bg-blue-50" : "border-slate-200"
                }`}>
                <strong className="block break-all">{family.id}</strong>
                <span className="mt-1 block text-xs">
                  {family.members.length} kelime · {family.concepts.length} benzersiz conceptId
                </span>
                <span className="block text-xs text-violet-800">
                  Taslak: {statusNames[reviews[family.id]?.status ?? "incelenmemis"]}
                </span>
                {!!family.missing.length &&
                  <span className="block text-xs text-amber-800">Eksik alan içeren kelimeler var</span>}
              </button>
            ))}
            {loading && <p role="status">Yükleniyor…</p>}
            {!loading && !visible.length && <p>Bu filtrede aile bulunamadı.</p>}
          </div>
        </aside>

        <section className="min-w-0 flex-1 rounded-2xl border bg-white p-5">
          {current ? (
            <>
              <h2 className="break-all text-2xl font-black">{current.id}</h2>
              {!visible.some(family => family.id === current.id) &&
                <p className="mt-2 text-sm text-amber-800">
                  Seçili aile mevcut filtre dışında; başka bir aile seçene kadar açık tutuluyor.
                </p>}

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border-2 border-green-400 bg-green-50 p-4">
                  <h3 className="font-black">🌱 KAYNAKTAKİ KÖK BAĞLANTILARI</h3>
                  <p className="mt-2 break-all">{current.roots.join(", ") || "rootIds bağlantısı yok"}</p>
                  <p className="mt-2 text-xs">Lexemelerden gözlenen kimlikler; kök varlığı ayrıca doğrulanmalı.</p>
                </div>
                <div className="rounded-2xl border-2 border-blue-400 bg-blue-50 p-4">
                  <h3 className="font-black">👨‍👩‍👧‍👦 AİLE KİMLİĞİ</h3>
                  <p className="mt-2 break-all">{current.id}</p>
                  <p className="mt-2 text-xs">Salt okunur. Kimlik, aile adı veya çeviri değildir.</p>
                </div>
                <div className="rounded-2xl border-2 border-slate-300 p-4">
                  <h3 className="font-black">📊 GERÇEK SAYILAR</h3>
                  <p className="mt-2">{current.members.length} bağlı kelime</p>
                  <p>{current.concepts.length} benzersiz conceptId değeri</p>
                  <p className="mt-2 text-xs">Değerlerin geçerliliği ve eşdeğerliği ayrıca incelenmeli.</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border-2 border-violet-400 bg-violet-50 p-4">
                <h3 className="font-black">İNCELEME KARARI — EKRAN TASLAĞI</h3>
                <label className="mt-3 block text-sm font-bold">
                  Durum
                  <select className={field} value={currentReview.status}
                    onChange={event => changeReview({ status: event.target.value as Status })}>
                    {Object.entries(statusNames).map(([value, label]) =>
                      <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <p className="mt-2 text-xs text-violet-800">
                  İncelenmemiş: karar yok. Onay bekleyen: başka inceleme gerekli.
                  Onaylanan: senin inceleme kararın. Reddedilen: bağlantı veya grup için itiraz.
                  Hiçbiri kaynak bağlantılarını otomatik değiştirmez.
                </p>
                <label className="mt-3 block text-sm font-bold">
                  İnceleme notu / kanıt
                  <textarea className={field} rows={3} value={currentReview.note}
                    onChange={event => changeReview({ note: event.target.value })}
                    placeholder="Hangi kayıt, hangi sorun? Kaynak veya gerekçe belirt…" />
                </label>
                <button type="button" className="mt-3 text-sm underline"
                  onClick={() => setReviews(previous => {
                    const next = { ...previous };
                    delete next[current.id];
                    return next;
                  })}>
                  Bu ailenin taslak kararını geri al
                </button>
              </div>

              {editing && (
                  <FamilyMemberEditor
                    key={editing.original.id + ":" + editing.removeOnly}
                    original={editing.original}
                    familyId={editing.familyId}
                    removeOnly={editing.removeOnly}
                    onClose={() => setEditing(null)}
                    onSaved={(saved, notice) => {
                      setRows(previous => previous.map(row =>
                        row.id === saved.id ? saved : row
                      ));
                      // Grup üyeleri değişince önceki taslak onayı güncel sayılmaz.
                      setReviews(previous => {
                        const next = { ...previous };
                        for (const id of new Set([
                          ...familyIds(editing.original), ...familyIds(saved),
                        ])) {
                          if (next[id]) {
                            next[id] = {
                              ...next[id],
                              status: "bekliyor",
                              note: next[id].note +
                                "\nGrup üyeliği/kelime bilgisi değişti; yeniden incele: " + saved.id,
                            };
                          }
                        }
                        return next;
                      });
                      setMessage(notice);
                      setEditing(null);
                    }}
                  />
                )}
                <h3 className="mt-5 text-xl font-black">🏔️ BAĞLI ÇERKESÇE KELİMELER / IPA</h3>
              <div className="mt-3 space-y-4">
                {current.members.map(row => (
                  <article key={row.id} className="rounded-2xl border-2 border-violet-200 p-4">
                    <strong className="block text-2xl text-violet-950">{text(row.form) || "Yazım boş"}</strong>
                    <p className="mt-1 text-violet-800">{text(row.ipa) || "IPA boş"}</p>
                    <p className="mt-2 break-all font-mono text-xs">{row.id}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="button" className={action}
                        onClick={() => {
                          if (editing && !window.confirm("Açık kelime taslağı bırakılsın mı?")) return;
                          setEditing({ original: row, familyId: current.id, removeOnly: false });
                        }}>
                        Bilgileri düzenle
                      </button>
                      <button type="button"
                        className="rounded-xl border border-red-400 bg-red-50 px-4 py-2 text-sm font-bold text-red-800"
                        onClick={() => {
                          if (editing && !window.confirm("Açık kelime taslağı bırakılsın mı?")) return;
                          setEditing({ original: row, familyId: current.id, removeOnly: true });
                        }}>
                        Bu aileden çıkar
                      </button>
                    </div>
                    <p className="mt-2 break-all text-sm">
                      conceptId: {JSON.stringify(row.conceptId) ?? "yok"}
                      {" · "}rootIds: {JSON.stringify(row.rootIds) ?? "yok"}
                    </p>
                    {familyIds(row).length > 1 &&
                      <p className="mt-2 text-sm text-red-800">
                        Çelişen aile alanları: {familyIds(row).join(", ")}
                      </p>}
                    {row.conceptIdGecersiz === true &&
                      <p className="mt-2 text-sm text-red-800">Kavram bağlantısı kaynakta geçersiz işaretli.</p>}
                    {!!missingFields(row).length &&
                      <p className="mt-2 text-sm text-amber-800">Boş: {missingFields(row).join(", ")}</p>}
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      {[
                        { key: "tr", label: "🇹🇷 TÜRKÇE", color: "border-sky-400 bg-blue-50" },
                        { key: "en", label: "🇬🇧 İNGİLİZCE", color: "border-green-400 bg-green-50" },
                        { key: "ru", label: "🇷🇺 RUSÇA", color: "border-red-400 bg-red-50" },
                        { key: "kbd", label: "🏔️ KABARDEY — kbd", color: "border-teal-400 bg-teal-50" },
                        { key: "ady", label: "ADY ADIGECE -ady", color: "border-violet-400 bg-violet-50" },
                        { key: "ar", label: "🌙 ARAPÇA", color: "border-amber-400 bg-amber-50" },
                      ].map(language => (
                        <div key={language.key} className={`rounded-xl border-2 p-3 ${language.color}`}>
                          <h4 className="text-xs font-black">{language.label}</h4>
                          <p className="mt-2 break-words" dir={language.key === "ar" ? "rtl" : "ltr"}>
                            {translation(row, language.key) || "Kaynakta metin karşılığı yok"}
                          </p>
                        </div>
                      ))}
                    </div>
                    <details className="mt-3 text-sm">
                      <summary className="cursor-pointer">Özgün kaydın tüm alanları</summary>
                      <pre className="mt-2 overflow-auto whitespace-pre-wrap break-all text-xs">
                        {JSON.stringify(row, null, 2)}
                      </pre>
                    </details>
                  </article>
                ))}
              </div>
            </>
          ) : <p>{loading ? "Kaynak yükleniyor…" : "İncelemek için bir aile seç."}</p>}
        </section>
      </div>

      <footer className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4">
        <button type="button" className={action} onClick={download}>İnceleme taslağını indir</button>
        <span className="text-sm text-slate-600">
          {Object.keys(reviews).length} aile için taslak karar · Kaynak dosyalara yazılmaz
        </span>
      </footer>
    </main>
  );
}

// family-member-editor-v1
function FamilyMemberEditor({
  original, familyId, removeOnly, onSaved, onClose,
}: {
  original: Row;
  familyId: string;
  removeOnly: boolean;
  onSaved: (row: Row, message: string) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Row>({ ...original });
  const [roots, setRoots] = useState(strings(original.rootIds).join("\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(key: string, value: string) {
    if (saving) return;
    setDraft(previous => key === "tr"
      ? {
          ...previous,
          translations: {
            ...(object(previous.translations) ? previous.translations : {}),
            tr: value,
          },
        }
      : { ...previous, [key]: value });
  }

  // Önceki PATCH API yalnız kanonik wordFamilyId alanını yazabilir.
  // Eski alias alanlarına sessizce müdahale edilmez.
  const aliasLinks = [
    ...strings(original.word_family_id),
    ...strings(original.familyId),
  ];
  const removalBlocked =
    aliasLinks.includes(familyId) ||
    original.wordFamilyId !== familyId;

  async function commit() {
    if (saving) return;
    const patch: Record<string, unknown> = {};
    if (removeOnly) {
      if (removalBlocked) {
        setError(
          "Bu aile bağlantısı eski familyId/word_family_id alanında veya " +
          "kanonik olmayan biçimde tutuluyor. Mevcut API bu alanları yazamaz; " +
          "bağlantı değiştirilmedi."
        );
        return;
      }
      // API metin bekler. Boş metin, aile listesindeki bağlantıyı kaldırır.
      patch.wordFamilyId = "";
    } else {
      for (const key of ["form", "ipa", "translations", "conceptId", "wordFamilyId"]) {
        if (JSON.stringify(original[key]) !== JSON.stringify(draft[key])) {
          patch[key] = draft[key];
        }
      }
      const nextRoots = roots.split(/\r?\n/)
        .map(value => value.trim()).filter(Boolean);
      if (JSON.stringify(nextRoots) !== JSON.stringify(strings(original.rootIds))) {
        patch.rootIds = nextRoots;
      }
    }
    if (!Object.keys(patch).length) {
      setError("Kaydedilecek değişiklik yok.");
      return;
    }
    if (!window.confirm(
      (removeOnly
        ? "Kelime sözlükten silinmeyecek. Yalnız bu aile bağlantısı kaldırılacak."
        : "Yalnız bu kelimenin gösterilen alanları değiştirilecek.") +
      "\nÖnce yedek alınacak.\n\n" + original.id + "\n\n" +
      JSON.stringify(patch, null, 2)
    )) return;

    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/curation/lexemes", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: original.id,
          expected: original,
          patch,
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok) {
        throw new Error(object(result) && typeof result.error === "string"
          ? result.error : `Kayıt başarısız (${response.status}).`);
      }
      if (!object(result) || result.ok !== true ||
          !object(result.record) || result.record.id !== original.id) {
        throw new Error("Geçerli kayıt doğrulaması alınamadı.");
      }
      onSaved(
        result.record as Row,
        (removeOnly ? "Aile bağlantısı kaldırıldı." : "Kelime kaydedildi.") +
        " Yedek: " + text(result.backup) + " · SHA256: " + text(result.sha256),
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kayıt hatası.");
    } finally {
      setSaving(false);
    }
  }

  const rootList = roots.split(/\r?\n/)
    .map(value => value.trim()).filter(Boolean);
  const duplicateRoots = rootList.length !== new Set(rootList).size;

  return (
    <section id="family-member-editor" className="mt-4 rounded-2xl border-2 border-blue-500 bg-blue-50 p-4">
      <h3 className="text-xl font-black">
        {removeOnly ? "Bu aileden çıkar" : "Kelime bilgilerini düzenle"}
      </h3>
      <p className="mt-2 break-all font-mono text-xs">
        {original.id} · Aile: {familyId}
      </p>
      {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-red-800">{error}</p>}

      <fieldset disabled={saving} className="mt-3 min-w-0">
        {removeOnly ? (
          <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
            <p>Kelime, çeviriler, IPA, kök ve kavram bağlantıları korunur.
              Sadece seçili aileye ait wordFamilyId bağlantısı boşaltılır.</p>
            {removalBlocked && <p className="mt-2 font-bold">
              Bu kayıtta eski/kanonik olmayan aile bağlantısı var.
              Mevcut API ile çıkarma yapılamaz; sahte başarı gösterilmez.
            </p>}
          </div>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm font-bold">
                🏔️ Çerkesçe yazım
                <input className={field} value={text(draft.form)}
                  onChange={event => update("form", event.target.value)} />
                <span className="mt-1 block text-xs font-normal">Kaynağa uygun yazımı ve özel harfleri koru.</span>
              </label>
              <label className="text-sm font-bold">
                IPA
                <input className={field} value={text(draft.ipa)}
                  onChange={event => update("ipa", event.target.value)} />
                <span className="mt-1 block text-xs font-normal">Yalnız doğrulanmış fonetik gösterim.</span>
              </label>
              <label className="text-sm font-bold">
                🇹🇷 Türkçe kelime karşılığı
                <input className={field} value={translation(draft, "tr")}
                  onChange={event => update("tr", event.target.value)} />
                <span className="mt-1 block text-xs font-normal">Kelimenin anlamı; aile adı veya kayıt kimliği değil.</span>
              </label>
              <div>
                <label className="text-sm font-bold">
                  Kavram bağlantısı — conceptId
                  <input className={field} value={text(draft.conceptId)}
                    onChange={event => update("conceptId", event.target.value)} />
                </label>
                <button type="button" className="mt-2 text-sm underline"
                  onClick={() => setDraft(previous => ({ ...previous, conceptId: null }))}>
                  Kavram bağlantısını null yap
                </button>
                <p className="mt-1 text-xs">Bilinmiyorsa kavram uydurma.
                  Taslak değer: {JSON.stringify(draft.conceptId) ?? "alan yok"}</p>
              </div>
              <label className="text-sm font-bold">
                Kök bağlantıları — her satıra bir kimlik
                <textarea className={field} rows={3} value={roots}
                  onChange={event => setRoots(event.target.value)} />
                <span className="mt-1 block text-xs font-normal">
                  Örnek biçim: R-1E. Bu örnek kökün doğruluğunu kanıtlamaz.
                  Boş bırakırsan tüm rootIds bağlantıları kaldırılır.
                </span>
                {duplicateRoots && <span className="mt-2 block text-xs text-amber-800">
                  Tekrarlanan kök kimliği var. Doğruysa tekrarını elle kaldır;
                  otomatik temizleme yapılmaz.
                </span>}
              </label>
              <label className="text-sm font-bold">
                Kanonik aile bağlantısı — wordFamilyId
                <input className={field} value={text(draft.wordFamilyId)}
                  onChange={event => update("wordFamilyId", event.target.value)} />
                <span className="mt-1 block text-xs font-normal">
                  Doğrulanmış aile kimliğini gir. Boş metin bu alanın bağlantısını kaldırır.
                  Diğer aile alanları otomatik değiştirilmez.
                </span>
              </label>
            </div>
            {!!aliasLinks.length && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
              Eski aile alanları da mevcut: {aliasLinks.join(", ")}.
              wordFamilyId değişse bile bu eski bağlantılar korunur.
            </p>}
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer">Özgün kayıt</summary>
              <pre className="mt-2 overflow-auto whitespace-pre-wrap break-all text-xs">
                {JSON.stringify(original, null, 2)}
              </pre>
            </details>
          </>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button"
            className={action + " disabled:opacity-40"}
            disabled={saving || (removeOnly && removalBlocked)}
            onClick={() => void commit()}>
            {saving ? "Kaydediliyor…" : removeOnly ? "Aileden çıkarmayı onayla" : "Değişiklikleri kaydet"}
          </button>
          <button type="button" disabled={saving} className="text-sm underline" onClick={onClose}>
            Vazgeç
          </button>
        </div>
      </fieldset>
    </section>
  );
}
