# ROADMAP.md

## Faz Durumu (Tek Gerçek — PHASES.md ile uyumlu)

| Faz | Ad | Durum |
|-----|-----|-------|
| 1 | Foundation / Dataset | CLOSED |
| 2 | Translation Platform | CLOSED |
| 3 | Concept Foundations | CLOSED |
| 4 | Morphology Engine | COMPLETED |
| 5 | Discovery Engine | COMPLETED |
| 6 | API Gateway | COMPLETED |
| 7 | Analytics & Export | COMPLETED |
| 8 | Production & Operations | COMPLETED |
| 9 | Platform Intelligence | COMPLETED |
| 10-15 | Platform Intelligence Program | COMPLETED |

**NOT:** Phase 15 = SON BUYUK Faz. Bundan sonrasi Capability Tracks olarak planlanmisti;
Kasim 2026'dan itibaren gelisme MVP modeliyle yurutuluyor (asagiya bakin).
**Referans:** PHASES.md, ADR-GOV-013

## MVP Dönemi (2026-11)

| MVP | Kapsam | Durum | Karar / Tarih |
|---|---|---|---|
| MVP-1 | Arama → Sonuç Listesi → Kelime Detayı | CLOSED | KARAR-13 + KARAR-14 (2026-11-08) |
| MVP-1.1 | Öneriler (/api/search yan ürünü) | CLOSED | KARAR-14 (2026-11-08) |
| MVP-2 | Latin Arama (normalize katmanı) | CLOSED | KARAR-15 + Mimar onayı (2026-11-11) |

**İlke (KARAR-14):** Yeni özellikler mevcut MVP-1 akışına eklenir; yeni paralel sistem kurulmaz.
**Kürasyon yazma yeri:** doğrudan `lexemes.json` (KARAR-16, 2026-11-14).

## Ayri Arastirma Hatti (Faz Değil)

| Ad | Durum |
|----|-------|
| Embedding Research | GATE_COMPLETED |

**Not:** ADR-GOV-003'e gore Faz 6 = API Gateway'dir.

## Faz 4 Teslimatlari
- P4-001 MorphologicalAnalysis
- P4-002 RootExtractor
- P4-003 MorphemeParser
- P4-004 LemmaBuilder
- P4-005 InflectionHandler

## Sonraki Adimlar

> **Güncelleme (2026-11-23):** Aşağıdaki Capability Track listesi tarihsel planlamadır.
> MVP modeline geçildi (KARAR-13/14); güncel öncelikler için
> governance/reports/CURATION_AND_NAVIGATION_UPDATE_2026-11-15.md ve KARAR-13..16 belgelerine bakın.

### Capability Tracks (tarihsel plan)
- **Track A — Operations** (Aktif): Alert Deduplication, Cooldown, Incident Correlation, Multi-Region, Capacity Scaling
- **Track B — Intelligence** (Tamamlandı): Recommendation Tuning, Confidence, Explainability, Scenario Simulation
- **Track C — Knowledge** (Tamamlandı): ADR Search, Knowledge Graph, Historical Reasoning, Traceability, Executive Memory
- **Track D — Research** (Araştırma): Embedding, Vector Search, Semantic Similarity, LLM Retrieval

### UI/UX Oncelikleri
- **UI-1**: Governance Dashboard Hardening
- **UI-2**: Operations Dashboard Hardening
- **UI-3**: Intelligence Dashboard
- **UI-4**: Knowledge Explorer
- **UI-5**: Executive View

**Referans:** PHASE_PROGRAM_CLOSURE.md, ADR-GOV-013

