import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MorphologyAnalyzer } from '../src/domain/morphology/MorphologyAnalyzer';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'public', 'data', 'linguistic');
const OUT_DIR = path.join(ROOT, '_scripts', 'out');

const FILES = ['lexemes.json', 'roots.json', 'morphemes.json'];
const PREFIXES = ['нэ', 'дэ', 'мэ'];

const EXTRACTOR_ENABLED = false;
const FALLBACK_AS_ROOT = false;

const KIRIL_RE = /[\u0400-\u04FF]/;
const LATIN_RE = /[A-Za-z]/;

function readJson(name: string): any {
  const text = fs.readFileSync(path.join(DATA, name), 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(text);
}

function limitArg(): number | null {
  const i = process.argv.indexOf('--limit');
  if (i === -1) return null;
  const n = Number(process.argv[i + 1]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function normalizeForm(form: string): string {
  return form.trim().replace(/I/g, '\u04C0');
}

function norm(s: string | null | undefined): string | null {
  return s ? s.trim().replace(/I/g, '\u04C0') : null;
}

interface RootFormsByAlphabet {
  kiril: Set<string>;
  latin: Set<string>;
  other: Set<string>;
  formCounts: Map<string, number>;
}

function buildRootForms(roots: any[]): RootFormsByAlphabet {
  const kiril = new Set<string>();
  const latin = new Set<string>();
  const other = new Set<string>();
  const formCounts = new Map<string, number>();
  for (const r of roots) {
    const f = r.form;
    if (typeof f !== 'string' || f.length === 0) continue;
    formCounts.set(f, (formCounts.get(f) ?? 0) + 1);
    if (KIRIL_RE.test(f)) kiril.add(f);
    else if (LATIN_RE.test(f)) latin.add(f);
    else other.add(f);
  }
  return { kiril, latin, other, formCounts };
}

function computeFlags(
  form: string,
  analyzerRootRaw: string | null,
  extractorRootForm: string | null,
  method: string | null,
  rf: RootFormsByAlphabet
): { flags: string[]; effectiveAnalyzerRoot: string | null } {
  const flags: string[] = [];
  const isFallback = method === 'fallback';
  const analyzerRoot = isFallback && !FALLBACK_AS_ROOT ? null : analyzerRootRaw;

  if (isFallback && analyzerRootRaw) flags.push('fallback_tahmin');

  if (method === 'unverified') flags.push('dogrulanmamis_kok');

  if (method === 'ambiguous') flags.push('belirsiz_kok');
  if (!analyzerRoot && !extractorRootForm) flags.push('kok_yok');

  if (analyzerRoot) {
    let set: Set<string> | null = null;
    if (KIRIL_RE.test(analyzerRoot)) set = rf.kiril;
    else if (LATIN_RE.test(analyzerRoot)) set = rf.latin;
    else set = rf.other;
    if (set && !set.has(analyzerRoot) && method !== 'unverified' && method !== 'ambiguous') flags.push('sozlukte_yok');
    if (set && set.has(analyzerRoot) && (rf.formCounts.get(analyzerRoot) ?? 0) > 1) {
      flags.push('duplike_kok');
    }
  }

  if (/\s/.test(form)) flags.push('cok_sozcuklu');

  const prefix = [...PREFIXES]
    .sort((a, b) => b.length - a.length)
    .find((p) => form.startsWith(p) && form.length - p.length >= 3);
  if (prefix) flags.push('onek_supheli');
  if (prefix && analyzerRoot) {
    const set = KIRIL_RE.test(analyzerRoot) ? rf.kiril : rf.latin;
    if (set.has(analyzerRoot)) flags.push('onek_kok_listede');
  }

  if (EXTRACTOR_ENABLED) {
    if (analyzerRoot && extractorRootForm && norm(analyzerRoot) !== norm(extractorRootForm)) {
      flags.push('kaynak_celiskisi');
    }
    if ([analyzerRoot, extractorRootForm].some((r) => r && LATIN_RE.test(r) && KIRIL_RE.test(form))) {
      flags.push('yazi_uyumsuz');
    }
  }

  return { flags, effectiveAnalyzerRoot: analyzerRoot };
}

function main() {
  const started = new Date();
  const lexemes = readJson('lexemes.json');
  const roots = readJson('roots.json');
  const lexemeRoots = readJson('lexeme_roots.json');
  const morphemes = readJson('morphemes.json');

  const allRoots = [...roots, ...lexemeRoots];
  const rf = buildRootForms(allRoots);
  const analyzer = new MorphologyAnalyzer([], allRoots, morphemes, lexemes, true);

  let unlinked = lexemes.filter((l: any) => !l.wordFamilyId);
  const limit = limitArg();
  if (limit) unlinked = unlinked.slice(0, limit);

  let normalizedCount = 0;
  let errorCount = 0;
  let multiWordSkipped = 0;
  const flagCounts: Record<string, number> = {};
  const rows: any[] = [];

  for (const l of unlinked) {
    const original = String(l.form ?? '');
    const analysisForm = normalizeForm(original);
    if (analysisForm !== original) normalizedCount++;

    if (/\s/.test(analysisForm)) {
      multiWordSkipped++;
      const flags = ['cok_sozcuklu'];
      flagCounts['cok_sozcuklu'] = (flagCounts['cok_sozcuklu'] ?? 0) + 1;
      rows.push({
        lexemeId: l.id, form: original, analysisForm,
        pos: l.pos ?? l.partOfSpeech ?? null, existingRootIds: l.rootIds ?? [],
        hasRoot: Array.isArray(l.rootIds) && l.rootIds.length > 0,
        analyzerRoot: null, analyzerRootRaw: null,
        method: 'skipped', confidence: 0, source: null,
        extractorRootId: null, extractorRootForm: null,
        extractorMethod: null, extractorEvidence: null,
        bayraklar: flags,
      });
      continue;
    }

    const hasRoot = Array.isArray(l.rootIds) && l.rootIds.length > 0;
    try {
      const r = analyzer.analyze(analysisForm);
      const analyzerRootRaw = r.root ?? null;
      const extractorRootForm = r.rootExtractor?.rootForm ?? null;
      const { flags, effectiveAnalyzerRoot } = computeFlags(
        analysisForm, analyzerRootRaw, extractorRootForm, r.method, rf
      );
      for (const f of flags) flagCounts[f] = (flagCounts[f] ?? 0) + 1;

      rows.push({
        lexemeId: l.id, form: original, analysisForm,
        pos: l.pos ?? l.partOfSpeech ?? null, existingRootIds: l.rootIds ?? [],
        hasRoot,
        analyzerRoot: effectiveAnalyzerRoot,
        analyzerRootRaw,
        method: r.method,
        confidence: r.confidence,
        source: r.source ?? null,
        extractorRootId: r.rootExtractor?.rootId ?? null,
        extractorRootForm,
        extractorMethod: r.rootExtractor?.method ?? null,
        extractorEvidence: r.rootExtractor?.evidence ?? null,
        bayraklar: flags,
      });
    } catch (e: any) {
      errorCount++;
      rows.push({ lexemeId: l.id, form: original, error: String(e?.message ?? e) });
    }
  }

  const meta = {
    startedAt: started.toISOString(),
    limit,
    extractorEnabled: EXTRACTOR_ENABLED,
    fallbackAsRoot: FALLBACK_AS_ROOT,
    rootsByAlphabet: {
      kiril: rf.kiril.size,
      latin: rf.latin.size,
      other: rf.other.size,
      duplicateForms: [...rf.formCounts.entries()].filter(([_, n]) => n > 1).length,
    },
    totals: {
      lexemes: lexemes.length,
      unlinked: lexemes.filter((l: any) => !l.wordFamilyId).length,
      processed: unlinked.length,
      normalizedForms: normalizedCount,
      multiWordSkipped,
      errors: errorCount,
    },
    flagCounts,
    sources: FILES.map((f) => {
      const st = fs.statSync(path.join(DATA, f));
      return { file: f, bytes: st.size, modified: st.mtime.toISOString() };
    }),
    analyzerRootCount: roots.length,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = started.toISOString().replace(/[:.]/g, '-');
  const outPath = path.join(OUT_DIR, `morph_bridge_${stamp}.json`);
  fs.writeFileSync(outPath, JSON.stringify({ meta, rows }, null, 2), 'utf8');

  console.log(JSON.stringify({ totals: meta.totals, rootsByAlphabet: meta.rootsByAlphabet, flagCounts }, null, 2));
  console.log(`Çıktı: ${outPath}`);
}

main();
