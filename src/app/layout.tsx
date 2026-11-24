import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "婚活戦略診断 | アストラ",
  description:
    "数問に答えて、婚活の進め方を考えるヒントに。今の状況を振り返り、次に試すことを整理できます。",
  openGraph: {
    title: "婚活戦略診断 | アストラ",
    description:
      "回答に応じた婚活のヒントで、次の一歩を考える。無料オンライン相談では実際の活動と希望を一緒に整理します。",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`h-full antialiased ${cormorant.variable}`}>
      <body className="min-h-full bg-white">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
