import { describe, it, expect } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "@/lib/dialectConverter";

describe("Dialect Minimal Pairs Guard (шэ / шъэ / щэ & Wiktionary)", () => {
  it("distinguishes minimal pair шэ (milk) vs шъэ (hundred/sell)", () => {
    expect(convertAdyToKbd("шэ")).toBe("шэ");
    expect(convertAdyToKbd("шъэ")).toBe("щэ");
    expect(convertKbdToAdy("щэ")).toBe("шъэ");
  });

  it("matches Wiktionary-verified Kabardian forms", () => {
    expect(convertAdyToKbd("цыгъо")).toBe("дзыгъуэ");
    expect(convertAdyToKbd("шъхьащэ")).toBe("щхьэшэ");
    expect(convertKbdToAdy("щхьэгъусэншэ")).toBe("шъхьэгъусэнчъ");
  });
});