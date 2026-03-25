export type Locale = "ko" | "en";

export const locales: Locale[] = ["ko", "en"];
export const defaultLocale: Locale = "ko";

export type Dictionary = typeof ko;

const ko = {
  meta: {
    title: "베로니카 시작하기 | Beronica Quickstart",
    description: "Obsidian + AI로 만드는 나만의 업무 비서, 5분 만에 세팅하세요.",
  },
  header: {
    brand: "Beronica",
    sub: "Quickstart",
    steps: [
      { n: 1, label: "Obsidian" },
      { n: 2, label: "Claudian" },
      { n: 3, label: "세팅" },
    ],
  },
  hero: {
    badge: "5분 만에 완성",
    title1: "베로니카",
    title2: "시작하기",
    subtitle: "Obsidian + AI로 만드는",
    subtitleBold: "나만의 업무 비서",
    desc: "업무를 말하면 AI가 자동으로 정리하고, 매일 아침 오늘의 할 일을 알려주고, 사용할수록 당신을 더 잘 이해하는 시스템입니다.",
    cta: "시작하기",
    stats: [
      { value: "3단계", label: "설치 과정" },
      { value: "~5분", label: "소요 시간" },
      { value: "무료", label: "Obsidian" },
    ],
  },
  step1: {
    title: "Obsidian 설치",
    subtitle: "메모와 지식을 관리할 기반 앱",
    desc: "Obsidian은 마크다운 기반 노트 앱입니다. 모든 데이터가 내 컴퓨터에 저장되어 안전합니다.",
    download: "Obsidian 다운로드",
    downloadSub: "obsidian.md — Windows / Mac / Linux",
    tipTitle: "Create new vault",
    tipDesc: "볼트 이름은 자유롭게 지어도 됩니다. (예: 업무관리, MyWorkspace)",
    tipPrefix: "설치 후",
    tipSuffix: "를 선택하세요.",
    vaultTitle: "vault(볼트)",
    vaultDesc: "는 옵시디언에서 작업하는 공간(폴더)을 의미합니다. 옵시디언은 이 폴더 안의 문서를 읽고 수정하고 생성합니다.",
    vaultSub: "볼트를 새로 만들어도 되지만, 여러분이 작업하신 문서가 저장되어 있는 곳을 볼트로 사용하셔도 됩니다.",
  },
  step2: {
    title: "플러그인 자동 설치",
    subtitle: "명령어 한 줄로 필요한 플러그인을 모두 설치",
    sub1: {
      title: "커뮤니티 플러그인 활성화",
      desc: "Obsidian에서 플러그인을 사용할 수 있도록 설정합니다.",
      step1: ["Obsidian에서", "설정(⚙️)", "커뮤니티 플러그인"],
      step2label: "보호 모드",
      step2action: "비활성화",
    },
    sub2: {
      title: "설치 스크립트 실행",
      desc: "터미널에서 아래 명령어를 복사하여 실행하세요. Claudian 포함 5개 플러그인이 자동 설치됩니다.",
    },
    sub3: {
      title: "Obsidian 재시작 + API 연결",
      desc: "플러그인 설치 후 AI 엔진을 연결합니다.",
      steps: [
        { text: "Obsidian을", bold: "재시작", suffix: "합니다 (또는 Ctrl+R)" },
        { text: "BRAT가 Claudian을 자동으로 설치합니다 (1~2분 대기)" },
        { text: "", code1: "설정(⚙️)", arrow: true, code2: "Claudian" },
        { text: "", bold: "API Provider", suffix: " 선택:" },
      ],
      subscription: "구독형",
      subscriptionName: "Claude Pro / Max",
      subscriptionDesc: "Google 계정 인증 (OAuth)",
      payAsYouGo: "종량제",
      payAsYouGoName: "Anthropic API Key",
      payAsYouGoDesc: "console.anthropic.com에서 발급",
      step5: "나머지 설정은 기본값 유지",
    },
    plugins: {
      title: "자동 설치되는 플러그인",
      list: [
        { name: "Claudian", desc: "AI 채팅" },
        { name: "BRAT", desc: "베타 관리" },
        { name: "Templater", desc: "템플릿" },
        { name: "Dataview", desc: "데이터 쿼리" },
        { name: "Calendar", desc: "달력 뷰" },
      ],
    },
  },
  step3: {
    title: "베로니카 원클릭 세팅",
    subtitle: "프롬프트 하나로 전체 시스템 자동 구축",
    desc: "Obsidian 좌측 사이드바에서",
    descBold: "Claudian 채팅창",
    descSuffix: "을 열고, 아래 프롬프트를 복사해서 붙여넣으세요. AI가 자동으로 모든 세팅을 진행합니다.",
    miniSteps: [
      { step: "복사", icon: "📋", desc: "아래 버튼 클릭" },
      { step: "붙여넣기", icon: "📝", desc: "Claudian 채팅창" },
      { step: "대화", icon: "💬", desc: "AI 질문에 답변" },
    ],
    timeIcon: "⏱️",
    timeText: "AI가 13개 질문을 순서대로 물어봅니다.",
    timeBold: "약 10~15분",
    timeSuffix: "이면 완료됩니다.",
    timeSub: "답변하면 프로필, 업무 정보, 선호도가 자동으로 기록됩니다.",
  },
  setupPrompt: {
    title: "AI 세팅 프롬프트",
    desc: "아래 버튼을 누르면 세팅 프롬프트가 복사됩니다.",
    descPaste: "붙여넣기(Ctrl+V)",
    descSend: "전송",
    descSuffix: "하면 끝!",
    copyBtn: "세팅 프롬프트 복사하기",
    copied: "클립보드에 복사되었습니다!",
    features: [
      { icon: "📁", label: "GTD+PARA 폴더 생성" },
      { icon: "🧠", label: "AI 컨텍스트 세팅" },
      { icon: "👤", label: "프로필 자동 완성" },
      { icon: "✅", label: "시스템 검증" },
    ],
    expand: "프롬프트 내용 보기",
    collapse: "프롬프트 내용 접기",
    lines: "줄 중 일부만 표시",
  },
  completion: {
    title: "완료!",
    desc: "베로니카가 세팅되었습니다. 이제 이렇게 말해보세요.",
    examples: [
      { prompt: "오늘 할일 알려줘", desc: "오늘의 TOP3 할일을 제안하고 데일리 노트를 만들어줍니다.", icon: "☀️" },
      { prompt: "다음 주까지 분기 보고서 작성해야 해", desc: "자동으로 인박스에 캡처하고 분류를 제안합니다.", icon: "📥" },
      { prompt: "주간 리뷰", desc: "한 주를 돌아보고 시스템 전체를 점검합니다.", icon: "📊" },
      { prompt: "내가 누구인지 알아?", desc: "AI가 당신의 프로필을 정확히 인식하는지 확인합니다.", icon: "👤" },
    ],
  },
  daily: {
    title: "매일 이렇게 사용합니다",
    items: [
      { time: "아침", emoji: "☀️", action: "Claudian 열기", ai: "자동으로 오늘 할일 TOP3 제안 + 데일리 노트 생성" },
      { time: "업무 중", emoji: "💼", action: "\"~해야 해\" 라고 말하기", ai: "인박스에 자동 캡처 → 분류 제안" },
      { time: "월요일", emoji: "📅", action: "세션 시작", ai: "이번 주 루틴 업무 자동 안내" },
      { time: "주말", emoji: "📝", action: "\"주간 리뷰\" 요청", ai: "한 주 돌아보기 + 다음 주 준비" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      { q: "개발자가 아니어도 사용할 수 있나요?", a: "네. 마크다운 텍스트 파일 기반이므로 코딩 지식이 전혀 없어도 됩니다. AI가 모든 세팅을 자동으로 해줍니다." },
      { q: "모든 파일을 다 채워야 하나요?", a: "아닙니다. 세팅 프롬프트에서 AI가 물어보는 질문에 답변하면 핵심 파일이 자동 완성됩니다. 나머지는 사용하면서 자연스럽게 채워집니다." },
      { q: "비용이 얼마나 드나요?", a: "Obsidian은 무료입니다. AI 기능을 위해 Claude Pro 구독(월 $20) 또는 Anthropic API Key(종량제)가 필요합니다." },
      { q: "내 데이터는 안전한가요?", a: "Obsidian의 모든 데이터는 내 컴퓨터 로컬에 저장됩니다. 클라우드 서버에 업로드되지 않습니다. AI 대화만 Anthropic 서버를 거칩니다." },
    ],
  },
  installer: {
    windows: "Windows",
    mac: "Mac / Linux",
    copy: "복사",
    copyDone: "복사 완료!",
    terminalTip: "터미널 여는 법:",
    winTip: "입력 → Enter",
    macTip: "검색 → Enter",
  },
  footer: {
    brand: "Beronica by POPUP STUDIO",
  },
};

const en: Dictionary = {
  meta: {
    title: "Get Started with Beronica | Quickstart",
    description: "Build your personal AI work assistant with Obsidian + AI. Set up in 5 minutes.",
  },
  header: {
    brand: "Beronica",
    sub: "Quickstart",
    steps: [
      { n: 1, label: "Obsidian" },
      { n: 2, label: "Claudian" },
      { n: 3, label: "Setup" },
    ],
  },
  hero: {
    badge: "Ready in 5 min",
    title1: "Beronica",
    title2: "Quickstart",
    subtitle: "Your personal AI assistant built on",
    subtitleBold: "Obsidian + Claude",
    desc: "Tell it your tasks and AI organizes them automatically. Every morning, it suggests your top priorities. The more you use it, the better it understands you.",
    cta: "Get Started",
    stats: [
      { value: "3 Steps", label: "Setup process" },
      { value: "~5 min", label: "Time needed" },
      { value: "Free", label: "Obsidian" },
    ],
  },
  step1: {
    title: "Install Obsidian",
    subtitle: "The foundation app for notes & knowledge",
    desc: "Obsidian is a markdown-based note-taking app. All data is stored locally on your computer for complete privacy.",
    download: "Download Obsidian",
    downloadSub: "obsidian.md — Windows / Mac / Linux",
    tipTitle: "Create new vault",
    tipDesc: "You can name your vault anything. (e.g., Work, MyWorkspace)",
    tipPrefix: "After installation, select",
    tipSuffix: ".",
    vaultTitle: "Vault",
    vaultDesc: " is a workspace (folder) in Obsidian. Obsidian reads, edits, and creates documents within this folder.",
    vaultSub: "You can create a new vault or use an existing folder where your documents are already stored.",
  },
  step2: {
    title: "Auto-install Plugins",
    subtitle: "Install all required plugins with a single command",
    sub1: {
      title: "Enable Community Plugins",
      desc: "Allow Obsidian to use third-party plugins.",
      step1: ["In Obsidian,", "Settings (⚙️)", "Community Plugins"],
      step2label: "Restricted Mode",
      step2action: "Turn off",
    },
    sub2: {
      title: "Run Install Script",
      desc: "Copy and run the command below in your terminal. 5 plugins including Claudian will be installed automatically.",
    },
    sub3: {
      title: "Restart Obsidian + Connect API",
      desc: "Connect the AI engine after plugin installation.",
      steps: [
        { text: "", bold: "Restart", suffix: " Obsidian (or press Ctrl+R)" },
        { text: "BRAT will auto-install Claudian (wait 1-2 minutes)" },
        { text: "", code1: "Settings (⚙️)", arrow: true, code2: "Claudian" },
        { text: "Select", bold: "API Provider", suffix: ":" },
      ],
      subscription: "Subscription",
      subscriptionName: "Claude Pro / Max",
      subscriptionDesc: "Google account auth (OAuth)",
      payAsYouGo: "Pay-as-you-go",
      payAsYouGoName: "Anthropic API Key",
      payAsYouGoDesc: "Get one at console.anthropic.com",
      step5: "Keep remaining settings at default",
    },
    plugins: {
      title: "Auto-installed Plugins",
      list: [
        { name: "Claudian", desc: "AI Chat" },
        { name: "BRAT", desc: "Beta Manager" },
        { name: "Templater", desc: "Templates" },
        { name: "Dataview", desc: "Data Queries" },
        { name: "Calendar", desc: "Calendar View" },
      ],
    },
  },
  step3: {
    title: "One-click Beronica Setup",
    subtitle: "Build the entire system with a single prompt",
    desc: "Open the",
    descBold: "Claudian chat panel",
    descSuffix: " in Obsidian's left sidebar, then paste the prompt below. AI will set up everything automatically.",
    miniSteps: [
      { step: "Copy", icon: "📋", desc: "Click button below" },
      { step: "Paste", icon: "📝", desc: "Claudian chat panel" },
      { step: "Chat", icon: "💬", desc: "Answer AI questions" },
    ],
    timeIcon: "⏱️",
    timeText: "AI will ask 13 questions in order.",
    timeBold: "About 10-15 minutes",
    timeSuffix: " to complete.",
    timeSub: "Your profile, work info, and preferences will be recorded automatically.",
  },
  setupPrompt: {
    title: "AI Setup Prompt",
    desc: "Click the button below to copy the setup prompt.",
    descPaste: "Paste (Ctrl+V)",
    descSend: "Send",
    descSuffix: " — that's it!",
    copyBtn: "Copy Setup Prompt",
    copied: "Copied to clipboard!",
    features: [
      { icon: "📁", label: "GTD+PARA folders" },
      { icon: "🧠", label: "AI context setup" },
      { icon: "👤", label: "Profile auto-fill" },
      { icon: "✅", label: "System verification" },
    ],
    expand: "View prompt content",
    collapse: "Hide prompt content",
    lines: "lines, showing partial",
  },
  completion: {
    title: "All Done!",
    desc: "Beronica is set up. Try saying these:",
    examples: [
      { prompt: "What should I do today?", desc: "Suggests your TOP3 tasks and creates a daily note.", icon: "☀️" },
      { prompt: "I need to write a report by next week", desc: "Auto-captures to inbox and suggests categorization.", icon: "📥" },
      { prompt: "Weekly review", desc: "Review the past week and check the entire system.", icon: "📊" },
      { prompt: "Do you know who I am?", desc: "Verify that AI correctly recognizes your profile.", icon: "👤" },
    ],
  },
  daily: {
    title: "How to use it daily",
    items: [
      { time: "Morning", emoji: "☀️", action: "Open Claudian", ai: "Auto-suggests TOP3 tasks + creates daily note" },
      { time: "During work", emoji: "💼", action: "Say \"I need to...\"", ai: "Auto-captures to inbox → suggests categorization" },
      { time: "Monday", emoji: "📅", action: "Start session", ai: "Auto-guides weekly routine tasks" },
      { time: "Weekend", emoji: "📝", action: "Request \"Weekly review\"", ai: "Review the week + prepare for next" },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      { q: "Do I need to be a developer?", a: "No. It's based on plain markdown text files, so no coding knowledge is required. AI handles all the setup automatically." },
      { q: "Do I need to fill in every file?", a: "No. The setup prompt will ask you questions and auto-fill the core files. The rest fills in naturally as you use the system." },
      { q: "How much does it cost?", a: "Obsidian is free. For AI features, you need a Claude Pro subscription ($20/month) or an Anthropic API Key (pay-as-you-go)." },
      { q: "Is my data safe?", a: "All Obsidian data is stored locally on your computer. Nothing is uploaded to cloud servers. Only AI conversations go through Anthropic's servers." },
    ],
  },
  installer: {
    windows: "Windows",
    mac: "Mac / Linux",
    copy: "Copy",
    copyDone: "Copied!",
    terminalTip: "How to open terminal:",
    winTip: "type → Enter",
    macTip: "search → Enter",
  },
  footer: {
    brand: "Beronica by POPUP STUDIO",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ko, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ko;
}
