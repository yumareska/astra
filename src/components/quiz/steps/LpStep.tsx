"use client";

interface Props {
  onStart: () => void;
}

export function LpStep({ onStart }: Props) {
  return (
    <div className="-mx-5 -my-6 flex flex-col md:-my-10">
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, #c59b5a 0%, transparent 40%), radial-gradient(circle at 80% 100%, #c59b5a 0%, transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="mb-1 font-display text-xs tracking-[0.4em] text-accent-400">
            ASTRA
          </p>
          <p className="mb-8 text-[11px] tracking-[0.25em] text-navy-200">
            スペック別・婚活戦略診断
          </p>

          <h1 className="font-display text-4xl font-medium leading-[1.15] text-white md:text-5xl">
            あなたの婚活、
            <br />
            <span className="text-accent-400">勝ち筋</span>がわかる。
          </h1>

          <div className="mt-8 h-px w-16 bg-accent-500" aria-hidden />

          <p className="mt-6 text-sm leading-loose text-navy-100 md:text-base">
            性別・年齢・年収・居住地など数問に答えるだけ。
            <br />
            IBJ結婚データに基づく
            <span className="font-semibold text-white">あなた専用の戦略</span>
            をお届けします。
          </p>
        </div>
      </section>

      <section className="px-6 py-10 md:px-10 md:py-14">
        <ul className="space-y-4 text-sm text-navy-700 md:text-base">
          <FeatureItem label="ABOUT" title="所要時間：約2分・6問">
            選択式だから直感的に答えられます
          </FeatureItem>
          <FeatureItem label="PRIVACY" title="データ保存なし">
            診断結果はサーバーに保存されません
          </FeatureItem>
          <FeatureItem label="OUTPUT" title="15種類の戦略から最適解を提示">
            DO / DON&apos;T と具体的アクションつき
          </FeatureItem>
        </ul>

        <button
          type="button"
          onClick={onStart}
          className="mt-10 w-full rounded-xl bg-accent-500 px-6 py-5 text-base font-bold tracking-wide text-navy-900 shadow-lg shadow-accent-500/20 transition hover:bg-accent-600 active:scale-[0.98]"
        >
          今すぐ診断する（無料）
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>

        <p className="mt-4 text-center text-xs text-navy-500">
          ※ 診断結果はサーバーに保存されません
        </p>
      </section>
    </div>
  );
}

function FeatureItem({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex shrink-0 flex-col items-center pt-1">
        <span className="font-display text-[10px] tracking-[0.2em] text-accent-600">
          {label}
        </span>
        <span className="mt-1 h-8 w-px bg-navy-200" aria-hidden />
      </div>
      <div className="flex-1 pt-0.5">
        <p className="font-semibold text-navy-900">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-navy-600">{children}</p>
      </div>
    </li>
  );
}
