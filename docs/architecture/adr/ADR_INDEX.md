# ADR INDEX — Single Source of Truth (SSOT)

**Tarih:** 2026-10-02
**Versiyon:** v2.0
**Statü:** ✅ Aktif
**Strateji:** ADR-GOV-001

> **Bu dosya, tüm ADR kataloğunun tek doğruluk kaynağıdır (SSOT).**
> Dashboard, README ve Summary bu dosyadan türetilir.

---

## 📌 CANONICAL ↔ PHYSICAL EŞLEME

| Canonical | Başlık | Physical File | Durum | Faz |
|-----------|--------|---------------|-------|-----|
| ADR-0001 | Modüler Tip | `ADR_0001_MODULAR_TYPE_ARCHITECTURE.md` | Accepted | 1 |
| ADR-0002 | Çok Dilli Meaning | `ADR_0002_DOMAIN_MODEL_MEANING_GROUP.md` | Accepted | 1 |
| ADR-0003 | Repository Ayrışımı | `ADR_0003_ITRANSLATIONREPOSITORY_SEPARATION.md` | Accepted | 1 |
| ADR-0004 | Heterojen Normalizasyon | `ADR-ADR_0004_SERVER_ACTIONS_ASYNC_SAFETY.md` | Accepted | 1 |
| ADR-0005 | TranslationGroup | `ADR-0005-TRANSLATIONGROUP_STRATEGY.md` | Accepted | 2 |
| ADR-0006 | Cross Dictionary | `ADR-0006-CROSS_DICTIONARY_MATCHING.md` | Accepted | 2 |
| ADR-0007 | Repository Contract | `ADR-0007-TRANSLATIONREPOSITORY_CONTRACT.md` | Accepted | 2 |
| ADR-0008 | Meaning Representation | `ADR-0008-TRANSLATIONMEANING_REPRESENTATION.md` | Accepted | 2 |
| ADR-0009 | Concept Identity | `ADR-0009-CONCEPT_IDENTITY_STRATEGY.md` | Draft | 3 |
| ADR-0010 | Canonical Identity | `ADR-0015-TRANSLATIONENTRY_CANONICAL_IDENTITY.md` | Accepted | 2 |
| ADR-0011 | Phase 3-7 Freeze | `ADR-0016-Phase3-7-Dondurma-SUPERSEDED.md` | Superseded | 2 |
| ADR-0012 | Filter Flow | `ADR-P2-011-FILTER_FLOW_AUDIT.md` | Accepted | 2 |
| ADR-0015 | TranslationEntry Canonical | `ADR-0015-TRANSLATIONENTRY_CANONICAL_IDENTITY.md` | Accepted | 2 |
| ADR-0017 | WordFamily Concept Mapping | `ADR-0017-WORDFAMILY-CONCEPT-MAPPING.md` | Accepted | 4 |
| ADR-0018 | WordFamilyResolver Scope Boundary | `ADR-0018-WORDFAMILYRESOLVER-SCOPE-BOUNDARY.md` | Accepted | 4 |
| ADR-0019 | GUP Etimology | `ADR-0019-GUP-ETIMOLOGY.md` | Accepted | 4 |
| ADR-0021 | Concept Repository | `ADR-0010-CONCEPT_REPOSITORY.md` | Accepted | 3 |
| ADR-0022 | Meaning Graph | `ADR-0011-MEANING_GRAPH_BOOTSTRAP.md` | Accepted | 3 |
| ADR-0023 | Verb Prefix Slot Grammar | `ADR-0023.md` | Accepted | 4 |
| ADR-0024 | Lemma Identity Rule (Model A) | `ADR-0024.md` | Accepted | 4 |
| ADR-0025 | Dialect Naming | `ADR-0025-DIALECT_NAMING_STANDARD.md` | Accepted | 4 |
| ADR-0030 | Discovery | `ADR-0012-REAL_KNOWLEDGE_DISCOVERY_ASSEMBLY.md` | Accepted | 5 |
| ADR-0031 | Query Semantic | `ADR-0013-QUERY_SEMANTIC_MAPPING.md` | Proposed | 5 |
| ADR-0032 | Network Projection | `ADR_0014_CONCEPT_NETWORK_PROJECTION.md` | Accepted | 5 |
| ADR-0040 | Morphological Root Taxonomy | `ADR-0040.md` | Accepted | 4 |
| ADR-ROOT-001 | Root Taxonomy | `ADR-ROOT-001.md` | Accepted | 4 |
| ADR-P2-011 | Filter Flow Audit | `ADR-P2-011-FILTER_FLOW_AUDIT.md` | Accepted | 2 |
| ADR-P4-001 | Phase 4 Activation | `ADR-P4-001-PHASE4_ACTIVATION.md` | Accepted | 4 |
| ADR-P5-000 | Phase 5 Unlock Approval | `ADR-P5-000-UNLOCK_APPROVAL.md` | Accepted | 5 |
| ADR-P5-001 | Phase 5 Charter | `ADR-P5-001-FAZ5_CHARTER.md` | Accepted | 5 |
| ADR-P5-001-REVIZE | Phase 5 Charter Revize | `ADR-P5-001-REVIZE.md` | Accepted | 5 |
| ADR-P7-001 | Phase 7 Completion Approval | `ADR-P7-001-PHASE_7_COMPLETION_APPROVAL.md` | Accepted | 7 |
| ADR-GOV-001 | Catalog Strategy | `ADR-GOV-001-CANONICAL_CATALOG_STRATEGY.md` | Accepted | — |
| ADR-GOV-002 | Supersession | `ADR-GOV-002-HISTORICAL_SUPERSESSION.md` | Accepted | — |
| ADR-GOV-003 | Phase Redefinition | `ADR-GOV-003-PHASE_REDEFINITION.md` | Accepted | — |
| ADR-GOV-004 | Phase Gate Modeli | `ADR-GOV-004-PHASE_GATE_MODEL.md` | Accepted | — |
| ADR-GOV-005 | Phase 6 Identity Decision | `ADR-GOV-005-PHASE_6_IDENTITY_DECISION.md` | Accepted | — |
| ADR-GOV-006 | Phase 2 Closure Decision | `ADR-GOV-006-PHASE_2_CLOSURE_DECISION.md` | Accepted | — |
| ADR-GOV-007 | Phase 8 Production Readiness | `ADR-GOV-007-PHASE_8_PRODUCTION_READINESS.md` | Proposed | 8.1 |
| ADR-GOV-008 | Phase 8 Scope Definition | `ADR-GOV-008-PHASE_8_SCOPE_DEFINITION.md` | Proposed | 8 |
| ADR-GOV-009 | Analytics Consumption Policy | `ADR-GOV-009-ANALYTICS_CONSUMPTION_POLICY.md` | Proposed | — |
| ADR-GOV-010 | Runtime Decision Authority | `ADR-GOV-010-RUNTIME_DECISION_AUTHORITY.md` | Proposed | — |
| ADR-GOV-011 | API Gateway Strategy | `ADR-GOV-011-API_GATEWAY_STRATEGY.md` | Proposed | 8.2 |
| ADR-GOV-012 | API Hosting Strategy | `ADR-GOV-012-API_HOSTING_STRATEGY.md` | Proposed | 8.5 |
| ADR-P9-001 | Platform Intelligence Layer | `ADR-P9-001-PLATFORM_INTELLIGENCE.md` | Proposed | 9 |

