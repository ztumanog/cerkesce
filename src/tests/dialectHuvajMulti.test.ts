/// <reference types="node" />
import { readFileSync } from "fs";
import { join } from "path";
import process from "process";
// src/tests/dialectHuvajMulti.test.ts
// 1'e N kabul: motor çıktısı, batı'nın HERHANGİ bir Huvaj karşılığına uyuyorsa doğru

import { describe, it } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "../lib/dialectConverter";

type Cift = { bati: string; dogu: string; tr: string };

describe("Huvaj 1'e N - Çok Anlamlı Kabul", () => {
  it("motor çıktısı kabul kümesindeyse doğru", () => {
    const yol = join(
      process.cwd(),
      "storage/snapshots/mvp2_latin_20261108/huvaj_ciftler_temiz.json",
    );
    const ciftler: Cift[] = JSON.parse(readFileSync(yol, "utf-8"));

    const batiVaryant = new Map<string, Set<string>>();
    const doguVaryant = new Map<string, Set<string>>();

    for (const c of ciftler) {
      if (!batiVaryant.has(c.bati)) batiVaryant.set(c.bati, new Set());
      batiVaryant.get(c.bati)!.add(c.dogu);

      if (!doguVaryant.has(c.dogu)) doguVaryant.set(c.dogu, new Set());
      doguVaryant.get(c.dogu)!.add(c.bati);
    }

    let dogru1 = 0;
    let dogru2 = 0;
    const yanlis: string[] = [];
    const ornek = ciftler.slice(0, 1500);

    for (const c of ornek) {
      const out1 = convertAdyToKbd(c.bati);
      if (batiVaryant.get(c.bati)?.has(out1)) {
        dogru1++;
      } else {
        yanlis.push(
          `ADY->KBD: ${c.bati} -> ${out1} (kabul: ${[...batiVaryant.get(c.bati)!].join(", ")}) [${c.tr}]`,
        );
      }

      const out2 = convertKbdToAdy(c.dogu);
      if (doguVaryant.get(c.dogu)?.has(out2)) {
        dogru2++;
      } else {
        yanlis.push(
          `KBD->ADY: ${c.dogu} -> ${out2} (kabul: ${[...doguVaryant.get(c.dogu)!].join(", ")}) [${c.tr}]`,
        );
      }
    }

    const oran = (n: number) => ((n / ornek.length) * 100).toFixed(1);

    console.log(`\n1'e N GERÇEK SKOR (ilk ${ornek.length})`);
    console.log(`ADY->KBD: ${dogru1}/${ornek.length} %${oran(dogru1)}`);
    console.log(`KBD->ADY: ${dogru2}/${ornek.length} %${oran(dogru2)}`);
    console.log(`\nGERÇEK YANLIŞLAR (${yanlis.length}):`);
    for (const y of yanlis.slice(0, 40)) console.log("  " + y);
  });
});
