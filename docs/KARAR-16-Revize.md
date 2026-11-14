# KARAR-16 (Revize) — Kürasyon Yazma Yeri

Tarih: 14.11.2026
Durum: Onaylı — Mimar revizesi + kullanıcı onayı

## Karar

Yazma yeri: Doğrudan `lexemes.json` (Model 1)

Ayrı kürasyon tablosu / ayrı veritabanı katmanı kurulmayacak.
Gerekçe: `lexemes.json` sistemin fiili SSOT'udur. Kürasyon modülünün
sonunda oraya yazmaması, ayrı tabloya yazıp lexemes.json'a yazmamak
pratikte eksik kalır. Projede Git tabanlı izleme + yedek kültürü
zaten var, ayrı katman aşırı mühendislik olur.

## Akış

/admin/curation/single
  ↓ doğrulama
lexemes.json güncelle
  ↓
commit

## Kurallar

1. Her yazmada önce doğrulama:
   - `tr` içinde `?` olmayacak
   - `literalMeaning` içinde `<` / HTML olmayacak
   - `conceptId` boş olmayacak, türetilmiş kavram listesinde olacak
2. Her yazmada önce yedek: `lexemes.json.bak-<tarih>`
3. Her yazma commit ile izlenecek.
4. Yetki: Kürasyon kullanıcısı yazabilir.

## İstisna — İkinci Onay

Aşağıdaki yapısal alanlarda TOPLU değişiklikte ikinci onay gerekir:
- `conceptId`
- `wordFamilyId`
- `rootIds`

Tekil düzeltmede ikinci onay gerekmez.

## Kapsam Dışı

- Model 2 (curation_changes.json → onay → lexemes.json) uygulanmayacak.
