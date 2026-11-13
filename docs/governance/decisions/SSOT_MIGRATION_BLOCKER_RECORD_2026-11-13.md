# SSOT Migration — Blocker Record

**Tarih:** 2026-11-13
**Durum:** AKTİF BLOKER
**Etki:** SSOT Migration Faz 1 (test katmanı dönüşümü)
**Karar:** Sınırlı H — Plan revizyonu yok, yeni faz yok, blocker kaydı var

## Bloker Özeti

SSOT Migration Faz 1, uygulama sırasında beklenmedik bir engelle karşılaştı:

> `Concept.ts` Compatibility Bridge, beklenenden daha aktif.

Bu kayıt, o engeli ve kanıtlarını belgeler.

## Kanıt Zinciri

### 1. Faz 1 denemesi (2026-11-13)

- 9 test dosyası dönüştürüldü: `ConceptID` → `ConceptId`
- `tsc --noEmit`: YESIL
- `vitest run`: 5 test kirildi

### 2. Kirilan testler

| Test | Hata | Kok neden |
|---|---|---|
| InMemoryConceptRepository L21 | equals false | ConceptID.equals(ConceptId) -> false |
| InMemoryConceptRepository L38 | equals false | Ayni |
| MeaningGraph L25 | getValue is not a function | ConceptId'de getValue yok |
| MeaningGraph L55 | getValue is not a function | Ayni |
| Sprint4GraphAwareE2E L28 | getValue is not a function | Ayni |

### 3. API Parity analizi

| Uye | ConceptID | ConceptId | Fark |
|---|---|---|---|
| create(string) | VAR | VAR | Uyumlu |
| getValue() | VAR | YOK | EKSIK |
| equals(other) | VAR | VAR (ValueObject) | Uyumlu |
| toString() | VAR | VAR | Uyumlu |
| value getter | YOK | VAR | Fazla |

Sonuc: Sadece getValue() eksik.

### 4. Compatibility Bridge analizi

Concept.ts:
- readonly id: ConceptID (alias tipi depoluyor)
- const canonical = ConceptId.create(rawId) (SSOT ile dogruluyor)
- this.id = ConceptID.create(canonical.value) (alias olarak sariyor)

Yani SSOT ile dogruluyor, alias tipini depoluyor.

### 5. VariantId yanlis alarm

DialectResolver ve InMemoryVariantRepository'deki variant.id.getValue() cagrilari VariantId tipine ait. Concept ile ilgili degil. Kapsam disi.

## Bloker Tanimi

Faz 1, asagidaki iki onkosul tamamlanmadan yapilamaz:

1. ConceptId'ye getValue() eklenmesi (API parity)
2. Concept.id tipinin ConceptId'ye cevrilmesi (Compatibility Bridge cozumu)

Ama bu iki is, mevcut plandaki sirayla uyumlu degil:

Plan sirasi: Faz 0.5 -> Faz 1 -> Faz 2-3 -> Faz 4
Gercek sira: Faz 0.5 -> Faz 4 (kismi) -> API parity -> Faz 1 -> Faz 2-3

## Alinan Karar

Mimar karari (2026-11-13):

- Plan revizyonu: Evet, ama yeni faz yok
- Blocker kaydi: Evet (bu dosya)
- Faz 1: BLOKLU olarak isaretlendi
- getValue() ekleme: Henuz degil
- Faz 4 one cekme: Henuz degil
- Siradaki is: Compatibility Bridge Assessment

## Siradaki Is — Compatibility Bridge Assessment

Kapsam:
- Concept.ts hangi kimligi uretiyor?
- Hangi factory akislari ConceptID donuyor?
- Hangi repository ConceptID depoluyor?
- ConceptId ile capraz karsilastirmalar nerede olusuyor?
- Faz 4 gercek etki alani nedir?

Bu tamamlaninca: Plan revizyonu gerekip gerekmedigi kesinlesir.

## Degisiklik Gecmisi

- 2026-11-13: Ilk olusturma. Faz 1 bloker kaydi.
