# ===== Sprint 2A.3 - page.tsx guncelle =====
$page = @'
// Sprint 2A.2 + 2A.3 - Lexeme Detay (EditForm ile)
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLexemeById, getRawLexeme } from "@/lib/curation/lexemeStore";
import EditForm from "./EditForm";

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
  const wf = raw?.wordFamily;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/admin/curation" className="text-sm text-blue-600 hover:underline">
        ← Listeye dön
      </Link>
      <h1 className="mt-2 text-2xl font-bold" dir="auto">{lexeme.form}</h1>
      <p className="text-sm text-gray-500">{lexeme.id} · {lexeme.wordFamilyId}</p>

      <div className="mt-4 rounded border bg-gray-50 p-3">
        <label className="block text-sm font-medium text-gray-700">Form (kilitli)</label>
        <input value={lexeme.form} readOnly disabled dir="auto"
          className="mt-1 w-full rounded border bg-gray-100 px-3 py-2 text-gray-500" />
      </div>

      <EditForm lexemeId={lexeme.id} initial={{
        ipa: lexeme.ipa ?? "",
        partOfSpeech: lexeme.partOfSpeech ?? "",
        conceptId: lexeme.conceptId ?? "",
        rootIds: lexeme.rootIds.join(", "),
        notes: raw?.notes ?? "",
      }} />

      <fieldset className="mt-6 rounded border p-4">
        <legend className="text-sm font-medium text-gray-700">
          Word Family: {wf?.id ?? lexeme.wordFamilyId} (salt-okunur)
        </legend>
        <ul className="mt-2 space-y-1 text-sm">
          {wf?.lexemeIds?.map((lid: string) => (
            <li key={lid}>
              <Link href={`/admin/curation/${encodeURIComponent(lid)}`}
                className="text-blue-600 hover:underline">{lid}</Link>
              {lid === lexeme.id && <span className="ml-2 text-gray-400">(bu kayıt)</span>}
            </li>
          ))}
        </ul>
      </fieldset>
    </main>
  );
}
'@
Set-Content -LiteralPath "E:\projeler\Cerkesce\app\admin\curation\[id]\page.tsx" -Value $page -Encoding UTF8
Write-Host "page.tsx guncellendi"
