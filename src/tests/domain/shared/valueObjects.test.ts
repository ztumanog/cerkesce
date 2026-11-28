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
  findDuplicateLexeme,
  upsertLexeme,
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

  it("lexemes.json üzerindeki tüm kayıtlar Value Object kurallarına uyar", () => {
    const all = getAllLexemes();
    // Sabit kayıt sayısı bilinçli olarak KALDIRILDI (CURRENT_TEST_BASELINE notu,
    // 2026-11-28): paralel kürasyon veriyi canlı büyüttüğü için sabit sayı
    // kırılgandı (40841 → 41473 diye defalarca kırıldı). Testin amacı tüm
    // kayıtların VO kurallarına uymasıdır; sayı yalnız alt sınırla güvenceye alınır.
    expect(all.length).toBeGreaterThan(40000);

    for (const item of all) {
      // conceptId'si boş kayıtlar bilinen bir kürasyon kuyruğudur (Kavram
      // Denetimi: emptyConceptIds) — boş olanlar atlanır, dolular kurallara uymalı.
      if (item.conceptId) {
        expect(() => ConceptId.create(item.conceptId)).not.toThrow();
      }
      if (item.wordFamilyId) {
        expect(() => WordFamilyId.create(item.wordFamilyId)).not.toThrow();
      }
      expect(item.dialect).toMatch(/^(KBD|ADY|COMMON)$/);
    }
  }, 15000);

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

describe("Çift Kayıt (Deduplication) Koruması", () => {
  it("Palochka varyantlarını normalize ederek mevcut kaydı yakalar", () => {
    const all = getAllLexemes();
    const sample = all.find((x) => x.form.includes("Ӏ") && x.partOfSpeech);
    expect(sample).toBeDefined();

    // Latin '1' ile yazilmis varyant ayni kaydi yakalamali
    const variantForm = sample!.form.replace(/Ӏ/g, "1");
    const dup = findDuplicateLexeme(variantForm, sample!.dialect, sample!.partOfSpeech);
    expect(dup?.id).toBe(sample!.id);
  });

  it("updateLexeme başka bir kayıtla form+dialect+POS çakışmasını reddeder", () => {
    const all = getAllLexemes();
    const withPos = all.filter((x) => x.partOfSpeech && x.dialect);
    const first = withPos[0];
    const second = withPos.find(
      (x) =>
        x.id !== first.id &&
        x.dialect === first.dialect &&
        x.partOfSpeech === first.partOfSpeech &&
        x.form !== first.form
    );
    expect(second).toBeDefined();

    const res = updateLexeme(
      second!.id,
      { form: first.form },
      { reason: "test-dedup", editor: "vitest", dryRun: true }
    );
    expect(res.success).toBe(false);
    expect(res.error).toContain("Duplicate lexeme conflict");
  });

  it("upsertLexeme dry-run modunda çakışan kaydı yeni oluşturmak yerine mevcutla birleştirir", () => {
    const all = getAllLexemes();
    const target = all.find((x) => x.partOfSpeech && x.dialect)!;

    const merged = upsertLexeme(
      { form: target.form, dialect: target.dialect, partOfSpeech: target.partOfSpeech },
      { reason: "test-upsert", editor: "vitest", dryRun: true }
    );
    expect(merged.success).toBe(true);
    expect(merged.action).toBe("MERGED");
    expect(merged.id).toBe(target.id);

    const rejected = upsertLexeme(
      { form: target.form, dialect: target.dialect, partOfSpeech: target.partOfSpeech },
      { reason: "test-upsert-reject", editor: "vitest", dryRun: true, rejectOnDuplicate: true }
    );
    expect(rejected.success).toBe(false);
  });
});
