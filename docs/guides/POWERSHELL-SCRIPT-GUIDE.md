# 🚀 PowerShell Script Kullanım Rehberi

## 📥 Script İndir

**Dosya:** `reorganize-files.ps1`  
**Boyut:** 8.3 KB  
**Durum:** Production Ready ✅

---

## 🎯 HIZLI BAŞLANGAÇ

### 1. PowerShell'i Aç
```powershell
# Windows + X tuşuna bas
# "Windows PowerShell (Yönetici)" seç
```

### 2. Script Konumuna Git
```powershell
cd "e:\home\ProjeDoc\docs"
```

### 3. Execution Policy Ayarla (İlk Kez)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4. Script'i Çalıştır

#### A. DRY-RUN MODU (Simülasyon - Önerilen)
```powershell
.\reorganize-files.ps1 -DryRun
```
**Nedir?** Hiçbir değişiklik yapmaz, sadece ne yapacağını gösterir.

#### B. GERÇEK ÇALIŞMA
```powershell
.\reorganize-files.ps1
```
**Nedir?** Gerçek dosya taşıma ve silme işlemlerini yapar.

#### C. DETAYLI RAPOR İLE
```powershell
.\reorganize-files.ps1 -Verbose
```
**Nedir?** Tüm işlemleri detaylı gösterir.

#### D. DRY-RUN + VERBOSE
```powershell
.\reorganize-files.ps1 -DryRun -Verbose
```
**Nedir?** Simülasyon modunda detaylı rapor gösterir.

---

## 📋 SCRIPT ÖZELLIKLERI

### ✅ Yapacakları

#### 1. Yeni Klasörler Oluştur
```
✓ /docs/metrics/
✓ /docs/security/
✓ /docs/phases-roadmap/
```

#### 2. Dosyaları Taşı (4 dosya)
```
✓ TECHNICAL_METRICS.md → metrics/
✓ SOFTWARE_INVENTORY.md → metrics/
✓ SECURITY.md → security/
✓ yazlımDosyalari.md → /docs/
```

#### 3. Duplikat Dosyaları Sil (7 dosya)
```
✓ ontolouiler.md
✓ engine_ARCHITECTURE.md
✓ ArchitesctureDEtay.md
✓ Cerkesce Dil Koprusu Enggenirin Consultituon v1.md
✓ phasesDetay.md
✓ PPHASE_07_00_ARCHITECTURE_REPORT.md
✓ PHASE_07_00_ARCHITECTURE_REPORT.md
```

#### 4. Duplikat Dosyaları Sil (2 dosya - governance/)
```
✓ ENGINEERING_CONSTITUTION.md
✓ TEAM_STRUCTURE.md
```

#### 5. Duplikat Klasörü Sil
```
✓ certification/ (governance/certifications/ tutulacak)
```

#### 6. Doğrulama
```
✓ Dosya sayısını kontrol et
✓ Tüm klasörlerin var olup olmadığını kontrol et
✓ Rapor göster
```

---

## 🎨 RENKLI ÇIKTI

Script aşağıdaki renklerle çıktı verir:

```
🟢 Yeşil (Success)     - İşlem başarılı
🔴 Kırmızı (Error)     - Hata oluştu
🟡 Sarı (Warning)      - Uyarı
🔵 Mavi (Info)         - Bilgi
🟣 Mor (Header)        - Başlık
```

---

## 📊 ÇIKTI ÖRNEĞİ

### DRY-RUN Modu Çıktısı

```
========================================
DOSYA REORGANIZASYON BAŞLANIYOR
========================================

Hedef Klasör: e:\home\ProjeDoc\docs
Mod: DRY RUN (Simülasyon)

✅ Klasör kontrol edildi

[1/4] Yeni klasörler oluşturuluyor...
  ✓ metrics klasörü oluşturulacak
  ✓ security klasörü oluşturulacak
  ✓ phases-roadmap klasörü oluşturulacak
✅ Klasörler hazırlandı

[2/4] Dosyalar taşınıyor...
  ✓ Teknik Metrikler taşındı
  ✓ Yazılım Envanteri taşındı
  ✓ Güvenlik Politikası taşındı
  ✓ Yazılım Dosyaları taşındı
✅ 4 dosya taşındı

[3/4] Duplikat dosyalar siliniyor...
  ✓ ontolouiler.md silindi
  ✓ engine_ARCHITECTURE.md silindi
  ✓ ArchitesctureDEtay.md silindi
  ✓ Cerkesce Dil Koprusu... silindi
  ✓ phasesDetay.md silindi
  ✓ PPHASE_07_00_ARCHITECTURE_REPORT.md silindi
  ✓ PHASE_07_00_ARCHITECTURE_REPORT.md silindi
  ✓ ENGINEERING_CONSTITUTION.md silindi
  ✓ TEAM_STRUCTURE.md silindi
  ✓ certification klasörü silindi
✅ 10 dosya/klasör silindi

[4/4] Doğrulama yapılıyor...
  Toplam dosya sayısı: 45
  ✓ architecture klasörü var
  ✓ governance klasörü var
  ✓ domain klasörü var
  ✓ linguistics klasörü var
  ✓ metrics klasörü var
  ✓ security klasörü var
  ✓ phases-roadmap klasörü var

========================================
REORGANIZASYON ÖZETI
========================================

Taşınan dosyalar: 4
Silinen dosyalar: 10
Toplam dosya: 45

✅ Tüm gerekli klasörler var

⚠️ DRY RUN MODU - Hiçbir değişiklik yapılmadı
Gerçek çalıştırmak için: .\reorganize-files.ps1
```

