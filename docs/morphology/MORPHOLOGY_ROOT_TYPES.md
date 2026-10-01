# MORPHOLOGY_ROOT_TYPES.md

## Amac
Kabardeyce koklerin siniflandirmasi. Kumakhov (gl4.pdf) temel alinmistir.

Referans: ADR-0022

---

## 1. Free Root (Serbest Kok)

**Tanim:** Tek basina sozluk maddesi olabilen kok.

**Ozellik:**
- Bagimsiz gorunur
- Cekimlenebilir
- Sozlukte kendi maddesi vardir

**Ornek:**
- (gl4.pdf'ten alinacak)

---

## 2. Bound Root (Bagli Kok)

**Tanim:** Tek basina gorunmeyen, mutlaka onek/sonek alan kok.

**Ozellik:**
- Tek basina sozluk maddesi OLAMAZ
- Mutlaka bir morfemle birlikte gorunur
- Morfolojik cekirdek gorevi gorur

**Ornek:**
- -сы
- -лъы
- -ты
- -гъы
- -къIэ

**Kritik:** Bu kokler RootExtractor tarafindan BOUND olarak siniflandirilmali.
Aksi halde parser yanlis kok cikarir.

---

## 3. Neutral Root (Notr Kok)

**Tanim:** Baglama gore free veya bound davranan kok.

**Ozellik:**
- Bazi baglamlarda serbest
- Bazi baglamlarda bagli

**Ornek:**
- (gl4.pdf'ten alinacak)

---

## 4. Stable Root (Kararli Kok)

**Tanim:** Degismeyen, kararli kok.

**Ozellik:**
- Cekimde degismez
- Sabit kalir

**Ornek:**
- (gl4.pdf'ten alinacak)

---

## Parser Sozlesmesi

RootClassifier:
- Girdi: yuzey formu
- Cikti: RootType (FREE | BOUND | NEUTRAL | STABLE)

RootExtractor:
- RootClassifier ciktiisina gore kok cikarir
- BOUND kokler icin ozel islem yapar

---

## Oncelik

Root Type bilinmeden Prefix parse YANLIS sonuc verebilir.
Bu yuzden Root Taxonomy, Prefix Slot Grammar'dan ONCE gelir.

---

## Test Senaryolari

| Kok | Beklenen Tip |
|-----|--------------|
| -сы | BOUND |
| -лъы | BOUND |
| -ты | BOUND |
| -гъы | BOUND |
| -къIэ | BOUND |

---

## Referanslar
- Kumakhov, gl4.pdf
- ADR-0022: Morphological Root Taxonomy
