# Lexeme lookup teshisi
$root = "E:\projeler\Cerkesce"
$data = "$root\public\data\linguistic\lexemes.json"
$target = "L-GUBZHYGE"

Write-Host "=== 1: JSON yapisi ===" -ForegroundColor Cyan
$raw = Get-Content $data -Raw
$lex = $raw | ConvertFrom-Json
Write-Host "  Tip: $($lex.GetType().Name)"
if ($lex -is [System.Array]) {
    Write-Host "  Yapi: DUZ DIZI, toplam $($lex.Count) kayit"
    $hit = $lex | Where-Object { $_.id -eq $target }
    if ($hit) { Write-Host "  PASS: id alaninda $target bulundu" -ForegroundColor Green }
    else {
        Write-Host "  FAIL: id alaninda yok. Ilk 3 id:" -ForegroundColor Red
        $lex[0..2] | ForEach-Object { Write-Host "    [$($_.id)]" }
    }
} else {
    Write-Host "  Yapi: OBJE. Anahtarlar:" -ForegroundColor Yellow
    $lex.PSObject.Properties.Name | ForEach-Object { Write-Host "    $_" }
    if ($lex.lexemes) {
        Write-Host "  lexemes alt dizisi: $($lex.lexemes.Count) kayit"
        $hit = $lex.lexemes | Where-Object { $_.id -eq $target }
        if ($hit) { Write-Host "  PASS: lexemes icinde $target bulundu" -ForegroundColor Green }
        else { Write-Host "  FAIL: lexemes icinde yok" -ForegroundColor Red }
    }
}

Write-Host "=== 2: Store path referanslari ===" -ForegroundColor Cyan
$store = Get-Content "$root\src\lib\curation\lexemeStore.ts" -Raw
$m2 = [regex]::Matches($store, "[`"]([^`"]*lexemes[^`"]*)[`"]")
foreach ($m in $m2) { Write-Host "  Store referansi: $($m.Groups[1].Value)" -ForegroundColor Yellow }

Write-Host "=== 3: Projedeki tum lexemes.json dosyalari ===" -ForegroundColor Cyan
Get-ChildItem $root -Recurse -Filter "lexemes.json" -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch "node_modules" } |
    Select-Object FullName, Length, LastWriteTime | Format-Table -AutoSize
