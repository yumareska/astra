"use client";

import { QuizButton } from "../QuizButton";

interface Props {
  onStart: () => void;
}

export function LpStep({ onStart }: Props) {
  return (
    <div className="flex flex-col">
      <div className="mb-1 text-sm font-semibold tracking-widest text-accent-600">
        ASTRA / 婚活戦略診断
      </div>
      <h1 className="text-2xl font-bold leading-snug text-navy-900 md:text-3xl">
        あなたの婚活、
        <br />
        勝ち筋がわかる。
      </h1>
      <p className="mt-4 leading-relaxed text-navy-700">
        性別・年齢・年収・居住地など数問に答えるだけで、
        IBJ結婚データに基づく
        <strong className="text-navy-900">あなた専用の婚活戦略ID</strong>
        をお届けします。
      </p>

      <ul className="mt-6 space-y-2 text-sm text-navy-700">
        <li className="flex gap-2">
          <span className="text-accent-600">◆</span>
          所要時間：約2分・6問
        </li>
        <li className="flex gap-2">
          <span className="text-accent-600">◆</span>
          データ保存なし（プライバシー配慮）
        </li>
        <li className="flex gap-2">
          <span className="text-accent-600">◆</span>
          15種類の戦略IDからあなたに最適なものを提示
        </li>
      </ul>

      <div className="mt-8">
        <QuizButton onClick={onStart}>▼ 今すぐ診断する（無料）▼</QuizButton>
      </div>

      <p className="mt-4 text-center text-xs text-navy-500">
        ※ 診断結果はサーバーに保存されません
      </p>
    </div>
  );
}
