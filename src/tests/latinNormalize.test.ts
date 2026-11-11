import { describe, it, expect } from "vitest";
import { normalizeLatinToKiril } from "../lib/latinNormalize";

// KARAR-15 test tablosu kilidi. Tablo: docs/KARAR-15-Test-Tablosu-Dolduruldu.md
describe("KARAR-15: Latin normalize tablosu", () => {
  it("g: gh -> гъ, ghu -> гъу, g -> г", () => {
    expect(normalizeLatinToKiril("gh")).toBe("гъ");
    expect(normalizeLatinToKiril("ghu")).toBe("гъу");
    expect(normalizeLatinToKiril("gu")).toBe("гу");
  });
  it("k: kh -> къ, q -> къ, k -> к", () => {
    expect(normalizeLatinToKiril("kh")).toBe("къ");
    expect(normalizeLatinToKiril("q")).toBe("къ");
    expect(normalizeLatinToKiril("k")).toBe("к");
  });
  it("h: hy -> хь, h -> х, xh -> хъ", () => {
    expect(normalizeLatinToKiril("hy")).toBe("хь");
    expect(normalizeLatinToKiril("h")).toBe("х");
    expect(normalizeLatinToKiril("xh")).toBe("хъ");
  });
  it("palochka: apostrof 1 I -> palochka", () => {
    expect(normalizeLatinToKiril("a" + String.fromCharCode(39))).toBe("аӀ");
    expect(normalizeLatinToKiril("a1")).toBe("аӀ");
    expect(normalizeLatinToKiril("aI")).toBe("аӀ");
  });
  it("i / y ayri: i -> и, y -> й", () => {
    expect(normalizeLatinToKiril("i")).toBe("и");
    expect(normalizeLatinToKiril("y")).toBe("й");
  });
  it("s / c: sh -> ш, s -> с, ch -> ч, c -> ц", () => {
    expect(normalizeLatinToKiril("sh")).toBe("ш");
    expect(normalizeLatinToKiril("s")).toBe("с");
    expect(normalizeLatinToKiril("ch")).toBe("ч");
    expect(normalizeLatinToKiril("c")).toBe("ц");
  });
});
