"use client";

import type { ReactNode } from "react";

interface StepFrameProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  canGoBack?: boolean;
  stepLabel?: string;
}

export function StepFrame({
  title,
  subtitle,
  children,
  onBack,
  canGoBack = true,
  stepLabel,
}: StepFrameProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-7">
        {stepLabel && (
          <p className="mb-2 font-display text-[10px] tracking-[0.3em] text-accent-600">
            {stepLabel}
          </p>
        )}
        <h2 className="text-xl font-bold leading-snug text-navy-900 md:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-navy-500">{subtitle}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
      {canGoBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-8 self-start text-sm text-navy-500 underline-offset-4 hover:text-navy-700 hover:underline"
        >
          ← 前に戻る
        </button>
      )}
    </div>
  );
}
