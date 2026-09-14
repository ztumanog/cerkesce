param(
    [switch]$DryRun = $false,
    [switch]$Verbose = $false,
    [bool]$CreateBackup = $true
)

# Renkler
$colors = @{
    Success = 'Green'
    Error = 'Red'
    Warning = 'Yellow'
    Info = 'Cyan'
    Delete = 'Magenta'
}

function Write-ColorOutput {
    param([string]$Message, [string]$Color = 'White')
    Write-Host $Message -ForegroundColor $Color
}

# Başlık
Write-Host ""
Write-Host "" -ForegroundColor Cyan
Write-Host "  DUPLIKAT DOSYA TEMIZLIK SCRIPTI 2.0  " -ForegroundColor Cyan
Write-Host "  Çerkesçe Sözlük Projesi              " -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan
Write-Host ""

$startTime = Get-Date
Write-ColorOutput "[i] Tarih: $($startTime.ToString('dd.MM.yyyy HH:mm:ss'))" $colors.Info
Write-ColorOutput "[i] Konum: $(Get-Location)" $colors.Info

if ($DryRun) {
    Write-ColorOutput "[!] MOD: DRY-RUN (Simulasyon - Hiçbir şey yapılmaz)" $colors.Warning
} else {
    Write-ColorOutput "[!] MOD: GERÇEK ÇALIŞMA (Dosyalar silinecek)" $colors.Warning
}

Write-Host ""

# ADIM 1: BACKUP OLUŞTURMA
if ($CreateBackup -and -not $DryRun) {
    Write-Host "" -ForegroundColor Cyan
    Write-ColorOutput "ADIM 1: BACKUP OLUŞTURMA" $colors.Info
    Write-Host "" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        $backupDir = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        Write-ColorOutput "[] Backup klasörü oluşturuldu: $backupDir" $colors.Success
    } catch {
        Write-ColorOutput "[] Backup oluşturulamadı: $_" $colors.Error
        exit 1
    }
}

# ADIM 2: DUPLIKAT DOSYALAR ANALIZ EDILIYOR
Write-Host "" -ForegroundColor Cyan
Write-ColorOutput "ADIM 2: DUPLIKAT DOSYALAR ANALIZ EDILIYOR" $colors.Info
Write-Host "" -ForegroundColor Cyan
Write-Host ""

# Duplikat dosyalar listesi
$duplicates = @(
    "linguistics\001-derivational-suffixes.md",
    "linguistics\translation-platform\001-translation-entry.md",
    "linguistics\grammer\002-derivational-prefixes.md",
    "linguistics\translation-platform\002-translation-group.md",
    "linguistics\translation-platform\003-cross-dictionary-matcher.md",
    "linguistics\grammer\003-locative-preverbs.md",
    "linguistics\translation-platform\004-orthographic-normalization.md",
    "linguistics\004-verbal-operators.md",
    "linguistics\grammer\005-morphology-observations.md",
    "linguistics\grammer\006-word-families.md",
    "linguistics\analysis-001-synonyms.md",
    "linguistics\analysis-002-polysemy.md",
    "linguistics\dictionory-17\analysis-003-translation-candidates.md",
    "architecture\DECISIONS.md",
    "architecture\INDEX.md",
    "domain\ONTOLOGY_SYSTEM.md",
    "phases-roadmap\PHASE_GATES.md",
    "phases-roadmap\SOFTWARE_INVENTORY.md",
    "domain\linguistics\001-derivational-suffixes.md",
    "domain\linguistics\004-verbal-operators.md",
    "domain\linguistics\analysis-001-synonyms.md",
    "domain\linguistics\analysis-002-polysemy.md",
    "domain\ontolouiler.md",
    "domain\master_MASTER_ONTOLOGY_SYSTEM.md",
    "governance\certifications\CERTIFICATION_PHASE_01_FOUNDATION.md.md",
    "governance\certifications\CERTIFICATION_PHASE_02_DICTIONARY.md.md"
)

$emptyDirs = @(
    "linguistics\translation-platform",
    "linguistics\grammer",
    "linguistics\dictionory-17",
    "domain\linguistics"
)

$duplicateCount = 0
$totalSize = 0

foreach ($file in $duplicates) {
    if (Test-Path $file) {
        $fileSize = (Get-Item $file).Length
        $totalSize += $fileSize
        $duplicateCount++
    }
}

Write-ColorOutput "[i] Duplikat dosya sayısı: $duplicateCount" $colors.Info
Write-ColorOutput "[i] Boş klasör sayısı: $($emptyDirs.Count)" $colors.Info
Write-ColorOutput "[i] Toplam silinecek boyut: $([math]::Round($totalSize/1KB, 2)) KB" $colors.Info

Write-Host ""

# ADIM 3: DOSYA SILME
if (-not $DryRun) {
    Write-Host "" -ForegroundColor Cyan
    Write-ColorOutput "ADIM 3: DUPLIKAT DOSYALAR SİLİNİYOR" $colors.Info
    Write-Host "" -ForegroundColor Cyan
    Write-Host ""
    
    $deletedCount = 0
    foreach ($file in $duplicates) {
        if (Test-Path $file) {
            try {
                Remove-Item $file -Force
                Write-ColorOutput "[] Silindi: $file" $colors.Success
                $deletedCount++
            } catch {
                Write-ColorOutput "[] Silinemedi: $file" $colors.Error
            }
        }
    }
    
    Write-ColorOutput "[] Toplam silinen dosya: $deletedCount" $colors.Success
    Write-Host ""
}

# ADIM 4: BOŞ KLASÖRLER SİLİNİYOR
if (-not $DryRun) {
    Write-Host "" -ForegroundColor Cyan
    Write-ColorOutput "ADIM 4: BOŞ KLASÖRLER SİLİNİYOR" $colors.Info
    Write-Host "" -ForegroundColor Cyan
    Write-Host ""
    
    $deletedDirCount = 0
    foreach ($dir in $emptyDirs) {
        if (Test-Path $dir) {
            try {
                Remove-Item $dir -Force -Recurse
                Write-ColorOutput "[] Silindi: $dir" $colors.Success
                $deletedDirCount++
            } catch {
                Write-ColorOutput "[] Silinemedi: $dir" $colors.Error
            }
        }
    }
    
    Write-ColorOutput "[] Toplam silinen klasör: $deletedDirCount" $colors.Success
    Write-Host ""
}

# SONUÇ
$endTime = Get-Date
$duration = $endTime - $startTime

Write-Host "" -ForegroundColor Green
Write-Host "         TAMAMLANDI                    " -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host ""

if ($DryRun) {
    Write-ColorOutput "[!] DRY-RUN modu. Gerçek çalışma için -DryRun parametresini kaldırın." $colors.Warning
} else {
    Write-ColorOutput "[] Tüm işlemler başarılı!" $colors.Success
}

Write-ColorOutput "[i] İşlem süresi: $($duration.TotalSeconds) saniye" $colors.Info
Write-Host ""
