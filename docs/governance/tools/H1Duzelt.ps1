# ============================================================
# H1 Duzeltme (3 dosya)
# Tarih: 2026-10-16
# ============================================================

$ErrorActionPreference = "Stop"
$Root = "E:\projeler\Cerkesce\docs"
$BackupDir = "E:\projeler\Cerkesce\backups\h1-" + (Get-Date -Format "yyyy-MM-dd_HHmmss")

if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }
Write-Host "Yedek klasoru: $BackupDir" -ForegroundColor Gray

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# --- 1. ADR-0016 ---
Write-Host ""
Write-Host "[1] ADR-0016-Phase3-7-Dondurma-SUPERSEDED.md..." -ForegroundColor Yellow
$dosya = Join-Path $Root "architecture\adr\ADR-0016-Phase3-7-Dondurma-SUPERSEDED.md"
$yedek = Join-Path $BackupDir "ADR-0016-SUPERSEDED.md"
Copy-Item -Path $dosya -Destination $yedek -Force

$icerik = [System.IO.File]::ReadAllText($dosya)
$icerik = $icerik -replace "(?m)^### ADR-0016:", "# ADR-0016:"
[System.IO.File]::WriteAllText($dosya, $icerik, $utf8NoBom)
Write-Host "  H1 eklendi." -ForegroundColor Green

# --- 2. MIMAR_MESAJ ---
Write-Host ""
Write-Host "[2] MIMAR_MESAJ.md..." -ForegroundColor Yellow
$dosya = Join-Path $Root "governance\decisions\MIMAR_MESAJ.md"
$yedek = Join-Path $BackupDir "MIMAR_MESAJ.md"
Copy-Item -Path $dosya -Destination $yedek -Force

$icerik = [System.IO.File]::ReadAllText($dosya)

# Basa H1 ekle + "c" sil
$icerik = $icerik -replace "^\s*c\s*\n", ""
$icerik = "# Mimar Mesajları`n`n" + $icerik
[System.IO.File]::WriteAllText($dosya, $icerik, $utf8NoBom)
Write-Host "  H1 eklendi, 'c' silindi." -ForegroundColor Green

# --- 3. DOCS_EDIT_AUDIT_INDEX ---
Write-Host ""
Write-Host "[3] DOCS_EDIT_AUDIT_INDEX.md..." -ForegroundColor Yellow
$dosya = Join-Path $Root "governance\inventory\DOCS_EDIT_AUDIT_INDEX.md"
$yedek = Join-Path $BackupDir "DOCS_EDIT_AUDIT_INDEX.md"
Copy-Item -Path $dosya -Destination $yedek -Force

$icerik = [System.IO.File]::ReadAllText($dosya)
$icerik = $icerik -replace "^DOCS_E#", "#"
[System.IO.File]::WriteAllText($dosya, $icerik, $utf8NoBom)
Write-Host "  'DOCS_E' silindi, H1 duzeltildi." -ForegroundColor Green

# --- DOGRULAMA ---
Write-Host ""
Write-Host "=== DOGRULAMA ===" -ForegroundColor Cyan

Write-Host ""
Write-Host "ADR-0016:" -ForegroundColor Yellow
Get-Content (Join-Path $Root "architecture\adr\ADR-0016-Phase3-7-Dondurma-SUPERSEDED.md") -TotalCount 1

Write-Host ""
Write-Host "MIMAR_MESAJ:" -ForegroundColor Yellow
Get-Content (Join-Path $Root "governance\decisions\MIMAR_MESAJ.md") -TotalCount 3

Write-Host ""
Write-Host "DOCS_EDIT_AUDIT_INDEX:" -ForegroundColor Yellow
Get-Content (Join-Path $Root "governance\inventory\DOCS_EDIT_AUDIT_INDEX.md") -TotalCount 1

# --- UYGULAMA KAYDI ---
$uygulamaFile = Join-Path $Root "governance\inventory\edit-audit\07-UYGULAMA-RAPORU.md"
$kayit = "`n---`n`n## 2026-10-16 - H1 Duzeltme (3 dosya)`n`nEksik/bozuk H1'ler duzeltildi.`n- ADR-0016-SUPERSEDED.md: ### -> #`n- MIMAR_MESAJ.md: H1 eklendi, 'c' silindi`n- DOCS_EDIT_AUDIT_INDEX.md: 'DOCS_E' silindi`n- Arsiv/tarihsel: DOKUNULMADI (3 dosya)`n- Yedek: $BackupDir`n"

if (Test-Path $uygulamaFile) {
    [System.IO.File]::AppendAllText($uygulamaFile, $kayit, $utf8NoBom)
    Write-Host ""
    Write-Host "Uygulama kaydi eklendi (LF)." -ForegroundColor Green
}

Write-Host ""
Write-Host "=== TAMAMLANDI ===" -ForegroundColor Cyan