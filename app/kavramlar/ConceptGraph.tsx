"use client";
import { useMemo, useState } from "react";

type Lex = { id: string; form: string; rootIds?: string[]; conceptId?: string; translations?: Record<string, string> };

function polar(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export default function ConceptGraph({
  conceptId,
  lemma,
  lexemes,
}: {
  conceptId: string;
  lemma: string;
  lexemes: Lex[];
}) {
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);

  const roots = useMemo(() => {
    const map = new Map<string, Lex[]>();
    for (const l of lexemes) {
      const r = (l.rootIds ?? [])[0] ?? "KÖKSÜZ";
      if (!map.has(r)) map.set(r, []);
      map.get(r)!.push(l);
    }
    return [...map.entries()]
      .map(([root, items]) => ({ root, items }))
      .sort((a, b) => b.items.length - a.items.length);
  }, [lexemes]);

  const CX = 400, CY = 300, R_ROOT = 170;
  const selected = roots.find((r) => r.root === selectedRoot) ?? null;
  // Secili kok yoksa ilk koku secili goster ki grafik bos kalmasin
  const active = selected ?? roots[0] ?? null;
  const activeItems = (active?.items ?? []).slice(0, 12);

  // Kok dugum konumlari — daire uzerinde
  const rootPos = roots.slice(0, 10).map((_, i) => {
    const angle = (i / Math.max(roots.slice(0, 10).length, 1)) * Math.PI * 2 - Math.PI / 2;
    return polar(CX, CY, R_ROOT, angle);
  });

  // Secili kokun kelimeleri — o kokun etrafinda kucuk daire
  const activePos = active
    ? (() => {
        const idx = roots.slice(0, 10).findIndex((r) => r.root === active.root);
        const c = idx >= 0 ? rootPos[idx] : { x: CX, y: CY };
        return activeItems.map((_, i) => {
          const angle = (i / Math.max(activeItems.length, 1)) * Math.PI * 2;
          return polar(c.x, c.y, 85, angle);
        });
      })()
    : [];

  return (
    <div>
      <svg viewBox="0 0 800 600" className="h-auto w-full rounded-2xl border bg-white">
        {/* Kenarlar: merkez -> kok */}
        {roots.slice(0, 10).map((r, i) => (
          <line
            key={"e-" + r.root}
            x1={CX} y1={CY} x2={rootPos[i].x} y2={rootPos[i].y}
            stroke={active?.root === r.root ? "#7c3aed" : "#cbd5e1"}
            strokeWidth={active?.root === r.root ? 3 : 1.5}
          />
        ))}
        {/* Kenarlar: kok -> kelime (sadece secili kok) */}
        {active && activeItems.map((l, i) => {
          const idx = roots.slice(0, 10).findIndex((r) => r.root === active.root);
          const c = idx >= 0 ? rootPos[idx] : { x: CX, y: CY };
          return (
            <line
              key={"el-" + l.id}
              x1={c.x} y1={c.y} x2={activePos[i].x} y2={activePos[i].y}
              stroke="#ddd6fe" strokeWidth={1.5}
            />
          );
        })}

        {/* Kok dugumleri */}
        {roots.slice(0, 10).map((r, i) => (
          <g
            key={r.root}
            onClick={() => setSelectedRoot(r.root)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={rootPos[i].x} cy={rootPos[i].y} r={30}
              fill={active?.root === r.root ? "#7c3aed" : "#fff"}
              stroke="#7c3aed" strokeWidth={2}
            />
            <text
              x={rootPos[i].x} y={rootPos[i].y - 2}
              textAnchor="middle" fontSize={11} fontWeight={700}
              fill={active?.root === r.root ? "#fff" : "#1e293b"}
            >
              {r.root}
            </text>
            <text
              x={rootPos[i].x} y={rootPos[i].y + 13}
              textAnchor="middle" fontSize={10}
              fill={active?.root === r.root ? "#fff" : "#64748b"}
            >
              {r.items.length}
            </text>
          </g>
        ))}

        {/* Kelime dugumleri (secili kok) */}
        {active && activeItems.map((l, i) => (
          <g key={l.id}>
            <circle cx={activePos[i].x} cy={activePos[i].y} r={22} fill="#ecfeff" stroke="#0e7490" strokeWidth={1.5} />
            <text x={activePos[i].x} y={activePos[i].y + 4} textAnchor="middle" fontSize={10} fontWeight={600} fill="#164e63">
              {l.form.length > 8 ? l.form.slice(0, 8) + "…" : l.form}
            </text>
            <title>{l.form} — {l.translations?.tr ?? l.conceptId ?? l.id}</title>
          </g>
        ))}

        {/* Merkez dugum */}
        <circle cx={CX} cy={CY} r={52} fill="#7c3aed" stroke="#fff" strokeWidth={3} />
        <text x={CX} y={CY - 6} textAnchor="middle" fontSize={16} fontWeight={900} fill="#fff">
          {conceptId}
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" fontSize={12} fill="#fff" opacity={0.9}>
          {lemma.length > 12 ? lemma.slice(0, 12) + "…" : lemma}
        </text>
        <text x={CX} y={CY + 30} textAnchor="middle" fontSize={10} fill="#fff" opacity={0.8}>
          {lexemes.length} form • {roots.length} kök
        </text>
      </svg>

      <p className="mt-2 text-xs text-slate-500">
        Bir kök düğümüne tıkla — o kökten gelen kelimeler grafikte açılır. Kelimenin üzerine gelince Türkçe karşılığını görürsün.
        {roots.length > 10 && ` İlk 10 kök gösteriliyor, toplam ${roots.length} kök.`}
      </p>
      {active && (
        <p className="mt-1 text-sm">
          <b>{active.root}</b> — {active.items.length} form
          {active.items.length > 12 && " (grafikte ilk 12'si)"}
        </p>
      )}
    </div>
  );
}
