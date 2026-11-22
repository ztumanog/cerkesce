import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';
import { normalizeLatinToKiril } from '@/lib/latinNormalize';

let cachedLexemes: any[] = [];
let cachedConceptTr: Record<string, any> = {};
let cachedRootsMap: Record<string, any> = {};
let cachedFamMap: Record<string, any> = {};

function pickForm(obj: any): string {
  if (!obj || typeof obj !== 'object') return '';
  for (const k of ['form', 'rootForm', 'root', 'circassian', 'word', 'lexeme', 'title', 'name']) {
    const v = obj[k];
    if (typeof v === 'string' && v.trim()) return normalizePalochka(v.trim());
  }
  return '';
}

function pickTr(val: any): string {
  if (Array.isArray(val)) return val.map((x) => String(x || '').trim()).filter(Boolean).slice(0, 2).join(', ');
  if (typeof val === 'string') return val.trim();
  return '';
}

function toMap(raw: any): Record<string, any> {
  if (Array.isArray(raw)) {
    const m: Record<string, any> = {};
    for (const it of raw) {
      const id = it?.id || it?.rootId || it?.familyId || it?.wordFamilyId;
      if (id) m[String(id)] = it;
    }
    return m;
  }
  if (raw && typeof raw === 'object') return raw as Record<string, any>;
  return {};
}

