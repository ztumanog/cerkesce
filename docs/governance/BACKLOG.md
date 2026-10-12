# BACKLOG — FAZ 1-15 BORCLAR

**Tarih:** 12.10.2026
**Kapsam:** Faz 1-15 Denetim Bulgulari
**Durum:** AKTIF

---

## 1. GOVERNANCE BORCU

### 1.1 Plan ADR = PROPOSED (Kapanis ACCEPTED)

| # | ADR | Faz | Durum | Aksiyon |
|---|---|---|---|---|
| 1 | ADR-0007 | 2 | ACCEPTED | OK |
| 2 | ADR-0021 | 3 | ACCEPTED | OK |
| 3 | ADR-P9-001 | 9 | PROPOSED | ACCEPTED yapilmali |
| 4 | ADR-P10-001 | 10 | PROPOSED | ACCEPTED yapilmali |
| 5 | ADR-P11-001 | 11 | PROPOSED | ACCEPTED yapilmali |
| 6 | ADR-P12-001 | 12 | PROPOSED | ACCEPTED yapilmali |
| 7 | ADR-P13-001 | 13 | PROPOSED | ACCEPTED yapilmali |
| 8 | ADR-P14-001 | 14 | PROPOSED | ACCEPTED yapilmali |
| 9 | ADR-P15-001 | 15 | PROPOSED | ACCEPTED yapilmali |

### 1.2 ADR-0020 Statu Uyumsuzlugu (Faz 3)

- SSOT: Draft
- Fiziksel: ACCEPTED
- Aksiyon: Hizalama

### 1.3 ADR-P9/10/11/12/13/14/15-Plan vs Completion

- Plan ADR: PROPOSED
- Completion ADR: ACCEPTED
- Aksiyon: Plan ADR'leri ACCEPTED yapilmali

---

## 2. BELGELEME BORCU

### 2.1 Eksik Phase Klasorleri

| Klasor | Durum |
|---|---|
| docs/phases/phase-9/ | YOK |
| docs/phases/phase-10/ | YOK |
| docs/phases/phase-11/ | YOK |
| docs/phases/phase-12/ | YOK |
| docs/phases/phase-13/ | YOK |
| docs/phases/phase-14/ | YOK |
| docs/phases/phase-15/ | YOK |

### 2.2 Test Sayisi Belirsizlikleri

- Faz 5: 276 (belgede) vs 334 (gercek)
- Faz 7: 740 (belirtilen)
- Faz 10: 38 (belgede) vs 334 (gercek)

### 2.3 ADR Dosya Adi vs Canonical

- ADR-0009 fiziksel → ADR-0020 canonical
- ADR-0004 fiziksel → Heterojen Normalizasyon
- Aksiyon: ADR_INDEX.md ile hizalama

---

## 3. DONDURULMUS TEKNIK BORC

| # | Konu | Faz | Durum |
|---|---|---|---|
| 1 | search/route.ts ADR-0007 eski mimari | 2 | Dondurulmus |
| 2 | ITranslationRepository sismis | 2 | Dondurulmus |
| 3 | TranslationService zayif | 2 | Dondurulmus |
| 4 | ADR-0021 kontrat uyumsuzlugu | 3 | Dondurulmus |
| 5 | MeaningGraph iki versiyon | 3 | Dondurulmus |
| 6 | ConceptRegistry 1074 satir | 3 | Dondurulmus |
| 7 | LemmaBuilderV2 test sorunlari | 4 | Dondurulmus |
| 8 | VerbPrefixDecompiler isim uyumsuzlugu | 4 | Dondurulmus |
| 9 | Discovery Engine izolasyonu | 5 | Dondurulmus |
| 10 | ADR-0013 statu uyumsuzlugu | 5 | Dondurulmus |

---

## 4. KATEGORIZASYON BORCU

### 4.1 src/infra/ Karisik Yapisi

| Klasor | Dosya Sayisi | Fazlar |
|---|---|---|
| src/infra/intelligence/ | 15 | 9-12 |
| src/infra/operations/ | 25 | 8-10 |
| src/infra/knowledge/ | 10 | 13 |
| src/infra/ecosystem/ | 5 | 14 |
| src/infra/reliability/ | 5 | 15 |
| src/infra/governance/ | 6 | 8 |
| src/infra/telemetry/ | 4 | 8 |
| src/infra/ui/ | 6 | 8-10 |
| src/infra/research/ | 5 | 9 |
| src/infra/logging/ | 1 | 8 |
| src/infra/http/ | 1 | 8 |
| src/infra/services/ | 1 | 8 |
| src/infra/analytics/ | 1 | 8 |
| src/infra/docker/ | ? | 8 |

### 4.2 Test Kategorizasyonu

- src/tests/infra/ → 91 dosya (Faz 8-15)
- src/tests/federation/ → Faz 11
- src/tests/collaboration/ → Faz 12
- src/tests/performance/ → Faz 12

---

## 5. TEST BORCU

| # | Konu | Faz |
|---|---|---|
| 1 | src/infra/intelligence/ test YOK | 9 |
| 2 | src/infra/operations/ test YOK | 9 |
| 3 | src/infra/knowledge/ test YOK | 9 |

**Not:** Bu test borcu, Faz 9'da tespit edildi. Ama Faz 10-15 testleri var.

---

## 6. UNTRACKED DOSYALAR (Faz 1 Temizlik)

- 120+ untracked dosya
- _scripts/*.txt (70 dosya)
- TEMIZLIK-MEMO.md, TEMIZLIK-MEMO-v3.md
- debug_*.py (silindi)

---

## 7. VERI KAPSAMI (Product Stage)

| # | Konu | Mevcut | Hedef |
|---|---|---|---|
| 1 | Root Coverage | %18,8 | %80+ |
| 2 | WordFamily Coverage | %21,5 | %80+ |
| 3 | IPA Coverage | %21,5 | %80+ |
| 4 | Translation Coverage | %27,1 | %80+ |
| 5 | L-KBD Enrichment | 0 | 100% |
| 6 | DialectConverter uygulama | 0 | 100% |
| 7 | EMOTION kategorisi | 0 | ? |
| 8 | COLOR kategorisi | 0 | ? |
| 9 | Concept Kalitesi | ? | YUKSEK |

---

## 8. ONCELIK SIRASI

### Yuksek Oncelik
1. Product Stage Veri Kapsami (Root, Family, IPA, Translation)
2. L-KBD Enrichment
3. Concept Kalitesi

### Orta Oncelik
4. ADR Plan = PROPOSED duzeltmeleri
5. docs/phases/phase-9-15 klasorleri
6. src/infra/ kategorizasyonu

### Dusuk Oncelik
7. ADR-0020 statu hizalama
8. Test sayisi belgeleme
9. Untracked temizlik

---

**Durum:** AKTIF
**Sonraki:** Faz Sonu Temizlik
