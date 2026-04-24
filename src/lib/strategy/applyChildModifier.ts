import type { ChildModifier, ChildPreference } from "./types";

export function applyChildModifier(pref: ChildPreference): ChildModifier {
  return pref === "want" ? "with-children" : "without-children";
}
