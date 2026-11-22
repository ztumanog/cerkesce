import fs from "fs";
import path from "path";

/**
 * lexemes.json degistiginde ilgili ailelerin lexemeIds + guvenli rootId/rootForm'unu gunceller.
 * Kural: en az 3 uye + %50+ cogunluk. Isimden tahmin YOK.
 * Dolu conceptIds'e DOKUNMAZ, sadece bos olanlara uyelerden baslangic yazar.
 */
export function syncWordFamiliesFromLexemes(lexemes: any[], targetFamilyIds?: Iterable<string>): void {
  try {
    const lingDir = path.join(process.cwd(), "public", "data", "linguistic");
    const famPath = path.join(lingDir, "word_families.json");
    if (!fs.existsSync(famPath)) return;
    const filterSet = targetFamilyIds ? new Set(Array.from(targetFamilyIds).filter(Boolean)) : null;
    if (filterSet && filterSet.size === 0) return;

    const famRaw = fs.readFileSync(famPath, "utf-8");
    const famParsed = JSON.parse(famRaw.replace(/^\uFEFF/, ""));
    const isArray = Array.isArray(famParsed);
    const families: any[] = isArray ? famParsed : famParsed.families ?? [];

    const rootById = new Map<string, any>();
    const rootsPath = path.join(lingDir, "roots.json");
    if (fs.existsSync(rootsPath)) {
      const rParsed = JSON.parse(fs.readFileSync(rootsPath, "utf-8").replace(/^\uFEFF/, ""));
      const rList = Array.isArray(rParsed) ? rParsed : rParsed.roots ?? [];
      for (const r of rList) if (r?.id) rootById.set(String(r.id), r);
    }

    const membersByFam = new Map<string, any[]>();
    for (const l of lexemes) {
      const fid = l?.wordFamilyId;
      if (!fid) continue;
      if (filterSet && !filterSet.has(fid)) continue;
      if (!membersByFam.has(fid)) membersByFam.set(fid, []);
      membersByFam.get(fid)!.push(l);
    }

    let changed = false;
    for (const f of families) {
      const fid = String(f?.id || "");
      if (!fid) continue;
      if (filterSet && !filterSet.has(fid)) continue;
      const members = membersByFam.get(fid) || [];
      const nextLexIds = Array.from(new Set(members.map((m) => String(m.id || "")).filter(Boolean)));
      const prevLexIds = Array.isArray(f.lexemeIds) ? f.lexemeIds : [];
      if (prevLexIds.length !== nextLexIds.length || prevLexIds.some((id: string, i: number) => id !== nextLexIds[i])) {
        f.lexemeIds = nextLexIds; changed = true;
      }
      if (!f.rootId || !rootById.has(String(f.rootId))) {
        const counts = new Map<string, number>();
        for (const m of members) for (const rid of m.rootIds || []) if (rootById.has(rid)) counts.set(rid, (counts.get(rid) || 0) + 1);
        let best: string | null = null, bestCnt = 0;
        counts.forEach((c, rid) => { if (c > bestCnt) { bestCnt = c; best = rid; } });
        const resolved = best && bestCnt >= 3 && members.length > 0 && bestCnt / members.length >= 0.5 ? best : null;
        if ((f.rootId ?? null) !== resolved) { f.rootId = resolved; changed = true; }
      }
      if (f.rootId && rootById.has(String(f.rootId)) && !f.rootForm) {
        const rf = String(rootById.get(String(f.rootId))?.form || "").trim();
        if (rf) { f.rootForm = rf; changed = true; }
      }
      if ((!Array.isArray(f.conceptIds) || f.conceptIds.length === 0) && members.length > 0) {
        const s = new Set<string>();
        for (const m of members) if (m.conceptId) s.add(String(m.conceptId));
        if (s.size > 0) { f.conceptIds = Array.from(s); changed = true; }
      }
    }
    if (!changed) return;
    const bakDir = path.join(lingDir, "_backups");
    fs.mkdirSync(bakDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.writeFileSync(path.join(bakDir, `word_families_${stamp}.json`), famRaw, "utf-8");
    const out = isArray ? families : { ...famParsed, families };
    fs.writeFileSync(famPath, JSON.stringify(out, null, 2) + "\n", "utf-8");
  } catch (e) { console.error("syncWordFamiliesFromLexemes hatasi:", e); }
}