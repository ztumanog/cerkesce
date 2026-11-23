# ADR-EXPRESS-001: Express Bootstrap Emekliliği

**Tarih:** 2026-11-24
**Durum:** ACCEPTED (Baş Mimar onayı: 2026-11-24)
**Kategori:** Architecture
**Etkilenen:** `src/server.ts`, `package.json` (dev:api, start:api), `src/infrastructure/api/**` (değişmez — korunur)

---

## 1. BAĞLAM

Phase 6 (API Gateway) fazında mimari hedef şuydu:

```
Next.js UI → Express API Gateway → Discovery / Analytics / Governance
```

`src/server.ts` bu mimarinin giriş noktasıydı: `npm run dev:api` / `npm run start:api`
ile 3001 portunda ayağa kalkıyor, `/api/v1/*` uçlarını yayınlıyordu.

Bugün bu katmanın tamamı UI tarafından **kullanılmıyor**. Next.js `app/api` rotaları
yerine geçti.

## 2. KANIT (2026-11-23/24 taramaları)

| Kanıt | Yöntem | Sonuç |
|---|---|---|
| UI'dan Express'e çağrı | `app/`, `src/components`, `src/hooks` içinde `3001`, `api/v1`, `NEXT_PUBLIC_API` araması | **Sıfır sonuç** |
| `src/server.ts` tüketicisi | import taraması | **Sıfır** (yalnızca package.json scriptleri) |
| Endpoint karşılıkları | Uç uca tarama | `/api/v1/discovery` → `app/api/discovery/*`; `/api/v1/analytics` → client-side ExportEngine/NetworkAnalytics/LargeGraphOptimizer; `/api/v1/dashboard` + `/governance` → governance/intelligence/operations/executive sayfaları domain'i doğrudan import ediyor |
| Monitoring uçları | Tüketici araması | `/api/v1/health`, `/metrics` — UI tüketicisi yok |

Kaynak: backend/UI servis kesişim taraması (2026-11-23) + `check-unused-modules` altyapısı.

## 3. KARAR (onay sonrası yürürlüğe girer)

**Express bootstrap emekliye ayrılır.** Tek commit'te:

1. `src/server.ts` silinir
2. `package.json`'dan `dev:api` ve `start:api` scriptleri kaldırılır
3. Bu ADR'in durumu `Accepted` yapılır

## 4. KORUMA KAPSAMI (silinmeyecek)

**Express bootstrap ≠ Controller katmanı.** Aşağıdakiler korunur:

- `src/infrastructure/api/**` — controller'lar ve middleware'ler:
  - `ConceptNetworkController`, `BatchExportController` vb. **cert testleri** tarafından
    referanslanıyor (`src/tests/api/Phase6_1_ConceptNetworkAPI.cert.test.ts`,
    `npm run test:cert` kapsamında çalışır)
  - `ArchitectureConsistencyAdvisor` (`src/infra/intelligence/`), `src/infrastructure/api/routes`
    dizininin varlığını denetliyor (PHASES.md "Phase 6 = API Gateway" tutarlılık kontrolü)
- `express` paketi bağımlılıkta kalır (korunan controller katmanı import ediyor)

Controller katmanının akıbeti (Next.js rotalarına tam geçiş ya da silme) **bu ADR'in
kapsamı dışındadır** — ayrı karar gerektirir.

## 5. RİSKLER

- **Düşük:** Silinen giriş noktasının hiçbir canlı tüketicisi yok (Kanıt tablosu).
- **Dikkat:** `dev:api`'yi bilen bir geliştirici varsa (dokümantasyonda geçmiyor —
  kontrol edildi) bilgilendirme commit mesajıyla yapılır.
- **Geri dönüş:** Git geçmişinde `src/server.ts` her zaman geri getirilebilir.

## 6. YASAK İFADELER (Accepted sonrası)

- ❌ "İki API sunucumuz var"
- ❌ "Express gateway'i çağırmamız gerekiyor"
- ✅ "API katmanı Next.js app/api'dir; Express bootstrap emekliye ayrıldı (ADR-EXPRESS-001)"

## 7. SUPERSESSION

- ADR-0001 (Modular Type Architecture) — etkilenmez
- PHASES.md "Phase 6 = API Gateway" kaydı — tarihsel olarak doğrudur, değiştirilmez
  (gateway işlevi Next.js'e taşındı; faz kaydı tarihtir)
