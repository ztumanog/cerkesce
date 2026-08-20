import React, { useState } from "react";
import { ConceptRow } from "@/types/dictionary";

const LANGS = [
  { key: "Turkce", label: "Türkçe", flag: "🇹🇷" },
  { key: "Ingilizce", label: "İngilizce", flag: "🇬🇧" },
  { key: "Arapca", label: "Arapça", flag: "🇸🇦" },
  { key: "Rusca", label: "Rusça", flag: "🇷🇺" },
  { key: "Adigece", label: "Batı Adıgece", flag: "🟢" },
  { key: "Kabardeyce", label: "Doğu Kabardeyce", flag: "🔵" },
] as const;

export function MultiLanguageConceptTable({ rows }: { rows: ConceptRow[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!rows || rows.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      {/* 📱 MOBİL GÖRÜNÜM (Kart Yapısı) */}
      <div className="block md:hidden space-y-3">
        {rows.map((row, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-3 cursor-pointer"
            >
              <div className="flex justify-between items-center border-b pb-2 border-gray-100 dark:border-gray-800">
                <h4 className="text-base font-bold text-indigo-600 dark:text-indigo-400 capitalize">
                  {row.kavram}
                </h4>
                <span className="text-xs text-gray-400">
                  {isExpanded ? "Gizle ▲" : "Detaylar ▼"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {LANGS.map(({ key, label, flag }) => {
                  const val = row[key as keyof ConceptRow];
                  if (!val || typeof val !== "string") return null;
                  return (
                    <div key={key} className="p-2 rounded bg-gray-50 dark:bg-gray-800/60">
                      <div className="text-[10px] text-gray-400">{flag} {label}</div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{val}</div>
                    </div>
                  );
                })}
              </div>

              {isExpanded && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs">
                  {row.detaylar?.map((detay: NonNullable<ConceptRow['detaylar']>[number], dIdx: number) => (
                    <div key={dIdx} className="p-2 rounded bg-gray-50 dark:bg-gray-950">
                      <div className="font-bold text-indigo-500 text-[11px]">{detay.kaynakSozluk}</div>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{detay.tanim}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🖥️ MASAÜSTÜ GÖRÜNÜM (Tablo Yapısı) */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
            <tr>
              {LANGS.map(({ key, label, flag }) => (
                <th key={key} className="p-3.5">
                  <span className="mr-1">{flag}</span> {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {rows.map((row, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <React.Fragment key={index}>
                  <tr
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 cursor-pointer transition-colors"
                  >
                    {LANGS.map(({ key }) => (
                      <td key={key} className="p-3.5 text-gray-800 dark:text-gray-200">
                        {(row[key as keyof ConceptRow] as string) || <span className="text-gray-300 dark:text-gray-700">-</span>}
                      </td>
                    ))}
                  </tr>

                  {isExpanded && (
                    <tr className="bg-indigo-50/20 dark:bg-indigo-950/20">
                      <td colSpan={LANGS.length} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                          {row.detaylar?.map((detay: NonNullable<ConceptRow['detaylar']>[number], dIdx: number) => (
                            <div key={dIdx} className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 space-y-1">
                              <div className="font-bold text-indigo-500">{detay.kaynakSozluk}</div>
                              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{detay.tanim}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}