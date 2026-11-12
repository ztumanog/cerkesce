// Sprint 2A.1 + 2A.3 + S2-005 + DDD Value Object Entegrasyonu
// SSoT: public/data/linguistic/lexemes.json (ADR-LEX-001)
// S2-005: Referans + Value Object validasyonu + reason/editor zorunlulugu + backup + audit

import fs from "fs";
import path from "path";
import {
  ConceptId,
  RootValue,
  WordFamilyId,
  LexemeIdentity,
  type LexemeDialect,
} from "@/domain/shared/value-objects";

// ============================================================
// TIPLER
// ============================================================

export interface LexemeSummary {
  id: string;
  form: string;
  dialect?: LexemeDialect;
  rootIds: string[];
  wordFamilyId: string;
  conceptId?: string;
  partOfSpeech?: string;
  ipa?: string;
  technicalDebt?: boolean;
}

export interface LexemePatch {
  form?: string;
  dialect?: LexemeDialect | string;
  rootIds?: string[];
  wordFamilyId?: string;
  conceptId?: string;
  partOfSpeech?: string;
  ipa?: string;
  technicalDebt?: boolean;
  notes?: string;
}

export interface ApplyOptions {
  reason: string;   // S2-005 T4: zorunlu
  editor: string;   // S2-005 T5: zorunlu
  dryRun?: boolean;
}

export interface ApplyResult {
  success: boolean;
  error?: string;
  dryRun?: boolean;
  diff?: { field: string; oldValue: any; newValue: any }[];
  appliedFields?: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ============================================================
// YOLLAR
// ============================================================

const DATA_DIR = path.join(process.cwd(), "public", "data", "linguistic");
const LEXEMES_PATH = path.join(DATA_DIR, "lexemes.json");
const ROOTS_PATH = path.join(DATA_DIR, "roots.json");
const FAMILIES_PATH = path.join(DATA_DIR, "word_families.json");
const AUDIT_LOG_PATH = path.join(DATA_DIR, "audit_log.jsonl");

// ============================================================
// OKUMA KATMANI (2A.1 + Value Object Normalizasyonu)
// ============================================================

let cache: LexemeSummary[] | null = null;
let rawCache: any[] | null = null;
let cacheMtime = 0;

function safeDialect(raw: unknown): LexemeDialect | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  try {
    return LexemeIdentity.normalizeDialect(raw);
  } catch {
    return undefined;
  }
}

