import React, { ReactNode, isValidElement } from 'react';
import { z } from 'zod';

// ============================================================================
// 1. ZOD SCHEMA & TYPESCRIPT DEFINITIONS
// ============================================================================

export const ConceptItemSchema = z.object({
  id: z.string(),
  term: z.string(),
  translation: z.string(),
  description: z.string().optional(),
  examples: z.array(z.string()).optional(),
});

export type ConceptItem = z.infer<typeof ConceptItemSchema>;

export interface MultiLanguageConceptTableProps {
  title: unknown;
  concepts: unknown;
  fallbackText?: string;
}

// ============================================================================
// 2. TYPE GUARDS (NARROWING)
// ============================================================================

function safeRenderReactNode(value: unknown, fallback: ReactNode = null): ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  if (isValidElement(value)) {
    return value;
  }
  return fallback;
}

function isConceptItemArray(value: unknown): value is ConceptItem[] {
  if (!Array.isArray(value)) return false;
  return value.every((item) => ConceptItemSchema.safeParse(item).success);
}

// ============================================================================
// 3. COMPONENT IMPLEMENTATION
// ============================================================================

export function MultiLanguageConceptTable({
  title,
  concepts,
  fallbackText = 'Veri bulunamadı.',
}: MultiLanguageConceptTableProps) {
  // Safe Heading Node Narrowing (Prevents TS2322)
  const renderedTitle = safeRenderReactNode(title, 'Çerkesçe Kavram Tablosu');

  // Safe Array Type Narrowing (Prevents TS2339 & TS2322)
  const validConcepts: ConceptItem[] = isConceptItemArray(concepts) ? concepts : [];
  const hasConcepts = validConcepts.length > 0;

  return (
    <section className="w-full max-w-5xl mx-auto my-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
        {renderedTitle}
      </h2>

      {!hasConcepts ? (
        <div className="p-6 text-center text-slate-500 italic bg-slate-50 rounded-lg">
          {fallbackText}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 font-semibold border-b">Kavram (Çerkesçe)</th>
                <th className="p-3 font-semibold border-b">Çeviri</th>
                <th className="p-3 font-semibold border-b">Açıklama</th>
                <th className="p-3 font-semibold border-b">Örnekler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {validConcepts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-medium text-slate-900">{item.term}</td>
                  <td className="p-3 text-slate-700">{item.translation}</td>
                  <td className="p-3 text-slate-600">{item.description ?? '-'}</td>
                  <td className="p-3 text-slate-600">
                    {item.examples && item.examples.length > 0 ? (
                      <ul className="list-disc list-inside space-y-0.5">
                        {item.examples.map((example, index) => (
                          <li key={`${item.id}-ex-${index}`}>{example}</li>
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