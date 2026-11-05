import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const LIMIT = 200;
const BASE = path.join(process.cwd(), "public", "data", "linguistic");

type RootRaw = { id: string } & Record<string, unknown>;
type LexRaw = { id: string; rootIds?: string[] };

function readJson(file: string): unknown {
  const text = fs.readFileSync(path.join(BASE, file), "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(text);
}

function asArray<T>(raw: unknown, key: string): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object") {
    const v = (raw as Record<string, unknown>)[key];
    if (Array.isArray(v)) return v as T[];
  }
  return [];
}

export default async function RootsPage(props: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const sp = await props.searchParams;
  const q = (sp?.q ?? "").trim().toLowerCase();

  const roots = asArray<RootRaw>(readJson("roots.json"), "roots");
  const lexemes = asArray<LexRaw>(readJson("lexemes.json"), "lexemes");

  // Lexeme sayısı lexeme.rootIds'ten türetilir (root.lexemeIds deprecated, kullanılmaz)
  const counts = new Map<string, number>();
  for (const l of lexemes) {
    for (const rid of l.rootIds ?? []) {
      counts.set(rid, (counts.get(rid) ?? 0) + 1);
    }
  }

  const rows = roots.map((r) => {
    const label = String(r.form ?? r.label ?? r.gloss ?? "");
    return { id: String(r.id), label, count: counts.get(String(r.id)) ?? 0 };
  });

  const filtered = q
    ? rows.filter((r) => r.id.toLowerCase().includes(q) || r.label.toLowerCase().includes(q))
    : rows;
  const shown = filtered.slice(0, LIMIT);
  const orphan = rows.filter((r) => r.count === 0).length;

  return (
    <div className="p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Kök Kürasyonu</h1>
        <p className="text-sm text-slate-500">
          {roots.length} kök · {orphan} lexemesiz kök · Salt okunur ekran
        </p>
      </header>

      <form method="get" className="mb-4">
        <input
          name="q"
          defaultValue={sp?.q ?? ""}
          placeholder="Kök ID veya anlam ara..."
          className="w-full max-w-md rounded-xl border px-3 py-2 text-sm"
        />
      </form>

      <p className="mb-2 text-xs text-slate-500">
        {filtered.length} sonuç{filtered.length > LIMIT ? `, ilk ${LIMIT} gösteriliyor` : ""}
      </p>

      <div className="overflow-auto rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2">Kök ID</th>
              <th className="px-4 py-2">Anlam</th>
              <th className="px-4 py-2 text-right">Lexeme sayısı</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2 font-mono">{r.id}</td>
                <td className="px-4 py-2">{r.label || "—"}</td>
                <td className={`px-4 py-2 text-right font-mono ${r.count === 0 ? "text-red-600" : ""}`}>
                  {r.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
