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
    <StepFrame title="Q. 子供の希望は？" onBack={onBack}>
      <QuizButton variant="secondary" onClick={() => onSelect("want")}>
        欲しい
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect("not-want")}>
        欲しくない
      </QuizButton>
      <QuizButton variant="secondary" onClick={() => onSelect("no-preference")}>
        こだわらない（相手に合わせる）
      </QuizButton>
    </StepFrame>
  );
}