function loadDiscoveryData() {
  const dataDir = path.join(process.cwd(), 'public', 'data', 'linguistic');
  if (cachedLexemes.length === 0) {
    const p = path.join(dataDir, 'lexemes.json');
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
      cachedLexemes = (Array.isArray(raw) ? raw : raw?.lexemes ?? []).filter((l: any) => l?.status !== 'uncertain');
    }
  }
  if (Object.keys(cachedConceptTr).length === 0) {
    const p = path.join(dataDir, 'concept-tr.json');
    if (fs.existsSync(p)) cachedConceptTr = JSON.parse(fs.readFileSync(p, 'utf-8'));
  }
  if (Object.keys(cachedRootsMap).length === 0) {
    const p = path.join(dataDir, 'roots.json');
    if (fs.existsSync(p)) cachedRootsMap = toMap(JSON.parse(fs.readFileSync(p, 'utf-8')));
  }
  if (Object.keys(cachedFamMap).length === 0) {
    const p = path.join(dataDir, 'word-families.json');
    if (fs.existsSync(p)) cachedFamMap = toMap(JSON.parse(fs.readFileSync(p, 'utf-8')));
  }
  return { lexemes: cachedLexemes, conceptTr: cachedConceptTr, rootsMap: cachedRootsMap, famMap: cachedFamMap };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawQ = (searchParams.get('q') || '').trim();
  const { lexemes, conceptTr, rootsMap, famMap } = loadDiscoveryData();

  const qNorm = rawQ ? normalizePalochka(normalizeLatinToKiril(rawQ)).toLowerCase() : 'псы';
  const rawLower = (rawQ || 'псы').toLocaleLowerCase('tr-TR');

  const matched = lexemes
    .filter((l: any) => {
      const form = normalizePalochka(String(l.form || '')).toLowerCase();
      const tr = pickTr(l.translations?.tr).toLocaleLowerCase('tr-TR');
      const en = pickTr(l.translations?.en).toLowerCase();
      return form === qNorm || form.startsWith(qNorm) || tr.includes(rawLower) || en.includes(rawLower);
    })
    .sort((a: any, b: any) => {
      const fa = normalizePalochka(String(a.form || '')).toLowerCase();
      const fb = normalizePalochka(String(b.form || '')).toLowerCase();
      const exactA = fa === qNorm ? 0 : 1;
      const exactB = fb === qNorm ? 0 : 1;
      if (exactA !== exactB) return exactA - exactB;
      return fa.length - fb.length;
    })
    .slice(0, 25);

  const items: any[] = [];
  const seen = new Set<string>();
  const pushRel = (item: any) => {
    const key = String(item.targetId || `${item.relationType}:${item.targetConcept}`);
    if (seen.has(key) || items.length >= 40) return;
    seen.add(key);
    items.push(item);
  };

  for (const lex of matched) {
    const lexForm = normalizePalochka(String(lex.form || '').trim());
    const lexIpa = String(lex.ipa || '').trim();
    const lexTr = pickTr(lex.translations?.tr);

    const roots = Array.isArray(lex.rootIds) && lex.rootIds.length ? lex.rootIds : (lex.rootId ? [lex.rootId] : []);
    for (const rId of roots) {
      const rootObj = rootsMap[String(rId)];
      const rootForm = pickForm(rootObj) || lexForm;
      const rootIpa = String(rootObj?.ipa || '').trim() || (rootForm === lexForm ? lexIpa : '');
      const rootTr = pickTr(rootObj?.translations?.tr || rootObj?.meaningTr || rootObj?.gloss);
      pushRel({
        targetId: `root-${rId}`,
        targetConcept: rId,
        code: rId,
        circassian: rootForm,
        ipa: rootIpa,
        turkishLabel: rootTr ? `Kök · ${rootTr}` : `Kök (${lexForm})`,
        relationType: 'ROOT',
        score: 0.98,
        href: `/sozluk/root/${encodeURIComponent(rId)}`,
        subtitle: `Kök · ${lexForm}`,
      });
    }

    if (lex.wordFamilyId) {
      const famObj = famMap[String(lex.wordFamilyId)];
      const famForm = pickForm(famObj) || lexForm;
      const famIpa = String(famObj?.ipa || '').trim() || (famForm === lexForm ? lexIpa : '');
      const famTr = pickTr(famObj?.translations?.tr || famObj?.meaningTr || famObj?.gloss);
      pushRel({
        targetId: `fam-${lex.wordFamilyId}`,
        targetConcept: lex.wordFamilyId,
        code: lex.wordFamilyId,
        circassian: famForm,
        ipa: famIpa,
        turkishLabel: famTr ? `Kelime Ailesi · ${famTr}` : `Kelime Ailesi (${lexForm})`,
        relationType: 'CHILD',
        score: 0.93,
        href: `/sozluk/family/${encodeURIComponent(lex.wordFamilyId)}`,
        subtitle: `Kelime Ailesi · ${lexForm}`,
      });
    }

    if (lex.dialectVariants?.adyghe && lex.dialectVariants?.kabardian &&
        lex.dialectVariants.adyghe !== lex.dialectVariants.kabardian) {
      pushRel({
        targetId: `var-${lex.id}`,
        targetConcept: `${lex.dialectVariants.adyghe} ↔ ${lex.dialectVariants.kabardian}`,
        code: String(lex.id),
        circassian: `${lex.dialectVariants.adyghe} ↔ ${lex.dialectVariants.kabardian}`,
        ipa: lexIpa,
        turkishLabel: lexTr ? `Lehçe Varyantı · ${lexTr}` : 'ADY ↔ KBD Lehçe Varyantı',
        relationType: 'DIALECT_VARIANT',
        score: 0.91,
        href: `/lexeme/${encodeURIComponent(lex.id)}`,
        subtitle: 'ADY ↔ KBD Lehçe Varyantı',
      });
    }

    if (lex.conceptId) {
      const trEntry = conceptTr[lex.conceptId] || conceptTr[String(lex.conceptId).toLowerCase()];
      const mappedTr = typeof trEntry === 'string' ? trEntry : trEntry?.tr || '';
      const bestTr = mappedTr || lexTr;
      pushRel({
        targetId: `con-${lex.conceptId}`,
        targetConcept: bestTr ? `${lex.conceptId} (${bestTr})` : lex.conceptId,
        code: lex.conceptId,
        circassian: lexForm,
        ipa: lexIpa,
        turkishLabel: bestTr ? `Kavram · ${bestTr}` : 'Kavram',
        relationType: 'RELATED',
        score: 0.87,
        href: `/kavram/${String(lex.conceptId).toLowerCase()}`,
        subtitle: `Kavram · ${lexForm}`,
      });
    }
  }

  return NextResponse.json({
    query: { rawQuery: rawQ || 'псы', normalizedText: qNorm },
    total: items.length,
    items,
  });
}
