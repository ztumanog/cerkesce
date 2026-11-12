import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GraphMutationService } from '@/domain/sync/services/GraphMutationService';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';

let cachedLexemes: any[] = [];
let cachedConceptWords: Record<string, any> = {};
let cachedConceptTr: Record<string, string> = {};

function loadAllData(forceReload = false) {
  const baseDir = path.resolve('./public/data/linguistic');
  if (forceReload || cachedLexemes.length === 0) {
    const p = path.join(baseDir, 'lexemes.json');
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
      cachedLexemes = Array.isArray(raw) ? raw : raw.lexemes ?? [];
    }
  }
  if (forceReload || Object.keys(cachedConceptWords).length === 0) {
    const p = path.join(baseDir, 'concept-words.json');
    if (fs.existsSync(p)) {
      cachedConceptWords = JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  }
  if (forceReload || Object.keys(cachedConceptTr).length === 0) {
    const p = path.join(baseDir, 'concept-tr.json');
    if (fs.existsSync(p)) {
      cachedConceptTr = JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  }
  return { lexemes: cachedLexemes, conceptWords: cachedConceptWords, conceptTr: cachedConceptTr };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ concept: string }> }
) {
  const { concept } = await params;
  const decoded = decodeURIComponent(concept).trim();
  const conceptId = decoded.toUpperCase();
  const isInvalidated = GraphMutationService.isCacheInvalidated(`cache_concept_${conceptId}`);
  const { lexemes, conceptWords, conceptTr } = loadAllData(isInvalidated);

  const meta = conceptWords[conceptId] || conceptWords[decoded] || null;
  const trTitle = meta?.tr || conceptTr[conceptId] || conceptTr[decoded] || '';
  const enTitle = meta?.en || decoded;
  const seedWords: string[] = Array.isArray(meta?.words) ? meta.words : [];
  const normSeeds = new Set(seedWords.map((w) => normalizePalochka(w).toLowerCase()));

  const items = lexemes
    .filter((l: any) => {
      const cMatch = String(l.conceptId || '').toUpperCase() === conceptId;
      const formNorm = normalizePalochka(String(l.form || '')).toLowerCase();
      return cMatch || normSeeds.has(formNorm);
    })
    .map((l: any) => ({
      id: l.id,
      form: l.form,
      ipa: l.ipa ?? null,
      dialect: l.dialect ?? null,
      translations: l.translations || {},
      literalMeaning: l.literalMeaning ?? null,
      partOfSpeech: l.partOfSpeech ?? null,
      dialectVariants: l.dialectVariants ?? null,
      wordFamilyId: l.wordFamilyId ?? null,
      rootIds: l.rootIds || [],
      sources: l.sources || [],
    }));

  return NextResponse.json({
    conceptId,
    tr: trTitle,
    en: enTitle,
    seedWords,
    count: items.length,
    items,
  });
}