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
    const oldFamById = new Map<string, string>();
    for (const u of updates) { const r0 = byId.get(String(u.id)); if (r0) oldFamById.set(String(u.id), String((r0 as any).wordFamilyId || "")); }
    const ok: string[] = [];
    for (const u of updates) {
      const rec = byId.get(String(u.id));
      if (!rec) { errors.push({ id: String(u.id), error: "ID bulunamadi" }); continue; }
      const patch = u.patch || {};
      const trCand = (patch as any).tr ?? (patch as any).translations?.tr;
      if (typeof trCand === "string" && /[A-Za-zçğıöşüÇĞİÖŞÜ]\?[A-Za-zçğıöşüÇĞİÖŞÜ]/.test(trCand)) { errors.push({ id: String(u.id), error: "tr icinde kodlama ? var" }); continue; }
      const litCand = (patch as any).literalMeaning; if (typeof litCand === "string" && String(litCand).replace(/<<[^>]+>>/g, "").includes("<")) { errors.push({ id: String(u.id), error: "literalMeaning icinde HTML var" }); continue; }
      for (const [k, v] of Object.entries(patch)) {
        if (k === "translations" && v && typeof v === "object") {
  (rec as Record<string, unknown>).translations = {
    ...(((rec as Record<string, unknown>).translations as Record<string, unknown>) || {}),
    ...(v as Record<string, unknown>)
  };
}
else if (k === "tr" && typeof v === "string") { (rec as Record<string, unknown>).translations = { ...(((rec as Record<string, unknown>).translations as Record<string, unknown>) || {}), tr: v }; } else (rec as any)[k] = v;
      }
      ok.push(String(u.id));
    }
    if (!ok.length) return NextResponse.json({ ok: false, errors }, { status: 400 });
    // Aile senkronu - wordFamilyId degisen lexemeyi eski aileden cikar, yenisine ekle
    try {
      const famPath = path.join(process.cwd(), "public/data/linguistic/word_families.json");
      if (fs.existsSync(famPath)) {
        const famRaw = fs.readFileSync(famPath, "utf-8");
        const famData = JSON.parse(famRaw);
        const famList = Array.isArray(famData) ? famData : (famData.families ?? famData.wordFamilies ?? []);
        const famById = new Map(famList.map((f: any) => [String(f.id), f]));
        let famChanged = false;
        for (const u of updates) {
          const nid = String(u.id);
          const newFam = String((u.patch as any)?.wordFamilyId || "");
          const oldFam = oldFamById.get(nid) || "";
          if (!newFam || newFam === oldFam) continue;
          if (oldFam && famById.has(oldFam)) { const of: any = famById.get(oldFam); if (Array.isArray(of.lexemeIds)) { const ix = of.lexemeIds.indexOf(nid); if (ix !== -1) { of.lexemeIds.splice(ix, 1); famChanged = true; } } }
          if (famById.has(newFam)) { const nf: any = famById.get(newFam); if (!Array.isArray(nf.lexemeIds)) nf.lexemeIds = []; if (!nf.lexemeIds.includes(nid)) { nf.lexemeIds.push(nid); famChanged = true; } }
        }
        if (famChanged) { const famStamp = new Date().toISOString().replace(/[:.]/g, "-"); fs.copyFileSync(famPath, famPath + ".bak-" + famStamp); const famOut = Array.isArray(famData) ? famList : { ...famData, families: famList }; fs.writeFileSync(famPath, JSON.stringify(famOut, null, 2), "utf-8"); }
      }
    } catch {}
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

