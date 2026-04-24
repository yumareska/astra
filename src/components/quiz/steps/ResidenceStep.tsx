"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";
import type { ResidenceArea } from "@/lib/strategy/types";

interface Props {
  onSelect: (r: ResidenceArea) => void;
  onBack: () => void;
}

export function ResidenceStep({ onSelect, onBack }: Props) {
  return (
    <StepFrame
      title="Q4. あなたのお住まいは？"
      subtitle="東京・大阪・名古屋・福岡などの主要都市圏は「都市部」を選択"
      onBack={onBack}
    >
      <QuizButton variant="secondary" onClick={() => onSelect("urban")}>
        東京・都市部
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect("rural")}>
        地方
      </QuizButton>
    </StepFrame>
  );
}
