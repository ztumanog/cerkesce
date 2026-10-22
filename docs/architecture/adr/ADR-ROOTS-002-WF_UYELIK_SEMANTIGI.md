# ADR-ROOTS-002: Word Family Uyelik Semantigi

## Durum
Tespit. 22 Ekim 2026.

## Bulgu
roots.json icinde 476 root, her biri wordFamily alani ile lexemeIds listesi tutuyor:
- R-GU -> 1109 lexeme
- R-NE -> 836
- R-1E -> 1636

Ama bu listeler KARISIK: bazi turev formlar var, bazilari yok. 5 hedef:
- KAV-НЭУФӀЫЦӀЩХЬЭРЫУ (zarf) VAR, -2 (temel) YOK
- KAV-НЭЩХЪЫФӀАГЪУЭНШ (sif.) VAR, -2 (zarf) YOK
- KAV-ӀЭМЫКӀУЭЛЪЭМЫКӀ (sif.) VAR, -2 (isim) YOK
- KAV-ӀЭПХЪАШЭЛЪЭПХЪА (sif.) VAR, -2 (zarf) YOK
- KAV-ХУЭӀЭКӀУЭЛЪАКӀУ (zarf) VAR, -2 (temel) YOK

## Karar
1. roots.json'daki 5 referans DEGISMEZ.
2. WF uyelik semantigi icin ADR-ROOTS-003 planlanacak.
3. O ADR'de su sorular cevaplanacak:
   - WF uyeligi lemma temelli mi, form temelli mi?
   - Turev formlar (-у, -агъэ, -ын vb.) WF'ye ait mi?
   - Karisik veri nasil duzeltilecek?
4. Simdilik mevcut veri korunur, yeni ID eklenmez.

## Gerekce
5 referansi degistirmek, WF uyelik semantigi kanitlanmadan varsayim olur.

## Ilgili
- ADR-ONERI-001 (oneri anlam dogrulama)
- ADR-ROOTS-001 (126 dangling root temizligi)
