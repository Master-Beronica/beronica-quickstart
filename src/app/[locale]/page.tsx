import SetupPrompt from "@/components/SetupPrompt";
import ScrollReveal from "@/components/ScrollReveal";
import InstallerCommands from "@/components/InstallerCommands";
import { type Locale, locales, getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = getDictionary(locale);
  const otherLocale = locale === "ko" ? "en" : "ko";

  return (
    <div className="min-h-screen bg-[var(--background)] bg-grid relative overflow-hidden">
      {/* ── Ambient glow blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent-400/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href={`/${locale}`} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold">
              B
            </div>
            <span className="font-semibold text-sm text-[var(--foreground)]">
              {t.header.brand} <span className="text-[var(--muted-foreground)] font-normal">{t.header.sub}</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* Step indicators */}
            <nav className="hidden sm:flex items-center gap-1">
              {t.header.steps.map((s) => (
                <a
                  key={s.n}
                  href={`#step-${s.n}`}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/[0.04] transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-medium">
                    {s.n}
                  </span>
                  {s.label}
                </a>
              ))}
            </nav>

            {/* Language switcher */}
            <a
              href={`/${otherLocale}`}
              className="px-2.5 py-1 rounded-md text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/[0.04] border border-[var(--border)] transition-colors"
            >
              {otherLocale === "en" ? "EN" : "한국어"}
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-800/40 border border-primary-400/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 pulse-dot" />
              <span className="text-xs font-medium text-primary-300">{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient font-display">{t.hero.title1}</span>
              <br />
              <span className="text-[var(--foreground)]">{t.hero.title2}</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto mb-4">
              {t.hero.subtitle} <strong className="text-[var(--foreground)]">{t.hero.subtitleBold}</strong>
            </p>
            <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto mb-10">
              {t.hero.desc}
            </p>

            <a
              href="#step-1"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-400 hover:bg-accent-300 text-white font-semibold transition-all duration-200 shadow-lg shadow-accent-400/25 hover:shadow-accent-400/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.hero.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
              {t.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-[var(--foreground)]">{stat.value}</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">{stat.label}</div>
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

            {/* ── STEP 1 ── */}
            <ScrollReveal>
              <div id="step-1" className="scroll-mt-20">
                <StepHeader number={1} title={t.step1.title} subtitle={t.step1.subtitle} />
                <div className="ml-0 sm:ml-[68px] space-y-4">
                  <div className="glass-card rounded-2xl p-6 space-y-5">
                    <p className="text-sm text-neutral-300 leading-relaxed">{t.step1.desc}</p>

                    <a
                      href="https://obsidian.md/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[var(--background-surface)] hover:bg-[var(--background-elevated)] border border-[var(--border)] hover:border-primary-400/20 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 19h20L12 2zm0 4l7 11H5l7-11z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--foreground)] group-hover:text-primary-300 transition-colors">{t.step1.download}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{t.step1.downloadSub}</div>
                      </div>
                      <svg className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    <div className="flex gap-3 p-4 rounded-xl bg-primary-800/20 border border-primary-400/10">
                      <span className="text-primary-300 text-sm flex-shrink-0 mt-0.5">💡</span>
                      <div className="text-sm text-neutral-400 leading-relaxed">
                        {t.step1.tipPrefix} <strong className="text-neutral-300">&quot;{t.step1.tipTitle}&quot;</strong>{t.step1.tipSuffix}
                        <br />
                        <span className="text-[var(--muted-foreground)]">{t.step1.tipDesc}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-xl bg-[var(--background-surface)] border border-[var(--border)]">
                      <span className="text-[var(--muted-foreground)] text-sm flex-shrink-0 mt-0.5">💡</span>
                      <div className="text-sm text-neutral-400 leading-relaxed">
                        <strong className="text-neutral-300">{t.step1.vaultTitle}</strong>{t.step1.vaultDesc}
                        <br />
                        <span className="text-[var(--muted-foreground)]">{t.step1.vaultSub}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── STEP 2 ── */}
            <ScrollReveal>
              <div id="step-2" className="scroll-mt-20">
                <StepHeader number={2} title={t.step2.title} subtitle={t.step2.subtitle} />
                <div className="ml-0 sm:ml-[68px] space-y-4">
                  <div className="glass-card rounded-2xl p-6 space-y-6">
                    {/* 2-1 */}
                    <SubStep number="2-1" title={t.step2.sub1.title} description={t.step2.sub1.desc}>
                      <ol className="space-y-4 text-sm text-neutral-400">
                        <li className="space-y-3">
                          <div className="flex gap-2">
                            <span className="text-neutral-600 font-mono text-xs mt-0.5">1.</span>
                            {t.step2.sub1.step1[0]} <Code>{t.step2.sub1.step1[1]}</Code> → <Code>{t.step2.sub1.step1[2]}</Code>
                          </div>
                          <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                            <img src="/step2-1-1.jpeg" alt="Settings button" className="w-full" />
                          </div>
                        </li>
                        <li className="space-y-3">
                          <div className="flex gap-2">
                            <span className="text-neutral-600 font-mono text-xs mt-0.5">2.</span>
                            <Code>{t.step2.sub1.step2label}</Code> → <strong className="text-[var(--foreground)]">{t.step2.sub1.step2action}</strong>
                          </div>
                          <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                            <img src="/step2-1-2.png" alt="Disable restricted mode" className="w-full" />
                          </div>
                        </li>
                      </ol>
                    </SubStep>

                    <div className="border-t border-[var(--border)]" />

                    {/* 2-2 */}
                    <SubStep number="2-2" title={t.step2.sub2.title} description={t.step2.sub2.desc}>
                      <InstallerCommands dict={t.installer} />
                    </SubStep>

                    <div className="border-t border-[var(--border)]" />

                    {/* 2-3 */}
                    <SubStep number="2-3" title={t.step2.sub3.title} description={t.step2.sub3.desc}>
                      <ol className="space-y-2 text-sm text-neutral-400 mb-4">
                        {t.step2.sub3.steps.map((step, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-neutral-600 font-mono text-xs mt-0.5">{i + 1}.</span>
                            <span>
                              {step.text}
                              {step.bold && <strong className="text-[var(--foreground)]">{step.bold}</strong>}
                              {step.code1 && <Code>{step.code1}</Code>}
                              {step.arrow && " → "}
                              {step.code2 && <Code>{step.code2}</Code>}
                              {step.suffix}
                            </span>
                          </li>
                        ))}
                      </ol>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div className="p-4 rounded-xl bg-[var(--background-surface)] border border-[var(--border)]">
                          <div className="text-xs text-primary-400 font-medium mb-2">{t.step2.sub3.subscription}</div>
                          <div className="text-sm text-neutral-300 font-medium">{t.step2.sub3.subscriptionName}</div>
                          <div className="text-xs text-[var(--muted-foreground)] mt-1">{t.step2.sub3.subscriptionDesc}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--background-surface)] border border-[var(--border)]">
                          <div className="text-xs text-accent-400 font-medium mb-2">{t.step2.sub3.payAsYouGo}</div>
                          <div className="text-sm text-neutral-300 font-medium">{t.step2.sub3.payAsYouGoName}</div>
                          <a
                            href="https://console.anthropic.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--muted-foreground)] hover:text-primary-400 transition-colors mt-1 inline-flex items-center gap-1"
                          >
                            {t.step2.sub3.payAsYouGoDesc}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <ol start={5} className="space-y-2 text-sm text-neutral-400">
                        <li className="flex gap-2">
                          <span className="text-neutral-600 font-mono text-xs mt-0.5">5.</span>
                          {t.step2.sub3.step5}
                        </li>
                      </ol>
                    </SubStep>

                    {/* Plugins */}
                    <div className="border-t border-[var(--border)]" />
                    <div className="space-y-3">
                      <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-medium">{t.step2.plugins.title}</div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {t.step2.plugins.list.map((p, i) => (
                          <div
                            key={p.name}
                            className={`text-center p-2.5 rounded-lg border ${
                              i === 0
                                ? "bg-primary-800/30 border-primary-400/20"
                                : "bg-[var(--background-surface)] border-[var(--border)]"
                            }`}
                          >
                            <div className={`text-xs font-medium ${i === 0 ? "text-primary-300" : "text-neutral-300"}`}>{p.name}</div>
                            <div className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{p.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── STEP 3 ── */}
            <ScrollReveal>
              <div id="step-3" className="scroll-mt-20">
                <StepHeader number={3} title={t.step3.title} subtitle={t.step3.subtitle} highlight />
                <div className="ml-0 sm:ml-[68px] space-y-4">
                  <div className="glass-card rounded-2xl p-6 space-y-5">
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {t.step3.desc} <strong className="text-[var(--foreground)]">{t.step3.descBold}</strong>{t.step3.descSuffix}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {t.step3.miniSteps.map((item, i) => (
                        <div key={item.step} className="flex-1 flex items-center gap-3 p-3 rounded-lg bg-[var(--background-surface)]">
                          <span className="text-lg">{item.icon}</span>
                          <div>
                            <div className="text-xs font-medium text-neutral-300">{item.step}</div>
                            <div className="text-[11px] text-[var(--muted-foreground)]">{item.desc}</div>
                          </div>
                          {i < 2 && (
                            <svg className="w-3 h-3 text-neutral-700 ml-auto hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>

                    <SetupPrompt locale={locale} dict={t.setupPrompt} />

                    <div className="flex gap-3 p-4 rounded-xl bg-accent-400/[0.06] border border-accent-400/10">
                      <span className="text-accent-300 text-sm flex-shrink-0 mt-0.5">{t.step3.timeIcon}</span>
                      <div className="text-sm text-neutral-400 leading-relaxed">
                        {t.step3.timeText} <strong className="text-neutral-300">{t.step3.timeBold}</strong>{t.step3.timeSuffix}
                        <br />
                        <span className="text-[var(--muted-foreground)]">{t.step3.timeSub}</span>
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success/10 border border-success/20 mb-6 animate-float">
                  <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">{t.completion.title}</h2>
                <p className="text-[var(--muted-foreground)] text-lg">{t.completion.desc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {t.completion.examples.map((item) => (
                  <div key={item.prompt} className="glass-card rounded-xl p-5 spring-hover">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-[var(--foreground)] mb-1">&quot;{item.prompt}&quot;</div>
                        <div className="text-xs text-[var(--muted-foreground)] leading-relaxed">{item.desc}</div>
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
              <h3 className="text-xl font-bold text-[var(--foreground)] text-center mb-8">{t.daily.title}</h3>
              <div className="space-y-3">
                {t.daily.items.map((item) => (
                  <div
                    key={item.time}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--background-surface)] border border-[var(--border)] hover:border-primary-400/10 transition-colors"
                  >
                    <span className="text-xl w-8 text-center flex-shrink-0">{item.emoji}</span>
                    <div className="flex-shrink-0 w-16">
                      <span className="text-xs font-medium text-primary-400">{item.time}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-neutral-300">{item.action}</span>
                      <span className="text-neutral-600 mx-2">→</span>
                      <span className="text-xs text-[var(--muted-foreground)]">{item.ai}</span>
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
              <h3 className="text-xl font-bold text-[var(--foreground)] text-center mb-8">{t.faq.title}</h3>
              <div className="space-y-4">
                {t.faq.items.map((faq) => (
                  <div key={faq.q} className="p-5 rounded-xl bg-[var(--background-surface)] border border-[var(--border)]">
                    <div className="text-sm font-medium text-[var(--foreground)] mb-2">{faq.q}</div>
                    <div className="text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-600">{t.footer.brand}</div>
          <div className="flex items-center gap-4 text-xs text-neutral-600">
            <a href="https://obsidian.md" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">Obsidian</a>
            <a href="https://github.com/YishenTu/claudian" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">Claudian</a>
            <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">Anthropic</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Sub-components
   ════════════════════════════════════════════════ */

function StepHeader({ number, title, subtitle, highlight = false }: { number: number; title: string; subtitle: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-5 mb-5">
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300 ${highlight ? "bg-gradient-to-br from-primary-400 to-accent-400 text-white shadow-lg shadow-primary-400/30 animate-glow" : "bg-[var(--background-surface)] border border-[var(--border)] text-neutral-400"}`}>
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-[var(--foreground)]">{title}</h3>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function SubStep({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-primary-300 bg-primary-800/30 px-2 py-0.5 rounded">Step {number}</span>
        <span className="text-sm font-medium text-[var(--foreground)]">{title}</span>
      </div>
      <p className="text-xs text-[var(--muted-foreground)] mb-3">{description}</p>
      {children}
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-[var(--background-elevated)] text-neutral-300 text-xs font-mono">
      {children}
    </code>
  );
}
