# ============================================================
# Tekrar Blok Temizligi (3 dosya)
# Tarih: 2026-10-16
# ============================================================

$ErrorActionPreference = "Stop"
$Root = "E:\projeler\Cerkesce\docs"
$BackupDir = "E:\projeler\Cerkesce\backups\tekrar-" + (Get-Date -Format "yyyy-MM-dd_HHmmss")

if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }
Write-Host "Yedek klasoru: $BackupDir" -ForegroundColor Gray

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# --- 1. meta/MEMO.md ---
Write-Host ""
Write-Host "[1] meta/MEMO.md..." -ForegroundColor Yellow
$dosya = Join-Path $Root "meta\MEMO.md"
$yedek = Join-Path $BackupDir "MEMO.md"
Copy-Item -Path $dosya -Destination $yedek -Force

$icerik = [System.IO.File]::ReadAllText($dosya)

# Satir 126'daki tekrar blogu sil (## ✅ P4-009 ... sonuna kadar)
# Bu blogun baslangici: "## ✅ P4-009" (ikinci gecis)
# Bitisi: "## 2026-09-24" (bir sonraki baslik)
$baslangic = $icerik.IndexOf("## ✅ P4-009: Drawer Semantik Sunum", $icerik.IndexOf("## ✅ P4-009: Drawer Semantik Sunum") + 10)
if ($baslangic -gt 0) {
    $bitis = $icerik.IndexOf("## 2026-09-24", $baslangic)
    if ($bitis -gt $baslangic) {
        $icerik = $icerik.Substring(0, $baslangic) + $icerik.Substring($bitis)
        Write-Host "  Tekrar blok silindi." -ForegroundColor Green
    }
}

[System.IO.File]::WriteAllText($dosya, $icerik, $utf8NoBom)

# --- 2. morphology/MORPHOLOGY_ENGINE_CHARTER.md ---
Write-Host ""
Write-Host "[2] morphology/MORPHOLOGY_ENGINE_CHARTER.md..." -ForegroundColor Yellow
$dosya = Join-Path $Root "morphology\MORPHOLOGY_ENGINE_CHARTER.md"
$yedek = Join-Path $BackupDir "MORPHOLOGY_ENGINE_CHARTER.md"
Copy-Item -Path $dosya -Destination $yedek -Force

$icerik = [System.IO.File]::ReadAllText($dosya)

# Ikinci "## GÜNCELLEME (2026-10-02)" blogunu sil
$ilkGuncelleme = $icerik.IndexOf("## GÜNCELLEME (2026-10-02)")
$ikinciGuncelleme = $icerik.IndexOf("## GÜNCELLEME (2026-10-02)", $ilkGuncelleme + 10)

if ($ikinciGuncelleme -gt 0) {
    # Ikinci guncellemeden sonrasini kes (dosya sonuna kadar)
    $icerik = $icerik.Substring(0, $ikinciGuncelleme)
    Write-Host "  Ikinci GUNCELLEME blogu silindi." -ForegroundColor Green
}

[System.IO.File]::WriteAllText($dosya, $icerik, $utf8NoBom)

# --- 3. morphology/MORPHOLOGY_SCOPE.md ---
Write-Host ""
Write-Host "[3] morphology/MORPHOLOGY_SCOPE.md..." -ForegroundColor Yellow
$dosya = Join-Path $Root "morphology\MORPHOLOGY_SCOPE.md"
$yedek = Join-Path $BackupDir "MORPHOLOGY_SCOPE.md"
Copy-Item -Path $dosya -Destination $yedek -Force

$icerik = [System.IO.File]::ReadAllText($dosya)

# Eski surumu sil (satir 1-130 civari)
# Yeni surum "## MORPHOLOGY_SCOPE.md" ile basliyor
$yeniBaslangic = $icerik.IndexOf("## MORPHOLOGY_SCOPE.md")

if ($yeniBaslangic -gt 0) {
    # Bastan yeni surume kadar olan kismi kes, yeni surumu tut
    $icerik = $icerik.Substring($yeniBaslangic)

    # Basa H1 ekle
    $icerik = "# MORPHOLOGY_SCOPE`n`n" + $icerik

    # "## MORPHOLOGY_SCOPE.md" basligini kaldir (artik H1 var)
    $icerik = $icerik -replace "(?m)^## MORPHOLOGY_SCOPE\.md`n", ""

    Write-Host "  Eski surum silindi, yeni surum korundu + H1 eklendi." -ForegroundColor Green
}

[System.IO.File]::WriteAllText($dosya, $icerik, $utf8NoBom)

# --- DOGRULAMA ---
Write-Host ""
Write-Host "=== DOGRULAMA ===" -ForegroundColor Cyan

Write-Host ""
Write-Host "MEMO.md:" -ForegroundColor Yellow
Select-String -Path (Join-Path $Root "meta\MEMO.md") -Pattern "^#{1,3} " | Select-Object LineNumber, Line

Write-Host ""
Write-Host "MORPHOLOGY_ENGINE_CHARTER.md:" -ForegroundColor Yellow
Select-String -Path (Join-Path $Root "morphology\MORPHOLOGY_ENGINE_CHARTER.md") -Pattern "^#{1,3} " | Select-Object LineNumber, Line

Write-Host ""
Write-Host "MORPHOLOGY_SCOPE.md:" -ForegroundColor Yellow
Select-String -Path (Join-Path $Root "morphology\MORPHOLOGY_SCOPE.md") -Pattern "^#{1,3} " | Select-Object LineNumber, Line

# --- UYGULAMA KAYDI ---
$uygulamaFile = Join-Path $Root "governance\inventory\edit-audit\07-UYGULAMA-RAPORU.md"
$kayit = "`n---`n`n## 2026-10-16 - Tekrar Blok Temizligi (3 dosya)`n`nAktif belgelerdeki tekrar bloklar silindi.`n- meta/MEMO.md: P4-009 tekrar silindi`n- MORPHOLOGY_ENGINE_CHARTER.md: 2. GUNCELLEME silindi`n- MORPHOLOGY_SCOPE.md: eski surum silindi, yeni surum korundu`n- P5-001-CORPUS_AUDIT.md: DOKUNULMADI (faz raporu)`n- Yedek: $BackupDir`n"

if (Test-Path $uygulamaFile) {
    [System.IO.File]::AppendAllText($uygulamaFile, $kayit, $utf8NoBom)
    Write-Host ""
    Write-Host "Uygulama kaydi eklendi (LF)." -ForegroundColor Green
}