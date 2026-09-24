# docs-p4-009.ps1
# Amac: P4-009 (Drawer Semantik Sunum) dokumantasyonunu ekle

param([switch]$DryRun)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path ".").Path
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = Join-Path $root "_backup_$timestamp"

$memoDosya = Join-Path $root "MEMO.md"
$statusDosya = Join-Path $root "PROJECT_STATUS.md"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  P4-009 Dokumantasyon Guncellemesi" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "MEMO    : $memoDosya" -ForegroundColor Gray
Write-Host "STATUS  : $statusDosya" -ForegroundColor Gray
Write-Host "Yedek   : $backupDir" -ForegroundColor Gray
Write-Host ""

# 1) Yedek
Write-Host "[1/3] Yedek aliniyor..." -ForegroundColor Yellow
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}
if (Test-Path $memoDosya) {
    Copy-Item $memoDosya (Join-Path $backupDir "MEMO.md") -Force
    Write-Host "  + MEMO.md" -ForegroundColor DarkGray
}
if (Test-Path $statusDosya) {
    Copy-Item $statusDosya (Join-Path $backupDir "PROJECT_STATUS.md") -Force
    Write-Host "  + PROJECT_STATUS.md" -ForegroundColor DarkGray
}

# 2) MEMO.md guncelle
Write-Host "`n[2/3] MEMO.md guncelleniyor..." -ForegroundColor Yellow

$memoEntry = @'


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
'@

if (Test-Path $memoDosya) {
    if (-not $DryRun) {
        Add-Content -Path $memoDosya -Value $memoEntry -Encoding UTF8
        Write-Host "  OK P4-009 eklendi" -ForegroundColor Green
    } else {
        Write-Host "  (DryRun) Eklenecek" -ForegroundColor DarkGray
    }
} else {
    Write-Host "  ! MEMO.md bulunamadi, olusturuluyor..." -ForegroundColor Yellow
    if (-not $DryRun) {
        Set-Content -Path $memoDosya -Value "# MEMO - Cerkesce Sozluk Projesi`n$memoEntry" -Encoding UTF8
        Write-Host "  OK MEMO.md olusturuldu" -ForegroundColor Green
    }
}

# 3) PROJECT_STATUS.md guncelle
Write-Host "`n[3/3] PROJECT_STATUS.md guncelleniyor..." -ForegroundColor Yellow

$statusEntry = @'


---

## P4-009: Drawer Semantik Sunum (2026-09-24)

**Status:** ✅ COMPLETED

### Tamamlanan

- HTML direct render (`dangerouslySetInnerHTML`)
- `cleanHtml.tsx` → HTML KORU
- 4 section type guncellendi
- `dictionaries.json` displayName duzeltmesi (34 kayit)

### Sonuclar

- Tum marker'lar renkli (◊, ♦, /, ~, а), б))
- Bold/italic/girinti korunuyor
- Cerkesce/Rusca ayrimi otomatik
- `tsc --noEmit` PASS
- 62/62 test dosyasi PASS
- 193/193 test PASS
'@

if (Test-Path $statusDosya) {
    if (-not $DryRun) {
        Add-Content -Path $statusDosya -Value $statusEntry -Encoding UTF8
        Write-Host "  OK P4-009 eklendi" -ForegroundColor Green
    } else {
        Write-Host "  (DryRun) Eklenecek" -ForegroundColor DarkGray
    }
} else {
    Write-Host "  ! PROJECT_STATUS.md bulunamadi" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " TAMAMLANDI" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Yedek : $backupDir" -ForegroundColor Gray
Write-Host ""
Write-Host "Commit:" -ForegroundColor Yellow
Write-Host "  git add MEMO.md PROJECT_STATUS.md" -ForegroundColor DarkGray
Write-Host "  git commit -m 'docs: P4-009 Drawer Semantik Sunum'" -ForegroundColor DarkGray
Write-Host "  git push" -ForegroundColor DarkGray
Write-Host ""