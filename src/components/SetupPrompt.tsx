"use client";

import { useState, useCallback, useEffect } from "react";

const PROMPT_URLS: Record<string, string> = {
  ko: "https://raw.githubusercontent.com/Master-Beronica/beronica-quickstart/main/public/setup-prompt.txt",
  en: "https://raw.githubusercontent.com/Master-Beronica/beronica-quickstart/main/public/setup-prompt-en.txt",
};

interface SetupPromptDict {
  title: string;
  desc: string;
  descPaste: string;
  descSend: string;
  descSuffix: string;
  copyBtn: string;
  copied: string;
  features: { icon: string; label: string }[];
  expand: string;
  collapse: string;
  lines: string;
}

interface SetupPromptProps {
  locale?: string;
  fallbackText?: string;
  dict?: SetupPromptDict;
}

export default function SetupPrompt({ locale = "ko", fallbackText, dict }: SetupPromptProps) {
  const [text, setText] = useState(fallbackText ?? "");
  const [loading, setLoading] = useState(!fallbackText);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = dict ?? {
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
  };

  useEffect(() => {
    const url = PROMPT_URLS[locale] ?? PROMPT_URLS.ko;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then((data) => {
        setText(data);
        setLoading(false);
      })
      .catch(() => {
        // fallback: use bundled text or keep existing
        setLoading(false);
      });
  }, [locale]);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [text]);

  return (
    <div className="space-y-4">
      {/* Main copy area */}
      <div className="relative rounded-2xl overflow-hidden border border-primary-400/20 bg-primary-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 via-transparent to-accent-400/5 pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-800/30 border border-primary-400/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-1">{t.title}</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t.desc}
                <br />
                Claudian → <strong className="text-neutral-300">{t.descPaste}</strong> → <strong className="text-neutral-300">{t.descSend}</strong>{t.descSuffix}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            disabled={loading}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-base
              transition-all duration-300 active:scale-[0.98]
              flex items-center justify-center gap-3
              ${loading
                ? "bg-[var(--background-surface)] border-2 border-[var(--border)] text-[var(--muted-foreground)] cursor-wait"
                : copied
                  ? "bg-success/20 border-2 border-success/40 text-emerald-400 shadow-lg shadow-emerald-500/10"
                  : "bg-accent-400 hover:bg-accent-300 border-2 border-accent-400/50 text-white shadow-lg shadow-accent-400/25 hover:shadow-accent-400/40"
              }
            `}
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </>
            ) : copied ? (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.copied}
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {t.copyBtn}
              </>
            )}
          </button>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t.features.map((item) => (
              <div key={item.label} className="text-center p-3 rounded-lg bg-[var(--background-surface)] border border-[var(--border)]">
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-neutral-300 transition-colors mx-auto"
      >
        <svg className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {expanded ? t.collapse : t.expand}
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-surface)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-[var(--border)]">
            <span className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">setup prompt</span>
            <span className="text-[11px] text-neutral-600">{text ? `${text.split("\n").length} lines` : "..."}</span>
          </div>
          <div className="p-4 max-h-[500px] overflow-y-auto code-scroll">
            {text ? (
              <pre className="text-xs leading-relaxed text-neutral-400 whitespace-pre-wrap break-words">
                {text.slice(0, 2000)}
                {text.length > 2000 && (
                  <span className="text-neutral-600">
                    {"\n\n"}... ({text.split("\n").length} {t.lines})
                  </span>
                )}
              </pre>
            ) : (
              <div className="text-xs text-neutral-600 animate-pulse">Loading prompt...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
