# 📜 CLEANUP-DUPLICATES.PS1 - TAM DOKÜMANTASYON

**Versiyon:** 2.0  
**Tarih:** 13 Eylül 2026  
**Proje:** Çerkesçe Sözlük Teknik Dokümantasyonu

---

## 📋 SCRIPT ÖZELLIKLERI

### ✅ Temel Özellikler
- ✓ 26 duplikat dosyayı otomatik siler
- ✓ 4 boş klasörü otomatik siler
- ✓ 2 hatalı dosya adını otomatik düzeltir
- ✓ Otomatik backup oluşturur
- ✓ DRY-RUN modu ile test edilebilir
- ✓ Renkli çıktı ile kolay takip
- ✓ Hata yönetimi ile güvenli
- ✓ MD5 hash ile duplikat doğrulama
- ✓ Detaylı rapor oluşturur

### 🎨 Renkli Çıktı
```
[✓] Başarılı işlemler      - Yeşil
[✗] Hata mesajları        - Kırmızı
[!] Uyarı mesajları       - Sarı
[i] Bilgi mesajları       - Turkuaz
[D] Silinen dosyalar      - Magenta
```

### 🔧 Parametreler

| Parametre | Tür | Varsayılan | Açıklama |
|-----------|-----|-----------|----------|
| `-DryRun` | Switch | $false | Simulasyon modu - hiçbir şey yapılmaz |
| `-Verbose` | Switch | $false | Detaylı çıktı göster |
| `-CreateBackup` | Switch | $true | Otomatik backup oluştur |

---

## 🚀 KULLANIM

### 1. DRY-RUN (Simulasyon - Önerilen)

```powershell
.\cleanup-duplicates.ps1 -DryRun
```

**Ne yapar:**
- Hiçbir dosya silmez
- Silinecek dosyaları listeler
- Yapılacak işlemleri gösterir
- Sonuçları rapor eder

**Çıktı Örneği:**
```
╔════════════════════════════════════════╗
║  DUPLIKAT DOSYA TEMIZLIK SCRIPTI 2.0  ║
║  Çerkesçe Sözlük Projesi              ║
╚════════════════════════════════════════╝

Tarih: 13.09.2026 15:50:30
Konum: E:\home\ProjeDoc\docs

MOD: DRY-RUN (Simulasyon - Hiçbir şey yapılmaz)

[ADIM 2: DUPLIKAT DOSYALAR ANALIZ EDILIYOR]
[i] Duplikat dosya sayısı: 20
[i] Boş klasör sayısı: 4
[i] Hatalı dosya adı sayısı: 2
```

### 2. GERCEK CALISMA (Dosyaları Sil)

```powershell
.\cleanup-duplicates.ps1
```

**Ne yapar:**
- Otomatik backup oluşturur
- Duplikat dosyaları siler
- Boş klasörleri siler
- Hatalı dosya adlarını düzeltir
- Doğrulama yapır

### 3. DETAYLI CIKTI

```powershell
.\cleanup-duplicates.ps1 -Verbose
```

### 4. BACKUP OLMADAN

```powershell
.\cleanup-duplicates.ps1 -CreateBackup:$false
```

---

## 📊 SCRIPT ADIMLARI

### ADIM 1: BACKUP OLUSTURMA
```
✓ Backup klasörü oluştur (backup_yyyyMMdd_HHmmss)
✓ Tüm dosyaları kopyala
✓ Klasör yapısını koru
✓ Hata kontrolü yap
```

### ADIM 2: DUPLIKAT ANALIZI
```
✓ Duplikat dosyaları listele
✓ Boş klasörleri tespit et
✓ Hatalı dosya adlarını bul
✓ Dosya varlığını kontrol et
```

### ADIM 3: DOSYA SILME
```
✓ Her duplikat dosyayı sil
✓ Dosya boyutunu kaydet
✓ Hatalı adları düzelt
✓ Hata yönetimi yap
```

### ADIM 4: BOS KLASOR SILME
```
✓ Her klasörün içini kontrol et
✓ Boş klasörleri sil
✓ Dolu klasörleri atla
✓ Uyarı göster
```

### ADIM 5: DOGRULAMA
```
✓ Toplam dosya sayısını say
✓ Toplam klasör sayısını say
✓ MD5 hash ile duplikat kontrol
✓ Rapor oluştur
```

---

## 📝 SİLİNECEK DOSYALAR (26 dosya)

### Linguistics Duplikatları (13 dosya)
```
✓ linguistics\001-derivational-suffixes.md
✓ linguistics\translation-platform\001-translation-entry.md
✓ linguistics\grammer\002-derivational-prefixes.md
✓ linguistics\translation-platform\002-translation-group.md
✓ linguistics\translation-platform\003-cross-dictionary-matcher.md
✓ linguistics\grammer\003-locative-preverbs.md
✓ linguistics\translation-platform\004-orthographic-normalization.md
✓ linguistics\004-verbal-operators.md
✓ linguistics\grammer\005-morphology-observations.md
✓ linguistics\grammer\006-word-families.md
✓ linguistics\analysis-001-synonyms.md
✓ linguistics\analysis-002-polysemy.md
✓ linguistics\dictionory-17\analysis-003-translation-candidates.md
```

### Architecture Duplikatları (5 dosya)
```
✓ architecture\DECISIONS.md
✓ architecture\INDEX.md
✓ domain\ONTOLOGY_SYSTEM.md
✓ phases-roadmap\PHASE_GATES.md
✓ phases-roadmap\SOFTWARE_INVENTORY.md
```

