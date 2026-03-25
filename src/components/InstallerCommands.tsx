"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

const COMMANDS = {
  windows: `powershell -ep bypass -c "irm https://raw.githubusercontent.com/Master-Beronica/beronica-quickstart/main/installer/install.ps1 | iex"`,
  mac: `curl -fsSL https://raw.githubusercontent.com/Master-Beronica/beronica-quickstart/main/installer/install.sh | bash`,
} as const;

type OS = keyof typeof COMMANDS;

interface InstallerDict {
  windows: string;
  mac: string;
  copy: string;
  copyDone: string;
  terminalTip: string;
  winTip: string;
  macTip: string;
}

export default function InstallerCommands({ dict }: { dict?: InstallerDict }) {
  const [os, setOs] = useState<OS>("windows");
  const t = dict ?? {
    windows: "Windows",
    mac: "Mac / Linux",
    copy: "복사",
    copyDone: "복사 완료!",
    terminalTip: "터미널 여는 법:",
    winTip: "입력 → Enter",
    macTip: "검색 → Enter",
  };

  return (
    <div className="space-y-3">
      {/* OS tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-[var(--background-surface)] border border-[var(--border)] w-fit">
        {([
          { key: "windows" as OS, label: t.windows },
          { key: "mac" as OS, label: t.mac },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setOs(tab.key)}
            className={`
              px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200
              ${os === tab.key
                ? "bg-primary-800/30 text-primary-300 border border-primary-400/30"
                : "text-[var(--muted-foreground)] hover:text-neutral-300 border border-transparent"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Command block */}
      <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-[var(--border)]">
          <span className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
            {os === "windows" ? "powershell" : "terminal"}
          </span>
          <CopyButton text={COMMANDS[os]} label={t.copy} size="sm" variant="ghost" />
        </div>
        <div className="p-4 overflow-x-auto code-scroll">
          <pre className="text-sm leading-relaxed">
            <code className="text-neutral-300 break-all whitespace-pre-wrap">
              {COMMANDS[os]}
            </code>
          </pre>
        </div>
      </div>

      {/* Screenshot per OS */}
      {os === "windows" ? (
        <div className="rounded-xl overflow-hidden border border-[var(--border)]">
          <img src="/step2-2-1.png" alt="Windows PowerShell install" className="w-full" />
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[var(--border)]">
          <img src="/step2-2-2.png" alt="Mac/Linux terminal install" className="w-full" />
        </div>
      )}

      {/* How to open terminal */}
      <div className="flex gap-3 p-3 rounded-xl bg-[var(--background-surface)] border border-[var(--border)]">
        <span className="text-[var(--muted-foreground)] text-sm flex-shrink-0 mt-0.5">💡</span>
        <div className="text-xs text-[var(--muted-foreground)] leading-relaxed">
          {os === "windows" ? (
            <>
              {t.terminalTip} <strong className="text-neutral-400">Win + R</strong> →{" "}
              <code className="px-1 py-0.5 rounded bg-[var(--background-elevated)] text-neutral-400 text-[11px]">powershell</code>{" "}
              {t.winTip}
            </>
          ) : (
            <>
              {t.terminalTip} <strong className="text-neutral-400">Cmd + Space</strong> →{" "}
              <code className="px-1 py-0.5 rounded bg-[var(--background-elevated)] text-neutral-400 text-[11px]">terminal</code>{" "}
              {t.macTip}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
