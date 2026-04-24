"use client";

import { useState } from "react";

interface Props {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "コピー" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-700 hover:border-navy-400 hover:bg-navy-50"
    >
      {copied ? "✓ コピーしました" : `📋 ${label}`}
    </button>
  );
}
