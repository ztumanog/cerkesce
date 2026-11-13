import { describe, it, expect } from "vitest";
import {
  ConceptId,
  RootValue,
  WordFamilyId,
  LexemeIdentity,
} from "@/domain/shared/value-objects";
import {
  getAllLexemes,
  validateReferences,
  updateLexeme,
} from "@/lib/curation/lexemeStore";

describe("DDD Value Objects & LexemeStore Entegrasyonu", () => {
  it("kanonik Palochka (Ӏ U+04C0) standardizasyonunu korur", () => {
    const stem = RootValue.normalizeCyrillic("гуф1э");
    expect(stem).toBe("гуф\u04C0э");

    const identity = LexemeIdentity.create("L-GUF1E", "ГУФӏЭ", "LANG: KBD");
    expect(identity.form).toBe("гуф\u04C0э");
    expect(identity.dialect).toBe("KBD");
  });

  it("ConceptId Türkçe karakter, ULID ve ham hex hash sızıntılarını reddeder", () => {
    expect(ConceptId.create("MEMORY").value).toBe("MEMORY");
    expect(ConceptId.create("APPLE_TREE").value).toBe("APPLE_TREE");
    expect(() => ConceptId.create("ÖFKE")).toThrow();
    expect(() => ConceptId.create("01M44JJ719F3V5RXNAJCB9Y11X")).toThrow();
    expect(() => ConceptId.create("A1B2C3D4E5F6A7B8")).toThrow();
    expect(() => ConceptId.create("a1b2c3d4e5f6a7b8")).toThrow();
  });

  it("WordFamilyId ve RootValue kurallarını doğrular", () => {
    expect(WordFamilyId.create("FAM_GU").value).toBe("WF-GU");
    const root = RootValue.create("r-gu", "-гу-", "common");
    expect(root.rootId).toBe("R-GU");
    expect(root.stem).toBe("гу");
    expect(root.dialect).toBe("COMMON");
  });

  it("lexemes.json üzerindeki 28.414 kaydın tamamı Value Object kurallarına uyar", () => {
    const all = getAllLexemes();
    expect(all.length).toBe(28438);

    for (const item of all) {
      expect(() => ConceptId.create(item.conceptId!)).not.toThrow();
      expect(() => WordFamilyId.create(item.wordFamilyId)).not.toThrow();
      expect(item.dialect).toMatch(/^(KBD|ADY|COMMON)$/);
    }
  });

  it("lexemeStore.updateLexeme dry-run modunda Value Object validasyonu uygular", () => {
    const badRes = validateReferences({
      conceptId: "TÜRKÇE_HATA",
      dialect: "INVALID_DIALECT",
    });
    expect(badRes.valid).toBe(false);
    expect(badRes.errors.length).toBe(2);

    const dryRes = updateLexeme(
      "L-GUF1E",
      { form: "гуф1э", dialect: "LANG: KBD" },
      { reason: "VO dry-run check", editor: "test-runner", dryRun: true }
    );
    expect(dryRes.success).toBe(true);
    expect(dryRes.dryRun).toBe(true);
  });
});