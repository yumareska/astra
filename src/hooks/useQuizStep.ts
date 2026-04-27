"use client";

import { useCallback, useMemo, useState } from "react";
import type { UserInput } from "@/lib/strategy/types";

export type Answers = Partial<UserInput>;

export type StepId =
  | "lp"
  | "gender"
  | "age"
  | "income"
  | "residence"
  | "remarriage"
  | "hasChildren"
  | "incomeDisclosure"
  | "children"
  | "result";

const BASE_STEPS: StepId[] = [
  "lp",
  "gender",
  "age",
  "income",
  "residence",
  "remarriage",
];

function computeSteps(answers: Answers): StepId[] {
  const steps: StepId[] = [...BASE_STEPS];
  if (answers.remarriage === true) {
    steps.push("hasChildren");
  }
  if (
    answers.gender === "female" &&
    answers.remarriage === false &&
    (answers.age === "30-34" || answers.age === "35-39")
  ) {
    steps.push("incomeDisclosure");
  }
  steps.push("children");
  steps.push("result");
  return steps;
}

export interface UseQuizStepReturn {
  currentStep: StepId;
  stepIndex: number;
  totalSteps: number;
  answers: Answers;
  start: () => void;
  next: (partial?: Answers) => void;
  back: () => void;
  reset: () => void;
}

function isComplete(a: Answers): boolean {
  if (
    !a.gender ||
    !a.age ||
    a.residence === undefined ||
    a.remarriage === undefined ||
    !a.childPreference
  ) {
    return false;
  }
  if (a.remarriage === true && a.hasChildren === undefined) return false;
  return true;
}

export function useQuizStep(initialAnswers?: Answers): UseQuizStepReturn {
  const [answers, setAnswers] = useState<Answers>(() => initialAnswers ?? {});
  const [index, setIndex] = useState(() => {
    if (!initialAnswers || !isComplete(initialAnswers)) return 0;
    return computeSteps(initialAnswers).length - 1;
  });

  const steps = useMemo(() => computeSteps(answers), [answers]);
  const clampedIndex = Math.min(index, steps.length - 1);
  const currentStep = steps[clampedIndex];

  const start = useCallback(() => setIndex(1), []);

  const next = useCallback((partial?: Answers) => {
    if (partial) {
      setAnswers((prev) => ({ ...prev, ...partial }));
    }
    setIndex((i) => i + 1);
  }, []);

  const back = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const reset = useCallback(() => {
    setIndex(0);
    setAnswers({});
  }, []);

  return {
    currentStep,
    stepIndex: clampedIndex,
    totalSteps: steps.length,
    answers,
    start,
    next,
    back,
    reset,
  };
}
