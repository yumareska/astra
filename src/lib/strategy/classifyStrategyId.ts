import type { StrategyId, UserInput } from "./types";

export function classifyStrategyId(input: UserInput): StrategyId {
  if (input.gender === "male") {
    return classifyMale(input);
  }
  return classifyFemale(input);
}

function classifyMale(input: UserInput): StrategyId {
  if (input.remarriage) {
    return input.income === "800plus" ? "M-Re-H" : "M-Re";
  }

  if (input.residence === "rural" && input.age !== "20s") return "M-Rural";

  if (input.age === "20s") return "M-20";

  if (input.age === "30-34") {
    if (input.income === "800plus") return "M-30H";
    if (input.income === "500-799") return "M-30M";
    return "M-30L";
  }

  if (input.age === "35-39") return "M-35";

  return "M-40";
}

function classifyFemale(input: UserInput): StrategyId {
  if (input.remarriage) return "F-Re";

  if (
    (input.age === "30-34" || input.age === "35-39") &&
    input.incomeDisclosure === true
  ) {
    return "F-Car";
  }

  if (input.age === "20s") return "F-20";

  if (input.age === "30-34") {
    return input.residence === "urban" ? "F-30U" : "F-30L";
  }

  if (input.age === "35-39") {
    return input.residence === "urban" ? "F-35" : "F-35-Rural";
  }

  return input.residence === "urban" ? "F-40" : "F-40-Rural";
}
