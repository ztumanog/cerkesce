'use client';

import React from 'react';
import { GitCommit, Layers, ArrowDown } from 'lucide-react';

interface SyntacticToken {
  word: string;
  role: string;
  roleTr: string;
  analysis: {
    root?: string;
    morphemes?: Array<{ type: string; morpheme?: string; form?: string; gloss?: string }>;
    nounCase?: { case?: string; suffix?: string };
    possessive?: { prefix?: string };
  };
}

interface SyntaxTreeProps {
  sentence: string;
  structurePattern: string;
  tokens: SyntacticToken[];
}

export function SyntaxTree({ sentence, structurePattern, tokens }: SyntaxTreeProps) {
  if (!tokens || tokens.length === 0) return null;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'subject_ergative':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
      case 'direct_object':
      case 'subject_nominative':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50';
      case 'predicate_verb':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'subject_ergative': return 'NP (ERG_SUBJ)';
      case 'direct_object': return 'NP (OBJ)';
      case 'subject_nominative': return 'NP (NOM_SUBJ)';
      case 'predicate_verb': return 'VP (VERB)';
      default: return 'PHRASE';
    }
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl backdrop-blur-md">
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Görsel Sentaks ve Morfoloji Ağacı (Syntax Tree)</span>
        </div>
        <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
          {structurePattern}
        </span>
      </div>

      {/* Tree Container */}
      <div className="flex flex-col items-center space-y-6 py-4 overflow-x-auto">
        
        {/* Root Node: S (Sentence) */}
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-slate-950 font-black px-6 py-2 rounded-xl text-lg shadow-lg tracking-wider">
            S (CÜMLE)
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">"{sentence}"</div>
          <div className="w-0.5 h-6 bg-slate-700 my-1"></div>
        </div>

        {/* Branch Level: Syntactic Nodes */}
        <div className="flex justify-center items-start gap-4 md:gap-8 flex-wrap w-full">
          {tokens.map((token, idx) => {
            const roleNode = getRoleLabel(token.role);
            const badgeColor = getRoleBadgeColor(token.role);
            const rootWord = token.analysis?.root || token.word;

            return (
              <div key={idx} className="flex flex-col items-center min-w-[160px] flex-1 max-w-[240px]">
                
                {/* Connector line */}
                <div className="w-full flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-slate-700"></div>
                  <div className={`px-4 py-1.5 rounded-lg border text-xs font-mono font-bold shadow-md ${badgeColor}`}>
                    {roleNode}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">{token.roleTr}</div>
                  <ArrowDown className="w-3 h-3 text-slate-600 my-1" />
                </div>

                {/* Leaf Node: Terminal Word & Morphemes */}
                <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center space-y-2">
                  <div className="text-lg font-bold text-white tracking-wide">{token.word}</div>
                  
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap justify-center gap-1">
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono font-bold">
                      Kök: {rootWord}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}