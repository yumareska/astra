export type Gender = "male" | "female";

export type AgeBand = "20s" | "30-34" | "35-39" | "40+";

export type IncomeBand = "under500" | "500-799" | "800plus" | "undisclosed";

export type ResidenceArea = "urban" | "rural";

export type ChildPreference = "want" | "not-want" | "no-preference";

export interface UserInput {
  gender: Gender;
  age: AgeBand;
  income?: IncomeBand;
  residence: ResidenceArea;
  remarriage: boolean;
  incomeDisclosure?: boolean;
  childPreference: ChildPreference;
}

export type MaleStrategyId =
  | "M-20"
  | "M-30L"
  | "M-30M"
  | "M-30H"
  | "M-35"
  | "M-40"
  | "M-Re"
  | "M-Rural";

export type FemaleStrategyId =
  | "F-20"
  | "F-30U"
  | "F-30L"
  | "F-35"
  | "F-40"
  | "F-Re"
  | "F-Car";

export type StrategyId = MaleStrategyId | FemaleStrategyId;

export type ChildModifier = "with-children" | "without-children";