export function getAllLexemes(): LexemeSummary[] {
  const stat = fs.statSync(LEXEMES_PATH);
  if (cache && stat.mtimeMs === cacheMtime) return cache;

  const raw = fs.readFileSync(LEXEMES_PATH, "utf-8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);
  const list: any[] = Array.isArray(data) ? data : data.lexemes ?? [];

  rawCache = list;
  cache = list.map((l: any) => ({
    id: String(l.id ?? ""),
    form: String(l.form ?? ""),
    dialect: safeDialect(l.dialect),
    rootIds: Array.isArray(l.rootIds) ? l.rootIds.map(String) : [],
    wordFamilyId: String(l.wordFamilyId ?? ""),
    conceptId: l.conceptId ? String(l.conceptId) : undefined,
    partOfSpeech: l.partOfSpeech ? String(l.partOfSpeech) : undefined,
    ipa: l.ipa ? String(l.ipa) : undefined,
    technicalDebt: !!l.technicalDebt,
  }));
  cacheMtime = stat.mtimeMs;
  return cache;
}

export function getLexemeById(id: string): LexemeSummary | undefined {
  return getAllLexemes().find((l) => l.id === id);
}

export function getRawLexeme(id: string): any | undefined {
  getAllLexemes();
  return rawCache?.find((l: any) => l.id === id);
}

// ============================================================
// REFERANS & VALUE OBJECT VALIDASYONU (S2-005 + DDD)
// ============================================================

let rootIdSet: Set<string> | null = null;
let rootMtime = 0;
let familyIdSet: Set<string> | null = null;
let familyMtime = 0;

function getRootIdSet(): Set<string> {
  const stat = fs.statSync(ROOTS_PATH);
  if (rootIdSet && stat.mtimeMs === rootMtime) return rootIdSet;
  const data = JSON.parse(fs.readFileSync(ROOTS_PATH, "utf-8").replace(/^\uFEFF/, ""));
  const list: any[] = Array.isArray(data) ? data : data.roots ?? [];
  rootIdSet = new Set(list.map((r: any) => String(r.id ?? r)));
  rootMtime = stat.mtimeMs;
  return rootIdSet;
}

function getFamilyIdSet(): Set<string> {
  const stat = fs.statSync(FAMILIES_PATH);
  if (familyIdSet && stat.mtimeMs === familyMtime) return familyIdSet;
  const data = JSON.parse(fs.readFileSync(FAMILIES_PATH, "utf-8").replace(/^\uFEFF/, ""));
  const list: any[] = Array.isArray(data)
    ? data
    : data.families ?? data.wordFamilies ?? data.items ?? [];
  familyIdSet = new Set(list.map((f: any) => String(f.id)));
  familyMtime = stat.mtimeMs;
  return familyIdSet;
}

export function validateReferences(patch: LexemePatch): ValidationResult {
  const errors: string[] = [];

  if (patch.form !== undefined) {
    const normalized = RootValue.normalizeCyrillic(String(patch.form));
    if (!normalized) {
      errors.push("form cannot be empty");
    }
  }

  if (patch.dialect !== undefined) {
    try {
      LexemeIdentity.normalizeDialect(String(patch.dialect));
    } catch (err: any) {
      errors.push(err?.message ?? `Invalid dialect: ${patch.dialect}`);
    }
  }

  if (patch.conceptId !== undefined) {
    try {
      ConceptId.create(String(patch.conceptId));
    } catch (err: any) {
      errors.push(err?.message ?? `Invalid conceptId: ${patch.conceptId}`);
    }
  }

  if (patch.rootIds !== undefined) {
    if (!Array.isArray(patch.rootIds)) {
      errors.push("rootIds must be an array");
    } else {
      const roots = getRootIdSet();
      for (const rid of patch.rootIds) {
        const cleanRid = String(rid).trim().toUpperCase();
        if (!/^R-[A-Z0-9_-]+$/.test(cleanRid)) {
          errors.push(`Invalid rootId format: ${rid}`);
        } else if (!roots.has(cleanRid)) {
          errors.push(`Root not found: ${rid}`);
        }
      }
    }
  }

  if (patch.wordFamilyId !== undefined) {
    try {
      const wf = WordFamilyId.create(String(patch.wordFamilyId));
      const fams = getFamilyIdSet();
      if (!fams.has(wf.value)) {
        errors.push(`WordFamily not found: ${patch.wordFamilyId}`);
      }
    } catch (err: any) {
      errors.push(err?.message ?? `Invalid wordFamilyId: ${patch.wordFamilyId}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

function normalizePatchWithValueObjects(patch: LexemePatch): LexemePatch {
  const normalized: LexemePatch = { ...patch };

  if (normalized.form !== undefined) {
    normalized.form = RootValue.normalizeCyrillic(normalized.form);
  }
  if (normalized.dialect !== undefined) {
    normalized.dialect = LexemeIdentity.normalizeDialect(String(normalized.dialect));
  }
  if (normalized.conceptId !== undefined) {
    normalized.conceptId = ConceptId.create(normalized.conceptId).value;
  }
  if (normalized.wordFamilyId !== undefined) {
    normalized.wordFamilyId = WordFamilyId.create(normalized.wordFamilyId).value;
  }
  if (Array.isArray(normalized.rootIds)) {
    normalized.rootIds = normalized.rootIds.map((r) => String(r).trim().toUpperCase());
  }

  return normalized;
}

// ============================================================
// YAZMA KATMANI (2A.3 + S2-005 hardening + Value Object Guard)
// ============================================================

const ALLOWED_FIELDS: (keyof LexemePatch)[] = [
  "form",
  "dialect",
  "rootIds",
  "wordFamilyId",
  "conceptId",
  "partOfSpeech",
  "ipa",
  "technicalDebt",
  "notes",
];

export function updateLexeme(
  id: string,
  patch: LexemePatch,
  options: ApplyOptions
): ApplyResult {
  const reason = options.reason?.trim();
  if (!reason) {
    return { success: false, error: "Reason is required" };
  }

  const editor = options.editor?.trim();
  if (!editor) {
    return { success: false, error: "Editor is required" };
  }

  const unknown = Object.keys(patch).filter(
    (k) => !ALLOWED_FIELDS.includes(k as keyof LexemePatch)
  );
  if (unknown.length > 0) {
    return { success: false, error: `Unknown fields: ${unknown.join(", ")}` };
  }

  const validation = validateReferences(patch);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join("; ") };
  }

  const canonicalPatch = normalizePatchWithValueObjects(patch);

  const lexeme = getRawLexeme(id);
  if (!lexeme) {
    return { success: false, error: `Lexeme not found: ${id}` };
  }

  const diff: { field: string; oldValue: any; newValue: any }[] = [];
  for (const field of ALLOWED_FIELDS) {
    if (canonicalPatch[field] !== undefined) {
      const oldValue = (lexeme as any)[field];
      const newValue = canonicalPatch[field];
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        diff.push({ field, oldValue, newValue });
      }
    }
  }
  if (diff.length === 0) {
    return { success: true, dryRun: options.dryRun, diff: [], appliedFields: [] };
  }

  if (options.dryRun) {
    return { success: true, dryRun: true, diff };
  }

  const ts = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const backupPath = `${LEXEMES_PATH}.bak_${ts}`;
  fs.copyFileSync(LEXEMES_PATH, backupPath);

  for (const d of diff) {
    (lexeme as any)[d.field] = d.newValue;
  }
  fs.writeFileSync(LEXEMES_PATH, JSON.stringify(rawCache, null, 2), "utf-8");

  cache = null;
  rawCache = null;
  cacheMtime = 0;

  const auditEntry = {
    timestamp: new Date().toISOString(),
    lexemeId: id,
    fields: diff.map((d) => d.field),
    changes: diff,
    reason,
    editor,
    source: "curation-ui",
    action: "UPDATE",
  };
  fs.appendFileSync(AUDIT_LOG_PATH, JSON.stringify(auditEntry) + "\n", "utf-8");

  return {
    success: true,
    appliedFields: diff.map((d) => d.field),
  };
}