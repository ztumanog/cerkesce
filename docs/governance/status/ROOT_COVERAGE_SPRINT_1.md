# ROOT COVERAGE SPRINT 1 - RAPOR

**Tarih:** 12.10.2026
**Sprint:** 1 - Root Coverage
**Durum:** TAMAMLANDI

---

## 1. OZET

| Metrik | Baslangic | Bitis | Fark |
|---|---|---|---|
| Toplam kok | 69 | 206 | +137 |
| Root'lu kayit | 4.527 | 7.651 | +3.124 |
| Coverage | %18,8 | %31,8 | +13,0 puan |

---

## 2. YAPILANLAR

### 2.1 Kok Envanteri Genisletildi
- Ilk 50 aday (Gemini) -> +46 kok
- Son 91 aday (Gemini) -> +91 kok
- Toplam: 69 -> 206 kok

### 2.2 Fuzzy Match Uygulandi
- 2.900 kayit atandi (ilk 50 kok)
- 224 kayit atandi (son 91 kok)
- Toplam: +3.124 kayit

### 2.3 Yontem
- startswith prefix match
- Uzunluk siralamasi (uzun kokler once)
- Normalize (I -> I)

---

## 3. HEDEF vs GERCEK

| Hedef | Gercek | Fark |
|---|---|---|
| %35 | %31,8 | -3,2 puan |

Hedefe %91 ulasildi.

---

## 4. BULGULAR

### 4.1 Prefix Match Yetersiz
- Son 91 kok sadece +224 kayit getirdi
- Cunku bu kokler nadir kelimeler
- Lexeme'lerde turemis form var

### 4.2 Orta Match Gerekli
- Suffix + orta match
- Ama yanlis eslesme riski
- Sprint 2'de degerlendirilecek

### 4.3 Kalan Root'suz
- 16.384 kayit root'suz
- %68,2
- Yeni strateji gerekli

---

## 5. SIRADAKI ADIM

### Sprint 1 Kapanisi
- Root Coverage %31,8
- 206 kok
- 7.651 root'lu kayit

### Sprint 2: WordFamily Coverage
- Mevcut: %21,5
- Hedef: %80+
- Yontem: wordFamilyId doldurma

---

**Durum:** TAMAMLANDI
**Sonraki:** Sprint 2 - WordFamily Coverage
