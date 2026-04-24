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
      title="Q5. 再婚をご希望ですか？"
      subtitle="離婚歴の有無・再婚を希望されているかをお答えください"
      onBack={onBack}
    >
      <QuizButton variant="secondary" onClick={() => onSelect(true)}>
        はい（再婚希望）
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect(false)}>
        いいえ（初婚）
      </QuizButton>
    </StepFrame>
  );
}
