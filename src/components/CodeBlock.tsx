"use client";

import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  lang = "bash",
  showLineNumbers = false,
}: CodeBlockProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-[var(--border)]">
        <span className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
          {lang}
        </span>
        <CopyButton text={code} label="복사" size="sm" variant="ghost" />
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto code-scroll">
        <pre className="text-sm leading-relaxed">
          <code className="text-neutral-300">
            {showLineNumbers
              ? code.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-neutral-600 w-8 text-right mr-4 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  );
}
