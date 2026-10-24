// Sprint 2A.3 - Audit Log zinciri
import fs from "fs";
import path from "path";

export interface AuditEntry {
  timestamp: string;
  lexemeId: string;
  field: string;
  oldValue: string;
  newValue: string;
  source: string;
}

const AUDIT_PATH = path.join(process.cwd(), "public/data/linguistic/audit_log.jsonl");

export function appendAudit(entries: AuditEntry[]): void {
  const lines = entries.map(e => JSON.stringify(e)).join("\n") + "\n";
  fs.appendFileSync(AUDIT_PATH, lines, "utf8");
}

export function readAudit(limit = 100): AuditEntry[] {
  if (!fs.existsSync(AUDIT_PATH)) return [];
  const lines = fs.readFileSync(AUDIT_PATH, "utf8").trim().split("\n");
  return lines.slice(-limit).map(l => JSON.parse(l));
}
