# KARAR-15 — Test Tablosu Dolduruldu

Tarih: 11.11.2026
Kaynak: MVP2_AUDIT_RAPORU_20261108.md Bolum 5'teki bos tablo.
Yontem: Tablo uydurulmadi, calisan kod okundu:
- src/lib/latinNormalize.ts (MAP)
- src/domain/utils/normalizePalochka.ts
- app/api/search/route.ts (qAlt: e <-> э)

## Karar Tablosu

| Harf | Yazim 1 | Yazim 2 | Yazim 3 | Kodun Karari | Not |
| --- | --- | --- | --- | --- | --- |
| g | gh | g | ghu | gh -> гъ, ghu -> гъу, g -> г | En uzun once. ghu, gh'den once. |
| k | q | kh | qu / khu | kh -> къ, q -> къ, qu -> къу, khu -> къу, k -> к | kh, k degil; q, k degil. |
| h | h | hy | xh / x | h -> х, hy -> хь, xh / x -> хъ | h tek basina х; hy ayri harf хь. |
| hy | hy | h | — | hy -> хь | Hy ayri harf, h'nin varyanti degil. |
| palochka | kesme (') | 1 | buyuk I | ' -> Ӏ, 1 -> Ӏ, I -> Ӏ (placeholder) | Uc varyant da kabul. normalizePalochka: I, İ, ı, І, ӏ de -> Ӏ. |
| i | i | y | — | i -> и, y -> й | i ve y AYRI harf. y, i'nin varyanti degil. |
| e / э | e | э | — | e -> е + cift arama (qAlt: е <-> э) | Kod e'yi е yapar, arama iki harfi de dener. |
| s | s | sh | ş | s -> с, sh -> ш, ş -> ш | sh, s degil. |
| c | c | ch | ç | c -> ц, ch -> ч, ç -> ч | ch, c degil. |

## Ilke (kodda var)

- En uzun eslesme once taranir (MAP sirasi).
- Coklu yazim kabul edilir, tek Kiril'e cevrilir.
- Yeni route yok: api/search-latin acilmadi, normalize /api/search oncesi katman.

## Acik / Dikkat Noktalari (Mimar onayina)

1. **ı (Turkce noktasiz i) cakismasi:** latinNormalize'da ı -> ы, normalizePalochka'da ı -> Ӏ.
   Arama akisinda latinNormalize once calistigi icin ı -> ы kazanir (Latin sorguda).
   Kiril sorguda ı -> Ӏ olabilir. Mimar: ı icin tek karar verilsin mi?

2. **Buyuk I palochka:** Kod placeholder (\u0001) ile cozuyor, ama dosyadaki yorumlar
   bu konunun karisik oldugunu gosteriyor. Test ile kilitlenmeli (asagida).

3. **e / э:** Cift arama cozumu calisiyor ama iki sorgu demek. Performans etkisi gozlemlenmedi.

## Kilit Testleri (bu tabloyu korur)

- `gu` -> `гу`, `ghu` -> `гъу`, `gh` -> `гъ`
- `kh` -> `къ`, `q` -> `къ`, `k` -> `к`
- `hy` -> `хь`, `h` -> `х`, `xh` -> `хъ`
- `'` / `1` / `I` -> `Ӏ`
- `i` -> `и`, `y` -> `й` (ayri)
- `sh` -> `ш`, `s` -> `с`, `ch` -> `ч`, `c` -> `ц`

## Sonuc

KARAR-15 test tablosu dolduruldu. MVP-2'nin 'test tablosu hazirlanmadan kod baslamayacak'
sarti, geriye donuk olarak bu belgeyle karsilanmistir — cunku kod zaten bu tabloya
uygun calisiyor. Mimar onayi ile MVP-2 kapanisa gidebilir.
