# ISSUE: Morfolojik Veri Kalitesi ve Etimolojik Ayrıştırma

**Tarih:** 07.10.2026
**Durum:** Açık
**Öncelik:** Yüksek

---

## Mevcut Durum

| Alan | Doluluk | Oran |
|---|---|---|
| rootIds | 4.961 / 19.074 | %26 |
| wordFamilyId | 5.411 / 19.074 | %28 |
| conceptId | 5.352 / 19.074 | %28 |
| examples | 3.343 / 19.074 | %17 |
| ipa | 6.174 / 19.074 | %32 |

---

## Tespit Edilen Sorunlar

### 1. Homonym (Eş Sesli) Kökler

R-GU (гу) kökü örneği:
- Kalp/Zihin: гуфӀэ, губж, гурыӀуэн
- Grup: гуп, гупышхуэ
- Araba: гу, гурыгъ
- Tarım: гуэдз (buğday), гуэл (göl)
- Zamir: гуэр (birisi)
- Akrabalık: гуащэ (prenses)

### 2. Kelime Kartı Hatası
- гуфӀэ için R-TKHE/SPRING görünüyor
- Drawer'da R-GU/THOUGHT doğru

### 3. conceptId Aşırı Genel
- ANIMAL: 2.870
- COLOR: 1.488

### 4. examples Eksik
- 3.343 / 19.074

---

## Çözüm Planı

| # | İş | Kazanç | Zorluk | Öncelik |
|---|---|---|---|---|
| 1 | Kelime kartı düzelt | UI | ** | Hemen |
| 2 | examples genişlet | +5.600 | * | Hemen |
| 3 | Homonym kökleri ayır | +4.000 | **** | Orta |
| 4 | rootIds genişlet | +14.000 | *** | Orta |
| 5 | conceptId alt kavramlara ayır | +4.000 | **** | Orta |

---

## Önerilen Yapı

Dosya: _scripts/ornek_root_yapisi.json

---

## Dilbilimsel Referanslar

- Colarusso, J. (1999) - Tleph and Lady Tree
- Kuipers, A.H. (1960/1975) - Proto-Çerkesçe kökler
- Hewitt, B.G. (1991) - Kabardeyce grameri
- Jaimoukha, A. (1997) - Kabardian-English Dictionary
- Kardanov, B. (1957) - Kabardian-Russian Dictionary

---

## Tamamlananlar

- [x] R-HAE: 856 -> 13
- [x] R-ADA: 65 -> 32
- [x] R-DA: 225 -> 0
- [x] HTML temizligi (6.463)
- [x] Wiktionary parse (50.208 sayfa)
- [x] examples entegrasyonu (3.343)
- [x] ipa duzeltmesi
