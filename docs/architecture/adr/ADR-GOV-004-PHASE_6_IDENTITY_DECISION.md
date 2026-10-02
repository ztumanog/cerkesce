# ADR-GOV-004: Phase 6 Identity Decision

**Tarih:** 2026-10-02
**Durum:** KABUL EDILDI
**Kategori:** Governance
**Etkilenen:** Phase 6, Embedding

---

## 1. BAGLAM

Phase 6 kimligi icin iki farkli yorum vardi:

| Kaynak | Yorum |
|--------|-------|
| ADR-GOV-003 | Phase 6 = API Gateway |
| Yeni belgeler | Phase 6 = Embedding |

Bu celiski yonetisim karmasasi yaratiyordu.

---

## 2. KARAR

### Phase 6 = API Gateway

**Resmi tanim:** ADR-GOV-003-PHASE_REDEFINITION.md

| Faz | Tanim |
|-----|-------|
| Phase 5 | Discovery Engine |
| **Phase 6** | **API Gateway** |
| Phase 7 | Analytics & Export |

### Embedding = Research Track

Embedding, Vector Search ve LLM ozellikleri:

- Faz 6 DEGILDIR
- Ayri bir arastirma hattidir
- `docs/embedding/` altinda yasar
- ADR-P5-000-UNLOCK_APPROVAL.md ile uyumludur

---

## 3. GEREKCE

1. ADR-GOV-003 kabul edilmis yonetisim kararidir
2. ADR-P5-000 Embedding'i Faz 5 disinda birakmistir
3. Iki farkli calisma ayni faz numarasi altinda toplanamaz
4. Yonetisim karmasasi onlenmelidir

---

## 4. SONUCLAR

### Olumlu

- ✅ Phase 6 kimligi netlesti
- ✅ Embedding arastirma hatti ayrildi
- ✅ Yonetisim karmasasi onlendi

### Olumsuz

- ⚠️ Embedding belgeleri guncellenmeli
- ⚠️ Faz 6 etiketi Embedding icin kullanilmamali

---

## 5. REFERANSLAR

- ADR-GOV-003-PHASE_REDEFINITION.md
- ADR-P5-000-UNLOCK_APPROVAL.md
- ADR-GOV-002-HISTORICAL_SUPERSESSION.md
- PHASE_TIMELINE_RECONCILIATION.md

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
