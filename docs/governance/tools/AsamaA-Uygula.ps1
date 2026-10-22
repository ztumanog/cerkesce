# ============================================================
# Asama A - Mekanik Bicim (UYGULA)
# Tarih: 2026-10-16
# CRLF -> LF, BOM kaldir
# ============================================================

$ErrorActionPreference = "Stop"
$Root = "E:\projeler\Cerkesce\docs"
$BackupDir = "E:\projeler\Cerkesce\backups\asama-a-" + (Get-Date -Format "yyyy-MM-dd_HHmmss")

if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }

Write-Host "=== ASAMA A - UYGULAMA ===" -ForegroundColor Cyan
Write-Host "Yedek klasoru: $BackupDir" -ForegroundColor Gray
Write-Host ""

$files = Get-ChildItem -Path $Root -Recurse -Filter "*.md" -File

$crlfSayisi = 0
$bomSayisi = 0
$degisenSayisi = 0

foreach ($f in $files) {
    $rel = $f.FullName.Replace($Root, "docs")
    $degisti = $false

    # --- BYTE OLARAK OKU ---
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)

    # --- BOM KONTROLU ---
    $bomVar = $false
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $bomVar = $true
        $bomSayisi++
        $bytes = $bytes[3..($bytes.Length-1)]  # BOM'u kes
        $degisti = $true
    }

    # --- STRING OLARAK CEVIR ---
    $icerik = [System.Text.Encoding]::UTF8.GetString($bytes)

    # --- CRLF KONTROLU ---
    if ($icerik -match "`r`n") {
        $crlfSayisi++
        $icerik = $icerik.Replace("`r`n", "`n")
        $degisti = $true
    }

    # --- TEK CR (nadir) ---
    if ($icerik -match "`r") {
        $icerik = $icerik.Replace("`r", "`n")
        $degisti = $true
    }

    # --- DEGISTIYSE YEDEKLE + KAYDET ---
    if ($degisti) {
        $yedekYol = Join-Path $BackupDir ($rel.Replace("\", "_"))
        Copy-Item -Path $f.FullName -Destination $yedekYol -Force

        # BOM'suz UTF-8 kaydet
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($f.FullName, $icerik, $utf8NoBom)

        $degisenSayisi++
        Write-Host "  Duzeltildi: $rel" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== OZET ===" -ForegroundColor Cyan
Write-Host "Toplam .md dosyasi : $($files.Count)" -ForegroundColor Gray
Write-Host "CRLF duzeltildi    : $crlfSayisi" -ForegroundColor Green
Write-Host "BOM kaldirildi     : $bomSayisi" -ForegroundColor Green
Write-Host "Degisen dosya      : $degisenSayisi" -ForegroundColor Green
Write-Host "Yedek              : $BackupDir" -ForegroundColor Gray

# --- UYGULAMA KAYDI ---
$uygulamaFile = Join-Path $Root "governance\inventory\edit-audit\07-UYGULAMA-RAPORU.md"
$kayit = "`n---`n`n## 2026-10-16 - Asama A Mekanik Bicim`n`nCRLF -> LF ve BOM kaldirma uygulandi.`n- CRLF duzeltildi: $crlfSayisi dosya`n- BOM kaldirildi: $bomSayisi dosya`n- Toplam degisen: $degisenSayisi dosya`n- Yedek: $BackupDir`n"

if (Test-Path $uygulamaFile) {
    Add-Content -Path $uygulamaFile -Value $kayit -Encoding UTF8
    Write-Host "Uygulama kaydi eklendi." -ForegroundColor Green
}

Write-Host ""
Write-Host "=== TAMAMLANDI ===" -ForegroundColor Cyan