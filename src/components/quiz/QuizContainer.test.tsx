import { render, screen, fireEvent } from "@testing-library/react";
import { QuizContainer } from "./QuizContainer";

jest.mock("@/components/result/StrategyResult", () => ({
  StrategyResult: () => <h1>診断結果</h1>,
}));

function choose(name: string) {
  fireEvent.click(screen.getByRole("button", { name }));
}
function begin(gender: string) {
  render(<QuizContainer />);
  choose("今すぐ診断する（無料） →");
  expect(screen.getByText("質問 1")).toBeInTheDocument();
  expect(screen.getByText("回答により質問数が変わります")).toBeInTheDocument();
  choose(gender);
  choose("30〜34歳");
  choose("500〜799万円");
  choose("東京・都市部");
}

test("初婚男性は6問で完了し、結果を質問数に含めない", () => {
  begin("男性");
  choose("初婚（結婚歴なし）");
  expect(screen.getByText("質問 6 / 6")).toBeInTheDocument();
  expect(screen.getByText("100%")).toBeInTheDocument();
  choose("持ちたい");
  expect(screen.getByRole("heading", { name: "診断結果" })).toBeInTheDocument();
});

test("30代初婚女性は追加質問を含む7問で完了する", () => {
  begin("女性");
  choose("初婚（結婚歴なし）");
  expect(screen.getByText("質問 6 / 7")).toBeInTheDocument();
  choose("公開しない");
  expect(screen.getByText("質問 7 / 7")).toBeInTheDocument();
  choose("持ちたくない");
  expect(screen.getByRole("heading", { name: "診断結果" })).toBeInTheDocument();
});

test("結婚歴の回答を戻って変えても、追加質問と総数を再計算する", () => {
  begin("男性");
  choose("初婚（結婚歴なし）");
  choose("← 前に戻る");
  expect(screen.getByText("回答により質問数が変わります")).toBeInTheDocument();
  choose("離婚歴あり");
  expect(screen.getByText("質問 6 / 7")).toBeInTheDocument();
  choose("いいえ");
  expect(screen.getByText("質問 7 / 7")).toBeInTheDocument();
  choose("持ちたい");
  expect(screen.getByRole("heading", { name: "診断結果" })).toBeInTheDocument();
});
