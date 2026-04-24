"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";
import type { AgeBand } from "@/lib/strategy/types";

const OPTIONS: { value: AgeBand; label: string }[] = [
  { value: "20s", label: "20代" },
  { value: "30-34", label: "30〜34歳" },
  { value: "35-39", label: "35〜39歳" },
  { value: "40+", label: "40代以上" },
];

interface Props {
  onSelect: (age: AgeBand) => void;
  onBack: () => void;
}

export function AgeStep({ onSelect, onBack }: Props) {
  return (
    <StepFrame title="Q2. あなたの年齢は？" onBack={onBack}>
      {OPTIONS.map((opt) => (
        <QuizButton
          key={opt.value}
          variant="secondary"
          onClick={() => onSelect(opt.value)}
        >
          {opt.label}
        </QuizButton>
      ))}
    </StepFrame>
  );
}
