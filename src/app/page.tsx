import fs from "fs";
import path from "path";
import CodeBlock from "@/components/CodeBlock";
import SetupPrompt from "@/components/SetupPrompt";
import ScrollReveal from "@/components/ScrollReveal";
import InstallerCommands from "@/components/InstallerCommands";

/* ── Build-time: read setup prompt ── */
const setupPromptText = fs.readFileSync(
  path.join(process.cwd(), "public", "setup-prompt.txt"),
  "utf-8",
);

/* ================================================================
   Beronica Quickstart Page
   ================================================================ */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] bg-grid relative overflow-hidden">
      {/* ── Ambient glow blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-600/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              B
            </div>
            <span className="font-semibold text-sm text-white">
              Beronica <span className="text-neutral-500 font-normal">Quickstart</span>
            </span>
          </a>

          {/* Step indicators */}
          <nav className="hidden sm:flex items-center gap-1">
            {[
              { n: 1, label: "Obsidian" },
              { n: 2, label: "Claudian" },
              { n: 3, label: "세팅" },
            ].map((s) => (
              <a
                key={s.n}
                href={`#step-${s.n}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04] transition-colors"
              >
                <span className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-medium">
                  {s.n}
                </span>
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 pulse-dot" />
              <span className="text-xs font-medium text-brand-300">
                5분 만에 완성
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">베로니카</span>
              <br />
              <span className="text-white">시작하기</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-xl mx-auto mb-4">
              Obsidian + AI로 만드는 <strong className="text-neutral-200">나만의 업무 비서</strong>
            </p>
            <p className="text-sm text-neutral-500 max-w-md mx-auto mb-10">
              업무를 말하면 AI가 자동으로 정리하고, 매일 아침 오늘의 할 일을 알려주고,
              사용할수록 당신을 더 잘 이해하는 시스템입니다.
            </p>

            {/* CTA */}
            <a
              href="#step-1"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              시작하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            {/* Quick stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
              {[
                { value: "3단계", label: "설치 과정" },
                { value: "~5분", label: "소요 시간" },
                { value: "무료", label: "Obsidian" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            STEPS
        ════════════════════════════════════════════════ */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto space-y-12">

            {/* ──────────────────────────────
               STEP 1: Obsidian 설치
            ────────────────────────────── */}
            <ScrollReveal>
              <div id="step-1" className="scroll-mt-20">
                <StepHeader number={1} title="Obsidian 설치" subtitle="메모와 지식을 관리할 기반 앱" />

                <div className="ml-0 sm:ml-[68px] space-y-4">
                  <div className="glass-card rounded-2xl p-6 space-y-5">
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Obsidian은 마크다운 기반 노트 앱입니다. 모든 데이터가 내 컴퓨터에 저장되어 안전합니다.
                    </p>

                    {/* Download button */}
                    <a
                      href="https://obsidian.md/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-brand-500/20 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 19h20L12 2zm0 4l7 11H5l7-11z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">
                          Obsidian 다운로드
                        </div>
                        <div className="text-xs text-neutral-500">
                          obsidian.md — Windows / Mac / Linux
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    {/* Tip */}
                    <div className="flex gap-3 p-4 rounded-xl bg-brand-500/[0.04] border border-brand-500/10">
                      <span className="text-brand-400 text-sm flex-shrink-0 mt-0.5">💡</span>
                      <div className="text-sm text-neutral-400 leading-relaxed">
                        설치 후 <strong className="text-neutral-300">&quot;Create new vault&quot;</strong>를 선택하세요.
                        <br />
                        <span className="text-neutral-500">볼트 이름은 자유롭게 지어도 됩니다. (예: 업무관리, MyWorkspace)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ──────────────────────────────
               STEP 2: 플러그인 자동 설치
            ────────────────────────────── */}
            <ScrollReveal>
              <div id="step-2" className="scroll-mt-20">
                <StepHeader number={2} title="플러그인 자동 설치" subtitle="명령어 한 줄로 필요한 플러그인을 모두 설치" />

                <div className="ml-0 sm:ml-[68px] space-y-4">
                  <div className="glass-card rounded-2xl p-6 space-y-6">
                    {/* Sub-step 2-1 */}
                    <SubStep
                      number="2-1"
                      title="커뮤니티 플러그인 활성화"
                      description="Obsidian에서 플러그인을 사용할 수 있도록 설정합니다."
                    >
                      <ol className="space-y-2 text-sm text-neutral-400">
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">1.</span>
                          Obsidian에서 <Code>설정(⚙️)</Code> → <Code>커뮤니티 플러그인</Code>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">2.</span>
                          <Code>제한 모드</Code>를 <strong className="text-neutral-200">끄기</strong>
                        </li>
                      </ol>
                    </SubStep>

                    {/* Divider */}
                    <div className="border-t border-white/[0.04]" />

                    {/* Sub-step 2-2 */}
                    <SubStep
                      number="2-2"
                      title="설치 스크립트 실행"
                      description="터미널에서 아래 명령어를 복사하여 실행하세요. Claudian 포함 5개 플러그인이 자동 설치됩니다."
                    >
                      <InstallerCommands />
                    </SubStep>

                    {/* Divider */}
                    <div className="border-t border-white/[0.04]" />

                    {/* Sub-step 2-3 */}
                    <SubStep
                      number="2-3"
                      title="Obsidian 재시작 + API 연결"
                      description="플러그인 설치 후 AI 엔진을 연결합니다."
                    >
                      <ol className="space-y-2 text-sm text-neutral-400 mb-4">
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">1.</span>
                          Obsidian을 <strong className="text-neutral-200">재시작</strong>합니다 (또는 <Code>Ctrl+R</Code>)
                        </li>
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">2.</span>
                          BRAT가 Claudian을 자동으로 설치합니다 (1~2분 대기)
                        </li>
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">3.</span>
                          <Code>설정(⚙️)</Code> → 좌측 메뉴 <Code>Claudian</Code>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">4.</span>
                          <span><strong className="text-neutral-200">API Provider</strong> 선택:</span>
                        </li>
                      </ol>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs text-brand-400 font-medium mb-2">구독형</div>
                          <div className="text-sm text-neutral-300 font-medium">Claude Pro / Max</div>
                          <div className="text-xs text-neutral-500 mt-1">Google 계정 인증 (OAuth)</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs text-blue-400 font-medium mb-2">종량제</div>
                          <div className="text-sm text-neutral-300 font-medium">Anthropic API Key</div>
                          <a
                            href="https://console.anthropic.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-500 hover:text-brand-400 transition-colors mt-1 inline-flex items-center gap-1"
                          >
                            console.anthropic.com에서 발급
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <ol start={5} className="space-y-2 text-sm text-neutral-400">
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">5.</span>
                          나머지 설정은 기본값 유지
                        </li>
                      </ol>
                    </SubStep>

                    {/* What gets installed */}
                    <div className="border-t border-white/[0.04]" />
                    <div className="space-y-3">
                      <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">자동 설치되는 플러그인</div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { name: "Claudian", desc: "AI 채팅", color: "brand" },
                          { name: "BRAT", desc: "베타 관리", color: "neutral" },
                          { name: "Templater", desc: "템플릿", color: "neutral" },
                          { name: "Dataview", desc: "데이터 쿼리", color: "neutral" },
                          { name: "Calendar", desc: "달력 뷰", color: "neutral" },
                        ].map((p) => (
                          <div
                            key={p.name}
                            className={`text-center p-2.5 rounded-lg border ${
                              p.color === "brand"
                                ? "bg-brand-500/[0.06] border-brand-500/20"
                                : "bg-white/[0.02] border-white/[0.04]"
                            }`}
                          >
                            <div className={`text-xs font-medium ${p.color === "brand" ? "text-brand-300" : "text-neutral-300"}`}>
                              {p.name}
                            </div>
                            <div className="text-[10px] text-neutral-500 mt-0.5">{p.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ──────────────────────────────
               STEP 3: 세팅 프롬프트
            ────────────────────────────── */}
            <ScrollReveal>
              <div id="step-3" className="scroll-mt-20">
                <StepHeader
                  number={3}
                  title="베로니카 원클릭 세팅"
                  subtitle="프롬프트 하나로 전체 시스템 자동 구축"
                  highlight
                />

                <div className="ml-0 sm:ml-[68px] space-y-4">
                  <div className="glass-card rounded-2xl p-6 space-y-5">
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Obsidian 좌측 사이드바에서 <strong className="text-white">Claudian 채팅창</strong>을 열고,
                      아래 프롬프트를 복사해서 붙여넣으세요. AI가 자동으로 모든 세팅을 진행합니다.
                    </p>

                    {/* How it works - 3 mini steps */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {[
                        { step: "복사", icon: "📋", desc: "아래 버튼 클릭" },
                        { step: "붙여넣기", icon: "📝", desc: "Claudian 채팅창" },
                        { step: "대화", icon: "💬", desc: "AI 질문에 답변" },
                      ].map((item, i) => (
                        <div key={item.step} className="flex-1 flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
                          <span className="text-lg">{item.icon}</span>
                          <div>
                            <div className="text-xs font-medium text-neutral-300">{item.step}</div>
                            <div className="text-[11px] text-neutral-500">{item.desc}</div>
                          </div>
                          {i < 2 && (
                            <svg className="w-3 h-3 text-neutral-700 ml-auto hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Setup Prompt Component */}
                    <SetupPrompt text={setupPromptText} />

                    {/* Time estimate */}
                    <div className="flex gap-3 p-4 rounded-xl bg-blue-500/[0.04] border border-blue-500/10">
                      <span className="text-blue-400 text-sm flex-shrink-0 mt-0.5">⏱️</span>
                      <div className="text-sm text-neutral-400 leading-relaxed">
                        AI가 13개 질문을 순서대로 물어봅니다. <strong className="text-neutral-300">약 10~15분</strong>이면 완료됩니다.
                        <br />
                        <span className="text-neutral-500">답변하면 프로필, 업무 정보, 선호도가 자동으로 기록됩니다.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            COMPLETION
        ════════════════════════════════════════════════ */}
        <ScrollReveal>
          <section id="done" className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6 animate-float">
                  <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">완료!</h2>
                <p className="text-neutral-400 text-lg">
                  베로니카가 세팅되었습니다. 이제 이렇게 말해보세요.
                </p>
              </div>

              {/* Try these */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  {
                    prompt: "오늘 할일 알려줘",
                    desc: "오늘의 TOP3 할일을 제안하고 데일리 노트를 만들어줍니다.",
                    icon: "☀️",
                  },
                  {
                    prompt: "다음 주까지 분기 보고서 작성해야 해",
                    desc: "자동으로 인박스에 캡처하고 분류를 제안합니다.",
                    icon: "📥",
                  },
                  {
                    prompt: "주간 리뷰",
                    desc: "한 주를 돌아보고 시스템 전체를 점검합니다.",
                    icon: "📊",
                  },
                  {
                    prompt: "내가 누구인지 알아?",
                    desc: "AI가 당신의 프로필을 정확히 인식하는지 확인합니다.",
                    icon: "👤",
                  },
                ].map((item) => (
                  <div
                    key={item.prompt}
                    className="glass-card rounded-xl p-5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-white mb-1">
                          &quot;{item.prompt}&quot;
                        </div>
                        <div className="text-xs text-neutral-500 leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ════════════════════════════════════════════════
            DAILY PATTERN
        ════════════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-white text-center mb-8">
                매일 이렇게 사용합니다
              </h3>

              <div className="space-y-3">
                {[
                  { time: "아침", emoji: "☀️", action: "Claudian 열기", ai: "자동으로 오늘 할일 TOP3 제안 + 데일리 노트 생성" },
                  { time: "업무 중", emoji: "💼", action: "\"~해야 해\" 라고 말하기", ai: "인박스에 자동 캡처 → 분류 제안" },
                  { time: "월요일", emoji: "📅", action: "세션 시작", ai: "이번 주 루틴 업무 자동 안내" },
                  { time: "주말", emoji: "📝", action: "\"주간 리뷰\" 요청", ai: "한 주 돌아보기 + 다음 주 준비" },
                ].map((item) => (
                  <div
                    key={item.time}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-brand-500/10 transition-colors"
                  >
                    <span className="text-xl w-8 text-center flex-shrink-0">{item.emoji}</span>
                    <div className="flex-shrink-0 w-16">
                      <span className="text-xs font-medium text-brand-400">{item.time}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-neutral-300">{item.action}</span>
                      <span className="text-neutral-600 mx-2">→</span>
                      <span className="text-xs text-neutral-500">{item.ai}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ════════════════════════════════════════════════
            FAQ
        ════════════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white text-center mb-8">
                자주 묻는 질문
              </h3>

              <div className="space-y-4">
                {[
                  {
                    q: "개발자가 아니어도 사용할 수 있나요?",
                    a: "네. 마크다운 텍스트 파일 기반이므로 코딩 지식이 전혀 없어도 됩니다. AI가 모든 세팅을 자동으로 해줍니다.",
                  },
                  {
                    q: "모든 파일을 다 채워야 하나요?",
                    a: "아닙니다. 세팅 프롬프트에서 AI가 물어보는 질문에 답변하면 핵심 파일이 자동 완성됩니다. 나머지는 사용하면서 자연스럽게 채워집니다.",
                  },
                  {
                    q: "비용이 얼마나 드나요?",
                    a: "Obsidian은 무료입니다. AI 기능을 위해 Claude Pro 구독(월 $20) 또는 Anthropic API Key(종량제)가 필요합니다.",
                  },
                  {
                    q: "내 데이터는 안전한가요?",
                    a: "Obsidian의 모든 데이터는 내 컴퓨터 로컬에 저장됩니다. 클라우드 서버에 업로드되지 않습니다. AI 대화만 Anthropic 서버를 거칩니다.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-sm font-medium text-white mb-2">{faq.q}</div>
                    <div className="text-sm text-neutral-500 leading-relaxed">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04] py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-600">
            Beronica by POPUP STUDIO
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-600">
            <a
              href="https://obsidian.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              Obsidian
            </a>
            <a
              href="https://github.com/YishenTu/claudian"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              Claudian
            </a>
            <a
              href="https://anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              Anthropic
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Sub-components
   ════════════════════════════════════════════════ */

function StepHeader({
  number,
  title,
  subtitle,
  highlight = false,
}: {
  number: number;
  title: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-5 mb-5">
      {/* Step number circle */}
      <div
        className={`
          flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
          text-lg font-bold transition-all duration-300
          ${highlight
            ? "bg-gradient-to-br from-brand-500 to-blue-500 text-white shadow-lg shadow-brand-500/30 animate-glow"
            : "bg-white/[0.04] border border-white/[0.08] text-neutral-400"
          }
        `}
      >
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function SubStep({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
          Step {number}
        </span>
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <p className="text-xs text-neutral-500 mb-3">{description}</p>
      {children}
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-300 text-xs font-mono">
      {children}
    </code>
  );
}
