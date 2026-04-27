import type { ChildModifier, ChildPreference } from "./types";

export function applyChildModifier(pref: ChildPreference): ChildModifier {
  if (pref === "want") return "with-children";
  if (pref === "not-want") return "without-children";
  return "flexible";
}
