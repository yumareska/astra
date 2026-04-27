import type { StrategyId } from "@/lib/strategy/types";
import { strategies, getStrategyContent } from "./strategies";

const ALL_IDS: StrategyId[] = [
  "M-20",
  "M-30L",
  "M-30M",
  "M-30H",
  "M-35",
  "M-40",
  "M-Re",
  "M-Re-H",
  "M-Rural",
  "F-20",
  "F-30U",
  "F-30L",
  "F-35",
  "F-35-Rural",
  "F-Car",
  "F-40",
  "F-40-Rural",
  "F-Re",
];

describe("strategies コンテンツスキーマ", () => {
  test("全18IDが存在する", () => {
    expect(Object.keys(strategies).sort()).toEqual([...ALL_IDS].sort());
  });

  test.each(ALL_IDS)("%s: 必須フィールドを全て持つ", (id) => {
    const c = strategies[id];
    expect(c.id).toBe(id);
    expect(c.name.length).toBeGreaterThan(0);
    expect(c.catchphrase.length).toBeGreaterThan(0);
    expect(c.empathyHook.intro.length).toBeGreaterThan(0);
    expect(c.empathyHook.checks).toHaveLength(3);
    c.empathyHook.checks.forEach((check) => expect(check.length).toBeGreaterThan(0));
    expect(c.marketData.body.length).toBeGreaterThan(0);
    expect(c.positionAnalysis.length).toBeGreaterThan(0);
    expect(c.story.personaLabel.length).toBeGreaterThan(0);
    expect(c.story.before.length).toBeGreaterThan(0);
    expect(c.story.strategy.length).toBeGreaterThan(0);
    expect(c.story.after.length).toBeGreaterThan(0);
    expect(c.dos).toHaveLength(2);
    c.dos.forEach((d) => {
      expect(d.action.length).toBeGreaterThan(0);
      expect(d.reason.length).toBeGreaterThan(0);
    });
    expect(c.donts).toHaveLength(2);
    c.donts.forEach((d) => {
      expect(d.action.length).toBeGreaterThan(0);
      expect(d.reason.length).toBeGreaterThan(0);
    });
    expect(c.commonFailures).toHaveLength(3);
    c.commonFailures.forEach((f) => {
      expect(f.label.length).toBeGreaterThan(0);
      expect(f.body.length).toBeGreaterThan(0);
    });
    expect(c.winningPattern.title.length).toBeGreaterThan(0);
    expect(c.winningPattern.template.length).toBeGreaterThan(0);
    expect(c.proTip.length).toBeGreaterThan(0);
    expect(c.firstActions).toHaveLength(3);
  });

  test.each(ALL_IDS)("%s: firstActions は today/thisWeek/thisMonth を網羅", (id) => {
    const whens = strategies[id].firstActions.map((a) => a.when);
    expect(whens).toEqual(["today", "thisWeek", "thisMonth"]);
    strategies[id].firstActions.forEach((a) => {
      expect(a.action.length).toBeGreaterThan(0);
    });
  });

  test.each(ALL_IDS)("%s: 子供希望モディファイア 2パターン存在", (id) => {
    const m = strategies[id].childModifier;
    expect(m.withChildren.length).toBeGreaterThan(0);
    expect(m.withoutChildren.length).toBeGreaterThan(0);
  });

  test("getStrategyContent が正しくIDで引ける", () => {
    expect(getStrategyContent("M-30M").name).toBe("スタンダード");
    expect(getStrategyContent("F-Car").name).toBe("キャリア");
    expect(getStrategyContent("F-Re").name).toBe("セカンドチャプター");
  });
});
