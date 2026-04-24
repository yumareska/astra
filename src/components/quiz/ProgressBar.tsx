"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const ratio = total > 0 ? Math.min(1, current / total) : 0;
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-xs text-navy-500">
        <span>
          STEP {current} / {total}
        </span>
        <span>{Math.round(ratio * 100)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
        <div
          className="h-full bg-navy-600 transition-all"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
