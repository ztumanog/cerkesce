param(
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"
$basePath = Get-Location

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DOSYA REORGANIZASYON BASLANIYOR" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "Mod: DRY RUN (Simulasyon)" -ForegroundColor Yellow
} else {
    Write-Host "Mod: GERCEK CALISMA" -ForegroundColor Green
}

Write-Host ""

# Yeni klasorler olustur
Write-Host "[1/4] Yeni klasorler olusturuluyor..." -ForegroundColor Cyan
$newDirs = @("metrics", "security", "phases-roadmap")

foreach ($dir in $newDirs) {
    $dirPath = Join-Path $basePath $dir
    if (-not (Test-Path $dirPath)) {
        if ($DryRun) {
            Write-Host "  [SIMULASYON] Klasor olusturulacak: $dir" -ForegroundColor Yellow
        } else {
            New-Item -ItemType Directory -Path $dirPath -Force | Out-Null
            Write-Host "  [OLUSTURULDU] $dir" -ForegroundColor Green
        }
    } else {
        Write-Host "  [ZATEN VAR] $dir" -ForegroundColor Gray
    }
}
Write-Host "[OK] Klasorler hazirlanmis" -ForegroundColor Green
Write-Host ""

# Dosyalari tasi
Write-Host "[2/4] Dosyalar tasinıyor..." -ForegroundColor Cyan
$fileMoves = @(
    @{Source = "architecture\TECHNICAL_METRICS.md"; Dest = "metrics\"; Name = "Teknik Metrikler"},
    @{Source = "architecture\SOFTWARE_INVENTORY.md"; Dest = "metrics\"; Name = "Yazilim Envanteri"},
    @{Source = "architecture\SECURITY.md"; Dest = "security\"; Name = "Guvenlik Politikasi"},
    @{Source = "architecture\yazlımDosyalari.md"; Dest = ".\"; Name = "Yazilim Dosyalari"}
)

$movedCount = 0
foreach ($move in $fileMoves) {
    $sourcePath = Join-Path $basePath $move.Source
    $destPath = Join-Path $basePath $move.Dest
    
    if (Test-Path $sourcePath) {
        if ($DryRun) {
            Write-Host "  [SIMULASYON] $($move.Name) tasinacak" -ForegroundColor Yellow
        } else {
            Move-Item -Path $sourcePath -Destination $destPath -Force
            Write-Host "  [TASINMIS] $($move.Name)" -ForegroundColor Green
        }
        $movedCount++
    }
}
Write-Host "[OK] $movedCount dosya tasinmis" -ForegroundColor Green
Write-Host ""

# Duplikat dosyalari sil
Write-Host "[3/4] Duplikat dosyalar siliniyor..." -ForegroundColor Cyan
$filesToDelete = @(
    "architecture\ontolouiler.md",
    "architecture\engine_ARCHITECTURE.md",
    "architecture\ArchitesctureDEtay.md",
    "architecture\Cerkesce Dil Koprusu Enggenirin Consultituon v1.md",
    "architecture\phasesDetay.md",
    "architecture\PPHASE_07_00_ARCHITECTURE_REPORT.md",
    "architecture\PHASE_07_00_ARCHITECTURE_REPORT.md",
    "governance\ENGINEERING_CONSTITUTION.md",
    "governance\TEAM_STRUCTURE.md"
)

$deletedCount = 0
foreach ($file in $filesToDelete) {
    $filePath = Join-Path $basePath $file
    if (Test-Path $filePath) {
        if ($DryRun) {
            Write-Host "  [SIMULASYON] Silinecek: $(Split-Path $file -Leaf)" -ForegroundColor Yellow
        } else {
            Remove-Item -Path $filePath -Force
            Write-Host "  [SILINDI] $(Split-Path $file -Leaf)" -ForegroundColor Green
        }
        $deletedCount++
    }
}

# certification klasorunu sil
$certPath = Join-Path $basePath "certification"
if (Test-Path $certPath) {
    if ($DryRun) {
        Write-Host "  [SIMULASYON] Silinecek: certification klasoru" -ForegroundColor Yellow
    } else {
        Remove-Item -Path $certPath -Recurse -Force
        Write-Host "  [SILINDI] certification klasoru" -ForegroundColor Green
    }
    $deletedCount++
}

Write-Host "[OK] $deletedCount dosya/klasor silindi" -ForegroundColor Green
Write-Host ""

# Dogrulama
Write-Host "[4/4] Dogrulama yapiliyor..." -ForegroundColor Cyan
$fileCount = (Get-ChildItem -Path $basePath -Recurse -File).Count
Write-Host "  Toplam dosya sayisi: $fileCount" -ForegroundColor Cyan

$requiredDirs = @("architecture", "governance", "domain", "linguistics", "metrics", "security", "phases-roadmap")
foreach ($dir in $requiredDirs) {
    $dirPath = Join-Path $basePath $dir
    if (Test-Path $dirPath) {
        Write-Host "  [VAR] $dir klasoru" -ForegroundColor Green
    } else {
        Write-Host "  [EKSIK] $dir klasoru" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "REORGANIZASYON OZETI" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tasınan dosyalar: $movedCount" -ForegroundColor Green
Write-Host "Silinen dosyalar: $deletedCount" -ForegroundColor Green
Write-Host "Toplam dosya: $fileCount" -ForegroundColor Green
Write-Host ""

if ($DryRun) {
    Write-Host "UYARI: DRY RUN MODU - Hic bir degisiklik yapilmadi" -ForegroundColor Yellow
    Write-Host "Gercek calisma icin: .\reorganize-files.ps1" -ForegroundColor Yellow
} else {
    Write-Host "TAMAMLANDI: Tum islemler basarili!" -ForegroundColor Green
}

Write-Host ""
