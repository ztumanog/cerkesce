import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import {
  ConceptGraphCanvas,
  CytoscapeElementData,
} from '@/ui/components/discovery/ConceptGraphCanvas';
import { ConceptGraphAdapter } from '@/domain/discovery/adapters/ConceptGraphAdapter';
import { CytoscapeProjectionAdapter } from '@/domain/discovery/adapters/CytoscapeProjectionAdapter';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';

interface PageProps {
  params: Promise<{ concept: string }>;
}

export const metadata: Metadata = {
  title: 'Concept Relation Network | Adyghe & Kabardian Lexicon',
  description: 'Interactive Circassian concept network, cognates, and lexical families.',
};

function readJsonSafe<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '')) as T;
  } catch {
    return fallback;
  }
}

function formatTranslation(val?: string | string[]): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.filter(Boolean).join(', ');
  return String(val).trim();
}

export default async function ConceptGraphPage({ params }: PageProps) {
  const { concept } = await params;
  const decodedConcept = decodeURIComponent(concept).trim();
  const conceptKey = decodedConcept.toUpperCase();

  const baseDir = path.join(process.cwd(), 'public', 'data', 'linguistic');
  const conceptWords = readJsonSafe<Record<string, { tr?: string; en?: string; words?: string[] }>>(
    path.join(baseDir, 'concept-words.json'),
    {},
  );
  const rawLexemes = readJsonSafe<any>(path.join(baseDir, 'lexemes.json'), []);
  const lexemes: any[] = Array.isArray(rawLexemes) ? rawLexemes : rawLexemes.lexemes ?? [];

  const meta = conceptWords[conceptKey] || conceptWords[decodedConcept] || null;
  const seedWords = Array.isArray(meta?.words) ? meta.words : [];
  const normQuery = normalizePalochka(decodedConcept).toLowerCase();
  const normSeeds = new Set(seedWords.map((w) => normalizePalochka(w).toLowerCase()));

  const matchedLexemes = lexemes.filter((l) => {
    const lexConcept = String(l.conceptId || '').toUpperCase();
    const formNorm = normalizePalochka(String(l.form || '')).toLowerCase();
    return (lexConcept && lexConcept === conceptKey) || normSeeds.has(formNorm) || formNorm === normQuery;
  });

  const inferredEn = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.en))?.translations?.en);
  const enLabel = String(meta?.en || inferredEn || decodedConcept).trim();

  const existingForms = new Set(matchedLexemes.map((l) => normalizePalochka(String(l.form || '')).toLowerCase()));
  const synthetic = seedWords
    .filter((w) => !existingForms.has(normalizePalochka(w).toLowerCase()))
    .map((w, i) => ({ id: `SEED-${conceptKey}-${i}`, form: w, dialect: 'COMMON' }));

  const allItems = [...matchedLexemes, ...synthetic];
  const familyIds = new Set(allItems.map((l) => l.wordFamilyId).filter(Boolean));
  const rootIds = new Set(allItems.flatMap((l) => l.rootIds || []).filter(Boolean));
  const itemIds = new Set(allItems.map((l) => l.id));

  const relatedLexemes =
    familyIds.size > 0 || rootIds.size > 0
      ? lexemes
          .filter((l) => !itemIds.has(l.id) && ((l.wordFamilyId && familyIds.has(l.wordFamilyId)) || (l.rootIds || []).some((r: string) => rootIds.has(r))))
          .slice(0, 10)
      : [];

  const graphRelated: any[] = [];
  const seenIds = new Set<string>([conceptKey]);

  allItems.slice(0, 22).forEach((item) => {
    const nodeId = String(item.form || '').trim();
    if (!nodeId || seenIds.has(nodeId)) return;
    seenIds.add(nodeId);
    const dialect = String(item.dialect || 'COMMON').toUpperCase();
    graphRelated.push({
      conceptId: nodeId,
      label: dialect !== 'COMMON' ? `${nodeId} (${dialect})` : nodeId,
      parentConceptId: conceptKey,
      relationType: 'CHILD',
      dialect,
      score: 0.98,
    });
  });

  relatedLexemes.slice(0, 8).forEach((rel) => {
    const nodeId = String(rel.form || '').trim();
    if (!nodeId || seenIds.has(nodeId)) return;
    seenIds.add(nodeId);
    const dialect = String(rel.dialect || 'COMMON').toUpperCase();
    graphRelated.push({
      conceptId: nodeId,
      label: dialect !== 'COMMON' ? `${nodeId} (${dialect})` : nodeId,
      parentConceptId: conceptKey,
      relationType: 'ROOT',
      dialect,
      score: 0.82,
    });
  });

  const enTokens = enLabel
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((t) => t.length >= 4 && !['with', 'from', 'that', 'this', 'into'].includes(t));

  if (enTokens.length > 0) {
    let added = 0;
    for (const [cKey, cVal] of Object.entries(conceptWords)) {
      if (cKey === conceptKey || seenIds.has(cKey)) continue;
      const cEnWords = String(cVal?.en || '').toLowerCase().split(/[^a-z]+/);
      if (enTokens.some((tok) => cEnWords.includes(tok))) {
        seenIds.add(cKey);
        const targetEn = String(cVal?.en || cKey).trim();
        graphRelated.push({
          conceptId: cKey,
          label: `${targetEn} [${cKey}]`,
          parentConceptId: conceptKey,
          relationType: 'RELATED',
          score: 0.85,
        });
        if (++added >= 6) break;
      }
    }
  }

  const rootNodeTitle = `${enLabel} [${conceptKey}]`;

  const canonicalNetwork = ConceptGraphAdapter.toCanonicalNetwork({
    rootConceptId: conceptKey,
    canonicalName: rootNodeTitle,
    relatedConcepts: graphRelated,
  });
  const graphData = CytoscapeProjectionAdapter.toCytoscapeFormat(canonicalNetwork) as CytoscapeElementData;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ConceptGraphCanvas data={graphData} rootLabel={rootNodeTitle} />
      </div>
    </main>
  );
}
