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

---

## GUNCELLEME (2026-10-02)

### Parser Sayisi: 18

#### Root Katmani (2 parser)
- P4-002: RootExtractor (13 test)
- P4-007: RootClassifier (10 test)

#### Morpheme Katmani (12 parser)
- P4-003: MorphemeParser (15 test)
- P4-006: PossessivePrefixDecompiler (15 test)
- P4-008: NounCaseParser (23 test)
- P4-009: NominalDerivationDecompiler (24 test)
- P4-010: PronounDecompiler (25 test)
- P4-011: NumeralDecompiler (30 test)
- P4-012: VerbDecompiler (24 test)
- P4-013: ParticipleDecompiler (24 test)
- P4-014: AdverbDecompiler (24 test)
- P4-015: PostpositionDecompiler (24 test)
- P4-016: ConjunctionDecompiler (24 test)
- P4-017: ParticleDecompiler (24 test)

#### Lemma Katmani (2 parser)
- P4-004: LemmaBuilder (10 test)
- P4-005: InflectionHandler (5 test)

#### Phrase Katmani (1 parser)
- P4-018: PhraseAnalyzer (30 test)

#### Syntax Katmani (1 parser)
- P4-019: SyntaxAnalyzer (40 test)

### Toplam
- 18 parser
- 621 test PASS

### Runtime Izolasyonu
- Discovery import yok
- KnowledgeRanker import yok
- SemanticRetrieval import yok
- Search Runtime import yok

### Referans
- MORPHOLOGY_SCOPE.md
- PHASE_4_TEKNIK_KAPANIS_MATRISI.md
- ROOTCLASSIFIER_COVERAGE.md

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02

---

## GUNCELLEME (2026-10-02)

### Parser Sayisi: 18

#### Root Katmani (2)
- RootExtractor (13 test)
- RootClassifier (10 test)

#### Morpheme Katmani (12)
- MorphemeParser (15 test)
- PossessivePrefixDecompiler (15 test)
- NounCaseParser (23 test)
- NominalDerivationDecompiler (24 test)
- PronounDecompiler (25 test)
- NumeralDecompiler (30 test)
- VerbDecompiler (24 test)
- ParticipleDecompiler (24 test)
- AdverbDecompiler (24 test)
- PostpositionDecompiler (24 test)
- ConjunctionDecompiler (24 test)
- ParticleDecompiler (24 test)

#### Lemma Katmani (2)
- LemmaBuilder (10 test)
- InflectionHandler (5 test)

#### Phrase Katmani (1)
- PhraseAnalyzer (30 test)

#### Syntax Katmani (1)
- SyntaxAnalyzer (40 test)

### Toplam
- 18 parser
- 621 test PASS

### Runtime Izolasyonu
- Discovery import yok
- KnowledgeRanker import yok
- SemanticRetrieval import yok
- Search Runtime import yok

### Referans
- MORPHOLOGY_SCOPE.md
- PHASE_4_TEKNIK_KAPANIS_MATRISI.md
- ROOTCLASSIFIER_COVERAGE.md

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
