# PHASES.md

## Faz Durumu (Tek Gercek)

| Faz | Ad | Durum | Kanit |
|-----|-----|-------|-------|
| 1 | Foundation / Dataset | CLOSED | 287/287 PASS |
| 2 | Lexeme Model | CLOSED | PROJECT_STATUS.md |
| 3 | Morphological Analysis | CLOSED | Phase 3 Gate Report |
| 4 | Morphology Engine | COMPLETED | PHASE_4_COMPLETION_REPORT.md |
| 5 | Discovery Engine | COMPLETED | PHASE_5_COMPLETION_REPORT.md |
| 6 | API Gateway | TAMAMLANDI | ADR-GOV-005 |
| 7 | Analytics & Export | DEVAM EDIYOR | Sprint 7.0.4 |

## Ayri Arastirma Hatti (Faz Degil)

| Ad | Durum | Kanit |
|----|-------|-------|
| Embedding Research | GATE_COMPLETED | FAZ_6_GATE_KAPANIS_FINAL.md |

**Not:** ADR-GOV-003'e gore Faz 6 = API Gateway'dir.
Embedding calismalari ayri bir arastirma hattidir, faz numarasi almaz.

## Faz 4 Teslimatlari
- P4-001 MorphologicalAnalysis
- P4-002 RootExtractor
- P4-003 MorphemeParser
- P4-004 LemmaBuilder
- P4-005 InflectionHandler

## Faz Kapanis Durumu

| Faz | Kapanis Belgesi | Durum |
|-----|-----------------|-------|
| Faz 4 | PHASE_4_COMPLETION_REPORT.md | Tamamlandi |
| Faz 5 | PHASE_5_COMPLETION_REPORT.md | Tamamlandi |
| Embedding | PHASE_6_COMPLETION_REPORT.md | Gate tamamlandi |

## Kabul Edilen ADR'ler
- ADR-0023 (Verb Prefix Slot Grammar) — KABUL
- ADR-0024 (Lemma Identity Rule / Model A) — KABUL
- ADR-0040 (Morphological Root Taxonomy) — KABUL
- ADR-GOV-003 (Phase Redefinition) — KABUL

## Referans
- docs/governance/PHASE_RECONCILIATION.md
- docs/architecture/adr/ADR-GOV-003-PHASE_REDEFINITION.md

## P4-006 Durumu
**P4-006 PossessivePrefixDecompiler** = Phase 4 Extension

Faz 4 ana teslimatlar (P4-001...P4-005) tamamlandi.
P4-006 ayri bir work item olarak devam ediyor.
