# ADR-GOV-007: Phase 8 Production Readiness

**Durum:** PROPOSED
**Tarih:** 2026-10-02
**Kategori:** Governance
**Faz:** 8.1
**Etkilenen:** PHASES.md, PROJECT_STATUS.md, ROADMAP.md, DECISIONS.md

---

## 1. BAĞLAM

Phase 7 tamamlanmış ve sistem aşağıdaki yeteneklere ulaşmıştır:

- Analytics (DialectAnalytics, NetworkAnalytics)
- Export (ExportEngine, SVG, Canvas PNG, CSV)
- API Gateway (REST + GraphQL)

Ancak **üretim hazırlığı** eksiktir:

- Environment ayrımı yok (dev/test/prod)
- Secret management merkezi değil
- Error tracking yok
- Monitoring yok
- Alerting yok

Bu eksiklikler nedeniyle sistem **teknik olarak güçlü** ama 
**operasyonel olarak hazır değildir.**

---

## 2. KARAR

**Phase 8.1 aşağıdaki alanları kapsar:**

### Sprint 8.1.1 — Environment Separation
- `.env.local`, `.env.test`, `.env.staging`, `.env.production`
- Environment değişken doğrulaması
- Production fallback yok

### Sprint 8.1.2 — Secret Management
- API Keys, JWT Secrets, Webhook Secrets
- Hardcoded secret yasak
- Secret rotation prosedürü

### Sprint 8.1.3 — Error Tracking
- Global error handler
- Exception middleware
- Error reporting (Sentry veya OpenTelemetry)
- Kişisel veri loglanmaz

### Sprint 8.1.4 — Monitoring
- `/api/health` endpoint
- `/api/detailed-health` endpoint
- `/api/metrics` endpoint (Prometheus format)
- API uptime, error rate, cache hit rate ölçümü

### Sprint 8.1.5 — Governance Validation
- Runtime Isolation kontrolü
- ADR kataloğu senkron
- Cert pipeline ayrı
- Main pipeline ayrı
- Faz 6 = API Gateway doğrulaması
- Embedding = Research Track doğrulaması

---

## 3. KAPSAM DIŞI

Bu ADR kapsamında **YOK**:

- Yeni parser geliştirme
- Discovery davranışı değiştirme
- Semantic Retrieval geliştirme
- Embedding ürünleştirme
- Yeni özellik ekleme

**Morphology Scope Freeze devam ediyor.**

---

## 4. KABUL KRİTERLERİ

| Kriter | Durum |
|--------|-------|
| Environment Separation (Dev/Test/Prod) | ⏳ |
| Secret Management (Merkezi) | ⏳ |
| Error Reporting | ⏳ |
| Monitoring (Health + Metrics) | ⏳ |
| Alerting | ⏳ |
| Production Readiness | ⏳ |
| Main Test: 653/653 PASS | ✅ |
| Cert Test: 87/87 PASS | ✅ |
| Runtime Isolation | ✅ |

---

## 5. RİSKLER

| Risk | Önlem |
|------|-------|
| Secret sızıntısı | Vault + Audit log |
| Production veri kaybı | Backup + Rollback |
| Monitoring eksikliği | Zorunlu metrikler |
| Scope creep | ADR zorunlu |
| Runtime isolation ihlali | Otomatik testler |

---

## 6. SIRALAMA

Mimar'ın önerdiği sıra:

1. Environment
2. Secrets
3. Error Tracking
4. Monitoring
5. Production

Bu tamamlanmadan sistem operasyonel olarak hazır sayılmaz.

---

## 7. REFERANSLAR

- ADR-GOV-004-PHASE_GATE_MODEL.md
- ADR-GOV-005-PHASE_6_IDENTITY_DECISION.md
- ADR-GOV-006-PHASE_2_CLOSURE_DECISION.md
- ADR-P7-001-PHASE_7_COMPLETION_APPROVAL.md
- PHASE_8_PLATFORM_OPERATIONS_CHARTER.md

---

**İmza:** Mimar
**Tarih:** 2026-10-02
