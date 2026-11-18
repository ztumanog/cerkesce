"use client";
import Link from "next/link";
import { useState } from "react";

type Member = { id: string; form: string; conceptId?: string };

export default function FamilyList({
  members,
  currentId,
  familyId,
}: {
  members: Member[];
  currentId: string;
  familyId: string;
}) {
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);
  const query = q.trim().toLowerCase();
  const filtered = query
    ? members.filter(
        (m) =>
          m.form.toLowerCase().includes(query) ||
          m.id.toLowerCase().includes(query) ||
          (m.conceptId ?? "").toLowerCase().includes(query)
      )
    : members;
  const visible = showAll ? filtered : filtered.slice(0, 30);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setShowAll(false); }}
          placeholder="Ailede ara — form, ID veya kavram..."
          className="min-w-0 flex-1 rounded border px-3 py-2 text-sm"
        />
        <span className="text-sm text-gray-500">
          {filtered.length} / {members.length} üye
        </span>
      </div>

      <ul className="mt-3 grid gap-1 sm:grid-cols-2">
        {visible.map((m) => (
          <li
            key={m.id}
            className={
              m.id === currentId
                ? "rounded border border-blue-300 bg-blue-50 px-3 py-1.5"
                : "rounded border px-3 py-1.5 hover:bg-gray-50"
            }
          >
            <Link
              href={`/admin/curation/${encodeURIComponent(m.id)}`}
              className="flex items-baseline justify-between gap-2"
            >
              <span className="font-medium" dir="auto">{m.form}</span>
              <span className="truncate text-xs text-gray-500">
                {m.conceptId ?? m.id}
                {m.id === currentId && " • (bu kayıt)"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length > 30 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          {showAll ? "İlk 30'u göster" : `Tümünü göster (${filtered.length})`}
        </button>
      )}
      {filtered.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">Aramana uyan üye yok.</p>
      )}
    </div>
  );
}