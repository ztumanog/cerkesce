/// <reference types="node" />
// src/tests/dialectLexiconConsistency.test.ts
// REGRESYON: REV/EXACT, Huvaj Lexicon'u golgeleyemez.
// Ders: Mimar Raporu 2 §3 - гупсысэ / кхъухьлъатэ bugi.
// Motor, lexicon'daki her cift icin lexicon degerini donmek zorunda.
// Aksi halde REV'de yanlis bir cift, dogru lexicon degerini eziyor demektir.
import { describe, it, expect } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "../lib/dialectConverter";
import { HUVAJ_ADY_TO_KBD, HUVAJ_KBD_TO_ADY } from "../lib/huvajLexicon";

describe("Lexicon Tutarliligi - REV gölgelemesi yok", () => {
  it("ADY->KBD: motor, lexicon'daki her cift icin lexicon degerini doner", () => {
    const yanlis: string[] = [];
    for (const [ady, kbd] of Object.entries(HUVAJ_ADY_TO_KBD)) {
      const out = convertAdyToKbd(ady);
      if (out !== kbd) yanlis.push(`${ady} -> ${out} (lexicon: ${kbd})`);
    }
    if (yanlis.length > 0) console.log("ADY->KBD gölgeleme:\n  " + yanlis.slice(0, 20).join("\n  "));
    expect(yanlis).toEqual([]);
  });

  it("KBD->ADY: motor, lexicon'daki her cift icin lexicon degerini doner", () => {
    const yanlis: string[] = [];
    for (const [kbd, ady] of Object.entries(HUVAJ_KBD_TO_ADY)) {
      const out = convertKbdToAdy(kbd);
      if (out !== ady) yanlis.push(`${kbd} -> ${out} (lexicon: ${ady})`);
    }
    if (yanlis.length > 0) console.log("KBD->ADY gölgeleme:\n  " + yanlis.slice(0, 20).join("\n  "));
    expect(yanlis).toEqual([]);
  });
});
