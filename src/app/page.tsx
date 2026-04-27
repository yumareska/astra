import { QuizContainer } from "@/components/quiz/QuizContainer";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v !== undefined) params.set(k, Array.isArray(v) ? (v[0] ?? "") : v);
  }
  const qs = params.toString();
  return <QuizContainer initialSearch={qs || null} />;
}
