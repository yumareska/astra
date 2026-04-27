import { classifyStrategyId } from "./classifyStrategyId";
import type { UserInput } from "./types";

const base: UserInput = {
  gender: "male",
  age: "30-34",
  income: "500-799",
  residence: "urban",
  remarriage: false,
  childPreference: "no-preference",
};

describe("classifyStrategyId - 男性8パターン", () => {
  test("M-20: 20代男性は年収・居住地問わず M-20", () => {
    expect(
      classifyStrategyId({ ...base, age: "20s", income: "under500", residence: "urban" }),
    ).toBe("M-20");
    expect(
      classifyStrategyId({ ...base, age: "20s", income: "800plus", residence: "rural" }),
    ).toBe("M-20");
  });

  test("M-30L: 30〜34歳・年収500万未満・都市部 → M-30L", () => {
    expect(
      classifyStrategyId({ ...base, age: "30-34", income: "under500", residence: "urban" }),
    ).toBe("M-30L");
  });

  test("M-30M: 30〜34歳・年収500〜799万・都市部 → M-30M", () => {
    expect(
      classifyStrategyId({ ...base, age: "30-34", income: "500-799", residence: "urban" }),
    ).toBe("M-30M");
  });

  test("M-30H: 30〜34歳・年収800万以上・都市部 → M-30H", () => {
    expect(
      classifyStrategyId({ ...base, age: "30-34", income: "800plus", residence: "urban" }),
    ).toBe("M-30H");
  });

  test("M-35: 35〜39歳・都市部 → M-35（年収問わず）", () => {
    expect(
      classifyStrategyId({ ...base, age: "35-39", income: "under500", residence: "urban" }),
    ).toBe("M-35");
    expect(
      classifyStrategyId({ ...base, age: "35-39", income: "800plus", residence: "urban" }),
    ).toBe("M-35");
  });

  test("M-40: 40代以上・都市部 → M-40（年収問わず）", () => {
    expect(
      classifyStrategyId({ ...base, age: "40+", income: "under500", residence: "urban" }),
    ).toBe("M-40");
    expect(
      classifyStrategyId({ ...base, age: "40+", income: "800plus", residence: "urban" }),
    ).toBe("M-40");
  });

  test("M-Re: 男性・離婚歴あり・年収800万未満は M-Re", () => {
    expect(classifyStrategyId({ ...base, remarriage: true })).toBe("M-Re");
    expect(
      classifyStrategyId({ ...base, age: "20s", residence: "rural", remarriage: true }),
    ).toBe("M-Re");
    expect(
      classifyStrategyId({ ...base, age: "40+", income: "under500", remarriage: true }),
    ).toBe("M-Re");
  });

  test("M-Re-H: 男性・離婚歴あり・年収800万以上は M-Re-H", () => {
    expect(
      classifyStrategyId({ ...base, income: "800plus", remarriage: true }),
    ).toBe("M-Re-H");
    expect(
      classifyStrategyId({ ...base, age: "40+", income: "800plus", remarriage: true }),
    ).toBe("M-Re-H");
  });

  test("M-Rural: 30〜34歳・地方 → M-Rural（年収問わず）", () => {
    expect(
      classifyStrategyId({ ...base, age: "30-34", income: "under500", residence: "rural" }),
    ).toBe("M-Rural");
    expect(
      classifyStrategyId({ ...base, age: "30-34", income: "800plus", residence: "rural" }),
    ).toBe("M-Rural");
  });

  test("M-Rural: 35〜39歳・地方 → M-Rural", () => {
    expect(
      classifyStrategyId({ ...base, age: "35-39", income: "500-799", residence: "rural" }),
    ).toBe("M-Rural");
  });

  test("M-Rural: 40代以上・地方 → M-Rural", () => {
    expect(
      classifyStrategyId({ ...base, age: "40+", income: "500-799", residence: "rural" }),
    ).toBe("M-Rural");
  });

  test("M-20優先: 20代地方男性は M-Rural ではなく M-20", () => {
    expect(
      classifyStrategyId({ ...base, age: "20s", income: "under500", residence: "rural" }),
    ).toBe("M-20");
  });

  test("M-Re > M-Rural: 再婚希望は地方・30歳以上でも M-Re", () => {
    expect(
      classifyStrategyId({ ...base, age: "40+", residence: "rural", remarriage: true }),
    ).toBe("M-Re");
  });
});

