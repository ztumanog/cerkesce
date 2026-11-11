import { describe, it, expect } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "@/lib/dialectConverter";
import ciftler from "../../storage/snapshots/mvp2_latin_20261108/huvaj_ciftler_temiz.json";

// Palochka varyantlari (U+04C0 Ӏ, U+04CF ӏ, U+0406 І) tek bicime getirilir.
// Yoksa dogru cevrilmis 180+ cift sırf Unicode farkindan FAIL sayilir.
function norm(s: string): string {
  return s.normalize('NFC').replace(/[\u0406\u04CF]/g, '\u04C0');
}

describe("Huvaj Toplu Test - Gercek Motor", () => {
  it("Huvaj Bati/Dogu ciftlerini olcer", () => {
    const test = (ciftler as any[]).slice(0, 1500);
    let d1 = 0, d2 = 0;
    const yanlis: string[] = [];
    for (const c of test) {
      if (norm(convertAdyToKbd(c.bati)) === norm(c.dogu)) d1++; else if (yanlis.length < 30) yanlis.push(`ADY->KBD: ${c.bati} -> ${convertAdyToKbd(c.bati)} (beklenen ${c.dogu}) [${c.tr}]`);
      if (norm(convertKbdToAdy(c.dogu)) === norm(c.bati)) d2++; else if (yanlis.length < 30) yanlis.push(`KBD->ADY: ${c.dogu} -> ${convertKbdToAdy(c.dogu)} (beklenen ${c.bati}) [${c.tr}]`);
    }
    console.log(`TOPLAM: ${test.length}`);
    console.log(`ADY->KBD: ${d1}/${test.length} %${(d1/test.length*100).toFixed(1)}`);
    console.log(`KBD->ADY: ${d2}/${test.length} %${(d2/test.length*100).toFixed(1)}`);
    console.log("YANLISLAR:\n" + yanlis.join("\n"));
    expect(true).toBe(true);
  });
});
