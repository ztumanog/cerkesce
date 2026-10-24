// Sprint 2A.1 - Lexeme Curation: Salt-okunur listeleme (temiz surum)
import Link from "next/link";
import { getAllLexemes } from "@/lib/curation/lexemeStore";

export const dynamic = "force-dynamic";

export default async function CurationPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; debt?: string }>;
}) {
  const { q = "", debt } = await searchParams;
  const all = getAllLexemes();

  const query = q.trim().toLowerCase();
  const filtered = all.filter((l) => {
    const matchesQuery =
      !query ||
      l.form.toLowerCase().includes(query) ||
      l.id.toLowerCase().includes(query);
    const matchesDebt = debt === "1" ? !!l.technicalDebt : true;
    return matchesQuery && matchesDebt;
  });

  const debtCount = all.filter((l) => l.technicalDebt).length;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">Lexeme Curation</h1>
      <p className="mt-1 text-sm text-gray-500">
        Toplam {all.length} lexeme - KAVRAM borcu: {debtCount}
      </p>

      <form className="mt-4 flex gap-2" action="/admin/curation">
        <input
          name="q"
          defaultValue={q}
          placeholder="Form veya ID ara... (orn. гуфӀэ)"
          className="flex-1 rounded border px-3 py-2"
        />
        <label className="flex items-center gap-1 rounded border px-3 text-sm">
          <input type="checkbox" name="debt" value="1"
            defaultChecked={debt === "1"} />
          Sadece borclu
        </label>
        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Ara
        </button>
      </form>

      <ul className="mt-4 divide-y rounded border">
        {filtered.slice(0, 100).map((l) => (
          <li key={l.id}>
            <Link
              href={`/admin/curation/${encodeURIComponent(l.id)}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <span className="font-medium" dir="auto">{l.form}</span>
              <span className="flex gap-2 text-xs text-gray-500">
                {l.technicalDebt && (
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-700">
                    KAVRAM borcu
                  </span>
                )}
                <span>{l.wordFamilyId}</span>
                <span>{l.id}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {filtered.length > 100 && (
        <p className="mt-2 text-sm text-gray-500">
          Ilk 100 kayit gosteriliyor - aramayla daraltin.
        </p>
      )}
    </main>
  );
}
