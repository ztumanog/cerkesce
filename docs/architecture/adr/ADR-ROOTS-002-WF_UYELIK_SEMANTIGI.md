# ADR-ROOTS-002: Word Family Uyelik Semantigi

## Durum
Karşılandı (Superseded). 22 Ekim 2026 taslağı — 26 Kasım 2026'da kapatıldı.

## Bulgu
roots.json icinde 476 root, her biri wordFamily alani ile lexemeIds listesi tutuyor.

5 hedef referans, roots_hedef_cevre.py ile dogrulandi:
| WF | Index | Eski ID | -2 formu | roots.json'da -2 var mi? |
|----|-------|---------|----------|--------------------------|
| WF-NE | 60 | KAV-НЭУФӀЫЦӀЩХЬЭРЫУ | нэуфӀыцӀщхьэрыуэ | YOK |
| WF-NE | 100 | KAV-НЭЩХЪЫФӀАГЪУЭНШ | нэщхъыфӀагъуэншэу | YOK |
| WF-1E | 140 | KAV-ӀЭМЫКӀУЭЛЪЭМЫКӀ | ӀэмыкӀуэлъэмыкӀуагъэ | YOK |
| WF-1E | 162 | KAV-ӀЭПХЪАШЭЛЪЭПХЪА | Ӏэпхъашэлъэпхъашэу | YOK |
| WF-1E | 1554 | KAV-ХУЭӀЭКӀУЭЛЪАКӀУ | хуэӀэкӀуэлъакӀуэ | YOK |

Yani WF listeleri SADECE eski ID'leri iceriyor, turev formlari (-у, -агъэ) icermiyor. 5 ciftin anlamlari farkli (TAHMİNEN vs dusuncesizce, Kederli vs joylessly, YETENEKSIZ vs laziness).

## Karar
1. roots.json'daki 5 referans DEGISMEZ.
2. WF uyelik semantigi icin ADR-ROOTS-003 planlanacak.
3. O ADR'de su sorular cevaplanacak:
   - WF uyeligi lemma temelli mi, form temelli mi?
   - Turev formlar (-у, -агъэ, -ын vb.) WF'ye ait mi?
   - Karisik veri nasil duzeltilecek?
4. Simdilik mevcut veri korunur, yeni ID eklenmez.

## Gerekce
5 referansi degistirmek, WF uyelik semantigi kanitlanmadan varsayim olur. Mevcut karisiklik korunur, sonraki turda duzeltilir.

## Sorumlu
- ADR-ROOTS-003: mimar veya sozluk uzmani
- 5 referans karari: mimar

## Kapsam disi
Bu ADR, 5 referansin ID degisikligini kapsamaz. Sadece durum tespiti ve sonraki ADR'ye referans.

## Ilgili
- ADR-ONERI-001 (oneri anlam dogrulama)
- ADR-ROOTS-001 (126 dangling root temizligi)

## Kapanis (2026-11-26)
Planlanan ADR-ROOTS-003 yazilmadan, bu ADR'in actigi uc soru 2026-11-25
hardening sprinti (faz0-11) + WF-AUGMENT-001 + WF-ROOT-MATRIX-001 tarafindan
fiilen cozuldu ve koda/data islendi:

1. **WF uyeligi lexeme-ID temelli** — KAV- eski ID'ler tamamen temizlendi
   (roots.json ve word_families.json'da 0 adet kaldi); WF listeleri artik
   L-* lexeme ID'leriyle kuruluyor.
2. **Turev formlar WF'ye dahil** — ornek: WF-NE 261 uye (isim/fiil/deyim
   karisik), WF-1E 546 uye; -у/-агъэ turevleri aile icinde.
3. **Karma veri duzeltmesi** — faz9_build_families.py ile kanonik
   families.json (7.186 aile) kuruldu: gercek kelime aileleri (root-family,
   <=10 kok) ile semsiye kategorileri (umbrella, >10 kok) acikca ayrildi.

Bu ADR'in 5 referanslik bulgusu veri yeniden insasiyla gecersizlesti;
"referanslar degismeZ" karari moot. Durumu "Karşilandi" olarak kapatildi.
