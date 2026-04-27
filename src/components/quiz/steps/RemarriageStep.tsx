"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";

interface Props {
  onSelect: (remarriage: boolean) => void;
  onBack: () => void;
}

export function RemarriageStep({ onSelect, onBack }: Props) {
  return (
    <StepFrame
      title="Q5. ご結婚歴はありますか？"
      subtitle="戦略の判定に使います。事実をお答えください"
      onBack={onBack}
    >
      <QuizButton variant="secondary" onClick={() => onSelect(false)}>
        初婚（結婚歴なし）
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect(true)}>
        離婚歴あり
      </QuizButton>
    </StepFrame>
  );
}
