"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface LexemeSummary {
  id: string;
  form: string;
  meaning?: string;
  translations?: {
    tr?: string;
    en?: string;
    ru?: string;
  };
  rootIds?: string[];
  notes?: string;
}

export default function LexemeCurationListPage() {
  const [lexemes, setLexemes] = useState<LexemeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "missing_roots" | "missing_meaning">("all");
  const [page, setPage] = useState(1);
  const pageSize = 50;

  useEffect(() => {
    async function fetchLexemes() {
      try {
        const res = await fetch("/api/admin/curation/lexeme");
        if (res.ok) {
          const data = await res.json();
          setLexemes(data.lexemes || data || []);
        }
      } catch (err) {
        console.error("Leksik veriler yüklenirken hata:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLexemes();
  }, []);

  // Filtreleme ve Arama
  const filteredLexemes = useMemo(() => {
    return lexemes.filter((lex) => {
      // Durum Filtreleri
      if (filter === "missing_roots" && lex.rootIds && lex.rootIds.length > 0) {
        return false;
      }
      if (filter === "missing_meaning") {
        const hasMeaning =
          lex.meaning ||
          lex.translations?.tr ||
          lex.translations?.en ||
          lex.translations?.ru;
        if (hasMeaning) return false;
      }

      // Arama
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const formMatch = lex.form?.toLowerCase().includes(q);
      const idMatch = lex.id?.toLowerCase().includes(q);
      const meaningMatch =
        lex.meaning?.toLowerCase().includes(q) ||
        lex.translations?.tr?.toLowerCase().includes(q) ||
        lex.translations?.en?.toLowerCase().includes(q);

      return formMatch || idMatch || meaningMatch;
    });
  }, [lexemes, search, filter]);

  // Sayfalama
  const totalPages = Math.ceil(filteredLexemes.length / pageSize) || 1;
  const paginatedLexemes = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLexemes.slice(start, start + pageSize);
  }, [filteredLexemes, page]);

  // Sayfa değiştikçe başa dön
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Üst Başlık ve İstatistikler */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Leksik Veri Kürasyon Paneli</h1>
          <p className="text-sm text-slate-400">
            Toplam {lexemes.length.toLocaleString()} kayıttan {filteredLexemes.length.toLocaleString()} birim listeleniyor
          </p>
        </div>
      </div>

      {/* Arama ve Filtre Barları */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-800">
        <input
          type="text"
          placeholder="Kelime (Çerkesçe / Türkçe / İngilizce) veya ID ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 bg-slate-800 text-slate-100 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilter("missing_roots")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === "missing_roots"
                ? "bg-amber-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Köksüzler (`rootIds: []`)
          </button>
          <button
            onClick={() => setFilter("missing_meaning")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === "missing_meaning"
                ? "bg-rose-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Anlamı Boş Olanlar
          </button>
        </div>
      </div>

      {/* Tablo */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Yükleniyor...</div>
      ) : (
        <div className="overflow-x-auto bg-slate-900 rounded-lg border border-slate-800">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                <th className="p-3">ID</th>
                <th className="p-3">Form (Çerkesçe)</th>
                <th className="p-3">Anlam (TR/EN/RU)</th>
                <th className="p-3">Kök İlişkisi</th>
                <th className="p-3 text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {paginatedLexemes.map((lex) => {
                const trAnlam =
                  lex.meaning ||
                  lex.translations?.tr ||
                  lex.translations?.en ||
                  lex.translations?.ru ||
                  "-";
                const hasRoots = lex.rootIds && lex.rootIds.length > 0;

                return (
                  <tr key={lex.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-mono text-xs text-slate-400">{lex.id}</td>
                    <td className="p-3 font-medium text-base text-blue-400">{lex.form}</td>
                    <td className="p-3 max-w-xs truncate text-slate-300">{trAnlam}</td>
                    <td className="p-3">
                      {hasRoots ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {lex.rootIds?.join(", ")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-950 text-amber-400 border border-amber-800">
                          Eksik
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/curation/${lex.id}`}
                        className="inline-block px-3 py-1 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded text-xs font-medium transition-colors"
                      >
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {paginatedLexemes.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-500">
                    Kriterlere uygun kayıt bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Sayfalama Alt BARI */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-slate-800 disabled:opacity-50 text-slate-300 rounded hover:bg-slate-700 text-sm"
        >
          Önceki Sayfa
        </button>
        <span className="text-sm text-slate-400">
          Sayfa {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-4 py-2 bg-slate-800 disabled:opacity-50 text-slate-300 rounded hover:bg-slate-700 text-sm"
        >
          Sonraki Sayfa
        </button>
      </div>
    </div>
  );
}