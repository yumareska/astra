import { act, renderHook } from "@testing-library/react";
import { useQuizStep } from "./useQuizStep";

describe("useQuizStep", () => {
  test("初期状態: lp ステップ・回答空", () => {
    const { result } = renderHook(() => useQuizStep());
    expect(result.current.currentStep).toBe("lp");
    expect(result.current.answers).toEqual({});
    expect(result.current.stepIndex).toBe(0);
  });

  test("start: lp → gender へ遷移", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    expect(result.current.currentStep).toBe("gender");
  });

  test("next: 回答をマージしてインデックスを進める", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "male" }));
    expect(result.current.currentStep).toBe("age");
    expect(result.current.answers.gender).toBe("male");
  });

  test("back: インデックスを戻し回答は保持", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "male" }));
    act(() => result.current.back());
    expect(result.current.currentStep).toBe("gender");
    expect(result.current.answers.gender).toBe("male");
  });

  test("back: lpより手前には戻らない", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.back());
    expect(result.current.currentStep).toBe("lp");
    expect(result.current.stepIndex).toBe(0);
  });

  test("男性フロー: gender→age→income→residence→remarriage→children→result（7ステップ + lp）", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "male" }));
    act(() => result.current.next({ age: "30-34" }));
    act(() => result.current.next({ income: "500-799" }));
    act(() => result.current.next({ residence: "urban" }));
    act(() => result.current.next({ remarriage: false }));
    expect(result.current.currentStep).toBe("children");
    act(() => result.current.next({ childPreference: "no-preference" }));
    expect(result.current.currentStep).toBe("result");
  });

  test("女性・再婚なしフロー: incomeDisclosureステップが挿入される", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "female" }));
    act(() => result.current.next({ age: "30-34" }));
    act(() => result.current.next({ income: "500-799" }));
    act(() => result.current.next({ residence: "urban" }));
    act(() => result.current.next({ remarriage: false }));
    expect(result.current.currentStep).toBe("incomeDisclosure");
    act(() => result.current.next({ incomeDisclosure: true }));
    expect(result.current.currentStep).toBe("children");
  });

  test("離婚歴ありフロー: hasChildrenステップが挿入される", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "female" }));
    act(() => result.current.next({ age: "30-34" }));
    act(() => result.current.next({ income: "500-799" }));
    act(() => result.current.next({ residence: "urban" }));
    act(() => result.current.next({ remarriage: true }));
    expect(result.current.currentStep).toBe("hasChildren");
    act(() => result.current.next({ hasChildren: false }));
    expect(result.current.currentStep).toBe("children");
  });

  test("離婚歴あり女性: incomeDisclosureはスキップされる", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "female" }));
    act(() => result.current.next({ age: "30-34" }));
    act(() => result.current.next({ income: "500-799" }));
    act(() => result.current.next({ residence: "urban" }));
    act(() => result.current.next({ remarriage: true }));
    act(() => result.current.next({ hasChildren: true }));
    expect(result.current.currentStep).toBe("children");
  });

  test("初婚女性・20代: incomeDisclosureはスキップされる（30-34/35-39のみ対象）", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "female" }));
    act(() => result.current.next({ age: "20s" }));
    act(() => result.current.next({ income: "500-799" }));
    act(() => result.current.next({ residence: "urban" }));
    act(() => result.current.next({ remarriage: false }));
    expect(result.current.currentStep).toBe("children");
  });

  test("reset: 初期状態へ戻る", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "male" }));
    act(() => result.current.reset());
    expect(result.current.currentStep).toBe("lp");
    expect(result.current.answers).toEqual({});
  });

  test("totalSteps: 男性は8（lp+6+result）、女性再婚なしは9", () => {
    const { result } = renderHook(() => useQuizStep());
    act(() => result.current.start());
    act(() => result.current.next({ gender: "male" }));
    act(() => result.current.next({ age: "30-34" }));
    act(() => result.current.next({ income: "500-799" }));
    act(() => result.current.next({ residence: "urban" }));
    act(() => result.current.next({ remarriage: false }));
    expect(result.current.totalSteps).toBe(8);

    const { result: result2 } = renderHook(() => useQuizStep());
    act(() => result2.current.start());
    act(() => result2.current.next({ gender: "female" }));
    act(() => result2.current.next({ age: "30-34" }));
    act(() => result2.current.next({ income: "500-799" }));
    act(() => result2.current.next({ residence: "urban" }));
    act(() => result2.current.next({ remarriage: false }));
    expect(result2.current.totalSteps).toBe(9);
  });
});
