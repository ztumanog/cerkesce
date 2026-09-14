# Çerkesçe Sözlük Projesi — Teknik Dokümantasyon ve Mimari Raporu

Bu doküman; **Next.js 16 (App Router)** ve **TypeScript** altyapısıyla geliştirilen Çerkesçe Sözlük projesinin dosya mimarisini, tip sistemini, veri işleme mantığını, çözülen kritik hataları ve yeni sohbetlerde bağlam kaybını önleyecek prompt kütüphanesini kapsayan eksiksiz proje belgesidir.

---

## 1. Proje Özeti ve Teknolojik Altyapı

* **Framework:** Next.js 16 (App Router)
* **Dil:** TypeScript (Strict Type Checking)
* **Stil:** Tailwind CSS
* **Veri Kaynağı:** Yerel JSON veritabanı (Multi-dictionary / Manifest tabanlı)
* **Temel Hedef:** Çoklu lehçe desteği (Doğu/Batı), esnek JSON parse yeteneği, dinamik filtreleme ve klavye entegrasyonu ile yüksek performanslı sözlük mimarisi sunmak.

---

## 2. Klasör ve Dizin Mimarisi

```text
Cerkesce/
├── app/                                  # Next.js App Router Dizin Mimarisi
│   ├── layout.tsx                        # [Server Component] Kök düzen, SEO, favicon, fontlar
│   ├── page.tsx                          # [Client Component] Ana sayfa, arama, filtreleme, klavye
│   └── globals.css                       # Global stiller ve Tailwind direktifleri
│
├── src/                                  # Uygulama Kaynak Kodları
│   ├── types/
│   │   └── dictionary.ts                 # [Single Source of Truth] Merkezi TypeScript tipleri
│   ├── hooks/
│   │   └── useDictionary.ts              # Veri yükleme, önbellekleme, parse ve filtreleme hook'u
│   ├── components/
│   │   └── AkilliKlavye.tsx              # Çerkesçe özel karakterler için ekran klavyesi
│   └── utils/
│       └── cleanHtml.ts                  # HTML etiketlerini ve özel karakterleri temizleme
│
└── public/                               # Statik Varlıklar ve Veri Setleri
    ├── icons/
    │   ├── favicon.ico                   # Sekme ikonu (ICO)
    │   └── favicon.svg                   # Vektörel sekme ikonu (SVG)
    ├── logo/
    │   └── logo.png                      # Uygulama logosu
    └── data/
        ├── dictionaries.json             # Sözlük manifest/indeks dosyası
        └── *.json                        # Bireysel sözlük JSON veritabanı dosyaları

```

---

## 3. Temel Mimari Prensipler

* **Server / Client Component Ayrımı:** `"use client"` direktifi olan dosyalarda `export const metadata` kullanılamaz. Tüm SEO, başlık ve favicon tanımları Sunucu Bileşeni olan `app/layout.tsx` dosyasında yönetilir.
* **Tek Kaynak Tip Yönetimi (Single Source of Truth):** Bileşenler içinde yerel `interface` veya `type` tanımları yapılmaz. Tüm tipler `src/types/dictionary.ts` dosyasından ihraç/ithal edilir.
* **Esnek JSON Ayrıştırma:** Sözlük verilerinin farklı key isimlerine (`spelling`, `word`, `kelime`, `meaning`, `definitions`) sahip olabilmesi ihtimaline karşı `parseDictionaryData` fonksiyonu dinamik eşleme yapar.
* **Statik Varlık Doğrulaması:** `public` klasörü altındaki kaynaklar doğrudan kök dizin mantığıyla (`/logo/logo.png`, `/icons/favicon.ico`) çağrılır.

---

## 4. Detaylı Dosya ve Modül Analizi

**`app/layout.tsx` (Server Component)**

* **Sorumluluk:** HTML kök iskeletini oluşturur. Font tanımları (`Geist`) ve uygulama geneli SEO/favicon metadatasını barındırır.
* **Kritik Güncelleme:** `metadata.icons` alanına `/icons/favicon.ico` eklenerek tarayıcıların otomatik attığı `/favicon.ico` isteklerindeki `404 Not Found` hatası engellendi.

