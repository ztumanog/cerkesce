import fs from 'fs';
import path from 'path';

const LING_DIR = path.resolve('./public/data/linguistic');
const APPLY_MODE = process.argv.includes('--apply');
const PALOCHKA_ALL_REGEX = /(?<=[А-Яа-яЁёӀӏ])[1Ilӏ]|(?=[А-Яа-яЁёӀӏ])[1Ilӏ]/g;

function fixPalochka(str) {
  if (typeof str !== 'string') return str;
  return str.normalize('NFC').replace(PALOCHKA_ALL_REGEX, '\u04C0');
}

function deepFixPalochka(node, counter) {
  if (typeof node === 'string') {
    const fixed = fixPalochka(node);
    if (fixed !== node) counter.count++;
    return fixed;
  }
  if (Array.isArray(node)) {
    return node.map(item => deepFixPalochka(item, counter));
  }
  if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      node[key] = deepFixPalochka(node[key], counter);
    }
  }
  return node;
}

function readJsonClean(filename) {
  const raw = fs.readFileSync(path.join(LING_DIR, filename), 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

// 1. Ana lexemes.json verisinden kök ve kelime ailesi kümelerini çıkar
const lexemesRaw = readJsonClean('lexemes.json');
const lexemes = Array.isArray(lexemesRaw) ? lexemesRaw : (lexemesRaw.lexemes || lexemesRaw.items || []);

const lexemeIdSet = new Set(lexemes.map(l => l.id));
const rootGroups = new Map();
const wfGroups = new Map();

for (const lex of lexemes) {
  if (lex.rootId && lex.rootId !== 'R-UNCLEAR') {
    if (!rootGroups.has(lex.rootId)) {
      rootGroups.set(lex.rootId, { forms: new Map(), meanings: new Map(), concepts: new Set(), lexemeIds: [], dialects: new Set() });
    }
    const rg = rootGroups.get(lex.rootId);
    rg.lexemeIds.push(lex.id);
    if (lex.conceptId && lex.conceptId !== 'UNCLASSIFIED') rg.concepts.add(lex.conceptId);
    if (lex.dialect) rg.dialects.add(lex.dialect);

    const rawStem = fixPalochka((lex.root || lex.rootForm || '').replace(/^[-–—]+|[-–—]+$/g, '').trim());
    if (rawStem) rg.forms.set(rawStem, (rg.forms.get(rawStem) || 0) + 1);

    const gloss = lex.literalMeaning || (Array.isArray(lex.translations?.tr) ? lex.translations.tr[0] : lex.translations?.tr) || (Array.isArray(lex.translations?.en) ? lex.translations.en[0] : lex.translations?.en);
    if (gloss && typeof gloss === 'string') {
      const cleanGloss = fixPalochka(gloss.trim());
      if (cleanGloss) rg.meanings.set(cleanGloss, (rg.meanings.get(cleanGloss) || 0) + 1);
    }
  }

  if (lex.wordFamilyId && lex.wordFamilyId !== 'WF-UNCLEAR') {
    if (!wfGroups.has(lex.wordFamilyId)) {
      wfGroups.set(lex.wordFamilyId, { rootIds: new Map(), concepts: new Set(), morphemes: new Set(), lexemeIds: [] });
    }
    const wg = wfGroups.get(lex.wordFamilyId);
    wg.lexemeIds.push(lex.id);
    if (lex.conceptId && lex.conceptId !== 'UNCLASSIFIED') wg.concepts.add(lex.conceptId);
    if (lex.rootId && lex.rootId !== 'R-UNCLEAR') {
      wg.rootIds.set(lex.rootId, (wg.rootIds.get(lex.rootId) || 0) + 1);
    }
    if (Array.isArray(lex.derivation?.morphemeIds)) {
      for (const mId of lex.derivation.morphemeIds) wg.morphemes.add(mId);
    }
  }
}

function mostFrequent(map, fallback = '') {
  let best = fallback, max = 0;
  for (const [k, v] of map.entries()) {
    if (v > max) { max = v; best = k; }
  }
  return best;
}

// 2. roots.json senkronizasyonu
const rootsCounter = { count: 0 };
const roots = deepFixPalochka(readJsonClean('roots.json'), rootsCounter);
const existingRootMap = new Map(roots.map(r => [r.id, r]));
let rootsAdded = 0, rootsUpdated = 0, rootsDanglingRemoved = 0;

for (const r of roots) {
  if (Array.isArray(r.lexemeIds)) {
    const before = r.lexemeIds.length;
    r.lexemeIds = r.lexemeIds.filter(id => lexemeIdSet.has(id));
    rootsDanglingRemoved += before - r.lexemeIds.length;
  }
  const grp = rootGroups.get(r.id);
  if (grp) {
    const mergedIds = Array.from(new Set([...(r.lexemeIds || []), ...grp.lexemeIds]));
    if (!r.lexemeIds || mergedIds.length !== r.lexemeIds.length) {
      r.lexemeIds = mergedIds;
      rootsUpdated++;
    }
  }
}

for (const [rootId, grp] of rootGroups.entries()) {
  if (existingRootMap.has(rootId)) continue;
  const bestForm = mostFrequent(grp.forms, rootId.slice(2).toLowerCase());
  const bestMeaning = mostFrequent(grp.meanings, '(türetilmiş kök)');
  roots.push({
    id: rootId,
    form: bestForm,
    ipa: '',
    primaryMeaning: bestMeaning,
    secondaryMeanings: [],
    semanticDomains: Array.from(grp.concepts).slice(0, 8),
    lexemeIds: grp.lexemeIds,
    productivity: {
      lexemeCount: grp.lexemeIds.length,
      conceptCount: grp.concepts.size,
    },
    _source: 'lexemes-sync-2026',
  });
  rootsAdded++;
}

const validRootIdSet = new Set(roots.map(r => r.id));

// 3. word_families.json senkronizasyonu
const wfCounter = { count: 0 };
const wordFamilies = deepFixPalochka(readJsonClean('word_families.json'), wfCounter);
const existingWfMap = new Map(wordFamilies.map(wf => [wf.id, wf]));
let wfAdded = 0, wfUpdated = 0, wfDanglingLexRemoved = 0, wfDanglingRootCleared = 0;

for (const wf of wordFamilies) {
  if (wf.rootId && !validRootIdSet.has(wf.rootId)) {
    const candidateRoot = `R-${wf.id.slice(3)}`;
    if (validRootIdSet.has(candidateRoot)) {
      wf.rootId = candidateRoot;
    } else {
      delete wf.rootId;
      wfDanglingRootCleared++;
    }
  }
  if (Array.isArray(wf.lexemeIds)) {
    const before = wf.lexemeIds.length;
    wf.lexemeIds = wf.lexemeIds.filter(id => lexemeIdSet.has(id));
    wfDanglingLexRemoved += before - wf.lexemeIds.length;
  }
  const grp = wfGroups.get(wf.id);
  if (grp) {
    const mergedIds = Array.from(new Set([...(wf.lexemeIds || []), ...grp.lexemeIds]));
    const mergedConcepts = Array.from(new Set([...(wf.conceptIds || []), ...grp.concepts]));
    if (!wf.lexemeIds || mergedIds.length !== wf.lexemeIds.length || mergedConcepts.length !== (wf.conceptIds || []).length) {
      wf.lexemeIds = mergedIds;
      wf.conceptIds = mergedConcepts;
      wfUpdated++;
    }
  }
}

for (const [wfId, grp] of wfGroups.entries()) {
  if (existingWfMap.has(wfId)) continue;
  const candidateRoot = mostFrequent(grp.rootIds, `R-${wfId.slice(3)}`);
  const resolvedRootId = validRootIdSet.has(candidateRoot) ? candidateRoot : undefined;
  const rootObj = resolvedRootId ? roots.find(r => r.id === resolvedRootId) : null;

  wordFamilies.push({
    id: wfId,
    ...(resolvedRootId ? { rootId: resolvedRootId } : {}),
    conceptIds: Array.from(grp.concepts),
    morphemeIds: Array.from(grp.morphemes),
    lexemeIds: grp.lexemeIds,
    notes: rootObj ? `${rootObj.primaryMeaning} ailesi (${rootObj.form}).` : `${wfId} kelime ailesi.`,
    productivity: {
      totalLexemes: grp.lexemeIds.length,
    },
    _source: 'lexemes-sync-2026',
  });
  wfAdded++;
}

// 4. lexeme_roots.json & morphemes.json Palochka ve kırık referans temizliği
const lrCounter = { count: 0 };
const lexemeRoots = deepFixPalochka(readJsonClean('lexeme_roots.json'), lrCounter);

const morphCounter = { count: 0 };
const morphemes = deepFixPalochka(readJsonClean('morphemes.json'), morphCounter);
let morphDanglingRemoved = 0;
for (const m of morphemes) {
  if (Array.isArray(m.exampleLexemeIds)) {
    const before = m.exampleLexemeIds.length;
    m.exampleLexemeIds = m.exampleLexemeIds.filter(id => lexemeIdSet.has(id));
    morphDanglingRemoved += before - m.exampleLexemeIds.length;
  }
}

const summary = {
  "roots.json": { totalAfter: roots.length, added: rootsAdded, updated: rootsUpdated, danglingRemoved: rootsDanglingRemoved, palochkaFixed: rootsCounter.count },
  "word_families.json": { totalAfter: wordFamilies.length, added: wfAdded, updated: wfUpdated, danglingLexRemoved: wfDanglingLexRemoved, danglingRootCleared: wfDanglingRootCleared, palochkaFixed: wfCounter.count },
  "lexeme_roots.json": { totalAfter: lexemeRoots.length, palochkaFixed: lrCounter.count },
  "morphemes.json": { totalAfter: morphemes.length, danglingExampleRemoved: morphDanglingRemoved, palochkaFixed: morphCounter.count },
};

console.log(APPLY_MODE ? '=== UYDU İNDEKS SENKRONİZASYONU (KAYDEDİLDİ) ===' : '=== UYDU İNDEKS SENKRONİZASYONU DRY-RUN ÖNİZLEME ===');
console.log(JSON.stringify(summary, null, 2));

if (APPLY_MODE) {
  const ts = Date.now();
  const targets = [
    ['roots.json', roots],
    ['word_families.json', wordFamilies],
    ['lexeme_roots.json', lexemeRoots],
    ['morphemes.json', morphemes],
  ];
  for (const [name, data] of targets) {
    const full = path.join(LING_DIR, name);
    fs.copyFileSync(full, `${full}.sync-backup-${ts}`);
    fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8');
  }
  console.log(`\n✅ 4 uydu indeks dosyası yedeklenerek güncellendi (timestamp: ${ts}).`);
} else {
  console.log('\nℹ️ Uygulamak için: node scripts/sync-satellite-indexes.mjs --apply');
}