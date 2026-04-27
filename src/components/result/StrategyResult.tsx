"use client";

import { getStrategyContent } from "@/lib/content/strategies";
import type { ChildModifier, StrategyId, UserInput } from "@/lib/strategy/types";
import { CopyButton } from "./CopyButton";
import { trackCtaClick } from "@/lib/analytics/track";
import { useEffect, useState } from "react";

const WHEN_LABEL: Record<"today" | "thisWeek" | "thisMonth", string> = {
  today: "今日",
  thisWeek: "今週",
  thisMonth: "今月",
};

const AGE_LABEL: Record<UserInput["age"], string> = {
  "20s": "20代",
  "30-34": "30代前半",
  "35-39": "30代後半",
  "40+": "40代以上",
};

const INCOME_LABEL: Record<NonNullable<UserInput["income"]>, string> = {
  under500: "年収〜500万",
  "500-799": "年収500〜799万",
  "800plus": "年収800万〜",
  undisclosed: "年収非公開",
};

const CHILD_LABEL: Record<UserInput["childPreference"], string> = {
  want: "子供希望",
  "not-want": "子供不要",
  "no-preference": "こだわらない",
};

function formatInput(input: UserInput): string {
  const parts: string[] = [];
  parts.push(`${AGE_LABEL[input.age]}・${input.gender === "male" ? "男性" : "女性"}`);
  if (input.income) parts.push(INCOME_LABEL[input.income]);
  parts.push(input.residence === "urban" ? "都市部" : "地方");
  if (input.remarriage) {
    parts.push(input.hasChildren ? "離婚歴あり・子供あり" : "離婚歴あり");
  } else {
    parts.push("初婚");
  }
  parts.push(CHILD_LABEL[input.childPreference]);
  return parts.join(" / ");
}

const BOOKING_URL = "https://calendar.app.google/FmTf7UW7N86nwvbp6";

interface Props {
  strategyId: StrategyId;
  modifier: ChildModifier;
  onRestart: () => void;
  encodedParams?: string;
  input: UserInput;
}

