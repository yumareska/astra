"use client";

import { StepFrame } from "../StepFrame";
import { QuizButton } from "../QuizButton";
import type { ChildPreference } from "@/lib/strategy/types";

interface Props {
  onSelect: (pref: ChildPreference) => void;
  onBack: () => void;
}

export function ChildrenStep({ onSelect, onBack }: Props) {
  return (
    <StepFrame
      title="Q. 将来、お子様を持ちたいですか？"
      subtitle="今後の家族計画についてお答えください（既にお子様がいらっしゃる場合も、今後の希望でOKです）"
      onBack={onBack}
    >
      <QuizButton variant="secondary" onClick={() => onSelect("want")}>
        持ちたい
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect("not-want")}>
        持ちたくない
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect("no-preference")}>
        こだわらない（相手に合わせる）
      </QuizButton>
    </StepFrame>
  );
}
