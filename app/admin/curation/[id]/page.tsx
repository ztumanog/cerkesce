// Sprint 2A.2 + 2A.3 - Lexeme Detay (Tam Alan EditForm ile)
import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLexemeById, getRawLexeme, getAllLexemes } from "@/lib/curation/lexemeStore";
import EditForm, { type LexemeEditInitial } from "./EditForm";
import FamilyList from "./FamilyList";

export const dynamic = "force-dynamic";

function toStr(val: unknown): string {
  if (Array.isArray(val)) return val.map((v) => String(v ?? "").trim()).filter(Boolean).join(", ");
  return typeof val === "string" ? val : val != null ? String(val) : "";
}

function resolveRootFormFromRoots(rootId: string): string {
  if (!rootId) return "";
  try {
    const p = path.join(process.cwd(), "public", "data", "linguistic", "roots.json");
    const raw = fs.readFileSync(p, "utf-8").replace(/^\uFEFF/, "");
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return "";
    const match = list.find((r: any) => r?.id === rootId);
    return typeof match?.form === "string" ? match.form : "";
  } catch {
    return "";
  }
}

export default async function LexemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const lexeme = getLexemeById(decoded);
  if (!lexeme) notFound();

  const raw: Record<string, any> = getRawLexeme(decoded) ?? (lexeme as Record<string, any>);
  const wfId = lexeme.wordFamilyId ?? raw.wordFamilyId ?? "";
  const members = wfId
    ? getAllLexemes()
        .filter((l) => l.wordFamilyId === wfId)
        .map((l) => ({ id: l.id, form: l.form, conceptId: l.conceptId }))
        .sort((a, b) => a.form.localeCompare(b.form, "tr"))
    : [];

  const translationsObj = raw.translations && typeof raw.translations === "object" ? raw.translations : {};
  const dialectVariantsObj = raw.dialectVariants && typeof raw.dialectVariants === "object" ? raw.dialectVariants : {};
  const derivationObj = raw.derivation && typeof raw.derivation === "object" ? raw.derivation : {};

  const initial: LexemeEditInitial = {
    form: toStr(raw.form ?? lexeme.form),
    ipa: toStr(raw.ipa ?? lexeme.ipa),
    dialect: toStr(raw.dialect ?? lexeme.dialect),
    partOfSpeech: toStr(raw.partOfSpeech ?? lexeme.partOfSpeech ?? raw.pos),
    status: toStr(raw.status),
    etymologyType: toStr(raw.etymologyType),
    isLemma: Boolean(raw.isLemma),
    corpusFrequency: raw.corpusFrequency != null ? String(raw.corpusFrequency) : "",
    meaning: toStr(raw.meaning),
    literalMeaning: toStr(raw.literalMeaning),
    translations: {
      tr: toStr(translationsObj.tr ?? raw.tr),
      en: toStr(translationsObj.en ?? raw.en),
      ru: toStr(translationsObj.ru),
      ar: toStr(translationsObj.ar),
    },
    senses: Array.isArray(raw.senses) ? raw.senses : [],
    examples: Array.isArray(raw.examples) ? raw.examples : [],
    wordFamilyId: toStr(raw.wordFamilyId ?? lexeme.wordFamilyId),
    conceptId: toStr(raw.conceptId ?? lexeme.conceptId),
    rootIds: Array.isArray(raw.rootIds)
      ? raw.rootIds.join(", ")
      : Array.isArray(lexeme.rootIds)
        ? lexeme.rootIds.join(", ")
        : toStr(raw.rootId),
    root: toStr(raw.root ?? raw.rootForm),
    resolvedRootForm: resolveRootFormFromRoots(
      toStr(raw.rootId) || (Array.isArray(raw.rootIds) ? toStr(raw.rootIds[0]) : lexeme.rootIds?.[0] ?? "")
    ),
    dialectVariants: {
      ...dialectVariantsObj,
      adyghe: toStr(dialectVariantsObj.adyghe),
      kabardian: toStr(dialectVariantsObj.kabardian),
    },
    derivation: {
      ...derivationObj,
      rule: toStr(derivationObj.rule),
      rootIds: Array.isArray(derivationObj.rootIds) ? derivationObj.rootIds.join(", ") : toStr(derivationObj.rootIds),
      morphemeIds: Array.isArray(derivationObj.morphemeIds)
        ? derivationObj.morphemeIds.join(", ")
        : toStr(derivationObj.morphemeIds),
    },
    notes: toStr(raw.notes ?? raw.note),
    dialectNote: toStr(raw.dialectNote),
    etymology: toStr(raw.etymology),
    source: toStr(raw.source),
    sources: Array.isArray(raw.sources) ? raw.sources.map((s: any) => String(s)) : [],
    audioUrl: toStr(raw.audioUrl),
    scientificName: toStr(raw.scientificName),
    tags: Array.isArray(raw.tags) ? raw.tags.join(", ") : toStr(raw.tags),
    rawRecord: raw,
  };

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link href="/admin/curation" className="text-sm text-blue-600 hover:underline">
        ← Listeye dön
      </Link>

      {/* 1 — Kimlik */}
      <section className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold" dir="auto">{initial.form}</h1>
            {initial.ipa && <p className="mt-1 text-gray-600" dir="auto">/{initial.ipa}/</p>}
          </div>
          {initial.status && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              {initial.status}
            </span>
          )}
        </div>
        {initial.meaning && (
          <p className="mt-2 text-sm text-gray-700">
            <span className="font-semibold text-gray-500">Anlam:</span> {initial.meaning}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded bg-gray-100 px-2 py-1 font-mono">{lexeme.id}</span>
          {initial.dialect && <span className="rounded bg-purple-50 px-2 py-1 text-purple-700">{initial.dialect}</span>}
          <span className="rounded bg-gray-100 px-2 py-1">Aile: {wfId || "—"}</span>
          {initial.conceptId && (
            <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
              Kavram: {initial.conceptId}
            </span>
          )}
          {initial.partOfSpeech && (
            <span className="rounded bg-gray-100 px-2 py-1">{initial.partOfSpeech}</span>
          )}
          {initial.etymologyType && (
            <span className="rounded bg-amber-50 px-2 py-1 text-amber-800">{initial.etymologyType}</span>
          )}
          {lexeme.rootIds?.length > 0 && (
            <span className="rounded bg-gray-100 px-2 py-1">
              Kök: {lexeme.rootIds.join(", ")}
            </span>
          )}
        </div>
      </section>

      {/* 2 — Düzenle (Tam Alanlar) */}
      <section className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
        <EditForm lexemeId={lexeme.id} initial={initial} />
      </section>

      {/* 3 — Aile */}
      <section className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-700">
          Aile: {wfId || "—"} <span className="text-gray-400">({members.length} üye)</span>
        </h2>
        <div className="mt-3">
          <FamilyList members={members} currentId={lexeme.id} familyId={wfId} />
        </div>
      </section>
    </main>
  );
}
