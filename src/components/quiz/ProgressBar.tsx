"use client";

interface ProgressBarProps {
  current: number;
  total?: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const ratio = total ? Math.min(1, current / total) : undefined;
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-xs text-navy-500">
        <span>
          質問 {current}
          {total ? ` / ${total}` : ""}
        </span>
        <span>
          {ratio === undefined ? "回答により質問数が変わります" : `${Math.round(ratio * 100)}%`}
        </span>
      </div>
      {ratio !== undefined && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
          <div className="h-full bg-navy-600 transition-all" style={{ width: `${ratio * 100}%` }} />
        </div>
      )}
    </div>
  );
}
