# Curation ve Navigasyon Güncellemesi — 2026-11-15

- **Sınıf:** Bilgilendirme Raporu
- **Durum:** Arşivlenebilir / Karar geçmişine referans olabilir / Faz 2 çalışmalarına başlangıç noktası olabilir
- **Proje:** Cerkezce Sozluk — `main`
- **Kapsam:** WF-UNCLEAR birleştirme + üst menü sadeleştirme + KARAR-16 sonrası kürasyon mimarisi

## 1. WF-UNCLEAR → Family birleştirme

- `WF-UNCLEAR` ve yetim aile denetimi `/admin/curation/family` sayfasına birleştirildi.
- `family` sayfasına `Yetim / WF-UNCLEAR` filtresi + üstte `WF-UNCLEAR: X · Yetim: Y` özeti eklendi.
- Eski `/admin/curation/wf-unclear` artık `/admin/curation/family?filter=yetim` adresine yönleniyor.
- Sol menüdeki ayrı `WF-UNCLEAR` linki kaldırıldı.
- Commit: `2ea6d56`

## 2. Üst menü sadeleştirme ve navigasyon kararları

- Üstte artık sadece: `Sözlük ▾ · Morfoloji · Converter · Yönetim`
- `Sözlük ▾` altında: `Sözlük Arama / Kavramlar / Keşfet (Ağ) / Favoriler`
- `Sözlük` hem tıklanabilir hem açılır menü olarak tasarlandı.
- Önce split buton denendi, aradaki boşluk + çift tıklama alanı sorun çıkardı, tek hap butona çevrildi.
- `Portal + onMouseLeave` titremesi tespit edildi: `Content` `Portal` ile `body` altına taşındığı için fare butondan menüye geçerken `onMouseLeave` kapanma tetikliyordu.
- Çözüm: 160ms gecikmeli kapanma + `Content` üzerinde hover köprüsü (`onMouseEnter` timer iptali).
- Bozuk `min-w-` sınıfı `min-w-` yapıldı.
- Rota denetiminde kırık link bulundu: `/sozluk/kaydedilenler` → `/kaydedilenler` olarak düzeltildi.
- Commit: `177cfd4`

## 3. Çift Header analizi ve kullanılmayan bileşen

- `app/layout.tsx` içinde `<Navbar />` + `<Header />` çift başlık var, bilinçli bırakıldı.
- `src/components/Header.tsx` kullanılmayan bileşen olarak tespit edildi (Mimar değerlendirmesi).
- `tsconfig.json` içinde `"@/*": ["./src/*"]` tanımlı, bu nedenle `@/components/Navbar` yolu `src/components/Navbar.tsx` dosyasına bakıyor. Kökteki `components/Navbar.tsx` yanlış yerdi, silindi.

## 4. Kürasyon mimarisi — KARAR-16 Revize

- `src/lib/curationValidate.ts` ortak doğrulama modülü eklendi.
- Commit: `9597a0c`
- KARAR-16 Revize sonucu bu yapıyla uygulandı: doğrulama tek kökten, sayfa ve API aynı kuralı kullanıyor.
- Faz 2 okuma modu kapsamı bu raporla birlikte arşivlendi, Faz 2 çalışmalarına başlangıç noktası olarak kullanılacak.

## 5. Performans notu — /api/search

- Mimar ölçümüne göre `/api/search`:
    - İlk sorgu: ~4989 ms
    - Sonraki sorgu: ~692 ms
- `lexeme.json` aramaya doğrudan bağlanmayacak. Hibrit model geçerli: liste hızlı uçtan, içine sadece `rootId / rootForm / familyId` eklenecek.

## 6. Durum

- `tsc --noEmit` temiz, `git status` temiz.
- Push tamam: `8cb260a..177cfd4` + `177cfd4..9597a0c` → `main` up-to-date.
- `.bak-*` yedekleri commitlenmedi.

## 7. Sıradaki iş

- `/sozluk` arama kartlarına tıklanabilir rozetler: `Kök: ...` → `/sozluk/root/[id]`, `Aile Üyesi` → `/sozluk/family/[id]`, `e.stopPropagation()` ile çekmece açılmadan.
- Bekleyen: `_217` kart + API incelemesi.