export function StrategyResult({ strategyId, modifier, onRestart, encodedParams, input }: Props) {
  const c = getStrategyContent(strategyId);
  const isFemale = strategyId.startsWith("F-");

  return (
    <>
      <article className="flex flex-col gap-10 pb-24">
        <Header name={c.name} catchphrase={c.catchphrase} isFemale={isFemale} input={input} />

        <Section title="共感フック" label="01  EMPATHY" variant="accent">
          <p className="mb-3 text-navy-700">{c.empathyHook.intro}</p>
          <ul className="space-y-2">
            {c.empathyHook.checks.map((check, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg bg-white p-3 text-sm text-navy-800 shadow-sm ring-1 ring-navy-100"
              >
                <span className="mt-0.5 font-bold text-accent-600">☐</span>
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="市場データ" label="02  MARKET">
          <div className="rounded-xl bg-white p-5 leading-relaxed text-navy-700 shadow-sm ring-1 ring-navy-100">
            {c.marketData.body}
          </div>
        </Section>

        <Section title="ポジション解説" label="03  POSITION">
          <div className="rounded-xl bg-white p-5 leading-relaxed text-navy-700 shadow-sm ring-1 ring-navy-100">
            {c.positionAnalysis}
          </div>
        </Section>

        <FoldableSection title="ストーリー事例" label="CASE STUDY">
          <div className="rounded-xl bg-white p-5 text-sm leading-relaxed shadow-sm ring-1 ring-navy-100">
            <p className="mb-3 font-bold text-navy-900">{c.story.personaLabel}</p>
            <div className="space-y-2 text-navy-700">
              <Row label="Before" body={c.story.before} />
              <Row label="戦略" body={c.story.strategy} />
              <Row label="After" body={c.story.after} />
            </div>
          </div>
        </FoldableSection>

        <div className="grid gap-4 md:grid-cols-2">
          <Section title="DO（推奨）" label="DO" variant="accent">
            <ul className="flex flex-col gap-3">
              {c.dos.map((d, i) => (
                <li
                  key={i}
                  className="rounded-lg border-l-4 border-accent-500 bg-accent-50 p-3 text-sm shadow-sm"
                >
                  <p className="font-semibold text-navy-900">{d.action}</p>
                  <p className="mt-1 text-navy-600">→ {d.reason}</p>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="DON'T（NG）" label="DON'T" variant="muted">
            <ul className="flex flex-col gap-3">
              {c.donts.map((d, i) => (
                <li
                  key={i}
                  className="rounded-lg border-l-4 border-red-400 bg-red-50 p-3 text-sm shadow-sm"
                >
                  <p className="font-semibold text-navy-900">{d.action}</p>
                  <p className="mt-1 text-navy-600">→ {d.reason}</p>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <FoldableSection title="あるある失敗パターン" label="PITFALLS">
          <ul className="flex flex-col gap-2">
            {c.commonFailures.map((f, i) => (
              <li
                key={i}
                className="rounded-lg bg-navy-50 p-3 text-sm text-navy-800 ring-1 ring-navy-100"
              >
                <span className="font-bold text-navy-900">{f.label}:</span> {f.body}
              </li>
            ))}
          </ul>
        </FoldableSection>

        <Section title="勝ちパターンの型" label="WINNING TEMPLATE" variant="accent">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy-200">
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

        <Section title="PRO TIP" label="ASTRA INSIGHT" variant="accent">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white shadow-lg">
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-500/10 blur-2xl"
              aria-hidden
            />
            <p className="font-display text-[11px] tracking-[0.4em] text-accent-400">
              ◆  ASTRA INSIGHT
            </p>
            <p className="mt-3 leading-relaxed text-navy-50">{c.proTip}</p>
          </div>
        </Section>

        <Section title="First Action 3段階" label="ACTION PLAN" variant="accent">
          <div className="grid gap-3 md:grid-cols-3">
            {c.firstActions.map((a, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-navy-100"
              >
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-navy-900 px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                  {WHEN_LABEL[a.when]}
                </span>
                <p className="text-sm leading-relaxed text-navy-800">{a.action}</p>
              </div>
            ))}
          </div>
        </Section>

        <CtaBlock strategyId={strategyId} />

        <Section title="あなたのライフプランに合わせて" label="LIFE PLAN">
          {modifier === "flexible" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-white p-5 text-sm leading-relaxed text-navy-800 shadow-sm ring-1 ring-navy-100">
                <p className="mb-2 font-display text-[10px] tracking-[0.25em] text-accent-600">
                  WITH CHILDREN
                </p>
                <p>{c.childModifier.withChildren}</p>
              </div>
              <div className="rounded-xl bg-white p-5 text-sm leading-relaxed text-navy-800 shadow-sm ring-1 ring-navy-100">
                <p className="mb-2 font-display text-[10px] tracking-[0.25em] text-accent-600">
                  TWO OF YOU
                </p>
                <p>{c.childModifier.withoutChildren}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-white p-5 text-sm leading-relaxed text-navy-800 shadow-sm ring-1 ring-navy-100">
              <p className="mb-2 font-display text-[10px] tracking-[0.25em] text-accent-600">
                {modifier === "with-children" ? "WITH CHILDREN" : "TWO OF YOU"}
              </p>
              <p>
                {modifier === "with-children"
                  ? c.childModifier.withChildren
                  : c.childModifier.withoutChildren}
              </p>
            </div>
          )}
        </Section>

        {input.remarriage && input.hasChildren && c.ownChildrenAdvice && (
          <Section title="お子様がいらっしゃる場合のアドバイス" label="FOR PARENTS" variant="accent">
            <div className="rounded-xl border-l-4 border-accent-500 bg-accent-50 p-5 text-sm leading-relaxed text-navy-800 shadow-sm">
              <p>{c.ownChildrenAdvice}</p>
            </div>
          </Section>
        )}

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

      <FloatingCtaBar strategyId={strategyId} />
    </>
  );
}

function Header({
  name,
  catchphrase,
  isFemale,
  input,
}: {
  name: string;
  catchphrase: string;
  isFemale: boolean;
  input: UserInput;
}) {
  return (
    <header className="-mx-5 -mt-6 overflow-hidden md:-mt-10">
      <div className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 px-6 pb-10 pt-12 md:px-10 md:pb-14 md:pt-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0% 0%, #c59b5a 0%, transparent 50%), radial-gradient(circle at 100% 100%, #c59b5a 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-accent-500/40" aria-hidden />
            <span
              className={`font-display text-[11px] tracking-[0.4em] ${
                isFemale ? "text-accent-300" : "text-accent-400"
              }`}
            >
              YOUR STRATEGY
            </span>
            <span className="h-px flex-1 bg-accent-500/40" aria-hidden />
          </div>

          <h1 className="text-center font-display text-4xl font-medium leading-[1.1] text-white md:text-5xl">
            {name}
          </h1>

          <div className="mx-auto h-px w-12 bg-accent-500" aria-hidden />

          <p className="text-center text-sm leading-relaxed text-navy-100 md:text-base">
            {catchphrase}
          </p>
        </div>
      </div>

      <div className="border-y border-navy-100 bg-navy-50 px-5 py-3 text-[11px] leading-relaxed text-navy-700 md:px-10">
        <span className="mr-2 font-semibold text-navy-900">あなたの回答</span>
        <span className="text-navy-600">{formatInput(input)}</span>
      </div>
    </header>
  );
}

type SectionVariant = "primary" | "accent" | "muted";

const SECTION_BORDER: Record<SectionVariant, string> = {
  primary: "border-navy-700",
  accent: "border-accent-500",
  muted: "border-navy-300",
};

const SECTION_LABEL: Record<SectionVariant, string> = {
  primary: "text-navy-500",
  accent: "text-accent-600",
  muted: "text-navy-400",
};

function Section({
  title,
  label,
  variant = "primary",
  children,
}: {
  title: string;
  label?: string;
  variant?: SectionVariant;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className={`mb-4 border-l-4 ${SECTION_BORDER[variant]} pl-3`}>
        {label && (
          <p
            className={`font-display text-[10px] tracking-[0.3em] ${SECTION_LABEL[variant]}`}
          >
            {label}
          </p>
        )}
        <h2 className="text-lg font-bold leading-tight text-navy-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function FoldableSection({
  title,
  label,
  variant = "muted",
  children,
}: {
  title: string;
  label?: string;
  variant?: SectionVariant;
  children: React.ReactNode;
}) {
  return (
    <section>
      <details className="group">
        <summary
          className={`mb-3 flex cursor-pointer list-none items-center justify-between border-l-4 ${SECTION_BORDER[variant]} pl-3 [&::-webkit-details-marker]:hidden`}
        >
          <div>
            {label && (
              <p
                className={`font-display text-[10px] tracking-[0.3em] ${SECTION_LABEL[variant]}`}
              >
                {label}
              </p>
            )}
            <span className="text-lg font-bold leading-tight text-navy-900">
              {title}
            </span>
          </div>
          <span className="ml-2 flex shrink-0 items-center gap-1 text-xs font-normal text-navy-500">
            <span className="group-open:hidden">タップで展開</span>
            <span className="hidden group-open:inline">閉じる</span>
            <span className="transition-transform group-open:rotate-180">▼</span>
          </span>
        </summary>
        <div>{children}</div>
      </details>
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
    <div className="rounded-xl bg-navy-50 p-5 shadow-sm ring-1 ring-navy-100">
      <p className="mb-1 font-display text-[10px] tracking-[0.3em] text-navy-500">
        SAVE FOR LATER
      </p>
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

function FloatingCtaBar({ strategyId }: { strategyId: StrategyId }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-navy-700 bg-navy-900/95 shadow-2xl backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <p className="min-w-0 flex-1 text-xs leading-tight text-navy-200">
            あなただけの個別戦略を作る
            <span className="ml-1 font-semibold text-accent-400">無料・60分</span>
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick(strategyId)}
            className="shrink-0 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-bold text-navy-900 shadow-lg transition hover:bg-accent-600 active:scale-95"
          >
            無料面談を予約
          </a>
        </div>
      </div>
    </div>
  );
}

function CtaBlock({ strategyId }: { strategyId: StrategyId }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-6 text-white shadow-xl md:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden
      />
      <div className="relative">
      <p className="font-display text-[11px] tracking-[0.35em] text-accent-400">
        ASTRA  —  オーダーメイド戦略作成面談
      </p>
      <p className="mt-1 text-xs text-navy-300">無料・オンライン</p>
      <h2 className="mt-4 text-xl font-bold leading-snug md:text-2xl">
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
    </div>
  );
}
