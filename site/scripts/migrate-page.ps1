param(
  [Parameter(Mandatory = $true)]
  [string]$Page
)

$siteRoot = Split-Path $PSScriptRoot -Parent
$projectRoot = Split-Path $siteRoot -Parent

$sourceHtml = Join-Path $projectRoot "$Page.html"
$sourceCss = Join-Path $projectRoot "$Page.css"

$targetPageDir = Join-Path $siteRoot "src\pages"
$targetLegacyDir = Join-Path $siteRoot "public\legacy"

$targetHtml = Join-Path $targetPageDir "$Page.astro"
$targetCss = Join-Path $targetLegacyDir "$Page.css"

if (-not (Test-Path $sourceHtml)) {
  throw "Não encontrei o HTML: $sourceHtml"
}

if (-not (Test-Path $sourceCss)) {
  throw "Não encontrei o CSS: $sourceCss"
}

New-Item -ItemType Directory -Force $targetPageDir, $targetLegacyDir | Out-Null

Copy-Item $sourceCss $targetCss -Force

$content = [System.IO.File]::ReadAllText(
  $sourceHtml,
  [System.Text.Encoding]::UTF8
)

$replacements = [ordered]@{
  'href="zom.css"'      = 'href="/legacy/zom.css"'
  'href="style.css"'    = 'href="/legacy/style.css"'
  'href="mobile.css"'   = 'href="/legacy/mobile.css"'
  "href=`"$Page.css`""  = "href=`"/legacy/$Page.css`""

  'src="./img/'         = 'src="/legacy/img/'
  'src="img/'           = 'src="/legacy/img/'
  "src='./img/"         = "src='/legacy/img/"
  "src='img/"           = "src='/legacy/img/"

  'src="./imgcaminho/'  = 'src="/legacy/imgcaminho/'
  'src="imgcaminho/'    = 'src="/legacy/imgcaminho/'

  'src="./hallel/'      = 'src="/legacy/hallel/'
  'src="hallel/'        = 'src="/legacy/hallel/'

  'src="./chacara/'     = 'src="/legacy/chacara/'
  'src="chacara/'       = 'src="/legacy/chacara/'

  'href="./img/'        = 'href="/legacy/img/'
  'href="img/'          = 'href="/legacy/img/'

  "url('./img/"         = "url('/legacy/img/"
  'url("./img/'         = 'url("/legacy/img/'
  'url(img/'            = 'url(/legacy/img/'

  "url('./imgcaminho/"  = "url('/legacy/imgcaminho/"
  'url("./imgcaminho/'  = 'url("/legacy/imgcaminho/'

  "url('./hallel/"      = "url('/legacy/hallel/"
  'url("./hallel/'      = 'url("/legacy/hallel/'

  "url('./chacara/"     = "url('/legacy/chacara/"
  'url("./chacara/'     = 'url("/legacy/chacara/'
}

foreach ($item in $replacements.GetEnumerator()) {
  $content = $content.Replace($item.Key, $item.Value)
}

$content = [regex]::Replace(
  $content,
  '<script\s+src=["''](?:\./)?nav\.js["'']\s*></script>',
  '<script is:inline src="/legacy/nav.js"></script>',
  [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
)

$content = $content.Replace('<script>', '<script is:inline>')

[System.IO.File]::WriteAllText(
  $targetHtml,
  $content,
  (New-Object System.Text.UTF8Encoding($false))
)

Write-Host "Migrado: $Page.html → src/pages/$Page.astro"
