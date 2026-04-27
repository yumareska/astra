"use client";

import { useQuizStep } from "@/hooks/useQuizStep";
import type {
  AgeBand,
  ChildPreference,
  Gender,
  IncomeBand,
  ResidenceArea,
  UserInput,
} from "@/lib/strategy/types";
import { ProgressBar } from "./ProgressBar";
import { LpStep } from "./steps/LpStep";
import { GenderStep } from "./steps/GenderStep";
import { AgeStep } from "./steps/AgeStep";
import { IncomeStep } from "./steps/IncomeStep";
import { ResidenceStep } from "./steps/ResidenceStep";
import { RemarriageStep } from "./steps/RemarriageStep";
import { IncomeDisclosureStep } from "./steps/IncomeDisclosureStep";
import { ChildrenStep } from "./steps/ChildrenStep";
import { StrategyResult } from "@/components/result/StrategyResult";
import { classifyStrategyId } from "@/lib/strategy/classifyStrategyId";
import { applyChildModifier } from "@/lib/strategy/applyChildModifier";
import { trackQuizComplete } from "@/lib/analytics/track";
import { decodeAnswers, encodeAnswers } from "@/lib/strategy/urlParams";
import { useEffect, useMemo } from "react";

interface QuizContainerProps {
  initialSearch?: string | null;
}

export function QuizContainer({ initialSearch }: QuizContainerProps) {
  const initialAnswers = useMemo(() => {
    if (!initialSearch) return undefined;
    return decodeAnswers(initialSearch) ?? undefined;
  }, [initialSearch]);

  const quiz = useQuizStep(initialAnswers);
  const gender = quiz.answers.gender as Gender | undefined;
  const showProgress =
    quiz.currentStep !== "lp" && quiz.currentStep !== "result";

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-6 md:py-10">
      {showProgress && (
        <div className="mb-8">
          <ProgressBar current={quiz.stepIndex} total={quiz.totalSteps - 1} />
        </div>
      )}

      {quiz.currentStep === "lp" && <LpStep onStart={quiz.start} />}

      {quiz.currentStep === "gender" && (
        <GenderStep
          onBack={quiz.back}
          onSelect={(g: Gender) => quiz.next({ gender: g })}
        />
      )}

      {quiz.currentStep === "age" && (
        <AgeStep
          onBack={quiz.back}
          onSelect={(a: AgeBand) => quiz.next({ age: a })}
        />
      )}

      {quiz.currentStep === "income" && gender && (
        <IncomeStep
          gender={gender}
          onBack={quiz.back}
          onSelect={(i: IncomeBand) => quiz.next({ income: i })}
        />
      )}

      {quiz.currentStep === "residence" && (
        <ResidenceStep
          onBack={quiz.back}
          onSelect={(r: ResidenceArea) => quiz.next({ residence: r })}
        />
      )}

      {quiz.currentStep === "remarriage" && (
        <RemarriageStep
          onBack={quiz.back}
          onSelect={(r: boolean) => quiz.next({ remarriage: r })}
        />
      )}

      {quiz.currentStep === "incomeDisclosure" && (
        <IncomeDisclosureStep
          onBack={quiz.back}
          onSelect={(d: boolean) => quiz.next({ incomeDisclosure: d })}
        />
      )}

      {quiz.currentStep === "children" && (
        <ChildrenStep
          onBack={quiz.back}
          onSelect={(c: ChildPreference) =>
            quiz.next({ childPreference: c })
          }
        />
      )}

      {quiz.currentStep === "result" && (
        <ResultView answers={quiz.answers} onRestart={quiz.reset} encodedParams={encodeAnswers(quiz.answers)} />
      )}
    </div>
  );
}

interface ResultViewProps {
  answers: Partial<UserInput>;
  onRestart: () => void;
  encodedParams: string;
}

function ResultView({ answers, onRestart, encodedParams }: ResultViewProps) {
  if (
    !answers.gender ||
    !answers.age ||
    !answers.residence ||
    answers.remarriage === undefined ||
    !answers.childPreference
  ) {
    return (
      <div className="text-navy-700">
        入力が不足しています。もう一度診断してください。
        <button
          onClick={onRestart}
          className="mt-4 block text-accent-600 underline"
        >
          最初から診断する
        </button>
      </div>
    );
  }
  const input: UserInput = {
    gender: answers.gender,
    age: answers.age,
    income: answers.income,
    residence: answers.residence,
    remarriage: answers.remarriage,
    incomeDisclosure: answers.incomeDisclosure,
    childPreference: answers.childPreference,
  };
  const id = classifyStrategyId(input);
  const modifier = applyChildModifier(input.childPreference);
  return <ResultInner id={id} modifier={modifier} onRestart={onRestart} encodedParams={encodedParams} />;
}

function ResultInner({
  id,
  modifier,
  onRestart,
  encodedParams,
}: {
  id: ReturnType<typeof classifyStrategyId>;
  modifier: ReturnType<typeof applyChildModifier>;
  onRestart: () => void;
  encodedParams: string;
}) {
  useEffect(() => {
    trackQuizComplete(id);
  }, [id]);
  return <StrategyResult strategyId={id} modifier={modifier} onRestart={onRestart} encodedParams={encodedParams} />;
}
