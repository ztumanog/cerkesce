# Guncel Test Baseline

**Tarih:** 2026-11-23
**Durum:** KANONIK (SSOT)

---

## Son Dogrulanmis Sonuc

| Olcut | Deger |
|---|---|
| Ana Test Files | 194 |
| Ana Tests | 1039 |
| Ana PASS | 1039 |
| Cert Test Files | 26 |
| Cert Tests | 102 |
| Cert PASS | 102 |
| FAIL | 0 |

**Komut:** `npm test` + `npm run test:cert`
**Tarih:** 2026-11-23 15:17 (ana) / 02:33 (cert)

---

## Son Eklenen Moduller

### Morphology (P4-018: PhraseAnalyzer) — 2026-10-16 kaydi (tarihsel)
- **Dosya:** src/tests/domain/morphology/PhraseAnalyzer.test.ts
- **Test sayisi:** 30+ (PH-001 ... PH-030)
- **Kapsam:** 8 obek tipi (BARE, NumP, AdjP, PossP, PP, PartP, VP, NP)
- **Katki:** +18 test (1010 -> 1028)

### 2026-11 sonrası değişiklikler
- latinNormalize.test.ts eklendi (MVP-2, 6 test)
- ConceptId.test.ts eklendi (SSOT migration, +11)
- Budanan altyapı servislerinin 26 yetim testi silindi (commit 3bf3f96)
- Morfoloji/sözdizimi genişletmeleri (ön ek çözme, birleşik fiiller vb.)

---

## Test Sayisi Degisimi

| Donem | Ana Test | Fark | Neden |
|---|---|---|---|
| Onceki baseline | 1010 | - | - |
| 2026-10-16 | 1028 | +18 | Morphology (PhraseAnalyzer) |
| 2026-11-11 | 1048 (+6 latinNormalize) | +20 | MVP-2: latinNormalize testleri (MVP-2-KAPANIS.md) |
| 2026-11-13 | 1085 | +11 | SSOT ConceptId migration (SSOT_MIGRATION_FINAL_REPORT_2026-11-13.md) |
| **2026-11-23** | **1006 (+102 cert)** | **-79** | Budanan altyapı servisleriyle ilişiksiz testler silindi (commit 3bf3f96, 26 yetim test) + sonraki test düzenlemeleri |
| 2026-11-23 (öğleden sonra) | 1040 | +34 | curationValidate birim testleri (+32), bulk-route AUDIT-02 senaryoları, gün içindeki test düzenlemeleri |
| **2026-11-23 15:17** | **1039 (+102 cert)** | **-1** | Yetim Hotfix001_DataLoading.test.ts silindi (dictionaryService modülüyle birlikte — check-unused-modules temizliği) |

> **Not (2026-11-23):** Ana suit `npm test` (vitest run), sertifika suiti `npm run test:cert`
> (vitest.cert.config.ts) ayrı çalışır. Toplam = 1039 + 102 = 1141.

---

## Tarihsel Kayitlar

Asagidaki belgeler tarihsel test sayilari icerir, degistirilmez:

| Belge | Sayi | Donem |
|---|---|---|
| CERTIFICATION_PHASE_02_DICTIONARY.md | 104/104 | Phase 2 |
| ADR-0015 | 104/104 | Phase 2 |
| PROJECT_ROADMAP.md | 287/287 | Phase 1 |
| PROJECT_ROADMAP.md | 621/621 | Phase 4 |
| PROJECT_STATUS.md | 87/87 | Phase 6 |
| AGENTS.md | 231/231 | FAZ 5 (tarihsel) |
| MVP-2-KAPANIS.md | 1048/1048 + 6 | MVP-2 (2026-11-11) |
| SSOT_MIGRATION_FINAL_REPORT_2026-11-13.md | 1085 | SSOT migration (2026-11-13) |
| Bu belge (eski surum) | 1028/1028 | 2026-10-16 baseline (tarihsel) |

---

*Bu belge SSOT'dur. Guncelleme: yeni test sonucu alindiginda.*


