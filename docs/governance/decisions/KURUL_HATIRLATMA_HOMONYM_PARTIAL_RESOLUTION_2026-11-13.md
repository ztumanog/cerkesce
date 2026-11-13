# KURUL HATIRLATMA — Homonym Partial Resolution

**Durum:** GÖZLEM KAYDI (tarihsel not)
**Öncelik:** Düşük-Orta
**Tür:** Domain Borcu / Veri Kalitesi
**Tarih:** 2026-11-13
**Kanıt Gücü:** ⚠️ **Zayıf** (yeniden üretilemez)
**Eylem:** Yok

## Ne Oldu

Ayrı bir çalışma penceresinde `_resolve_homonyms.mjs` script'i üretilmiş ve çalıştırılmıştır.

Konsol çıktısı:

Set-Location "D:\projeler\Cerkesce"

$file = "docs\governance\decisions\KURUL_HATIRLATMA_HOMONYM_PARTIAL_RESOLUTION_2026-11-13.md"

$content = @'
# KURUL HATIRLATMA — Homonym Partial Resolution

**Durum:** GÖZLEM KAYDI (tarihsel not)
**Öncelik:** Düşük-Orta
**Tür:** Domain Borcu / Veri Kalitesi
**Tarih:** 2026-11-13
**Kanıt Gücü:** ⚠️ **Zayıf** (yeniden üretilemez)
**Eylem:** Yok

## Ne Oldu

Ayrı bir çalışma penceresinde `_resolve_homonyms.mjs` script'i üretilmiş ve çalıştırılmıştır.

Konsol çıktısı:
{
resolvedRefs: 2059,
byTarget: {
'R-FIY': 164, 'R-GU': 139, 'R-SH1Y': 471, 'R-1E': 298,
'R-LHE': 511, 'R-SH1E': 21, 'R-SHKH': 66, 'R-XHW': 322,
'R-SHCH': 15, 'R-QUZ': 13, 'R-LHE1': 10, 'R-LA_1': 13,
'R-LHELHE': 16
},
remainingLexWithLegacy: 2067,
remainingLegacyRefs: 2136
}
text


**Yorum:** 2059 referans hedef köke çözümlenmiş, 2136 referans hâlâ legacy modelde kalmış görünüyor.

## Neden Operasyonel Kanıt Sayılmaz

- ❌ Script repoda **yok** (silinmiş)
- ❌ Algoritma **bilinmiyor** (ne yaptığı, hangi kurallarla çalıştığı belirsiz)
- ❌ Çıktının hangi veri sürümünde üretildiği **bilinmiyor**
- ❌ Tekrar üretilebilirliği **yok**

Bu nedenle bu veri:
- ✅ **Kurumsal hafıza değeri taşıyor** (ne olduğunu kaydediyor)
- ❌ **Operasyonel kanıt sayılmaz** (yeniden doğrulanamaz)

## Karar

Bu kayıt bir **iş emri değildir.** Tarihsel nottur.

İleride homonym çalışması yeniden açılırsa, bu kayıt **referans** olarak kullanılabilir:
- "Daha önce böyle bir çalışma yapılmış"
- "Script kayıp, yeniden yazılması gerekir"
- "Veri sürümü belirsiz, yeniden ölçüm şart"

Ama **bu kayıttan iş emri çıkmaz.**

## Bağlantılı Kayıt

- `KURUL_HATIRLATMA_HOMONYM_ROOT_DISAMBIGUATION_2026-11-13.md` — ana homonym problemi
- Bu kayıt, ana problemin **kısmi çözüm denemesi**nin tarihsel notudur

## Değişiklik Geçmişi

- 2026-11-13: İlk oluşturma. Kayıp script çıktısı, tarihsel not olarak saklandı.
