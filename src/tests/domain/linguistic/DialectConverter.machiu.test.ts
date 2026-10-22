import { describe, it, expect } from "vitest";
import { DialectConverter } from "../../../domain/linguistic/DialectConverter";

describe("машӀо -> мафӀэ (veri üzerinden)", () => {
  it("Batı машӀо, Kabardeyce мафӀэ döndürmeli", () => {
    expect(new DialectConverter().convertWord("маш\u04C0о")).toBe("маф\u04C0э");
  });
});
