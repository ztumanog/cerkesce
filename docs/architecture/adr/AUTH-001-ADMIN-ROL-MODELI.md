# ADR-AUTH-001: Admin Rol Modeli ve Yönetim Alanı Yetkilendirmesi

**Tarih:** 2026-11-25
**Durum:** ACCEPTED (Baş Mimar onayı: 2026-11-25)
**Kategori:** Security
**Etkilenen:** `middleware.ts` (yeni), `src/lib/auth/**` (yeni), `app/api/auth/**` (yeni), `app/admin/giris`, `app/admin/yetkisiz` (yeni), `.env.local` (gizli)

---

## 1. BAĞLAM

Üretime çıkış öncesi en kritik teknik borç: `/admin/moderasyon` ve `/admin/yonetim/*`
sayfaları ile kürasyon/moderasyon API'leri teknik olarak herkese açıktı. Sayfa gizleme
yoktu, API koruması yoktu — bilen herkes moderasyon onaylayabilir, lexeme yazabilir,
toplu kürasyon çalıştırabilirdi.

## 2. KARAR (Baş Mimar onaylı tasarım, 2026-11-25)

### 2.1 Rol modeli

| Rol | Anlamı |
|---|---|
| **Yönetici** | Giriş yapmış yönetici. Tüm /admin alanı + kilitli API'ler |
| **Vatandaş** | Girişsiz herkes. Sözlük, öneri gönderme, durum izleme |

Başlangıçta yalnız bu iki rol. Rol hiyerarşisi / çoklu yönetici / davet sistemi kapsam dışı.

### 2.2 Guard — tek karar noktası

- **Politika:** `src/lib/auth/guard.ts` → `evaluateAccess(path, method, session)` (saf fonksiyon, birim testli)
- **Şifreleme:** `src/lib/auth/session.ts` → HMAC-SHA256 imzalı token (Web Crypto; edge + node uyumlu)
- **Uygulama:** `middleware.ts` — her `/admin` sayfasına ayrı kod YOK

| Alan | Durum |
|---|---|
| `/admin/**` (giris + yetkisiz hariç) | 🔒 Yönetici |
| `/api/admin/**`, `/api/curation/**`, `/api/governance/**` | 🔒 Yönetici |
| `/api/moderasyon` PATCH (onayla/reddet) | 🔒 Yönetici |
| `/api/moderasyon` GET + POST | 🔓 Vatandaş (Kelime Öner akışı) |
| `/`, `/sozluk/*`, `/explorer`, `/api/search`, `/api/morphology/*`, ... | 🔓 Vatandaş |

Davranış: giriş yoksa → `/admin/giris?next=<yol>`; rol yetmezse → `/admin/yetkisiz`;
API'de aynı karar 401/403 JSON döner. **Sayfa gizleme değil, istek düzeyinde engel.**

### 2.3 Bilinçli sapma: `/api/moderasyon` GET+POST açık

Tasarım "Moderasyon API'si kilitli" diyordu; ancak vatandaş `/sozluk/oneri` sayfası
durum izleme için `GET`, öneri göndermek için `POST` kullanıyor ve "vatandaş
sayfalarına dokunma" kuralı var. Çözüm: **method bazlı ayrım** — okuma/gönderme açık,
moderasyon eylemi (PATCH) kilitli. GET'in tüm önerileri herkese listelemesi mevcut
davranıştır (bu ADR ile değişmez); kapsamı daraltmak ayrı iş olarak backlog'a girer
(vatandaş sayfasına dokunulması gerektiğinden).

### 2.4 Kimlik doğrulama

- E-posta + şifre, **sunucuda** kontrol (`src/lib/auth/credentials.ts`)
- Kimlik bilgileri `.env.local`: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (SHA-256 hex, düz metin yok)
- Oturum: HttpOnly + SameSite=Lax çerez, HMAC imzalı, 8 saat TTL
- **Fail-closed:** env eksikse giriş yapılamaz, korumalı alan kapalı kalır
- Kayıt olma YOK · şifre sıfırlama YOK · sosyal giriş YOK

## 3. TESTLER

`src/tests/auth/` — 22 test:
- `AuthSession.test.ts` (6): üret→doğrula, yanlış secret, kurcalanmış payload, süre dolması, bozuk token, UTF-8 e-posta
- `AuthGuard.test.ts` (11): sayfa yönlendirmeleri, rol yetersizliği, API 401/403, moderasyon method istisnası, önek eşleşmesi
- `AuthCredentials.test.ts` (6): doğru/yanlış kimlik, harf duyarsızlığı, fail-closed, boş girdi

## 4. RİSKLER

- **Düşük:** Tek yönetici hesabı — env değişkeni ile tanımlanır, kayıp = yöneticinin .env.local'ı yeniden düzenlemesi
- **Düşük:** 8 saatlik oturum — uzun mühendis seansları için yeterli, gerekirse TTL env'e taşınır
- **Not:** AUTH_SECRET rotasyonu tüm oturumları düşürür (kabul edilebilir; tek yönetici)

## 5. SUPERSESSION

- ADR-EXPRESS-001 — etkilenmez (API koruması Next.js katmanında, Express bootstrap ile ilgisiz)
- PHASES.md — etkilenmez
