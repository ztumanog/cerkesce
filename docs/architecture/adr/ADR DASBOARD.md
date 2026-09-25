# ADR DASHBOARD

**Proje:** Çerkesçe Knowledge Engine
**Tarih:** 2026-09-26
**Statü:** ✅ Aktif
**SSOT:** `ADR_INDEX.md`

> Bu dashboard, `ADR_INDEX.md`'den türetilmiştir.

---

## 📊 GENEL DURUM

| Kategori | Sayı |
|----------|------|
| **Toplam ADR** | 21 |
| **Accepted** | 18 |
| **Draft** | 1 |
| **Proposed** | 1 |
| **Superseded** | 1 |
| **Deprecated** | 0 |

**Doğrulama:** `18 + 1 + 1 + 1 + 0 = 21` ✅

---

## 📋 FAZ BAZLI ADR SAYILARI

| Faz | ADR Sayısı | Durum |
|-----|-----------|-------|
| Faz 1 — Foundation | 4 | ✅ Tamamlandı |
| Faz 2 — Translation Platform | 8 | ✅ Tamamlandı |
| Faz 3 — Concept Engine | 3 | 🔒 Kilitli |
| Faz 5 — Discovery | 3 | 🔒 Kilitli |
| Yönetişim | 3 | ✅ Aktif |

---

## 📌 CANONICAL ↔ PHYSICAL EŞLEME

| Canonical | Başlık | Physical File | Durum |
|-----------|--------|---------------|-------|
| ADR-0001 | Modüler Tip | `ADR_0001_MODULAR_TYPE_ARCHITECTURE.md` | Accepted |
| ADR-0002 | Çok Dilli Meaning | `ADR_0002_DOMAIN_MODEL_MEANING_GROUP.md` | Accepted |
| ADR-0003 | Repository Ayrışımı | `ADR_0003_ITRANSLATIONREPOSITORY_SEPARATION.md` | Accepted |
| ADR-0004 | Heterojen Normalizasyon | `ADR-ADR_0004_SERVER_ACTIONS_ASYNC_SAFETY.md` | Accepted |
| ADR-0005 | TranslationGroup | `ADR-0005-TRANSLATIONGROUP_STRATEGY.md` | Accepted |
| ADR-0006 | Cross Dictionary | `ADR-0006-CROSS_DICTIONARY_MATCHING.md` | Accepted |
| ADR-0007 | Repository Contract | `ADR-0007-TRANSLATIONREPOSITORY_CONTRACT.md` | Accepted |
| ADR-0008 | Meaning Representation | `ADR-0008-TRANSLATIONMEANING_REPRESENTATION.md` | Accepted |
| ADR-0009 | Dialect Naming | `ADR_0009_DIALECT_NAMING_STANDARD.md` | Accepted |
| ADR-0010 | Canonical Identity | `ADR-0015-TRANSLATIONENTRY_CANONICAL_IDENTITY.md` | Accepted |
| ADR-0011 | Phase 3-7 Freeze | `ADR-0016-Phase3-7-Dondurma-SUPERSEDED.md` | Superseded |
| ADR-0012 | Filter Flow | `ADR-P2-011-FILTER_FLOW_AUDIT.md` | Accepted |
| ADR-0020 | Concept Identity | `ADR-0009-CONCEPT_IDENTITY_STRATEGY.md` | Draft |
| ADR-0021 | Concept Repository | `ADR-0010-CONCEPT_REPOSITORY.md` | Accepted |
| ADR-0022 | Meaning Graph | `ADR-0011-MEANING_GRAPH_BOOTSTRAP.md` | Accepted |
| ADR-0030 | Discovery | `ADR-0012-REAL_KNOWLEDGE_DISCOVERY_ASSEMBLY.md` | Accepted |
| ADR-0031 | Query Semantic | `ADR-0013-QUERY_SEMANTIC_MAPPING.md` | Proposed |
| ADR-0032 | Network Projection | `ADR_0014_CONCEPT_NETWORK_PROJECTION.md` | Accepted |
| ADR-GOV-001 | Catalog Strategy | `ADR-GOV-001-CANONICAL_CATALOG_STRATEGY.md` | Accepted |
| ADR-GOV-002 | Supersession | `ADR-GOV-002-HISTORICAL_SUPERSESSION.md` | Accepted |
| ADR-P4-001 | Phase 4 | `ADR-P4-001-PHASE4_ACTIVATION.md` | Accepted |

---

## 🗑️ SUPERSEDED

| Canonical | Başlık | Superseded By | Reason |
|-----------|--------|---------------|--------|
| ADR-0011 | Phase 3-7 Freeze | ADR-P4-001 | Phase 3 Complete |

---

## 📋 ADR KONTROL LİSTESİ

| Kriter | Açıklama | Durum |
|--------|----------|-------|
| **ADR-CHECK-001** | Her Canonical ADR tek kayıt | ✅ |
| **ADR-CHECK-002** | Status zorunlu | ✅ |
| **ADR-CHECK-003** | Canonical ↔ Physical eşleşmesi | ✅ |
| **ADR-CHECK-006** | SUPERSEDED alanları | ✅ |
| **ADR-CHECK-008** | İstatistik doğrulama | ✅ |

---

## 🔗 İLGİLİ BELGELER

- [ADR_INDEX.md](./ADR_INDEX.md) — SSOT
- [ADR_DECISIONS_SUMMARY.md](./ADR_DECISIONS_SUMMARY.md) — Özet
- [README.md](./README.md) — Index
- [ADR_ENVANTER.md](./ADR_ENVANTER.md) — Envanter
- [ADR-GOV-001](./ADR-GOV-001-CANONICAL_CATALOG_STRATEGY.md) — Catalog Strategy

---

**Son Güncelleme:** 2026-09-26
**Sorumlu:** Mimari Ekip
