#Requires -Version 5.1
<#
.SYNOPSIS
  Beronica - Obsidian Plugin Installer (Windows)
.DESCRIPTION
  Obsidian vault에 Beronica에 필요한 플러그인을 자동 설치합니다.
  - BRAT (베타 플러그인 관리)
  - Claudian (AI 채팅 플러그인, BRAT 경유 자동 업데이트)
  - Templater (노트 템플릿)
  - Dataview (노트 쿼리)
  - Calendar (달력 뷰)
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── 색상 헬퍼 ──
function Write-Step  ($msg) { Write-Host "`n  [*] $msg" -ForegroundColor Cyan }
function Write-Ok    ($msg) { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn  ($msg) { Write-Host "  [!] $msg" -ForegroundColor Yellow }
function Write-Err   ($msg) { Write-Host "  [X] $msg" -ForegroundColor Red }

# ── 배너 ──
Write-Host ""
Write-Host "  ==========================================" -ForegroundColor Magenta
Write-Host "    Beronica - Obsidian Plugin Installer" -ForegroundColor White
Write-Host "  ==========================================" -ForegroundColor Magenta
Write-Host ""

# ── 플러그인 정의 ──
$plugins = @(
    @{ id = "obsidian42-brat";          repo = "TfTHacker/obsidian42-brat" }
    @{ id = "templater-obsidian";       repo = "SilentVoid13/Templater" }
    @{ id = "dataview";                 repo = "blacksmithgu/obsidian-dataview" }
    @{ id = "calendar";                 repo = "liamcain/obsidian-calendar-plugin" }
)

# Claudian은 BRAT 경유 설치 (비공식 플러그인)
$bratPluginList = @("YishenTu/claudian")

# ── 볼트 자동 감지 ──
function Find-ObsidianVaults {
    $configPath = Join-Path $env:APPDATA "obsidian\obsidian.json"
    if (-not (Test-Path $configPath)) { return @() }

    $config = Get-Content $configPath -Raw | ConvertFrom-Json
    $vaults = @()

    foreach ($prop in $config.vaults.PSObject.Properties) {
        $vaultPath = $prop.Value.path
        if (Test-Path $vaultPath) {
            $vaults += $vaultPath
        }
    }
    return $vaults
}

# ── 볼트 경로 선택 ──
function Select-VaultPath {
    $vaults = Find-ObsidianVaults

    if ($vaults.Count -eq 0) {
        Write-Warn "Obsidian 볼트를 자동으로 찾지 못했습니다."
        $inputPath = Read-Host "  볼트 경로를 직접 입력하세요"
        return $inputPath.Trim('"').Trim("'")
    }

    Write-Host "  감지된 Obsidian 볼트:" -ForegroundColor White
    for ($i = 0; $i -lt $vaults.Count; $i++) {
        Write-Host "    [$($i + 1)] $($vaults[$i])" -ForegroundColor Gray
    }
    Write-Host "    [0] 직접 입력" -ForegroundColor Gray
    Write-Host ""

    $choice = Read-Host "  번호를 선택하세요"

    if ($choice -eq "0") {
        $inputPath = Read-Host "  볼트 경로를 입력하세요"
        return $inputPath.Trim('"').Trim("'")
    }

    $idx = [int]$choice - 1
    if ($idx -ge 0 -and $idx -lt $vaults.Count) {
        return $vaults[$idx]
    }

    Write-Err "잘못된 선택입니다."
    exit 1
}

# ── GitHub Release에서 플러그인 다운로드 ──
function Install-Plugin {
    param (
        [string]$PluginId,
        [string]$Repo,
        [string]$PluginsDir
    )

    $targetDir = Join-Path $PluginsDir $PluginId

    if (Test-Path (Join-Path $targetDir "main.js")) {
        Write-Ok "$PluginId (이미 설치됨, 건너뜀)"
        return
    }

    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null

    $baseUrl = "https://github.com/$Repo/releases/latest/download"
    $files = @("main.js", "manifest.json", "styles.css")

    foreach ($file in $files) {
        $url = "$baseUrl/$file"
        $dest = Join-Path $targetDir $file

        try {
            Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -ErrorAction Stop 2>$null
        }
        catch {
            # styles.css는 없을 수 있음
            if ($file -ne "styles.css") {
                Write-Err "$PluginId/$file 다운로드 실패: $_"
                return
            }
        }
    }

    Write-Ok "$PluginId"
}

# ── BRAT 설정 (Claudian 자동 설치 등록) ──
function Set-BratConfig {
    param (
        [string]$PluginsDir,
        [string[]]$RepoList
    )

    $bratDir = Join-Path $PluginsDir "obsidian42-brat"
    $dataFile = Join-Path $bratDir "data.json"

    $config = @{
        pluginList                  = $RepoList
        pluginSubListFrozenVersion  = @()
        themesList                  = @()
        updateAtStartup             = $true
        updateThemesAtStartup       = $false
        ribbonIconEnabled           = $true
        loggingEnabled              = $false
    }

    # 기존 설정이 있으면 pluginList만 병합
    if (Test-Path $dataFile) {
        try {
            $existing = Get-Content $dataFile -Raw | ConvertFrom-Json
            $existingList = @($existing.pluginList)
            foreach ($repo in $RepoList) {
                if ($existingList -notcontains $repo) {
                    $existingList += $repo
                }
            }
            $existing.pluginList = $existingList
            $existing.updateAtStartup = $true
            $existing | ConvertTo-Json -Depth 10 | Set-Content $dataFile -Encoding UTF8
            return
        }
        catch { }
    }

    $config | ConvertTo-Json -Depth 10 | Set-Content $dataFile -Encoding UTF8
}

# ── community-plugins.json 업데이트 ──
function Update-CommunityPlugins {
    param (
        [string]$ObsidianDir,
        [string[]]$PluginIds
    )

    $filePath = Join-Path $ObsidianDir "community-plugins.json"
    $existing = @()

    if (Test-Path $filePath) {
        try {
            $existing = @(Get-Content $filePath -Raw | ConvertFrom-Json)
        }
        catch { $existing = @() }
    }

    foreach ($id in $PluginIds) {
        if ($existing -notcontains $id) {
            $existing += $id
        }
    }

    ConvertTo-Json $existing | Set-Content $filePath -Encoding UTF8
}

# ════════════════════════════════════════
#  메인 실행
# ════════════════════════════════════════

$vaultPath = Select-VaultPath

if (-not (Test-Path $vaultPath)) {
    Write-Err "경로가 존재하지 않습니다: $vaultPath"
    exit 1
}

$obsidianDir = Join-Path $vaultPath ".obsidian"
$pluginsDir  = Join-Path $obsidianDir "plugins"

# .obsidian 폴더 생성 (새 볼트일 경우)
New-Item -ItemType Directory -Path $pluginsDir -Force | Out-Null

Write-Step "플러그인 다운로드 중..."

foreach ($p in $plugins) {
    Install-Plugin -PluginId $p.id -Repo $p.repo -PluginsDir $pluginsDir
}

Write-Step "BRAT 설정 (Claudian 자동 업데이트 등록)..."
Set-BratConfig -PluginsDir $pluginsDir -RepoList $bratPluginList
Write-Ok "BRAT -> Claudian (YishenTu/claudian) 등록 완료"

Write-Step "플러그인 활성화 등록..."
$allIds = $plugins | ForEach-Object { $_.id }
Update-CommunityPlugins -ObsidianDir $obsidianDir -PluginIds $allIds
Write-Ok "community-plugins.json 업데이트 완료"

# ── 완료 ──
Write-Host ""
Write-Host "  ==========================================" -ForegroundColor Green
Write-Host "    설치 완료!" -ForegroundColor White
Write-Host "  ==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  다음 단계:" -ForegroundColor White
Write-Host "    1. Obsidian을 재시작하세요 (또는 Ctrl+R)" -ForegroundColor Gray
Write-Host ("    2. 설정 -> 커뮤니티 플러그인 -> '제한 모드' 끄기") -ForegroundColor Gray
Write-Host ("    3. BRAT가 Claudian을 자동으로 설치합니다 (1~2분)") -ForegroundColor Gray
Write-Host ("    4. 설정 -> Claudian -> API 키 입력") -ForegroundColor Gray
Write-Host "    5. Claudian 채팅창에서 세팅 프롬프트를 실행하세요!" -ForegroundColor Gray
Write-Host ""

Read-Host ("  아무 키나 누르면 종료합니다")