---

## ⚠️ ÖNEMLİ NOTLAR

### Execution Policy
```powershell
# Eğer "cannot be loaded because running scripts is disabled" hatası alırsan:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Yönetici Haklarına İhtiyaç
- PowerShell'i **Yönetici olarak** aç
- Başlat → "PowerShell" yazıp sağ tıkla → "Yönetici olarak çalıştır"

### Backup Al
```powershell
# Script çalıştırmadan önce backup al:
Copy-Item -Path "e:\home\ProjeDoc\docs" -Destination "e:\home\ProjeDoc\docs_backup" -Recurse
```

### Geri Alma
```powershell
# Eğer sorun olursa backup'tan geri al:
Remove-Item -Path "e:\home\ProjeDoc\docs" -Recurse -Force
Copy-Item -Path "e:\home\ProjeDoc\docs_backup" -Destination "e:\home\ProjeDoc\docs" -Recurse
```

---

## 🔧 ADVANCED KULLANIM

### Verbose Modu ile Detaylı Rapor
```powershell
.\reorganize-files.ps1 -Verbose
```

Çıktı:
```
DETAYLI RAPOR

Taşınan Dosyalar:
  • Teknik Metrikler
    Kaynak: architecture\TECHNICAL_METRICS.md
    Hedef: metrics\
  • Yazılım Envanteri
    Kaynak: architecture\SOFTWARE_INVENTORY.md
    Hedef: metrics\
  ...

Silinen Dosyalar:
  • ontolouiler.md
  • engine_ARCHITECTURE.md
  ...

Silinen Klasörler:
  • certification
```

### Hata Kontrol
Script otomatik olarak:
- ✅ Dosya var mı kontrol eder
- ✅ Klasör var mı kontrol eder
- ✅ Dosya sayısını doğrular
- ✅ Eksik klasörleri raporlar

---

## 📝 ADIM ADIM KIYLAVUZ

### 1. Hazırlık
```powershell
# PowerShell'i Yönetici olarak aç
# Execution Policy ayarla (ilk kez)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Backup Al
```powershell
cd "e:\home\ProjeDoc"
Copy-Item -Path "docs" -Destination "docs_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')" -Recurse
```

### 3. DRY-RUN Çalıştır
```powershell
cd "e:\home\ProjeDoc\docs"
.\reorganize-files.ps1 -DryRun
```

### 4. Çıktıyı Kontrol Et
- Tüm işlemler doğru mu?
- Dosya sayısı 45 mi?
- Hata var mı?

### 5. Gerçek Çalıştır
```powershell
.\reorganize-files.ps1
```

### 6. Sonucu Doğrula
```powershell
# Dosya sayısını kontrol et
(Get-ChildItem -Path "." -Recurse -File).Count

# Klasörleri kontrol et
Get-ChildItem -Path "." -Directory
```

---

## ✅ KONTROL LİSTESİ

- [ ] PowerShell'i Yönetici olarak aç
- [ ] Execution Policy ayarla
- [ ] Script konumuna git
- [ ] Backup al
- [ ] DRY-RUN çalıştır (-DryRun)
- [ ] Çıktıyı kontrol et
- [ ] Gerçek çalıştır
- [ ] Sonucu doğrula
- [ ] Backup'ı kaldır (başarılıysa)

---

## 🆘 SORUN GİDERME

### Hata: "cannot be loaded because running scripts is disabled"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Hata: "Access Denied"
```powershell
# PowerShell'i Yönetici olarak aç
# Başlat → PowerShell → Sağ tıkla → Yönetici olarak çalıştır
```

### Hata: "File not found"
```powershell
# Script dosyasının doğru konumda olup olmadığını kontrol et
# e:\home\ProjeDoc\docs\ klasöründe olmalı
```

### Hata: "Path not found"
```powershell
# Yol adresini kontrol et
# e:\home\ProjeDoc\docs olmalı
```

---

## 📊 SONUÇ

**Önceki Durum:**
- 53 dosya
- 10 klasör
- 8 duplikat

**Yeni Durum:**
- 45 dosya
- 8 klasör
- 0 duplikat

**Script Özeti:**
- ✅ Otomatik
- ✅ Güvenli (DRY-RUN modu)
- ✅ Detaylı rapor
- ✅ Hata kontrolü
- ✅ Renkli çıktı

---

**Durum:** ✅ READY TO USE 🚀