# ROOT COVERAGE SPRINT 1 - RAPOR

**Tarih:** 12.10.2026
**Sprint:** 1 - Root Coverage
**Durum:** TAMAMLANDI

---

## 1. OZET

| Metrik | Baslangic | Bitis | Fark |
|---|---|---|---|
| Toplam kok | 69 | 295 | +226 |
| Root'lu kayit | 4.527 | 8.025 | +3.498 |
| Coverage | %18,8 | %33,4 | +14,6 puan |

---

## 2. YAPILANLAR

### 2.1 Kok Envanteri Genisletildi (3 tur)
- Ilk 50 aday (Gemini) -> +46 kok
- Son 91 aday (Gemini) -> +91 kok
- 89 aday (NotebookLM) -> +89 kok
- Toplam: 69 -> 295 kok

### 2.2 Fuzzy Match Uygulandi
- 2.900 kayit atandi (ilk 50 kok)
- 224 kayit atandi (son 91 kok)
- 374 kayit atandi (295 kok)
- Toplam: +3.498 kayit

### 2.3 Yontem
- startswith prefix match
- Uzunluk siralamasi
- Normalize (I -> I)
- Latin ID'ler (Kiril yok)

---

## 3. HEDEF vs GERCEK

| Hedef | Gercek | Fark |
|---|---|---|
| %35 | %33,4 | -1,6 puan |

Hedefe %95 ulasildi.

---

## 4. KALAN

- 16.010 kayit root'suz (%66,6)
- Sprint 2: WordFamily Coverage

---

**Durum:** TAMAMLANDI
**Sonraki:** Sprint 2 - WordFamily Coverage
