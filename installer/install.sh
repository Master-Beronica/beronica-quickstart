#!/usr/bin/env bash
# ──────────────────────────────────────────────
#  Beronica - Obsidian Plugin Installer (Mac/Linux)
#
#  Obsidian vault에 Beronica에 필요한 플러그인을 자동 설치합니다.
#  - BRAT (베타 플러그인 관리)
#  - Claudian (AI 채팅 플러그인, BRAT 경유 자동 업데이트)
#  - Templater (노트 템플릿)
#  - Dataview (노트 쿼리)
#  - Calendar (달력 뷰)
# ──────────────────────────────────────────────

set -euo pipefail

# ── 색상 ──
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
MAGENTA='\033[0;35m'
WHITE='\033[1;37m'
GRAY='\033[0;37m'
NC='\033[0m'

step()  { echo -e "\n  ${CYAN}[*]${NC} $1"; }
ok()    { echo -e "  ${GREEN}[OK]${NC} $1"; }
warn()  { echo -e "  ${YELLOW}[!]${NC} $1"; }
err()   { echo -e "  ${RED}[X]${NC} $1"; }

# ── 배너 ──
echo ""
echo -e "  ${MAGENTA}==========================================${NC}"
echo -e "  ${WHITE}  Beronica - Obsidian Plugin Installer${NC}"
echo -e "  ${MAGENTA}==========================================${NC}"
echo ""

# ── 플러그인 정의 ──
# id:repo 형식
PLUGINS=(
    "obsidian42-brat:TfTHacker/obsidian42-brat"
    "templater-obsidian:SilentVoid13/Templater"
    "dataview:blacksmithgu/obsidian-dataview"
    "calendar:liamcain/obsidian-calendar-plugin"
)

BRAT_PLUGIN_LIST='["YishenTu/claudian"]'

# ── 볼트 자동 감지 ──
find_vaults() {
    local config_path=""

    if [[ "$OSTYPE" == "darwin"* ]]; then
        config_path="$HOME/Library/Application Support/obsidian/obsidian.json"
    else
        config_path="$HOME/.config/obsidian/obsidian.json"
    fi

    if [[ ! -f "$config_path" ]]; then
        return
    fi

    # jq가 있으면 사용, 없으면 grep으로 대체
    if command -v jq &>/dev/null; then
        jq -r '.vaults | to_entries[] | .value.path' "$config_path" 2>/dev/null
    else
        grep -oP '"path"\s*:\s*"\K[^"]+' "$config_path" 2>/dev/null || true
    fi
}

