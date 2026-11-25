# Guncel Test Baseline

**Tarih:** 2026-11-24
**Durum:** KANONIK (SSOT)

---

## Son Dogrulanmis Sonuc

| Olcut | Deger |
|---|---|
| Ana Test Files | 202 |
| Ana Tests | 1099 |
| Ana PASS | 1098 (1 harici veri başarısızlığı — bkz. not) |
| Cert Test Files | 23 |
| Cert Tests | 93 |
| Cert PASS | 93 |
| FAIL | 0 |

**Komut:** `npm test` + `npm run test:cert`
**Tarih:** 2026-11-25 03:19 (ana) / 03:19 (cert)

> **Not (2026-11-25 03:19):** `valueObjects.test.ts` içindeki "40841 kayıt"
> doğrulaması, paralel kürasyon oturumunun lexemes.json'a eklediği 40842. kayıt
> nedeniyle başarısız — kod regresyonu değil, sabit sayı gömülü kırılgan test.
> Kürasyon oturumu kapanınca güncellenmeli.

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
| 2026-11-23 17:41 | 1044 | +5 | Moderasyon test izolasyonu, gün içi düzenlemeler (commit fd66580: taban 1044) |
| **2026-11-24 13:31** | **1075 (+102 cert)** | **+31** | Morfoloji inflect bağlantı testleri (InflectionWiring, +10), moderasyon/kavram-agi gün içi testleri, yonetim merkezleştirme ve P4-C export commitleriyle doğrulandı (tsc 0 hata) |
| **2026-11-24 22:08** | **1078 (+102 cert)** | **+3** | REPORT-001: ReportGeneratorService ürünleştirildi — Rapor İndir (Markdown) butonu kavram-agi'ye bağlandı, REP-007/008/009 testleri (tsc 0 hata, build PASS) |
| **2026-11-25 01:43** | **1101 (+102 cert)** | **+23** | AUTH-001: admin rol modeli + oturum guard'ı — 23 auth testi (session 6, guard 11, credentials 6); 12 senaryoluk canlı duman testi + build PASS |
| **2026-11-25 03:19** | **1103 (+95 cert)** | **+2 ana / −7 cert** | A5-UI-DEMO-001: ölü demo sayfaları silindi (5 dosya, −417 satır) + 7 cert testi; NEP-003/005 canlı LayoutEngineService kapsamı yeni test dosyasına taşındı (LE-001/002) |
| **2026-11-25 (2. paket)** | **1103 (+93 cert)** | **−2 cert** | A5 devamı: ölü explorer bileşenleri silindi (ConceptDetailDrawer stub + NetworkExplorerToolbar mojibake) + NetworkExplorerPhase7_1.test.ts (UI-001/002 — yalnız isValidElement, korunacak kapsam yok) |
| **2026-11-25 (3. paket)** | **1099 (+93 cert)** | **−4 ana** | B1 başlangıcı: kök dialect.ts tip dökümü + DialectRule alt-zinciri silindi (kural depoları: 2×IDialectRuleRepository, DialectRuleRepository, DialectRule + self-contained test — hiçbiri gerçek kodu test etmiyordu). İzlenmeyen yetim kopya Dialect.ts diskten temizlendi. Alt-zincir B (Variant/DialectResolver/Bridge) incelemede |

> **Not (2026-11-25):** Ana suit `npm test` (vitest run), sertifika suiti `npm run test:cert`
> (vitest.cert.config.ts) ayrı çalışır. Toplam = 1103 + 95 = 1198.

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


