# PHASE_6_API_GATEWAY_CHARTER.md

**Tarih:** 2026-10-02
**Durum:** OLGUNLASTIRILDI
**Karar:** Phase 6 = API Gateway
**Versiyon:** v2.0

---

## 1. AMAC

Bu belge, Phase 6 (API Gateway) hedeflerini, mimarisini ve
uygulama planini tanimlar. ADR-GOV-003 ve ADR-GOV-005 ile uyumludur.

---

## 2. KAPSAM

### Phase 6 = API Gateway

| Bilesen | Aciklama | Durum |
|---------|----------|-------|
| REST API | HTTP endpoint'ler | Mevcut |
| GraphQL | GraphQL endpoint'ler | Planli |
| Concept Network API | Kavram agi API'si | Mevcut |
| Interactive Explorer | Etkilesimli kesif | Mevcut |
| OpenAPI 3.0 | API dokumantasyonu | Mevcut |
| Rate Limiting | Istek sinirlama | Planli |
| Authentication | Kimlik dogrulama | Planli |
| Monitoring | Izleme | Planli |

### Embedding = Research Track

- Ayri bir arastirma hatti
- Urun fazi degil
- docs/embedding/ altinda

---

## 3. MIMARI

### Katmanlar

Client -> API Gateway (REST) -> Controller -> DiscoveryFacade -> ConceptGraphAdapter -> ConceptNetworkDTO

### Bilesenler

| Katman | Dosya | Gorev |
|--------|-------|-------|
| Controller | ConceptNetworkController.ts | HTTP istekleri |
| Controller | DiscoveryGatewayController.ts | Gateway |
| Route | discoveryRoutes.ts | Route tanimlari |
| Adapter | ConceptGraphAdapter.ts | DTO donusumu |
| Spec | openapi/ | OpenAPI 3.0 |

---

## 4. REST ENDPOINT'LERI

### Mevcut

| Method | Path | Aciklama |
|--------|------|----------|
| GET | /api/v1/discovery/concept-network | Kavram agi |

### Query Parametreleri

| Parametre | Tip | Aciklama |
|-----------|-----|----------|
| q | string | Arama sorgusu (zorunlu) |
| max_nodes | number | Maksimum dugum (varsayilan: 500) |

### Yanit Formati

- nodes: id, label, nodeType, depth
- edges: source, target, relationType
- metadata: schemaVersion, isDirected, nodeCount, edgeCount, isTruncated, rootConceptId

---

## 5. HATA YONETIMI

### HTTP Status Kodlari

| Kod | Aciklama |
|-----|----------|
| 200 | Basarili |
| 400 | Gecersiz istek (q eksik) |
| 404 | Bulunamadi |
| 429 | Cok fazla istek (rate limit) |
| 500 | Sunucu hatasi |

### Hata Formati

- error: BAD_REQUEST
- message: Query parameter 'q' is required.

---

## 6. OLGUNLASTIRMA PLANI

### Faz 6.4: Rate Limiting

- IP basina istek sinirlama
- Dakikada 100 istek
- 429 yanit

### Faz 6.5: Authentication

- API key
- JWT token
- OAuth 2.0

### Faz 6.6: Monitoring

- Prometheus metrics
- Health check
- Logging

### Faz 6.7: GraphQL

- GraphQL endpoint
- Schema tanimi
- Resolver'lar

### Faz 6.8: Caching

- Redis cache
- TTL
- Invalidation

---

## 7. SINIRLAR

### API Gateway YAPABILIR

- HTTP istekleri karsilamak
- JSON dondurmek
- GraphQL sorgulari
- REST endpoint'leri
- Rate limiting
- Authentication
- Caching
- Monitoring

### API Gateway YAPAMAZ

- Morphology hesaplamak
- Semantic analiz yapmak
- Runtime karar vermek
- Discovery'yi degistirmek

---

## 8. TEST DURUMU

| Test | Durum |
|------|-------|
| Phase6_1_ConceptNetworkAPI.cert.test.ts | 5/5 PASS |
| API Gateway testleri | 5/5 PASS |

---

## 9. REFERANSLAR

- ADR-GOV-003-PHASE_REDEFINITION.md
- ADR-GOV-005-PHASE_6_IDENTITY_DECISION.md
- PHASE_6_IDENTITY_DECISION.md
- PHASE_TIMELINE_RECONCILIATION.md

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
