# KURUL HATIRLATMA — Homonym Root Disambiguation

**Durum:** GÖZLEM KAYDI (iş emri değil)
**Öncelik:** Orta
**Tür:** Domain Borcu / Veri Kalitesi
**Tarih:** 2026-11-13
**Kanıt etiketi:** Kullanıcı beyanı
**Kod Değişikliği:** Yok

## Sınıflandırma

Bu bulgu bir **SSOT Migration** konusu değildir.
Bu bir **ConceptId** konusu değildir.
Bu bir **DialectConverter** konusu değildir.

Bu, sözlük veri modelindeki **Homonym Root Disambiguation** alanına ait **bağımsız bir domain problemidir**.

## Bulgular

### Homonym Grupları

- Toplam grup: **12**
- Toplam referans: **2212**

### En Büyük Gruplar

| Form | Referans | Aday Kök Sayısı | Not |
|---|---|---|---|
| `лъ` | 521 | 2 | R-LHE (ayak) vs R-LHE1 (yatmak) |
| `щӀ` | 492 | 2 | R-SH1Y (toprak) vs R-SH1E (yeni) |
| `ху` | 322 | 2 | R-XHW vs R-XU |
| `Ӏ` | 297 | 2 | R-IIE vs R-II |
| `щ` | 168 | 2 | R-SHE (yağ) vs R-SHCH (uc) |
| `фӀ` | 164 | 2 | R-FIY vs R-F1E |
| **`гу`** | **139** | **16** | **Kritik — en yüksek inceleme önceliği** |
| `шх` | 66 | 2 | R-SHKH vs R-SHX |
| `лъэлъ` | 16 | 2 | R-LHELHE vs R-LHELH |
| `къуз` | 13 | 2 | R-QUZ vs R-QHUZ |
| `лъагъу` | 13 | 2 | R-LA_1 vs R-LHEGHE |
| **`Ӏэ`** | **1** | **15** | **Veri kalitesi bulgusu — muhtemelen artefakt** |

### Kritik Bulgular

**1. `гу` — 16 farklı kök adayına dağılmış (139 referans)**

En yüksek inceleme önceliğini hak ediyor. Örnek adaylar:
- R-GU (kalp, gönül, iç)
- R-GUGH (umut, sans)
- R-GUE-2 (causative)
- R-KHE- (tatmak)
- R-GUBZH (ateş)
- R-GUBGHWE (tarla, ova)
- ... +10 daha

**2. `Ӏэ` — 15 farklı aday, 1 referans**

Muhtemelen:
- Tarihsel kalıntı
- Yanlış ayrıştırma
- Veri üretim artefaktı

## Neden Şu An İş Emri Değil

Elimizde sadece **keşif verisi** var. Henüz bilmiyoruz:

- ❓ Gerçek kullanıcı etkisi nedir?
- ❓ Arama sonuçları gerçekten bozuluyor mu?
- ❓ Morfolojik analiz motoru bunlardan etkileniyor mu?
- ❓ Family üretimi bunlardan etkileniyor mu?
- ❓ Lexicon eşleştirmesi bunlardan etkileniyor mu?

**Problem gözlendi ✅ — Etki ölçülmedi ⏳**

Bu yüzden doğrudan ADR/Refactor/Veri modeli değişikliği/Migration başlatmak **erken**.

## Mimari Karar

**İzin verilen:**
- ✅ Analiz
- ✅ Raporlama
- ✅ Kanıt toplama

**Yasak (bu kayıt kapsamında):**
- ❌ Veri modeli değişikliği
- ❌ Root birleştirme
- ❌ Root ayırma
- ❌ Yeni ADR açılması
- ❌ Migration başlatılması

## Faz 1 ile İlişkisi

Bu homonym analizi **SSOT Migration Faz 1'den bağımsızdır.**

- **SSOT Migration Faz 1** = ConceptID → ConceptId (test katmanı dönüşümü)
- **Homonym Disambiguation** = Domain veri kalitesi (paralel, bağımsız)

Faz 1 önceliğini **değiştirmez**.

## Aktif İş Durumu

**Aktif bekleyen iş:** SSOT Migration Faz 1 (Test Katmanı Dönüşümü)
**Bu kayıt:** Park edildi — domain borcu olarak gözlem altında

## Sonraki Adım

Bu kayıt **iş emrine dönüştürülmez.** Aşağıdakilerden biri gerçekleşirse yeniden değerlendirilir:

1. Gerçek kullanıcı etkisi raporlanırsa
2. Arama/morfoloji/lexicon etkisi ölçülürse
3. Kurul önceliklendirirse

O zamana kadar: **gözlem altında, aksiyon yok.**

## Değişiklik Geçmişi

- 2026-11-13: İlk oluşturma. Homonym analizi sırasında tespit edildi. Gözlem kaydı olarak açıldı, iş emri değil.
