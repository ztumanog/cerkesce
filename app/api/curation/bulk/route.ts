import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
const LEX_PATH = path.join(process.cwd(), "public/data/linguistic/lexemes.json");
const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
export async function POST(req: Request) {
  try {
    const body = await req.json() as { updates?: Array<{ id: string; patch: Record<string, unknown> }>; confirmStructural?: boolean };
    const updates = body.updates ?? [];
    if (!updates.length) return NextResponse.json({ ok: false, error: "updates bos" }, { status: 400 });
    const raw = fs.readFileSync(LEX_PATH, "utf-8");
    const data = JSON.parse(raw) as any[];
    const list = Array.isArray(data) ? data : (data as any).lexemes ?? [];
    const byId = new Map(list.map((x: any) => [String(x.id), x]));
    const STRUCT = ["conceptId", "wordFamilyId", "rootIds"];
    const hasStructural = updates.some(u => Object.keys(u.patch || {}).some(k => STRUCT.includes(k)));
    if (hasStructural && !body.confirmStructural) {
      return NextResponse.json({ ok: false, error: "STRUCTURAL_CONFIRM_REQUIRED", detail: "conceptId / wordFamilyId / rootIds toplu degisimi icin ikinci onay gerekli." }, { status: 400 });
    }
    const errors: Array<{ id: string; error: string }> = [];
    const ok: string[] = [];
    for (const u of updates) {
      const rec = byId.get(String(u.id));
      if (!rec) { errors.push({ id: String(u.id), error: "ID bulunamadi" }); continue; }
      const patch = u.patch || {};
      const trCand = (patch as any).tr ?? (patch as any).translations?.tr;
      if (typeof trCand === "string" && trCand.includes("?")) { errors.push({ id: String(u.id), error: "tr icinde ? var" }); continue; }
      if (typeof (patch as any).literalMeaning === "string" && String((patch as any).literalMeaning).includes("<")) { errors.push({ id: String(u.id), error: "literalMeaning icinde < var" }); continue; }
      for (const [k, v] of Object.entries(patch)) {
        if (k === "translations" && v && typeof v === "object") {
  (rec as Record<string, unknown>).translations = {
    ...(((rec as Record<string, unknown>).translations as Record<string, unknown>) || {}),
    ...(v as Record<string, unknown>)
  };
}
else (rec as any)[k] = v;
      }
      ok.push(String(u.id));
    }
    if (!ok.length) return NextResponse.json({ ok: false, errors }, { status: 400 });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const bak = LEX_PATH + ".bak-" + stamp;
    fs.copyFileSync(LEX_PATH, bak);
    const out = Array.isArray(data) ? list : { ...(data as any), lexemes: list };
    fs.writeFileSync(LEX_PATH, JSON.stringify(out, null, 2), "utf-8");
    return NextResponse.json({ ok: true, applied: ok.length, failed: errors.length, errors, backup: bak, note: "commit terminalden" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "hata" }, { status: 500 });
  }
}

