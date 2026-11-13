# KURUL HATIRLATMA — Homonym Partial Resolution

**Durum:** GÖZLEM KAYDI (tarihsel not)
**Öncelik:** Düşük-Orta
**Tür:** Domain Borcu / Veri Kalitesi
**Tarih:** 2026-11-13
**Kanıt Gücü:** Zayıf (yeniden üretilemez)
**Eylem:** Yok

## Ne Oldu

Ayrı bir çalışma penceresinde `_resolve_homonyms.mjs` script'i üretilmiş ve çalıştırılmıştır.

Konsol çıktısı:

Set-Location "D:\projeler\Cerkesce"; $file = "docs\governance\decisions\KURUL_HATIRLATMA_HOMONYM_PARTIAL_RESOLUTION_2026-11-13.md"; if (Test-Path $file) { Remove-Item $file -Force }; $content = @'
# KURUL HATIRLATMA — Homonym Partial Resolution

**Durum:** GÖZLEM KAYDI (tarihsel not)
**Öncelik:** Düşük-Orta
**Tür:** Domain Borcu / Veri Kalitesi
**Tarih:** 2026-11-13
**Kanıt Gücü:** Zayıf (yeniden üretilemez)
**Eylem:** Yok

## Ne Oldu

Ayrı bir çalışma penceresinde `_resolve_homonyms.mjs` script'i üretilmiş ve çalıştırılmıştır.

Konsol çıktısı:

resolvedRefs: 2059
byTarget: R-FIY=164, R-GU=139, R-SH1Y=471, R-1E=298, R-LHE=511, R-SH1E=21, R-SHKH=66, R-XHW=322, R-SHCH=15, R-QUZ=13, R-LHE1=10, R-LA_1=13, R-LHELHE=16
remainingLexWithLegacy: 2067
remainingLegacyRefs: 2136

Yorum: 2059 referans hedef köke çözümlenmiş, 2136 referans hâlâ legacy modelde kalmış görünüyor.

## Neden Operasyonel Kanıt Sayılmaz

- Script repoda yok (silinmiş)
- Algoritma bilinmiyor
- Çıktının hangi veri sürümünde üretildiği bilinmiyor
- Tekrar üretilebilirliği yok

## Karar

Bu kayıt bir iş emri değildir. Tarihsel nottur.

## Bağlantılı Kayıt

- KURUL_HATIRLATMA_HOMONYM_ROOT_DISAMBIGUATION_2026-11-13.md

## Değişiklik Geçmişi

- 2026-11-13: İlk oluşturma. İçerik bozukluğu düzeltildi.
