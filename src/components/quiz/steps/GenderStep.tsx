"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";
import type { Gender } from "@/lib/strategy/types";

interface Props {
  onSelect: (gender: Gender) => void;
  onBack: () => void;
}

export function GenderStep({ onSelect, onBack }: Props) {
  return (
    <StepFrame title="Q1. あなたの性別は？" onBack={onBack}>
      <QuizButton variant="secondary" onClick={() => onSelect("male")}>
        男性
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect("female")}>
        女性
      </QuizButton>
    </StepFrame>
  );
}