### Özel Durumlar (8 dosya)
```
✓ domain\linguistics\001-derivational-suffixes.md
✓ domain\linguistics\004-verbal-operators.md
✓ domain\linguistics\analysis-001-synonyms.md
✓ domain\linguistics\analysis-002-polysemy.md
✓ domain\ontolouiler.md (Yazım hatası)
✓ domain\master_MASTER_ONTOLOGY_SYSTEM.md (Garip ad)
✓ governance\certifications\CERTIFICATION_PHASE_01_FOUNDATION.md.md (Hatalı ad)
✓ governance\certifications\CERTIFICATION_PHASE_02_DICTIONARY.md.md (Hatalı ad)
```

---

## 🗂️ SİLİNECEK KLASÖRLER (4 klasör)

```
✓ linguistics\translation-platform\
✓ linguistics\grammer\
✓ linguistics\dictionory-17\
✓ domain\linguistics\
```

---

## 🔍 FONKSIYONLAR

### Write-Header
```powershell
Başlık yazı yazdırır
Parametreler: $Text
Çıktı: Renkli başlık
```

### Write-Success
```powershell
Başarılı işlem mesajı
Parametreler: $Text
Çıktı: [✓] Yeşil metin
```

### Write-Error-Custom
```powershell
Hata mesajı
Parametreler: $Text
Çıktı: [✗] Kırmızı metin
```

### Write-Warning-Custom
```powershell
Uyarı mesajı
Parametreler: $Text
Çıktı: [!] Sarı metin
```

### Write-Info
```powershell
Bilgi mesajı
Parametreler: $Text
Çıktı: [i] Turkuaz metin
```

### Write-Delete
```powershell
Silinen dosya mesajı
Parametreler: $Text
Çıktı: [D] Magenta metin
```

### Get-FileHash-Custom
```powershell
MD5 hash hesapla
Parametreler: $Path
Çıktı: Hash değeri
```

---

## 📊 BEKLENEN SONUÇLAR

### Önceki Durum
```
• Toplam Dosya: 92
• Duplikat Dosya: 26
• Boş Klasör: 4
• Hatalı Dosya Adı: 2
• Organize: ❌ HAYIR
```

### Sonrası Durum
```
• Toplam Dosya: 66 (Tahmini)
• Duplikat Dosya: 0
• Boş Klasör: 0
• Hatalı Dosya Adı: 0
• Organize: ✅ EVET
```

### Tasarruf
```
• Silinen Dosya: 26
• Silinen Klasör: 4
• Tasarruf Edilen Alan: ~40 KB
• Veri Bütünlüğü: ✅ Korundu
```

---

## ⚠️ ÖNEMLİ NOTLAR

### Backup Konumu
```
E:\home\ProjeDoc\docs\backup_20260913_155030\
```

### Hata Yönetimi
- Script hata ile karşılaşırsa durur
- Hata mesajı gösterilir
- Backup korunur

### Güvenlik
- DRY-RUN ile test edin
- Backup otomatik oluşturulur
- Hiçbir dosya kalıcı olarak silinmez (backup var)

---

## 🎯 ADIM ADIM KULLANIM

### 1. HAZIRLIK
```powershell
# PowerShell'i yönetici olarak açın
# docs klasörüne gidin
cd E:\home\ProjeDoc\docs
```

### 2. TEST (DRY-RUN)
```powershell
.\cleanup-duplicates.ps1 -DryRun
# Sonuçları inceleyin
# Sorun yoksa devam edin
```

### 3. ÇALIŞMA
```powershell
.\cleanup-duplicates.ps1
# Backup oluşturulur
# Dosyalar silinir
# Rapor gösterilir
```

### 4. DOĞRULAMA
```powershell
# Dosya sayısını kontrol edin
Get-ChildItem -Recurse -File | Measure-Object

# Klasör yapısını kontrol edin
Get-ChildItem -Recurse -Directory | Measure-Object
```

---

## 🔄 GERI ALMA

Eğer hata olursa:

```powershell
# Backup klasörünü bul
Get-ChildItem -Filter "backup_*" -Directory

# Backup'tan geri yükle
Copy-Item -Path "backup_20260913_155030\*" -Destination "." -Recurse -Force
```

---

## 📞 DESTEK

### Sorun: Script çalışmıyor
```
Çözüm: PowerShell'i yönetici olarak açın
```

### Sorun: Erişim reddedildi
```
Çözüm: Dosyaların kilitli olmadığından emin olun
```

### Sorun: Backup oluşturulamadı
```
Çözüm: Disk alanını kontrol edin (En az 100 MB)
```

---

## ✅ KONTROL LİSTESİ

- [ ] PowerShell'i yönetici olarak açtım
- [ ] docs klasörüne gittim
- [ ] Script'i indirdim
- [ ] DRY-RUN çalıştırdım
- [ ] Sonuçları inceledim
- [ ] Gerçek çalışmayı başlattım
- [ ] Backup oluşturulduğunu gördüm
- [ ] Dosyaların silindiğini gördüm
- [ ] Raporu inceledim
- [ ] Doğrulama yaptım

---

## 🎉 TAMAMLANDI

**Script hazır!** Kullanmaya başlayabilirsiniz.

```powershell
.\cleanup-duplicates.ps1 -DryRun
```

Başarılar! 🚀