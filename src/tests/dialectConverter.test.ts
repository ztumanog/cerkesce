import { describe, it, expect } from "vitest";
import { convertAdyToKbd, convertKbdToAdy } from "../lib/dialectConverter";

describe("Saf Kural Motoru - ADY -> KBD", () => {
  const cases: [string, string][] = [
    ["Ӏуфын", "Ӏухун"],
    ["фабэ", "хуабэ"],
    ["мафэ", "махуэ"],
    ["шӀуэ", "фӀы"],
    ["машӀуэ", "мафӀэ"],
    ["шъхьэ", "щхьэ"],
    ["жъы", "жьы"],
    ["шӀэн", "щӀэн"],
    ["нэшъу", "нэф"],
    ["нэшӀу", "нэфӀы"],
    ["тыкӀуэщт", "дыкӀуэнщ"],
    ["фэщхъуныгъэ", "фӀэщхъуныгъэ"],
    ["нэшӀущыфэныгъэ", "нэфӀыщыхуэныгъэ"],
  ];
  for (const [input, expected] of cases) {
    it(`${input} -> ${expected}`, () => {
      expect(convertAdyToKbd(input)).toBe(expected);
    });
  }
});

describe("Saf Kural Motoru - KBD -> ADY", () => {
  const cases: [string, string][] = [
    ["хуабэ", "фабэ"],
    ["махуэ", "мафэ"],
    ["Ӏухун", "Ӏуфын"],
    ["щхьэ", "шъхьэ"],
    ["жьы", "жъы"],
    ["фы", "шы"],
  ];
  for (const [input, expected] of cases) {
    it(`${input} -> ${expected}`, () => {
      expect(convertKbdToAdy(input)).toBe(expected);
    });
  }
});

describe("Istisna Sozlugu", () => {
  it("о -> уэ", () => expect(convertAdyToKbd("о")).toBe("уэ"));
  it("тэ -> дэ", () => expect(convertAdyToKbd("тэ")).toBe("дэ"));
  it("цу -> вы", () => expect(convertAdyToKbd("цу")).toBe("вы"));
});

describe("Fiil Cekimleri", () => {
  it("кӀуэщт -> кӀуэнщ", () => expect(convertAdyToKbd("кӀуэщт")).toBe("кӀуэнщ"));
  it("тыкӀуэщт -> дыкӀуэнщ", () => expect(convertAdyToKbd("тыкӀуэщт")).toBe("дыкӀуэнщ"));
  it("тыкӀуагъ -> дыкӀуащ", () => expect(convertAdyToKbd("тыкӀуагъ")).toBe("дыкӀуащ"));
});

describe("Kok Ici о -> уэ", () => {
  it("офы -> уэху", () => expect(convertAdyToKbd("офы")).toBe("уэху"));
  it("он -> уэн", () => expect(convertAdyToKbd("он")).toBe("уэн"));
});

describe("Ters Yon Riskliler", () => {
  it("вагъуэ -> жъуагъуэ", () => expect(convertKbdToAdy("вагъуэ")).toBe("жъуагъуэ"));
  it("махуэ -> мафэ", () => expect(convertKbdToAdy("махуэ")).toBe("мафэ"));
});

describe("Cumle Seviyesi - kelime kelime", () => {
  it("Тэ тыкӀуэщт -> Дэ дыкӀуэнщ", () => {
    const cumle = "Тэ тыкӀуэщт";
    const cevrilmis = cumle.split(" ").map(w => convertAdyToKbd(w)).join(" ");
    expect(cevrilmis).toBe("Дэ дыкӀуэнщ");
  });
  it("Тэ тыкӀуэщт мафэм -> Дэ дыкӀуэнщ махуэм", () => {
    const cumle = "Тэ тыкӀуэщт мафэм";
    const cevrilmis = cumle.split(" ").map(w => convertAdyToKbd(w)).join(" ");
    expect(cevrilmis).toBe("Дэ дыкӀуэнщ махуэм");
  });
});