---

## 🗑️ SUPERSEDED

| Canonical | Başlık | Superseded By | Reason |
|-----------|--------|---------------|--------|
| ADR-0011 | Phase 3-7 Freeze | ADR-P4-001 | Phase 3 Complete |

---

## 📊 İSTATİSTİKLER

| Kategori | Sayı |
|----------|------|
| **Toplam** | 43 |
| **Accepted** | 35 |
| **Draft** | 1 |
| **Proposed** | 6 |
| **Superseded** | 1 |
| **Deprecated** | 0 |

---

## 🔗 TÜREV BELGELER

| Belge | Kaynak |
|-------|--------|
| `README.md` | ADR_INDEX.md |
| `ADR_DECISIONS_SUMMARY.md` | ADR_INDEX.md |
| `ADR DASBOARD.md` | ADR_INDEX.md |
| `ADR_ENVANTER.md` | ADR_INDEX.md |

---

## SSOT DECLARATION (Single Source of Truth)

**Tarih:** 2026-10-02
**Karar:** Mimar onayi

Bu dosya, tum ADR katalogunun TEK RESMI KAYNAGIDIR.

### Kural

- Tum ADR'ler bu dosyada listelenir
- Canonical ↔ Physical eslemesi burada yapilir
- Yeni ADR eklenince bu dosya guncellenir
- ADR numaralandirma catismasi bu dosya ile onlenir

### Sorumluluk

- ADR_INDEX.md = Tek otorite
- Diger belgeler bu dosyadan turetilir
- ADR_DASHBOARD.md, ADR_ENVANTER.md, ADR_DECISIONS_SUMMARY.md bu dosyaya bagimlidir

### Ihlal Durumunda

- ADR katalogu tutarsiz hale gelir
- Numaralandirma catismasi olusur
- Mimari kararlar kaybolur

**Bu kural gevsetilemez.**

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02


