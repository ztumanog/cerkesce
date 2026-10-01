# Morphology Engine Charter

## Amac
Kabardeyce kelimelerin kok, morfem, lemma ve cekim yapilarini modellemek.

## Kapsam

### P4-001: MorphologicalAnalysis
- Kelimeleri kok, govde, ek olarak ayristirmak
- Durum: Kontrat

### P4-002: RootExtractor
- Kok cikarma
- Girdi: Lexeme formu
- Cikti: Root ID
- Test: 5/5 PASS

### P4-003: MorphemeParser
- Morfem ayristirma
- Girdi: Lexeme formu
- Cikti: Morpheme listesi
- Test: 5/5 PASS

### P4-004: LemmaBuilder
- Lemma olusturma
- Girdi: Lexeme grubu
- Cikti: Lemma ID
- Test: 5/5 PASS

### P4-005: InflectionHandler
- Cekim isleme
- Girdi: Kok + ek
- Cikti: Cekimli form
- Test: 5/5 PASS

## Mimari Ilkeler

| Ilke | Durum |
|------|-------|
| ADR-ROOT-001 | Korunuyor |
| Runtime Izolasyonu | Korunuyor |
| Sadece veri uretir | Evet |
| Discovery'ye baglanmaz | Evet |

## Ornek

sэ (sut) -> LEMMA-SHE -> MILK
sэ (mermi) -> LEMMA-SHE -> BULLET

лъэгъун -> R-LEGHUN
лъагъун -> R-LEGHUN
лъагъуныгъэ -> R-LEGHUN

## Dogrulama

- 287/287 PASS
- Runtime Stabil
- Dataset Runtime'dan Izole
- SemanticRelations Runtime'a Girmiyor
