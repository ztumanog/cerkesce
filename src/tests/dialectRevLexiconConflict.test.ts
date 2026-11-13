/// <reference types="node" />
// ADR-GOV-014: REV ∩ LEXICON celiski testi - REQUIRED, fail = exit 1.
// Kural: REV varsa ve LEXICON varsa, REV === LEXICON olmali.
// REV iceride (export edilmemis) oldugu icin test, celiskiyi motor
// davranisi uzerinden black-box dogrular.
// Kapanan buglar: гупсысэ, кхъухьлъатэ.
import { describe, it, expect } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "../lib/dialectConverter";
import { HUVAJ_ADY_TO_KBD, HUVAJ_KBD_TO_ADY } from "../lib/huvajLexicon";

describe("ADR-GOV-014: REV ∩ Lexicon celiskisi yok", () => {
  it("ADY->KBD: hicbir REV kaydi Lexicon'u golgeleyemez", () => {
    const celiski: string[] = [];
    for (const [ady, kbd] of Object.entries(HUVAJ_ADY_TO_KBD)) {
      const out = convertAdyToKbd(ady);
      if (out !== kbd) celiski.push(`${ady} -> ${out} (LEXICON: ${kbd})`);
    }
    if (celiski.length > 0) console.log("CELISKI ADY->KBD: " + celiski.slice(0, 20).join(" | "));
    expect(celiski).toEqual([]);
  });

  it("KBD->ADY: hicbir REV kaydi Lexicon'u golgeleyemez", () => {
    const celiski: string[] = [];
    for (const [kbd, ady] of Object.entries(HUVAJ_KBD_TO_ADY)) {
      const out = convertKbdToAdy(kbd);
      if (out !== ady) celiski.push(`${kbd} -> ${out} (LEXICON: ${ady})`);
    }
    if (celiski.length > 0) console.log("CELISKI KBD->ADY: " + celiski.slice(0, 20).join(" | "));
    expect(celiski).toEqual([]);
  });

  it("Bilinen celiski ornekleri kapali: гупсысэ / кхъухьлъатэ", () => {
    expect(convertKbdToAdy("гупсысэ")).toBe("гупшысэ");
    expect(convertKbdToAdy("кхъухьлъатэ")).toBe("къухьэлъатэ");
  });
});
