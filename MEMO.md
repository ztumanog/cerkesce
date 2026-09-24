# MEMO - Cerkesce Sozluk Projesi

**Tarih:** 2026-09-23
**Sonraki Oturum Icin**

---

## Son Durum

### Tamamlanan (2026-09-23)

- "0 Karflik" sorunu duzeltildi (anlamlarSet)
- Arama Gecmisi (P4-007-A) eklendi
- CI/CD Pipeline aktif (193 test PASS)
- Vercel otomatik deploy
- Git temizligi (9 backup silindi)

### Aktif Branch

- main (origin/main ile senkron)

### Son Commit

- bbc31a2 fix: AramaGecmisi ve useAramaGecmisi dosyalari eklendi

---

## SIRADAKI ISLER

### Oncelik 1: Favori Kelimeler (40 dk)

**Hedef:** Kullanici kelimeleri favorilere ekleyebilsin.

**Bilesenler:**
- useFavoriler hook (localStorage)
- FavoriButonu component
- Favoriler sayfasi
- KelimeKarti entegrasyonu

### Oncelik 2: Klavye Kisayollari (30 dk)

- Ctrl+K - Arama
- Esc - Drawer kapat
- Enter - Ara
- Up/Down - Sonuclarda gezin

### Oncelik 3: PWA Iyilestirme (30 dk)

- manifest.json guncelle
- Service Worker (offline cache)
- Install prompt

### Oncelik 4: APK Offline (1-2 gun)

- output: export ekle
- Client-side search (MiniSearch)
- Capacitor sync
- APK build

---

## ONEMLI DOSYALAR

- src/components/dictionary/SozlukEkrani.tsx - Ana ekran
- src/components/ui/KelimeDetayDrawer.tsx - Drawer
- src/hooks/useAramaGecmisi.ts - Arama gecmisi
- src/lib/normalizers/sourceMetadataResolver.ts - Metadata

## ONEMLI KOMUTLAR

- npm run dev          # Gelistirme
- npm run build        # Build
- npx tsc --noEmit     # Tip kontrol
- npm test             # Testler
- git push origin main # Vercel otomatik deploy

---

**Hazirlayan:** Gemos
**Versiyon:** 2.0

---

## ✅ P4-009: Drawer Semantik Sunum (2026-09-24)

### Tamamlanan

- **`cleanHtml.tsx`** → HTML etiketlerini KORUR (silmez)
  - `&lt;` ve `&gt;` korunur
  - Entity'ler çözülür
  - Fazla boşluklar temizlenir

- **`SectionRenderer`** → `dangerouslySetInnerHTML` eklendi
  - `plain` → HTML direct render
  - `arabic` → HTML direct render
  - `example` → HTML direct render
  - `related` → HTML direct render
  - `suffix` → HTML direct render

- **`sourceContentNormalizer.ts`** → `buildSections` basitleştirildi
  - `~`, `♦`, `а)`, `б)` ayrımı
  - Roman (I, II) ve Arabic (1., 2.) desteği

- **`dictionaries.json`** → `displayName` düzeltildi (34 kayıt)
  - `"Türkçe-Adıgece", Abaze, İ., ...` → `Abaze (2005)`

### Sonuç

- `I`, `II` → **bold**
- `1.`, `2.` → **bold + sol çizgi**
- `1)`, `2)` → **yeşil numara**
- `◊`, `♦` → **sarı elmas**
- `/`, `~` → **mavi eğik çizgi**
- `а)`, `б)` → **peru rengi**
- HTML **doğrudan render** ediliyor
- Çerkesçe/Rusça ayrımı **otomatik**

### Doğrulama

- ✅ `npx tsc --noEmit` PASS
- ✅ `npm test` → 62/62 PASS, 193/193 PASS


---

## ✅ P4-009: Drawer Semantik Sunum (2026-09-24)

### Tamamlanan

- **`cleanHtml.tsx`** → HTML etiketlerini KORUR (silmez)
  - `&lt;` ve `&gt;` korunur
  - Entity'ler çözülür
  - Fazla boşluklar temizlenir

- **`SectionRenderer`** → `dangerouslySetInnerHTML` eklendi
  - `plain` → HTML direct render
  - `arabic` → HTML direct render
  - `example` → HTML direct render
  - `related` → HTML direct render
  - `suffix` → HTML direct render

- **`sourceContentNormalizer.ts`** → `buildSections` basitleştirildi
  - `~`, `♦`, `а)`, `б)` ayrımı
  - Roman (I, II) ve Arabic (1., 2.) desteği

- **`dictionaries.json`** → `displayName` düzeltildi (34 kayıt)
  - `"Türkçe-Adıgece", Abaze, İ., ...` → `Abaze (2005)`

### Sonuç

- `I`, `II` → **bold**
- `1.`, `2.` → **bold + sol çizgi**
- `1)`, `2)` → **yeşil numara**
- `◊`, `♦` → **sarı elmas**
- `/`, `~` → **mavi eğik çizgi**
- `а)`, `б)` → **peru rengi**
- HTML **doğrudan render** ediliyor
- Çerkesçe/Rusça ayrımı **otomatik**

### Doğrulama

- ✅ `npx tsc --noEmit` PASS
- ✅ `npm test` → 62/62 PASS, 193/193 PASS