# ── 볼트 경로 선택 ──
select_vault() {
    local vaults=()

    while IFS= read -r line; do
        [[ -d "$line" ]] && vaults+=("$line")
    done < <(find_vaults)

    if [[ ${#vaults[@]} -eq 0 ]]; then
        warn "Obsidian 볼트를 자동으로 찾지 못했습니다."
        read -rp "  볼트 경로를 직접 입력하세요: " vault_path
        echo "$vault_path"
        return
    fi

    echo -e "  ${WHITE}감지된 Obsidian 볼트:${NC}"
    for i in "${!vaults[@]}"; do
        echo -e "    ${GRAY}[$((i + 1))] ${vaults[$i]}${NC}"
    done
    echo -e "    ${GRAY}[0] 직접 입력${NC}"
    echo ""

    read -rp "  번호를 선택하세요: " choice

    if [[ "$choice" == "0" ]]; then
        read -rp "  볼트 경로를 입력하세요: " vault_path
        echo "$vault_path"
        return
    fi

    local idx=$((choice - 1))
    if [[ $idx -ge 0 && $idx -lt ${#vaults[@]} ]]; then
        echo "${vaults[$idx]}"
        return
    fi

    err "잘못된 선택입니다."
    exit 1
}

# ── GitHub Release에서 플러그인 다운로드 ──
install_plugin() {
    local plugin_id="$1"
    local repo="$2"
    local plugins_dir="$3"
    local target_dir="$plugins_dir/$plugin_id"

    if [[ -f "$target_dir/main.js" ]]; then
        ok "$plugin_id (이미 설치됨, 건너뜀)"
        return
    fi

    mkdir -p "$target_dir"

    local base_url="https://github.com/$repo/releases/latest/download"

    for file in main.js manifest.json styles.css; do
        local url="$base_url/$file"
        local dest="$target_dir/$file"

        if curl -fsSL "$url" -o "$dest" 2>/dev/null; then
            :
        elif [[ "$file" != "styles.css" ]]; then
            err "$plugin_id/$file 다운로드 실패"
            return 1
        fi
    done

    ok "$plugin_id"
}

# ── BRAT 설정 ──
configure_brat() {
    local plugins_dir="$1"
    local data_file="$plugins_dir/obsidian42-brat/data.json"

    cat > "$data_file" << 'BRATEOF'
{
  "pluginList": ["YishenTu/claudian"],
  "pluginSubListFrozenVersion": [],
  "themesList": [],
  "updateAtStartup": true,
  "updateThemesAtStartup": false,
  "ribbonIconEnabled": true,
  "loggingEnabled": false
}
BRATEOF
}

# ── community-plugins.json 업데이트 ──
update_community_plugins() {
    local obsidian_dir="$1"
    shift
    local plugin_ids=("$@")
    local file_path="$obsidian_dir/community-plugins.json"

    # JSON 배열 생성
    local json="["
    local first=true
    for id in "${plugin_ids[@]}"; do
        if $first; then
            first=false
        else
            json+=","
        fi
        json+="\"$id\""
    done
    json+="]"

    echo "$json" > "$file_path"
}

# ════════════════════════════════════════
#  메인 실행
# ════════════════════════════════════════

VAULT_PATH=$(select_vault)

if [[ ! -d "$VAULT_PATH" ]]; then
    err "경로가 존재하지 않습니다: $VAULT_PATH"
    exit 1
fi

OBSIDIAN_DIR="$VAULT_PATH/.obsidian"
PLUGINS_DIR="$OBSIDIAN_DIR/plugins"

mkdir -p "$PLUGINS_DIR"

step "플러그인 다운로드 중..."

for entry in "${PLUGINS[@]}"; do
    plugin_id="${entry%%:*}"
    repo="${entry##*:}"
    install_plugin "$plugin_id" "$repo" "$PLUGINS_DIR"
done

step "BRAT 설정 (Claudian 자동 업데이트 등록)..."
configure_brat "$PLUGINS_DIR"
ok "BRAT -> Claudian (YishenTu/claudian) 등록 완료"

step "플러그인 활성화 등록..."
all_ids=()
for entry in "${PLUGINS[@]}"; do
    all_ids+=("${entry%%:*}")
done
update_community_plugins "$OBSIDIAN_DIR" "${all_ids[@]}"
ok "community-plugins.json 업데이트 완료"

# ── 완료 ──
echo ""
echo -e "  ${GREEN}==========================================${NC}"
echo -e "  ${WHITE}  설치 완료!${NC}"
echo -e "  ${GREEN}==========================================${NC}"
echo ""
echo -e "  ${WHITE}다음 단계:${NC}"
echo -e "    ${GRAY}1. Obsidian을 재시작하세요${NC}"
echo -e "    ${GRAY}2. 설정 > 커뮤니티 플러그인 > '제한 모드' 끄기${NC}"
echo -e "    ${GRAY}3. BRAT가 Claudian을 자동으로 설치합니다 (1~2분)${NC}"
echo -e "    ${GRAY}4. 설정 > Claudian > API 키 입력${NC}"
echo -e "    ${GRAY}5. Claudian 채팅창에서 세팅 프롬프트를 실행하세요!${NC}"
echo ""
