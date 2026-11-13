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

## Cozum (2026-11-13)

Bu bloker, asagidaki adimlarla cozuldu:

| # | Adim | Commit |
|---|---|---|
| M.1 | ConceptId.getValue() eklendi (API parity) | 7fda7f5 |
| M.2 | Concept.ts bridge kaldirildi (id: ConceptId) | ef1edf3 |
| Faz 1 | 10 test dosyasi ConceptId SSOT'a gecti | ef1edf3 |
| Faz 2 | ConceptFacade donusturuldu | ef1edf3 |

### Sonuc

- tsc --noEmit: YESIL
- vitest run: 218/218 dosya, 1074/1074 test
- ConceptID import: 14 -> 3
- ConceptId import: 11 -> 21

### Kalan

3 ConceptID import (Faz 3, 5, 6 icin):
1. ConceptID.ts (alias, Faz 5'te silinecek)
2. ConceptRepository.ts (Faz 3)
3. CanonicalIdentityGuard.test.ts (Faz 6)

### Bloker Durumu

KAPALI - M.2 + Faz 1 ile cozuldu.


## BLOKER KAPANDI — MIGRATION TAMAMLANDI (2026-11-13)

Bu bloker kaydi, SSOT ConceptId migration tamamlandigi icin KAPATILMISTIR.

### Kapanis Kaniti

| Kontrol | Sonuc |
|---|---|
| ConceptID import | 0 |
| ConceptId import | 21 |
| ConceptID.ts dosyasi | Silindi |
| Tum testler | 218/218 dosya, 1085/1085 test |
| tsc --noEmit | exit 0 |
| git status | Temiz |

### Cozum Adimlari (tumu tamamlandi)

1. API parity: ConceptId.getValue() eklendi (7fda7f5)
2. Bridge cozumu: Concept.ts'ten ConceptID kaldirildi (ef1edf3)
3. Test katmani: 10 test dosyasi ConceptId'ye gecti (ef1edf3)
4. Servis katmani: ConceptFacade donusturuldu (ef1edf3)
5. Repository: ConceptRepository interface (df8360c)
6. Guard testi: CanonicalIdentityGuard guncellendi (b59670a)
7. Alias silme: ConceptID.ts silindi (03b221b)
8. Test kapsami: ConceptId.test.ts eklendi (1b49efa, a03691f)

### Sonuc

BLOKER KAPALI. Migration tamamlandi.
