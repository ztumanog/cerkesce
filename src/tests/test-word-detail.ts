/**
 * File: scripts/test-word-detail.ts
 * Generated: 2026-10-05
 * Layer: Script (Test)
 * Purpose: D-1 Word Detail endpoint'i için veri toplama testi
 *
 * Kullanım: npx tsx scripts/test-word-detail.ts псы
 */

import fs from 'fs';
import path from 'path';

const WORD = process.argv[2] || 'псы';

// ============================================================
// 1. Lexemes
// ============================================================
function loadLexemes() {
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function findLexeme(word: string) {
  const lexemes = loadLexemes();
  return lexemes.find((l: any) => l.form === word) || null;
}

// ============================================================
// 2. Roots
// ============================================================
function loadRoots() {
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'roots.json');
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function findRoot(rootId: string) {
  const roots = loadRoots();
  return roots.find((r: any) => r.id === rootId) || null;
}

// ============================================================
// 3. Word Families
// ============================================================
function loadWordFamilies() {
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'word_families.json');
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function findWordFamily(familyId: string) {
  const families = loadWordFamilies();
  return families.find((f: any) => f.id === familyId) || null;
}

function findFamilyMembers(familyId: string) {
  const lexemes = loadLexemes();
  return lexemes
    .filter((l: any) => l.wordFamilyId === familyId)
    .map((l: any) => ({
      id: l.id,
      form: l.form,
      literalMeaning: l.literalMeaning,
      partOfSpeech: l.partOfSpeech,
    }));
}

// ============================================================
// 4. Concepts
// ============================================================
function loadConceptMapping() {
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'concept_mapping.json');
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function findConceptUlid(conceptName: string) {
  const mapping = loadConceptMapping();
  return mapping[conceptName] || null;
}

// ============================================================
// 5. Dictionaries (Çok Dilli Anlamlar)
// ============================================================
interface DictionaryManifest {
  file: string;
  title: string;
  dialect: string;
  sourceLanguage: string;
  targetLanguage: string;
}

function loadManifest(): DictionaryManifest[] {
  const p = path.join(process.cwd(), 'public', 'data', 'dictionaries.json');
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function stripHtml(html: string): string {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMeaningsFromDictionary(file: string, word: string): string[] {
  const p = path.join(process.cwd(), 'public', 'data', file);
  if (!fs.existsSync(p)) return [];

  const parsed = JSON.parse(fs.readFileSync(p, 'utf-8'));
  const words = parsed.words || parsed.entries || parsed.items || parsed.data;
  if (!words || typeof words !== 'object') return [];

  const entry = words[word];
  if (!entry) return [];

  const meanings: string[] = [];

  // definitions[].meaning
  if (Array.isArray(entry.definitions)) {
    for (const def of entry.definitions) {
      if (def?.meaning) meanings.push(String(def.meaning).trim());
    }
  }

  // full_definition_in_html
  if (entry.full_definition_in_html) {
    const clean = stripHtml(entry.full_definition_in_html);
    if (clean) {
      const parts = clean.split(/[\/،,;]+/).map((s) => s.trim()).filter(Boolean);
      meanings.push(...parts);
    }
  }

  return [...new Set(meanings)];
}

function collectMeaningsByLanguage(word: string) {
  const manifest = loadManifest();
  const byLanguage: Record<string, Set<string>> = {};
  const sources: any[] = [];

  for (const dict of manifest) {
    const meanings = extractMeaningsFromDictionary(dict.file, word);
    if (meanings.length === 0) continue;

    const lang = (dict.targetLanguage || '').toUpperCase();
    if (!byLanguage[lang]) byLanguage[lang] = new Set();
    for (const m of meanings) byLanguage[lang].add(m);

    sources.push({
      dictionary: dict.title,
      file: dict.file,
      sourceLanguage: dict.sourceLanguage,
      targetLanguage: dict.targetLanguage,
      meanings,
    });
  }

  const result: Record<string, string[]> = {};
  for (const [lang, set] of Object.entries(byLanguage)) {
    result[lang] = Array.from(set);
  }
  return { meanings: result, sources };
}

// ============================================================
// ANA FONKSİYON
// ============================================================
function buildWordDetail(word: string) {
  const lexeme = findLexeme(word);
  if (!lexeme) {
    return { error: `Lexeme bulunamadi: ${word}` };
  }

  const rootId = lexeme.derivation?.rootIds?.[0];
  const root = rootId ? findRoot(rootId) : null;

  const family = lexeme.wordFamilyId ? findWordFamily(lexeme.wordFamilyId) : null;
  const familyMembers = lexeme.wordFamilyId ? findFamilyMembers(lexeme.wordFamilyId) : [];

  const conceptUlid = lexeme.conceptId ? findConceptUlid(lexeme.conceptId) : null;

  const { meanings, sources } = collectMeaningsByLanguage(word);

  return {
    word,
    lexeme: {
      id: lexeme.id,
      form: lexeme.form,
      ipa: lexeme.ipa,
      literalMeaning: lexeme.literalMeaning,
      partOfSpeech: lexeme.partOfSpeech,
      corpusFrequency: lexeme.corpusFrequency,
      corpusFrequencyAdy: lexeme.corpusFrequencyAdy,
      corpusFrequencyKbd: lexeme.corpusFrequencyKbd,
      notes: lexeme.notes,
      dialectVariants: lexeme.dialectVariants,
    },
    root: root
      ? {
          id: root.id,
          form: root.form,
          ipa: root.ipa,
          primaryMeaning: root.primaryMeaning,
          secondaryMeanings: root.secondaryMeanings,
          semanticDomains: root.semanticDomains,
          productivity: root.productivity,
        }
      : null,
    wordFamily: family
      ? {
          id: family.id,
          rootId: family.rootId,
          members: familyMembers,
          productivity: family.productivity,
          category: family.category,
          subcategory: family.subcategory,
          semanticDomains: family.semanticDomains,
        }
      : null,
    concept: lexeme.conceptId
      ? {
          name: lexeme.conceptId,
          ulid: conceptUlid,
        }
      : null,
    meanings,
    sources,
    dictionaryEvidence: lexeme.dictionaryEvidence,
    corpusEvidence: lexeme.corpusEvidence,
  };
}

// ============================================================
// ÇALIŞTIR
// ============================================================
const result = buildWordDetail(WORD);
console.log(JSON.stringify(result, null, 2));