# Morphology Engine Charter

## Amac
Kabardeyce kelimelerin kok, morfem, lemma ve cekim yapilarini modellemek.

## Kapsam

### P4-001: MorphologicalAnalysis
- Durum: Kontrat

### P4-002: RootExtractor
- Test: 13/13 PASS
- ADR: ADR-0040

### P4-003: MorphemeParser
- Test: 15/15 PASS

### P4-004: LemmaBuilder
- Test: 10/10 PASS
- ADR: ADR-0024

### P4-005: InflectionHandler
- Test: 5/5 PASS

### P4-006: PossessivePrefixDecompiler
- Test: 15/15 PASS
- Onekler: си-, уи-, и-, ди-, фи-, я-

### P4-007: RootClassifier
- Test: 10/10 PASS
- ADR: ADR-0040

## Mimari Ilkeler

| Ilke | Durum |
|------|-------|
| ADR-ROOT-001 | Korunuyor |
| Runtime Izolasyonu | Korunuyor |
| Sadece veri uretir | Evet |
| Discovery''ye baglanmaz | Evet |
| ADR-0040 (Root Taxonomy) | Uygulaniyor |

## Zincir

PossessivePrefixDecompiler (P4-006)
  -> RootClassifier (P4-007)
  -> RootExtractor (P4-002)
  -> MorphemeParser (P4-003)
  -> LemmaBuilder (P4-004)
  -> InflectionHandler (P4-005)

## Test Durumu

- 305/305 PASS
- Runtime Stabil
- Dataset Runtime'dan Izole
- SemanticRelations Runtime'a Girmiyor

## Sonraki Adimlar

1. NounCaseDecompiler (P4-008)
2. NominalDerivationDecompiler (P4-009)

### P4-008: NounCaseParser
- Isim durum eki cozumleme (Kabardeyce)
- 10 durum: nominative, ergative, instrumental, definite_instrumental, adverbial, plural_nominative, plural_ergative, plural_instrumental, plural_adverbial, bare
- Test: 23/23 PASS
- Kaynak: gl1.pdf (Kumakhov, Isim Morfolojisi)

---

## RUNTIME ISOLATION RULE (Mimar Karari)

### Tek Cumlelik Kural

Morphology Engine analiz uretir, karar uretmez.

### Yasak Importlar

- DiscoveryFacade
- KnowledgeRanker
- SemanticRetrieval
- SearchService
- SuggestionService

### Yasak Davranislar

- Vector Search
- Embedding Lookup
- Result Ranking
- Runtime Decisions

### Izin Verilen Ciktilar

- Root
- Morpheme
- Lemma
- Sense
- Phrase AST
- Syntax AST

### Dogrulama

Get-ChildItem ".\src\domain\morphology" -Filter "*.ts" | Select-String -Pattern "Discovery|KnowledgeRanker|SemanticRetrieval|SearchService|SuggestionService"

Beklenen: Hic sonuc donmemeli.

### Neden?

Gecmiste 7 kez sistem coktu:

Morphology -> Discovery -> Semantic -> Morphology

Dongusel bagimlilik -> sistem kararsiz -> veri kaybi

**Bu kural gevsetilemez.**

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
