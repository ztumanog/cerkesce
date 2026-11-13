import { verifyCurationAccess } from '@/lib/security/curationGuard';
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const editable = new Set([
  "rootIds",
  "wordFamilyId",
  "conceptId",
  "form",
  "ipa",
  "notes",
  "translations",
  "conceptIds",
  "pos",
  "status"
]);

export async function POST(req: NextRequest) {
  const denied = verifyCurationAccess(req);
  if (denied) return denied;

  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    return NextResponse.json({ success: false, error: "Farkli kaynaktan kayit engellendi." }, { status: 403 });
  }
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ success: false, error: "Gecersiz JSON." }, { status: 400 }); }
  if (!body || !Array.isArray(body.updates)) return NextResponse.json({ success: false, error: "updates dizisi zorunludur." }, { status: 400 });

  const filePath = path.join(process.cwd(), "public", "data", "linguistic", "lexemes.json");
  if (!fs.existsSync(filePath)) return NextResponse.json({ success: false, error: "lexemes.json bulunamadi" }, { status: 404 });

  const raw = fs.readFileSync(filePath, "utf-8");
  let parsed: any;
  try { parsed = JSON.parse(raw); } catch { return NextResponse.json({ success: false, error: "lexemes.json bozuk" }, { status: 500 }); }
  const arr = Array.isArray(parsed) ? parsed : parsed.lexemes || [];
  const map = new Map(arr.map((l:any)=>[l.id, l]));

  const backupDir = path.join(process.cwd(), "public", "data", "linguistic", "_backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g,"-");
  fs.writeFileSync(path.join(backupDir, `lexemes_${stamp}.json`), raw, "utf-8");

  for (const u of body.updates) {
    if (!u.id) continue;
    const existing = map.get(u.id);
    if (!existing) continue;
    const patch = u.patch || u;
    // patch doğrudan rootIds silme için de çalışır
    if (u.patch && typeof u.patch === "object") {
      for (const [k,v] of Object.entries(u.patch)) {
        if (editable.has(k)) (existing as any)[k]=v;
      }
    } else {
      // eski format: {id, rootIds: [...] } gibi
      for (const [k,v] of Object.entries(u)) {
        if (k==="id") continue;
        if (editable.has(k)) (existing as any)[k]=v;
      }
    }
  }

  const newArr = Array.from(map.values());
  fs.writeFileSync(filePath, JSON.stringify(newArr, null, 2), "utf-8");

  // audit
  try {
    const auditPath = path.join(process.cwd(), "public", "data", "linguistic", "_backups", `audit_${stamp}.json`);
    fs.writeFileSync(auditPath, JSON.stringify({ time: new Date().toISOString(), updates: body.updates }, null, 2), "utf-8");
  } catch {}

  return NextResponse.json({ success: true, updated: body.updates.length, backup: `lexemes_${stamp}.json` });
}