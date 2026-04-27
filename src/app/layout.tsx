import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  title: "スペック別・婚活戦略診断ツール | アストラ",
  description:
    "性別・年齢・年収などから、あなた専用の婚活戦略を即座に診断。15種類の戦略から、データに基づくDO/DON'Tと具体的アクションをお届けします。",
  openGraph: {
    title: "スペック別・婚活戦略診断ツール | アストラ",
    description:
      "あなたの婚活、勝ち筋がわかる。IBJ結婚データに基づく15種類の戦略から最適なものを診断します。",
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
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full bg-white">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
