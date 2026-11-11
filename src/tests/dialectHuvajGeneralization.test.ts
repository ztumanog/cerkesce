/// <reference types="node" />
import { readFileSync } from "fs";
import { join } from "path";
import process from "process";
// src/tests/dialectHuvajGeneralization.test.ts
// Genelleme - Lexicon'da olmayan dilim (kural gucu), 1'e N kabul
// Motor ciktisi, kelimenin HERHANGI bir Huvaj karsiligina uyuyorsa dogru
import { describe, it } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "../lib/dialectConverter";

type Cift = { bati: string; dogu: string; tr: string };

describe("Huvaj Genelleme - Lexicon'da olmayan dilim (kural gucu)", () => {
  it("Bulk testin gormedigi 1500-5944 dilimini olcer", () => {
    const yol = join(process.cwd(), "storage/snapshots/mvp2_latin_20261108/huvaj_ciftler_temiz.json");
    const ciftler: Cift[] = JSON.parse(readFileSync(yol, "utf-8"));

    // Kabul kumesi: TUM Huvaj'dan, dilim disindakiler de dahil
    // (Ayni bati kelimesi baska bir kayitta baska dogu karsiligiyla gecebilir)
    const batiVaryant = new Map<string, Set<string>>();
    const doguVaryant = new Map<string, Set<string>>();
    for (const c of ciftler) {
      if (!batiVaryant.has(c.bati)) batiVaryant.set(c.bati, new Set());
      batiVaryant.get(c.bati)!.add(c.dogu);
      if (!doguVaryant.has(c.dogu)) doguVaryant.set(c.dogu, new Set());
      doguVaryant.get(c.dogu)!.add(c.bati);
    }

    const dilim = ciftler.slice(1500);
    let dogru1 = 0, dogru2 = 0;
    const yanlis: string[] = [];
    for (const c of dilim) {
      const out1 = convertAdyToKbd(c.bati);
      if (batiVaryant.get(c.bati)?.has(out1)) dogru1++;
      else yanlis.push(`ADY->KBD: ${c.bati} -> ${out1} (kabul: ${[...batiVaryant.get(c.bati)!].join(", ")}) [${c.tr}]`);

      const out2 = convertKbdToAdy(c.dogu);
      if (doguVaryant.get(c.dogu)?.has(out2)) dogru2++;
      else yanlis.push(`KBD->ADY: ${c.dogu} -> ${out2} (kabul: ${[...doguVaryant.get(c.dogu)!].join(", ")}) [${c.tr}]`);
    }

    console.log(`\nGENELLEME 1'e N (1500-${ciftler.length}): ADY->KBD ${dogru1}/${dilim.length}, KBD->ADY ${dogru2}/${dilim.length}`);
    console.log(`\nGERCEK YANLISLAR (${yanlis.length}):`);
    for (const y of yanlis.slice(0, 40)) console.log("  " + y);
  });
});
