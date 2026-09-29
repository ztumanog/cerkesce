# CORPUS VERIFICATION REPORT
## Faz C-9.1.2 — Circassian Parallel Corpus Doğrulaması

**Tarih:** 2026-09-30
**Corpus:** adiga-ai/circassian-parallel-corpus v1.0
**Lisans:** CC BY 4.0
**Toplam Çift:** 331,468
**Commit:** `3350ffc`

---

## 1. YÖNETİCİ ÖZETİ

Faz C-9 kapsamında projeye **331,468 çiftlik paralel Çerkesçe-Rusça corpus** kazandırıldı. Bu corpus kullanılarak mevcut **200 lexeme, 58 root ve 30 word family** doğrulandı ve tüm frekans değerleri yenilendi.

**Sonuçlar:**
- **Kök doğrulama: %100** (58/58)
- **Aile doğrulama: %100** (30/30)
- **Lexeme doğrulama: %79.5** (159/200)
- **6 yeni aile** eklendi (30 → 36)

**Kritik bulgu:** Mevcut `corpusFrequency` değerleri **güvenilmez** çıktı. C-8'de kullanılan corpus farklıymış. Yeni değerler **akademik corpus**'a dayanıyor.

---

## 2. CORPUS KÜNYESİ

| Özellik | Değer |
|---|---|
| Kaynak | https://huggingface.co/datasets/adiga-ai/circassian-parallel-corpus |
| Yazar | Anzor Qunash (adiga.ai) |
| Yıl | 2025 |
| Lisans | CC BY 4.0 |
| Toplam çift | 331,468 |
| Adyghe (ady) | 111,294 |
| Kabardian (kbd) | 220,174 |
| Atıf | `docs/NOTICE` |

### Split Dağılımı

| Split | Dil | Çift |
|---|---|---|
| kbd_ru | Kabardian → Rusça | 120,218 |
| ru_kbd | Rusça → Kabardian | 99,956 |
| ady_ru | Adyghe → Rusça | 57,305 |
| ru_ady | Rusça → Adyghe | 53,989 |

### Kaynak Çeşitliliği

- **Sözlükler:** Тхаркахо (1991), Водождоков (1960), Апажев/Коков (2008)
- **Folklor:** Нартский эпос
- **Atasözleri ve deyimler**
- **Ders kitapları**
- **Crowdsourced çeviriler**

---

## 3. DOĞRULAMA SONUÇLARI

### 3.1 Lexeme Coverage: %79.5

| Metrik | Değer |
|---|---|
| Toplam lexeme | 200 |
| Bulundu | **159** |
| Bulunamadı | **41** |
| Coverage | **%79.5** |

**Bulunan örnek:** `L-GUF1E` (гуфӀэ) — eski frekans 84, gerçek frekans **29**.

**Bulunamayan 41 lexeme** `lexemes_pending_review.json`'a taşındı.

### 3.2 Root Coverage: %100

| Metrik | Değer |
|---|---|
| Toplam root | 58 |
| Bulundu | **58** |
| Coverage | **%100** |

**Tüm kökler corpus'ta doğrulandı.** En yüksek frekanslı kök `R-F` (ф): **32,267**.

### 3.3 Word Family Coverage: %100

| Metrik | Değer |
|---|---|
| Toplam aile (C-8 sonu) | 30 |
| Doğrulanan | **30** |
| Coverage | **%100** |

**Yeni eklenen 6 aile:** (bkz. §6)

---

## 4. FREKANS KARŞILAŞTIRMASI

### 4.1 Aile Frekansları (C-8 vs C-9)

