# ADR-GOV-003: Phase 5-6-7 Yeniden Tanımlama

**Tarih:** 2026-09-26
**Durum:** ✅ Kabul Edildi
**Kategori:** Governance
**Etkilenen:** Phase 5, Phase 6, Phase 7

---

## Bağlam

Önceki ADR'lerde:

| Faz | Eski Tanım |
|-----|------------|
| Phase 5 | Corpus Analytics |
| Phase 6 | Embedding Engine |
| Phase 7 | Foundation Dataset |

Yeni belgelerde:

| Faz | Yeni Tanım |
|-----|------------|
| Phase 5 | Discovery Engine |
| Phase 6 | API Gateway |
| Phase 7 | Analytics & Export |

Bu değişim **ADR ile kayıtlı değil.**

---

## Karar

### Faz Yeniden Tanımlama

| Faz | Yeni Tanım | Kapsam |
|-----|------------|--------|
| **Phase 5** | Discovery Engine | P5-001, P5-002, P5-003, P5-004 |
| **Phase 6** | API Gateway | GraphQL, REST API |
| **Phase 7** | Analytics & Export | Kullanıcı davranışları, raporlama |

### Supersession

Eski tanımlar **SUPERSEDED** olarak işaretlenir.

---

## Sonuç

- ✅ Faz 5-6-7 yeni tanımlar resmileşti
- ✅ İzlenebilirlik sağlandı
- ✅ ADR kaydı oluşturuldu

---

## Referans

- `PHASES.md`
- `ROADMAP.md`
- `PROJECT_STATUS.md`

---

## GUNCELLEME (2026-10-02)

### Faz 6 Detaylandirma

Onceki karar:
Phase 6 = API Gateway

Yeni karar (Mimar onayi):
Phase 6 = API Gateway
Embedding = Research Track

Alt Fazlar:
- Phase 6.1: API Gateway (2026-09-02)
- Phase 6.2: Interactive Explorer (2026-09-02)
- Phase 6.3: Embedding (Research Track)

### Kanitlar

| Alt Faz | Belge | Durum |
|---------|-------|-------|
| 6.1 | PHASE_6_1_STATUS.md | CERTIFIED |
| 6.2 | PHASE_6_2_STATUS.md | CERTIFIED |
| 6.3 | FAZ_6_GATE_KAPANIS_FINAL.md | TAMAMLANDI |

### Referans

- PHASE_TIMELINE_RECONCILIATION.md
- docs/certification/PHASE_6_1_STATUS.md
- docs/certification/PHASE_6_2_STATUS.md
- docs/phases/phase-6/FAZ_6_GATE_KAPANIS_FINAL.md

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
