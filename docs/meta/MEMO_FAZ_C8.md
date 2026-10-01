# MEMO: Faz C-8 Tamamlandi, Faz C-9 Baslangic

**Tarih:** 2026-09-30
**Proje:** E:\projeler\Cerkesce
**Konu:** Faz C-8 tamamlandi, Faz C-9 baslayacak

---

## GUNCEL DURUM

| Metrik | Deger | Hedef | Durum |
|---|---|---|---|
| Roots | 58 | 55+ | ✅ |
| Lexemes | 200 | 200+ | ✅ |
| Morphemes | 75 | 75+ | ✅ |
| Semantic Relations | 175 | 175+ | ✅ |
| Word Families | 30 | - | ✅ |
| Test | 232/232 | 232 | ✅ |

---

## FAZ C-8 OZET

### Tamamlanan Asamalar

| Asama | Is | Sonuc |
|---|---|---|
| 1 | R-NYBZHY koku | 50 -> 51 |
| 2 | M-SHXUE, M-C1YQ1U guncelleme | ✅ |
| 3.0 | 4 yeni kok | 51 -> 55 |
| 3.1 | 9 -шхуэ lexeme'i | 177 -> 186 |
| 3.2 | 8 -цӀыкӀу lexeme'i | 186 -> 194 |
| 3.3 | 6 akrabalik lexeme'i | 192 -> 198 |
| 3.4 | 2 dede lexeme'i | 198 -> 200 |
| 4 | Word Families guncelleme | 18 -> 30 |
| 5 | 5 yeni morfem | 70 -> 75 |
| 6 | 21 yeni semantik iliski | 154 -> 175 |
| Bonus | DialectConverter Python v3 portu | 40/40 PASS |

### Yeni Kokler (8)

R-NYBZHY, R-ADE, R-ANE, R-1UEKHU, R-MAKHUE, R-SHYPHUE, R-TETE, R-DADE

### Yeni Aileler (12)

WF-NYBZHY, WF-ADE, WF-ANE, WF-K1UASH, WF-SHYPHUE, WF-TETE, WF-DADE, WF-BZE, WF-1UEKHU, WF-MAF1E, WF-UNE, WF-MAKHUE

### Kritik Kesifler

1. **Cerkes akrabalik sistemi:** Paternal/maternal ayrimi cok net
   - Amca (baba kardesi) = адэ къуэш (KBD) / атэш (ADY)
   - Dayi (anne kardesi) = анэ къуэш (KBD) / анэш (ADY)
   - Hala (baba kiz kardesi) = адэшыпхъу (KBD) / атэшыпхъу (ADY)
   - Teyze (anne kiz kardesi) = анэшыпхъу

2. **-шхуэ ↔ -цӀыкӀу simetrik ek cifti:**
   - -шхуэ: buyuk, yasli, ulu
   - -цӀыкӀу: kucuk, genc, onemsiz

3. **ныбжь homonym:**
   - ныбжь¹ = yas, omur
   - ныбжь² = golge, siluet

4. **шъуэ → шхуэ duzeltmesi:**
   - ADY standart: шхуэ
   - Sozluk kaniti: Адыгэ-урыс псалъалъэ (2008)

5. **дадэшхуэ** = buyuk dede (KBD)

6. **DialectConverter Python v3 portu:**
   - 40/40 PASS (%100)
   - ф → ху, Phase 8 (ы dusmesi) gibi eksik kurallar eklendi

---

## DOSYA KONUMLARI

| Dosya | Konum | Deger |
|---|---|---|
| roots.json | public/data/linguistic/ | 58 |
| lexemes.json | public/data/linguistic/ | 200 |
| morphemes.json | public/data/linguistic/ | 75 |
| semantic_relations.json | public/data/linguistic/ | 175 |
| word_families.json | public/data/linguistic/ | 30 |
| DialectConverter.ts | src/domain/linguistic/ | 40/40 PASS |

---

## ONEMLI NOTLAR

### Homonym Uyarisi
- къуэ (vadi) != къуэ (ogul)
- ныбжь (yas) != ныбжь (golge)
- къуэпс (asma) -> R-PSY

### Diyalekt Farki
- Adigece: къо -> Kabardeyce: къуэ
- Adigece: къош -> Kabardeyce: къуэш
- Adyghe Web Corpus kullan

### ADR-ROOT-001
- Linguistic Dataset Layer runtime'dan izole
- SemanticRelations runtime'a girmez
- Root != Concept

### .gitignore
- _scripts/ ve scripts/ ignore ediliyor
- data/*.csv ignore ediliyor
- *_backup_* ignore ediliyor

---

## GIT DURUMU

Son commit'ler (Faz C-8):
- d88c215 docs: Belge hizalama - Faz C-8 metrikleri
- 67a30f1 Faz C-8: Tamamlama raporu
- 935d840 Faz C-8 Asama 6: Semantic Relations (154 -> 175)
- 7c30ef5 Faz C-8 Asama 5: 5 yeni morfem (70 -> 75)
- 57a0c6e Faz C-8 Asama 4: Word Families (18 -> 30)

---

## FAZ C-9 HEDEFLERI

### 1. Korpus Dogrulamasi
- Adyghe Web Corpus'tan yeni kelimeler
- Corpus frequency dogrulama
- Yeni lexeme'ler ekleme

### 2. Diyalekt Donusumu Genisletme
- DialectConverter yeni kurallar
- ADY ↔ KBD cift yonlu
- Test setini buyutme

### 3. Yeni Aileler
- Somatik kokler: лъэ (ayak), пэ (burun), Ӏэ (el)
- Zihinsel kokler: гу (kalp), щхьэ (bas)
- Doga kokleri: псы (su), мафӀэ (ates), жьы (eski/hava)

### 4. Semantik Iliskiler
- Metaforik zincirler
- Kavramsal kumeler

### 5. Sozluk Kaynaklari
- Yeni akademik kaynaklar
- Wiktionary entegrasyonu

### Hedefler (Faz C-9)

| Kategori | Mevcut | Hedef |
|---|---|---|
| Kok | 58 | 65+ |
| Lexeme | 200 | 220+ |
| Morfem | 75 | 80+ |
| Semantic Relation | 175 | 200+ |
| Word Family | 30 | 35+ |

---

## YENI SOHBETTE ILK IS

1. Bu memo'yu yukle
2. git log --oneline -5 ile durumu kontrol et
3. псы, псэ, нэ, гу ailelerini goster
4. Yeni hedef: 220+ lexeme

---

**Hazirlayan:** Dipo
**Tarih:** 2026-09-30