| Aile | C-8 | C-9 | Oran | Yorum |
|---|---|---|---|---|
| **WF-K1UE** | 16,385 | 4,262 | **0.26** | 4x şişirilmiş |
| **WF-GU** | 52,291 | 22,788 | **0.44** | 2.3x şişirilmiş |
| **WF-SHHYE** | 15,000 | 9,846 | 0.66 | %34 şişirilmiş |
| **WF-PSY** | 8,000 | 6,326 | 0.79 | %21 şişirilmiş |
| **WF-NE** | 10,000 | 21,883 | **2.19** | 2x düşük |
| Diğer 25 aile | 0-16,385 | 65-5,403 | — | (21'i ilk kez veri aldı) |

**Gözlem:** C-8'de `corpusFrequency` alanı **tutarsız** doldurulmuş. Bazıları şişirilmiş, bazıları düşük. Corpus doğrulaması ile **tümü düzeltildi**.

### 4.2 En Yüksek Frekanslı Root'lar (Yeni)

| Root | Form | Adyghe | Kabardian | Toplam |
|---|---|---|---|---|
| R-F | ф | 11,115 | 21,152 | **32,267** |
| R-GU | гу | 5,995 | 16,793 | 22,788 |
| R-NE | нэ | 5,959 | 15,924 | 21,883 |
| R-1E | Ӏэ | 2,880 | 8,414 | 11,294 |
| R-FE | фэ | 8,030 | 2,966 | 10,996 |

---

## 5. PENDING REVIEW — 41 LEXEME

### 5.1 Sebep Dağılımı

| Sebep | Sayı |
|---|---|
| `not_in_corpus` | 41 |
| `possible_mechanical_derivation` | 16 |
| `overlong_compound` | 7 |

### 5.2 Örnek Bulunamayan Lexeme'ler

| Lexeme | Form | Tahmini Sebep |
|---|---|---|
| L-GUETYNEGHE | гуэтыныгъэ | C-8'de türetilmiş, gerçek değil |
| L-PSYBDZE | псыбдзэ | Mekanik türetme (su + balık) |
| L-PSYBZU | псыбзу | Mekanik türetme (su + kuş) |
| L-NEBZHYTSYLE | нэбжьыцлэ | Aşırı kompleks |

### 5.3 Karar

Mimar onayı ile:
- **Silinmedi** (kayıp olurdu)
- **Ayrı dosyaya alındı** → `lexemes_pending_review.json`
- **Sebep kaydedildi** (audit trail)

**Sonraki adım:** C-9.1.2c'de manuel inceleme (1-2 gün).

---

## 6. YENİ AİLELER — 6 ADET

Mimar onayı ile **30 → 36 aile**.

| Aile | Root | Lexeme | Frekans | Kategori |
|---|---|---|---|---|
| **WF-F** | R-F (ф) | 4 | 32,267 | function |
| **WF-1E** | R-1E (Ӏэ) | 5 | 11,294 | body |
| **WF-LHE** | R-LHE (лъэ) | 5 | 10,729 | body |
| **WF-SH1Y** | R-SH1Y (щӀы) | 2 | 9,435 | nature |
| **WF-SH1E** | R-SH1E (щӀэ) | 1 | 9,383 | spatial |
| **WF-PE** | R-PE (пэ) | 11 | 7,184 | body |

**Corpus kanıtı:** Her aile min **7,184** frekansla doğrulandı.

---

## 7. MİMARİ ETKİ

### 7.1 Katman Ayrımı

Mimari belgede belirtildiği üzere:
Linguistic Dataset Layer ≠ Runtime Layer
text


Bu doğrulama çalışması **Linguistic Dataset Layer**'da kaldı:
- Root → Semantic Field → WordFamily → Lexeme
- Runtime zinciri (TranslationEntry → Concept → Discovery) **değişmedi**

### 7.2 ADR Uyumu

- **ADR-ROOT-001:** Root-Centric model korundu
- **ADR-0017:** WordFamily-Concept mapping uyumlu
- **ADR-0018:** Semantic Expansion runtime'a alınmadı

### 7.3 Model Doğrulaması

Mimarın C-9 öncesi önerdiği model:

Root → Semantic Field → WordFamily → Concept Space
text


Corpus tarafından **doğrulandı**. Örnek: `гу` kökü tek bir Concept değil, `гуфӀэ`, `губжьы`, `гугъэ` gibi çoklu kavramlara açılıyor.

---

## 8. SONRAKİ ADIMLAR

### Kısa Vade (1-3 gün)

| # | Görev | Durum |
|---|---|---|
| C-9.1.2c | 41 pending lexeme manuel inceleme | Planlandı |
| C-9.4 | Metaforik zincirler (4 → 15+) | Planlandı |
| C-9.5 | 220+ lexeme hedefi | Planlandı |

### Orta Vade (1 hafta)

| # | Görev | Durum |
|---|---|---|
| C-9.2 | DialectConverter genişletme | Planlandı |
| C-9 kapanış | Faz C-9 kapanış raporu | Planlandı |

---

## 9. EKLER

### A) En Yüksek Frekanslı 10 Lexeme

| Lexeme | Form | Adyghe | Kabardian | Toplam |
|---|---|---|---|---|
| L-FE | фэ | 7 | 1,746 | 1,753 |
| L-PSY | псы | 403 | 947 | 1,350 |
| L-C1YQ1U | цӀыкӀу | 301 | 779 | 1,080 |
| L-UNE | унэ | 425 | 649 | 1,074 |
| L-PSE | псэ | 474 | 468 | 942 |
| L-K1UE | къуэ | 257 | 510 | 767 |
| L-ZHY | жьы | 156 | 418 | 574 |
| L-YK1UE | икъуэ | 555 | 2 | 557 |

### B) Yeni Dosya Yapısı

data/corpus/
├── metadata.json
├── raw/ (ignore)
└── frequency/
├── lexeme_freq_ady.json (ignore)
├── lexeme_freq_kbd.json (ignore)
└── coverage_report.json

public/data/linguistic/
├── lexemes.json (159 lexeme)
├── lexemes_pending_review.json (41 lexeme)
├── roots.json (58 root)
├── word_families.json (36 aile)
├── morphemes.json (75 morfem)
└── semantic_relations.json (175 relation)
text


### C) Kaynak Script'ler

| Script | Amaç |
|---|---|
| `faz_c9_download_corpus.py` | Corpus indirme (v1) |
| `faz_c9_download_corpus_v2.py` | Corpus indirme (v2, parquet direct) |
| `faz_c9_fix_jsonl.py` | JSONL format düzeltme |
| `faz_c9_corpus_pipeline.py` | Frekans + doğrulama |
| `faz_c9_update_frequencies.py` | corpusFrequency güncelleme |
| `faz_c9_move_unverified.py` | 41 lexeme ayırma |
| `faz_c9_add_new_families.py` | 6 yeni aile ekleme |

---

## 10. KARAR KAYDI

| # | Karar | Tarih | Onay |
|---|---|---|---|
| 1 | Corpus tek referans (adiga-ai) | 2026-09-30 | Mimar |
| 2 | `corpusFrequency` hemen güncelle | 2026-09-30 | Mimar |
| 3 | 41 lexeme pending review'a al | 2026-09-30 | Mimar |
| 4 | 6 yeni aile ekle | 2026-09-30 | Mimar |
| 5 | Sıralama: C-9.1.2 → C-9.3 → C-9.4 → C-9.5 | 2026-09-30 | Mimar |

---

**Rapor Sonu**

**Hazırlayan:** Faz C-9 ekibi
**Onay:** Mimar (2026-09-30)
**Sonraki:** C-9.4 Metaforik Zincirler
