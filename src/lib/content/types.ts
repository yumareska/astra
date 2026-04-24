import type { StrategyId } from "@/lib/strategy/types";

export interface EmpathyHook {
  intro: string;
  checks: readonly [string, string, string];
}

export interface MarketData {
  body: string;
}

export interface Story {
  personaLabel: string;
  before: string;
  strategy: string;
  after: string;
}

export interface DoItem {
  action: string;
  reason: string;
}

export interface DontItem {
  action: string;
  reason: string;
}

export interface FailurePattern {
  label: string;
  body: string;
}

export interface WinningPattern {
  title: string;
  template: string;
}

export type FirstActionWhen = "today" | "thisWeek" | "thisMonth";

export interface FirstActionItem {
  when: FirstActionWhen;
  action: string;
}

export interface ChildModifierBranch {
  withChildren: string;
  withoutChildren: string;
}

export interface StrategyContent {
  id: StrategyId;
  name: string;
  catchphrase: string;
  empathyHook: EmpathyHook;
  marketData: MarketData;
  positionAnalysis: string;
  story: Story;
  dos: readonly [DoItem, DoItem];
  donts: readonly [DontItem, DontItem];
  commonFailures: readonly [FailurePattern, FailurePattern, FailurePattern];
  winningPattern: WinningPattern;
  proTip: string;
  firstActions: readonly [FirstActionItem, FirstActionItem, FirstActionItem];
  childModifier: ChildModifierBranch;
}