describe("classifyStrategyId - 女性7パターン", () => {
  const fBase: UserInput = {
    gender: "female",
    age: "30-34",
    residence: "urban",
    remarriage: false,
    childPreference: "no-preference",
  };

  test("F-20: 20代女性は F-20（全域）", () => {
    expect(classifyStrategyId({ ...fBase, age: "20s", residence: "urban" })).toBe("F-20");
    expect(classifyStrategyId({ ...fBase, age: "20s", residence: "rural" })).toBe("F-20");
  });

  test("F-30U: 30〜34歳・都市部 → F-30U", () => {
    expect(
      classifyStrategyId({ ...fBase, age: "30-34", residence: "urban", incomeDisclosure: false }),
    ).toBe("F-30U");
  });

  test("F-30L: 30〜34歳・地方 → F-30L", () => {
    expect(
      classifyStrategyId({ ...fBase, age: "30-34", residence: "rural", incomeDisclosure: false }),
    ).toBe("F-30L");
  });

  test("F-35: 35〜39歳・都市部 → F-35", () => {
    expect(
      classifyStrategyId({ ...fBase, age: "35-39", residence: "urban", incomeDisclosure: false }),
    ).toBe("F-35");
  });

  test("F-35-Rural: 35〜39歳・地方 → F-35-Rural", () => {
    expect(
      classifyStrategyId({ ...fBase, age: "35-39", residence: "rural", incomeDisclosure: false }),
    ).toBe("F-35-Rural");
  });

  test("F-40: 40代以上・都市部 → F-40", () => {
    expect(classifyStrategyId({ ...fBase, age: "40+", residence: "urban" })).toBe("F-40");
  });

  test("F-40-Rural: 40代以上・地方 → F-40-Rural", () => {
    expect(classifyStrategyId({ ...fBase, age: "40+", residence: "rural" })).toBe("F-40-Rural");
  });

  test("F-Re: 女性・再婚希望は全条件より最優先", () => {
    expect(classifyStrategyId({ ...fBase, remarriage: true })).toBe("F-Re");
    expect(
      classifyStrategyId({
        ...fBase,
        age: "30-34",
        incomeDisclosure: true,
        remarriage: true,
      }),
    ).toBe("F-Re");
    expect(
      classifyStrategyId({ ...fBase, age: "40+", residence: "rural", remarriage: true }),
    ).toBe("F-Re");
  });

  test("F-Car: 30〜34歳・年収公開希望 → F-Car（居住地より優先）", () => {
    expect(
      classifyStrategyId({
        ...fBase,
        age: "30-34",
        residence: "urban",
        incomeDisclosure: true,
      }),
    ).toBe("F-Car");
    expect(
      classifyStrategyId({
        ...fBase,
        age: "30-34",
        residence: "rural",
        incomeDisclosure: true,
      }),
    ).toBe("F-Car");
  });

  test("F-Car: 35〜39歳・年収公開希望 → F-Car（F-35より優先）", () => {
    expect(
      classifyStrategyId({
        ...fBase,
        age: "35-39",
        residence: "urban",
        incomeDisclosure: true,
      }),
    ).toBe("F-Car");
  });

  test("F-Car非適用: 20代は年収公開希望でも F-20", () => {
    expect(
      classifyStrategyId({
        ...fBase,
        age: "20s",
        residence: "urban",
        incomeDisclosure: true,
      }),
    ).toBe("F-20");
  });

  test("F-Car非適用: 40代以上は年収公開希望でも F-40", () => {
    expect(
      classifyStrategyId({
        ...fBase,
        age: "40+",
        residence: "urban",
        incomeDisclosure: true,
      }),
    ).toBe("F-40");
  });

  test("F-Re > F-Car: 再婚希望は30代年収公開でも F-Re", () => {
    expect(
      classifyStrategyId({
        ...fBase,
        age: "30-34",
        remarriage: true,
        incomeDisclosure: true,
      }),
    ).toBe("F-Re");
  });
});
