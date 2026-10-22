# ADR-ROOTS-002: Word Family Uyelik Semantigi

## Durum
Taslak. 22 Ekim 2026.

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
