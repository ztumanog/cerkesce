#!/usr/bin/env node
/**
 * check-unused-modules.mjs — hiçbir yerden import edilmeyen modülleri bulur.
 *
 * Neden: 9597a0c (2026-11-15) src/lib/curationValidate.ts dosyasını ekledi ama hiçbir
 * çağrı noktası bağlamadı; modül 8 gün ölü kaldı (bkz. docs/audits/CURATION-VALIDATE-AUDIT.md).
 * Bu script o sınıf hatayı CI'da yakalar: "modül eklendi ama bağlanmadı".
 *
 * Kapsam: CHECK_UNUSED_DIRS (varsayılan: src/lib src/hooks src/utils) altındaki
 * .ts dosyaları (*.test.ts, *.d.ts hariç). Import taraması app/, src/, scripts/
 * üzerinden yapılır; TEST DOSYALARI tüketici sayılmaz — yalnızca kendi testinde
 * import edilen modül de "bağlanmamış" kabul edilir.
 *
 * Kullanım:
 *   node scripts/check-unused-modules.mjs              # bağlanmamış varsa exit 1 (CI modu)
 *   WARN_ONLY=1 node scripts/check-unused-modules.mjs  # yalnızca uyarı, exit 0
 *
 * Muafiyet: repo kökündeki .unused-modules-allowlist dosyasına satır satır dosya yolu yazın.
 *
 * Not: Bash sürümü (check-unused-modules.sh) Windows PowerShell'de PATH sorunu yarattığı
 * için bu Node sürümü ile değiştirildi — tek uygulama, her platformda çalışır.
 *
 * Sınırlar: aynı adlı iki dosya yanlış-negatif verebilir; literal olmayan dinamik
 * import() yakalanmaz. Araç erken uyarıdır, kesin kanıt değil.
 */

import fs from "fs";
import path from "path";

const ROOT = (() => {
  try { return fs.realpathSync(path.join(import.meta.dirname, "..")); }
  catch { return process.cwd(); }
})();

const DIRS = (process.env.CHECK_UNUSED_DIRS || "src/lib src/hooks src/utils").split(/\s+/).filter(Boolean);
const SEARCH_DIRS = ["app", "src", "scripts"];
const ALLOWLIST = path.join(ROOT, ".unused-modules-allowlist");
const WARN_ONLY = process.env.WARN_ONLY === "1";

const SCRIPT_EXTS = [".ts", ".tsx", ".mjs", ".js"];
const isTest = (f) => /\.test\.(ts|tsx|js|jsx|mjs)$/.test(f);

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// 1) Tüm import specifier'larını topla:
//    - `... from '<x>'`  (import, import type, export ... from)
//    - `import('<x>')`   (dinamik, literal)
//    Test dosyaları hariç tutulur: tüketici sayılmazlar.
const FROM_RE = /from\s+['"]([^'"]+)['"]/g;
const DYN_IMPORT_RE = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

const specifiers = new Set();
for (const dir of SEARCH_DIRS) {
  const absDir = path.join(ROOT, dir);
  for (const f of walk(absDir)) {
    if (!SCRIPT_EXTS.includes(path.extname(f))) continue;
    if (isTest(f)) continue;
    const src = fs.readFileSync(f, "utf-8");
    for (const m of src.matchAll(FROM_RE)) specifiers.add(m[1]);
    for (const m of src.matchAll(DYN_IMPORT_RE)) specifiers.add(m[1]);
  }
}

if (specifiers.size === 0) {
  console.error("HATA: import taraması boş döndü — dizin yapısı değişmiş olabilir.");
  process.exit(2);
}

const allowlist = fs.existsSync(ALLOWLIST)
  ? new Set(fs.readFileSync(ALLOWLIST, "utf-8").split(/\r?\n/).filter((l) => l.trim()))
  : new Set();

const unused = [];
for (const dir of DIRS) {
  const absDir = path.join(ROOT, dir);
  for (const f of walk(absDir)) {
    if (path.extname(f) !== ".ts") continue;
    if (isTest(f) || f.endsWith(".d.ts")) continue;
    const rel = path.relative(ROOT, f).replace(/\\/g, "/"); // src/lib/curationValidate.ts
    if (allowlist.has(rel)) continue;

    const noext = rel.replace(/\.ts$/, ""); // src/lib/curationValidate
    const name = path.basename(noext);      // curationValidate

    // Specifier şunlardan biriyle bitiyor mu?
    //   "/lib/curationValidate" → @/lib/x alias'ı veya ../../lib/x göreceli yol
    //   "/curationValidate"     → aynı dizindeki kardeş import (./x)
    let used = false;
    for (const spec of specifiers) {
      if (spec.endsWith("/" + noext) || spec.endsWith("/" + name) || spec === name) {
        used = true;
        break;
      }
    }
    if (!used) unused.push(rel);
  }
}

if (unused.length === 0) {
  console.log(`OK: ${DIRS.join(", ")} altında bağlanmamış modül yok.`);
  process.exit(0);
}

console.log(`BAĞLANMAMIŞ MODÜLLER (${unused.length}):`);
for (const f of unused) console.log(`  - ${f}`);
console.log("");
console.log("Bunlar ya bir çağrı noktasına bağlanmalı ya da .unused-modules-allowlist'e bilinçli karar olarak yazılmalı.");
console.log("Bkz: docs/audits/CURATION-VALIDATE-AUDIT.md (KÖK NEDEN ve DERS)");

if (WARN_ONLY) {
  console.log("(WARN_ONLY=1 — uyarı modu, exit 0)");
  process.exit(0);
}
process.exit(1);
