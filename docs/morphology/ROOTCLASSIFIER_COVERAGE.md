# ROOTCLASSIFIER COVERAGE REPORT

**Tarih:** 2026-10-02
**Durum:** AKTIF
**Versiyon:** v1.0

---

## 1. AMAC

Bu belge, RootClassifier'in kok siniflandirma kapsamini olcer.
ADR-0040 (Root Taxonomy) uyumunu dogrular.

---

## 2. KOK TIPLERI

| Tip | Tanim | Ornek |
|-----|-------|-------|
| FREE | Tek basina gorunur | унэ, псы, жыг |
| BOUND | Tek basina gorunmez | -сы, -лъы, -ты, -гъы, -къIэ |
| NEUTRAL | Baglama gore degisir | (notr kokler) |
| STABLE | Kararli, degismez | (kararli kokler) |

---

## 3. DAGILIM

### FREE Roots (Serbest Kokler)

| Kok | Anlam | Test |
|-----|-------|------|
| унэ | ev | ✅ |
| псы | su | ✅ |
| жыг | agac | ✅ |
| щIалэ | oglan | ✅ |

### BOUND Roots (Bagli Kokler)

| Kok | Anlam | Test |
|-----|-------|------|
| -сы | (bagli) | ✅ |
| -лъы | (bagli) | ✅ |
| -ты | (bagli) | ✅ |
| -гъы | (bagli) | ✅ |
| -къIэ | (bagli) | ✅ |

### NEUTRAL Roots (Notr Kokler)

| Kok | Anlam | Test |
|-----|-------|------|
| ? | ? | ⏳ |

### STABLE Roots (Kararli Kokler)

| Kok | Anlam | Test |
|-----|-------|------|
| ? | ? | ⏳ |

---

## 4. TEST DURUMU

| Kategori | Test Sayisi | Durum |
|----------|-------------|-------|
| FREE | 4 | ✅ |
| BOUND | 5 | ✅ |
| NEUTRAL | ? | ⏳ |
| STABLE | ? | ⏳ |
| TOPLAM | 10 | ✅ |

---

## 5. ADR-0040 UYUMU

| Kural | Durum |
|-------|-------|
| Root Type bilinmeden Prefix parse YANLIS | ✅ |
| Root Taxonomy, Prefix Slot Grammar'dan ONCE | ✅ |
| RootClassifier girdi: yuzey formu | ✅ |
| RootClassifier cikti: RootType | ✅ |

---

## 6. RUNTIME IZOLASYONU

| Kontrol | Durum |
|---------|-------|
| Discovery import | ✅ Yok |
| KnowledgeRanker import | ✅ Yok |
| SemanticRetrieval import | ✅ Yok |

---

## 7. SONUC

- ✅ 10 test PASS
- ✅ FREE/BOUND siniflandirma calisiyor
- ✅ ADR-0040 uyumlu
- ⏳ NEUTRAL/STABLE genisletme bekliyor

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
