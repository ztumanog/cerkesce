"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface LexemeSummary {
  id: string;
  form: string;
  dialect?: string; // "kbd" | "ady" | "eastern" | "western"
  meaning?: string;
  translations?: {
    tr?: string;
    en?: string;
    ru?: string;
  };
  rootIds?: string[];
  conceptId?: string;
  notes?: string;
}

export default function LexemeCurationListPage() {
  const [lexemes, setLexemes] = useState<LexemeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "missing_roots" | "missing_meaning" | "missing_concept" | "ady" | "kbd">("all");
  
  const [page, setPage] = useState(1);
  const pageSize = 50;

 useEffect(() => {
    async function fetchLexemes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/curation/lexeme");
        if (!res.ok) throw new Error(`API Hatası: ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.lexemes || data.data || []);
        setLexemes(list);
      } catch (err: any) {
        setError(err.message || "Veriler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    }
    fetchLexemes();
  }, []);

  const filteredLexemes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return lexemes.filter((lex) => {
      // Diyalekt ve Durum Filtreleri
      if (filter === "ady" && lex.dialect !== "ady" && !lex.id.includes("ADY")) return false;
      if (filter === "kbd" && lex.dialect !== "kbd" && !lex.id.includes("KBD")) return false;
      if (filter === "missing_roots" && lex.rootIds && lex.rootIds.length > 0) return false;
      if (filter === "missing_meaning") {
        const hasMeaning = lex.meaning || lex.translations?.tr || lex.translations?.en || lex.translations?.ru;
        if (hasMeaning) return false;
      }
      if (filter === "missing_concept" && lex.conceptId) return false;

      if (!q) return true;

      return (
        lex.form?.toLowerCase().includes(q) ||
        lex.id?.toLowerCase().includes(q) ||
        lex.conceptId?.toLowerCase().includes(q) ||
        lex.meaning?.toLowerCase().includes(q) ||
        lex.translations?.tr?.toLowerCase().includes(q) ||
        lex.translations?.en?.toLowerCase().includes(q)
      );
    });
  }, [lexemes, searchQuery, filter]);

  useEffect(() => { setPage(1); }, [searchQuery, filter]);

  const totalPages = Math.ceil(filteredLexemes.length / pageSize) || 1;
  const paginatedLexemes = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLexemes.slice(start, start + pageSize);
  }, [filteredLexemes, page]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Lexeme Kürasyon Portalı</h1>
          <p className="text-sm text-slate-400 mt-1">
            Toplam {lexemes.length.toLocaleString()} kayıttan {filteredLexemes.length.toLocaleString()} birim süzüldü.
          </p>
        </div>
      </div>

      <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Çerkesçe kelime, Türkçe/İngilizce anlam, ID veya Kavram ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-slate-400 hover:text-slate-200 text-xs bg-slate-700 px-2 py-1 rounded"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Diyalekt ve Durum Filtre Butonları */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilter("kbd")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === "kbd" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Kabardeyce (Doğu)
          </button>
          <button
            onClick={() => setFilter("ady")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === "ady" ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Adıgeyge (Batı)
          </button>
          <button
            onClick={() => setFilter("missing_roots")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === "missing_roots" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Köksüzler (`rootIds: []`)
          </button>
          <button
            onClick={() => setFilter("missing_concept")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === "missing_concept" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Kavramsızlar (`conceptId: null`)
          </button>
        </div>
      </div>

      {loading && <div className="text-center py-16 text-slate-400">Veriler yükleniyor...</div>}
      {error && <div className="p-4 bg-rose-950/60 border border-rose-800 text-rose-200 rounded-lg text-sm">{error}</div>}

      {!loading && !error && (
        <div className="space-y-4">
          <div className="overflow-x-auto bg-slate-900 rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Diyalekt</th>
                  <th className="p-3.5">Form (Çerkesçe)</th>
                  <th className="p-3.5">Anlam (TR/EN/RU)</th>
                  <th className="p-3.5">Kök İlişkisi</th>
                  <th className="p-3.5">Kavram</th>
                  <th className="p-3.5 text-right">Eylem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {paginatedLexemes.map((lex) => {
                  const trAnlam = lex.meaning || lex.translations?.tr || lex.translations?.en || lex.translations?.ru || "-";
                  const isAdy = lex.dialect === "ady" || lex.id.includes("ADY");

                  return (
                    <tr key={lex.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-mono text-xs text-slate-400">{lex.id}</td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          isAdy ? "bg-teal-950 text-teal-300 border border-teal-800" : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                        }`}>
                          {isAdy ? "Batı (Adıgey)" : "Doğu (Kabardey)"}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-base text-blue-400">{lex.form}</td>
                      <td className="p-3.5 max-w-xs truncate text-slate-300" title={trAnlam}>{trAnlam}</td>
                      <td className="p-3.5">
                        {lex.rootIds && lex.rootIds.length > 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {lex.rootIds.join(", ")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-950/80 text-amber-400 border border-amber-800/80">Eksik</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {lex.conceptId ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-purple-950 text-purple-300 border border-purple-800">{lex.conceptId}</span>
                        ) : (
                          <span className="text-slate-500 text-xs border border-slate-800 px-2 py-0.5 rounded">Yok</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          href={`/admin/curation/${lex.id}`}
                          className="inline-block px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          Düzenle
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-300 rounded-lg text-sm"
              >
                Önceki Sayfa
              </button>
              <span className="text-sm text-slate-400">Sayfa {page} / {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-300 rounded-lg text-sm"
              >
                Sonraki Sayfa
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}