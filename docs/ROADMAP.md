# ROADMAP

**Son Guncelleme:** 2026-09-30
**Versiyon:** v6.0 (Faz C-10 COMPLETED)

---

## FAZ DURUMU

| Faz | Baslik | Durum |
|-----|--------|-------|
| Faz 1 | Foundation | CLOSED |
| Faz 2 | Translation Platform | CLOSED |
| Faz 3 | Concept Engine | READY FOR GATE REVIEW |
| Faz 4 | Data Mapping & Integrity | COMPLETED |
| Faz 5 | Discovery Engine | COMPLETED (2026-09-29) |
| Faz 6 | API & Explorer | CERTIFIED |
| Faz C-3 | Linguistic Dataset (Ilk) | COMPLETED |
| Faz C-4 | Linguistic Dataset (Genisletme) | COMPLETED |
| Faz C-5 | Semantic Field Expansion | COMPLETED |
| Faz C-6 | Evidence Strengthening | COMPLETED |
| Faz C-7 | Yeni Aileler | COMPLETED |
| **Faz C-8** | **Buyutme/Kucultme Ekleri** | **COMPLETED (2026-09-29)** |
| Faz C-9 | Korpus Dogrulamasi | SIRADA |

---

## FAZ C-8 - BUYUTME/KUCULTME EKLERI (COMPLETED)

**Tarih:** 2026-09-29
**Durum:** COMPLETED

### Sayisal Durum

| Kategori | Faz C-7 | Faz C-8 | Artis |
|---|---|---|---|
| Kok | 50 | **58** | +8 |
| Lexeme | 177 | **200** | +23 |
| Morfem | 70 | **75** | +5 |
| Semantic Relation | 154 | **175** | +21 |
| Word Family | 18 | **30** | +12 |

### Eklenen Kokler (8)

R-NYBZHY, R-ADE, R-ANE, R-1UEKHU, R-MAKHUE, R-SHYPHUE, R-TETE, R-DADE

### Eklenen Aileler (12)

WF-NYBZHY, WF-ADE, WF-ANE, WF-K1UASH, WF-SHYPHUE, WF-TETE, WF-DADE, WF-BZE, WF-1UEKHU, WF-MAF1E, WF-UNE, WF-MAKHUE

### Kritik Kesifler

1. Cerkes akrabalik sistemi (paternal/maternal ayrimi)
2. -шхуэ ↔ -цӀыкӀу simetrik ek cifti
3. ныбжь homonym (yas != golge)
4. шъуэ → шхуэ duzeltmesi
5. дадэшхуэ = buyuk dede
6. DialectConverter Python v3 portu

---

## FAZ C-9 HEDEFLERI

### 1. Korpus Dogrulamasi
- Adyghe Web Corpus'tan yeni kelimeler
- Corpus frequency dogrulama
- Yeni lexeme'ler

### 2. Diyalekt Donusumu Genisletme
- DialectConverter yeni kurallar
- ADY ↔ KBD cift yonlu
- Test setini buyutme

### 3. Yeni Aileler
- Somatik kokler
- Zihinsel kokler
- Doga kokleri

### 4. Semantik Iliskiler
- Metaforik zincirler
- Kavramsal kumeler

### Hedefler

| Kategori | Mevcut | Hedef |
|---|---|---|
| Kok | 58 | 65+ |
| Lexeme | 200 | 220+ |
| Morfem | 75 | 80+ |
| Semantic Relation | 175 | 200+ |
| Word Family | 30 | 35+ |

---

## LINGUISTIC DATASET LAYER

**Status:** Experimental / Data Layer Only

**Components:**
- Roots Dataset (58 kok)
- Morphemes Dataset (75 morfem)
- Word Families Dataset (30 aile)
- Lexeme Dataset (200 lexeme)
- Semantic Relations (175 iliski)

**Constraints:**
- Runtime access forbidden
- Discovery Engine access forbidden
- Concept Engine access forbidden

**Implemented in:** src/domain/linguistic/
**Data in:** public/data/linguistic/
**Isolation Verified:** Yes (2026-09-29)

---

**Imza:** Gelistirme Ekibi
**Tarih:** 2026-09-29
