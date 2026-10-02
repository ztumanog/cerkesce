# ADR-GOV-011: API Gateway Strategy

**Durum:** PROPOSED
**Tarih:** 2026-10-02
**Kategori:** Governance
**Faz:** 8.2
**Etkilenen:** Next.js, Express, Docker, CI/CD

---

## 1. BAGLAM

Projede iki API katmani var:

1. **Next.js Route Handler** (`app/api/search/route.ts`)
   - Aktif
   - Frontend tarafindan kullaniliyor

2. **Express API** (`src/infrastructure/api/*`)
   - 13 endpoint (health, metrics, discovery, analytics, dashboard, graphql, batch-export, concept-network)
   - Pasif (frontend cagirmiyor)
   - Faz 6-7 emegi

Sprint 8.2 (Deployment) icin hangi API katmaninin aktif olacagi
belirsiz.

---

## 2. KARAR

**Yol C (Hybrid):**

    Browser
       |
       v
    Next.js (UI Gateway)
       |
       v rewrite
    Express (Business/API Gateway)
       |
       v
    Redis (Cache)

**Next.js:** Sadece UI sunar. `/api/*` isteklerini Express'e proxy'ler.

**Express:** Tum API endpoint'lerini sunar. Business logic burada.

**Redis:** Cache katmani.

---

## 3. CONTAINER MODELI

| Container | Rol | Port |
|-----------|-----|------|
| Container 1 | Next.js (UI) | 3000 |
| Container 2 | Express API | 3001 |
| Container 3 | Redis (Cache) | 6379 |

---

## 4. NEXT.JS REWRITES

`next.config.ts`'ye eklenecek:

    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://express-api:3001/api/:path*',
        },
      ];
    }

---

## 5. GEREKCE

1. **Olceklenebilir:** Her container bagimsiz olceklenebilir
2. **Test edilebilir:** API ve UI ayri test edilir
3. **Ayristirilmis:** Sorumluluklar net
4. **Mevcut emek korunur:** Express kodu cop olmaz

---

## 6. SONUCLAR

### Olumlu
- Express kodu korunur
- UI ve API bagimsiz gelisir
- Modern microservice mimarisi

### Olumsuz
- 3 container yonetimi
- Next.js rewrites konfigurasyonu
- CORS yerine proxy (daha guvenli)

---

## 7. SPRINT 8.2 PLANI

| Sprint | Ad | Icerik |
|--------|-----|--------|
| 8.2.1 | Docker | Dockerfile (Next.js + Express), docker-compose.yml |
| 8.2.2 | GitHub Actions | Main + Cert pipeline |
| 8.2.3 | Staging | Staging environment |
| 8.2.4 | Production | Production config |
| 8.2.5 | Rollback Strategy | Rollback proseduru |

---

## 8. REFERANSLAR

- ADR-GOV-003-PHASE_REDEFINITION.md
- ADR-GOV-005-PHASE_6_IDENTITY_DECISION.md
- ADR-GOV-007-PHASE_8_PRODUCTION_READINESS.md
- PHASE_8_PLATFORM_OPERATIONS_CHARTER.md

---

**Imza:** Mimar
**Tarih:** 2026-10-02
