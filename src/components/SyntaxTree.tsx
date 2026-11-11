'use client';

import React from 'react';
import { SyntacticToken } from '@/domain/morphology/SyntaxAnalyzer';

interface SyntaxTreeProps {
  sentence: string;
  structurePattern: string;
  tokens: SyntacticToken[];
}

export const SyntaxTree: React.FC<SyntaxTreeProps> = ({ sentence, structurePattern, tokens }) => {
  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'subject_ergative':
        return { bg: 'bg-amber-100 dark:bg-amber-950/40', border: 'border-amber-400', text: 'text-amber-800 dark:text-amber-300', label: 'Ergatif Özne (-?)' };
      case 'subject_nominative':
        return { bg: 'bg-blue-100 dark:bg-blue-950/40', border: 'border-blue-400', text: 'text-blue-800 dark:text-blue-300', label: 'Yalýn Özne (-?)' };
      case 'direct_object':
        return { bg: 'bg-emerald-100 dark:bg-emerald-950/40', border: 'border-emerald-400', text: 'text-emerald-800 dark:text-emerald-300', label: 'Nesne (-? / Yalýn)' };
      case 'predicate_verb':
        return { bg: 'bg-purple-100 dark:bg-purple-950/40', border: 'border-purple-400', text: 'text-purple-800 dark:text-purple-300', label: 'Yüklem / Fiil' };
      case 'conditional_clause':
        return { bg: 'bg-rose-100 dark:bg-rose-950/40', border: 'border-rose-400', text: 'text-rose-800 dark:text-rose-300', label: 'Þart Yan Cümleciði (-??)' };
      case 'adverbial_clause':
        return { bg: 'bg-cyan-100 dark:bg-cyan-950/40', border: 'border-cyan-400', text: 'text-cyan-800 dark:text-cyan-300', label: 'Zarf-Fiil Öbeði (-????)' };
      case 'concessive_clause':
        return { bg: 'bg-indigo-100 dark:bg-indigo-950/40', border: 'border-indigo-400', text: 'text-indigo-800 dark:text-indigo-300', label: 'Edatlý Tümleç (-???????)' };
      default:
        return { bg: 'bg-slate-100 dark:bg-slate-800', border: 'border-slate-300', text: 'text-slate-700 dark:text-slate-300', label: 'Tümleç / Diðer' };
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 space-y-6">
      {/* Cümle ve Sentaks Dizilim Deseni */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Analiz Edilen Cümle</h3>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100 font-serif mt-1">{sentence}</p>
        </div>
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
          <span className="text-xs font-mono font-medium text-indigo-700 dark:text-indigo-300">
            Dizilim: <strong className="font-bold">{structurePattern}</strong>
          </span>
        </div>
      </div>

      {/* Düðümler (Sentaks Aðacý) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokens.map((token, idx) => {
          const style = getRoleStyle(token.role);
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${style.border} ${style.bg} transition-all duration-200 hover:shadow-md flex flex-col justify-between space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 shadow-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300">
                  Düðüm #{idx + 1}
                </span>
                <span className={`text-xs font-semibold ${style.text}`}>
                  {style.label}
                </span>
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50 font-serif">{token.word}</p>
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                  <div>Kök / Lemma: <span className="font-semibold text-slate-800 dark:text-slate-200">{token.analysis?.root || '-'}</span></div>
                  {token.analysis?.nounCase && token.analysis.nounCase.case !== 'bare' && (
                    <div>Ýsim Bükümü: <span className="font-medium text-emerald-600 dark:text-emerald-400">{token.analysis.nounCase.case}</span></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
