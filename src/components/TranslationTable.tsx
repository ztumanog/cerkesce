import React, { useState } from "react";

// Desteklenen/Gösterilebilecek Standart Diller Ve Sıralamaları
export const STANDARD_LANGS = [
  { key: "Türkçe", title: "Türkçe", color: "text-gray-900 dark:text-white" },
  { key: "Batı Adıgece", title: "Batı Adıgece", color: "text-emerald-600 dark:text-emerald-400 font-semibold" },
  { key: "Doğu Kabardeyce", title: "Doğu Kabardeyce", color: "text-blue-600 dark:text-blue-400 font-semibold" },
  { key: "İngilizce", title: "İngilizce", color: "text-indigo-600 dark:text-indigo-400" },
  { key: "Rusça", title: "Rusça", color: "text-amber-600 dark:text-amber-400" },
  { key: "Arapça", title: "Arapça", color: "text-teal-600 dark:text-teal-400" },
] as const;

export interface TranslationRow {
  kavram?: string;
  detaylar?: Array<{ kaynak_sozluk?: string; tanim: string; dialect?: string }>;
  [key: string]: any; // Dillerin dinamiğini destekler (Türkçe: "kapı", İngilizce: "door" vb.)
}

interface TranslationTableProps {
  rows: TranslationRow[];
}

export function TranslationTable({ rows }: TranslationTableProps) {
  // Akordeon / Detay gösterimi için seçilen satırın indeksi
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!rows || rows.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
        Eşleşen kavram bulunamadı.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 📱 MOBİL GÖRÜNÜM (md boyutundan küçük ekranlarda Kart şeklinde basar) */}
      <div className="block md:hidden space-y-3">
        {rows.map((row, index) => {
          const mainConcept = row.kavram || row["Türkçe"] || row["Batı Adıgece"] || row["Doğu Kabardeyce"] || "Kavram";
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-3"
            >
              {/* Ana Kavram Başlığı */}
              <div className="flex justify-between items-center border-b pb-2 border-gray-100 dark:border-gray-800">
                <span className="text-base font-bold text-gray-900 dark:text-white">
                  {mainConcept}
                </span>
                {row.detaylar && row.detaylar.length > 0 && (
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium"
                  >
                    {isExpanded ? "Kapat ▲" : `Tanımlar (${row.detaylar.length}) ▼`}
                  </button>
                )}
              </div>

              {/* Diller Dizilimi (Grid) */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {STANDARD_LANGS.map(({ key, title, color }) => {
                  const val = row[key];
                  if (!val) return null;

                  return (
                    <div key={key} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-[10px] text-gray-400 font-medium uppercase mb-0.5">{title}</div>
                      <div className={`font-medium ${color}`}>{val}</div>
                    </div>
                  );
                })}
              </div>

              {/* Tıklayınca Açılan Orijinal Sözlük Tanımları */}
              {isExpanded && row.detaylar && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="text-xs font-semibold text-gray-500">Kaynak Sözlükler & Detaylar:</div>
                  {row.detaylar.map((detay, dIdx) => (
                    <div key={dIdx} className="p-2.5 rounded bg-gray-50 dark:bg-gray-950 text-xs space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-gray-400">
                        <span>📖 {detay.kaynak_sozluk || "Bilinmeyen Sözlük"}</span>
                        {detay.dialect && <span>{detay.dialect}</span>}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                        {detay.tanim}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🖥️ MASAÜSTÜ GÖRÜNÜM (md ve üzeri ekranlarda Tablo olarak basar) */}
      <div className="hidden md:block overflow-hidden rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
            <tr>
              {STANDARD_LANGS.map(({ key, title }) => (
                <th key={key} className="px-4 py-3.5">
                  {title}
                </th>
              ))}
              <th className="px-4 py-3.5 text-right">Ayrıntı</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {rows.map((row, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <React.Fragment key={index}>
                  <tr className="hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-colors">
                    {STANDARD_LANGS.map(({ key, color }) => (
                      <td key={key} className={`px-4 py-3.5 ${color}`}>
                        {row[key] || <span className="text-gray-300 dark:text-gray-700">-</span>}
                      </td>
                    ))}
                    <td className="px-4 py-3.5 text-right">
                      {row.detaylar && row.detaylar.length > 0 ? (
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="px-2.5 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition"
                        >
                          {isExpanded ? "Kapat ▲" : `Detay (${row.detaylar.length}) ▼`}
                        </button>
                      ) : (
                        <span className="text-gray-300 dark:text-gray-700 text-xs">-</span>
                      )}
                    </td>
                  </tr>

                  {/* Masaüstü Satır İçi Açılır Panel (Accordion Detail) */}
                  {isExpanded && row.detaylar && (
                    <tr className="bg-indigo-50/20 dark:bg-indigo-950/10">
                      <td colSpan={STANDARD_LANGS.length + 1} className="p-4">
                        <div className="space-y-3">
                          <h5 className="font-semibold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                            Orijinal Kaynaklar ve Tanımlar
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {row.detaylar.map((detay, dIdx) => (
                              <div
                                key={dIdx}
                                className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm space-y-1 text-xs"
                              >
                                <div className="flex justify-between items-center text-[11px] font-medium text-gray-400">
                                  <span>📖 {detay.kaynak_sozluk || "Sözlük"}</span>
                                  {detay.dialect && (
                                    <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                                      {detay.dialect}
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                  {detay.tanim}
                                </p>
                              </div>
                            ))}
                          </div>
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