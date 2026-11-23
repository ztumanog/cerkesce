import { describe, it, expect } from "vitest";
import { validateCuration, isCurationValid } from "../lib/curationValidate";

const hasError = (input: Parameters<typeof validateCuration>[0], field: string) =>
  validateCuration(input).some((i) => i.field === field && i.severity === "error");

const hasNoError = (input: Parameters<typeof validateCuration>[0]) =>
  validateCuration(input).every((i) => i.severity !== "error");

describe("curationValidate - MID_WORD_Q", () => {
  it.each(["Ne?", "Ha?", "Şı?", "Kim?", "Ne? Kim?"])("geçmeli: %s", (tr) => {
    expect(hasNoError({ tr })).toBe(true);
  });
  it.each(["a?g?z", "ma?şe", "te?st"])("reddedilmeli: %s", (tr) => {
    expect(hasError({ tr }, "tr")).toBe(true);
  });
  it("tr verilmediyse denetlenmez", () => {
    expect(hasNoError({})).toBe(true);
  });
});

describe("curationValidate - HTML kontrolü", () => {
  it.each(["<<örnek>>", "<<kbd>>", "örnek <<kbd>> metin"])("geçmeli: %s", (notes) => {
    expect(hasNoError({ notes })).toBe(true);
  });
  it.each(["</fon", "<div>", "<span", "<b>", "<div>metin</div>"])("reddedilmeli: %s", (notes) => {
    expect(hasError({ notes }, "notes")).toBe(true);
  });
  it("literalMeaning için de aynı kural geçerli", () => {
    expect(hasError({ literalMeaning: "<div>kötü</div>" }, "literalMeaning")).toBe(true);
    expect(hasNoError({ literalMeaning: "temiz <<örnek>> metin" })).toBe(true);
  });
});

describe("curationValidate - Concept kontrolü", () => {
  const allowedConcepts = ["C-001", "C-002"];
  it("allowedConcepts içindeyse geçmeli", () => {
    expect(hasNoError({ conceptId: "C-001", allowedConcepts })).toBe(true);
  });
  it("allowedConcepts dışındaysa reddedilmeli", () => {
    expect(hasError({ conceptId: "C-999", allowedConcepts }, "conceptId")).toBe(true);
  });
  it("allowedConcepts verilmediyse boş olmayan her değer geçmeli", () => {
    expect(hasNoError({ conceptId: "C-999" })).toBe(true);
  });
});

describe("curationValidate - Boş Concept", () => {
  it("boş string reddedilmeli", () => {
    expect(hasError({ conceptId: "" }, "conceptId")).toBe(true);
    expect(hasError({ conceptId: "   " }, "conceptId")).toBe(true);
  });
  it("undefined denetlenmez - tasarım gereği: yalnızca girilen alan denetlenir", () => {
    expect(hasNoError({})).toBe(true);
  });
  it("BULGU: null String(null) = 'null' oluyor - P2-FIX-PLAN kararı bekliyor", () => {
    const issues = validateCuration({ conceptId: null as unknown as string });
    expect(issues.filter((i) => i.field === "conceptId")).toHaveLength(0);
  });
});

describe("curationValidate - root / family / concept", () => {
  it("boş root reddedilmeli", () => {
    expect(hasError({ root: "" }, "root")).toBe(true);
  });
  it("boş family reddedilmeli", () => {
    expect(hasError({ family: "" }, "family")).toBe(true);
  });
  it("boş concept reddedilmeli", () => {
    expect(hasError({ concept: "" }, "concept")).toBe(true);
  });
  it("dolu değerler geçmeli", () => {
    expect(hasNoError({ root: "kök", family: "aile", concept: "kavram" })).toBe(true);
  });
});

describe("curationValidate - Notes", () => {
  it("temiz serbest metin geçmeli", () => {
    expect(hasNoError({ notes: "Bu kayıt gözden geçirildi, anlam net." })).toBe(true);
  });
  it("HTML taşıyan notes reddedilmeli", () => {
    expect(hasError({ notes: "Not <b>kalın</b>" }, "notes")).toBe(true);
  });
});

describe("isCurationValid", () => {
  it("hatasız girişte true", () => {
    expect(isCurationValid({ tr: "Ne?" })).toBe(true);
  });
  it("hatalı girişte false", () => {
    expect(isCurationValid({ tr: "a?g?z" })).toBe(false);
  });
});
