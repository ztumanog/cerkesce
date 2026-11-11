import { describe, it, expect } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "@/lib/dialectConverter";
import lexemes from "../../public/data/linguistic/lexemes.json";

describe("Toplu Test - Gercek Motor", () => {
  it("68 farkli cifti olcer", () => {
    const ciftler = (lexemes as any[]).filter(l => l.dialectVariants?.adyghe && l.dialectVariants?.kabardian && l.dialectVariants.adyghe !== l.dialectVariants.kabardian);
    let dogru1 = 0, dogru2 = 0;
    const yanlis: string[] = [];
    for (const l of ciftler) {
      const ady = l.dialectVariants.adyghe;
      const kbd = l.dialectVariants.kabardian;
      if (convertAdyToKbd(ady) === kbd) dogru1++; else yanlis.push(`ADY->KBD: ${ady} -> ${convertAdyToKbd(ady)} (beklenen ${kbd})`);
      if (convertKbdToAdy(kbd) === ady) dogru2++; else yanlis.push(`KBD->ADY: ${kbd} -> ${convertKbdToAdy(kbd)} (beklenen ${ady})`);
    }
    console.log(`TOPLAM: ${ciftler.length}`);
    console.log(`ADY->KBD: ${dogru1}/${ciftler.length} %${(dogru1/ciftler.length*100).toFixed(1)}`);
    console.log(`KBD->ADY: ${dogru2}/${ciftler.length} %${(dogru2/ciftler.length*100).toFixed(1)}`);
    console.log("YANLISLAR:\n" + yanlis.join("\n"));
    expect(true).toBe(true);
  });
});
