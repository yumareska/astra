"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";

interface Props {
  onSelect: (disclose: boolean) => void;
  onBack: () => void;
}

export function IncomeDisclosureStep({ onSelect, onBack }: Props) {
  return (
    <StepFrame
      title="Q6. 婚活プロフィールで年収を公開しますか？"
      subtitle="公開する / 公開しない、どちらが合っているかの判断に使います"
      onBack={onBack}
    >
      <QuizButton variant="secondary" onClick={() => onSelect(true)}>
        公開する
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect(false)}>
        公開しない
      </QuizButton>
    </StepFrame>
  );
}
