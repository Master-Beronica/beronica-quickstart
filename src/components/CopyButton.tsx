"use client";

import { useState, useCallback } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "ghost";
  className?: string;
}

export default function CopyButton({
  text,
  label = "복사",
  size = "md",
  variant = "default",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
      setTimeout(() => setCopied(false), 2500);
    }
  }, [text]);

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1",
    md: "px-4 py-2 text-sm gap-1.5",
    lg: "px-6 py-3 text-base gap-2",
  };

  const variantClasses = {
    default:
      "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/30 text-neutral-300 hover:text-white",
    primary:
      "bg-brand-600 hover:bg-brand-500 border border-brand-500/50 text-white shadow-lg shadow-brand-500/20",
    ghost:
      "bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white",
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center justify-center rounded-lg
        font-medium transition-all duration-200
        active:scale-95
        ${sizeClasses[size]}
        ${copied
          ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
          : variantClasses[variant]
        }
        ${className}
      `}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>복사 완료!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