**`app/page.tsx` (Client Component)**

* **Sorumluluk:** Arama çubuğu, lehçe seçim filtreleri, sözlük bazlı listeleme ve `AkilliKlavye` bileşeninin çalıştığı ana istemci ekranıdır.
* **Kritik Güncelleme:** Dosya içindeki mükerrer `ExtendedDictionaryItem` ve `GruplanmisKelime` tanımları silindi. Tüm tipler `@/types/dictionary` üzerinden bağlandı. `eexport` vb. yazım hataları temizlendi.

**`src/types/dictionary.ts` (Merkezi Tip Dosyası)**

* **Sorumluluk:** Projedeki tüm veri modellerinin tiplerini tanımlar.
* **İçerik:**
* `ExtendedDictionaryItem`: Kelime, tanım, lehçe (`string`), dil, `normalizedKelime`, `normalizedTanim` ve dinamik indeksleyici `[key: string]: any` içerir.
* `DictionaryMeta`: Manifest dosyasındaki sözlük künye bilgilerini tanımlar.
* `ConceptRow` ve `GruplanmisKelime`: Sonuçların gruplanması için kullanılan arabirimlerdir.



**`src/hooks/useDictionary.ts` (React Hook)**

* **Sorumluluk:** `dictionaries.json` manifestini okur, seçilen JSON dosyalarını dinamik çeker, `cacheRef` ile bellekte tutar ve arama terimine göre kelimeleri filtreler.
* **Kritik Güncelleme:** `loadOne` fonksiyonunda `meta.file` alanının `undefined` gelme riskine karşı `if (!meta.file) return [];` kontrolü eklenerek **TS2538** hatası ve `(0 kelime)` yüklenme sorunu çözüldü.

---

## 5. Çözülen Hatalar Kataloğu

| Hata Kodu / Türü | Oluştuğu Dosya | Hata Nedeni | Uygulanan Çözüm |
| --- | --- | --- | --- |
| **Parsing Error** | `app/page.tsx` | `"use client"` sayfasında `metadata` tanımlanması ve `eexport` yazım hatası | `metadata` nesnesi `layout.tsx` dosyasına taşındı, yazım hatası düzeltildi. |
| **TS2345** | `app/page.tsx` | `dialect` alanının `string` ve literal union çakışması | Merkezi tipe `string` esnekliği eklendi. |
| **TS2717** | `app/page.tsx` | Aynı dosyada iki kez `GruplanmisKelime` tanımlanması | Mükerrer `interface` silindi, teke düşürüldü. |
| **TS2305** | `useDictionary.ts` | `DictionaryMeta` ve `ConceptRow` tiplerinin eksik olması | Tipler `src/types/dictionary.ts` dosyasına eklenip ihraç edildi. |
| **TS2339** | `useDictionary.ts` | `language` ve `normalized` alanlarının eksik olması | `ExtendedDictionaryItem` tipi güncellendi. |
| **TS2538** | `useDictionary.ts` | `undefined` anahtar ile nesne indeksleme denemesi | `if (!meta.file)` kontrolü eklendi. |
| **404 Not Found** | `Console` | Eksik görseller ve eksik favicon istekleri | Yollar `/icons/favicon.ico` ve `/logo/logo.png` olarak güncellendi. |

---

## 6. Sürdürülebilirlik ve Bağlam Taşıma Prompt Kütüphanesi

Yeni bir sohbet oturumuna geçtiğinizde projeyi sıfırdan anlatmak zorunda kalmamak için aşağıdaki prompt kalıplarını kullanabilirsiniz.

**Master Context Prompt (Yeni Sohbet Başlatıcı)**

