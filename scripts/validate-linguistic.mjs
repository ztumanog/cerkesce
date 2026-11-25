#!/usr/bin/env node
/**
 * Linguistik Veri Dogrulama (CI & Lokal Kilidi)
 * =============================================
 * public/data/linguistic/{lexemes,roots,families}.json uzerinde
 * kanonik kurallari ve gerileme sinirlarini denetler.
 * Hata varsa exit code 1 ile cikar.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const LEXEMES_PATH = path.join(ROOT_DIR, 'public', 'data', 'linguistic', 'lexemes.json');
const ROOTS_PATH = path.join(ROOT_DIR, 'public', 'data', 'linguistic', 'roots.json');
const FAMILIES_PATH = path.join(ROOT_DIR, 'public', 'data', 'linguistic', 'families.json');
const WORD_FAMILIES_PATH = path.join(ROOT_DIR, 'public', 'data', 'linguistic', 'word_families.json');

const ALLOWED_POS = new Set([
  'noun', 'verb', 'adj', 'adv', 'phrase', 'propn', 'interj',
  'num', 'part', 'pron', 'prefix', 'adp', 'symbol', 'conj',
]);
const ALLOWED_DIALECTS = new Set(['KBD', 'ADY', 'COMMON']);

// Baseline ust sinirlari (gerilemeyi engeller)
// Not: 2026-11-25 05:25 civari paralel kurasyon +47 yeni lexeme (40842 -> 40889) ekledi;
// ROOT-AUGMENT-001 B2 (-36 root bos) sonrasi guncel baz cizgi asagidadir.
// 2026-11-25 (Bas Mimar talimati): MAX_WF_EMPTY 3132 dogrulandi, root bazlari
// 6955 -> 6991 ve 4948 -> 4984 olarak guncellendi (devam eden kuration payi).
const MAX_POS_EMPTY = 0;
const MAX_WF_EMPTY = 3132;
const MAX_ROOT_EMPTY = 6991;
const MAX_ROOT_EMPTY_NATIVE = 4984;

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

const lexemes = readJson(LEXEMES_PATH);
const roots = readJson(ROOTS_PATH);
const rootIdSet = new Set(roots.map((r) => r.id));

const seenIds = new Set();
let dupIds = 0;
let missingCore = 0;
let badDialect = 0;
let badPos = 0;
let posMismatch = 0;
let posEmpty = 0;
let rootIdMissingWhenRids = 0;
let rootIdMismatch = 0;
let brokenRootRef = 0;
let wfEmpty = 0;
let rootEmpty = 0;
let rootEmptyNative = 0;

for (const x of lexemes) {
  const id = x?.id;
  if (!id) {
    missingCore += 1;
    continue;
  }
  if (seenIds.has(id)) dupIds += 1;
  seenIds.add(id);

  if (!x.form || !x.meaning || !Array.isArray(x.senses) || x.senses.length === 0) {
    missingCore += 1;
  }
  if (!ALLOWED_DIALECTS.has(x.dialect)) {
    badDialect += 1;
  }

  const p = x.pos;
  const po = x.partOfSpeech;
  if (!p && !po) {
    posEmpty += 1;
  } else {
    if (!ALLOWED_POS.has(p)) badPos += 1;
    if (p !== po) posMismatch += 1;
  }

  const rid = x.rootId;
  const rids = Array.isArray(x.rootIds) ? x.rootIds : [];
  if (rids.length > 0) {
    if (!rid) rootIdMissingWhenRids += 1;
    else if (rid !== rids[0]) rootIdMismatch += 1;
    for (const r of rids) {
      if (!rootIdSet.has(r)) brokenRootRef += 1;
    }
  }
  if (rid && !rootIdSet.has(rid)) {
    brokenRootRef += 1;
  }

  if (!rid && rids.length === 0) {
    rootEmpty += 1;
    if (x.etymologyType !== 'loanword') {
      rootEmptyNative += 1;
    }
  }

  if (!x.wordFamilyId) {
    wfEmpty += 1;
  }
}

const checks = [
  ['Mukerrer ID', dupIds, 0],
  ['Eksik cekirdek alan (id/form/meaning/senses)', missingCore, 0],
  ['Gecersiz dialect', badDialect, 0],
  ['Gecersiz POS etiketi', badPos, 0],
  ['POS catismasi (pos != partOfSpeech)', posMismatch, 0],
  ['rootId bos ama rootIds dolu', rootIdMissingWhenRids, 0],
  ['rootId != rootIds[0]', rootIdMismatch, 0],
  ['Kirik rootId/rootIds referansi', brokenRootRef, 0],
  [`Bos POS (baseline <= ${MAX_POS_EMPTY})`, posEmpty, MAX_POS_EMPTY],
  [`Bos wordFamilyId (baseline <= ${MAX_WF_EMPTY})`, wfEmpty, MAX_WF_EMPTY],
  [`Bos rootId ham (baseline <= ${MAX_ROOT_EMPTY})`, rootEmpty, MAX_ROOT_EMPTY],
  [`Bos rootId native (baseline <= ${MAX_ROOT_EMPTY_NATIVE})`, rootEmptyNative, MAX_ROOT_EMPTY_NATIVE],
];

if (fs.existsSync(FAMILIES_PATH)) {
  const families = readJson(FAMILIES_PATH);
  const famIds = new Set(families.map((f) => f.id));
  let brokenWfRef = 0;
  for (const x of lexemes) {
    if (x.wordFamilyId && !famIds.has(x.wordFamilyId)) brokenWfRef += 1;
  }
  checks.push(['Kirik wordFamilyId (families.json)', brokenWfRef, 0]);
}

if (fs.existsSync(WORD_FAMILIES_PATH)) {
  const wfRaw = readJson(WORD_FAMILIES_PATH);
  const wfList = Array.isArray(wfRaw) ? wfRaw : (wfRaw.families || []);
  const wfIds = new Set(wfList.map((f) => f.id));
  let brokenLegacyWf = 0;
  for (const x of lexemes) {
    if (x.wordFamilyId && !wfIds.has(x.wordFamilyId)) brokenLegacyWf += 1;
  }
  checks.push(['Kirik wordFamilyId (word_families.json)', brokenLegacyWf, 0]);
}

console.log('='.repeat(60));
console.log(`VALIDATE LINGUISTIC (${lexemes.length} lexeme, ${roots.length} root)`);
console.log('='.repeat(60));

let failed = false;
for (const [label, val, limit] of checks) {
  const ok = val <= limit;
  if (!ok) failed = true;
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${label.padEnd(48)}: ${val} (limit <= ${limit})`);
}

if (failed) {
  console.error('\nSONUC: BASARISIZ');
  process.exit(1);
}
console.log('\nSONUC: TUM KONTROLLER GECTI');
