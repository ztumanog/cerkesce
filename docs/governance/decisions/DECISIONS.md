# DECISIONS - Karar Kayitlari

**Son Guncelleme:** 2026-10-02
**Durum:** Faz 8.1 TAMAMLANDI, Faz 8.2 DEVAM EDIYOR
**SSOT:** docs/architecture/adr/ADR_INDEX.md

---

## GECERLI KARARLAR

### ADR-0023: Verb Prefix Slot Grammar
**Durum:** KABUL EDILDI
**Tarih:** 2026-10-01
**Karar:** Fiil onekleri 7 slot sirasina gore cozumlenir.

---

### ADR-0024: Lemma Identity Rule (Model A)
**Durum:** KABUL EDILDI
**Tarih:** 2026-10-01
**Karar:** Homonimler TEK lemmaId altinda toplanir, isHomonym: true ile isaretlenir.

---

### ADR-0040: Morphological Root Taxonomy
**Durum:** KABUL EDILDI
**Tarih:** 2026-10-01
**Karar:** Kokler 4 tipe ayrilir: Free, Bound, Neutral, Stable.

---

### ADR-P2-013: Phase 2 Closure - CLOSED
**Durum:** CLOSED
**Tarih:** 2026-09-24
**Faz:** 2
**Karar:** Faz 2 resmi olarak KAPANDI.

**Kanitlar:**
- TypeScript PASS
- Build PASS
- Test PASS
- Android Build PASS
- GitHub Release v1.0.0-stable

---

### ADR-GOV-003: Phase Redefinition
**Durum:** KABUL EDILDI
**Tarih:** 2026-09-26
**Karar:** Phase 6 = API Gateway, Phase 7 = Analytics & Export

---

### ADR-GOV-005: Phase 6 Identity Decision
**Durum:** KABUL EDILDI
**Tarih:** 2026-10-02
**Karar:** Phase 6 = API Gateway, Embedding = Research Track

---

### ADR-GOV-006: Phase 2 Closure Decision
**Durum:** ACCEPTED
**Tarih:** 2026-10-02
**Kategori:** Governance
**Karar:** Phase 2 (Translation Platform) resmi olarak CLOSED kabul edilmistir.

**Kanitlar:**
- ADR-0004, ADR-0005, ADR-0006, ADR-0007, ADR-P2-013
- PHASE_2_COMPLETION_REPORT.md
- Main: 659/659 PASS
- Cert: 87/87 PASS

**Sonraki aktif calisma:** Phase 8 Production & Operations

**Referans:** docs/architecture/adr/ADR-GOV-006-PHASE_2_CLOSURE_DECISION.md

---

### ADR-GOV-007: Phase 8 Production Readiness
**Durum:** PROPOSED
**Tarih:** 2026-10-02
**Kategori:** Governance
**Faz:** 8.1

**Karar:**
Phase 8.1 (Production Readiness) kapsaminda asagidaki alanlar ele alinacak:

1. Environment Separation
2. Secret Management
3. Error Tracking
4. Monitoring
5. Governance Validation

**Kapsam Disi:**
- Yeni parser gelistirme
- Discovery davranisi degistirme
- Semantic Retrieval gelistirme
- Embedding urunlestirme

**Kabul Kriterleri:**
- Health endpoints aktif
- Error reporting aktif
- Secret management aktif
- Monitoring aktif
- Cert pipeline PASS

**Referans:** docs/architecture/adr/ADR-GOV-007-PHASE_8_PRODUCTION_READINESS.md

---

### ADR-GOV-008: Phase 8 Scope Definition
**Durum:** PROPOSED
**Tarih:** 2026-10-02
**Kategori:** Governance
**Faz:** 8

**Karar:**
Phase 8 = Production & Operations

**Kapsam:**
1. Production Readiness
2. Deployment
3. Monitoring
4. Logging
5. Alerting
6. Operational Security

**Kapsam Disi:**
- Yeni parser
- Morphology genisletme
- Discovery mantigi
- Semantic Retrieval

**Referans:** docs/architecture/adr/ADR-GOV-008-PHASE_8_SCOPE_DEFINITION.md

---

### ADR-GOV-009: Analytics Consumption Policy
**Durum:** PROPOSED
**Tarih:** 2026-10-02
**Kategori:** Governance
**Etkilenen:** Analytics, Discovery

**Karar:**
Analytics katmani veri uretir. Ama Discovery kararlarini degistirmemeli.

**Referans:** docs/architecture/adr/ADR-GOV-009-ANALYTICS_CONSUMPTION_POLICY.md

---

### ADR-GOV-010: Runtime Decision Authority
**Durum:** PROPOSED
**Tarih:** 2026-10-02
**Kategori:** Governance

**Karar:**
Runtime kararlari icin tek otorite.

**Referans:** docs/architecture/adr/ADR-GOV-010-RUNTIME_DECISION_AUTHORITY.md

---

### ADR-GOV-011: API Gateway Strategy
**Durum:** PROPOSED
**Tarih:** 2026-10-02
**Kategori:** Governance
**Faz:** 8.2

**Karar:**
Hybrid (Next.js UI Gateway + Express Business Gateway + Redis Cache)

**Container Modeli:**
| Container | Rol | Port |
|-----------|-----|------|
| Next.js | UI Gateway | 3000 |
| Express | Business/API Gateway | 3001 |
| Redis | Cache | 6379 |

**Referans:** docs/architecture/adr/ADR-GOV-011-API_GATEWAY_STRATEGY.md

---

### ADR-P7-001: Phase 7 Completion Approval
**Durum:** ACCEPTED
**Tarih:** 2026-10-02
**Kategori:** Governance

**Karar:**
Phase 7 (Analytics & Export) resmi olarak COMPLETED kabul edilmistir.

**Kanitlar:**
- 10 Faz 7 test dosyasi
- Main: 659/659 PASS
- Cert: 87/87 PASS
- Toplam: 746/746 PASS

**Sonraki:** Phase 8 Production & Operations

**Referans:** docs/architecture/adr/ADR-P7-001-PHASE_7_COMPLETION_APPROVAL.md

---

## ARSIV

- ADR-P2-012: ARSIVLENDI (ADR-P2-013 ile degistirildi)
- ADR-P2-011: Filter Flow Audit (COMPLETED)

---

**Imza:** Mimar
**Tarih:** 2026-10-02
**SSOT:** docs/architecture/adr/ADR_INDEX.md
