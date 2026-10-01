# ADR-0022: Verb Prefix Slot Grammar

## Durum
KABUL EDILDI

## Baglam
Kumakhov (gl4.pdf) fiil on ek siralamalarini dogrudan tanimlar.
Morphology Engine'in fiil cozumlemesi bu siralamaya dayanmalidir.

## Karar
Fiil on ekleri asagidaki sabit slot sirasina gore cozumlenir:

| Slot | Kategori | Ornek |
|------|----------|-------|
| 1 | Reflexive | zy- |
| 2 | Directional | ky- |
| 3 | Version | khu- / zdy- |
| 4 | Comitative | khe- |
| 5 | Locative | - |
| 6 | Causative | ghe- |
| 7 | Factitive | kI- |
| - | ROOT | - |

## Slot Cakisma Kurallari
- Ayni slotta iki onek bulunamaz
- Slot atlanabilir (bos gecilebilir)
- Sira degistirilemez

## Parser Sozlesmesi
VerbPrefixDecompiler girdi olarak yuzey formu alir,
cikti olarak slot->onek eslemesi + ciplak kok dondurur.

## Test Senaryolari
- zy-ky-khu-zdy-khe-ghe-kIyn (tam zincir)
- ky-khue-ghe-t (kismi zincir)

## Sonuclar
- Fiil cozumlemesi deterministik olur
- Morphology Engine cekirdegi tanimlanir
- Runtime izolasyonu korunur (Discovery'ye baglanmaz)

