"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";
import type { Gender, IncomeBand } from "@/lib/strategy/types";

interface Props {
  gender: Gender;
  onSelect: (income: IncomeBand) => void;
  onBack: () => void;
}

export function IncomeStep({ gender, onSelect, onBack }: Props) {
  const options: { value: IncomeBand; label: string }[] = [
    { value: "under500", label: "〜499万円" },
    { value: "500-799", label: "500〜799万円" },
    { value: "800plus", label: "800万円以上" },
  ];

  return (
    <StepFrame
      title="Q3. あなたの年収は？"
      subtitle={gender === "female" ? "任意：答えたくない場合はスキップできます" : undefined}
      onBack={onBack}
    >
      {options.map((opt) => (
        <QuizButton
          key={opt.value}
          variant="secondary"
          onClick={() => onSelect(opt.value)}
        >
          {opt.label}
        </QuizButton>
      ))}
      {gender === "female" && (
        <QuizButton variant="ghost" onClick={() => onSelect("undisclosed")}>
          答えたくない
        </QuizButton>
      )}
    </StepFrame>
  );
}
