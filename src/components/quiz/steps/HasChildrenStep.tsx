"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";

interface Props {
  onSelect: (hasChildren: boolean) => void;
  onBack: () => void;
}

export function HasChildrenStep({ onSelect, onBack }: Props) {
  return (
    <StepFrame
      title="Q. 現在、お子様はいらっしゃいますか？"
      subtitle="再婚戦略では、伝え方が大きく変わるため事実をお伺いします"
      onBack={onBack}
    >
      <QuizButton variant="secondary" onClick={() => onSelect(true)}>
        はい
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect(false)}>
        いいえ
      </QuizButton>
    </StepFrame>
  );
}
