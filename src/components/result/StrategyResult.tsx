"use client";

import { getStrategyContent } from "@/lib/content/strategies";
import type { ChildModifier, StrategyId } from "@/lib/strategy/types";
import { CopyButton } from "./CopyButton";
import { trackCtaClick } from "@/lib/analytics/track";
import { useEffect, useState } from "react";

const WHEN_LABEL: Record<"today" | "thisWeek" | "thisMonth", string> = {
  today: "今日",
  thisWeek: "今週",
  thisMonth: "今月",
};

const BOOKING_URL = "https://calendar.app.google/FmTf7UW7N86nwvbp6";

interface Props {
  strategyId: StrategyId;
  modifier: ChildModifier;
  onRestart: () => void;
  encodedParams?: string;
}

export function StrategyResult({ strategyId, modifier, onRestart, encodedParams }: Props) {
  const c = getStrategyContent(strategyId);
  const isFemale = strategyId.startsWith("F-");

  return (
    <article className="flex flex-col gap-10">
      <Header id={strategyId} name={c.name} catchphrase={c.catchphrase} isFemale={isFemale} />

      <Section title="① 共感フック">
        <p className="mb-3 text-navy-700">{c.empathyHook.intro}</p>
        <ul className="space-y-2">
          {c.empathyHook.checks.map((check, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-navy-100 bg-navy-50 p-3 text-sm text-navy-800"
            >
              <span className="mt-0.5 text-accent-600">☐</span>
              <span>{check}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="② 市場データ">
        <p className="leading-relaxed text-navy-700">{c.marketData.body}</p>
      </Section>

      <Section title="ポジション解説">
        <p className="leading-relaxed text-navy-700">{c.positionAnalysis}</p>
      </Section>

      <Section title="ストーリー事例">
        <div className="rounded-xl border border-navy-200 bg-white p-5 text-sm leading-relaxed">
          <p className="mb-3 font-bold text-navy-900">{c.story.personaLabel}</p>
          <div className="space-y-2 text-navy-700">
            <Row label="Before" body={c.story.before} />
            <Row label="戦略" body={c.story.strategy} />
            <Row label="After" body={c.story.after} />
          </div>
        </div>
      </Section>

      <div className="grid gap-4 md:grid-cols-2">
        <Section title="DO（推奨）">
          <ul className="flex flex-col gap-3">
            {c.dos.map((d, i) => (
              <li
                key={i}
                className="rounded-lg border-l-4 border-accent-500 bg-accent-50/40 p-3 text-sm"
                style={{ backgroundColor: "rgba(197,155,90,0.08)" }}
              >
                <p className="font-semibold text-navy-900">{d.action}</p>
                <p className="mt-1 text-navy-600">→ {d.reason}</p>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="DON'T（NG）">
          <ul className="flex flex-col gap-3">
            {c.donts.map((d, i) => (
              <li
                key={i}
                className="rounded-lg border-l-4 border-red-400 bg-red-50 p-3 text-sm"
              >
                <p className="font-semibold text-navy-900">{d.action}</p>
                <p className="mt-1 text-navy-600">→ {d.reason}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="③ あるある失敗パターン">
        <ul className="flex flex-col gap-2">
          {c.commonFailures.map((f, i) => (
            <li
              key={i}
              className="rounded-lg bg-navy-50 p-3 text-sm text-navy-800"
            >
              <span className="font-bold text-navy-900">{f.label}:</span> {f.body}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="勝ちパターンの型">
        <div className="rounded-xl border border-navy-300 bg-white p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-navy-900">
              {c.winningPattern.title}
            </p>
            <CopyButton text={c.winningPattern.template} label="テンプレをコピー" />
          </div>
          <p className="whitespace-pre-wrap rounded-md bg-navy-50 p-4 text-sm leading-relaxed text-navy-800">
            {c.winningPattern.template}
          </p>
        </div>
      </Section>

      <Section title="PRO TIP（アストラ独自）">
        <div className="rounded-xl border-2 border-accent-500 bg-white p-5">
          <p className="text-sm font-bold tracking-wider text-accent-600">
            ◆ ASTRA INSIGHT
          </p>
          <p className="mt-2 leading-relaxed text-navy-800">{c.proTip}</p>
        </div>
      </Section>

      <Section title="First Action 3段階">
        <div className="grid gap-3 md:grid-cols-3">
          {c.firstActions.map((a, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl border border-navy-200 bg-white p-4"
            >
              <span className="inline-block self-start rounded-full bg-navy-800 px-3 py-1 text-xs font-bold text-white">
                {WHEN_LABEL[a.when]}
              </span>
              <p className="text-sm text-navy-800">{a.action}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="あなたの子供希望に合わせて">
        <div className="rounded-xl bg-navy-50 p-5 text-sm leading-relaxed text-navy-800">
          <p className="mb-2 text-xs font-bold text-navy-600">
            {modifier === "with-children" ? "▼ 子供希望ありの場合" : "▼ 子供不要/こだわらない場合"}
          </p>
          <p>
            {modifier === "with-children"
              ? c.childModifier.withChildren
              : c.childModifier.withoutChildren}
          </p>
        </div>
      </Section>

      <CtaBlock strategyId={strategyId} />

      <SaveBlock encodedParams={encodedParams} />

      <div className="mt-4 text-center">
        <button
          onClick={onRestart}
          className="text-sm text-navy-500 underline-offset-4 hover:text-navy-800 hover:underline"
        >
          もう一度診断する
        </button>
      </div>
    </article>
  );
}

function Header({
  id,
  name,
  catchphrase,
  isFemale,
}: {
  id: StrategyId;
  name: string;
  catchphrase: string;
  isFemale: boolean;
}) {
  return (
    <header className="flex flex-col items-start gap-3">
      <span
        className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-bold tracking-wider ${
          isFemale
            ? "border-2 border-accent-500 bg-white text-accent-600"
            : "bg-navy-800 text-white"
        }`}
      >
        {id}
      </span>
      <h1 className="text-2xl font-bold leading-tight text-navy-900 md:text-3xl">
        {name}
      </h1>
      <p className="leading-relaxed text-navy-700">{catchphrase}</p>
    </header>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 border-l-4 border-navy-700 pl-3 text-lg font-bold text-navy-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, body }: { label: string; body: string }) {
  return (
    <p>
      <span className="mr-2 inline-block rounded bg-navy-800 px-2 py-0.5 text-xs font-semibold text-white">
        {label}
      </span>
      {body}
    </p>
  );
}

function SaveBlock({ encodedParams }: { encodedParams?: string }) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (encodedParams) {
      setShareUrl(
        `${window.location.origin}${window.location.pathname}?${encodedParams}`
      );
    }
  }, [encodedParams]);

  if (!encodedParams) return null;

  const lineUrl = shareUrl
    ? `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`
    : "#";

  const handleCopy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-navy-200 bg-navy-50 p-5">
      <p className="mb-1 text-sm font-semibold text-navy-900">
        あとで見返すために保存する
      </p>
      <p className="mb-4 text-xs text-navy-600">
        URLをブックマークするか、LINEで自分に送って保存できます。
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleCopy}
          disabled={!shareUrl}
          className="flex flex-1 items-center justify-center rounded-lg border border-navy-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-navy-100 disabled:opacity-40"
        >
          {copied ? "コピーしました ✓" : "URLをコピー"}
        </button>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!shareUrl}
          className="flex flex-1 items-center justify-center rounded-lg bg-[#06C755] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 aria-disabled:pointer-events-none aria-disabled:opacity-40"
        >
          LINEで保存する
        </a>
      </div>
    </div>
  );
}

function CtaBlock({ strategyId }: { strategyId: StrategyId }) {
  return (
    <div className="rounded-2xl bg-navy-800 p-6 text-white md:p-8">
      <p className="text-sm font-semibold tracking-wider text-accent-500">
        ASTRA - オーダーメイド戦略作成面談（無料・オンライン）
      </p>
      <h2 className="mt-2 text-xl font-bold leading-snug md:text-2xl">
        この診断は「スペック別」の戦略です。
        <br />
        あなたの本当の勝ち筋は、もっと先にあります。
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-navy-100">
        年齢・年収・居住地が同じでも、婚活の結果は人によって全く違います。
        写真の雰囲気、プロフィールの言葉選び、どんな相手にどう当たるか——
        <strong className="text-white">
          これらはスペックではなく、あなた個人の情報を見なければ決められません。
        </strong>
      </p>
      <p className="mt-4 text-sm leading-relaxed text-navy-100">
        面談では、あなたのことを直接お聞きした上で、
        <strong className="text-white">あなただけに当てはまる戦略</strong>
        を一緒に言語化します。
        この診断結果をスタート地点として、本当の意味での婚活の勝ち筋を作りましょう。
      </p>
      <p className="mt-5 text-sm font-semibold text-accent-400">
        面談でお渡しする戦略シートに含まれるもの：
      </p>
      <ul className="mt-2 space-y-2 text-sm text-navy-100">
        <li className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-accent-500">◆</span>
          <span>
            <strong className="text-white">市場でのあなたの評価</strong>
            ——同年代・同スペックの中で何が強みで、何が足を引っ張っているか
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-accent-500">◆</span>
          <span>
            <strong className="text-white">プロフィール・写真の改善方針</strong>
            ——今何がNGで、どう変えれば反応が変わるか
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-accent-500">◆</span>
          <span>
            <strong className="text-white">アプローチすべき相手の定義</strong>
            ——年齢・属性・優先順位を具体的に絞り込む
          </span>
        </li>
      </ul>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCtaClick(strategyId)}
        className="mt-6 block w-full rounded-xl bg-accent-500 px-4 py-4 text-center text-navy-900 transition hover:bg-accent-600"
      >
        <span className="block text-base font-bold leading-snug">
          あなただけの個別戦略を作ってもらう
        </span>
        <span className="mt-1 block text-xs font-normal opacity-80">
          無料・完全オンライン・所要時間60分
        </span>
      </a>
      <p className="mt-4 text-center text-xs text-navy-200">
        ※「相談」ではなく「個別戦略の作成」の場です。
      </p>
    </div>
  );
}
