import { applyChildModifier } from "./applyChildModifier";

describe("applyChildModifier", () => {
  test("欲しい → with-children", () => {
    expect(applyChildModifier("want")).toBe("with-children");
  });

  test("欲しくない → without-children", () => {
    expect(applyChildModifier("not-want")).toBe("without-children");
  });

  test("こだわらない → without-children", () => {
    expect(applyChildModifier("no-preference")).toBe("without-children");
  });
});
