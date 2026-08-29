Çerkesçe Dil Korpusu — Engineering Constitution v1.0
Amaç
Bu belge tüm AI araçları ve geliştiriciler için bağlayıcı mühendislik anayasasıdır.

Öncelik sırası:

Mimari bütünlük
Faz yönetimi
Veri modeli tutarlılığı
Performans
Kod üretimi
Roller
ÇERKESÇ aşağıdaki sorumlulukları üstlenir:

Baş Yazılım Mimarı
Teknik Lider
Kod Kalite Denetçisi
Performans Uzmanı
Faz Yöneticisi
Teknoloji Kuralları
Next.js 16 App Router
React 19
TypeScript Strict
Tailwind CSS
Zod Validation
ESLint
Prettier
Zorunlu:

strict mode
type safety
explicit return type kritik alanlarda
Zod ile dış veri doğrulama
Yasak:

açık any kullanımı
output: 'export'
uzun relative import zincirleri
gereksiz abstraction
Mimari Kurallar
Veri akışı değiştirilemez:

Source ↓ Loader ↓ Normalizer ↓ Repository ↓ Service ↓ Hook ↓ UI

Alt katman üst katmanı import edemez.

Domain Kuralları
Tek domain model kaynağı:

@/types/dictionary.ts

Tek utility kaynağı:

@/lib/dictionaryUtils.ts

Yeni type veya utility eklemeden önce:

mevcut yapı incelenir
genişletme değerlendirilir
birleştirme değerlendirilir
gerekirse yeni dosya açılır
Type Safety Politikası
Öncelik sırası:

Kesin Tip ↓ Generic ↓ unknown ↓ Type Guard ↓ Assertion Function ↓ any

any yalnızca teknik zorunluluk halinde kullanılabilir.

Performans Kuralları
Veri ölçeği:

34 sözlük
428.000+ kayıt
≈204 MB veri
Yasaklar:

O(n²) taramalar
tüm veriyi istemciye yükleme
gereksiz dizi kopyalama
gereksiz re-render
Batch Loading Politikası
Kabul edilmiş karar:

İlk yükleme:

3 sözlük paralel
Sonraki yüklemeler:

4'lü batch
Değişiklik yeni ADR gerektirir.

Faz Kilidi
Aktif faz tamamlanmadan sonraki faz kodlanamaz.

Örnek:

Faz 2 aktif

✅ Faz 3 tasarlanabilir ✅ Faz 3 analiz edilebilir ❌ Faz 3 implement edilemez

Kod İnceleme Sırası
Aktif Faz
Mimari Uyum
Veri Modeli Etkisi
Performans Etkisi
Type Safety
Test Etkisi
Dokümantasyon Etkisi
Dokümantasyon Güncelleme Kuralı
Her teknik değişiklik sonrası:

Faz durumunu etkiledi mi?
Mimariyi etkiledi mi?
Yeni karar oluşturdu mu?
Dokümantasyon güncellemesi gerekiyor mu?
Kontrol edilir.

Oturum Sonu Kontrolü
Etkilenen dosyalar:

AGENTS.md
ARCHITECTURE.md
PHASES.md
ROADMAP.md
DECISIONS.md
PROJECT_STATUS.md
Belirtilir.