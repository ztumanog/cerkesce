// Sprint 2A.2 + 2A.3 - Lexeme Detay (EditForm ile) — düzenli sürüm
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLexemeById, getRawLexeme, getAllLexemes } from "@/lib/curation/lexemeStore";
import EditForm from "./EditForm";
import FamilyList from "./FamilyList";

export const dynamic = "force-dynamic";

export default async function LexemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const lexeme = getLexemeById(decoded);
  if (!lexeme) notFound();

  const raw = getRawLexeme(decoded);
  const wfId = lexeme.wordFamilyId ?? "";
  const members = getAllLexemes()
    .filter((l) => l.wordFamilyId === wfId)
    .map((l) => ({ id: l.id, form: l.form, conceptId: l.conceptId }))
    .sort((a, b) => a.form.localeCompare(b.form, "tr"));

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/admin/curation" className="text-sm text-blue-600 hover:underline">
        ← Listeye dön
      </Link>

      {/* 1 — Kimlik */}
      <section className="mt-4 rounded border p-4">
        <h1 className="text-3xl font-bold" dir="auto">{lexeme.form}</h1>
        {lexeme.ipa && <p className="mt-1 text-gray-600" dir="auto">/{lexeme.ipa}/</p>}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded bg-gray-100 px-2 py-1">{lexeme.id}</span>
          <span className="rounded bg-gray-100 px-2 py-1">Aile: {wfId}</span>
          {lexeme.conceptId && (
            <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
              Kavram: {lexeme.conceptId}
            </span>
          )}
          {lexeme.partOfSpeech && (
            <span className="rounded bg-gray-100 px-2 py-1">{lexeme.partOfSpeech}</span>
          )}
          {lexeme.rootIds?.length > 0 && (
            <span className="rounded bg-gray-100 px-2 py-1">
              Kök: {lexeme.rootIds.join(", ")}
            </span>
          )}
        </div>
      </section>

      {/* 2 — Düzenle */}
      <section className="mt-4 rounded border p-4">
        <h2 className="mb-3 text-sm font-medium text-gray-700">Düzenle</h2>
        <EditForm
          lexemeId={lexeme.id}
          initial={{
            wordFamilyId: lexeme.wordFamilyId ?? "",
            ipa: lexeme.ipa ?? "",
            partOfSpeech: lexeme.partOfSpeech ?? "",
            conceptId: lexeme.conceptId ?? "",
            rootIds: lexeme.rootIds ? lexeme.rootIds.join(", ") : "",
            notes: raw?.notes ?? "",
          }}
        />
      </section>

      {/* 3 — Aile */}
      <section className="mt-4 rounded border p-4">
        <h2 className="text-sm font-medium text-gray-700">
          Aile: {wfId} <span className="text-gray-400">({members.length} üye)</span>
        </h2>
        <div className="mt-3">
          <FamilyList members={members} currentId={lexeme.id} familyId={wfId} />
        </div>
      </section>
    </main>
  );
}