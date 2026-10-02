# ADR-GOV-012: API Hosting Strategy

**Tarih:** 2026-10-03
**Durum:** PROPOSED
**Kategori:** Governance
**Faz:** 8.5
**Etkilenen:** Express API, Redis, Vercel

---

## 1. BAGLAM

Phase 8.2 (Deployment) tamamlandi. Ancak:

- Next.js UI → Vercel'de ✅
- Express API → Henuz deploy edilmedi ❌
- Redis → Henuz deploy edilmedi ❌

Mimar onayi ile Express API'nin canli ortama alinmasi gerekiyor.

---

## 2. KARAR

Express API icin hosting platformu secilecek.

### Adaylar

| Platform | Arti | Eksi |
|----------|------|------|
| Railway | Kolay, ucretsiz tier | Sinirli kaynak |
| Render | Kolay, ucretsiz tier | Cold start |
| Azure Container Apps | Kurumsal, olceklenebilir | Karmasik |
| Azure App Service | Kurumsal, kolay | Maliyetli |
| Fly.io | Global, hizli | Ogrenme egrisi |

### Oncelik Kriterleri

1. **Kolay deploy** (Dockerfile mevcut)
2. **Ucretsiz/uygun tier**
3. **Redis destegi**
4. **Health check**
5. **Log/Monitoring**

---

## 3. ONERILEN: Railway

**Gerekce:**
- Dockerfile mevcut (Sprint 8.2.1)
- Tek komutla deploy
- Redis add-on var
- Health check destegi
- Ucretsiz tier yeterli (500 saat/ay)

**Deploy adimlari:**
1. Railway hesabi
2. GitHub repo bagla
3. `Dockerfile.api` sec
4. Env degiskenleri ekle
5. Deploy

---

## 4. KAPSAM

### Sprint 8.5.1: Platform Secimi
- Railway/Render karsilastirma
- Mimar onayi

### Sprint 8.5.2: Express Deployment
- Dockerfile.api deploy
- Env degiskenleri
- Health check

### Sprint 8.5.3: Redis Deployment
- Redis add-on
- Baglanti testi

### Sprint 8.5.4: Vercel Entegrasyonu
- `next.config.ts` rewrites guncelle
- API URL env

---

## 5. RISKLER

| Risk | Onlem |
|------|-------|
| Cold start | Keep-alive |
| Maliyet | Ucretsiz tier |
| Redis kaybi | Backup |
| CORS | API URL whitelist |

---

## 6. REFERANSLAR

- ADR-GOV-011-API_GATEWAY_STRATEGY.md
- PHASE_8_4_COMPLETION_REPORT.md
- docker-compose.yml
- Dockerfile.api

---

**Imza:** Mimar
**Tarih:** 2026-10-03
