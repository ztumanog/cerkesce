import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import {
  ConceptGraphCanvas,
  CytoscapeElementData,
  ConceptOption,
} from '@/ui/components/discovery/ConceptGraphCanvas';
import { ConceptGraphAdapter } from '@/domain/discovery/adapters/ConceptGraphAdapter';
import { CytoscapeProjectionAdapter } from '@/domain/discovery/adapters/CytoscapeProjectionAdapter';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';

interface PageProps {
  params: Promise<{ concept: string }>;
}

export const metadata: Metadata = {
  title: 'Kavram İlişki Ağı | Çerkesçe Sözlük',
  description: 'Çerkesçe kavramlar, eşanlamlı kelimeler ve ortak kök aileleri arasındaki görsel ilişki ağı.',
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

function normalizeGloss(raw: string): string {
  const clean = String(raw || '').trim();
  if (!clean) return '';
  if (clean === clean.toUpperCase() && /[A-ZÇĞİÖŞÜ]/.test(clean)) {
    return clean.toLocaleLowerCase('tr-TR');
  }
  return clean;
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
  const conceptTr = readJsonSafe<Record<string, string>>(path.join(baseDir, 'concept-tr.json'), {});
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

  const inferredTr = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.tr))?.translations?.tr);
  const inferredEn = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.en))?.translations?.en);
  const trLabel = meta?.tr || conceptTr[conceptKey] || conceptTr[decodedConcept] || inferredTr || '';
  const enLabel = meta?.en || inferredEn || decodedConcept;

  const existingForms = new Set(matchedLexemes.map((l) => normalizePalochka(String(l.form || '')).toLowerCase()));
  const synthetic = seedWords
    .filter((w) => !existingForms.has(normalizePalochka(w).toLowerCase()))
    .map((w, i) => ({ id: `SEED-${conceptKey}-${i}`, form: w, dialect: 'COMMON', translations: { tr: trLabel } }));

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
    const trHint = normalizeGloss(formatTranslation(item.translations?.tr).split(',')[0]?.trim() || '');
    graphRelated.push({
      conceptId: nodeId,
      label: trHint ? `${nodeId} (${trHint})` : nodeId,
      parentConceptId: conceptKey,
      relationType: 'CHILD',
      dialect: String(item.dialect || 'COMMON').toUpperCase(),
      score: 0.98,
    });
  });

  relatedLexemes.slice(0, 8).forEach((rel) => {
    const nodeId = String(rel.form || '').trim();
    if (!nodeId || seenIds.has(nodeId)) return;
    seenIds.add(nodeId);
    const relTr = normalizeGloss(formatTranslation(rel.translations?.tr).split(',')[0]?.trim() || '');
    graphRelated.push({
      conceptId: nodeId,
      label: relTr ? `${nodeId} (${relTr})` : nodeId,
      parentConceptId: conceptKey,
      relationType: 'ROOT',
      dialect: String(rel.dialect || 'COMMON').toUpperCase(),
      score: 0.82,
    });
  });

  const trTokens = trLabel.toLowerCase().split(/[,;/\s]+/).map((t) => t.trim()).filter((t) => t.length >= 3);
  if (trTokens.length > 0) {
    let added = 0;
    for (const [cKey, cVal] of Object.entries(conceptWords)) {
      if (cKey === conceptKey || seenIds.has(cKey)) continue;
      const cTr = String(cVal?.tr || '').toLowerCase();
      if (trTokens.some((tok) => cTr.includes(tok))) {
        seenIds.add(cKey);
        const ncTr = normalizeGloss(String(cVal?.tr || ''));
        graphRelated.push({
          conceptId: cKey,
          label: ncTr ? `${ncTr} [${cKey}]` : cKey,
          parentConceptId: conceptKey,
          relationType: 'RELATED',
          score: 0.85,
        });
        if (++added >= 6) break;
      }
    }
  }

  const cleanRootTr = normalizeGloss(trLabel);
  const rootNodeTitle = cleanRootTr
    ? `${cleanRootTr}${enLabel && enLabel.toLowerCase() !== cleanRootTr.toLowerCase() ? ` (${enLabel.toLowerCase()})` : ''}`
    : decodedConcept;

  const canonicalNetwork = ConceptGraphAdapter.toCanonicalNetwork({
    rootConceptId: conceptKey,
    canonicalName: rootNodeTitle,
    relatedConcepts: graphRelated,
  });
  const graphData = CytoscapeProjectionAdapter.toCytoscapeFormat(canonicalNetwork) as CytoscapeElementData;

  const availableConcepts: ConceptOption[] = Object.entries(conceptWords)
    .map(([id, val]) => ({
      id,
      labelTr: normalizeGloss(String(val?.tr || conceptTr[id] || id)),
    }))
    .filter((c) => c.labelTr);

  return (
    <main className="w-full bg-slate-50">
      <ConceptGraphCanvas
        data={graphData}
        rootLabel={rootNodeTitle}
        conceptId={conceptKey}
        standalone
        availableConcepts={availableConcepts}
      />
    </main>
  );
}
