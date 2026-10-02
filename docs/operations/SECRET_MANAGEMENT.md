# SECRET MANAGEMENT

**Faz:** 8.1.2
**Tarih:** 2026-10-02
**Referans:** ADR-GOV-007

## 1. Ilkeler

1. Hardcoded secret YASAK.
2. Tum secret'lar environment variable'dan okunur.
3. .env.local ASLA git'e commit edilmez.
4. Production secret'lari Vercel/GitHub Secrets'ta.
5. Her secret'in rotation proseduru vardir.

## 2. Secret Kategorileri

| Kategori | Ornek | Zorunlu |
|----------|-------|---------|
| API Keys | CERKESCE_API_KEY_DEV/TEST/PROD | Evet |
| JWT | JWT_SECRET, JWT_EXPIRES_IN | Evet |
| Webhook | WEBHOOK_SECRET | Opsiyonel |
| Database | DATABASE_URL | Opsiyonel |
| Error Tracking | SENTRY_DSN | Opsiyonel |

## 3. Dosya Yapisi

| Dosya | Amac | Git'e |
|-------|------|-------|
| .env.example | Sablon | Evet |
| .env.local | Yerel dev | Hayir |
| .env.test | Test | Evet |
| .env.staging | Staging | Evet |
| .env.production | Production | Evet |

Git'e giden dosyalarda gercek secret OLMAZ.

## 4. Yukleme Akisi

process.env
  -> SecretManager.load()
  -> Zod validation
  -> SecretConfig (tip guvenli)
  -> Uygulama kodu

Kod ornegi:

    import { SecretManager } from '@/infrastructure/config/secretManager';
    const jwtSecret = SecretManager.getJwtSecret();

## 5. Hardcoded Secret Taramasi

    Get-ChildItem ".\src" -Recurse -Include *.ts,*.tsx |
      Select-String -Pattern "password\s*=\s*['""]|secret\s*=\s*['""]"

Beklenen: Bos cikti.

## 6. Referanslar

- docs/operations/SECRET_ROTATION.md
- src/infrastructure/config/secretManager.ts
- ADR-GOV-007

**Son Guncelleme:** 2026-10-02
