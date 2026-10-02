# CERT_PIPELINE.md

**Tarih:** 2026-10-02
**Durum:** AKTIF
**Karar:** Main + Cert ayri pipeline

---

## 1. AMAC

Bu belge, Cert pipeline'inin ana test hattindan ayrildigini belgeler.
ADR-GOV-003 ve ADR-GOV-005 ile uyumludur.

---

## 2. IKI PIPELINE

### Main Pipeline (Release Kriteri)

| Ozellik | Deger |
|---------|-------|
| Config | vitest.config.ts |
| Test | 621 |
| Dosya | 92 |
| Komut | npm test |
| Amac | Release kriteri |

### Cert Pipeline (Kalite Hatti)

| Ozellik | Deger |
|---------|-------|
| Config | vitest.cert.config.ts |
| Test | 87 |
| Dosya | 25 |
| Komut | npm run test:cert |
| Amac | Kalite guvencesi |

---

## 3. KOMUTLAR

### Main Pipeline

npm test

### Cert Pipeline

npm run test:cert

### Hepsi

npm run test:all

### CI/CD

npm run test:ci
npm run test:cert:ci

---

## 4. FARKLAR

| Konu | Main | Cert |
|------|------|------|
| Amac | Release | Kalite |
| Bloke | Evet | Hayir |
| Sure | 11s | 3s |
| Test | 621 | 87 |
| Exclude | Yok | Yok |

---

## 5. NEDEN AYRI?

1. Cert testleri daha yavas
2. Cert testleri ozel ortam gerektirebilir
3. Main pipeline hizli kalmali
4. Cert testleri ayri raporlanmali

---

## 6. CI/CD ONERISI

### Main Branch

- npm test (621 PASS)
- npm run build
- Deploy

### Cert Branch

- npm run test:cert (87 PASS)
- Rapor

### Release

- npm run test:all (708 PASS)
- Deploy

---

## 7. SONUC

- ✅ Main Pipeline = 621 test
- ✅ Cert Pipeline = 87 test
- ✅ Toplam = 708 test
- ✅ Ayri raporlama
- ✅ ADR-GOV-003 ile uyumlu

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
