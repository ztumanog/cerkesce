Set-Location -Path "E:\projeler\Cerkesce" -ErrorAction Stop
$reviewFile = "_scripts\2ca-001-review.json"
$auditFile  = "audit_log.jsonl"
$backupDir  = "_backups"

if (-not (Test-Path $reviewFile)) {
    Write-Host "❌ Hata: $reviewFile bulunamadı!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir | Out-Null }
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = Join-Path $backupDir "2ca-001-review.$timestamp.json.bak"
Copy-Item -Path $reviewFile -Destination $backupPath
Write-Host "🔒 Yedek oluşturuldu: $backupPath" -ForegroundColor Green

$rawText = Get-Content -Path $reviewFile -Raw -Encoding UTF8
$rawText = $rawText -replace "^\uFEFF",""
$rawJson = $rawText | ConvertFrom-Json

$reviewData = [ordered]@{}
$rawJson.psobject.properties | ForEach-Object { $reviewData[$_.Name] = $_.Value }

$pendingKeys = @($reviewData.Keys | Where-Object { $_ -ne "_meta" -and ($reviewData[$_].review -eq $true) })
$totalPending = $pendingKeys.Count
Write-Host "📊 Toplam İncelenecek Kavram Sayısı: $totalPending" -ForegroundColor Cyan

if ($totalPending -eq 0) {
    Write-Host "✅ İncelenecek kavram kalmadı!" -ForegroundColor Green
    exit 0
}

$currentIndex = 0

function Save-Progress {
    $jsonOutput = $reviewData | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText((Get-Item $reviewFile).FullName, $jsonOutput, [System.Text.Encoding]::UTF8)
    Write-Host "💾 İlerleme kaydedildi -> $reviewFile" -ForegroundColor Yellow
}

function Write-AuditLog ($word, $action, $target, $candidates, $sources, $confidence) {
    $logEntry = [ordered]@{
        ts                   = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
        actor                = "admin-cli"
        task                 = "2CA-001"
        word                 = $word
        decision             = $action
        target               = $target
        circassianCandidates = $candidates
        sources              = $sources
        confidence           = $confidence
    }
    $logLine = ($logEntry | ConvertTo-Json -Compress) + "`n"
    if (-not (Test-Path $auditFile)) { New-Item -ItemType File -Path $auditFile | Out-Null }
    [System.IO.File]::AppendAllText((Get-Item $auditFile).FullName, $logLine, [System.Text.Encoding]::UTF8)
}

foreach ($key in $pendingKeys) {
    $currentIndex++
    $item = $reviewData[$key]
    
    Clear-Host
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host "  2CA-001 KAVRAM KÜRASYONU [$currentIndex / $totalPending]" -ForegroundColor Yellow
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host "Türkçe Kavram     : $key" -ForegroundColor White
    Write-Host "İngilizce Concept : $($item.target ?? '—')" -ForegroundColor Green
    Write-Host "Çerkesçe Adaylar  : $(($item.circassianCandidates -join ', ') ?? '—')" -ForegroundColor Magenta
    Write-Host "Mevcut Güven      : $($item.confidence ?? 'LOW')" -ForegroundColor DarkYellow
    if ($item.reason) { Write-Host "Not/Gerekçe       : $($item.reason)" -ForegroundColor Gray }
    Write-Host "------------------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "Seçenekler: [e] Onayla (HIGH) | [d] Değiştir | [a] Atla | [q] Kaydet ve Çık" -ForegroundColor Yellow
    
    $inputValid = $false
    while (-not $inputValid) {
        $choice = Read-Host "Kararınız [e/d/a/q]"
        switch ($choice.ToLower().Trim()) {
            "e" {
                $item.confidence = "HIGH"
                $item.review = $false
                Write-AuditLog -word $key -action "approve" -target $item.target -candidates $item.circassianCandidates -sources $item.sources -confidence "HIGH"
                Write-Host "✅ '$key' onaylandı (HIGH)." -ForegroundColor Green
                $inputValid = $true
            }
            "d" {
                $newTarget = Read-Host "İngilizce Concept [$($item.target)]"
                if ([string]::IsNullOrWhiteSpace($newTarget)) { $newTarget = $item.target }
                $newCandStr = Read-Host "Çerkesçe Adaylar (virgülle ayırın) [$(($item.circassianCandidates -join ', '))]"
                if ([string]::IsNullOrWhiteSpace($newCandStr)) { 
                    $newCands = $item.circassianCandidates 
                } else { 
                    $newCands = $newCandStr.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" } 
                }
                $item.target = $newTarget
                $item.circassianCandidates = $newCands
                $item.confidence = "MEDIUM"
                $item.review = $false
                Write-AuditLog -word $key -action "replace" -target $newTarget -candidates $newCands -sources $item.sources -confidence "MEDIUM"
                Write-Host "✏️ '$key' güncellendi." -ForegroundColor Yellow
                $inputValid = $true
            }
            "a" {
                Write-AuditLog -word $key -action "skip" -target $item.target -candidates $item.circassianCandidates -sources $item.sources -confidence $item.confidence
                Write-Host "⏭️ '$key' atlandı." -ForegroundColor Gray
                $inputValid = $true
            }
            "q" {
                Save-Progress
                Write-Host "👋 Kürasyondan çıkıldı." -ForegroundColor Cyan
                exit 0
            }
            default {
                Write-Host "⚠️ Geçersiz seçim! Lütfen 'e', 'd', 'a' veya 'q' girin." -ForegroundColor Red
            }
        }
    }
    Start-Sleep -Milliseconds 300
}

Save-Progress
Write-Host "🎉 Bütün aday kavramlar incelendi ve tamamlandı!" -ForegroundColor Green