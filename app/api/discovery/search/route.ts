import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';
import { normalizeLatinToKiril } from '@/lib/latinNormalize';

let cachedLexemes: any[] = [];
let cachedConceptTr: Record<string, any> = {};

function loadDiscoveryData() {
  const dataDir = path.join(process.cwd(), 'public', 'data', 'linguistic');
  if (cachedLexemes.length === 0) {
    const p = path.join(dataDir, 'lexemes.json');
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
      cachedLexemes = Array.isArray(raw) ? raw : raw?.lexemes ?? [];
    }
  }
  if (Object.keys(cachedConceptTr).length === 0) {
    const p = path.join(dataDir, 'concept-tr.json');
    if (fs.existsSync(p)) {
      cachedConceptTr = JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  }
  return { lexemes: cachedLexemes, conceptTr: cachedConceptTr };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawQ = (searchParams.get('q') || '').trim();
  const { lexemes, conceptTr } = loadDiscoveryData();

  const qNorm = rawQ
    ? normalizePalochka(normalizeLatinToKiril(rawQ)).toLowerCase()
    : 'псы';
  const rawLower = (rawQ || 'псы').toLocaleLowerCase('tr-TR');

  const matched = lexemes.filter((l: any) => {
    const form = normalizePalochka(String(l.form || '')).toLowerCase();
    const tr = String(l.translations?.tr || '').toLocaleLowerCase('tr-TR');
    const en = String(l.translations?.en || '').toLowerCase();
    return form === qNorm || form.startsWith(qNorm) || tr.includes(rawLower) || en.includes(rawLower);
  }).slice(0, 25);

  const items: any[] = [];
  const seen = new Set<string>();

  const pushRel = (item: any) => {
    const key = `${item.relationType}:${item.targetConcept}`;
    if (seen.has(key) || items.length >= 40) return;
    seen.add(key);
    items.push(item);
  };

  for (const lex of matched) {
    const roots = Array.isArray(lex.rootIds) && lex.rootIds.length ? lex.rootIds : (lex.rootId ? [lex.rootId] : []);
    for (const rId of roots) {
      pushRel({
        targetId: `root-${rId}`,
        targetConcept: rId,
        relationType: 'ROOT',
        score: 0.98,
        href: `/sozluk/root/${encodeURIComponent(rId)}`,
        subtitle: `Kök · ${lex.form}`,
      });
    }

    if (lex.wordFamilyId) {
      pushRel({
        targetId: `fam-${lex.wordFamilyId}`,
        targetConcept: lex.wordFamilyId,
        relationType: 'CHILD',
        score: 0.93,
        href: `/sozluk/family/${encodeURIComponent(lex.wordFamilyId)}`,
        subtitle: `Kelime Ailesi · ${lex.form}`,
      });
    }

    if (lex.dialectVariants?.adyghe && lex.dialectVariants?.kabardian &&
        lex.dialectVariants.adyghe !== lex.dialectVariants.kabardian) {
      pushRel({
        targetId: `var-${lex.id}`,
        targetConcept: `${lex.dialectVariants.adyghe} ↔ ${lex.dialectVariants.kabardian}`,
        relationType: 'DIALECT_VARIANT',
        score: 0.91,
        href: `/lexeme/${encodeURIComponent(lex.id)}`,
        subtitle: 'ADY ↔ KBD Lehçe Varyantı',
      });
    }

    if (lex.conceptId) {
      const trEntry = conceptTr[lex.conceptId] || conceptTr[String(lex.conceptId).toLowerCase()];
      const trLabel = typeof trEntry === 'string' ? trEntry : trEntry?.tr || '';
      pushRel({
        targetId: `con-${lex.conceptId}`,
        targetConcept: trLabel ? `${lex.conceptId} (${trLabel})` : lex.conceptId,
        relationType: 'RELATED',
        score: 0.87,
        href: `/kavram/${String(lex.conceptId).toLowerCase()}`,
        subtitle: `Kavram · ${lex.form}`,
      });
    }
  }

  return NextResponse.json({
    query: { rawQuery: rawQ || 'псы', normalizedText: qNorm },
    total: items.length,
    items,
  });
}