```text
Sen Next.js 16 (App Router) ve TypeScript konusunda uzman bir kıdemli yazılım mimarısın. Yürüttüğümüz "Çerkesçe Sözlük Projesi"nin mevcut durumuna ve mimarisine tamamen hakimsin. 

Aşağıda projenin güncel dizin mimarisi, uygulanan standartlar, merkezi tipler ve çözülen hatalar yer almaktadır:

--- PROJE KÜNYESİ VE MİMARİ ---
- Framework: Next.js 16 (App Router), TypeScript, Tailwind CSS
- Dosya Yapısı:
  ├── app/
  │   ├── layout.tsx        --> [Server Component] SEO Metadata, favicon (/icons/favicon.ico), Root Layout
  │   ├── page.tsx          --> [Client Component] "use client" tanımlı. Arama, filtreleme, klavye entegrasyonu
  │   └── globals.css
  ├── src/
  │   ├── types/
  │   │   └── dictionary.ts --> Central Type System (ExtendedDictionaryItem, DictionaryMeta, ConceptRow, GruplanmisKelime)
  │   ├── hooks/
  │   │   └── useDictionary.ts --> Önbellekleme, multi-format JSON parse etme, arama/filtreleme hook'u
  │   ├── components/
  │   │   └── AkilliKlavye.tsx --> Çerkesçe karakter klavyesi
  │   └── utils/
  │       └── cleanHtml.ts  --> HTML temizleme fonksiyonu (temizleHtml)
  └── public/
      ├── icons/ (favicon.ico, favicon.svg)
      ├── logo/ (logo.png)
      └── data/ (dictionaries.json manifest dosyası ve sözlük JSON'ları)

--- KESİN UYGULANACAK MİMARİ KURALLAR ---
1. Server/Client Ayrımı: "use client" olan sayfalarda (app/page.tsx) "export const metadata" ASLA bulunmayacak. Metadata layout.tsx içindedir.
2. Tip Yönetimi (Single Source of Truth): Hiçbir bileşende yerel/mükerrer interface tanımlanmayacak. Tüm tipler '@/types/dictionary' dosyasından import edilecek.
3. Statik Yollar: Logo çağrıları "/logo/logo.png", favicon yönlendirmesi "/icons/favicon.ico" olacak.
4. Veri Güvenliği: `useDictionary.ts` içinde JSON parse işlemleri esnek (spelling, kelime, word, definitions vb.) çalışacak ve undefined kontrolleri (if (!meta.file)) tam olacak.

Bu proje bağlamını doğruladığını onaylamak için sadece "Çerkesçe Sözlük projesi güncel mimarisiyle yüklendi. Hangi modül üzerinde çalışıyoruz?" yanıtını ver ve talimatlarımı bekle.

```

**Özellik Ekleme Promptu**

```text
Çerkesçe Sözlük projesine yeni bir özellik ekleyeceğiz.

Eklenecek Özellik: [Özellik Açıklaması]
Etkilenecek Dosyalar: [Dosya Yolları]

Lütfen değişikliği yaparken:
1. Merkezi tip sistemine (src/types/dictionary.ts) sadık kal.
2. "use client" / Server Component sınırlarını ihlal etme.
3. Sadece ilgili dosyaların güncellenmiş kod bloklarını ver.

```

**Yeni JSON Veri Entegrasyonu Promptu**

```text
Çerkesçe Sözlük projesine yeni bir sözlük verisi (JSON) entegre ediyoruz.

JSON Veri Yapısı Örneği:
[JSON Parçası]

`src/hooks/useDictionary.ts` içindeki `parseDictionaryData` fonksiyonunun bu veri formatını sorunsuz algılaması ve `ExtendedDictionaryItem` tipine dönüştürmesi için gerekli güncellemeyi yaz.

```

**Hata Çözme Promptu**

```text
Çerkesçe Sözlük projesinde bir hata ile karşılaştım.

Hata Mesajı / Kodu: [Hata Metni]
İlgili Dosya: [Dosya Yolu]

Projedeki Server/Client ayrımını ve merkezi tip sistemini göz önünde bulundurarak bu hatayı çözecek kod düzeltmesini sağla.

```