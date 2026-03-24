"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

const COMMANDS = {
  windows: `powershell -ep bypass -c "irm https://raw.githubusercontent.com/Master-Beronica/beronica-quickstart/main/installer/install.ps1 | iex"`,
  mac: `curl -fsSL https://raw.githubusercontent.com/Master-Beronica/beronica-quickstart/main/installer/install.sh | bash`,
} as const;

type OS = keyof typeof COMMANDS;

export default function InstallerCommands() {
  const [os, setOs] = useState<OS>("windows");

  return (
    <div className="space-y-3">
      {/* OS tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06] w-fit">
        {([
          { key: "windows" as OS, label: "Windows" },
          { key: "mac" as OS, label: "Mac / Linux" },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setOs(tab.key)}
            className={`
              px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200
              ${os === tab.key
                ? "bg-brand-600/30 text-brand-300 border border-brand-500/30"
                : "text-neutral-500 hover:text-neutral-300 border border-transparent"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Command block */}
      <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0c0c0c]">
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.06]">
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-medium">
            {os === "windows" ? "powershell" : "terminal"}
          </span>
          <CopyButton text={COMMANDS[os]} label="복사" size="sm" variant="ghost" />
        </div>
        <div className="p-4 overflow-x-auto code-scroll">
          <pre className="text-sm leading-relaxed">
            <code className="text-neutral-300 break-all whitespace-pre-wrap">
              {COMMANDS[os]}
            </code>
          </pre>
        </div>
      </div>

      {/* How to open terminal */}
      <div className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
        <span className="text-neutral-500 text-sm flex-shrink-0 mt-0.5">💡</span>
        <div className="text-xs text-neutral-500 leading-relaxed">
          {os === "windows" ? (
            <>
              터미널 여는 법: <strong className="text-neutral-400">Win + R</strong> →{" "}
              <code className="px-1 py-0.5 rounded bg-white/[0.06] text-neutral-400 text-[11px]">powershell</code>{" "}
              입력 → Enter
            </>
          ) : (
            <>
              터미널 여는 법: <strong className="text-neutral-400">Cmd + Space</strong> →{" "}
              <code className="px-1 py-0.5 rounded bg-white/[0.06] text-neutral-400 text-[11px]">터미널</code>{" "}
              검색 → Enter
            </>
          )}
        </div>
      </div>
    </div>
  );
}
