# SECRET ROTATION

**Faz:** 8.1.2
**Tarih:** 2026-10-02
**Referans:** ADR-GOV-007

## 1. Rotation Takvimi

| Secret | Periyod | Sorumlu |
|--------|---------|---------|
| API Keys | 90 gun | DevOps |
| JWT_SECRET | 180 gun | Backend |
| WEBHOOK_SECRET | 90 gun | Backend |
| DATABASE_URL | 180 gun | DBA |

Acil rotation: Sizinti suphesinde derhal.

## 2. API Key Rotation

1. Yeni key uret: openssl rand -hex 32
2. .env.local'a ekle: CERKESCE_API_KEY_DEV_NEW=<yeni>
3. Kod guncelle: hem eski hem yeni key kabul et
4. Deploy et
5. Istemcileri guncelle
6. Eski key'i sil
7. Dokumante et

## 3. JWT Secret Rotation

1. Yeni secret uret: openssl rand -base64 64
2. Environment'a ekle: JWT_SECRET_NEW=<yeni>
3. Kod guncelle: cift dogrulama (eski + yeni)
4. Grace period: 7-30 gun
5. Grace period sonunda eski secret'i sil

## 4. Webhook Secret Rotation

1. Yeni secret uret
2. Hem eski hem yeni kabul et
3. Webhook saglayiciyi guncelle
4. Eski secret'i sil

## 5. Rotation Log

| Tarih | Secret | Sorumlu |
|-------|--------|---------|
| 2026-10-02 | JWT_SECRET | DevOps |

Log konumu: docs/operations/ROTATION_LOG.md

## 6. Acil Durum

Sizinti suphesi:
1. Secret'i derhal gecersiz kil
2. Tum istemcileri bilgilendir
3. Yeni secret uret ve dagit
4. Log incele
5. Post-mortem raporu yaz

## 7. Referanslar

- docs/operations/SECRET_MANAGEMENT.md
- src/infrastructure/config/secretManager.ts
- ADR-GOV-007

**Son Guncelleme:** 2026-10-02
