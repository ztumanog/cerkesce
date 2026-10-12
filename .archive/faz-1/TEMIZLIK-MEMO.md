# 🧹 Çerkesçe Sözlük — Veri Temizlik Memo

**Tarih:** 2026-10-07  
**Durum:** Devam ediyor

---

## 📊 Mevcut Durum

| Öğe | Değer | Durum |
|-----|-------|-------|
| Toplam kayıt | 24.874 | ✅ |
| Lemma | 9.449 | ✅ |
| ConceptId | 5.427 | ✅ |
| Translations | 5.982 | ✅ |
| Mükerrer ID | 141 | ⚠️ |
| ANIMAL kategorisi | 2.866 (yanlış) | 🔴 |

---

## 🎯 Yapılacaklar

### 1. Mükerrer ID'leri Düzelt (141 kayıt)

**Sorun:** `L-D0BAD18AD18D` 13 kez, `L-D0BAD18AD183` 10 kez...

**Çözüm:** Her mükerrer ID'ye suffix ekle (`-2`, `-3`, ...)

**Script:** `_scripts/mukerrer_id_duzelt.py`

### 2. ANIMAL Kategorisini Temizle (2.866 kayıt)

**Sorun:** ANIMAL kategorisinde hayvan olmayan kelimeler var:
- `мазае` (Şubat) → Ay
- `сыхьэт` (Saat) → Zaman
- `лъэн` (Atlamak) → Fiil
- `помидор` (Domates) → Bitki

**Çözüm:** Hayvan anlamı içermeyenleri `conceptId = null` yap

**Script:** `_scripts/animal_temizle.py`

### 3. Diğer ConceptId'leri Düzelt

**Sorun:** `COLOR` (1.488 kayıt), `FOOD` (57), `BODY` (52)... Aynı sorun olabilir.

**Çözüm:** Her kategoriyi ayrı ayrı incele

**Script:** `_scripts/concept_denetim.py`

---

## 📋 Temizlik Sırası

1. ✅ Yedek al
2. ⏳ Mükerrer ID'leri düzelt
3. ⏳ ANIMAL kategorisini temizle
4. ⏳ COLOR kategorisini temizle
5. ⏳ FOOD kategorisini temizle
6. ⏳ BODY kategorisini temizle
7. ⏳ Diğer kategorileri temizle
8. ⏳ Test et

---

## 🛠️ Kullanılacak Script'ler

| Script | İş |
|--------|-----|
| `mukerrer_id_duzelt.py` | Mükerrer ID'leri düzelt |
| `animal_temizle.py` | ANIMAL kategorisini temizle |
| `concept_denetim.py` | Tüm kategorileri denetle |
| `yedek_al.py` | Her adım öncesi yedek |

---

## 📁 Yedekler

| Yedek | Tarih | Not |
|-------|-------|-----|
| `lexemes.json.bak-2026-10-07-083534` | 08:35 | ✅ ConceptId dolu |
| `lexemes.json.bak-temizlik-oncesi-*` | 14:xx | ✅ Temizlik öncesi |
| `lexemes.json.bak-id-*` | 15:xx | ✅ ID düzeltme öncesi |
| `lexemes.json.bak-animal-*` | 15:xx | ✅ ANIMAL temizleme öncesi |

---

## 🎯 Hedef

- ✅ Tüm `conceptId`'ler doğru
- ✅ Mükerrer ID yok
- ✅ Kartlarda temiz anlam
- ✅ Concept Explorer çalışıyor

---

## 📝 Notlar

- `ANIMAL` kategorisi **tamamen yanlış** — düzeltilmeli
- `COLOR` ve `FOOD` da şüpheli
- Mükerrer ID'ler **mojibake** kaynaklı
- Her adım öncesi **yedek al**
- Test: `http://localhost:3000/kavram/animal`

---

**Son Güncelleme:** 2026-10-07 15:xx