import React, { ReactNode, isValidElement } from 'react';
import { z } from 'zod';

export const ConceptItemSchema = z.object({
  id: z.string(),
  term: z.string(),
  translation: z.string(),
  description: z.string().optional(),
  examples: z.array(z.string()).optional(),
  ipa: z.string().optional(),
  language: z.string().optional(),
  translations: z.record(z.string(), z.string()).optional(),
  sources: z.array(z.string()).optional(),
});

export type ConceptItem = z.infer<typeof ConceptItemSchema>;

export interface MultiLanguageConceptTableProps {
  title: unknown;
  concepts: unknown;
  fallbackText?: string;
}

function safeRenderReactNode(value: unknown, fallback: ReactNode = null): ReactNode {
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (isValidElement(value)) return value;
  return fallback;
}

function isConceptItemArray(value: unknown): value is ConceptItem[] {
  if (!Array.isArray(value)) return false;
  return value.every((item) => ConceptItemSchema.safeParse(item).success);
}

const LANG_LABELS: Record<string, string> = {
  tr: 'Türkçe', en: 'İngilizce', ru: 'Rusça', ar: 'Arapça', ady: 'Adığce', kbd: 'Kabardeyce',
};

export function MultiLanguageConceptTable({
  title,
  concepts,
  fallbackText = 'Veri bulunamadı.',
}: MultiLanguageConceptTableProps) {
  const renderedTitle = safeRenderReactNode(title, 'Çerkesçe Kavram Tablosu');
  const validConcepts: ConceptItem[] = isConceptItemArray(concepts) ? concepts : [];
  const hasConcepts = validConcepts.length > 0;

  return (
    <section className="w-full max-w-5xl mx-auto my-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
        {renderedTitle}
      </h2>
      {!hasConcepts ? (
        <div className="p-6 text-center text-slate-500 italic bg-slate-50 rounded-lg">{fallbackText}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 font-semibold border-b">Kavram (Çerkesçe)</th>
                <th className="p-3 font-semibold border-b">Diller</th>
                <th className="p-3 font-semibold border-b">Açıklama</th>
                <th className="p-3 font-semibold border-b">Örnekler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {validConcepts.map((item, index) => (
                <tr key={`${item.id}-${index}`} className="hover:bg-slate-50/80 transition-colors align-top">
                  <td className="p-3 font-medium text-slate-900">
                    <div>{item.term}</div>
                    {item.ipa && <div className="text-xs text-slate-400 font-mono">{item.ipa}</div>}
                    {item.language && <div className="text-xs text-slate-400">{item.language}</div>}
                  </td>
                  <td className="p-3 text-slate-600">
                    {item.translations && Object.keys(item.translations).length > 0 ? (
                      <ul className="space-y-1">
                        {Object.entries(item.translations).map(([lang, val]) => (
                          <li key={lang} className="text-sm">
                            {/* DİL İSMİ DAHA KOYU (font-bold) */}
                            <span className="font-bold text-slate-800">{LANG_LABELS[lang] || lang}:</span>{' '}
                            <span className="text-slate-600">{val}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">-</span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600">{item.description ?? '-'}</td>
                  <td className="p-3 text-slate-600">
                    {item.examples && item.examples.length > 0 ? (
                      <ul className="list-disc list-inside space-y-0.5">
                        {item.examples.map((example, i) => (
                          <li key={`${item.id}-ex-${i}`} className="text-xs">{example}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default MultiLanguageConceptTable;