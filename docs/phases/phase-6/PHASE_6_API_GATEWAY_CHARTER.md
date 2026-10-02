# PHASE_6_API_GATEWAY_CHARTER.md

**Tarih:** 2026-10-02
**Durum:** PLANLANDI
**Karar:** Phase 6 = API Gateway

---

## 1. AMAC

Bu belge, Phase 6 (API Gateway) hedeflerini tanimlar.
ADR-GOV-003 ile uyumludur.

---

## 2. KAPSAM

### Phase 6 = API Gateway

| Bilesen | Aciklama |
|---------|----------|
| REST API | HTTP endpoint'ler |
| GraphQL | GraphQL endpoint'ler |
| Concept Network API | Kavram agi API'si |
| Interactive Explorer | Etkilesimli kesif |

### Embedding = Research Track

- Ayri bir arastirma hatti
- Urun fazi degil
- docs/embedding/ altinda

---

## 3. TESLIMATLAR

### Faz 6.1: API Gateway (CERTIFIED)

- Tarih: 2026-09-02
- Belge: PHASE_6_1_STATUS.md
- Bilesenler:
  - ConceptNetworkDTO
  - ConceptGraphAdapter
  - DiscoveryFacade
  - ConceptNetworkController
  - OpenAPI 3.0 Spec

### Faz 6.2: Interactive Explorer (CERTIFIED)

- Tarih: 2026-09-02
- Belge: PHASE_6_2_STATUS.md
- Bilesenler:
  - NetworkExplorerPage
  - CytoscapeAdapter
  - CytoscapeCanvas
  - GraphMerger

### Faz 6.3: Embedding (Research Track)

- Tarih: 2026-09-30
- Belge: FAZ_6_GATE_KAPANIS_FINAL.md
- Durum: Arastirma

---

## 4. SINIRLAR

### API Gateway YAPABILIR

- HTTP istekleri karsilamak
- JSON dondurmek
- GraphQL sorgulari
- REST endpoint'leri

### API Gateway YAPAMAZ

- Morphology hesaplamak
- Semantic analiz yapmak
- Runtime karar vermek

---

## 5. SONUC

- Phase 6 = API Gateway
- Embedding = Research Track
- ADR-GOV-003 ile uyumlu

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
