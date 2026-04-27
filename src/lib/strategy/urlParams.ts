import type { UserInput } from "./types";

type Answers = Partial<UserInput>;

const CHILD_ENCODE: Record<NonNullable<UserInput["childPreference"]>, string> = {
  want: "w",
  "not-want": "nw",
  "no-preference": "np",
};
const CHILD_DECODE: Record<string, UserInput["childPreference"]> = {
  w: "want",
  nw: "not-want",
  np: "no-preference",
};

const AGE_VALID = new Set<string>(["20s", "30-34", "35-39", "40+"]);
const INCOME_VALID = new Set<string>(["under500", "500-799", "800plus", "undisclosed"]);

export function encodeAnswers(answers: Answers): string {
  const p = new URLSearchParams();
  if (answers.gender) p.set("g", answers.gender === "male" ? "m" : "f");
  if (answers.age) p.set("a", answers.age);
  if (answers.income) p.set("i", answers.income);
  if (answers.residence) p.set("r", answers.residence === "urban" ? "u" : "r");
  if (answers.remarriage !== undefined) p.set("rm", answers.remarriage ? "1" : "0");
  if (answers.hasChildren !== undefined) p.set("hc", answers.hasChildren ? "1" : "0");
  if (answers.incomeDisclosure !== undefined) p.set("id", answers.incomeDisclosure ? "1" : "0");
  if (answers.childPreference) p.set("c", CHILD_ENCODE[answers.childPreference]);
  return p.toString();
}

export function decodeAnswers(search: string): Answers | null {
  const p = new URLSearchParams(search);

  const gRaw = p.get("g");
  const aRaw = p.get("a");
  const rRaw = p.get("r");
  const rmRaw = p.get("rm");
  const cRaw = p.get("c");

  if (!gRaw || !aRaw || !rRaw || rmRaw === null || !cRaw) return null;

  const gender: UserInput["gender"] | undefined =
    gRaw === "m" ? "male" : gRaw === "f" ? "female" : undefined;
  const age = AGE_VALID.has(aRaw) ? (aRaw as UserInput["age"]) : undefined;
  const residence: UserInput["residence"] | undefined =
    rRaw === "u" ? "urban" : rRaw === "r" ? "rural" : undefined;
  const remarriage = rmRaw === "1" ? true : rmRaw === "0" ? false : undefined;
  const childPreference = CHILD_DECODE[cRaw];

  if (!gender || !age || !residence || remarriage === undefined || !childPreference) return null;

  const answers: Answers = { gender, age, residence, remarriage, childPreference };

  const iRaw = p.get("i");
  if (iRaw && INCOME_VALID.has(iRaw)) answers.income = iRaw as UserInput["income"];

  const idRaw = p.get("id");
  if (idRaw !== null) answers.incomeDisclosure = idRaw === "1";

  const hcRaw = p.get("hc");
  if (hcRaw !== null) answers.hasChildren = hcRaw === "1";

  return answers;
}
